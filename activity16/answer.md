## Task 1: Data Structures & References

```javascript
// Create library object
const library = {
  books: [
    { title: "The Hunger Games", 
      author: "Suzanne Collins", 
      isAvailable: true },
    {
      title: "Romancing Mister Bridgerton",
      author: "Julia Quinn",
      isAvailable: true,
    },
    {
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      isAvailable: true,
    },
    {
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      isAvailable: true,
    },
  ],
};

// Shallow copy
const libraryCopy = { ...library };

// Change availability in copied library
libraryCopy.books[3].isAvailable = false;

// Display both objects
console.log("Original: ", library);
console.log("Copy: ", libraryCopy);

/*
The status of the original library's book also changed, 
because { ...library } generates a new primary object. 
The `books` attribute contained within it still refers to 
the same array in memory, it wasn't copied.Thus, 
libraryCopy.books and library.books reference the identical 
array, and altering one alters both.To avoid this, we need 
a deep copy, like:
const libraryClone = structuredClone(library); or: 
const deepCopy = JSON.parse(JSON.stringify(library));
This generates completely new nested objects/arrays, 
so changes to the copy's books no longer affect the original.
*/

```

## Task 2: Advanced Conditional Logic (Validation)

```javascript
function validatePassword(password) {
    // Rule 1: Must be at least 8 characters long
    if (password.length < 8) {
        return "Error: Password must be at least 8 characters long.";
    }

    // Rule 2: Must contain at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return "Error: Password must contain at least one uppercase letter.";
    }

    // Rule 3: Must contain at least one number
    if (!/[0-9]/.test(password)) {
        return "Error: Password must contain at least one number.";
    }

    // Rule 4: Must not contain the word "password" (case-insensitive)
    if (password.toLowerCase().includes("password")) {
        return "Error: Password must not contain the word 'password'.";
    }

    // If all good, pass
    return "Strong Password";
}

// Test if it works
console.log(validatePassword("lois"));
console.log(validatePassword("louiseganda"));
console.log(validatePassword("Louiseeo"))
console.log(validatePassword("Passwordko1"));
console.log(validatePassword("Louiseganda1234"));
```

## Task 3: Complex Iteration (Algorithms)

```javascript
function generateFibonacci(n) { 
    const fibonacci = []; 
    
    for (let i = 0; i < n; i++) { 
        if (i === 0) { 
            fibonacci.push(0); 
        } else if (i === 1) { 
            fibonacci.push(1); 
        } else { 
            fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]); 
        } 
    } 
    
    return fibonacci; } 
    
    // Test 
    console.log(generateFibonacci(7)); // Output: [0, 1, 1, 2, 3, 5, 8]
```

## Task 4: Higher-Order Functions & Callbacks

```javascript
// The main function that processes the array using a callback
function processData(dataArray, callback) {
    const newArray = [];
    
    // Loop through each element of the input array
    for (let i = 0; i < dataArray.length; i++) {
        // Apply the callback to the current element and store the result
        const result = callback(dataArray[i]);
        newArray.push(result);
    }
    
    return newArray;
}

// try the function
const numbers = [1, 3, 5, 7];
const squaredNumbers = processData(numbers, (num) => num * num);

console.log(squaredNumbers); // Output: [1, 9, 25, 49]

```

## Task 5: Functional Array Methods (Map, Filter, Reduce)

```javascript
const transactions = [
  { type: "deposit", amount: 150 },
  { type: "withdrawal", amount: 50 },
  { type: "deposit", amount: 200 },
  { type: "withdrawal", amount: 80 }
];

// Use reduce()
const finalBalance = transactions.reduce((total, transaction) => {
  return transaction.type === "deposit"
    ? total + transaction.amount
    : total - transaction.amount;
}, 0);

console.log(finalBalance); // 220

```