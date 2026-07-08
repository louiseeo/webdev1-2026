let currentPage = "dashboard";

const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "icon-grid" },
    { id: "plots", label: "Plots", icon: "icon-plot" },
    { id: "members", label: "Members", icon: "icon-members" },
    { id: "waitlist", label: "Waitlist", icon: "icon-waitlist" },
];

const stats = [
    { label: "Total plots", value: 48, trend: "+2 this season", icon: "icon-plot", accent: false },
    { label: "Occupied", value: 39, trend: "81% full", icon: "icon-grid", accent: false },
    { label: "On waitlist ", value: 12, trend: "+4 this week", icon: "icon-waitlist", accent: true },
    { label: "Active members", value: 64, trend: "+6 this month", icon: "icon-members", accent: false },
];

const plotAssignments = [
  { plot: "A-12", member: "Maria Chen",   initials: "MC", color: "var(--avatar-tomato)",    date: "Jun 28", status: "active"  },
  { plot: "B-04", member: "James Okoro",  initials: "JO", color: "var(--avatar-blueberry)", date: "Jun 25", status: "active"  },
  { plot: "A-07", member: "Priya Patel",  initials: "PP", color: "var(--avatar-squash)",    date: "Jun 20", status: "pending" },
  { plot: "C-15", member: "Tom Becker",   initials: "TB", color: "var(--avatar-plum)",      date: "Jun 18", status: "active"  },
  { plot: "B-09", member: "Aisha Rahman", initials: "AR", color: "var(--avatar-basil)",     date: "Jun 14", status: "pending" },
];

const waterUsage = [
  { day: "Mon", liters: 120 },
  { day: "Tue", liters: 90  },
  { day: "Wed", liters: 160 },
  { day: "Thu", liters: 70  },
  { day: "Fri", liters: 140 },
  { day: "Sat", liters: 190 },
  { day: "Sun", liters: 100 },
];

const maxLiters = Math.max(...waterUsage.map(day => day.liters));

const renderWaterBars = () => {
    return waterUsage.map(day => {
        const percent = Math.round((day.liters / maxLiters) * 100);
            return `
            <div class="bar-row">
                <span class="day">${day.day}</span>
                <div class="bar-track"><div class="bar-fill" style="width:${percent}%;"></div></div>
                <span class="liters">${day.liters}L</span>
            </div>
            `;
    }).join("");
}



const renderStatCards = () => stats.map(stat => `
    <div class="stat-card ${stat.accent ? "accent" : ""}">
      <div class="stat-icon"><svg class="icon"><use href="#${stat.icon}"/></svg></div>
      <div class="stat-value">${stat.value}</div>
      <div class="stat-label">${stat.label}</div>
      <div class="stat-trend ${stat.accent ? "warn" : ""}">${stat.trend}</div>
    </div>
`).join("");

const getDate = (date = new Date()) => {
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
}

const renderNav = () => {
    const navUl = document.querySelector(".sidebar nav ul");

    /*
    let links = "";
    navItems.forEach(menu => {
        links +=
            `
            <li>
                <a href="#" class="$menu.id==currentPage ? "active": ""}>
                    <svg class="icon">
                        <use href="#${menu.icon}"/>
                    </svg>
                    ${menu.label}
                </a>
            </li>
        `
    });
    console.log(links);
    navUl.innerHTML=links;

    */
    navUl.innerHTML = navItems.map(menu => `
        <li>
            <a href="#" data-page="${menu.id}" class="${menu.id == currentPage ? "active" : ""}">
                <svg class="icon">
                    <use href="#${menu.icon}"/>
                </svg>
                ${menu.label}
            </a>
        </li>
    `).join("")

    document.querySelectorAll("a[data-page]").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // to stop jumping to the top
            navigateTo(link.dataset.page); //todo
        })
    });
}

const renderAssignmentRows = (list) => {
    if(list.length === 0) {
        return `<tr><td colspan="4" class="no-results">No plots or members match</td></tr>`;
    }

    return list.map(row => `
        <tr>
            <td>${row.plot}</td>
            <td>
                <div class="member-cell">
                <span class="avatar sm" style="background:${row.color}">${row.initials}</span>
                ${row.member}
                </div>
            </td>
            <td>${row.date}</td>
            <td><span class="status ${row.status}">${row.status.charAt(0).toUpperCase() + row.status.slice(1)}</span></td>
        </tr>
    `).join("");
}

 const navigateTo = async (pageId) =>  {
    currentPage = pageId;
    renderNav();
    await renderCurrentPage();
    
}

 const renderCurrentPage = async () =>  {
    //currentPage = dashboard
    //pages["dashboard"]() -> pages.dashboard
    //document.getElementById("content").innerHTML = pages[currentPage]();
    const html = await loadPageHTML(currentPage);
    document.getElementById("content").innerHTML = html;
    //hydrate or populate data
    pageHydrators[currentPage]();

}

function hydrateMembers(){}
function hydrateWaitlist(){}
function hydratePlots(){}

const hydrateDashboard = () => {
    document.getElementById("stats-grid").innerHTML = renderStatCards();
    document.getElementById("today").innerHTML = getDate();
    document.getElementById("assignments-body").innerHTML = renderAssignmentRows(plotAssignments);
    document.getElementById("water-bars").innerHTML = renderWaterBars();
}

pageHydrators = {
    dashboard: hydrateDashboard,
    plots: hydratePlots,
    members: hydrateMembers,
    waitlist: hydrateWaitlist
}

const pages = {}

async function loadPageHTML(pageId){
    if (pages[pageId])
        return pages[pageId];

    //if not present, we will load from file *.html
    const response = await fetch(`pages/${pageId}.html`);
    const html = await response.text();
    pages[pageId] = html;
    return html;
}




(async function init() {
    await navigateTo(currentPage)
})();