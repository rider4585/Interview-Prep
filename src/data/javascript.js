const javascriptData = {
    Beginner: [{
            q: "What is JavaScript?",
            a: "JavaScript is a high-level, dynamically typed programming language used to build interactive web applications. It runs in browsers as well as server environments such as Node.js. JavaScript supports procedural, object-oriented, and functional programming paradigms. It is single-threaded but can handle asynchronous operations efficiently through the event loop.",
            whyUse: "JavaScript is the foundation of modern web development. It powers frontend frameworks like React, backend applications with Node.js, mobile apps with React Native, and desktop applications with Electron.",
            example: `
function greet(name) {
  return "Hello " + name;
}

console.log(
  greet("John")
);
`,
        },
        {
            q: "What are the data types in JavaScript?",
            a: "JavaScript has eight data types. The primitive types are string, number, bigint, boolean, undefined, null, and symbol. The eighth type is object, which includes arrays, functions, dates, maps, and other complex structures. Primitive values are immutable and copied by value, whereas objects are mutable and referenced by memory location.",
            whyUse: "Understanding data types is essential for writing correct logic, performing type checks, debugging applications, and avoiding unexpected behavior caused by JavaScript's dynamic typing.",
            example: `
typeof "Hello"     // string
typeof 42          // number
typeof true        // boolean
typeof {}          // object
typeof []          // object
typeof undefined   // undefined
`,
        },
        {
            q: "What is the difference between var, let, and const?",
            a: "var is function-scoped, can be redeclared, and is generally avoided in modern JavaScript. let is block-scoped and allows reassignment but not redeclaration within the same scope. const is also block-scoped and prevents reassignment after initialization. Modern JavaScript development typically uses const by default and let only when a variable's value needs to change.",
            whyUse: "Choosing the correct declaration type improves code readability, prevents accidental bugs, and avoids issues related to variable scope and hoisting.",
            example: `
const name = "John";

let count = 0;
count++;

var legacy = "old";
`,
        },
        {
            q: "What is the difference between == and ===?",
            a: "The double equals operator performs loose equality comparison and automatically converts values to compatible types before comparing them. The triple equals operator performs strict equality comparison and checks both value and type without any type conversion. In professional JavaScript development, strict equality is preferred because it produces more predictable results.",
            whyUse: "Using strict equality helps avoid bugs caused by implicit type coercion and makes application behavior easier to understand and maintain.",
            example: `
"5" == 5     // true

"5" === 5    // false

0 === false  // false
`,
        },
        {
            q: "What is hoisting in JavaScript?",
            a: "Hoisting is JavaScript's behavior of processing declarations before code execution begins. Function declarations are fully hoisted and can be called before they appear in code. Variables declared with var are hoisted and initialized with undefined. Variables declared with let and const are hoisted but remain inaccessible until their declaration is reached, creating what is known as the Temporal Dead Zone.",
            whyUse: "Understanding hoisting helps developers avoid reference errors, write predictable code, and explain JavaScript execution behavior during interviews.",
            example: `
console.log(a);

var a = 10;

// Outputs:
// undefined
`,
        },
        {
            q: "What are arrow functions and how are they different from regular functions?",
            a: "Arrow functions are a shorter syntax for writing functions introduced in ES6. The biggest difference is how they handle the 'this' keyword. Regular functions determine 'this' based on how they are called, while arrow functions inherit 'this' from their surrounding scope. Arrow functions also do not have their own arguments object, cannot be used as constructors, and do not have a prototype. They are commonly used in callbacks, array methods, and React event handlers.",
            whyUse: "Arrow functions simplify code and help avoid common 'this' binding issues, especially in React components, event handlers, asynchronous callbacks, and array operations such as map, filter, and reduce.",
            example: `
const add = (a, b) => a + b;

const numbers = [1, 2, 3];

const doubled = numbers.map(
  num => num * 2
);
`,
        },
        {
            q: "What is a closure in JavaScript?",
            a: "A closure is created when a function remembers and can access variables from its outer scope even after the outer function has finished executing. Closures allow functions to maintain private state and preserve data between function calls. They are one of the most important concepts in JavaScript and are heavily used in event handlers, callbacks, function factories, and module patterns.",
            whyUse: "Closures are commonly used for data encapsulation, creating private variables, implementing memoization, building reusable utility functions, and maintaining state without exposing internal implementation details.",
            example: `
function createCounter() {
  let count = 0;

  return function() {
    return ++count;
  };
}

const counter = createCounter();

counter(); // 1
counter(); // 2
`,
        },
        {
            q: "What is the difference between null and undefined?",
            a: "Undefined represents a variable that has been declared but not assigned a value, or a property that does not exist. Null is an intentional assignment that represents the absence of a value. In simple terms, undefined means a value has not been provided, whereas null means a value was intentionally set to nothing. Although null and undefined are loosely equal, they are different data types.",
            whyUse: "Understanding the difference helps avoid bugs when working with API responses, optional properties, form values, and conditional checks.",
            example: `
let firstName;

console.log(firstName);

let user = null;

console.log(user);
`,
        },
        {
            q: "What are template literals?",
            a: "Template literals are strings created using backticks instead of single or double quotes. They support string interpolation through the ${} syntax, allow multi-line strings, and improve readability compared to string concatenation. Any JavaScript expression can be evaluated inside a template literal.",
            whyUse: "Template literals are widely used when generating dynamic strings, building HTML content, formatting messages, logging data, and constructing SQL or GraphQL queries.",
            example: `
const name = "John";
const age = 30;

const message =
  \`Hello \${name}, Age: \${age}\`;
`,
        },
        {
            q: "What are the different ways to create objects in JavaScript?",
            a: "JavaScript provides multiple ways to create objects including object literals, constructor functions, ES6 classes, Object.create(), factory functions, and object spread syntax. Object literals are the most common approach for simple data structures. Classes are generally used for object-oriented designs, while factory functions are useful when encapsulation and composition are preferred over inheritance.",
            whyUse: "Different object creation patterns are useful in different scenarios. Object literals are ideal for simple data, classes are useful for reusable models, and factory functions help create encapsulated and maintainable code.",
            example: `
const user = {
  name: "John",
  age: 30
};

class User {
  constructor(name) {
    this.name = name;
  }
}
`,
        },
        {
            q: "What is the difference between for...of and for...in loops?",
            a: "The for...of loop iterates over values of iterable objects such as arrays, strings, maps, and sets. The for...in loop iterates over object property names or keys. For arrays, for...of should be preferred because it directly provides values and avoids issues with inherited properties. For objects, for...in is useful when you need to access property names dynamically.",
            whyUse: "Use for...of when working with arrays and iterable collections. Use for...in when iterating over object keys or inspecting object properties.",
            example: `
const colors = ["red", "blue"];

for (const color of colors) {
  console.log(color);
}

const user = {
  name: "John",
  age: 30
};

for (const key in user) {
  console.log(key);
}
`,
        },
        {
            q: "What is the spread operator and rest parameters?",
            a: "Both spread and rest use the same three-dot syntax (...) but serve opposite purposes. The spread operator expands arrays, objects, or iterables into individual elements, while rest parameters collect multiple values into a single array. Spread is commonly used for copying arrays, merging objects, and passing array elements as function arguments. Rest parameters are used when a function needs to accept a variable number of arguments.",
            whyUse: "Spread helps write immutable code by creating copies instead of mutating existing arrays or objects. Rest parameters make functions more flexible when the number of arguments is unknown.",
            example: `
const arr = [1, 2, 3];

const copy = [...arr];

function sum(...numbers) {
  return numbers.length;
}

sum(1, 2, 3, 4);
`,
        },
        {
            q: "What is destructuring in JavaScript?",
            a: "Destructuring is a JavaScript feature that allows values from arrays or properties from objects to be extracted into separate variables using concise syntax. It improves readability and reduces repetitive code. Destructuring supports default values, variable renaming, nested extraction, and rest patterns.",
            whyUse: "Destructuring is heavily used when working with API responses, React props, function parameters, configuration objects, and state management.",
            example: `
const user = {
  name: "John",
  age: 30
};

const { name, age } = user;

const numbers = [1, 2];

const [first, second] = numbers;
`,
        },
        {
            q: "What are Promises in JavaScript?",
            a: "A Promise is an object that represents the eventual success or failure of an asynchronous operation. A Promise can be in one of three states: pending, fulfilled, or rejected. Promises help manage asynchronous workflows more cleanly than callbacks and provide methods such as then, catch, and finally for handling results and errors.",
            whyUse: "Promises are used for API calls, database operations, file handling, timers, and any asynchronous task. They help avoid callback hell and make async code easier to manage.",
            example: `
fetch("/users")
  .then(response => response.json())
  .catch(error => {
    console.error(error);
  });
`,
        },
        {
            q: "What is async/await in JavaScript?",
            a: "Async and await are modern JavaScript features built on top of Promises that make asynchronous code look and behave more like synchronous code. The async keyword makes a function return a Promise, while await pauses execution within that function until a Promise resolves or rejects. This improves readability and simplifies error handling using try-catch blocks.",
            whyUse: "Async/await is widely used in API integrations, database queries, file processing, and any workflow involving multiple asynchronous operations.",
            example: `
async function getUsers() {
  const response =
    await fetch("/users");

  return response.json();
}
`,
        },
        {
            q: "What are array methods map, filter, and reduce?",
            a: "map, filter, and reduce are higher-order array methods used for transforming and processing data. map creates a new array by transforming each element. filter creates a new array containing only elements that match a condition. reduce processes all elements and combines them into a single value such as a sum, object, or aggregated result. These methods do not modify the original array and support a functional programming style.",
            whyUse: "These methods are commonly used for data transformation, API response processing, reporting, analytics, React rendering, and business logic implementation.",
            example: `
const numbers = [1, 2, 3, 4];

const doubled =
  numbers.map(n => n * 2);

const evens =
  numbers.filter(n => n % 2 === 0);

const total =
  numbers.reduce(
    (sum, n) => sum + n,
    0
  );
`,
        },
        {
            q: "What is event delegation in JavaScript?",
            a: "Event delegation is a technique where a single event listener is attached to a parent element instead of attaching separate listeners to multiple child elements. It works because events bubble up through the DOM hierarchy. The parent listener identifies which child triggered the event using the event.target property. This approach improves performance, reduces memory usage, and automatically supports dynamically added elements.",
            whyUse: "Event delegation is commonly used in large tables, lists, menus, dynamic content, and React applications where many similar elements need the same event handling logic.",
            example: `
document
  .getElementById("list")
  .addEventListener(
    "click",
    (event) => {
      if (
        event.target.matches(
          ".item"
        )
      ) {
        console.log(
          "Item clicked"
        );
      }
    }
  );
`,
        },
        {
            q: "What is the prototype chain in JavaScript?",
            a: "The prototype chain is JavaScript's inheritance mechanism. Every object has an internal reference to another object called its prototype. When a property or method is accessed, JavaScript first checks the object itself. If the property is not found, it searches the prototype, then the prototype's prototype, and continues until it reaches null. This chain allows objects to inherit behavior without duplicating methods.",
            whyUse: "The prototype chain enables inheritance, code reuse, and memory-efficient sharing of methods across multiple object instances.",
            example: `
const animal = {
  breathe() {
    return "breathing";
  }
};

const dog =
  Object.create(animal);

dog.breathe();
`,
        },
        {
            q: "What is the 'this' keyword in JavaScript?",
            a: "The 'this' keyword refers to the execution context of a function. Its value depends on how the function is invoked. In an object method, this refers to the object. When a function is called with new, this refers to the newly created object. Functions invoked with call, apply, or bind explicitly set this. Arrow functions are different because they do not create their own this value and instead inherit it from the surrounding scope.",
            whyUse: "Understanding this is essential when working with object-oriented JavaScript, event handlers, classes, React components, callbacks, and asynchronous code.",
            example: `
const user = {
  name: "John",
  greet() {
    return this.name;
  }
};

user.greet();
`,
        },
    ],
    Intermediate: [{
            q: "What are higher-order functions in JavaScript?",
            a: "A higher-order function is a function that either accepts another function as an argument or returns a function as its result. JavaScript supports higher-order functions because functions are first-class citizens, meaning they can be stored in variables, passed as arguments, and returned from other functions. Common examples include map, filter, reduce, forEach, and custom utility functions.",
            whyUse: "Higher-order functions enable code reuse, abstraction, functional programming patterns, middleware implementation, event handling, and utility functions such as debounce, throttle, and memoization.",
            example: `
function multiply(factor) {
  return function(num) {
    return num * factor;
  };
}

const double =
  multiply(2);

double(5);
`,
        },
        {
            q: "Explain the JavaScript event loop with microtasks and macrotasks.",
            a: "JavaScript is single-threaded and executes synchronous code first using the call stack. Once the call stack becomes empty, the event loop processes queued tasks. Microtasks, such as Promise callbacks and queueMicrotask, have higher priority and are executed before macrotasks. Macrotasks include setTimeout, setInterval, and certain I/O operations. The event loop continuously checks the queues and ensures asynchronous operations are executed in the correct order.",
            whyUse: "Understanding the event loop helps developers debug asynchronous behavior, avoid race conditions, and explain the execution order of Promises, timers, and API calls during interviews.",
            example: `
console.log("A");

setTimeout(() => {
  console.log("D");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("C");
  });

console.log("B");

// Output:
// A
// B
// C
// D
`,
        },
        {
            q: "What is memoization and how do you implement it?",
            a: "Memoization is an optimization technique that stores the results of expensive function calls and returns cached results when the same inputs are provided again. It improves performance by avoiding repeated calculations. Memoization works best for pure functions that always return the same output for the same input.",
            whyUse: "Memoization is commonly used in data processing, recursive algorithms, React performance optimization, caching API results, and reducing expensive computations.",
            example: `
const cache = new Map();

function getSquare(num) {
  if (cache.has(num)) {
    return cache.get(num);
  }

  const result =
    num * num;

  cache.set(num, result);

  return result;
}
`,
        },
        {
            q: "What is the difference between call, apply, and bind?",
            a: "call, apply, and bind are methods used to explicitly control the value of the this keyword. call invokes a function immediately and accepts arguments individually. apply also invokes immediately but accepts arguments as an array. bind does not execute the function immediately; instead, it returns a new function with this permanently bound to a specified object.",
            whyUse: "These methods are useful for method borrowing, callback handling, event listeners, partial function application, and ensuring the correct execution context.",
            example: `
function greet(message) {
  return message +
    " " +
    this.name;
}

const user = {
  name: "John"
};

greet.call(
  user,
  "Hello"
);

greet.apply(
  user,
  ["Hi"]
);

const sayHello =
  greet.bind(
    user,
    "Welcome"
  );
`,
        },
        {
            q: "What are generators in JavaScript?",
            a: "Generators are special functions that can pause and resume execution using the yield keyword. They are declared using function*. Instead of returning all values at once, generators produce values on demand through an iterator interface. Each call to next() resumes execution from where it previously paused.",
            whyUse: "Generators are useful for lazy loading, processing large datasets, creating custom iterators, generating infinite sequences, and handling complex iteration logic efficiently.",
            example: `
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

const gen =
  numbers();

gen.next();
gen.next();
`,
        },
        {
            q: "What is the difference between deep copy and shallow copy?",
            a: "A shallow copy creates a new object or array but only copies the top-level properties. Any nested objects or arrays remain shared by reference, so changes to nested data affect both copies. A deep copy recursively copies all nested levels, creating a completely independent structure. Modern JavaScript provides structuredClone for creating deep copies of most built-in data types.",
            whyUse: "Understanding the difference is important when working with state management, React applications, API responses, and nested objects to avoid accidental data mutations.",
            example: `
const original = {
  user: {
    name: "John"
  }
};

const shallow = {
  ...original
};

const deep =
  structuredClone(
    original
  );
`,
        },
        {
            q: "What is currying in JavaScript?",
            a: "Currying is a functional programming technique that transforms a function with multiple arguments into a sequence of functions that each accept a single argument. It allows partial application, meaning developers can create specialized functions from more generic ones. Currying improves code reusability and composability.",
            whyUse: "Currying is commonly used in functional programming, utility libraries, middleware creation, reusable business logic, and function composition.",
            example: `
const multiply =
  a => b => a * b;

const double =
  multiply(2);

double(5);
`,
        },
        {
            q: "What are WeakMap and WeakSet?",
            a: "WeakMap and WeakSet are collections that store weak references to objects. Unlike Map and Set, they do not prevent their objects from being garbage collected when no other references exist. WeakMap stores key-value pairs where keys must be objects, while WeakSet stores unique object references. They are not iterable and do not provide size properties.",
            whyUse: "WeakMap and WeakSet are useful for memory-safe caching, storing metadata about objects, tracking DOM elements, and avoiding memory leaks in long-running applications.",
            example: `
const cache =
  new WeakMap();

let user = {
  id: 1
};

cache.set(
  user,
  "cached data"
);

user = null;
`,
        },
        {
            q: "What is the Proxy object in JavaScript?",
            a: "A Proxy is a special object that allows developers to intercept and customize operations performed on another object. It can monitor property access, assignments, function calls, deletions, and other fundamental operations. Proxies are commonly used for validation, logging, security controls, and implementing reactive systems.",
            whyUse: "Frameworks such as Vue 3 use Proxies for reactivity. They are also useful for validation, debugging, access control, and creating dynamic object behavior.",
            example: `
const user =
  new Proxy(
    {},
    {
      set(
        target,
        key,
        value
      ) {
        target[key] =
          value;
        return true;
      }
    }
  );
`,
        },
        {
            q: "What is optional chaining (?.) and nullish coalescing (??) in JavaScript?",
            a: "Optional chaining allows safe access to nested properties without throwing errors when intermediate values are null or undefined. Nullish coalescing provides a default value only when the left-hand side is null or undefined. Unlike the logical OR operator, nullish coalescing does not treat values such as 0, false, or an empty string as missing values.",
            whyUse: "These operators simplify working with API responses, optional data structures, configuration objects, and deeply nested properties while reducing verbose null checks.",
            example: `
const city =
  user?.address?.city;

const count =
  userCount ?? 0;

const location =
  user?.address?.city ??
  "Unknown";
`,
        },
        {
            q: "What are Object.keys(), Object.values(), and Object.entries()?",
            a: "Object.keys(), Object.values(), and Object.entries() are static methods used to extract an object's own enumerable properties. Object.keys() returns an array of keys, Object.values() returns an array of values, and Object.entries() returns an array of key-value pairs. These methods make it easy to use array methods such as map, filter, and reduce on objects.",

            whyUse: "They are commonly used for iterating over objects, transforming object data, filtering properties, checking if an object is empty, and converting objects into arrays for further processing.",

            example: `
const user = {
  name: "Alice",
  age: 30,
  role: "Admin"
};

console.log(Object.keys(user));
console.log(Object.values(user));
console.log(Object.entries(user));

for (const [key, value] of Object.entries(user)) {
  console.log(key, value);
}
`,
        },

        {
            q: "What are the ES6+ features you use most in modern JavaScript?",
            a: "ES6 and later versions introduced many powerful features that simplify development. Commonly used features include let/const, arrow functions, template literals, destructuring, default parameters, spread/rest operators, promises, async/await, modules, classes, optional chaining, nullish coalescing, and object/array utility methods.",

            whyUse: "Modern JavaScript features improve readability, maintainability, performance, and reduce boilerplate code. Most modern frameworks like React heavily rely on ES6+ syntax.",

            example: `
const user = {
  name: "John",
  age: 28
};

const { name } = user;

const greet = () => {
  console.log(\`Hello \${name}\`);
};

greet();
`,
        },

        {
            q: "What is the difference between Map and Object in JavaScript?",
            a: "Both Map and Object store key-value pairs, but Map is designed specifically for collections. Objects only allow string and Symbol keys, while Maps allow any data type as a key. Maps maintain insertion order, provide a size property, and have built-in methods such as set(), get(), has(), and delete().",

            whyUse: "Use Object for fixed data structures such as user details or configurations. Use Map when keys are dynamic, non-string values, or when frequent additions and deletions are required.",

            example: `
const map = new Map();

map.set("name", "John");
map.set(1, "Number Key");

console.log(map.get("name"));
console.log(map.size);

const obj = {
  name: "John"
};
`,
        },

        {
            q: "What are JavaScript Symbols and when do you use them?",
            a: "Symbol is a primitive data type introduced in ES6 that creates unique identifiers. Every Symbol value is unique, even if two symbols have the same description. Symbols are commonly used as unique object property keys to avoid naming collisions.",

            whyUse: "Use Symbols when creating unique property names, implementing custom iterators, defining internal object properties, or extending built-in behavior using well-known symbols like Symbol.iterator.",

            example: `
const ID = Symbol("id");

const user = {
  name: "John",
  [ID]: 101
};

console.log(user[ID]);
`,
        },

        {
            q: "What are Service Workers in JavaScript?",
            a: "Service Workers are scripts that run in the background separately from the web page. They intercept network requests, cache resources, enable offline support, background synchronization, and push notifications. Service Workers are the foundation of Progressive Web Applications (PWAs).",

            whyUse: "They improve performance through caching, allow applications to work offline, reduce network usage, and enable features like push notifications and background updates.",

            example: `
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => {
      console.log("Service Worker Registered");
    })
    .catch(err => {
      console.error(err);
    });
}
`,
        },
    ],
    "Advanced & Scenario": [{
            tag: "SCENARIO",
            q: "A colleague's code has a bug: a loop creates 5 buttons, but clicking any button always alerts '5' instead of the button's index. Explain the bug and provide three different fixes.",
            a: "This is the classic closure + var scope issue. The event handler doesn't capture the value of i at each iteration; it captures the variable itself. Since var is function-scoped, all handlers share the same i variable. By the time any button is clicked, the loop has finished and i becomes 5, so every button alerts 5.",

            whyUse: "This question tests understanding of closures, lexical scope, event handlers, and the difference between var and let.",

            example: `
/* Buggy Code */
for (var i = 0; i < 5; i++) {
  button.addEventListener('click', function () {
    alert(i); // Always 5
  });
}

/* Fix 1: let */
for (let i = 0; i < 5; i++) {
  button.addEventListener('click', () => {
    alert(i);
  });
}

/* Fix 2: IIFE */
for (var i = 0; i < 5; i++) {
  (function(index) {
    button.addEventListener('click', () => {
      alert(index);
    });
  })(i);
}

/* Fix 3: bind */
for (var i = 0; i < 5; i++) {
  button.addEventListener(
    'click',
    alert.bind(null, i)
  );
}
`,
        },

        {
            tag: "SCENARIO",
            q: "You need to implement a debounce function from scratch for a search input. Explain how debouncing works and write a full implementation.",
            a: "Debouncing delays function execution until a specified amount of time has passed since the last invocation. Every new call resets the timer. This prevents excessive API calls while users are typing.",

            whyUse: "Debouncing improves performance by reducing unnecessary operations such as API requests, validations, and expensive calculations.",

            example: `
function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const searchUsers = debounce((query) => {
  console.log("Searching:", query);
}, 300);

input.addEventListener("input", (e) => {
  searchUsers(e.target.value);
});
`,
        },

        {
            tag: "HARD",
            q: "Explain JavaScript's memory management, garbage collection, and common memory leak patterns.",
            a: "JavaScript automatically manages memory using Garbage Collection (GC). Modern engines use the Mark-and-Sweep algorithm. Starting from root objects (global scope, call stack, active closures), the GC marks all reachable objects and removes unreachable ones.",

            whyUse: "Understanding memory management helps identify leaks, optimize performance, and avoid crashes in long-running applications.",

            example: `
/* Memory Leak Example */
const users = [];

function addUser() {
  users.push(new Array(100000).fill("data"));
}

/* Event Listener Leak */
function setup() {
  const handler = () => console.log("resize");

  window.addEventListener("resize", handler);

  // Missing cleanup
  // window.removeEventListener("resize", handler);
}

/* Timer Leak */
const intervalId = setInterval(() => {
  console.log("running");
}, 1000);

// clearInterval(intervalId);
`,
        },

        {
            tag: "SCENARIO",
            q: "You're asked to implement throttle from scratch for window scroll events. How does throttle differ from debounce?",
            a: "Throttle ensures a function executes at most once during a specified interval. Unlike debounce, it does not wait for a pause. It provides regular updates while an event is continuously firing.",

            whyUse: "Throttle is commonly used for scroll tracking, resize events, progress bars, infinite scrolling, and drag operations.",

            example: `
function throttle(fn, limit) {
  let lastRun = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastRun >= limit) {
      lastRun = now;
      fn.apply(this, args);
    }
  };
}

const handleScroll = throttle(() => {
  console.log(window.scrollY);
}, 100);

window.addEventListener("scroll", handleScroll);
`,
        },

        {
            tag: "HARD",
            q: "Explain prototypal inheritance vs classical inheritance. How do ES6 classes work under the hood?",
            a: "JavaScript uses prototypal inheritance where objects inherit directly from other objects through a prototype chain. Classical inheritance (Java, C++) relies on classes as blueprints. ES6 classes are primarily syntactic sugar built on top of JavaScript's prototype system.",

            whyUse: "Understanding prototypes helps explain inheritance, method sharing, instanceof behavior, and how JavaScript actually works internally.",

            example: `
/* ES6 Class */
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return this.name + " makes a sound";
  }
}

class Dog extends Animal {
  speak() {
    return this.name + " barks";
  }
}

/* Under the hood */
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  return this.name + " makes a sound";
};

function Dog(name) {
  Animal.call(this, name);
}

Dog.prototype = Object.create(
  Animal.prototype
);

Dog.prototype.constructor = Dog;

Dog.prototype.speak = function () {
  return this.name + " barks";
};
`,
        },
        {
            q: "Implement retry logic with exponential backoff in JavaScript for unreliable API calls.",
            a: "When calling external APIs, temporary failures such as network issues, rate limiting, or server errors can occur. Instead of failing immediately, I implement retry logic with exponential backoff, where the delay increases after each failed attempt. This reduces pressure on the server and improves resiliency. I also add jitter, which introduces a small random delay so that multiple clients do not retry simultaneously and create a thundering herd problem. In production, I typically retry only transient errors such as network failures or HTTP 5xx responses and avoid retrying client-side errors like 4xx responses.",
            whyUse: "Used when integrating with third-party APIs, payment gateways, cloud services, message queues, or any system where transient failures are expected. It improves reliability without overwhelming downstream services.",
            example: `
async function withRetry(fn, options = {}) {
  const { maxRetries = 3, baseDelay = 500 } = options;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === maxRetries) throw err;

      const delay =
        baseDelay * Math.pow(2, attempt) +
        Math.random() * 100;

      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
`,
        },
        {
            q: "What is the JavaScript event loop? Explain with a detailed execution trace.",
            a: "The event loop is the mechanism that allows JavaScript to handle asynchronous operations while remaining single-threaded. It continuously checks whether the call stack is empty and decides which queued task should execute next. JavaScript processes synchronous code first, then executes all pending microtasks such as Promise callbacks, and only after that processes one macrotask such as a setTimeout callback. Understanding the event loop is important because it explains why Promise callbacks execute before timers, even when a timer has a delay of zero milliseconds.",
            whyUse: "A solid understanding of the event loop helps debug asynchronous code, avoid race conditions, improve performance, and correctly predict execution order in real-world applications.",
            example: `
console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve()
  .then(() => {
    console.log('C');
    Promise.resolve().then(() => console.log('D'));
  })
  .then(() => console.log('E'));

console.log('F');

// Output:
// A
// F
// C
// D
// E
// B
`,
        },
        {
            q: "What are pipe() and compose() functions in functional programming? Explain with a real-world example.",
            a: "Pipe and compose are function composition utilities that allow multiple functions to be combined into a single processing pipeline. Pipe executes functions from left to right, while compose executes them from right to left. They improve readability, reduce nested function calls, and make business logic easier to test and maintain. In large applications, they are often used for data transformation, validation pipelines, request processing, and reusable business workflows.",
            whyUse: "Useful for building clean data transformation pipelines, processing API responses, formatting user input, validation chains, and creating reusable business logic.",
            example: `
const pipe = (...fns) =>
  value => fns.reduce((v, fn) => fn(v), value);

const trim = str => str.trim();
const lower = str => str.toLowerCase();
const slugify = str => str.replace(/\\s+/g, '-');

const createSlug = pipe(trim, lower, slugify);

createSlug(' Hello World ');
// hello-world
`,
        },
        {
            q: "Why does 'this' behave differently in JavaScript? Explain the four binding rules.",
            a: "In JavaScript, the value of 'this' depends on how a function is called rather than where it is defined. There are four primary binding rules. New binding occurs when a function is called with the new keyword, making 'this' refer to the newly created object. Explicit binding occurs when call, apply, or bind is used to set 'this' manually. Implicit binding occurs when a function is called as a method of an object, making 'this' refer to that object. Default binding occurs when none of the other rules apply, causing 'this' to refer to the global object or be undefined in strict mode. Arrow functions are different because they do not have their own 'this' and instead inherit it from the surrounding lexical scope.",
            whyUse: "Understanding 'this' is essential when working with objects, classes, event handlers, callbacks, React components, and asynchronous code where context can easily be lost.",
            example: `
function greet() {
  return this.name;
}

const user = { name: 'John' };

greet.call(user); // John

const obj = {
  name: 'Alice',
  greet() {
    return this.name;
  }
};

obj.greet(); // Alice
`,
        },
        {
            q: "Implement a custom Promise class from scratch showing internal states and how chaining works.",
            a: "A Promise has three states: pending, fulfilled, and rejected. Once a Promise is fulfilled or rejected, its state becomes immutable. Internally, Promises maintain queues of success and failure callbacks that execute when the asynchronous operation completes. Chaining works because every call to then() returns a new Promise. The value returned from one handler becomes the input to the next Promise in the chain. If an error is thrown inside a handler, the returned Promise is automatically rejected, enabling error propagation through the chain. Promise callbacks are executed asynchronously using the microtask queue, ensuring predictable execution order.",
            whyUse: "Understanding how Promises work internally helps developers debug async code, build custom async abstractions, and better understand chaining, error propagation, async/await, and the event loop.",
            example: `
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
  }

  then(onFulfilled) {
    return new MyPromise((resolve) => {
      resolve(onFulfilled(this.value));
    });
  }
}
`,
        },
        {
            q: "What is layout thrashing in JavaScript and how do you fix it?",
            a: "Layout thrashing occurs when JavaScript repeatedly alternates between reading layout information from the DOM and writing changes back to it. Every layout read after a DOM mutation can force the browser to recalculate styles and layout synchronously, which is expensive and can significantly degrade performance. The solution is to batch all layout reads together and all DOM writes together. For animations, requestAnimationFrame should be used, and where possible, CSS transforms should be preferred because they avoid triggering layout recalculations.",
            whyUse: "This is a common frontend performance issue in large applications with complex UIs, animations, dashboards, virtualized lists, or data-heavy pages.",
            example: `
const widths = [...boxes].map(box => box.offsetWidth);

boxes.forEach((box, index) => {
  box.style.width = widths[index] * 2 + 'px';
});
`,
        },
        {
            q: "What is the difference between compile-time and runtime errors in JavaScript? How do you handle both systematically?",
            a: "Compile-time errors in JavaScript are syntax errors that prevent the code from being parsed and executed. Examples include missing brackets, invalid syntax, or incorrect language constructs. Runtime errors occur after execution starts and include ReferenceError, TypeError, RangeError, and other exceptions caused by unexpected conditions. In large applications, compile-time issues are reduced using tools such as TypeScript, ESLint, and build-time validation. Runtime errors are handled through try-catch blocks, global error handlers, custom error classes, defensive coding techniques, and monitoring tools such as Sentry or Datadog. A robust error strategy distinguishes between operational errors that can be handled gracefully and programming errors that require developer intervention.",
            whyUse: "Proper error handling improves application stability, user experience, debugging efficiency, and production monitoring.",
            example: `
try {
  processUserData(data);
} catch (error) {
  console.error(error);
}

window.addEventListener('unhandledrejection', event => {
  console.error(event.reason);
});
`,
        },
    ],
};

export default javascriptData;