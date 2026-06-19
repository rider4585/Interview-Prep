const reactData = {
    Beginner: [{
            q: "What is React and why is it used?",
            a: "React is a JavaScript library developed by Facebook for building user interfaces. It uses reusable components and a Virtual DOM to create fast, scalable, and interactive web applications.",
            whyUse: "React is used to build modern web applications with reusable UI components, better maintainability, and efficient rendering. It is commonly used in dashboards, e-commerce platforms, social media applications, and enterprise systems.",
            example: "A shopping website can use separate React components for the Header, Product List, Cart, and Footer, allowing developers to reuse and maintain them independently.",
        },
        {
            q: "What are the main features of React?",
            a: "React provides Component-Based Architecture, Virtual DOM, JSX, One-Way Data Flow, Hooks, and Reusable Components, making applications easier to build, maintain, and scale.",
            whyUse: "These features help developers create large applications that are easier to maintain, debug, and optimize while improving development speed and application performance.",
            example: "In an e-commerce application, the Product Card component can be reused across product listings, search results, and recommendation sections.",
        },
        {
            q: "What is a Package in JavaScript?",
            a: "A package is a collection of reusable JavaScript code that provides specific functionality. It can be installed using npm to speed up development and reduce code duplication.",
            whyUse: "Packages help developers avoid reinventing common functionality such as routing, form validation, date handling, state management, and API communication.",
            example: `
npm install axios
`,
        },
        {
            q: "What is npm and how does it work?",
            a: "npm (Node Package Manager) is a tool used to install, manage, and update JavaScript packages. It downloads dependencies from the npm registry and stores them in the node_modules folder.",
            whyUse: "npm simplifies dependency management and allows teams to share, version, and maintain project libraries consistently across development environments.",
            example: `
npm install react-router-dom
`,
        },
        {
            q: "What are components in React?",
            a: "Components are reusable building blocks of a React application that contain UI and logic. They help divide the application into smaller, maintainable, and independent parts.",
            whyUse: "Components promote code reusability, maintainability, and separation of concerns. They allow developers to build complex user interfaces by combining smaller, self-contained pieces.",
            example: "In an e-commerce application, Header, ProductCard, Cart, and Footer can all be separate reusable components.",
        },
        {
            q: "What is JSX?",
            a: "JSX (JavaScript XML) is a syntax extension that allows developers to write HTML-like code inside JavaScript. It improves readability and is converted into JavaScript by Babel before execution.",
            whyUse: "JSX makes UI code easier to read and write because developers can describe the user interface using HTML-like syntax directly within JavaScript.",
            example: `
const element = <h1>Welcome to React</h1>;
`,
        },
        {
            q: "What is the difference between a functional and class component?",
            a: "Functional components are JavaScript functions that return JSX and support Hooks, while class components are ES6 classes that use lifecycle methods and state through this.state. Modern React development primarily uses functional components.",
            whyUse: "Functional components are preferred because they are simpler, easier to test, require less boilerplate code, and support React Hooks for state and lifecycle management.",
            example: `
function Welcome() {
  return <h1>Hello User</h1>;
}
`,
        },
        {
            q: "What are props in React?",
            a: "Props are read-only values passed from a parent component to a child component. They help components communicate and make components reusable by allowing dynamic data to be passed.",
            whyUse: "Props enable data sharing between components and make components reusable by allowing them to display different information without changing their internal logic.",
            example: `
<UserCard name="John" role="Admin" />
`,
        },
        {
            q: "What is the difference between props and state?",
            a: "Props are data passed from a parent component and cannot be modified by the child, whereas state is managed inside a component and can be updated using state setter functions.",
            whyUse: "Understanding the difference between props and state is essential for managing data flow in React applications. Props are used for component communication, while state is used for managing dynamic data within a component.",
            example: "A UserProfile component may receive user details through props, while managing the visibility of an edit form using state.",
        },
        {
            q: "What is state in React?",
            a: "State is a built-in object used to store data that can change over time within a component. When state changes, React automatically re-renders the component to update the UI.",
            whyUse: "State is used whenever the UI needs to respond to user interactions, API responses, form inputs, or any data that changes during the lifecycle of a component.",
            example: `
const [count, setCount] = useState(0);
`,
        },
        {
            q: "What is the useState Hook?",
            a: "useState is a React Hook that allows functional components to create and manage state. It returns the current state value and a setter function to update that state.",
            whyUse: "useState is the most commonly used Hook for managing local component state such as form values, counters, modal visibility, selected items, and UI toggles.",
            example: `
const [name, setName] = useState("");
setName("John");
`,
        },
        {
            q: "What is the useEffect Hook?",
            a: "useEffect is a React Hook used to perform side effects such as API calls, timers, event listeners, and subscriptions after a component renders.",
            whyUse: "useEffect is used whenever a component needs to interact with external systems, fetch data, subscribe to events, or perform cleanup operations when the component unmounts.",
            example: `
useEffect(() => {
  fetchUsers();
}, []);
`,
        },
        {
            q: "What is the Virtual DOM?",
            a: "The Virtual DOM is a lightweight copy of the real DOM maintained by React. It compares changes efficiently and updates only the necessary parts of the actual DOM to improve performance.",
            whyUse: "The Virtual DOM improves application performance by reducing direct manipulation of the real DOM, which is an expensive operation. React updates only the parts of the UI that have changed instead of re-rendering the entire page.",
            example: "When a user updates a single item in a shopping cart, React compares the new Virtual DOM with the previous one and updates only that specific item instead of refreshing the entire product list.",
        },
        {
            q: "What are lists and keys in React?",
            a: "Lists are used to render multiple items dynamically using arrays, while keys are unique identifiers that help React efficiently track and update list items.",
            whyUse: "Lists allow developers to render dynamic data such as products, users, comments, or orders. Keys help React identify each item uniquely and optimize rendering performance during updates.",
            example: `
const users = ["John", "Jane", "Mike"];

users.map((user, index) => (
  <li key={index}>{user}</li>
));
`,
        },
        {
            q: "Why are keys important in React lists?",
            a: "Keys help React identify which list items have changed, been added, or removed, allowing efficient DOM updates and preventing unnecessary re-renders.",
            whyUse: "Without keys, React cannot accurately determine which items changed between renders, leading to unnecessary DOM updates and potential UI bugs when items are reordered.",
            example: "In an e-commerce application, each product card should use a unique product ID as the key so React can efficiently update only the affected products when inventory changes.",
        },
        {
            q: "What is conditional rendering in React?",
            a: "Conditional rendering allows components to display different UI elements based on specific conditions using JavaScript operators like if, ternary, or logical AND.",
            whyUse: "Conditional rendering is commonly used to show loading indicators, authentication-based content, error messages, role-based UI, and feature-specific sections.",
            example: `
{isLoggedIn ? <Dashboard /> : <Login />}
`,
        },
        {
            q: "What is lifting state up in React?",
            a: "Lifting state up is the process of moving shared state to the nearest common parent component so multiple child components can access and update the same data.",
            whyUse: "Lifting state up helps maintain a single source of truth when multiple components need access to the same data. It improves data consistency and simplifies state management.",
            example: "A shopping cart application may store cart data in a parent component so both the ProductList and CartSummary components can access and update the same cart information.",
        },
        {
            q: "What is a controlled component?",
            a: "A controlled component is a form element whose value is managed by React state, making React the single source of truth for form data.",
            whyUse: "Controlled components provide better control over form data, validation, and user input handling. They are commonly used in forms that require real-time validation or dynamic behavior.",
            example: `
const [email, setEmail] = useState("");

<input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
`,
        },
        {
            q: "What is an uncontrolled component?",
            a: "An uncontrolled component stores its value in the DOM instead of React state and is typically accessed using refs when needed.",
            whyUse: "Uncontrolled components are useful when simple form handling is needed or when integrating with non-React libraries that directly interact with DOM elements.",
            example: `
const inputRef = useRef();

<input ref={inputRef} />
`,
        },
        {
            q: "What is event handling in React?",
            a: "Event handling in React allows applications to respond to user interactions such as clicks, form submissions, and keyboard events using camelCase event handlers like onClick and onChange.",
            whyUse: "Event handling enables interactive user experiences such as submitting forms, opening modals, filtering data, and responding to user actions.",
            example: `
<button onClick={handleClick}>
  Submit
</button>
`,
        },
        {
            q: "What is a React Router?",
            a: "React Router is a library that enables client-side routing in React applications, allowing navigation between pages without reloading the browser.",
            whyUse: "React Router is used to create multi-page experiences in Single Page Applications. It enables navigation, route protection, dynamic routes, and nested layouts while maintaining a smooth user experience.",
            example: `
<Route path="/users" element={<Users />} />
<Route path="/profile" element={<Profile />} />
`,
        },
        {
            q: "What is the difference between BrowserRouter and HashRouter?",
            a: "BrowserRouter uses the HTML5 History API and provides clean URLs, while HashRouter uses a hash (#) in the URL and works without server-side routing configuration.",
            whyUse: "BrowserRouter is preferred for modern web applications because it provides clean and SEO-friendly URLs. HashRouter is useful when server configuration cannot be modified, such as static hosting environments.",
            example: `
BrowserRouter:
https://example.com/profile

HashRouter:
https://example.com/#/profile
`,
        },
        {
            q: "What is prop drilling and how do you avoid it?",
            a: "Prop drilling is the process of passing data through multiple intermediate components. It can be avoided using Context API, Redux, Zustand, or component composition patterns.",
            whyUse: "Prop drilling can make applications harder to maintain because intermediate components receive props they do not use. State management solutions help share data more efficiently across the component tree.",
            example: "If user information needs to be passed from App to a deeply nested Profile component through several intermediate components, Context API can provide the data directly without passing props at every level.",
        },
        {
            q: "What is a React Fragment?",
            a: "A React Fragment allows multiple elements to be grouped together without adding an extra DOM node, helping keep the DOM structure clean.",
            whyUse: "Fragments prevent unnecessary wrapper elements such as extra div tags, resulting in cleaner HTML and avoiding layout or styling issues.",
            example: `
<>
  <h1>Title</h1>
  <p>Description</p>
</>
`,
        },
        {
            q: "Does ReactDOM.render() replace existing content inside the root element?",
            a: "Yes, ReactDOM.render() and createRoot().render() replace all existing content inside the root element and allow React to take complete control of that DOM container.",
            whyUse: "This behavior allows React to manage the entire UI within the root element, ensuring consistent rendering and state updates throughout the application.",
            example: "If the root div initially contains static HTML, React replaces that content and manages all future updates inside the root container.",
        },
        {
            q: "What is Tree Shaking in React?",
            a: "Tree Shaking is a build optimization technique that removes unused code from the final JavaScript bundle, reducing bundle size and improving application performance.",
            whyUse: "Smaller bundles load faster, consume less bandwidth, and improve application performance, especially for users on slower networks or mobile devices.",
            example: "If a utility library exports 100 functions but the application uses only 5, Tree Shaking removes the unused 95 functions from the production bundle.",
        },
        {
            q: "What is a Single Page Application (SPA)?",
            a: "A Single Page Application loads a single HTML page and dynamically updates content without full page reloads, providing a faster and more seamless user experience.",
            whyUse: "SPAs provide smoother navigation, better user experience, and faster interactions because only the required data and components are updated instead of reloading the entire page.",
            example: "Applications like Gmail, Trello, and many admin dashboards use the SPA approach to navigate between screens without refreshing the browser.",
        },
    ],
    "Hooks & Core Concepts": [{
            q: "What are React Hooks?",
            a: "React Hooks are special functions introduced in React 16.8 that allow functional components to use state, lifecycle methods, context, and other React features without using class components. Hooks make code more readable, reusable, and easier to maintain. Common Hooks include useState, useEffect, useContext, useRef, useMemo, and useCallback. Hooks follow two important rules: they should only be called at the top level and only inside React function components or custom Hooks.",
            whyUse: "Hooks simplify React development by allowing state and lifecycle functionality in functional components. They encourage code reuse, better separation of concerns, and cleaner component architecture compared to class components.",
            example: `
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
`,
        },
        {
            q: "What is the difference between useEffect and useLayoutEffect?",
            a: "Both Hooks are used to perform side effects, but they execute at different times. useEffect runs after the browser paints the UI and is commonly used for API calls, subscriptions, and timers. useLayoutEffect runs synchronously after DOM updates but before the browser paints, making it useful for DOM measurements and preventing visual flickering. In most scenarios, useEffect should be preferred because it does not block rendering.",
            whyUse: "useEffect is used for most side effects such as API calls and event listeners. useLayoutEffect is used when DOM measurements or layout updates must occur before the browser paints to avoid visual inconsistencies.",
            example: `
useEffect(() => {
  fetchUsers();
}, []);

useLayoutEffect(() => {
  const width = divRef.current.offsetWidth;
}, []);
`,
        },
        {
            q: "What is memoization in React?",
            a: "Memoization is a performance optimization technique that stores previously calculated results and reuses them when the inputs have not changed. React provides React.memo for components, useMemo for computed values, and useCallback for functions. Memoization helps reduce unnecessary calculations and re-renders. It should only be used when there is a measurable performance benefit because memoization itself has a small overhead.",
            whyUse: "Memoization is useful in large applications where expensive calculations or unnecessary component re-renders can negatively impact performance. It helps improve responsiveness and reduce processing time.",
            example: `
const sortedUsers = useMemo(() => {
  return users.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}, [users]);
`,
        },
        {
            q: "What is Lazy Loading in React?",
            a: "Lazy Loading is a technique that loads components only when they are required instead of loading the entire application at once. This reduces the initial bundle size and improves application loading speed. React provides React.lazy and Suspense to implement lazy loading. It is commonly used for route-based code splitting and large components such as dashboards and charts.",
            whyUse: "Lazy loading improves initial page load performance by downloading code only when users need it. It is especially beneficial for large applications with multiple routes and heavy UI components.",
            example: `
const Dashboard = React.lazy(() =>
  import("./Dashboard")
);

<Suspense fallback={<Loader />}>
  <Dashboard />
</Suspense>
`,
        },
        {
            q: "How can you improve React performance?",
            a: "React performance can be improved by reducing unnecessary re-renders and optimizing rendering operations. Common techniques include React.memo, useMemo, useCallback, lazy loading, code splitting, virtualization for large lists, and keeping state as local as possible. Developers should use React DevTools Profiler to identify bottlenecks before applying optimizations. Optimizing without measurement can add unnecessary complexity.",
            whyUse: "Performance optimization ensures smooth user experiences, faster page loads, and efficient rendering in large-scale applications such as dashboards, e-commerce platforms, and data-intensive systems.",
            example: `
const UserCard = React.memo(function UserCard() {
  return <div>User</div>;
});

const activeUsers = useMemo(() => {
  return users.filter(user => user.active);
}, [users]);
`,
        },
        {
            q: "What causes unnecessary re-renders in React?",
            a: "Unnecessary re-renders happen when a component renders even though its displayed data has not changed. Common causes include creating new object, array, or function references during every render, parent component re-renders, changing Context values, and incorrect key usage in lists. These issues can be minimized using React.memo, useMemo, and useCallback. React DevTools Profiler can help identify such problems.",
            whyUse: "Understanding the causes of unnecessary re-renders helps developers optimize application performance, especially in large applications with complex component trees and data-intensive screens.",
            example: `
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);
`,
        },
        {
            q: "What are Lifecycle Methods in React?",
            a: "Lifecycle methods are special methods available in class components that run during different stages of a component's life cycle such as mounting, updating, and unmounting. Common methods include componentDidMount, componentDidUpdate, and componentWillUnmount. In modern React applications, lifecycle behavior is achieved using the useEffect Hook. Understanding lifecycle methods helps developers manage side effects and cleanup operations properly.",
            whyUse: "Lifecycle methods are used to perform tasks such as fetching data, subscribing to events, initializing resources, and cleaning up timers or listeners when a component is removed.",
            example: `
useEffect(() => {
  console.log("Mounted");

  return () => {
    console.log("Unmounted");
  };
}, []);
`,
        },
        {
            q: "What is State Management in React?",
            a: "State Management is the process of storing, updating, and sharing data within an application. React provides useState and useReducer for local state management and Context API for shared state. For larger applications, libraries such as Redux Toolkit, Zustand, and React Query are commonly used. Proper state management helps maintain predictable data flow and improves application scalability.",
            whyUse: "State management is essential when multiple components need access to shared data such as user information, shopping carts, application settings, authentication status, or API data.",
            example: `
const [user, setUser] = useState(null);

setUser({
  name: "John",
  role: "Admin"
});
`,
        },
        {
            q: "What is the dependency array in useEffect?",
            a: "The dependency array is the second argument of useEffect that controls when the effect should execute. An empty array makes the effect run only once after mounting, while specifying dependencies causes the effect to run whenever those values change. Without a dependency array, the effect runs after every render. Correct dependency management prevents bugs and unnecessary executions.",
            whyUse: "The dependency array helps control side effects efficiently, avoiding unnecessary API calls, event listener registrations, and performance issues caused by excessive effect executions.",
            example: `
useEffect(() => {
  fetchUser(userId);
}, [userId]);
`,
        },
        {
            q: "What is useContext and how does it work?",
            a: "useContext is a React Hook that allows components to access values stored in a Context without manually passing props through multiple levels. It helps solve the prop drilling problem and is commonly used for authentication, themes, language settings, and user information. Any component using useContext automatically receives updates when the Context value changes.",
            whyUse: "useContext is commonly used to share global data such as logged-in user information, application themes, language preferences, and permissions across multiple components without passing props manually.",
            example: `
const ThemeContext = createContext();

function Button() {
  const theme = useContext(ThemeContext);

  return <button>{theme}</button>;
}
`,
        },
        {
            q: "What is Context API?",
            a: "Context API is React's built-in mechanism for sharing data across multiple components without passing props manually at every level. It consists of createContext, Provider, and useContext. Context API is commonly used for authentication, theme management, localization, and user settings. It helps reduce prop drilling and simplifies state sharing across the component tree.",
            whyUse: "Context API is useful when multiple components need access to the same data. It helps avoid prop drilling and is commonly used for user authentication, themes, language preferences, permissions, and application settings.",
            example: `
const UserContext = createContext();

<UserContext.Provider value={user}>
  <Dashboard />
</UserContext.Provider>

const userData = useContext(UserContext);
`,
        },
        {
            q: "What is React Strict Mode?",
            a: "React Strict Mode is a development tool that helps identify potential issues and bad coding practices in React applications. It performs additional checks, warns about deprecated APIs, and intentionally runs certain functions and effects twice in development mode to detect side effects. Strict Mode does not affect production builds. It helps developers write cleaner, more reliable, and future-proof React applications. React 18 uses Strict Mode to verify that effects are properly cleaned up.",
            whyUse: "Strict Mode helps developers detect bugs early in development by highlighting unsafe lifecycle methods, side effects, deprecated APIs, and missing cleanup logic before they reach production.",
            example: `
<React.StrictMode>
  <App />
</React.StrictMode>
`,
        },
        {
            q: "What is a custom Hook in React?",
            a: "A custom Hook is a reusable JavaScript function that starts with the word 'use' and internally uses React Hooks. It allows developers to extract and reuse common stateful logic across multiple components without duplicating code. Custom Hooks improve code readability, maintainability, and separation of concerns. They follow the same rules as built-in Hooks and can call other Hooks internally.",
            whyUse: "Custom Hooks help eliminate duplicate logic and promote code reuse. They are commonly used for API calls, form handling, authentication, local storage management, and reusable business logic.",
            example: `
function useCounter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  return { count, increment };
}

function Counter() {
  const { count, increment } = useCounter();

  return (
    <button onClick={increment}>
      {count}
    </button>
  );
}
`,
        },
        {
            q: "What is a Portal in React?",
            a: "A Portal allows React components to render their content outside the normal DOM hierarchy while still remaining part of the React component tree. It is commonly used for modals, tooltips, popups, dropdowns, and notifications that need to appear above other UI elements. Even though the DOM location changes, event bubbling and Context API continue to work normally. Portals help solve z-index and overflow issues in complex layouts.",
            whyUse: "Portals are used when UI elements need to visually appear outside their parent container. They are especially useful for modals, dialogs, dropdowns, tooltips, and overlays that must appear above the rest of the page.",
            example: `
ReactDOM.createPortal(
  <Modal />,
  document.getElementById("modal-root")
);
`,
        },
        {
            q: "What is an Error Boundary in React?",
            a: "An Error Boundary is a React class component that catches JavaScript errors occurring in its child component tree and displays a fallback UI instead of crashing the entire application. It improves application stability and user experience by isolating component failures. Error Boundaries catch rendering, lifecycle, and constructor errors but do not catch asynchronous errors or event handler errors. They are commonly used around critical sections of an application.",
            whyUse: "Error Boundaries improve application reliability by preventing a single component failure from crashing the entire application. They are commonly placed around dashboards, payment pages, admin panels, and other critical features.",
            example: `
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong</h2>;
    }

    return this.props.children;
  }
}
`,
        },
        {
            q: "What is a Higher-Order Component (HOC)?",
            a: "A Higher-Order Component is a function that takes a component as input and returns a new enhanced component with additional functionality. HOCs are used for code reuse, authentication, authorization, logging, analytics, and feature flags. They help separate business logic from UI logic. Although custom Hooks are preferred in modern React applications, HOCs are still commonly found in legacy projects and third-party libraries.",
            whyUse: "HOCs allow developers to reuse common functionality across multiple components without duplicating code. They are commonly used for authentication checks, permissions, analytics tracking, feature flags, and logging.",
            example: `
function withAuth(Component) {
  return function(props) {
    const isLoggedIn = true;

    return isLoggedIn
      ? <Component {...props} />
      : <Login />;
  };
}

const ProtectedDashboard =
  withAuth(Dashboard);
`,
        },
        {
            q: "What is useCallback and when should you use it?",
            a: "useCallback is a React Hook that memoizes a function and returns the same function reference unless its dependencies change. It is mainly used to prevent unnecessary re-renders when passing callback functions to child components wrapped with React.memo. This optimization is useful for large lists and expensive child components. However, it should only be used when there is a measurable performance benefit because it also has a small overhead.",
            whyUse: "useCallback is useful when passing functions to child components, using functions inside dependency arrays, or optimizing large applications where unnecessary re-renders affect performance.",
            example: `
const handleClick = useCallback(() => {
  console.log("Button Clicked");
}, []);

return (
  <Button onClick={handleClick} />
);
`,
        },
        {
            q: "What is useRef and what are its main use cases?",
            a: "useRef is a React Hook that creates a mutable reference object whose value persists across renders. Unlike useState, updating a ref does not trigger a component re-render. It is commonly used for accessing DOM elements, storing interval IDs, tracking previous values, and preserving mutable data between renders. useRef is especially useful when you need to store values without affecting the UI.",
            whyUse: "useRef is commonly used for focusing input fields, integrating with third-party libraries, storing timer IDs, tracking previous values, and maintaining mutable data that should not trigger re-renders.",
            example: `
function App() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>
        Focus
      </button>
    </>
  );
}
`,
        },
        {
            q: "What is React.memo and how is it different from useMemo?",
            a: "React.memo is a Higher-Order Component that prevents a component from re-rendering if its props have not changed. useMemo is a Hook that memoizes the result of an expensive calculation. In simple terms, React.memo memoizes components, while useMemo memoizes values. Both are performance optimization techniques used to reduce unnecessary rendering and computations in React applications.",
            whyUse: "React.memo is used to optimize component rendering, while useMemo is used to optimize expensive calculations. Together they help improve performance in large and complex applications.",
            example: `
const UserCard = React.memo(
  ({ name }) => {
    return <h2>{name}</h2>;
  }
);

const filteredUsers = useMemo(() => {
  return users.filter(
    user => user.active
  );
}, [users]);
`,
        },
        {
            q: "What is reconciliation in React?",
            a: "Reconciliation is the process React uses to efficiently update the UI when state or props change. React creates a new Virtual DOM, compares it with the previous Virtual DOM using a diffing algorithm, and identifies the minimum number of changes required. It then updates only the affected parts of the real DOM. This process improves application performance by avoiding unnecessary DOM manipulations.",
            whyUse: "Reconciliation enables React to deliver high performance by minimizing direct DOM updates. It ensures only the necessary UI elements are updated when application data changes.",
            example: `
setCount(count + 1);

// React creates a new Virtual DOM,
// compares it with the previous one,
// and updates only changed elements.
`,
        },
        {
            q: "What is useMemo and when should you use it?",
            a: "useMemo is a React Hook that memoizes the result of an expensive computation and recalculates it only when its dependencies change. It is useful when working with large datasets, filtering, sorting, complex calculations, or derived values. By avoiding unnecessary recalculations, useMemo can improve application performance. It should only be used when profiling shows a real performance bottleneck.",
            whyUse: "useMemo is useful for optimizing expensive calculations such as sorting large datasets, filtering records, generating reports, or computing derived values that do not need to be recalculated on every render.",
            example: `
const sortedUsers = useMemo(() => {
  return users.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}, [users]);
`,
        },
    ],
    Intermediate: [{
            q: "Explain useEffect and its dependency array.",
            a: "useEffect is a React Hook used to perform side effects such as API calls, subscriptions, timers, and DOM manipulation in functional components. It runs after the component renders. The dependency array controls when the effect executes. An empty array runs it once after mounting, specific dependencies run it when those values change, and no dependency array runs it after every render.",
            whyUse: "We use useEffect when a component needs to interact with external systems such as APIs, event listeners, local storage, or timers. It helps keep side effects separate from UI rendering logic and ensures effects run only when required.",
            example: `
useEffect(() => {
  fetchUsers();
}, []);

useEffect(() => {
  fetchUser(userId);
}, [userId]);
`,
        },

        {
            q: "What is useCallback and when should you use it?",
            a: "useCallback is a React Hook that memoizes a function and returns the same function reference unless its dependencies change. It helps prevent unnecessary re-renders when functions are passed as props to child components. React recreates functions on every render, and useCallback helps maintain stable references when needed.",
            whyUse: "Use useCallback when passing functions to React.memo components, when a function is used inside a dependency array, or when rendering large lists where unnecessary re-renders affect performance. Avoid using it everywhere because memoization also has a cost.",
            example: `
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);

<Child onClick={handleClick} />
`,
        },

        {
            q: "What is useMemo and how is it different from useCallback?",
            a: "useMemo is a React Hook that memoizes the result of an expensive computation and recalculates it only when dependencies change. useCallback memoizes a function reference, whereas useMemo memoizes a computed value. Both are performance optimization Hooks but solve different problems.",
            whyUse: "Use useMemo for expensive calculations such as filtering, sorting, and data transformations. Use useCallback when you need a stable function reference to prevent unnecessary re-renders in child components.",
            example: `
const filteredUsers = useMemo(() => {
  return users.filter(user => user.active);
}, [users]);

const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);
`,
        },

        {
            q: "What is the Context API and when should you use it?",
            a: "Context API is React's built-in mechanism for sharing data across multiple components without manually passing props through every level. It helps solve the prop drilling problem and is commonly used for authentication, themes, language settings, and user information.",
            whyUse: "Use Context API when multiple components need access to the same data. It works well for global application state that changes infrequently. For highly complex state management, Redux Toolkit or Zustand may be better options.",
            example: `
const ThemeContext = createContext();

<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

const theme = useContext(ThemeContext);
`,
        },

        {
            q: "What is React.memo and how does it work?",
            a: "React.memo is a Higher-Order Component that prevents a functional component from re-rendering if its props have not changed. It performs a shallow comparison of props and reuses the previous render output when possible, improving performance.",
            whyUse: "Use React.memo for components that render frequently with the same props and are expensive to render. It is particularly useful in large applications with complex component trees.",
            example: `
const UserCard = React.memo(({ name }) => {
  return <h2>{name}</h2>;
});
`,
        },
        {
            q: "What are custom Hooks and why create them?",
            a: "Custom Hooks are reusable JavaScript functions that start with the word 'use' and internally use React Hooks. They allow developers to extract and reuse stateful logic across multiple components while keeping code clean and maintainable.",
            whyUse: "Use custom Hooks whenever the same stateful logic is repeated across components. They improve reusability, readability, and separation of concerns.",
            example: `
function useCounter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  return { count, increment };
}
`,
        },
        {
            q: "What is code splitting and how do you implement it in React?",
            a: "Code splitting breaks your bundle into smaller chunks that are loaded only when needed instead of loading the entire application at once. React supports code splitting through React.lazy and Suspense. This reduces the initial bundle size and improves application loading performance.",
            whyUse: "Use code splitting to improve page load speed and user experience, especially in large applications with multiple routes, dashboards, reports, or admin panels. Users download only the code required for the current page.",
            example: `
const Dashboard = React.lazy(() =>
  import("./Dashboard")
);

<Suspense fallback={<Loader />}>
  <Dashboard />
</Suspense>
`,
        },
        {
            q: "What is prop drilling and how do you avoid it?",
            a: "Prop drilling is passing props through many nested component layers just to reach a deeply nested child. Avoid it with the Context API for global or shared state, state management libraries such as Redux or Zustand, or component composition patterns.",
            whyUse: "Prop drilling creates tightly coupled components and makes applications harder to maintain. Using Context API or state management solutions simplifies data sharing across deeply nested components.",
            example: "If user information must be passed from App → Layout → Sidebar → Profile → UserCard, Context API can provide the data directly to UserCard without passing props through every intermediate component.",
        },
        {
            q: "What is the useReducer Hook and when should you use it over useState?",
            a: "useReducer manages complex state logic through a reducer function that receives the current state and an action and returns a new state. It is useful when state contains multiple related values, state transitions are complex, or updates depend on previous state. useState is generally preferred for simple state management.",
            whyUse: "Use useReducer when managing forms, shopping carts, workflows, dashboards, or any feature with multiple state transitions. It provides more predictable and maintainable state updates than multiple useState calls.",
            example: `
const [state, dispatch] =
  useReducer(reducer, initialState);

dispatch({
  type: "ADD_ITEM",
  payload: product
});
`,
        },
        {
            q: "What is useRef and what are its use cases?",
            a: "useRef returns a mutable reference object that persists across renders without causing re-renders when updated. It is commonly used for accessing DOM elements, storing timer IDs, preserving previous values, and integrating with third-party libraries.",
            whyUse: "Use useRef when you need to store values that should persist between renders but should not trigger UI updates. It is also the preferred way to directly interact with DOM elements.",
            example: `
const inputRef = useRef(null);

inputRef.current.focus();
`,
        },
        {
            q: "What are Higher Order Components (HOCs) and what problems do they solve?",
            a: "A Higher Order Component is a function that takes a component and returns a new enhanced component with additional functionality. HOCs are commonly used for authentication, authorization, logging, analytics, feature flags, and reusable business logic. Although Hooks are preferred in modern React development, HOCs are still widely used in legacy projects and third-party libraries.",
            whyUse: "HOCs help reuse component behavior without duplicating code. They are useful when multiple components require the same functionality such as access control, analytics tracking, or data fetching logic.",
            example: `
function withAuth(Component) {
  return function(props) {
    return isLoggedIn
      ? <Component {...props} />
      : <Login />;
  };
}
`,
        },
        {
            q: "What is the difference between useLayoutEffect and useEffect?",
            a: "useEffect runs asynchronously after the browser paints the UI, while useLayoutEffect runs synchronously after DOM updates but before the browser paints. useEffect is suitable for API calls, subscriptions, and logging. useLayoutEffect is used when DOM measurements or visual updates must happen before the user sees the screen to avoid flickering.",
            whyUse: "Use useLayoutEffect when measuring element dimensions, calculating positions, or performing DOM updates that affect layout. For most side effects such as API calls and event listeners, useEffect is the preferred choice because it does not block rendering.",
            example: `
useLayoutEffect(() => {
  const width =
    elementRef.current.offsetWidth;
}, []);

useEffect(() => {
  fetchUsers();
}, []);
`,
        },
        {
            q: "How does error handling work in React with Error Boundaries?",
            a: "Error Boundaries are React class components that catch JavaScript errors occurring during rendering, lifecycle methods, and constructors in their child component tree. Instead of crashing the entire application, they display a fallback UI. Error Boundaries do not catch errors in event handlers, asynchronous code, API calls, or server-side rendering. Those cases require traditional try-catch handling.",
            whyUse: "Error Boundaries improve application reliability and user experience by isolating failures in specific parts of the UI. They are commonly used around dashboards, payment flows, reporting modules, and other critical application areas.",
            example: `
class ErrorBoundary
  extends React.Component {

  static getDerivedStateFromError() {
    return { hasError: true };
  }
}
`,
        },
        {
            q: "What is the Render Props pattern?",
            a: "Render Props is a pattern where a component receives a function as a prop and uses that function to determine what should be rendered. This allows components to share stateful logic while giving consumers full control over the UI. Although React Hooks have replaced most Render Props use cases, the pattern is still found in older codebases and some third-party libraries.",
            whyUse: "Render Props are useful when multiple components need to share behavior while rendering different UI structures. The pattern promotes logic reuse without inheritance.",
            example: `
<DataProvider
  render={(data) =>
    <Chart data={data} />
  }
/>
`,
        },
        {
            q: "What is React Router and how does client-side routing work?",
            a: "React Router enables navigation between pages in a React application without triggering full page reloads. It uses the browser's History API to update the URL and render different components based on route matching. Components such as BrowserRouter, Routes, Route, Link, and hooks like useNavigate and useParams help manage navigation and routing logic.",
            whyUse: "Client-side routing provides a faster and smoother user experience because only the necessary components are updated instead of reloading the entire page. It is essential for Single Page Applications.",
            example: `
<Routes>
  <Route
    path="/users"
    element={<Users />}
  />
</Routes>
`,
        },
        {
            q: "What is the difference between React Query and Redux for server state?",
            a: "Redux is a general-purpose client-side state management library used for UI state, application settings, and shared client data. React Query, also known as TanStack Query, is designed specifically for server state and provides built-in features such as caching, background refetching, request deduplication, stale data management, and automatic synchronization. React Query significantly reduces the amount of code required to manage API data.",
            whyUse: "Use Redux for managing complex client-side application state. Use React Query for API data and server state management. Many modern applications use both together because they solve different problems.",
            example: `
const { data, isLoading } =
  useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers
  });
`,
        },
    ],
    "Advanced & Scenario": [{
            q: "Your React app re-renders excessively and becomes sluggish. A parent component holds a large list and passes a filter function as a prop to 500+ child rows. How do you diagnose and fix this?",
            a: "First, use React DevTools Profiler to identify which components are re-rendering and why. The core issue is that a new function reference is created on every parent render, causing all 500 children to re-render even when nothing changed. To fix this, wrap the filter function in useCallback so its reference remains stable. Wrap child components with React.memo to prevent unnecessary re-renders when props have not changed. If the list computation is expensive, use useMemo. For very large datasets, implement virtualization using libraries such as react-window or react-virtual so only visible rows are rendered.",
            whyUse: "Performance issues caused by unnecessary re-renders are common in enterprise applications, dashboards, and large data grids. Profiling and targeted optimizations help improve responsiveness without introducing unnecessary complexity.",
            example: `
const handleFilter = useCallback(() => {
  // filtering logic
}, []);

const Row = React.memo(RowComponent);
`,
        },
        {
            q: "You have a useEffect that fetches user data based on a userId prop. Users report seeing stale data from a previous user briefly before new data loads. How do you fix this race condition and stale closure issue?",
            a: "This issue is typically caused by a race condition where an earlier request finishes after a newer request. Use an AbortController inside useEffect and abort any in-flight requests during cleanup. Another approach is to track a cancellation flag and ignore stale responses. Ensure userId is included in the dependency array so the effect reacts to changes correctly. Libraries such as React Query and SWR solve these problems automatically through caching, request cancellation, and stale data management.",
            whyUse: "Race conditions are common when fetching data based on changing parameters such as user IDs, search terms, filters, or route parameters. Proper cleanup prevents stale data from appearing in the UI.",
            example: `
useEffect(() => {
  const controller =
    new AbortController();

  return () => {
    controller.abort();
  };
}, [userId]);
`,
        },
        {
            q: "Explain how React's reconciliation (diffing) algorithm works, and what assumptions it makes to achieve O(n) complexity instead of O(n³).",
            a: "A naive tree comparison algorithm would require O(n³) complexity. React improves this to O(n) by making two assumptions. First, elements of different types generate completely different trees, so React replaces them instead of deeply comparing them. Second, developers provide stable identities through the key prop, allowing React to efficiently match list items between renders. React compares elements from top to bottom and updates only the parts of the DOM that actually changed.",
            whyUse: "Understanding reconciliation helps developers optimize rendering performance, choose proper keys, and avoid patterns that trigger unnecessary DOM updates.",
            example: `
<li key={user.id}>
  {user.name}
</li>
`,
        },
        {
            q: "When would you choose Zustand over Redux, and when would you still pick Redux for a 3-year-old production React app?",
            a: "Choose Zustand when the application requires simple state management with minimal boilerplate and rapid development. Redux remains a strong choice when the application already depends heavily on Redux, uses Redux DevTools extensively, has complex state transitions, or relies on mature middleware such as redux-saga. For an established production application, a gradual approach is often best, using Zustand for new features while leaving stable Redux code untouched unless there is a clear business benefit to migrate.",
            whyUse: "State management decisions should balance maintainability, team familiarity, debugging capabilities, and migration costs rather than simply adopting newer technologies.",
            example: "A legacy enterprise application with hundreds of Redux reducers may continue using Redux, while a new reporting module can be implemented with Zustand to reduce boilerplate and development time.",
        },
        {
            q: "Your team's large React app has a 6MB JavaScript bundle. Users on mobile report slow load times. Walk through your entire bundle optimization strategy.",
            a: "Start by analyzing the bundle using tools such as webpack-bundle-analyzer or Rollup visualizers to identify the largest dependencies. Implement route-based code splitting using React.lazy and Suspense. Replace large libraries with lighter alternatives where possible and ensure tree shaking is working correctly. Load heavy components such as charts, editors, and maps using dynamic imports. Enable Brotli or Gzip compression on the server and monitor performance using Lighthouse and Core Web Vitals. Measure improvements after each optimization rather than making assumptions.",
            whyUse: "Bundle optimization directly improves page load speed, user experience, SEO, and performance on mobile devices and slower network connections.",
            example: `
const Reports = React.lazy(() =>
  import("./Reports")
);

<Suspense fallback={<Loader />}>
  <Reports />
</Suspense>
`,
        },
        {
            q: "What is tearing in React concurrent mode and how do React 18's features address it?",
            a: "Tearing occurs when different parts of the UI display different versions of the same external state during a concurrent render. Since React 18 can pause and resume rendering, an external store may change while React is rendering, causing visual inconsistencies. React 18 introduced useSyncExternalStore to provide a consistent snapshot of external state and prevent these inconsistencies. Modern state libraries such as Redux and Zustand use this API internally to ensure compatibility with concurrent rendering features.",
            whyUse: "Understanding tearing is important when working with external state management libraries in React 18. It ensures consistent UI behavior when using concurrent features such as Suspense, useTransition, and automatic rendering interruptions.",
            example: `
const state = useSyncExternalStore(
  subscribe,
  getSnapshot
);
`,
        },
        {
            q: "You're building a real-time collaborative document editor in React. Multiple users can edit simultaneously and changes must sync instantly. How would you architect the state management and data flow?",
            a: "I would use WebSockets for real-time communication and send document operations instead of the entire document. For conflict resolution, I would use a CRDT solution such as Yjs because it handles concurrent updates automatically. Document data would live inside the CRDT layer rather than React state, while React would manage only UI-related state. Presence information such as cursor positions would be synchronized separately. The backend would persist updates and snapshots, and offline editing would be supported through CRDT synchronization when connectivity returns.",
            whyUse: "Collaborative editors require conflict-free synchronization, low latency, offline support, and scalable state management. CRDT-based architectures solve these challenges more reliably than traditional state management approaches.",
            example: "Google Docs–style applications commonly use WebSockets and CRDTs to synchronize edits from multiple users while maintaining consistency across all connected clients.",
        },
        {
            q: "How does React 18's automatic batching work and how is it different from React 17?",
            a: "In React 17, state updates were automatically batched only inside React event handlers. Updates inside Promises, setTimeout callbacks, and native browser events triggered separate renders. React 18 extends automatic batching to all update sources, reducing unnecessary renders and improving performance. This behavior is enabled through the createRoot API. Developers can opt out using flushSync when immediate rendering is required.",
            whyUse: "Automatic batching improves performance by reducing the number of renders triggered by multiple state updates. It is especially beneficial in data-intensive applications and complex user interactions.",
            example: `
setA(1);
setB(2);

// React 18 batches both
// updates into one render
`,
        },
        {
            q: "A senior developer reviews your React component and says it has a stale closure bug. What does this mean and how do you reproduce and fix it?",
            a: "A stale closure occurs when a function captures an old value from its scope and continues using that outdated value even after the state changes. This often happens when dependencies are missing from useEffect, useMemo, or useCallback. To fix it, include all required dependencies in dependency arrays, use functional state updates when appropriate, or store mutable values in useRef when re-renders are not needed.",
            whyUse: "Stale closure bugs are a common source of unexpected behavior in React applications, especially when working with timers, event listeners, API calls, and asynchronous operations.",
            example: `
setCount(prev => prev + 1);
`,
        },
        {
            q: "What are React Server Components (RSC) and how do they change the mental model of a React application?",
            a: "React Server Components are components that execute entirely on the server and never send their JavaScript code to the browser. Unlike traditional SSR, they are not hydrated on the client. Server Components can directly access databases, APIs, and server resources. Interactive functionality remains inside Client Components marked with the 'use client' directive. This creates a hybrid architecture where server components handle data fetching and rendering while client components manage interactivity.",
            whyUse: "React Server Components reduce bundle size, improve performance, and simplify data fetching. They are particularly useful for content-heavy applications and applications built with frameworks such as Next.js App Router.",
            example: `
export default async function Page() {
  const users = await getUsers();
  return <Users users={users} />;
}
`,
        },
        {
            q: "Your React application's LCP score in Lighthouse is 4.8 seconds, but the target is under 2.5 seconds. What is your systematic optimization approach?",
            a: "First, identify the actual Largest Contentful Paint element using Lighthouse and Chrome DevTools. If it is an image, optimize formats, preload critical assets, and prioritize loading. If it is text, optimize fonts and remove render-blocking resources. Measure server response time and improve caching, CDN usage, or server-side rendering if necessary. Implement code splitting, lazy loading, and critical CSS optimization. Finally, validate improvements using Lighthouse, Web Vitals, and real-device testing to ensure changes improve actual user experience.",
            whyUse: "LCP is a key Core Web Vital that directly impacts user experience and SEO. A systematic optimization approach helps identify the real bottleneck rather than applying random performance fixes.",
            example: `
<link
  rel="preload"
  as="image"
  href="/hero.webp"
/>
`,
        },
        {
            q: "Explain React Fiber architecture. What problem did it solve over the old stack reconciler?",
            a: "Before React Fiber, React used a synchronous stack reconciler that processed the entire component tree in one uninterrupted operation. Large updates could block the main thread, causing frame drops and poor user experience. React Fiber redesigned reconciliation by representing each component as a Fiber node, which acts as a unit of work. This allows React to pause, resume, prioritize, reuse, or discard rendering work when needed. Fiber introduced the foundation for features such as Concurrent Rendering, Suspense, useTransition, and useDeferredValue. Rendering is now divided into an interruptible render phase and a synchronous commit phase.",
            whyUse: "Fiber improves application responsiveness by allowing React to prioritize urgent updates such as typing and user interactions over less important rendering work. It is the foundation of React's modern performance and concurrency features.",
            example: "When a user types into a search box while a large list is rendering, React Fiber can prioritize the input update and postpone less important rendering tasks to keep the UI responsive.",
        },
        {
            q: "Your e-commerce product page fetches product details, reviews, and related products through separate APIs. Reviews and related products are not critical for the first render. How would you architect this?",
            a: "I would prioritize product details because they are required for the initial user experience. Reviews and related products would be fetched independently without blocking the main content. Data fetching should occur in parallel rather than sequentially. Using React Query or Suspense boundaries allows each section to load independently and display its own loading state. This ensures users see the product information as quickly as possible while secondary content loads progressively.",
            whyUse: "Prioritized loading improves perceived performance and user experience by delivering critical content first while non-essential content loads in the background.",
            example: `
<Suspense fallback={<ProductSkeleton />}>
  <ProductDetails />
</Suspense>

<Suspense fallback={<ReviewsSkeleton />}>
  <Reviews />
</Suspense>
`,
        },
        {
            q: "A junior developer committed code that causes the entire React application to display a blank screen on certain routes. How would you debug and prevent this issue?",
            a: "I would first inspect the browser console and React component stack trace to identify the failing component. Next, I would reproduce the issue locally and verify whether an Error Boundary exists around the affected area. Common causes include null or undefined values, invalid API responses, incorrect rendering logic, or unhandled exceptions. After fixing the root cause, I would add Error Boundaries around major application sections and implement proper logging so production issues can be diagnosed quickly. I would also improve type safety and defensive coding practices to prevent similar failures.",
            whyUse: "Without Error Boundaries, a single rendering error can crash the entire React tree. Proper error handling improves stability, monitoring, and user experience.",
            example: `
<ErrorBoundary>
  <Dashboard />
</ErrorBoundary>
`,
        },
        {
            q: "Your React application uses Redux, and developers complain that adding new features requires updating multiple files. How would you modernize the state management setup?",
            a: "I would migrate to Redux Toolkit because it significantly reduces Redux boilerplate while preserving Redux's predictability and debugging capabilities. Redux Toolkit combines reducers and actions into slices, simplifies immutable updates using Immer, and provides RTK Query for API data management. For new modules with simpler requirements, I would also evaluate Zustand. In an existing production application, I would migrate gradually rather than rewriting the entire state management layer at once.",
            whyUse: "Redux Toolkit reduces development effort, improves maintainability, and follows the officially recommended Redux approach. It helps teams build features faster while retaining Redux DevTools and predictable state management.",
            example: `
const cartSlice = createSlice({
  name: "cart",
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    }
  }
});
`,
        },
        {
            q: "Users report that your React dashboard flickers every time they switch between tabs within the app. The data disappears and reloads even for data they just fetched. How do you fix this?",
            a: "This is typically a server-state caching issue. The data is being stored in component-level state, so when a tab unmounts, its state is destroyed and the data must be fetched again when the component remounts. I would move server data management to a dedicated caching solution such as React Query. React Query stores data in a global cache, allowing previously fetched data to be displayed instantly while optionally refreshing it in the background. Another option is to lift the state to a parent component or use a global store such as Zustand. Implementing stale-while-revalidate behavior ensures users see cached data immediately without UI flicker.",
            whyUse: "Caching improves perceived performance, reduces unnecessary network requests, and creates a smoother user experience when navigating between tabs, pages, or frequently visited views.",
            example: `
const { data } = useQuery({
  queryKey: ["dashboard", tabId],
  queryFn: () => fetchDashboardData(tabId),
  staleTime: 5 * 60 * 1000
});
`,
        },
        {
            q: "You're building a complex form with 30+ fields, conditional sections, and real-time cross-field validation. How would you architect this form in React?",
            a: "For a form of this size, I would use React Hook Form combined with a schema validation library such as Zod or Yup. React Hook Form minimizes re-renders because it uses uncontrolled inputs internally, making it more performant than managing dozens of fields with useState. Cross-field validation can be handled through schema rules or field watchers. I would also split the form into smaller sections or multi-step flows when appropriate to improve maintainability and user experience.",
            whyUse: "Large forms often suffer from performance issues, validation complexity, and difficult state management. React Hook Form provides a scalable solution with built-in validation, error handling, and better performance.",
            example: `
const { register, watch } = useForm();

const startDate = watch("startDate");

<input
  {...register("endDate", {
    validate: value =>
      value > startDate
  })}
/>
`,
        },
        {
            q: "Your React application performs well on desktop but scores 45/100 on mobile Lighthouse. You have three days to improve performance. What is your priority order?",
            a: "I would focus first on the highest-impact improvements. Day one would involve analyzing Lighthouse results, implementing route-based code splitting, reducing bundle size, and enabling compression. Day two would focus on fixing Core Web Vitals issues such as Largest Contentful Paint and Cumulative Layout Shift by optimizing images, fonts, and render-blocking resources. Day three would involve profiling React performance, virtualizing large lists, testing on real mobile devices, and validating improvements using Lighthouse and Web Vitals. The goal is to prioritize optimizations that provide measurable user-facing improvements quickly.",
            whyUse: "Mobile performance directly affects user engagement, SEO, conversion rates, and application responsiveness. Prioritizing the highest-impact improvements produces the greatest results within limited timeframes.",
            example: `
const Dashboard = React.lazy(() =>
  import("./Dashboard")
);
`,
        },
        {
            q: "A React component fetches data and you need to implement optimistic updates for a Like button. How would you approach it?",
            a: "I would update the UI immediately before waiting for the server response to create an instant user experience. Before making the optimistic update, I would store the previous state so it can be restored if the request fails. The API request runs in the background, and if it succeeds, no additional action is needed. If it fails, the UI rolls back to the previous state and displays an error message. React Query's mutation APIs simplify this process through built-in optimistic update and rollback support.",
            whyUse: "Optimistic updates make applications feel significantly faster because users receive immediate feedback rather than waiting for network responses.",
            example: `
const prevLiked = liked;

setLiked(!liked);

try {
  await updateLike();
} catch {
  setLiked(prevLiked);
}
`,
        },
        {
            q: "Your team is migrating a large class component codebase to functional components with Hooks. What is your migration strategy and what are the tricky parts?",
            a: "I would take an incremental migration approach rather than a full rewrite. Components that are actively being modified would be migrated first, starting from leaf components and gradually moving upward. Class state maps to useState, lifecycle methods map to useEffect, and instance variables map to useRef. The most challenging areas are getDerivedStateFromProps, getSnapshotBeforeUpdate, and Error Boundaries because they do not have direct Hook equivalents. Throughout the migration, I would keep component interfaces unchanged and rely on eslint-plugin-react-hooks to catch dependency-related issues.",
            whyUse: "Incremental migration reduces risk, minimizes regression issues, and allows teams to modernize applications without disrupting ongoing development.",
            example: `
componentDidMount
↓
useEffect(() => {}, [])

this.state
↓
useState()

this.myRef
↓
useRef()
`,
        },
        {
            q: "You've been asked to build a React component that auto-saves a user's form input to the server every 30 seconds and when the user navigates away. How do you implement this without data loss?",
            a: "I would combine periodic auto-save, navigation handling, and dirty-state tracking. A timer would trigger saves every 30 seconds only when the form contains unsaved changes. I would also save data when the user leaves the page using beforeunload and handle in-app navigation through cleanup logic or route guards. To avoid stale data issues inside intervals, I would store the latest form state in a ref. Additionally, I would provide clear visual feedback such as Saving, Saved, and Failed states so users know their data is protected.",
            whyUse: "Auto-save functionality improves user experience and prevents accidental data loss in long forms, document editors, surveys, and enterprise applications where users may spend significant time entering information.",
            example: `
const formDataRef = useRef(formData);

useEffect(() => {
  formDataRef.current = formData;
}, [formData]);
`,
        },
        {
            q: "Your React app has a table with 10,000 rows. Rendering all of them freezes the browser for several seconds. How do you fix this?",
            a: "The main issue is excessive DOM rendering. Rendering thousands of elements at once causes significant layout, paint, and memory overhead. I would implement virtualization using libraries such as react-window or TanStack Virtual so only visible rows are rendered. If appropriate, I would also use server-side pagination, memoize expensive calculations, and prevent unnecessary row re-renders using React.memo. Virtualization is usually the most effective solution because the DOM remains small regardless of dataset size.",
            whyUse: "Virtualization dramatically improves performance for large tables, logs, reports, and data grids by rendering only the rows currently visible to the user.",
            example: `
<FixedSizeList
  height={600}
  itemCount={10000}
  itemSize={48}
>
  {Row}
</FixedSizeList>
`,
        },
        {
            q: "You inherit a React codebase with no tests. The team wants to add testing but doesn't know where to start. How do you introduce testing incrementally?",
            a: "I would avoid attempting to test everything immediately. First, I would set up React Testing Library, Jest, and API mocking tools such as Mock Service Worker. Next, I would begin with utility functions because they are easy to test and provide quick wins. From that point forward, all new features and bug fixes would require tests. I would focus on critical user flows such as authentication, forms, checkout processes, and areas that historically caused production issues. The goal is to gradually build confidence without slowing down feature development.",
            whyUse: "Incremental adoption reduces resistance from the team while steadily improving application quality, regression protection, and developer confidence.",
            example: `
render(<LoginForm />);

expect(
  screen.getByRole("button")
).toBeInTheDocument();
`,
        },
    ],
}

export default reactData;