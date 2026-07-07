let currentPage = "dashboard";

const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "icon-grid" },
    { id: "plots", label: "Plots", icon: "icon-plot" },
    { id: "members", label: "Members", icon: "icon-members" },
    { id: "waitlist", label: "Waitlist", icon: "icon-waitlist" },
];

const pages = {
    dashboard: () => `
        <h1 class="page-title">Dashboard</h1>
        <p class="page-sub">Riverside Community Garden | ${getDate()}</p>
        <div class="stats">${renderStatCards()}</div>
    `,
    plots: () => `
        <h1>Plots</h1>
    `,
    members: () => `
        <h1>Members</h1>
    `,
    waitlist: () => `
        <h1>Waitlist</h1>
    `
};

const stats = [
    { label: "Total plots", value: 48, trend: "+2 this season", icon: "icon-plot", accent: false },
    { label: "Occupied", value: 39, trend: "81% full", icon: "icon-grid", accent: false },
    { label: "On waitlist ", value: 12, trend: "+4 this week", icon: "icon-waitlist", accent: true },
    { label: "Active members", value: 64, trend: "+6 this month", icon: "icon-members", accent: false },
];


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

    navUl.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // to stop jumping to the top
            navigateTo(link.dataset.page); //todo
        })
    });
}

const navigateTo = (pageId) => {
    currentPage = pageId;
    renderCurrentPage();
    renderNav();
}

const renderCurrentPage = () => {
    //currentPage = dashboard
    //pages["dashboard"]() -> pages.dashboard
    document.getElementById("content").innerHTML = pages[currentPage]();
}



navigateTo(currentPage)