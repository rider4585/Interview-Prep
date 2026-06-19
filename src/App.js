import { useState, Component } from "react";

// ── Error Boundary — catches any render crash and shows a friendly message ────
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error("App render error:", error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ fontFamily: "sansnpm -serif", minHeight: "100vh", background: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)", display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
          <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px 40px", maxWidth: 480, textAlign: "center", border: "1px solid rgba(248,113,113,0.3)" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#f87171", marginBottom: 8 }}>Something went wrong</div>
            <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 24 }}>
              {this.state.error?.message || "An unexpected error occurred."}
            </div>
            <button onClick={() => this.setState({ hasError: false, error: null })}
              style={{ background: "linear-gradient(90deg,#7c3aed,#2563eb)", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const data = {
  React: {
    Beginner: [
      { q: "What is React and why is it used?", a: "React is a JavaScript library for building user interfaces, developed by Facebook. It uses a component-based architecture and a virtual DOM to efficiently update and render UI. It's used because it makes building complex, interactive UIs simpler and more maintainable.", theory: "React is a declarative, component-based UI library built around the concept of a virtual DOM. Instead of directly manipulating the browser DOM (slow), React maintains a virtual representation, diffs changes, and batches updates. The component model encourages composability — building complex UIs from small, reusable pieces." },
      { q: "What are the main features of React?", a: "React's core features are:\n\n1. Component-based architecture: UI is built from small, reusable, self-contained components — each manages its own logic and view.\n\n2. Virtual DOM: React maintains a lightweight in-memory copy of the real DOM. On state/prop changes, it diffs the virtual DOM and applies only the minimal real DOM updates — making rendering fast.\n\n3. Unidirectional data flow: Data flows one way — from parent to child via props. This makes data flow predictable and easier to debug.\n\n4. JSX syntax: Write HTML-like markup directly in JavaScript. JSX compiles to React.createElement() calls.\n\n5. Reusable components: Build once, use anywhere. Components can be composed together to build complex UIs.\n\n6. React Hooks: Let functional components use state, lifecycle, and side effects — no class components needed.\n\n7. Rich ecosystem: React Router (routing), Redux/Zustand (state), React Query (server state), Next.js (SSR/SSG).", theory: "React's key innovation is the virtual DOM — an in-memory representation of the UI that React uses to minimize actual DOM manipulation. The component architecture promotes separation of concerns at the UI level. Unidirectional data flow (props down, events up) makes data changes predictable and traceable." },
      { q: "What is a Package in JavaScript?", a: "A package is a collection of reusable code (a library or tool) that you install in your project to add functionality without writing it from scratch.\n\nExamples:\n- react → the React library itself\n- axios → HTTP requests\n- lodash → utility functions\n- express → Node.js web framework\n\nPackages are managed by npm (Node Package Manager). They're listed in package.json and stored in the node_modules folder after installation.\n\nWhy use packages?\nInstead of writing everything from scratch, you install battle-tested, community-maintained code. This saves time and reduces bugs.", theory: "A package is a reusable module of JavaScript code published to a registry (npm). Packages solve the 'reinventing the wheel' problem by sharing battle-tested code. The node_modules folder contains all installed packages — it's excluded from git because it can be recreated from package.json." },
      { q: "What is npm and how does it work?", a: "NPM (Node Package Manager) is a tool used to install, manage, and update packages (libraries) in a JavaScript project.\n\nKey files:\n- package.json: project config — lists name, version, scripts, dependencies, devDependencies\n- package-lock.json: locks exact versions of all installed packages for reproducible installs\n- node_modules/: folder where installed packages live (never commit this to git)\n\nCommon NPM Commands:\n\nnpm init               → create package.json\nnpm install            → install all packages from package.json\nnpm install react      → install a specific package\nnpm install -D eslint  → install as devDependency\nnpm uninstall pkg      → remove a package\nnpm run dev            → run a script defined in package.json\nnpm audit              → check for security vulnerabilities\nnpm ci                 → clean install (used in CI/CD pipelines)\n\ndependencies vs devDependencies:\n- dependencies: needed in production (react, express, axios)\n- devDependencies: only for development (eslint, jest, nodemon, typescript)", theory: "npm (Node Package Manager) is both a CLI tool and the world's largest software registry. package.json defines your project's metadata and dependency requirements. npm install reads package.json, resolves the dependency tree, downloads packages from the registry, and writes the exact versions to package-lock.json." },
      { q: "What are components in React?", a: "Components are the building blocks of a React application. Each component is an independent, reusable piece of UI that manages its own structure, style, and behavior.\n\nTypes:\n1. Functional components (modern, preferred):\nfunction Welcome({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n\n2. Class components (legacy):\nclass Welcome extends React.Component {\n  render() {\n    return <h1>Hello, {this.props.name}!</h1>;\n  }\n}\n\nKey characteristics:\n- Accept inputs (props) from parent components\n- Return JSX describing what to render\n- Can have local state (functional: useState, class: this.state)\n- Can be composed together: <App> → <Header> + <MainContent> + <Footer>\n- Re-render when their props or state change\n\nThink of components like JavaScript functions: input (props) → output (JSX).", theory: "Components are the fundamental building blocks of React UIs — independent, reusable pieces that describe a part of the interface. Each component encapsulates its own markup (JSX), logic (state, effects), and styling. React builds a component tree, rendering parent components that contain child components." },
      { q: "What is JSX?", a: "JSX (JavaScript XML) is a syntax extension for JavaScript that looks like HTML. It lets you write UI structure directly in JavaScript files. Browsers don't understand JSX natively — Babel compiles it into React.createElement() calls.", theory: "JSX is a syntax extension for JavaScript that looks like HTML but compiles to React.createElement() calls. The Babel transpiler converts JSX to plain JavaScript. JSX is not required for React (you could write createElement() directly) but makes component structure visual and readable. It enforces proper nesting rules at compile time." },
      { q: "What is the difference between a functional and class component?", a: "Functional components are plain JavaScript functions that accept props and return JSX. Class components extend React.Component, have a render() method, and support lifecycle methods like componentDidMount and componentDidUpdate.\n\nFunctional: simpler, less boilerplate, support Hooks (useState, useEffect). Class: verbose, requires 'this', lifecycle methods are explicit.\n\nWith Hooks introduced in React 16.8, functional components can do everything class components can. Class components are legacy — new code should always use functional components.", theory: "Class components were the only way to use state and lifecycle methods before React 16.8. Functional components with Hooks replaced them as the modern standard — they're simpler, easier to test, and avoid 'this' binding issues. Class components still work but are considered legacy pattern." },
      { q: "What are props in React?", a: "Props (properties) are read-only inputs passed from a parent component to a child component. They allow data to flow down the component tree. A child component cannot modify its own props — they are immutable from the child's perspective.", theory: "Props (properties) are the mechanism for passing data from parent to child components. They follow React's unidirectional data flow — data flows down the component tree. Props are read-only from the child's perspective — this immutability makes data flow predictable. Children can only communicate upward by calling callback functions passed as props." },
      { q: "What is the difference between props and state?", a: "Props and state are both plain JavaScript objects that affect what a component renders, but they serve different purposes:\n\nProps:\n- Passed FROM parent TO child\n- Read-only — the child cannot change them\n- Used to configure or pass data to a component\n- Like function arguments\n- Example: <Button color='red' label='Click me' />\n\nState:\n- Managed INSIDE the component\n- Mutable — updated via setState or useState setter\n- When state changes, the component re-renders\n- Like local variables\n- Example: const [count, setCount] = useState(0);\n\nKey rule: If a parent needs to be informed of a state change in a child, the parent should own the state and pass a callback down as a prop (lifting state up). Never mutate props.", theory: "Props and state are both plain JavaScript objects that influence rendered output. The fundamental difference: props come from outside (parent) and are immutable to the receiving component; state lives inside the component and is managed by it. State changes trigger re-renders; prop changes from parent trigger re-renders of children." },
      { q: "What is state in React?", a: "State is mutable data managed inside a component. When state changes, React re-renders the component. In functional components, state is managed using the useState Hook: const [count, setCount] = useState(0).", theory: "State represents a component's private, mutable data that changes over time. When state changes, React schedules a re-render. React batches multiple state updates within event handlers to minimize re-renders. State is local to the component unless lifted up or put in a global store." },
      { q: "What is the useState Hook?", a: "useState is a Hook that lets functional components hold and update local state.\n\nSyntax:\nconst [value, setValue] = useState(initialValue);\n\n- value: current state\n- setValue: function to update it (triggers re-render)\n- initialValue: starting value (only used on first render)\n\nExample:\nimport { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>{count}</p>\n      <button onClick={() => setCount(count + 1)}>Increase</button>\n      <button onClick={() => setCount(count - 1)}>Decrease</button>\n      <button onClick={() => setCount(0)}>Reset</button>\n    </div>\n  );\n}\n\nImportant rules:\n- State updates are asynchronous — don't read state immediately after setting it\n- For updates based on previous state, use functional form: setCount(prev => prev + 1)\n- Never mutate state directly — always use the setter function\n- Each useState call is independent — you can have multiple in one component", theory: "useState is a Hook that lets functional components maintain state between renders. React preserves state values between re-renders using the order Hooks are called. The setter function is stable (doesn't change between renders), making it safe for useEffect dependency arrays. The functional update form (prev => prev + 1) ensures you're working with the latest state." },
      { q: "What is the useEffect Hook?", a: "useEffect is a Hook for performing side effects in functional components — things that happen outside the normal render cycle.\n\nSyntax:\nuseEffect(() => {\n  // side effect code\n  return () => { /* cleanup */ }; // optional\n}, [dependencies]);\n\nCommon side effects:\n- Fetching data from an API\n- Setting up subscriptions / WebSocket connections\n- Updating document title\n- Setting timers (setTimeout, setInterval)\n- Integrating with third-party DOM libraries\n\nExamples:\n// Run once on mount (like componentDidMount)\nuseEffect(() => {\n  fetchUser(id);\n}, []);\n\n// Run when id changes (like componentDidUpdate)\nuseEffect(() => {\n  fetchUser(id);\n}, [id]);\n\n// Cleanup on unmount (like componentWillUnmount)\nuseEffect(() => {\n  const timer = setInterval(tick, 1000);\n  return () => clearInterval(timer); // cleanup\n}, []);\n\nGolden rule: Whatever values the effect reads must be in the dependency array. Use the eslint-plugin-react-hooks rule to catch missing deps automatically.", theory: "useEffect synchronizes a component with external systems — side effects that shouldn't happen during rendering. It runs after the browser paints, keeping the main render path fast. The dependency array controls when effects re-run. The cleanup function runs before the next effect and on unmount, preventing stale subscriptions." },
      { q: "What is the virtual DOM?", a: "The virtual DOM is a lightweight in-memory representation of the real DOM. When state or props change, React creates a new virtual DOM tree, diffs it with the previous one (reconciliation), and only applies the minimal necessary changes to the real DOM — making updates fast.", theory: "The virtual DOM is an in-memory object representation of the actual DOM. React uses it to implement efficient updates through a reconciliation process. After each state change, React builds a new virtual DOM tree, diffs it against the previous one (O(n) algorithm), and applies only the changed parts to the real DOM." },
      { q: "What are lists and keys in React?", a: "Lists in React are rendered by mapping over arrays and returning JSX elements. Keys are special string/number props that must be added to each list item to help React identify which items changed, were added, or removed.\n\nExample:\nconst items = ['A', 'B', 'C'];\nreturn items.map((item, i) => <li key={i}>{item}</li>);\n\nPrefer stable unique IDs over array indexes as keys, especially for reorderable lists.", theory: "Rendering lists uses JavaScript's .map() method to transform data arrays into JSX element arrays. Keys are string identifiers that help React's reconciliation algorithm track which items changed, were added, or removed. Without keys, React must re-render the entire list on any change." },
      { q: "Why are keys important in React lists?", a: "Keys help React's reconciliation algorithm efficiently update the DOM. Without keys, React re-renders the entire list on every change. With stable keys, React knows exactly which item changed and only updates that DOM node.\n\nUsing array index as a key is problematic when items are reordered — React sees the same index and thinks nothing changed, causing state bugs. For example, a checked checkbox may appear on the wrong item after reorder. Always use unique, stable IDs (from your data) as keys.", theory: "React's reconciliation algorithm uses keys to match virtual DOM elements to existing DOM nodes. With stable keys (IDs), React can reorder, insert, and delete DOM nodes efficiently. Without keys (or with index-as-key), React falls back to positional matching, causing bugs when list order changes." },
      { q: "What is conditional rendering in React?", a: "Conditional rendering shows different UI based on a condition. Common patterns:\n\n1. Ternary: {isLoggedIn ? <Dashboard /> : <Login />}\n2. Logical AND: {hasData && <DataTable />} — renders DataTable only if hasData is truthy\n3. if/else before return: compute JSX in a variable conditionally\n4. Switch statement for multiple conditions\n\nGotcha: avoid {count && <Comp />} when count can be 0 — renders '0'. Use {count > 0 && <Comp />} instead.", theory: "Conditional rendering uses JavaScript's conditional operators to control which JSX is returned. Common patterns: ternary operator for either/or (condition ? A : B), logical AND for show/hide (condition && <Component />), and early return for guard clauses. React ignores false, null, and undefined in JSX." },
      { q: "What is lifting state up in React?", a: "Lifting state up means moving shared state to the nearest common ancestor component so multiple children can access and modify it via props.\n\nExample: Two sibling components (TempCelsius and TempFahrenheit) both need the same temperature value. Instead of duplicating state, lift it to their parent. The parent holds the state and passes it down as props with an onChange callback.\n\nThis is the React way of keeping data in sync — single source of truth.", theory: "Lifting state up is the pattern of moving shared state to the nearest common ancestor of components that need it. This maintains React's unidirectional data flow. The parent owns the state and passes both the value and the setter function (as a callback prop) down to children." },
      { q: "What is a controlled component?", a: "A controlled component is a form element whose value is controlled by React state. The input value is set from state, and onChange updates the state — React is the 'single source of truth'.\n\nExample:\nconst [name, setName] = useState('');\n<input value={name} onChange={e => setName(e.target.value)} />\n\nAdvantages: easy validation, instant feedback, format-on-type, submit handling. This is the recommended approach for forms in React.", theory: "A controlled component has its form element's value driven by React state — React is the single source of truth. Every keystroke calls a state setter, keeping React and the DOM in sync. This enables input validation, transformation, and programmatic control but requires more boilerplate than uncontrolled." },
      { q: "What is an uncontrolled component?", a: "An uncontrolled component lets the DOM manage its own state. You access the value using a ref instead of syncing it to React state.\n\nExample:\nconst inputRef = useRef();\n<input ref={inputRef} />\n// Read value on submit: inputRef.current.value\n\nUse cases: integrating with non-React code, simple forms where you only need the value on submit, file inputs (which are always uncontrolled). Controlled components are preferred for most cases.", theory: "Uncontrolled components let the browser manage form state in the DOM. useRef accesses the current DOM value only when needed (like on submit). This is simpler for basic forms but loses real-time validation capability. File inputs must be uncontrolled because React cannot set their value programmatically." },
      { q: "What is event handling in React?", a: "React uses synthetic events — cross-browser wrappers around native DOM events with a consistent API. Key differences from HTML:\n\n1. camelCase props: onClick, onChange, onSubmit (not onclick)\n2. Pass function references, not strings: onClick={handleClick} not onClick='handleClick()'\n3. Prevent default with e.preventDefault() inside the handler\n4. React uses event delegation — one listener at root, not per element\n\nExample: <button onClick={(e) => { e.preventDefault(); doSomething(); }}>Click</button>", theory: "React's synthetic event system wraps native browser events to normalize cross-browser inconsistencies. React uses event delegation — a single listener at the root catches all events, improving performance vs attaching listeners to individual elements. Event handlers receive a SyntheticEvent object with the same interface as native DOM events." },
      { q: "What is a React Router?", a: "React Router is the standard library for client-side routing in React. It enables navigation between views without full page reloads using the browser's History API.\n\nCore components (v6):\n- BrowserRouter: wraps your app, provides routing context\n- Routes + Route: defines path → component mappings\n- Link / NavLink: navigation without page reload\n- Hooks: useNavigate (programmatic nav), useParams (URL params), useLocation (current URL info)\n\nExample:\n<Routes>\n  <Route path='/' element={<Home />} />\n  <Route path='/users/:id' element={<UserProfile />} />\n</Routes>", theory: "React Router provides client-side routing for SPAs — navigating between 'pages' without full HTTP requests. It uses the HTML5 History API to update the URL and browser history while swapping React components. Routes match URL patterns and render associated components, maintaining the SPA feel with proper URL-based navigation." },
      { q: "What is the difference between BrowserRouter and HashRouter?", a: "BrowserRouter uses the HTML5 History API — URLs look clean: example.com/about. Requires server configuration to redirect all paths to index.html, otherwise a direct visit to /about returns a 404.\n\nHashRouter uses URL hashes — URLs look like: example.com/#/about. The # part never gets sent to the server, so no server config needed. Works on static hosts (GitHub Pages, S3 static websites).\n\nChoose BrowserRouter for production apps with a proper server. Choose HashRouter for static hosting or when you can't configure server redirects.", theory: "BrowserRouter uses the HTML5 pushState API for clean URLs (/about). This requires server-side fallback configuration — any direct URL hit must serve index.html. HashRouter uses URL hash (#/about), which browsers never send to servers, requiring no server configuration but producing less clean URLs." },
      { q: "What is prop drilling and how do you avoid it?", a: "Prop drilling is passing props through multiple intermediate components that don't use the data themselves — just forwarding it to a deeper child.\n\nExample: App → Layout → Sidebar → UserAvatar, where only UserAvatar needs the user object, but Layout and Sidebar must pass it along.\n\nSolutions:\n1. Context API: createContext + useContext — pass data anywhere in the tree without manual threading\n2. State management: Redux, Zustand — global store accessible from any component\n3. Component composition: pass components as children/props, avoiding deep hierarchies\n4. Custom hooks that encapsulate data fetching", theory: "Prop drilling is passing props through intermediate components that don't use them, just to reach deeply nested children. It creates tight coupling and makes components harder to refactor. Solutions include Context API (for static/infrequent data), state management libraries (Redux/Zustand), or component composition patterns." },
      { q: "What is a React Fragment?", a: "A React Fragment lets you group multiple elements and return them from a component without adding an extra DOM node.\n\nProblem it solves: React components must return a single root element. Without Fragment, you'd wrap everything in a <div>, adding unnecessary DOM nodes that can break layouts (flexbox, grid, table structures).\n\nTwo syntaxes:\n// Long form (supports key prop for lists)\n<React.Fragment>\n  <h1>Hello</h1>\n  <p>World</p>\n</React.Fragment>\n\n// Short form (most common)\n<>\n  <h1>Hello</h1>\n  <p>World</p>\n</>\n\nWhen to prefer long form:\n- Rendering lists where each Fragment needs a key:\nrows.map(row => (\n  <React.Fragment key={row.id}>\n    <dt>{row.term}</dt>\n    <dd>{row.description}</dd>\n  </React.Fragment>\n))\n\nBenefit: Cleaner DOM, no unnecessary wrapper divs, better performance, fixes table/flexbox layout issues.", theory: "React's render requires a single root element because React.createElement() returns one element. Fragments (<></> or <React.Fragment>) satisfy this requirement without adding a DOM node. This matters for table layouts (tbody can't have arbitrary wrapper divs), flexbox/grid layouts, and reducing unnecessary DOM nesting." },
      { q: "Does ReactDOM.render() replace existing content inside the root element?", a: "Yes — ReactDOM.render() (and createRoot().render()) completely replaces all existing content inside the target DOM node.\n\nExample:\n// HTML:\n<div id='root'>\n  <p>Old content</p>\n</div>\n\n// JavaScript:\nconst heading = React.createElement('h1', {}, 'Learning React!');\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(heading);\n\n// Result: the <p>Old content</p> is gone, replaced by <h1>Learning React!</h1>\n\nThis is intentional — React takes full ownership of the root container. You should not modify the DOM inside the root container outside of React; it will be overwritten on the next render.\n\nIn production apps, the root div is typically empty in index.html — React fills it entirely. Any static content you put inside #root will be replaced as soon as React mounts.", theory: "ReactDOM.render() mounts the React component tree into a DOM container, replacing any existing content. React 18 replaces this with ReactDOM.createRoot().render(), which enables concurrent features. The root element (usually #root) is the entry point — React controls everything inside it." },
    { q: "What is Tree Shaking in React?", a: "Tree shaking is a build-time optimization that removes unused (dead) code from the final JavaScript bundle, making the app smaller and faster to load.\n\nHow it works:\nES Modules (import/export) are statically analyzable — bundlers like Webpack and Vite trace which exports are imported and used, then exclude everything else from the final bundle.\n\nCommon tree shaking improvements:\n1. Use named imports:\n   // ✓ Tree-shakeable (only formatDate is bundled):\n   import { formatDate } from './utils';\n   // ✗ Bundles entire lodash (~70KB):\n   import _ from 'lodash';\n   // ✓ Use lodash-es with named imports (~2KB):\n   import { debounce } from 'lodash-es';\n\n2. Mark packages as side-effect-free:\n   // package.json:\n   { \"sideEffects\": false }\n\n3. Use ES Module libraries (lodash-es vs CommonJS lodash)\n\nReal impact:\n- Full lodash: ~70KB; lodash-es named imports: ~2-5KB\n- Tree shaking commonly reduces React bundles 20-60%\n- Critical for performance on mobile and slow networks\n\nTree shaking requires:\n- ES Module syntax (import/export) — not require/module.exports\n- A bundler that supports it (Webpack 4+, Rollup, Vite, Parcel)", theory: "Tree shaking is like packing for a trip — instead of taking your entire wardrobe, you pack only what you'll actually wear. The suitcase (bundle) becomes lighter and faster to travel with. It works because ES Modules are statically analyzable: bundlers can determine at build time (without running code) which exports are used and which aren't. CommonJS (require) is dynamic and therefore cannot be tree-shaken. It's a purely build-time optimization — your source code doesn't change, only the output bundle gets smaller." },
    { q: "What is a Single Page Application (SPA)?", a: "A Single Page Application (SPA) loads one HTML page initially and dynamically updates content without full page reloads. React is one of the most popular tools for building SPAs.\n\nTraditional website (Multi-Page Application):\n1. User clicks a link\n2. Browser sends HTTP request to server\n3. Server returns a complete new HTML page\n4. Browser fully reloads (visible flash + delay)\n\nSPA (React):\n1. Browser loads one HTML file + JS bundle (once)\n2. User clicks a link → React Router intercepts\n3. URL updates via History API (no HTTP request)\n4. React re-renders only the changed components\n5. Instant navigation — no page reload\n\nReact enables SPAs through:\n- React Router: maps URLs to components without HTTP requests\n- Virtual DOM: efficiently updates only what changed\n- Component architecture: each 'page' is a component rendered in the same shell\n- State persistence: auth, cart, and app data survive navigation\n\nSPA benefits:\n- Fast navigation after initial load\n- No white flash between pages\n- State persists across views (shopping cart, auth)\n- App-like feel in the browser\n\nSPA trade-offs:\n- Larger initial bundle (slower first load)\n- SEO challenges (JS-rendered content)\n- Solution: SSR with Next.js pre-renders pages on the server\n\n// index.html — the single page:\n// <div id=\"root\"></div>\n// React renders EVERYTHING inside this one div", theory: "A SPA loads the entire application once, then JavaScript handles all navigation without HTTP requests. Think of it like a restaurant: you sit at one table (the single HTML page) and only the dishes (content) change — you don't leave and return to a new restaurant for every course. React's component model is perfect for this: components mount and unmount based on the current route, sharing layout and state without re-rendering the whole page. The trade-off is a larger initial load vs faster subsequent navigation." }
    ],
    "Hooks & Core Concepts": [
      {
        q: "What are React Hooks?",
        a: "React Hooks are functions that let you 'hook into' React state and lifecycle features from functional components. Introduced in React 16.8, they solved the problem of stateful logic being tied to class components.\n\nBuilt-in Hooks:\n- useState: local state\n- useEffect: side effects (fetch, subscriptions, timers)\n- useContext: consume context without Consumer wrapper\n- useRef: mutable refs, DOM access\n- useMemo: memoize computed values\n- useCallback: memoize function references\n- useReducer: complex state logic\n- useLayoutEffect: synchronous DOM measurements\n\nRules of Hooks:\n1. Only call Hooks at the top level — not inside loops, conditions, or nested functions\n2. Only call Hooks from React functions (functional components or custom Hooks)\n\nThese rules exist because React relies on the order of Hook calls to associate state with the correct Hook on re-render.", theory: "Hooks are functions that let functional components use React features that previously required class components — state, lifecycle, context, refs, and more. They always start with 'use' and follow two rules: only call at the top level (never inside loops, conditions, or nested functions), and only call inside React function components or custom Hooks. Think of Hooks like specialized tools in a toolbox — useState is a notepad, useEffect is a reaction trigger, useContext is a shared water tank. React 16.8 introduced Hooks as the modern way to write React components."
      },
      {
        q: "What is the difference between useEffect and useLayoutEffect?",
        a: "Both run after render, but at different times in the browser's rendering pipeline:\n\nuseEffect (async, after paint):\n- Runs after the browser has painted the screen\n- Does NOT block the visual update\n- Use for: data fetching, subscriptions, logging, setting document title\n- 99% of use cases belong here\n\nuseLayoutEffect (sync, before paint):\n- Runs synchronously after DOM mutations but BEFORE the browser paints\n- BLOCKS the visual update until it completes\n- Use for: reading DOM measurements (getBoundingClientRect), making DOM mutations that must be invisible to the user (tooltip positioning, scroll restoration)\n\nExample of when useLayoutEffect matters: if you toggle a class in useEffect, users briefly see the 'before' state. With useLayoutEffect, the DOM update happens before the browser paints — no flash.\n\nWarning: Never do slow/async work in useLayoutEffect — it blocks rendering and hurts performance.", theory: "Both handle side effects but run at different times. useEffect runs asynchronously after the browser paints — it's non-blocking and the default choice. useLayoutEffect runs synchronously after DOM mutations but before the browser paints — it blocks the visual update until it completes. Use useLayoutEffect only when you need to measure DOM elements or make DOM changes that must be reflected before the user sees anything (preventing visible flickers). For everything else (data fetching, subscriptions, logging), use useEffect."
      },
      {
        q: "What is memoization in React?",
        a: "Memoization is an optimization technique that caches the result of expensive computations and returns the cached result when the same inputs are given again — skipping the recalculation.\n\nReact provides three memoization tools:\n\n1. React.memo (component memoization): Wraps a component, skips re-render if props haven't changed (shallow comparison).\nconst MyComp = React.memo(({ name }) => <div>{name}</div>);\n\n2. useMemo (value memoization): Caches a computed value.\nconst sorted = useMemo(() => heavySort(data), [data]);\n\n3. useCallback (function memoization): Caches a function reference.\nconst handleClick = useCallback(() => doThing(id), [id]);\n\nWhen to use: Only when you have a measurable performance problem. Premature memoization adds complexity without benefit — the memoization itself has a cost (memory + comparison on every render).", theory: "Memoization is an optimization that caches previous results and returns them when inputs haven't changed, avoiding redundant computation. React has three memoization tools: React.memo (memoizes a component's rendered output — skips re-render if props haven't changed), useMemo (memoizes a computed value — skips recomputation if dependencies haven't changed), useCallback (memoizes a function reference — returns the same function object if dependencies haven't changed). Think of it like storing the answer to a math problem: instead of re-solving 2+2 every time, you remember it's 4."
      },
      {
        q: "What is Lazy Loading in React?",
        a: "Lazy loading defers loading a component's JavaScript bundle until it's actually needed — reducing the initial bundle size and speeding up the first paint.\n\nImplementation with React.lazy + Suspense:\n\n// Instead of: import HeavyChart from './HeavyChart'\nconst HeavyChart = React.lazy(() => import('./HeavyChart'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<Spinner />}>\n      <HeavyChart />\n    </Suspense>\n  );\n}\n\nHow it works: import('./HeavyChart') is a dynamic import that returns a Promise. React.lazy wraps it so React knows to show the Suspense fallback while the chunk loads.\n\nBest practice: Apply lazy loading at the route level — each page/route gets its own chunk. This is the single highest-impact code-splitting technique.\n\nAlso useful for: heavy editors, map components, analytics dashboards — anything not visible on initial load.", theory: "Lazy loading defers loading a component's JavaScript code until it's actually needed. React.lazy(() => import('./Component')) creates a lazily-loaded component. Suspense provides a fallback UI (spinner) while the code loads. Webpack/Vite split the bundle at dynamic import boundaries into separate chunks. This reduces the initial bundle size — users download code for the current route only, improving Time to Interactive. Route-level code splitting is the highest-impact application: each page/route gets its own chunk."
      },
      {
        q: "How to improve React performance?",
        a: "Performance issues usually fall into two categories: unnecessary re-renders and slow renders.\n\nPreventing unnecessary re-renders:\n- React.memo: wrap components that receive the same props frequently\n- useCallback: stabilize function references passed as props\n- useMemo: avoid re-computing expensive values\n- Proper key usage in lists\n- Split large contexts into smaller ones (or use a state manager like Zustand)\n\nSpeeding up renders:\n- Virtualize long lists with react-window or @tanstack/virtual\n- Defer non-urgent updates with useTransition (React 18)\n- Use useDeferredValue for search inputs to avoid blocking typing\n\nBundle size:\n- Route-based code splitting with React.lazy\n- Tree-shake large libraries (lodash, moment)\n- Analyze with webpack-bundle-analyzer\n\nMeasure first: Use React DevTools Profiler to identify actual bottlenecks before optimizing. Blind optimization wastes time and adds complexity.", theory: "Performance optimization starts with profiling (React DevTools Profiler) to find actual bottlenecks. Key techniques: (1) Memoization — React.memo prevents unnecessary child re-renders, useMemo avoids expensive recalculations, useCallback stabilizes function references; (2) Code splitting — React.lazy() loads routes/features on demand; (3) List virtualization — react-window renders only visible list items; (4) State colocation — keep state close to where it's used to minimize re-render scope; (5) Avoid anonymous functions and object literals in JSX (they create new references every render)."
      },
      {
        q: "What causes unnecessary re-renders in React?",
        a: "Re-renders happen when state or props change — but many re-renders are unnecessary:\n\n1. New object/array/function references on every render:\n// Bad — new object created on every render\n<Child options={{ color: 'red' }} />\n// Fix — memoize or define outside component\n\n2. Parent re-rendering re-renders all children by default — even if their props didn't change. Fix: React.memo on children.\n\n3. Context value changing: if you pass an object as context value, it's a new reference on every render. Fix: memoize the context value with useMemo.\n\n4. Calling setState with the same value (shallow equality fails for objects): React still re-renders. Fix: check before setting state.\n\n5. Missing or incorrect useCallback dependencies — function recreated every render.\n\n6. Using array index as key in dynamic lists — React can't track identity, re-renders everything.\n\nDiagnose with: React DevTools Profiler → 'Highlight updates when components render' setting.", theory: "React re-renders a component when: (1) Its state changes via setState/useState setter; (2) Its parent re-renders (children re-render by default even if props didn't change); (3) A context it subscribes to changes its value. Common unnecessary re-render causes: passing new object/array/function references as props each render (breaks React.memo), lifting state too high (a global state change re-renders the whole tree), and context values that update frequently with many consumers. Solutions: React.memo, useMemo for stable values, useCallback for stable functions, and splitting contexts by update frequency."
      },
      {
        q: "What are Lifecycle Methods in React?",
        a: "Lifecycle methods are special methods in class components called at specific phases of a component's life:\n\nMounting (component created and added to DOM):\n- constructor(): initialize state, bind methods\n- static getDerivedStateFromProps(): rarely used, sync state from props\n- render(): returns JSX (the only required method)\n- componentDidMount(): runs after first render — good for API calls, subscriptions, DOM measurements\n\nUpdating (state or props changed):\n- shouldComponentUpdate(nextProps, nextState): return false to skip re-render — optimization\n- getSnapshotBeforeUpdate(): capture DOM info before update (scroll position)\n- componentDidUpdate(prevProps, prevState): runs after update — compare prev/next props to conditionally fetch\n\nUnmounting:\n- componentWillUnmount(): cleanup — clear intervals, cancel requests, remove listeners\n\nFunctional equivalent with useEffect:\n- componentDidMount → useEffect(() => {}, [])\n- componentDidUpdate → useEffect(() => {}, [dep])\n- componentWillUnmount → return () => cleanup from useEffect", theory: "Lifecycle methods are class component hooks into React's mount/update/unmount cycle. Mounting: constructor (initialize state) → render → componentDidMount (fetch data, setup subscriptions). Updating: render → componentDidUpdate (respond to prop/state changes). Unmounting: componentWillUnmount (cleanup subscriptions, timers). Hook equivalents: useEffect(() => { /* mount */ return () => { /* unmount */ }; }, []) replaces componentDidMount + componentWillUnmount. useEffect(() => { /* update */ }, [dep]) replaces componentDidUpdate for specific deps."
      },
      {
        q: "What is State Management in React?",
        a: "State is data stored inside a component that can change over time and update the UI. State management is how you store, update, and share that data across your application.\n\nState in a Class Component (legacy):\nclass Counter extends React.Component {\n  constructor() {\n    super();\n    this.state = { count: 0 };\n  }\n  increment = () => {\n    this.setState({ count: this.state.count + 1 });\n  };\n  render() {\n    return <button onClick={this.increment}>{this.state.count}</button>;\n  }\n}\n\nState in a Functional Component (modern):\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}\n\nReact state management layers:\n1. Local state (useState / useReducer): belongs to one component. Best default — keep state as local as possible.\n2. Lifted state: move to nearest common ancestor when siblings share it.\n3. Context API + useContext: global state without prop drilling. Good for auth, theme, locale. Drawback: all consumers re-render on every change.\n4. External state managers:\n   - Redux Toolkit: predictable, great DevTools, for large/complex apps\n   - Zustand: minimal API, no boilerplate, easy to learn\n   - Jotai / Recoil: atomic state — fine-grained updates\n   - React Query / TanStack Query: for server/async state — caching, refetching, deduplication\n\nRule of thumb: start with useState. Add Context when prop drilling hurts. Add a library when Context performance or async state becomes a problem.", theory: "State management is about deciding where state lives and how it flows. React's state hierarchy: (1) Local state — useState for component-specific data (form inputs, modal open/close); (2) Lifted state — share state via common ancestor when siblings need the same data; (3) Context API — global data that changes infrequently (theme, auth, locale); (4) External stores — Redux, Zustand, Jotai for complex global state with frequent updates. The rule: keep state as local as possible. Lift only when necessary. Use external stores for complex cross-cutting concerns."
      },
      {
        q: "What is the dependency array in useEffect?",
        a: "The dependency array is the second argument to useEffect. It controls when the effect re-runs:\n\n// No array — runs after EVERY render\nuseEffect(() => { doSomething(); });\n\n// Empty array — runs ONCE after mount\nuseEffect(() => { fetchData(); }, []);\n\n// With dependencies — runs when any dep changes\nuseEffect(() => { fetchUser(userId); }, [userId]);\n\n// With cleanup\nuseEffect(() => {\n  const sub = subscribe(id);\n  return () => sub.unsubscribe(); // cleanup on unmount or before re-run\n}, [id]);\n\nCommon mistakes:\n- Omitting a dependency (stale closure): effect reads an old value because the variable wasn't listed\n- Listing an object/function created in render: causes infinite loop because the reference changes every render\n- Over-adding deps: include only values the effect actually uses\n\nUse the eslint-plugin-react-hooks exhaustive-deps rule — it catches most dependency array bugs automatically.", theory: "The dependency array is useEffect's control mechanism — it tells React when to re-run the effect. Empty array []: run once on mount (like componentDidMount). No array: run after every render (rarely what you want). [dep1, dep2]: run when any dependency changes. React compares dependencies using Object.is() (reference equality). Missing dependencies create stale closures (effect uses old values). Extra dependencies cause unnecessary runs. The eslint-plugin-react-hooks exhaustive-deps rule enforces correct dependency arrays."
      },
      {
        q: "What is useContext and how does it work?",
        a: "useContext is a Hook that reads the current value of a React context — eliminating the need for the verbose Consumer component pattern.\n\nSetup:\n// 1. Create context\nconst ThemeContext = createContext('light');\n\n// 2. Provide at the top level\n<ThemeContext.Provider value='dark'>\n  <App />\n</ThemeContext.Provider>\n\n// 3. Consume anywhere in the tree\nfunction Button() {\n  const theme = useContext(ThemeContext);\n  return <button className={theme}>Click</button>;\n}\n\nKey behaviors:\n- Any component calling useContext re-renders when the context value changes\n- If you pass an object as value, memoize it with useMemo to prevent unnecessary re-renders\n- useContext does NOT replace state management — it's a data transport mechanism. Combine with useState or useReducer in the Provider.\n\nBest for: auth state, theme, locale, current user — data needed globally but rarely changing.", theory: "useContext subscribes a component to a React context. The Provider wraps part of the component tree with a value prop. Any component within that tree can call useContext(MyContext) to read the current value without prop drilling. When the Provider's value changes, all consuming components re-render. useContext is like a shared water tank: instead of each house having water carried by hand through multiple streets (prop drilling), houses tap directly into the shared supply. For performance: split contexts by update frequency to avoid unnecessary re-renders."
      },
      {
        q: "What is Context API?",
        a: "The Context API is React's built-in solution for sharing data across the component tree without manually passing props at every level.\n\nCore pieces:\n1. React.createContext(defaultValue): creates a context object\n2. Context.Provider: wraps the component tree, supplies the value\n3. useContext(Context): consumes the value in any descendant\n\nFull example:\nconst UserContext = createContext(null);\n\nfunction App() {\n  const [user, setUser] = useState({ name: 'Alice' });\n  return (\n    <UserContext.Provider value={{ user, setUser }}>\n      <Dashboard />\n    </UserContext.Provider>\n  );\n}\n\nfunction Profile() {\n  const { user } = useContext(UserContext); // no prop drilling\n  return <h1>{user.name}</h1>;\n}\n\nPerformance note: Every component consuming the context re-renders when the context value changes — even if the part of the value they use didn't change. For high-frequency updates, split contexts by concern or use Zustand/Jotai instead.", theory: "Context API provides a way to share data across the component tree without passing props at every level. It solves prop drilling for global data. createContext() creates a context object. Provider wraps the tree and supplies the value. Consumers (useContext Hook or Context.Consumer) access it anywhere below. Context re-renders all consumers when the value changes — avoid putting frequently-changing values in context to prevent performance issues. Best for: auth state, theme, locale, and other global configuration."
      },
      {
        q: "What is React Strict Mode?",
        a: "Strict Mode is a development-only tool that helps detect potential problems by intentionally running certain code twice and activating extra checks.\n\nEnable it by wrapping your app:\n<React.StrictMode>\n  <App />\n</React.StrictMode>\n\nWhat it does:\n1. Double-invokes render functions, useState initializers, and useReducer functions — to expose side effects in impure functions (should have no visible effect in pure code)\n2. Double-invokes useEffect setup+cleanup — to detect effects not properly cleaning up\n3. Warns about deprecated APIs (componentWillMount, findDOMNode)\n4. Warns about key prop issues in lists\n\nImportant: Double-invocation ONLY happens in development, never in production. If your app breaks in Strict Mode, it had latent bugs — Strict Mode just made them visible.\n\nReact 18 Strict Mode also simulates unmounting and remounting components to prepare for future React features (Offscreen/Activity).", theory: "Strict Mode is a React development tool that intentionally runs certain functions twice (render, state initializers, effects) to detect side effects. It warns about: deprecated lifecycle methods, legacy ref API, unexpected side effects in render, and unsafe legacy patterns. Zero impact on production builds — it's purely a development aid. In React 18, effects run twice on mount in Strict Mode to verify cleanup functions work correctly. If your effect breaks when run twice, your cleanup function is incomplete."
      },
      {
        q: "What is a custom Hook in React?",
        a: "A custom Hook is a JavaScript function whose name starts with 'use' that calls other React Hooks. It's a pattern for extracting and reusing stateful logic across multiple components.\n\nExample — useFetch:\nfunction useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    let cancelled = false;\n    fetch(url)\n      .then(r => r.json())\n      .then(d => { if (!cancelled) setData(d); })\n      .catch(e => { if (!cancelled) setError(e); })\n      .finally(() => { if (!cancelled) setLoading(false); });\n    return () => { cancelled = true; };\n  }, [url]);\n\n  return { data, loading, error };\n}\n\n// Usage in any component:\nconst { data, loading } = useFetch('/api/users');\n\nOther common custom hooks: useLocalStorage, useDebounce, useWindowSize, usePrevious, useOnClickOutside.\n\nKey rule: custom Hooks follow the same rules as built-in Hooks — only call them at the top level of a function component or another custom Hook.", theory: "Custom Hooks are functions starting with 'use' that compose React's built-in Hooks to extract and reuse stateful logic. They're like specialized tools built for your recurring problems. useFetch(url) handles loading/error/data state for API calls. useLocalStorage(key) syncs state with localStorage. useDebounce(value, delay) debounces a changing value. Each component using the same custom Hook gets its own isolated state — Hooks share logic, not state. They replaced HOCs and render props as the primary logic-reuse pattern."
      },
      {
        q: "What is a Portal in React?",
        a: "A Portal lets you render a child component into a DOM node that exists outside the parent component's DOM hierarchy — while still keeping it in the React component tree (events still bubble up normally).\n\nSyntax:\nReactDOM.createPortal(child, domNode)\n\nExample:\nfunction Modal({ children }) {\n  return ReactDOM.createPortal(\n    <div className='modal'>{children}</div>,\n    document.getElementById('modal-root') // outside #root\n  );\n}\n\nWhen to use:\n- Modals / dialogs — must render above everything, z-index conflicts with overflow:hidden parents\n- Tooltips — need to escape clipping containers\n- Toast notifications — global positioning\n- Dropdown menus that overflow their scroll container\n\nKey behaviors:\n- Events bubble through the React tree (not the DOM tree) — a click inside a portal still triggers onClick on the React parent\n- Context works normally — portals can consume context from their React parent\n- CSS from the portal's DOM location applies, not the React parent's styles", theory: "Portals render JSX into a different DOM node than the component's parent, while keeping the component in the React tree. Events bubble through the React tree (not the DOM tree), so React event handling works normally. Created with ReactDOM.createPortal(children, domNode). Essential for modals, tooltips, and dropdowns that need to escape parent overflow:hidden or z-index stacking contexts. The portal is logically a child of the React component but physically rendered elsewhere in the DOM."
      },
      {
        q: "What is an Error Boundary in React?",
        a: "An Error Boundary is a React class component that catches JavaScript errors anywhere in its child component tree, logs them, and renders a fallback UI instead of crashing the whole app.\n\nImplementation:\nclass ErrorBoundary extends React.Component {\n  state = { hasError: false };\n\n  static getDerivedStateFromError(error) {\n    return { hasError: true }; // triggers fallback UI\n  }\n\n  componentDidCatch(error, info) {\n    logErrorToService(error, info.componentStack);\n  }\n\n  render() {\n    if (this.state.hasError) return <h2>Something went wrong.</h2>;\n    return this.props.children;\n  }\n}\n\n// Usage:\n<ErrorBoundary>\n  <MyFeature />\n</ErrorBoundary>\n\nWhat Error Boundaries DO NOT catch:\n- Errors inside event handlers (use try/catch)\n- Async errors (setTimeout, fetch) — use try/catch\n- Server-side rendering errors\n- Errors in the Error Boundary itself\n\nTip: Use the 'react-error-boundary' library for a functional wrapper with reset capabilities and onError callback. Place multiple Error Boundaries at different levels to isolate failures.", theory: "Error Boundaries are class components that catch JavaScript errors during rendering anywhere in their child tree, showing fallback UI instead of crashing the whole app. Without Error Boundaries, a single component error unmounts the entire React tree (blank screen). getDerivedStateFromError: update state to show fallback. componentDidCatch: log error details. Error Boundaries do NOT catch: async errors, event handler errors, server-side rendering errors, or errors in the Error Boundary itself. They must be class components — no Hook equivalent exists yet."
      },
      {
        q: "What is a Higher-Order Component (HOC)?",
        a: "A Higher-Order Component is a function that takes a component as input and returns a new enhanced component. It's a pattern for reusing component logic — not a React API feature, just a JavaScript pattern.\n\nSyntax:\nconst EnhancedComponent = higherOrderComponent(WrappedComponent);\n\nExample — withAuth HOC:\nfunction withAuth(Component) {\n  return function AuthenticatedComponent(props) {\n    const { isLoggedIn } = useAuth();\n    if (!isLoggedIn) return <Redirect to='/login' />;\n    return <Component {...props} />;\n  };\n}\n\nconst ProtectedDashboard = withAuth(Dashboard);\n\nCommon HOC use cases:\n- Authentication guards (withAuth)\n- Loading state wrappers (withLoading)\n- Analytics/logging (withTracking)\n- Feature flags (withFeatureFlag)\n\nProblems with HOCs:\n- Wrapper hell — deeply nested components in DevTools\n- Prop name collisions — HOC and component use same prop name\n- Unclear data origin — hard to trace where props come from\n\nModern alternative: Custom Hooks do the same thing with less complexity. HOCs are still common in older codebases and libraries (Redux's connect, React Router's withRouter).", theory: "A Higher-Order Component is a function that takes a component and returns a new enhanced component: (WrappedComponent) => EnhancedComponent. HOCs implement cross-cutting concerns without modifying source components — withAuth redirects unauthenticated users, withTheme injects theme values, withData fetches and injects data. They're the component composition pattern for logic reuse. HOCs can cause: wrapper hell (nested HOCs), prop collision (HOC props shadow component props), and unclear component origins. Custom Hooks have largely replaced HOCs with cleaner syntax."
      },
      {
        q: "What is useCallback and when should you use it?",
        a: "useCallback returns a memoized version of a callback function. The function is only recreated when its dependencies change — otherwise the same function reference is returned.\n\nSyntax:\nconst memoizedFn = useCallback(() => {\n  doSomething(a, b);\n}, [a, b]);\n\nWhy it matters: In JavaScript, functions are objects — a new function literal creates a new reference on every render. If you pass a function as a prop to a child wrapped in React.memo, that child re-renders on every parent render because the prop reference changed — even though the logic is identical.\n\nuseCallback fixes this by stabilizing the reference.\n\nWhen to use:\n1. Passing callbacks to React.memo-wrapped child components\n2. Functions listed in useEffect dependency arrays\n3. Functions passed to expensive child components (large lists, charts)\n\nWhen NOT to use:\n- On every function by default — the memoization has its own cost\n- When the child component isn't memoized — useCallback has no effect\n- For simple components where re-render cost is negligible\n\nRule of thumb: Measure first. Add useCallback only when React Profiler shows the child re-rendering unnecessarily.",
        theory: "useCallback memoizes a function reference between renders. Without it, every render creates a new function instance — breaking React.memo's shallow comparison on child components. Use it when passing callbacks to memoized children or when functions appear in dependency arrays of other Hooks."
      },
      {
        q: "What is useRef and what are its main use cases?",
        a: "useRef returns a mutable ref object: { current: initialValue }. It persists across renders but changing .current does NOT trigger a re-render — unlike state.\n\nSyntax:\nconst ref = useRef(initialValue);\n\nUse Case 1 — DOM access:\nconst inputRef = useRef(null);\n<input ref={inputRef} />\n// Focus programmatically:\ninputRef.current.focus();\n\nUse Case 2 — Mutable value without re-render (instance variable):\nconst timerRef = useRef(null);\ntimerRef.current = setTimeout(fn, 1000);\n// On cleanup:\nclearTimeout(timerRef.current);\n\nUse Case 3 — Track previous value:\nfunction usePrevious(value) {\n  const ref = useRef();\n  useEffect(() => { ref.current = value; }, [value]);\n  return ref.current;\n}\n\nUse Case 4 — Avoiding stale closures:\nStore the latest version of a prop/callback in a ref so an interval or async function always reads the current value.\n\nKey difference from useState:\n- useState: updating triggers re-render, value read is from the render snapshot\n- useRef: updating .current never triggers re-render, always reads the latest value", theory: "useRef returns a mutable {current: value} container that persists for the component's full lifetime without triggering re-renders when mutated. Think of it like a sticky note that stays in place even when you rearrange the room. Primary uses: (1) DOM access — input.current.focus() to programmatically focus elements; (2) Store mutable values — interval IDs, previous values, flags that shouldn't trigger re-renders; (3) Avoid stale closures — store the latest callback ref to access current values in event listeners."
      },
      {
        q: "What is React.memo and how is it different from useMemo?",
        a: "React.memo is a Higher-Order Component that memoizes an entire functional component. It prevents the component from re-rendering if its props haven't changed (shallow equality check).\n\nSyntax:\nconst MyComponent = React.memo(function MyComponent({ name, onClick }) {\n  return <button onClick={onClick}>{name}</button>;\n});\n\n// Optional custom comparison:\nconst MyComponent = React.memo(Component, (prevProps, nextProps) => {\n  return prevProps.id === nextProps.id; // true = skip re-render\n});\n\nReact.memo vs useMemo:\n- React.memo: memoizes a COMPONENT — skips re-render if props unchanged\n- useMemo: memoizes a VALUE — caches result of a computation inside a component\n\nExample of useMemo:\nconst sortedList = useMemo(() => expensiveSort(items), [items]);\n\nWhen React.memo is effective:\n- Component renders often with the same props\n- Component is expensive to render (large subtree, complex calculations)\n- Props are primitives or stable references (use useCallback for functions)\n\nWhen React.memo is NOT effective:\n- Props include inline objects/arrays/functions (new reference every render)\n- Component rarely re-renders anyway\n- The component is very simple — comparison cost > render cost\n\nCommon mistake: Using React.memo without useCallback for function props — the function creates a new reference each render, so memo never skips.", theory: "React.memo is a Higher-Order Component wrapping a component: it skips re-rendering if props haven't changed (shallow comparison). useMemo is a Hook that memoizes a computed value inside a component. React.memo works at the component boundary (skips the whole render). useMemo works inside a render (skips recomputation). Use React.memo on components that receive the same props frequently but their parent re-renders often. Use useMemo for expensive calculations or creating stable object references to prevent child re-renders."
      },
      {
        q: "What is reconciliation in React?",
        a: "Reconciliation is the algorithm React uses to efficiently update the DOM when state or props change. Instead of re-rendering everything, React compares the new virtual DOM tree with the previous one (diffing) and only applies the minimum number of changes to the real DOM.\n\nHow it works:\n1. When state/props change, React creates a new virtual DOM tree\n2. React diffs the new tree against the previous tree (the 'diffing' algorithm)\n3. React calculates the minimal set of DOM operations needed\n4. React applies those changes to the real DOM in a batch (commit phase)\n\nKey rules of the diffing algorithm:\n- Different element types: React tears down the old tree and builds a new one from scratch (e.g., <div> → <span> destroys all children)\n- Same element type: React keeps the DOM node and only updates changed attributes\n- Lists: React uses the key prop to match old and new list items — without keys, it compares by position which is error-prone\n\nWhy O(n) not O(n³):\nReact makes two assumptions: (1) different types = different trees, (2) keys identify stable elements. This lets it avoid comparing every node against every other node.\n\nFiber (React 16+): Reconciliation is now interruptible. React can pause, prioritize, and resume reconciliation — enabling Concurrent Mode features like useTransition and Suspense.\n\nPractical implications:\n- Never change component type conditionally at the same position — it destroys state\n- Always use stable unique keys in lists\n- Keep component hierarchy stable across renders", theory: "Reconciliation is React's algorithm for updating the DOM efficiently after state changes. React builds a new virtual DOM tree and diffs it against the previous one using the Fiber reconciler. Key heuristics: (1) Elements of different types produce completely different trees (destroy and recreate subtree); (2) Elements of same type update existing DOM node with changed attributes; (3) Keys identify stable list items across re-renders. The algorithm is O(n) instead of O(n³) by applying these assumptions, making it practical for real-world UIs."
      },
      {
        q: "What is useMemo and when should you use it?",
        a: "useMemo memoizes the result of an expensive computation, recomputing only when its dependencies change.\n\nSyntax:\nconst memoizedValue = useMemo(() => {\n  return expensiveCalculation(a, b);\n}, [a, b]);\n\nHow it works: On first render, runs the function and caches the result. On subsequent renders, if dependencies haven't changed, returns the cached value without running the function.\n\nWhen to use:\n1. Expensive computations: sorting/filtering large arrays, complex math, data transformations\nconst sortedUsers = useMemo(() => users.sort((a,b) => a.name.localeCompare(b.name)), [users]);\n\n2. Stable object/array references passed to memoized children:\nconst config = useMemo(() => ({ theme, lang }), [theme, lang]);\n// Without useMemo, new object reference every render → child always re-renders\n\n3. Avoiding expensive recalculations in tight loops or large lists\n\nWhen NOT to use:\n- Simple computations (addition, string concat) — memo overhead costs more than the computation\n- Values not passed to children — if only used locally, re-computing is fine\n- Premature optimization — always measure with React Profiler first\n\nuseMemo vs useCallback:\n- useMemo(() => fn, deps) → memoizes the RETURN VALUE (could be a function, array, object, number)\n- useCallback(fn, deps) → shorthand for useMemo(() => fn, deps) when the value IS a function\n\nGolden rule: Don't add useMemo everywhere. It adds memory overhead and complexity. Measure, identify the bottleneck, then apply.",
        theory: "useMemo caches an expensive computation result, recomputing only when dependencies change. Use it for costly derivations (filtering/sorting large arrays) or to create stable object references that prevent unnecessary child re-renders or effect re-runs."
      }
    ],
    Intermediate: [
      { q: "Explain useEffect and its dependency array.", a: "useEffect lets you perform side effects (data fetching, subscriptions, DOM manipulation) in functional components. It runs after render. The dependency array controls when it re-runs: [] means run once on mount, [value] means run whenever 'value' changes, and omitting it means run after every render.", theory: "useEffect's dependency array implements a comparison check before running the effect. React uses Object.is() (shallow equality) to compare each dependency against its previous value. An empty array [] means the effect has no dependencies and runs only on mount/unmount. Dependencies tell React when the effect needs to re-synchronize with the outside world." },
      { q: "What is useCallback and when should you use it?", a: "useCallback returns a memoized version of a callback function, only recreating it when its dependencies change. Use it to prevent unnecessary re-renders of child components that receive functions as props, or when a function is a dependency of useEffect.", theory: "useCallback memoizes a function reference. Without it, a new function instance is created every render, breaking React.memo on child components that receive it as a prop. Used with React.memo, it prevents unnecessary child re-renders. Also use it when a function is a dependency in another Hook's dependency array." },
      { q: "What is useMemo and how is it different from useCallback?", a: "useMemo memoizes a computed value, recomputing only when dependencies change. useCallback memoizes a function reference. useMemo: const val = useMemo(() => expensiveCalc(x), [x]). useCallback: const fn = useCallback(() => doSomething(x), [x]).", theory: "useMemo memoizes a computed value; useCallback memoizes a function reference. useMemo(fn, deps) calls fn and caches the result. useCallback(fn, deps) caches fn itself without calling it. useMemo is for expensive calculations (filtering large arrays, complex transforms). Both should be used selectively — memoization has its own cost." },
      { q: "What is the Context API and when should you use it?", a: "The Context API provides a way to pass data through the component tree without prop drilling. Use it for global state like theme, locale, or authentication. For complex state logic, consider pairing it with useReducer. Avoid overusing it as it can cause unnecessary re-renders.", theory: "Context API solves prop drilling by providing a way to share values across the component tree without explicitly passing props through every level. It uses a Provider/Consumer pair with React's reconciliation triggering re-renders in all consumers when the context value changes. Best for data that changes infrequently (theme, auth state, locale)." },
      { q: "What is React.memo and how does it work?", a: "React.memo is a higher-order component that memoizes a functional component, preventing re-renders if its props haven't changed (shallow comparison). It's useful for optimizing components that receive the same props frequently but are expensive to render.", theory: "React.memo is a higher-order component that wraps a component and memoizes its rendered output. Before re-rendering, React does a shallow prop comparison — if no props changed, the previous render output is reused. It's the functional component equivalent of shouldComponentUpdate or PureComponent in class components." },
      { q: "What are custom Hooks and why create them?", a: "Custom Hooks are JavaScript functions whose names start with 'use' and that call other Hooks. They allow you to extract and reuse stateful logic across components without changing the component hierarchy. For example, useFetch, useLocalStorage, or useDebounce.", theory: "Custom Hooks extract component logic into reusable functions. Any logic using built-in Hooks can become a custom Hook. They solve the same problems as HOCs and render props but with a simpler, more composable API. Each component using a custom Hook gets isolated state — the Hook shares logic, not the state itself." },
      { q: "What is code splitting and how do you implement it in React?", a: "Code splitting breaks your bundle into smaller chunks loaded on demand. In React, use React.lazy() with Suspense: const LazyComp = React.lazy(() => import('./Component')). Wrap it in <Suspense fallback={<Spinner />}> to show a fallback while loading.", theory: "Code splitting divides your bundle into smaller chunks loaded on demand. React.lazy() + dynamic import() creates split points. Suspense provides loading UI. Routes are the most impactful split points — users only load code for the pages they visit. Webpack/Vite handle the actual bundle splitting automatically." },
      { q: "What is prop drilling and how do you avoid it?", a: "Prop drilling is passing props through many nested component layers just to reach a deeply nested child. Avoid it with the Context API for global/shared state, or state management libraries like Redux or Zustand, or component composition patterns.", theory: "Prop drilling passes data through intermediate components that don't use it — just to reach nested descendants. This creates tight coupling and makes refactoring painful. Context API solves it for global/shared data. Composition patterns (render props, children slots) solve it for parent-child communication." },
      { q: "What is the useReducer Hook and when should you use it over useState?", a: "useReducer manages complex state logic through a reducer function: (state, action) => newState. Use it when: state has multiple sub-values, next state depends on previous state, state transitions follow a defined pattern, or you want Redux-like predictability. useState is simpler for independent, primitive values.", theory: "useReducer manages complex state with a pure reducer function: (state, action) => newState. Use it when: multiple state values are interdependent, state transitions are complex (multiple cases), next state depends on previous state, or you need predictable, testable state transitions. It's useState's power alternative, not replacement." },
      { q: "What is useRef and what are its use cases?", a: "useRef returns a mutable ref object that persists across renders without causing re-renders. Use cases: 1) Accessing DOM elements directly (focus, scroll, measure), 2) Storing mutable values that shouldn't trigger re-renders (previous value, timer IDs, abort controllers), 3) Integrating with third-party DOM libraries.", theory: "useRef returns a mutable ref object whose .current property persists for the component's full lifetime without causing re-renders when changed. It has two main uses: accessing DOM elements directly (input.current.focus()) and storing mutable values that persist between renders without triggering re-renders (timers, previous values, flag tracking)." },
      { q: "What are Higher Order Components (HOCs) and what problems do they solve?", a: "An HOC is a function that takes a component and returns a new enhanced component — it's a pattern for reusing component logic (auth guards, logging, data fetching). HOCs were the pre-Hooks solution. They can cause wrapper hell and prop collision issues. Today, custom Hooks are preferred over HOCs for most use cases.", theory: "HOCs compose component behavior without modifying components directly. They wrap components to inject props, intercept renders, or add lifecycle logic. Common HOC patterns: withAuth (redirect if not logged in), withData (inject fetched data), withTheme (inject theme values). Custom Hooks solved most HOC use cases with cleaner syntax." },
      { q: "What is the difference between useLayoutEffect and useEffect?", a: "useEffect runs asynchronously after the browser paints. useLayoutEffect runs synchronously after DOM mutations but before the browser paints — like componentDidMount/componentDidUpdate. Use useLayoutEffect when you need to measure DOM layout or make DOM mutations that must happen before the user sees the result to avoid visual flicker.", theory: "useLayoutEffect runs synchronously after DOM mutations, before browser paint — blocking visual updates until it completes. useEffect runs asynchronously after paint. Use useLayoutEffect for DOM measurements that affect layout (to prevent flicker), and useEffect for everything else (data fetching, subscriptions, logging)." },
      { q: "How does error handling work in React with Error Boundaries?", a: "Error Boundaries are class components that implement componentDidCatch and/or getDerivedStateFromError. They catch JavaScript errors in their child component tree and render a fallback UI instead of crashing. They do NOT catch errors in event handlers, async code, or server-side rendering — those need try/catch. Only class components can be Error Boundaries (no Hook equivalent yet).", theory: "Error Boundaries catch errors during rendering, preventing the whole app from crashing. getDerivedStateFromError triggers fallback UI (synchronously). componentDidCatch logs error info (asynchronously, can have side effects). Boundaries don't catch async errors, event handler errors, or SSR errors — those need try/catch." },
      { q: "What is the Render Props pattern?", a: "Render Props is a technique where a component receives a function as a prop that returns JSX, giving the parent control over what to render while sharing stateful logic. Example: <DataProvider render={data => <Chart data={data} />} />. Like HOCs, this pattern is mostly replaced by custom Hooks today but you'll see it in older codebases.", theory: "The Render Props pattern passes a function as a prop that a component calls to render its output. The component handles state/behavior; the caller controls rendering. This enables logic reuse without HOCs or inheritance. The function-as-children pattern is a specific variant. React Hooks largely replaced render props with cleaner syntax." },
      { q: "What is React Router and how does client-side routing work?", a: "React Router enables client-side navigation without full page reloads. It uses the browser's History API to update the URL and render different components. BrowserRouter wraps the app, Routes/Route define path-component mappings, Link replaces anchor tags. v6 introduced relative routes, nested layouts, and useNavigate/useParams/useLocation hooks.", theory: "React Router intercepts navigation events (URL changes) and renders different components without full page reloads. It uses the History API (pushState/popState) for URL manipulation. BrowserRouter manages history; Routes match URL patterns to components; Link/useNavigate enable navigation without triggering HTTP requests." },
      { q: "What is the difference between React Query and Redux for server state?", a: "Redux is a general client-side state manager — it stores UI state, user preferences, derived data. React Query (TanStack Query) is specifically for server/async state — it handles fetching, caching, background refetching, deduplication, and stale-while-revalidate automatically. Using Redux for server data means manually writing fetch logic, loading states, and caching. React Query does all of that with a single useQuery hook.", theory: "Redux is a client-side state manager — it stores UI state, form data, and derived state locally. React Query manages server state — remote data with specific challenges: staleness, caching, background refetching, synchronization. Using Redux for server state requires significant boilerplate. React Query handles caching, deduplication, and refetching automatically." }
    ],
    "Advanced & Scenario": [
      { tag: "SCENARIO", q: "Your React app re-renders excessively and becomes sluggish. A parent component holds a large list and passes a filter function as a prop to 500+ child rows. How do you diagnose and fix this?", a: "First, use React DevTools Profiler to identify which components are re-rendering and why. The core issue is that a new function reference is created on every parent render, causing all 500 children to re-render even when nothing changed.\n\nFix: Wrap the filter function in useCallback so its reference is stable across renders. Wrap each child row in React.memo so it skips re-renders when its props haven't changed (shallow comparison). If the list itself is expensive to compute, wrap it in useMemo. Also consider windowing (react-window or react-virtual) to only render visible rows in the DOM — rendering 500 DOM nodes is expensive regardless of memoization.", theory: "Excessive re-renders are the most common React performance problem. The root cause is always the same: a component re-renders when its parent re-renders, when its state changes, or when its props change (including new references). The fix always follows: identify the cause with DevTools Profiler, then apply the right optimization." },
      { tag: "SCENARIO", q: "You have a useEffect that fetches user data based on a userId prop. Users report seeing stale data from a previous user briefly before new data loads. How do you fix this race condition and stale closure issue?", a: "This is a classic race condition + stale closure problem. Two fixes:\n\n1. Cleanup with AbortController: Use an AbortController inside useEffect. Return a cleanup function that calls controller.abort(). This cancels in-flight requests when userId changes before the previous fetch completes.\n\n2. Ignore stale responses: Use a boolean flag 'let cancelled = false'. In the async callback, only set state if !cancelled. Return () => { cancelled = true } as cleanup.\n\nAlso ensure userId is in the dependency array. For production apps, React Query or SWR handle this automatically — they also provide caching, deduplication, and background refetching.", theory: "Stale closures in useEffect happen when the effect captures an old value from its closure and never gets the updated one. The dependency array controls when effects re-run. Missing dependencies create stale closures; adding them triggers unnecessary re-runs. The cleanup function handles race conditions when props change before fetches complete." },
      { tag: "HARD", q: "Explain how React's reconciliation (diffing) algorithm works, and what assumptions it makes to achieve O(n) complexity instead of O(n³).", a: "A naive tree diff between two DOM trees is O(n³). React achieves O(n) by making two key assumptions:\n\n1. Elements of different types produce entirely different trees — React won't try to match a <div> subtree with a <section> subtree; it tears down and rebuilds.\n\n2. Developers hint at stable identity with the key prop — React uses keys to match children across renders without comparing every node.\n\nThe algorithm works top-down: it compares root elements, then recurses into children only if the element type matches. For lists, keys identify moves, additions, and deletions efficiently. Implication: never use array index as a key for reorderable lists.", theory: "React's reconciler (Fiber) compares the new virtual DOM tree against the previous one. The heuristic algorithm is O(n) instead of O(n³) by assuming: elements of different types produce different trees, and key props identify stable elements across renders. These assumptions enable fast, practical updates for real-world UIs." },
      { tag: "HARD", q: "When would you choose Zustand over Redux, and when would you still pick Redux for a 3-year-old production React app?", a: "Choose Zustand when: state is relatively straightforward, you want minimal boilerplate, or you're building new feature islands. Zustand's API is tiny — a store is just a function with get/set, no providers or reducers needed.\n\nStick with Redux when: the app already uses it and migration cost outweighs benefit; you need Redux DevTools time-travel debugging; you have strict unidirectional data flow requirements; or complex async orchestration via redux-saga is already well-tested.\n\nFor a 3-year-old codebase: a partial migration — Zustand for new features, Redux for existing state — is often the pragmatic path. Never migrate state management without measurable benefit.", theory: "State management library choice depends on complexity, team size, and features needed. Redux excels with complex state transitions, time-travel debugging, and large teams needing strict patterns. Zustand excels with simpler APIs, less boilerplate, and smaller bundles. Context API suits stable global data without frequent updates." },
      { tag: "SCENARIO", q: "Your team's large React app has a 6MB JavaScript bundle. Users on mobile report slow load times. Walk through your entire bundle optimization strategy.", a: "1. Analyze first: Use webpack-bundle-analyzer or Vite's rollup-plugin-visualizer. Often it's moment.js with all locales, lodash fully imported, or a large charting library.\n\n2. Route-based code splitting: React.lazy + Suspense at the router level. This alone can cut initial bundle 50–70%.\n\n3. Tree shaking: Replace 'import _ from lodash' with named imports. Use date-fns instead of moment. Ensure ES modules are used.\n\n4. Dynamic imports for heavy components: Charts, editors, map libraries loaded only when needed.\n\n5. Externalize to CDN: React, ReactDOM via externals config.\n\n6. Compression: Enable Brotli on server — 20–25% better than gzip.\n\n7. Measure with Lighthouse and Web Vitals (LCP, FID, CLS). Target <200KB initial JS.", theory: "Bundle size directly impacts load performance — especially on mobile and slow connections. Analysis (webpack-bundle-analyzer) identifies the largest contributors. Code splitting, lazy loading, and tree shaking are the primary reduction techniques. Third-party libraries are often the biggest culprits — use bundle-size-aware alternatives." },
      { tag: "HARD", q: "What is tearing in React concurrent mode and how do React 18's features address it?", a: "Tearing occurs in concurrent mode when React reads from an external store at different points during a single render. Because concurrent rendering can pause and resume, the store might update mid-render, causing different parts of the UI to show different values — a visual inconsistency.\n\nReact 18 addresses this with useSyncExternalStore. It ensures React either gets a consistent snapshot or triggers a synchronous re-render to fix the inconsistency. All major state libraries (Redux 8+, Zustand 4+) updated their React bindings to use useSyncExternalStore. This is essential when using concurrent features like useTransition or Suspense with external stores.", theory: "Tearing is a visual inconsistency where different parts of the UI show different values of the same state during concurrent rendering. In concurrent mode, renders can be interrupted and resumed. External stores (not React state) may update mid-render, showing old values in some components and new values in others. useSyncExternalStore prevents tearing." },
      { tag: "SCENARIO", q: "You're building a real-time collaborative document editor in React. Multiple users can edit simultaneously and changes must sync instantly. How would you architect the state management and data flow?", a: "1. Transport: WebSockets for real-time bidirectional communication. Each client sends operations, not full document state.\n\n2. Conflict resolution: Use a CRDT library like Yjs or Automerge. Yjs is production-proven with React bindings and handles concurrent edits without conflicts.\n\n3. State separation: Keep document state in Yjs (not React state). React state is for UI only. Bind Yjs changes to React via useEffect + Y.Doc observers.\n\n4. Presence: Use Yjs's built-in awareness protocol to broadcast cursor positions separately from document state.\n\n5. Persistence: Server persists Yjs binary updates to DB with periodic snapshots + incremental updates.\n\n6. Offline: CRDT naturally supports offline edits — merges on reconnect.", theory: "Real-time collaborative editing requires handling concurrent edits from multiple users simultaneously. Operational Transform (OT) and CRDTs (Conflict-free Replicated Data Types) are the two main approaches. CRDTs merge concurrent operations without conflicts. Yjs/Automerge are popular CRDT libraries with React integration." },
      { tag: "HARD", q: "How does React 18's automatic batching work and how is it different from React 17?", a: "In React 17, batching only happened inside React event handlers. Updates inside setTimeout, Promises, or native events triggered separate re-renders.\n\nReact 18 introduced automatic batching for ALL update sources — setTimeout, fetch .then(), native events — batching them into a single re-render.\n\nExample: setA(1) + setB(2) inside a setTimeout caused 2 renders in React 17, 1 render in React 18.\n\nThe enabler is the new createRoot() API — legacy ReactDOM.render() doesn't get automatic batching. Use flushSync() from react-dom to opt out when you specifically need synchronous, unbatched updates.", theory: "Batching groups multiple state updates into a single re-render. React 17 only batched updates inside React event handlers. React 18 automatically batches updates in setTimeout, Promises, and native event handlers too. This reduces renders and improves performance. createRoot() opts into React 18 concurrent features including automatic batching." },
      { tag: "SCENARIO", q: "A senior dev reviews your React component and says it has a 'stale closure' bug. What does this mean and how do you reproduce and fix it?", a: "A stale closure occurs when a function captures a variable from its scope at creation time, and that variable later changes — but the function still references the old value.\n\nExample: A useEffect with [] sets up an interval that reads a 'count' state variable. Because the effect only ran once, 'count' is always 0 inside the callback, no matter how many times it's been updated.\n\nFix options:\n1. Add the variable to the dependency array — effect re-runs with fresh value.\n2. Use the functional updater: setCount(prev => prev + 1) — doesn't need to read current count.\n3. Use useRef to store a mutable reference that's always current.\n\nRule of thumb: if a useEffect or useCallback reads a value, that value should be in the dependency array or accessed via a ref.", theory: "Stale closures occur when a function captures a variable at creation time and that variable later changes, but the function keeps using the old value. In React, this commonly happens with useEffect when a dependency is missing from the array. The effect captures the initial value of the variable and never sees updates." },
      { tag: "HARD", q: "What is React Server Components (RSC) and how does it change the mental model of a React application?", a: "React Server Components run exclusively on the server — no client-side JS bundle cost, can directly access databases/file system, and never re-render on the client. Different from SSR (which renders on server but hydrates on client).\n\nMental model shift:\n- Server Components: async, no state/hooks/browser APIs, zero bundle size\n- Client Components: interactive, have state/effects, include 'use client' directive\n\nThe component tree is now hybrid — RSC renders the shell and static parts server-side, Client Components handle interactivity. Data fetching moves to the component level.\n\nTradeoffs: adds complexity, requires a compatible framework (Next.js App Router), debugging is harder. Best for content-heavy apps, not SPAs with heavy interactivity.", theory: "React Server Components render on the server and stream HTML to the client, eliminating the need to ship their JavaScript to the browser. They can directly access databases and file systems without API layers. They represent a paradigm shift: components can now run in two environments (server/client) within the same tree." },
      { tag: "SCENARIO", q: "Your React app's LCP score on Lighthouse is 4.8s. Product wants it under 2.5s. What is your systematic approach?", a: "LCP measures when the largest visible element renders. Common culprits:\n\n1. Identify the LCP element: Chrome DevTools Performance panel.\n\n2. If it's an image: Add loading='eager' and fetchpriority='high'. Serve WebP/AVIF. Preload: <link rel='preload' as='image' href='...'>.\n\n3. If it's text: Preload fonts. Use font-display: swap. Avoid render-blocking CSS.\n\n4. Server response (TTFB): If >600ms, optimize SSR, add CDN, or cache HTML.\n\n5. Remove render-blocking resources: Defer non-critical JS, inline critical CSS.\n\n6. SSR/SSG: If client-rendered, switch to Next.js SSR/SSG so LCP element is in initial HTML.\n\nMeasure with real-device throttling — lab and field data differ significantly.", theory: "LCP (Largest Contentful Paint) measures when the largest visible element renders. Poor LCP is caused by slow server responses, render-blocking resources, slow resource load times, and client-side rendering. Core Web Vitals targets LCP under 2.5s. Each optimization technique addresses a different part of the critical rendering path." },
      { tag: "HARD", q: "Explain React Fiber architecture. What problem did it solve over the old stack reconciler?", a: "Before Fiber (React 15), the reconciler was recursive and synchronous. Once started, it couldn't be interrupted — long trees blocked the main thread, dropping frames and making UIs janky.\n\nFiber (React 16+) represents each component as a 'fiber' — a JavaScript object unit of work. The reconciler can now:\n1. Pause work and resume later\n2. Assign priority to updates (user input > data fetch)\n3. Reuse previously completed work\n4. Abort work no longer needed\n\nThis enabled Concurrent Mode: useTransition, Suspense, useDeferredValue.\n\nKey insight: rendering splits into two phases:\n- Render phase (interruptible): builds the work-in-progress fiber tree\n- Commit phase (synchronous): applies DOM changes — uninterruptible", theory: "React Fiber is a complete rewrite of React's reconciliation engine (React 16+). The old reconciler used a recursive algorithm that couldn't be interrupted. Fiber represents work as a linked list of fiber nodes, enabling incremental rendering — breaking work into chunks and yielding to the browser between chunks. This unlocks concurrent features." },
      { tag: "SCENARIO", q: "Your e-commerce product page fetches product details, reviews, and related products — three separate API calls. The page feels slow. The product manager says reviews and related products can load after the main content. How do you architect this in React?", a: "This is a perfect use case for prioritized data loading with Suspense and parallel fetching.\n\n1. Split into priority tiers:\n   - Critical (blocks render): product details — fetch immediately, show loading state\n   - Deferred (loads after): reviews and related products — fetch in parallel but don't block the main content from rendering\n\n2. Implementation with useEffect priority:\nFetch product details first. Once the component renders the critical UI, trigger reviews and related products fetches in a separate useEffect with a small delay or useTransition.\n\n3. Better: React Query or SWR:\n   - useQuery for product (critical, shows skeleton)\n   - useQuery for reviews with enabled: !!productId (only fetches after product loads)\n   - useQuery for related products in parallel\n\n4. With Suspense (React 18+):\n   - <Suspense fallback={<ProductSkeleton />}> wraps only the critical part\n   - Reviews and related products in their own <Suspense> boundaries with fallback skeletons\n   - They load independently — one slow API doesn't block others\n\n5. Never fetch all three sequentially (waterfall). Use Promise.all or React Query's parallel queries to fire them concurrently.\n\nResult: Product renders in ~200ms, reviews and related products fill in at their own pace without blocking the user from seeing the main product.", theory: "Concurrent rendering with React 18 enables prioritized rendering — urgent updates (user interactions) preempt less urgent work (data loading). Suspense boundaries let you declaratively specify loading states. Data fetching libraries (React Query, SWR) coordinate with Suspense to show optimized loading sequences." },
      { tag: "SCENARIO", q: "A junior developer on your team committed code that causes the entire React app to go blank on certain routes. You suspect an unhandled error in a component. How do you systematically debug and prevent this?", a: "Step-by-step debugging approach:\n\n1. Open browser DevTools → Console tab. The error message and stack trace will point directly to the component and line number. React shows a component stack trace in development.\n\n2. Check if an Error Boundary exists. If not, one unhandled error anywhere in the tree causes the entire React tree to unmount — the white screen. This is React's default behavior since React 16.\n\n3. Reproduce locally: navigate to the broken route. If you can't reproduce, the error may be environment-specific (different data, different user state).\n\n4. Common causes of white screens:\n   - Calling a method on null/undefined: user.address.city when user or address is null\n   - Array.map on a non-array value from an API\n   - Rendering a non-serializable value (object instead of string/number)\n   - Missing optional chaining: user?.address?.city\n\n5. Fix the root cause AND add an Error Boundary:\nclass ErrorBoundary extends React.Component {\n  state = { hasError: false, error: null };\n  static getDerivedStateFromError(error) { return { hasError: true, error }; }\n  componentDidCatch(error, info) { logErrorToService(error, info); }\n  render() {\n    if (this.state.hasError) return <div>Something went wrong. <button onClick={() => this.setState({hasError:false})}>Retry</button></div>;\n    return this.props.children;\n  }\n}\n\n6. Add Error Boundaries at multiple levels: per-page, per-section (don't crash the whole app for a broken sidebar).\n\n7. Prevention: use TypeScript for type safety, optional chaining (?.), nullish coalescing (??), and always handle null/undefined states from API responses.", theory: "A blank screen in React means the entire component tree crashed without an Error Boundary to catch it. React's default behavior since React 16 is to unmount the whole tree on uncaught errors during rendering. Error Boundaries are the solution — they catch render errors and show fallback UI instead of blanking the screen." },
      { tag: "SCENARIO", q: "Your React app uses Redux for global state. The team is complaining that adding a new feature requires editing 5 files (action types, action creators, reducer, selector, component). How do you modernize the state management setup?", a: "This is the classic Redux boilerplate problem. Solution: migrate to Redux Toolkit (RTK).\n\n1. Redux Toolkit's createSlice collapses all 5 files into 1:\n\n// BEFORE: 5 files, ~60 lines\n// AFTER: 1 slice file, ~20 lines\nimport { createSlice } from '@reduxjs/toolkit';\n\nconst cartSlice = createSlice({\n  name: 'cart',\n  initialState: { items: [], total: 0 },\n  reducers: {\n    addItem: (state, action) => {\n      // RTK uses Immer under the hood — you CAN mutate state here safely\n      state.items.push(action.payload);\n      state.total += action.payload.price;\n    },\n    removeItem: (state, action) => {\n      state.items = state.items.filter(i => i.id !== action.payload.id);\n    }\n  }\n});\n\nexport const { addItem, removeItem } = cartSlice.actions;\nexport default cartSlice.reducer;\n\n2. RTK Query for server state: replaces manually written fetch/loading/error state with a single API slice. Automatic caching, invalidation, and background refetching.\n\n3. If RTK still feels heavy for simple cases, evaluate Zustand for new features:\nconst useCartStore = create(set => ({\n  items: [],\n  addItem: item => set(state => ({ items: [...state.items, item] }))\n}));\n\n4. Migration strategy for a large existing app:\n   - Don't rewrite everything at once\n   - Convert one slice at a time using RTK\n   - New features use Zustand or RTK Query\n   - Old Redux code stays until refactor is justified by maintenance pain\n\n5. Bottom line: RTK is the official, recommended way to write Redux today. It eliminates the boilerplate while keeping Redux's predictability and DevTools.", theory: "Redux with plain reducers requires significant boilerplate. Redux Toolkit (RTK) is the official solution that reduces boilerplate dramatically: createSlice combines action creators and reducers, immer enables 'mutating' reducers that produce immutable state, and RTK Query provides a complete data fetching solution." },
      { tag: "SCENARIO", q: "Users report that your React dashboard flickers every time they switch between tabs within the app. The data disappears and reloads even for data they just fetched. How do you fix this?", a: "This is a server state caching problem. Every tab switch causes component unmount → state lost → refetch on remount.\n\nRoot cause: You're storing fetched data in component-level useState. When the component unmounts (tab switch), state is destroyed. On remount, it fetches again.\n\nSolution 1 — React Query (recommended):\nimport { useQuery } from '@tanstack/react-query';\n\nfunction DashboardTab({ tabId }) {\n  const { data, isLoading } = useQuery({\n    queryKey: ['dashboard', tabId],\n    queryFn: () => fetchDashboardData(tabId),\n    staleTime: 5 * 60 * 1000, // data is fresh for 5 minutes\n  });\n  // ↑ Data is cached in React Query's global cache.\n  // Switching tabs returns cached data INSTANTLY — no flicker.\n}\n\nstaleTime controls how long cached data is considered fresh. During that window, no refetch happens.\n\nSolution 2 — Lift state to a parent that doesn't unmount:\nMove fetched data to a parent component or context that persists across tab switches. Tabs read from the parent, don't fetch themselves.\n\nSolution 3 — Cache in a ref or Zustand:\nStore fetched results in a Zustand store keyed by tab ID. First load fetches; subsequent loads use the store.\n\nAlso add: stale-while-revalidate — show cached data immediately, refetch silently in background, update when new data arrives. This eliminates flicker while keeping data fresh.", theory: "UI flickering during navigation occurs when cached data is cleared and loading states are shown for data that was recently fetched. React Query solves this with stale-while-revalidate: it shows stale cached data immediately while refetching in the background, showing updates only when fresh data arrives." },
      { tag: "HARD", q: "You're building a complex form with 30+ fields, conditional sections, and real-time cross-field validation (e.g., 'end date must be after start date'). useState becomes unwieldy. How do you architect this form in React?", a: "Complex forms need a structured approach. Options from simple to comprehensive:\n\n1. React Hook Form (RHF) — the industry standard for complex forms:\nimport { useForm, watch } from 'react-hook-form';\n\nconst { register, handleSubmit, watch, formState: { errors } } = useForm({\n  defaultValues: { startDate: '', endDate: '' }\n});\n\n// Cross-field validation using watch\nconst startDate = watch('startDate');\n\n<input {...register('endDate', {\n  validate: value => value > startDate || 'End date must be after start date'\n})} />\n\nWhy RHF: uncontrolled inputs (no re-render per keystroke), built-in validation, error handling, and supports Yup/Zod schema validation.\n\n2. Yup/Zod for validation schema:\nconst schema = yup.object({\n  startDate: yup.date().required(),\n  endDate: yup.date().min(yup.ref('startDate'), 'Must be after start date')\n});\n\n3. Conditional sections with watch:\nconst employmentType = watch('employmentType');\n// Only render salary field if employed\n{employmentType === 'employed' && <SalaryField />}\n\n4. Split into multi-step (wizard) if sections are logically separate — reduces cognitive load and per-step validation is simpler.\n\n5. Avoid: storing all 30 fields in useState — 30 re-renders per field interaction. Avoid: one giant useReducer — action creators become as complex as the original problem.\n\nGolden rule: React Hook Form + Zod covers 95% of complex form requirements with minimal re-renders and clean code.", theory: "Large forms have unique React challenges: performance (one state per field = many re-renders), validation complexity, and conditional field logic. React Hook Form (RHF) takes an uncontrolled approach — it only re-renders the specific field that changed. Zod provides type-safe schema validation integrated with RHF." },
      { tag: "SCENARIO", q: "Your React app loads fine on desktop but scores 45/100 on mobile Lighthouse. Users complain about slow interactions. You have 3 days to improve it. What do you do in priority order?", a: "In 3 days, focus on highest-impact changes first:\n\nDay 1 — Eliminate render-blocking and reduce bundle:\n1. Run Lighthouse and identify the top 3 opportunities (usually: unused JavaScript, render-blocking resources, large network payloads)\n2. Implement route-based code splitting with React.lazy — biggest single win, can cut initial JS by 50-70%\n3. Replace moment.js with date-fns, full lodash with named imports\n4. Enable gzip/Brotli on the server if not already active\n\nDay 2 — Fix interaction and layout performance:\n5. Find and fix layout shifts (CLS): add explicit width/height to images, avoid injecting content above existing content\n6. Defer non-critical third-party scripts (analytics, chat widgets) with <script defer> or dynamic import\n7. Add resource hints: <link rel='preconnect'> for critical third-party domains (fonts, CDN)\n8. Fix the LCP element: ensure the hero image has fetchpriority='high' and is not lazy-loaded\n\nDay 3 — Polish and measure:\n9. Audit with React DevTools Profiler — fix any components with expensive renders\n10. Add virtualization to any long lists (react-window)\n11. Test on a real mid-range Android device (Lighthouse lab conditions don't capture real-world jank)\n12. Set up a performance budget so the score doesn't regress\n\nExpected result: 45 → 70+ is achievable in 3 days with code splitting and image/font fixes alone.", theory: "Mobile performance requires different optimization strategies than desktop. Bundle size matters more (slower networks), JavaScript parsing is slower (less CPU), and images consume more bandwidth. Lighthouse identifies specific bottlenecks. Code splitting, image optimization, and reduced JavaScript are the highest-impact improvements." },
      { tag: "SCENARIO", q: "A React component is fetching data and you need to implement optimistic updates — show the updated UI immediately before the server confirms the change. How do you implement this for a 'like' button?", a: "Optimistic updates improve perceived performance — the UI feels instant even on slow connections.\n\nPattern:\n1. Update UI state immediately (optimistic)\n2. Fire the API call in background\n3. If success → confirm (nothing to do, UI is already correct)\n4. If failure → rollback to previous state\n\nImplementation:\nfunction LikeButton({ postId, initialLiked, initialCount }) {\n  const [liked, setLiked]   = useState(initialLiked);\n  const [count, setCount]   = useState(initialCount);\n  const [loading, setLoading] = useState(false);\n\n  const handleLike = async () => {\n    // 1. Save current state for rollback\n    const prevLiked = liked;\n    const prevCount = count;\n\n    // 2. Optimistic update — instant UI feedback\n    setLiked(!prevLiked);\n    setCount(c => prevLiked ? c - 1 : c + 1);\n\n    try {\n      setLoading(true);\n      // 3. Background API call\n      await toggleLike(postId, !prevLiked);\n      // 4. Success — UI already shows correct state, nothing to do\n    } catch (err) {\n      // 5. Rollback on failure — restore previous state\n      setLiked(prevLiked);\n      setCount(prevCount);\n      toast.error('Failed to update like. Please try again.');\n    } finally {\n      setLoading(false);\n    }\n  };\n\n  return (\n    <button onClick={handleLike} disabled={loading}>\n      {liked ? '❤️' : '🤍'} {count}\n    </button>\n  );\n}\n\nWith React Query: useMutation has built-in onMutate (optimistic), onError (rollback), onSettled hooks — handles this pattern even more cleanly.", theory: "Optimistic updates show the expected result immediately before server confirmation. The UI responds instantly (better UX), but must handle failures by rolling back. The pattern: save current state, apply optimistic change, fire API call, rollback on failure. React Query's useMutation provides onMutate, onError, and onSettled hooks for this pattern." },
      { tag: "HARD", q: "Your team is migrating a large class component codebase to functional components with Hooks. What is your migration strategy and what are the tricky parts?", a: "Migration strategy — incremental, never big-bang rewrite:\n\n1. Prioritize: migrate components that are actively being modified, not stable untouched ones. Migrating for its own sake creates risk without benefit.\n\n2. Component-by-component approach:\n   - Start with leaf components (no children to worry about)\n   - Move upward through the tree\n   - Keep the public interface (props) identical during migration\n\n3. Mechanical mapping of class features to hooks:\n   - this.state / setState → useState (one call per logical state group)\n   - componentDidMount → useEffect(() => {}, [])\n   - componentDidUpdate → useEffect(() => {}, [deps])\n   - componentWillUnmount → return cleanup from useEffect\n   - shouldComponentUpdate → React.memo\n   - getDerivedStateFromProps → useMemo or useEffect with state update\n\n4. Tricky parts:\n\n   a) getDerivedStateFromProps is the hardest to migrate — it runs on every render. In functional components, calculate the derived value inline or with useMemo instead of storing it in state.\n\n   b) this.setState batching: class setState batches calls in event handlers. Functional useState behaves the same in React 18, but pre-18 there were differences.\n\n   c) Instance variables (this.myVar): replace with useRef. Important: unlike state, changing a ref doesn't cause re-render.\n\n   d) Error Boundaries: still must be class components. Keep ErrorBoundary as class, wrap functional trees inside it.\n\n   e) getSnapshotBeforeUpdate: rare but tricky — no Hook equivalent. If you use it, keep that component as a class.\n\n5. Use the eslint-plugin-react-hooks rule (exhaustive-deps) from day one — it will catch stale closure bugs before they ship.", theory: "Class-to-hooks migration should be incremental, not a big-bang rewrite. Each class lifecycle method maps to a Hook: componentDidMount → useEffect([]), componentDidUpdate → useEffect([deps]), componentWillUnmount → useEffect cleanup. The hardest parts: getDerivedStateFromProps (derive in render instead) and instance variables (use useRef)." },
      { tag: "SCENARIO", q: "You've been asked to build a React component that auto-saves a user's form input to the server every 30 seconds AND when the user navigates away. How do you implement this without data loss?", a: "Auto-save requires combining several patterns:\n\n1. 30-second interval save:\nuseEffect(() => {\n  const interval = setInterval(() => {\n    if (isDirty) saveToServer(formData); // only save if data changed\n  }, 30000);\n  return () => clearInterval(interval); // cleanup prevents memory leak\n}, [formData, isDirty]);\n\n2. Save on navigate away (beforeunload):\nuseEffect(() => {\n  const handleBeforeUnload = (e) => {\n    if (isDirty) {\n      saveToServer(formData); // fire-and-forget (browser may cancel in-flight requests)\n      e.preventDefault();\n      e.returnValue = ''; // shows browser's 'leave page?' dialog\n    }\n  };\n  window.addEventListener('beforeunload', handleBeforeUnload);\n  return () => window.removeEventListener('beforeunload', handleBeforeUnload);\n}, [formData, isDirty]);\n\n3. Save on React Router navigate (in-app navigation):\nuseEffect(() => {\n  // React Router v6 useBlocker or prompt\n  return () => { if (isDirty) saveToServer(formData); }; // cleanup fires on unmount\n}, [formData, isDirty]);\n\n4. isDirty tracking: compare current form state to last saved state. Only auto-save when something actually changed — saves unnecessary API calls.\n\n5. Debounce + save on typing pause (optional UX improvement): also save 2 seconds after the user stops typing — more responsive than waiting 30 seconds.\n\n6. Visual feedback: show 'Saving...' / 'Saved ✓' / 'Save failed ✗' status — users need to know their data is safe.\n\n7. useRef for latest formData in interval: the setInterval callback captures formData at creation time (stale closure). Use a ref that's updated every render:\nconst formDataRef = useRef(formData);\nuseEffect(() => { formDataRef.current = formData; }, [formData]);\n// interval reads formDataRef.current instead of formData", theory: "Auto-save combines debouncing (delay saves until typing pauses) with beforeunload handling (save when navigating away). The key technical challenge is avoiding save on initial mount (only save changes) and handling concurrent saves when the user types again before a save completes." },
      { tag: "SCENARIO", q: "Your React app has a table with 10,000 rows. Rendering all of them freezes the browser for 3 seconds. How do you fix this?", a: "Rendering 10,000 DOM nodes is the problem — browser layout and paint cost scales with DOM size. Solution: virtualization (only render what's visible).\n\n1. react-window (lightweight, fast):\nimport { FixedSizeList } from 'react-window';\n\nfunction VirtualTable({ data }) {\n  const Row = ({ index, style }) => (\n    // IMPORTANT: 'style' must be applied — it contains the positioning that makes virtualization work\n    <div style={style} className='row'>\n      {data[index].name} | {data[index].email}\n    </div>\n  );\n\n  return (\n    <FixedSizeList\n      height={600}       // visible window height in px\n      itemCount={data.length}  // total items (10,000)\n      itemSize={48}      // height of each row in px\n      width='100%'\n    >\n      {Row}\n    </FixedSizeList>\n  );\n}\n\nHow virtualization works: Only renders ~15-20 rows (the visible ones + overscan buffer). As user scrolls, rows outside the viewport are unmounted and new ones mount. The DOM always has ~20 nodes, never 10,000.\n\n2. @tanstack/virtual (more flexible, no fixed height requirement).\n\n3. Pagination as alternative: if data naturally paginates (search results, admin tables), paginate server-side and fetch 20 items at a time. Simpler than virtualization.\n\n4. Also check:\n   - Are you recalculating/sorting the 10,000 items on every render? Wrap in useMemo.\n   - Are child rows re-rendering unnecessarily? Wrap with React.memo.\n   - Is the initial data fetch slow? That's a network problem, not a rendering problem.\n\n5. The 'style' prop from react-window is critical — it sets position: absolute with top/left values. Without applying it, all rows stack at position 0.", theory: "Rendering 10,000 DOM nodes overwhelms the browser. Virtualization (windowing) renders only visible rows plus a small buffer. react-window (lightweight) and react-virtual (more features) calculate which rows are visible based on scroll position and container size, creating/destroying DOM nodes as the user scrolls." },
      { tag: "SCENARIO", q: "You inherit a React codebase with no tests. The team wants to add testing but doesn't know where to start. How do you introduce testing incrementally?", a: "Strategy: add tests incrementally without stopping feature development.\n\n1. Set up the tooling first (1 day):\n   - React Testing Library + Jest (comes with Create React App/Vite)\n   - @testing-library/user-event for simulating user interactions\n   - Mock Service Worker (MSW) for mocking API calls\n\n2. Start with utility functions (easiest wins):\n   - Pure functions (validators, formatters, calculators) are trivial to test\n   - No React knowledge needed, just JavaScript\n   - High confidence, low effort\n\n3. Test new code as you write it (stop the bleeding):\n   - Every new component gets at least a smoke test (does it render without crashing?)\n   - Normalize: PR shouldn't be merged without a test for the new behavior\n\n4. Write tests when fixing bugs:\n   - Bug fixed = write a test that would have caught it\n   - This prevents regressions and builds coverage around fragile areas\n\n5. High-value targets for existing components:\n   - User flows: login form, checkout flow, form submission\n   - Components with complex conditional logic\n   - Components that have broken in the past\n\n6. Testing Library philosophy — test behavior, not implementation:\n   // ✗ Bad: testing implementation\n   expect(component.state.isOpen).toBe(true);\n   // ✓ Good: testing behavior\n   expect(screen.getByRole('dialog')).toBeInTheDocument();\n\n7. Don't aim for 100% coverage immediately — aim for coverage of critical user paths. 40% meaningful coverage > 80% trivial coverage (testing that buttons render).", theory: "Testing legacy codebases requires a pragmatic strategy: test new code as you write it, add tests when fixing bugs (regression prevention), and prioritize testing critical user paths. React Testing Library encourages testing behavior (what the user sees and does) rather than implementation details (state, component internals)." }
    ]
  },
  "Node.js": {
    Beginner: [
      { q: "What is Node.js?", a: "Node.js is a runtime environment that lets you run JavaScript on the server side. It's built on Chrome's V8 JavaScript engine and uses a non-blocking, event-driven I/O model, making it efficient and suitable for scalable network applications.", theory: "Node.js is a JavaScript runtime built on Chrome's V8 engine that enables JavaScript execution outside the browser. It uses an event-driven, non-blocking I/O model — a single thread handles many concurrent operations by offloading I/O to the operating system and processing results via event callbacks. It's ideal for I/O-bound workloads, not CPU-intensive tasks." },
      { q: "What is the event loop in Node.js?", a: "The event loop is the mechanism that allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded. It offloads operations to the system kernel when possible, and when they complete, pushes callbacks onto the queue to be executed.", theory: "Node.js's event loop is the mechanism that handles asynchronous operations on a single thread. It has phases: timers (setTimeout/setInterval), pending callbacks, idle/prepare, poll (I/O), check (setImmediate), and close callbacks. Each phase has a FIFO queue of callbacks to execute. Between phases, Node checks for microtasks (Promises)." },
      { q: "What is the difference between require() and import?", a: "require() is the CommonJS (CJS) module system — synchronous, dynamic. import is the ES Module (ESM) syntax — static, asynchronous, allows tree-shaking. Node.js supports both, but ESM requires .mjs files or \"type\": \"module\" in package.json.", theory: "require() is CommonJS — synchronous, dynamic, and the Node.js default. import is ES modules — static analysis at parse time, async loading, and the modern standard. ES modules enable tree shaking (dead code elimination) because import/export are statically analyzable. Node.js supports both but they can't be mixed in the same file." },
      { q: "What is npm and what is package.json?", a: "npm (Node Package Manager) is the default package manager for Node.js. package.json is a manifest file describing the project: name, version, scripts, dependencies, and devDependencies. package-lock.json locks exact dependency versions for reproducible installs.", theory: "npm is Node's package manager and the world's largest software registry. package.json describes the project: name, version, scripts, and dependencies with version ranges. npm install resolves the dependency tree, downloads packages, and writes exact versions to package-lock.json. Scripts (npm run start, npm test) automate common tasks." },
      { q: "What is Express.js?", a: "Express.js is a minimal, unopinionated web framework for Node.js. It simplifies building web servers and REST APIs by providing routing, middleware support, and HTTP utility methods. It's the most popular Node.js framework.", theory: "Express.js is built on Node.js's http module, providing a thin abstraction layer. It follows the middleware pattern — a pipeline of functions that process each request sequentially. Express itself has no opinion on database, template engine, or code structure, making it highly flexible." },
      { q: "What are callbacks in Node.js?", a: "A callback is a function passed as an argument to another function, executed after an async operation completes. Node.js uses the error-first callback pattern: (err, result) => {}. Overuse leads to 'callback hell', which Promises and async/await solve.", theory: "Callbacks are the original async pattern in Node.js — functions passed as arguments that are called when an async operation completes. Node uses error-first callback convention (function(err, result)) — the first parameter is always an error object (null if none). Nested callbacks create 'callback hell' — the problem Promises and async/await solved." },
      { q: "What is the difference between synchronous and asynchronous code?", a: "Synchronous code executes line by line, blocking until each operation finishes. Asynchronous code allows other operations to run while waiting (e.g., file reads, DB queries). Node.js is designed around async operations to keep the single thread free and responsive.", theory: "Node.js is single-threaded — synchronous code blocks the event loop for all concurrent requests. Async code (non-blocking I/O, timers, network) is delegated to OS/thread pool and returns to the event loop when complete. Blocking the event loop with CPU-intensive sync operations is Node's primary performance anti-pattern." },
      { q: "What are Node.js streams?", a: "Streams are objects that let you read or write data piece by piece (chunks), rather than loading it all into memory. Types: Readable, Writable, Duplex, Transform. They're ideal for processing large files or network data efficiently without memory overflow.", theory: "Streams process data in chunks (Buffer or string pieces) rather than buffering everything in memory. This enables handling files larger than available RAM and reducing time-to-first-byte for HTTP responses. The pipe() method connects streams and handles backpressure — slowing the producer when the consumer can't keep up." },
      { q: "What is the difference between fs.readFile and fs.createReadStream?", a: "fs.readFile loads the entire file into memory before the callback fires — fine for small files. fs.createReadStream reads the file in chunks as a stream, keeping memory usage constant regardless of file size. For files over a few MB, always prefer streams.", theory: "fs.readFile loads the entire file into memory as a Buffer before callback is called. For large files, this risks memory exhaustion. fs.createReadStream returns a Readable stream that emits chunks — memory usage stays constant regardless of file size. Streams are the right choice for large files or when you need to transform data while reading." },
      { q: "What is the global object in Node.js?", a: "In Node.js, the global object is 'global' (not 'window' like in browsers). It provides built-in globals: setTimeout, setInterval, clearTimeout, process, Buffer, __dirname, __filename, console. Variables declared with var at module level are NOT added to global — each file has its own module scope.", theory: "Node.js's global object is the equivalent of the browser's window. It provides process (program info), __dirname/__filename (current file paths), setTimeout/setInterval, console, and Buffer. Unlike browsers, there's no DOM. The module system (require, module, exports) is automatically available in each file." },
      { q: "What is the Buffer class in Node.js?", a: "Buffer is a built-in class for handling raw binary data — useful when dealing with TCP streams, file I/O, or binary protocols. Unlike strings, Buffers have a fixed size allocated outside the V8 heap. Create with Buffer.from(), Buffer.alloc(), or Buffer.allocUnsafe(). Convert to string with buf.toString('utf8').", theory: "Buffer represents raw binary data — a fixed-size block of memory outside V8's heap. Essential for binary protocols, file I/O, cryptography, and network data where data isn't text. Buffer methods convert between binary data and strings using encodings (utf8, base64, hex). Node 10+ also supports the web standard TextEncoder/TextDecoder." },
      { q: "What is the difference between dependencies and devDependencies in package.json?", a: "dependencies are packages needed at runtime in production (Express, Mongoose, Axios). devDependencies are only needed during development (Jest, ESLint, Nodemon, TypeScript). Install dev-only packages with npm install --save-dev. In production, npm install --production skips devDependencies.", theory: "dependencies are packages required for your application to run in production (Express, mongoose). devDependencies are only needed during development (Jest, ESLint, TypeScript). npm install --production skips devDependencies, creating a smaller production deployment. package-lock.json tracks exact versions of both." },
      { q: "What is nodemon and why do developers use it?", a: "Nodemon is a dev tool that automatically restarts the Node.js server whenever it detects file changes. Without it, you'd have to manually stop and restart after every code change. Install with npm install -D nodemon and use it in your dev script: \"dev\": \"nodemon src/index.js\".", theory: "Nodemon watches the file system for changes and automatically restarts Node.js when source files change. Without it, you'd manually stop/start after every edit — slowing development significantly. It uses fs.watch/inotify under the hood. Configuration in nodemon.json or package.json allows ignoring node_modules and specifying file extensions to watch." },
      { q: "How do you create a basic HTTP server in Node.js without Express?", a: "Use the built-in http module: const http = require('http'); const server = http.createServer((req, res) => { res.writeHead(200, {'Content-Type': 'text/plain'}); res.end('Hello World'); }); server.listen(3000). Express wraps this native http module with a more developer-friendly API.", theory: "Node's http module creates TCP servers speaking HTTP protocol — the foundation Express builds on. http.createServer() accepts a handler called for every request with IncomingMessage (request data) and ServerResponse (response writer). Express adds routing, middleware, and convenience methods on top of these primitive objects." },
      { q: "What is process.env and why is it important?", a: "process.env is an object containing the user environment variables. It's used to store configuration that varies between environments (dev, staging, production) — like DB connection strings, API keys, and port numbers. This prevents hardcoding sensitive data in source code and follows the 12-factor app methodology.", theory: "process.env is an object containing all environment variables inherited from the OS process. It's the standard configuration mechanism separating code from config. Different values per environment (dev/staging/prod) without code changes. dotenv loads .env files into process.env in development. Production environments inject vars through deployment platform." },
      { q: "What is CORS and how do you enable it in Express?", a: "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that blocks web pages from making requests to a different domain than the one that served the page. In Express, install the 'cors' package and use app.use(cors()) to allow all origins, or configure it with options to allow specific origins, methods, and headers.", theory: "CORS is a browser security mechanism enforced by the browser, not the server — servers just declare their policy via response headers. Preflight OPTIONS requests occur for non-simple requests (DELETE, PUT, custom headers) before the actual request. The server must respond with appropriate Access-Control-Allow-* headers." }
    ],
    Intermediate: [
      { q: "What is middleware in Express.js?", a: "Middleware are functions that execute in the request-response cycle with access to req, res, and next(). Used for logging, authentication, parsing bodies, error handling. app.use() registers global middleware; route-specific middleware is passed directly to routes. Order matters — middleware runs top to bottom.", theory: "Middleware implements the Chain of Responsibility design pattern. Each middleware function has access to req, res, and next — it can modify them, end the response, or call next() to delegate to the next handler. The order middleware is registered determines the order it executes for each request." },
      { q: "What is the difference between process.nextTick() and setImmediate()?", a: "process.nextTick() fires before the next iteration of the event loop — after the current operation, before any I/O. setImmediate() fires in the check phase, after I/O events. nextTick has higher priority and can starve I/O if used recursively. Prefer setImmediate for yielding in most cases.", theory: "process.nextTick() queues a callback to run before the event loop moves to the next phase — after the current operation completes but before any I/O. setImmediate() queues a callback for the check phase, after I/O callbacks. nextTick runs first, before Promises. Both are asynchronous but with different scheduling priorities." },
      { q: "How do you handle errors in async/await in Node.js?", a: "Wrap async/await in try/catch: try { const data = await fetchData(); } catch (err) { console.error(err); }. For Express, use an async wrapper or pass errors to next(err) to be caught by error-handling middleware (4-argument function: (err, req, res, next)).", theory: "async/await errors bubble up as rejected Promises. Without try/catch, unhandled rejections either crash Node (newer versions) or produce warnings. try/catch wraps await calls to catch errors synchronously. In Express, caught errors should be passed to next(err) to trigger the error-handling middleware pipeline." },
      { q: "What is clustering in Node.js and why is it used?", a: "Node.js runs on a single thread, not fully utilizing multi-core CPUs. The cluster module forks multiple worker processes (one per CPU core) that share the same port. The master process distributes incoming connections among workers, improving throughput on multi-core machines.", theory: "Node.js is single-threaded — one process can only use one CPU core. Clustering forks multiple worker processes that share the same server port (the OS distributes incoming connections). Each worker is an independent Node process with its own event loop. The master process manages workers, restarting crashed ones. Cluster mode effectively uses all available CPU cores." },
      { q: "What is the difference between PUT and PATCH in REST APIs?", a: "PUT replaces the entire resource — missing fields are removed. PATCH partially updates — only specified fields change. PATCH is preferred for partial updates as it's bandwidth-efficient and safer. PUT is idempotent; calling it N times has the same effect as calling it once.", theory: "HTTP PUT replaces the entire resource with the request body. HTTP PATCH partially updates a resource — only the provided fields change. PUT is idempotent (same request always produces same result). PATCH is also typically idempotent but depends on implementation. REST APIs should use PATCH for partial updates to reduce payload size." },
      { q: "What are environment variables and how do you manage them?", a: "Environment variables store config outside code. Access via process.env.VARIABLE_NAME. Use dotenv in development: require('dotenv').config(). In production, set them via CI/CD or container orchestration (Kubernetes secrets, AWS Parameter Store). Never commit .env to version control.", theory: "Environment variables are OS-level key-value pairs that configure applications without hardcoding values in source code. process.env provides read access. dotenv loads .env files in development. Production environments (Heroku, AWS, Kubernetes) inject variables at runtime. The 12-factor app methodology mandates storing config in the environment." },
      { q: "What is JWT and how is it used for authentication?", a: "JSON Web Token is a compact signed token encoding user claims. On login, the server creates a JWT signed with a secret. The client sends it in the Authorization: Bearer header. The server verifies the signature on each request — stateless, no session storage needed. Always use HTTPS, set short expiry (15 min), and use refresh tokens.", theory: "JWT (JSON Web Token) is a compact, self-contained token format: header.payload.signature. The server signs the payload with a secret; clients include the token in requests; servers verify the signature without database lookups (stateless). Short-lived access tokens (15min) limit breach exposure. Refresh tokens enable longer sessions." },
      { q: "How do you prevent SQL injection and common security vulnerabilities?", a: "Use parameterized queries/prepared statements — never concatenate SQL strings. Validate inputs with Joi or express-validator. Use helmet.js for security headers. Rate limit with express-rate-limit. Keep dependencies updated (npm audit). Use HTTPS only. Sanitize MongoDB queries to prevent NoSQL injection with $where.", theory: "SQL injection attacks embed malicious SQL in user input. Parameterized queries (prepared statements) prevent this by separating SQL structure from data — the database treats parameters as literal values, never as SQL code. ORMs like Sequelize/Prisma use parameterized queries by default. Never use string concatenation for SQL queries." },
      { q: "What is the difference between SQL and NoSQL databases, and when do you choose each?", a: "SQL (PostgreSQL, MySQL): relational, strict schema, ACID transactions, great for structured data with complex joins. NoSQL (MongoDB, Redis, DynamoDB): flexible schema, horizontal scaling, specialized data models. Choose SQL for financial/transactional data, complex queries. Choose NoSQL for unstructured data, high-volume writes, key-value caching, or document storage.", theory: "SQL databases use fixed schemas and relational tables with ACID guarantees. NoSQL databases (document, key-value, graph, column-family) use flexible schemas optimized for specific access patterns. SQL excels at complex queries and relationships. NoSQL excels at horizontal scaling, high throughput, and flexible/evolving data structures." },
      { q: "What is connection pooling in databases and why does it matter in Node.js?", a: "Connection pooling maintains a pool of reusable DB connections instead of creating a new connection per request. Creating connections is expensive (TCP handshake, auth, TLS). With connection pooling (pg-pool, Mongoose poolSize, Sequelize pool), connections are checked out, used, and returned to the pool. Without it, a spike in requests can exhaust DB connections and cause timeouts.", theory: "Creating a new database connection per request is expensive (TCP handshake, authentication, memory). A connection pool maintains a set of pre-established connections and reuses them across requests. Pool settings (connectionLimit, acquireTimeout) balance resource usage against response time under concurrent load." },
      { q: "How does Node.js handle concurrency if it's single-threaded?", a: "Node.js uses a single thread for JavaScript execution but offloads blocking I/O to libuv's thread pool (file system, DNS) and to the OS kernel (network I/O via epoll/kqueue). Callbacks for completed I/O are queued and processed by the event loop. This means Node.js handles thousands of concurrent I/O operations with minimal threads — but CPU-bound work blocks the loop.", theory: "Node.js achieves concurrency through the event loop's non-blocking I/O model. While waiting for database queries or network requests, the event loop processes other requests. True parallelism requires cluster module (multiple processes) or Worker Threads (CPU-intensive tasks). Node's model is optimal for I/O-bound workloads." },
      { q: "What are the main differences between Promises and async/await?", a: "async/await is syntactic sugar over Promises — under the hood, an async function returns a Promise. await pauses execution of the async function until the Promise resolves. async/await produces cleaner, more readable code and better stack traces. Promises are still useful for parallel execution (Promise.all), racing (Promise.race), and chaining without async/await.", theory: "Promises and async/await are two syntaxes for the same underlying mechanism. Promises use chaining (.then/.catch); async/await uses linear sequential syntax. async/await makes error handling with try/catch more intuitive. Promises are better for parallel operations (Promise.all) and more complex composition patterns." },
      { q: "What is Express error handling middleware and how is it different from regular middleware?", a: "Error handling middleware has 4 parameters: (err, req, res, next). Express recognizes it by arity. Call next(err) from any middleware/route handler to skip to error middleware. Always define it last in the middleware stack. Use it to format error responses consistently, log errors, and handle different error types (validation, auth, not found).", theory: "Express identifies error handling middleware by its 4-parameter signature. Regular middleware is 3 parameters (req, res, next). Error middleware is 4 parameters (err, req, res, next). When next(err) is called, Express skips all remaining 3-parameter middleware and routes, going directly to 4-parameter error handlers." },
      { q: "What is the purpose of the package-lock.json file?", a: "package-lock.json records the exact version of every installed package and its dependencies — a deterministic snapshot of the dependency tree. This ensures everyone on the team and CI/CD installs identical versions, preventing 'works on my machine' bugs caused by package updates. Always commit it to version control. Use npm ci in CI for clean installs from lock file.", theory: "package-lock.json ensures deterministic installs — the same dependency tree every time, on every machine. package.json specifies version ranges (^1.2.0 = 1.x.x); package-lock.json records the exact version actually installed (1.2.3). This prevents 'works on my machine' problems from different dependency versions." },
      { q: "What is event-driven architecture and how does Node.js implement it with EventEmitter?", a: "Event-driven architecture decouples producers from consumers — components emit named events, and listeners react to them. Node.js's EventEmitter class is the foundation: emitter.on('data', handler) registers a listener; emitter.emit('data', payload) fires it. Many built-in Node.js objects (streams, http.Server, process) extend EventEmitter. It enables loosely coupled, reactive systems.", theory: "Event-driven architecture decouples producers and consumers of events. Instead of direct function calls (tight coupling), components emit events that any interested subscriber can handle. Node's EventEmitter is the foundation — most Node APIs (streams, HTTP server, child processes) are EventEmitters. This pattern scales naturally to async and distributed systems." },
      { q: "How do you implement caching in a Node.js API?", a: "Caching layers: 1) In-memory (node-cache, Map) — fastest, lost on restart, limited to single process. 2) Redis — distributed cache surviving restarts, shareable across multiple instances, supports TTL, lists, hashes. 3) HTTP caching — set Cache-Control headers so clients/CDNs cache responses. Strategy: cache DB query results with a key based on query params, invalidate on data mutation, set appropriate TTLs.", theory: "Caching stores computed results for fast retrieval, trading memory for CPU/DB load. The cache-aside pattern checks cache first, falls back to the source, then populates cache. TTL (time-to-live) prevents stale data. Redis is preferred for production: it survives restarts, can be shared across processes, and supports advanced data structures." }
    ],
    "Advanced & Scenario": [
      { tag: "SCENARIO", q: "Your Node.js API handles 10,000 req/min normally, but every night at 2am during a batch job, response times spike from 50ms to 8 seconds. How do you diagnose and fix this?", a: "This is event loop starvation caused by the batch job:\n\n1. Diagnose: Use clinic.js (clinic doctor) or 0x to profile during the spike. Check event loop lag with perf_hooks: performance.eventLoopUtilization(). Identify if the batch job is doing heavy synchronous computation (JSON.parse on large payloads, heavy sorting) that blocks the single thread.\n\n2. If CPU-bound: Move to a Worker Thread (worker_threads module) so it runs on a separate thread. Or run it in a completely separate Node.js process.\n\n3. If I/O-bound: The batch job may exhaust the DB connection pool, starving API requests. Use a dedicated pool with lower priority.\n\n4. Rate-limit the batch: Process in chunks with setImmediate between iterations to yield control back to the event loop.\n\n5. Long-term: Run batch jobs in a separate service, not the same process as the API server.", theory: "Event loop blocking is the primary Node.js performance failure mode. Synchronous CPU-intensive operations monopolize the single thread. The event loop has phases with different priorities — identifying which phase is saturated guides the fix. Worker Threads offload CPU work; PM2 cluster mode uses all CPU cores for I/O-bound scaling." },
      { tag: "SCENARIO", q: "You need to build a Node.js service that processes 1 million image thumbnails overnight. Images are in S3. How do you architect this for speed, reliability, and cost?", a: "1. Queue-based: Push all 1M jobs into SQS or BullMQ with Redis. Decouples creation from processing, enables retries.\n\n2. Worker pool: Multiple Node.js worker processes (PM2 or containers), each pulling jobs from the queue with controlled concurrency (p-limit to cap at N concurrent downloads).\n\n3. Streaming: Don't download images into memory. s3.getObject().createReadStream() → sharp (Transform stream) → s3.upload() stream. Flat memory footprint regardless of image size.\n\n4. Backpressure: Use pipe() correctly — sharp and streams handle it natively.\n\n5. Idempotency: Track processed IDs in Redis. If worker crashes, job returns to queue without duplication.\n\n6. Cost: Use spot/preemptible instances (70% cheaper, acceptable for restartable jobs). Process in same AWS region as S3.", theory: "Processing large data volumes requires streaming (avoid memory exhaustion), worker pools (parallel CPU processing), and queue systems (handle bursts, retry failures). Bull/BullMQ provides Redis-backed queues with concurrency control, job retries, and progress tracking — essential for reliable background processing at scale." },
      { tag: "HARD", q: "Explain the Node.js event loop phases in order, and describe a scenario where misunderstanding them caused a real bug.", a: "Phases in order:\n1. Timers — setTimeout/setInterval callbacks\n2. Pending callbacks — deferred I/O callbacks\n3. Idle/Prepare — internal\n4. Poll — retrieve new I/O events; blocks here if queue empty\n5. Check — setImmediate callbacks\n6. Close callbacks — socket/handle close events\n\nBetween each phase: nextTick queue and microtask queue (Promises) drain fully.\n\nReal bug: A developer used recursive process.nextTick() to iterate 100,000 records, expecting it to yield between iterations. Instead, nextTick kept refilling its queue before the poll phase ran, starving all I/O. Every HTTP request timed out. Fix: use setImmediate() instead — runs in Check phase, allows I/O between iterations.", theory: "The event loop has 6 phases: timers (setTimeout/setInterval callbacks), pending callbacks (deferred I/O callbacks), idle/prepare (internal), poll (new I/O, blocks if queue empty), check (setImmediate), close callbacks (socket.on('close')). process.nextTick() and Promises (microtasks) run between every phase transition." },
      { tag: "HARD", q: "How would you design a rate limiter for a Node.js API running 10 pods in Kubernetes without a centralized bottleneck?", a: "Per-process in-memory won't work across pods. Options:\n\n1. Redis sliding window (recommended): Lua script for atomic INCR + expiry. rate-limiter-flexible implements this. Redis handles ~100k ops/sec — not a bottleneck for typical APIs.\n\n2. Token bucket in Redis: Atomic Lua script refills tokens proportionally to elapsed time, tries to consume one.\n\n3. Approximate local + global: Each pod tracks locally, syncs with Redis every N seconds. Slightly over-allows near limits but reduces Redis load — good for non-strict limits.\n\n4. API Gateway level: Offload to Nginx, Kong, or AWS API Gateway before hitting Node.js. Cleanest separation.\n\nKey details: INCR is O(1) and atomic. Set Redis key TTL to auto-clean. Decide fail-open vs fail-closed when Redis is unavailable.", theory: "Distributed rate limiting requires shared state across all instances. Redis atomic operations (INCR + EXPIRE) provide consistent counting across pods. The sliding window algorithm (sorted set of timestamps) is more accurate than fixed window. Token bucket (replenish at constant rate) handles burst traffic better than strict request limits." },
      { tag: "SCENARIO", q: "A user can still access protected routes for 24 hours after logging out of your JWT app. How do you fix JWT revocation without rebuilding to sessions?", a: "JWTs are stateless — logout just deletes the token client-side, but it remains server-valid until expiry. Solutions:\n\n1. Token blocklist (recommended): On logout, store the token's jti (JWT ID) in Redis with TTL matching remaining expiry. Check jti on every request. Redis lookup is O(1) and sub-millisecond.\n\n2. Short-lived access + refresh tokens: Issue 15-min access tokens. Long-lived refresh token stored server-side. On logout, delete the refresh token. Max 15-min residual access.\n\n3. Token versioning: Store tokenVersion per user in DB. Include in JWT payload. On logout, increment tokenVersion. Middleware rejects version-mismatched tokens — invalidates all user sessions at once.\n\nBest practice: combine short expiry + refresh token rotation + blocklist for high-security apps.", theory: "JWT revocation is the fundamental stateless JWT challenge — you can't 'un-sign' a token. Solutions require server-side state: token blocklist in Redis (check each request), short expiry with refresh token rotation, or using opaque tokens with a lookup table. Each approach trades some statelessness for revocability." },
      { tag: "HARD", q: "What is backpressure in Node.js streams and how do you handle it? Describe the mental model.", a: "Backpressure occurs when a Writable can't process data as fast as a Readable produces it. Without handling it, data accumulates in memory — potential crash.\n\nMental model: fast tap → filter tank → slow drain. If drain is slow, the tank overflows.\n\nHow it works: writable.write() returns false when the internal buffer exceeds highWaterMark. The Readable should stop push()ing. Resume when Writable emits 'drain'.\n\nUsing pipe() (recommended): readable.pipe(transform).pipe(writable) handles backpressure automatically.\n\nUsing async iteration (modern): for await (const chunk of readable) { await writable.write(chunk) } — clean syntax, respects backpressure.\n\nCommon mistake: manually reading/writing in a loop without checking write()'s return value — buffers gigabytes in memory. Always use pipe() or pipeline().", theory: "Backpressure occurs when a writable stream can't consume data as fast as a readable produces it. Without backpressure handling, data accumulates in memory. pipe() handles it automatically: it pauses the readable when the writable's internal buffer is full and resumes when the buffer drains. Manual stream handling requires checking write() return value." },
      { tag: "SCENARIO", q: "Your Node.js service calls 4 external APIs sequentially, taking 1.8s. Product wants it under 600ms. How do you restructure?", a: "Sequential calls are the bottleneck — each needlessly awaits the previous.\n\n1. Promise.all for independent calls: const [a, b, c, d] = await Promise.all([fetchA(), fetchB(), fetchC(), fetchD()]). Total time ≈ max(400, 500, 450, 450) = 500ms.\n\n2. Handle partial failures: Promise.allSettled() for partial results — check each result.status, degrade gracefully for failures.\n\n3. Dependency layers: Group calls by dependencies. A and B independent → parallel. C needs A's result → await after A resolves. Build a dependency graph.\n\n4. Timeouts: Wrap each fetch in Promise.race with a timeout. Fail fast, return cached/default for slow services.\n\n5. Caching: If any API returns static-ish data, cache in Redis with TTL. Eliminate the network call entirely for most requests.", theory: "Sequential async calls have latency = sum of all individual latencies. Independent requests should run in parallel with Promise.all(). Dependent requests must remain sequential. Circuit breakers prevent cascading failures. Timeouts prevent hanging indefinitely. Promise.allSettled() collects all results even if some fail." },
      { tag: "HARD", q: "What are Worker Threads in Node.js, when to use them vs child_process, and what are their limitations?", a: "Worker Threads (worker_threads, stable since Node 12) run JS in parallel threads sharing memory via SharedArrayBuffer.\n\nUse Worker Threads when: you have CPU-intensive JavaScript (image processing, encryption, ML inference) blocking the event loop. Workers share process memory — startup is fast (~1ms vs ~30ms for child processes).\n\nUse child_process when: running separate programs (Python scripts, shell commands), needing process isolation for security, or running non-JS code.\n\nLimitations:\n- Can't share arbitrary objects — only transferable objects (ArrayBuffer) or structured-cloneable data\n- Each worker has its own libuv thread pool\n- Debugging is harder — separate V8 contexts\n- Large object passing still involves serialization unless using SharedArrayBuffer\n\nPattern: Use a thread pool (Piscina library) rather than spawning workers per-request — amortizes startup cost.", theory: "Worker Threads run JavaScript in parallel OS threads sharing memory via SharedArrayBuffer and Atomics. Unlike child_process (separate memory, IPC overhead), Workers can share data efficiently. Use Workers for CPU-intensive tasks (image processing, encryption, compression) that would block the event loop. The main thread stays responsive while Workers crunch data." },
      { tag: "SCENARIO", q: "Your Node.js app has a memory leak in production. Memory grows from 200MB to 2GB over 48 hours before it crashes. How do you find and fix it?", a: "Memory leaks are usually: growing closures, uncleaned event listeners, global accumulation, or caches with no eviction.\n\n1. Confirm: Monitor process.memoryUsage().heapUsed over time. Monotonically increasing heap = leak.\n\n2. Heap snapshots: Use Chrome DevTools via --inspect or heapdump package. Take 3 snapshots: baseline, after load, after time. Compare in DevTools 'Comparison' view — look for objects that keep growing.\n\n3. Common culprits:\n- Event listeners never removed (emitter.on without off in cleanup)\n- Closures capturing large objects in global arrays\n- Growing in-memory caches with no eviction (use LRU-cache with max size)\n- Timers/intervals never cleared\n- Promises that never resolve, keeping closure chain alive\n\n4. Fix: remove listeners in cleanup, add LRU eviction, audit global state, use WeakMap for object-keyed caches.\n\n5. Prevention: Load test with autocannon + track heap; set --max-old-space-size to crash fast in dev.", theory: "Memory leaks in Node.js are always caused by unintended object retention — something holds a reference to objects that should be garbage collected. Common sources: closures capturing large objects, EventEmitter listeners never removed, growing in-memory caches without eviction, and global variables accumulating data. Heap snapshots before/after identify growing object types." },
      { tag: "HARD", q: "Explain how you would implement a robust job queue system in Node.js for processing background tasks like sending emails and resizing images.", a: "Requirements: reliability (no lost jobs), scalability, retry logic, priority, monitoring.\n\n1. BullMQ (recommended): Built on Redis. Supports priorities, delayed jobs, retries with backoff, rate limiting, job progress, and Bull Board dashboard. Producer: queue.add('sendEmail', { to, subject }). Worker: worker.process(async job => sendEmail(job.data)).\n\n2. Job states: waiting → active → completed/failed. Failed jobs auto-retry with exponential backoff. Dead letter queue for exhausted retries.\n\n3. Concurrency: Each worker processes N jobs concurrently. Run multiple worker processes for horizontal scaling.\n\n4. Idempotency: Each job should be safe to retry. Use job IDs to detect duplicate processing.\n\n5. Monitoring: Bull Board for visibility. Alert on queue depth growing. Track job duration percentiles.\n\n6. Graceful shutdown: On SIGTERM, stop accepting jobs, let active jobs finish with timeout, then exit. Unfinished jobs return to queue automatically.", theory: "Job queues handle work that's too slow for the request/response cycle. BullMQ provides Redis-backed queues with Workers for processing. Key features: job prioritization, retry with exponential backoff, rate limiting, job events for monitoring, dead letter queues for failed jobs, and Bull Board for visibility. Redis persistence ensures jobs survive restarts." },
      { tag: "SCENARIO", q: "You need to design a Node.js API that must handle 100,000 concurrent WebSocket connections for a live sports scores app. How do you architect this?", a: "Key challenge: 100k connections exceeds what a single Node.js process handles efficiently.\n\n1. Horizontal scaling: Multiple Node.js instances behind a load balancer. Use sticky sessions OR a pub/sub model so any instance can push to any client.\n\n2. Pub/Sub with Redis: When scores update, publish to a Redis channel. All Node.js instances subscribe and push to their connected clients. Decouples update source from connection holders.\n\n3. WebSocket library: Use ws (low-level, performant) or Socket.io (higher-level, rooms). For 100k connections, ws is leaner.\n\n4. Efficient broadcasting: Group clients by room (sport, match ID). One Redis publish → all instances push only to clients in that room.\n\n5. Resource limits: Tune OS limits (ulimit -n) and Node.js max sockets. Use a load balancer that supports WebSocket upgrade (Nginx or AWS ALB).\n\n6. Heartbeat/cleanup: Ping clients every 30s. Dead connections that don't respond are cleaned up to free resources.", theory: "WebSocket connections maintain persistent TCP connections — each consuming file descriptors and memory. The key insight: Node.js can handle 100k+ connections in one process because connections are mostly idle. Challenges: memory per connection (keep minimal), missed messages (acknowledge protocol), broadcasting efficiency (don't send to all for targeted messages)." },
      { tag: "SCENARIO", q: "Your Node.js API is returning incorrect or stale data intermittently. Some users see yesterday's prices on a product page. You suspect a caching bug. How do you investigate and fix it?", a: "Stale data with caching is a cache invalidation problem — famously one of the two hardest problems in CS.\n\n1. Map the caching layers: identify every cache in the request path:\n   - Browser cache (Cache-Control headers)\n   - CDN/reverse proxy cache (Nginx, CloudFront)\n   - Application-level Redis/in-memory cache\n   - Database query cache\n\n2. Verify which layer is serving stale data:\n   - Add Cache-Control: no-store to the API response temporarily and see if the problem disappears → CDN/browser was caching\n   - Add a X-Cache-Hit: true header when serving from Redis. Check if stale responses have this header → app-level cache is the culprit\n   - Check Redis directly: redis-cli GET product:123 and compare the cached value to what the DB has\n\n3. Common cache invalidation bugs:\n   - Cache key too broad: caching product:all means a price change on one product doesn't invalidate the cache\n   - Missing TTL: cache never expires, serves data from days ago\n   - Race condition: two servers update the same cache key simultaneously, one wins with wrong data\n   - Forget to invalidate on write: price is updated in DB but Redis cache key isn't deleted\n\n4. Fix pattern — Cache-Aside with explicit invalidation:\n   // On read:\n   const cached = await redis.get('product:' + id);\n   if (cached) return JSON.parse(cached);\n   const data = await db.findProduct(id);\n   await redis.setex('product:' + id, 300, JSON.stringify(data)); // TTL: 5 min\n   return data;\n   \n   // On write (price update):\n   await db.updateProduct(id, { price });\n   await redis.del('product:' + id); // invalidate immediately\n\n5. Set appropriate TTLs: product prices → short TTL (1-5 min). Static content → long TTL. Never-stale data → no cache.\n\n6. Add cache version/tag system for bulk invalidation: if prices update often, use a cache tag so one operation can invalidate all price-related keys.", theory: "Stale cache data indicates a cache invalidation problem. Cache entries outlive their source data validity. Common causes: TTL too long, cache not invalidated on writes, race conditions between updates and cache population. Solutions: write-through caching (update cache on every write), cache-aside with shorter TTLs, or event-driven invalidation." },
      { tag: "SCENARIO", q: "You need to build a Node.js microservice that sends 50,000 welcome emails per day to new users. Emails must be delivered reliably — none lost even if the service crashes. How do you architect this?", a: "Key requirements: reliability (no lost emails), scalability (50k/day = ~35/min, manageable), fault tolerance.\n\n1. Never send emails synchronously in the request handler:\n   // ✗ Bad: user waits for email to send before seeing success\n   app.post('/register', async (req, res) => {\n     await db.createUser(req.body);\n     await sendEmail(user.email); // blocks response, fails = lost email\n     res.json({ success: true });\n   });\n\n2. Queue-based architecture with BullMQ:\n   // ✓ Good: enqueue job immediately, process async\n   app.post('/register', async (req, res) => {\n     const user = await db.createUser(req.body);\n     await emailQueue.add('welcome', { userId: user.id, email: user.email });\n     res.json({ success: true }); // responds immediately\n   });\n   \n   // Separate worker process:\n   const worker = new Worker('emailQueue', async (job) => {\n     await sendWelcomeEmail(job.data.email);\n   }, { concurrency: 10 }); // 10 concurrent emails\n\n3. Reliability guarantees:\n   - BullMQ jobs persist in Redis — survive server crashes\n   - Failed jobs auto-retry with exponential backoff (1s → 2s → 4s → ...)\n   - Dead letter queue for jobs that fail after all retries → alert team\n   - Idempotency: store emailJobId in DB, check before sending to prevent duplicate emails on retry\n\n4. Email provider: use Resend, SendGrid, or AWS SES — don't run your own SMTP server. They handle deliverability, bounce handling, spam compliance.\n\n5. Rate limiting: providers have sending limits. BullMQ's rate limiter keeps sends within provider limits.\n\n6. Monitoring: track queue depth, failed job count, delivery rate. Alert if queue grows unexpectedly (worker crashed).", theory: "Sending 50k emails synchronously in one request would timeout and fail. The pattern: write job to queue immediately (fast HTTP response), process queue in background workers at safe rate. Bull/BullMQ handles job persistence, retry on transient failures, rate limiting, and monitoring. Email providers (SendGrid, SES) have per-second rate limits requiring throttling." },
      { tag: "SCENARIO", q: "A critical security audit finds that your Node.js API has several vulnerabilities. They list: SQL injection risk, broken authentication, sensitive data exposure, and missing rate limiting. Walk through how you fix each one.", a: "Addressing each OWASP vulnerability systematically:\n\n1. SQL Injection → Parameterized queries:\n   // ✗ Vulnerable:\n   const query = 'SELECT * FROM users WHERE email = ' + req.body.email;\n   // ✓ Fixed (with pg):\n   const result = await pool.query('SELECT * FROM users WHERE email = $1', [req.body.email]);\n   // ✓ With Mongoose: use query objects, never string concatenation\n\n2. Broken Authentication → Multiple fixes:\n   - Passwords: bcrypt hash with cost factor ≥ 10 (never md5, sha1, or plain text)\n   - JWT: short expiry (15 min access token) + refresh token rotation\n   - Block enumeration: same error message for wrong email AND wrong password\n   - Implement account lockout after N failed attempts\n   - Require strong passwords (min 8 chars, complexity)\n\n3. Sensitive Data Exposure → Data hygiene:\n   - Never log passwords, tokens, credit card numbers, SSNs — use a log scrubber\n   - Remove sensitive fields from API responses: toJSON() override in Mongoose to exclude passwordHash\n   - HTTPS everywhere — redirect HTTP to HTTPS, set HSTS header\n   - Encrypt sensitive DB fields (PII) at rest using AES-256\n   - Set secure cookie flags: httpOnly (no JS access), secure (HTTPS only), sameSite: 'strict'\n\n4. Missing Rate Limiting → express-rate-limit:\n   const limiter = rateLimit({ windowMs: 15*60*1000, max: 100 });\n   app.use('/api/', limiter);\n   // Stricter limits on auth endpoints:\n   const authLimiter = rateLimit({ windowMs: 15*60*1000, max: 10 });\n   app.use('/api/auth/', authLimiter);\n\n5. Additional hardening with helmet.js:\n   app.use(helmet()); // Sets 12 security headers at once:\n   // X-Frame-Options, X-Content-Type-Options, HSTS, CSP, etc.\n\n6. Keep dependencies patched: npm audit weekly, enable Dependabot for automated PRs.", theory: "Security audits typically find: injection vulnerabilities (SQL/NoSQL injection, XSS), broken authentication (weak JWTs, missing expiry), missing security headers, excessive data exposure, missing rate limiting. OWASP Top 10 is the standard checklist. Fixes combine validation libraries, parameterized queries, helmet.js, and proper secret management." },
      { tag: "SCENARIO", q: "Your Node.js app connects to a PostgreSQL database. During a traffic spike, you start seeing 'connection pool exhausted' errors. The app returns 500s to users. How do you diagnose and fix this?", a: "Connection pool exhaustion means all DB connections are in use and new requests can't get one.\n\n1. Immediate diagnosis:\n   - Check pg-pool metrics: pool.totalCount, pool.idleCount, pool.waitingCount\n   - Look for slow queries: SELECT pid, state, wait_event, query, query_start FROM pg_stat_activity ORDER BY query_start;\n   - Check for connections that have been running for minutes — those are blocking the pool\n\n2. Identify the root cause:\n   a) Slow queries holding connections too long: one query taking 30s holds a connection for 30s. Fix the query (add index, optimize joins).\n   b) Pool size too small: default pg-pool size is 10. A Node cluster with 4 workers = effectively 40 connections needed.\n   c) Connection leak: code creates connections but never releases them (missing pool.release() in error paths).\n   d) Sudden traffic spike: legitimate load increase — scale horizontally.\n\n3. Immediate fix — increase pool size (carefully):\n   const pool = new Pool({ max: 20, idleTimeoutMillis: 30000, connectionTimeoutMillis: 2000 });\n   // connectionTimeoutMillis: 2000 → fail fast if no connection available in 2s\n   // Better to return a fast error than hang for 30s\n\n4. Fix connection leaks:\n   // ✗ Leak: if an error occurs before release(), connection is never returned\n   const client = await pool.connect();\n   const result = await client.query(sql); // error here leaks the connection\n   client.release();\n   \n   // ✓ Fixed: try/finally guarantees release even on error\n   const client = await pool.connect();\n   try { return await client.query(sql); }\n   finally { client.release(); }\n\n5. Add circuit breaker: if DB is overwhelmed, fail fast for a cooldown period instead of queuing thousands of requests.\n\n6. Long-term: add a connection pool proxy like PgBouncer between app and DB — it multiplexes thousands of app connections into a smaller pool of real DB connections.", theory: "Connection pool exhaustion causes all requests to queue waiting for a free connection. Pool size should be tuned to database capacity (max_connections / number of app instances). pg-pool provides connection pooling with acquire timeout. Connection monitoring (idle connections, wait time) guides pool sizing. Prepared statements reduce per-query overhead." },
      { tag: "SCENARIO", q: "You've deployed a Node.js API and users report intermittent 502 errors. Your monitoring shows the Node.js process is crashing and restarting every few hours. How do you find the cause and make the app resilient?", a: "A process that crashes periodically suggests an unhandled exception or unhandled promise rejection.\n\n1. Find the crash cause — check logs immediately:\n   - PM2: pm2 logs (shows crash reason)\n   - Docker: docker logs <container_id> --tail 100\n   - The crash log will show the error type, message, and stack trace\n\n2. Common crash causes:\n   a) Unhandled promise rejection: Node 15+ crashes on unhandled rejections by default\n      process.on('unhandledRejection', (reason, promise) => {\n        console.error('Unhandled Rejection at:', promise, 'reason:', reason);\n        // DON'T exit here — log and alert, investigate asynchronously\n      });\n   \n   b) Uncaught exception (synchronous throw outside try/catch):\n      process.on('uncaughtException', (err) => {\n        console.error('Uncaught Exception:', err);\n        // Here, graceful shutdown IS appropriate — process state is undefined\n        gracefulShutdown(1);\n      });\n   \n   c) OOM (Out of Memory): process exceeds --max-old-space-size → memory leak (use heapdump)\n   d) SIGTERM not handled: container orchestration kills process ungracefully mid-request\n\n3. Make the app resilient:\n   - PM2 with cluster mode: pm2 start app.js -i max — uses all CPU cores, auto-restarts crashed workers while others keep serving\n   - Graceful shutdown: on SIGTERM, stop accepting new connections, finish in-flight requests (30s max), then exit\n   const server = app.listen(3000);\n   process.on('SIGTERM', () => {\n     server.close(() => { db.end(); process.exit(0); });\n   });\n\n4. Health check endpoint: GET /health returns 200 if DB is connected, queue is reachable. Load balancer removes unhealthy instances from rotation.\n\n5. Add structured logging with Winston/Pino — JSON logs are queryable in Datadog/CloudWatch, making root cause analysis much faster than raw console.log output.", theory: "502 Bad Gateway from Nginx/load balancer indicates Node crashed or became unresponsive. Primary causes: unhandled Promise rejections crashing the process, event loop blocked by synchronous CPU work, OOM kills, or deployment issues. PM2 cluster mode auto-restarts crashed workers. process.on('uncaughtException') and 'unhandledRejection' catch async failures." },
      { tag: "HARD", q: "Explain how you would implement database transactions in Node.js with PostgreSQL. When are transactions necessary and what happens without them?", a: "Transactions group multiple DB operations into an atomic unit — either ALL succeed or ALL fail.\n\nWhen transactions are necessary:\n- Transfer money: debit account A AND credit account B — both must succeed or neither should\n- Create order with inventory update: insert order AND decrease stock — can't do one without the other\n- Any multi-step write where partial completion leaves data in an inconsistent state\n\nWithout transactions — the danger:\n// Without transaction:\nawait pool.query('UPDATE accounts SET balance = balance - 100 WHERE id = 1');\n// ← CRASH HERE: account 1 debited, account 2 never credited. Money lost.\nawait pool.query('UPDATE accounts SET balance = balance + 100 WHERE id = 2');\n\nWith transaction — correct:\nconst client = await pool.connect();\ntry {\n  await client.query('BEGIN');\n  \n  await client.query(\n    'UPDATE accounts SET balance = balance - $1 WHERE id = $2',\n    [amount, fromId]\n  );\n  \n  // Verify sufficient funds (pessimistic lock with FOR UPDATE)\n  const { rows } = await client.query(\n    'SELECT balance FROM accounts WHERE id = $1 FOR UPDATE',\n    [fromId]\n  );\n  if (rows[0].balance < 0) throw new Error('Insufficient funds');\n  \n  await client.query(\n    'UPDATE accounts SET balance = balance + $1 WHERE id = $2',\n    [amount, toId]\n  );\n  \n  await client.query('COMMIT');\n} catch (err) {\n  await client.query('ROLLBACK'); // undo everything\n  throw err;\n} finally {\n  client.release();\n}\n\nTransaction isolation levels (important for interviews):\n- READ COMMITTED (default PostgreSQL): each query sees committed data at that moment\n- REPEATABLE READ: same query returns same data throughout the transaction\n- SERIALIZABLE: strictest — transactions appear to run sequentially (prevents phantom reads)\n\nDeadlocks: two transactions waiting for each other's locks. PostgreSQL detects and kills one. Solution: always acquire locks in the same order across all transactions.", theory: "Database transactions group multiple operations into an atomic unit — all succeed or all fail together. PostgreSQL transactions use BEGIN/COMMIT/ROLLBACK. Node.js must use a single connection for all operations in a transaction (pool connections are independent). Sequelize and Knex provide transaction helpers. Deadlocks occur when transactions lock resources in different orders." },
      { tag: "SCENARIO", q: "Your team is building a Node.js service that needs to call an unreliable third-party payment API. Sometimes it times out, sometimes it returns 503. How do you make your integration robust?", a: "Third-party API resilience requires layered protection:\n\n1. Timeouts — always set them:\n   const response = await axios.post('/charge', payload, {\n     timeout: 5000 // 5 second timeout — never wait forever\n   });\n\n2. Retry with exponential backoff (for transient failures):\n   const retry = require('async-retry');\n   const result = await retry(async (bail) => {\n     try {\n       return await paymentAPI.charge(payload);\n     } catch (err) {\n       // Don't retry on 4xx (bad request) — bail immediately\n       if (err.response?.status >= 400 && err.response?.status < 500) bail(err);\n       throw err; // retry on 5xx and network errors\n     }\n   }, { retries: 3, factor: 2, minTimeout: 1000 }); // 1s → 2s → 4s\n\n3. Idempotency keys — prevent double charging on retry:\n   const idempotencyKey = `charge_${orderId}_${userId}`;\n   await paymentAPI.charge(payload, { headers: { 'Idempotency-Key': idempotencyKey } });\n   // If the same key is sent twice, the payment provider returns the original result, not a new charge\n\n4. Circuit breaker pattern:\n   const CircuitBreaker = require('opossum');\n   const breaker = new CircuitBreaker(paymentAPI.charge, {\n     timeout: 3000,\n     errorThresholdPercentage: 50, // open circuit after 50% failures\n     resetTimeout: 30000           // try again after 30s\n   });\n   // When circuit is open, calls fail immediately instead of waiting for timeout\n   // Prevents cascading failures when payment API is down\n\n5. Fallback strategy: if payment API is unreliable, queue the charge for processing when it recovers rather than failing the order.\n\n6. Monitoring: track success rate, p95 latency, and circuit breaker state. Alert when error rate exceeds threshold.", theory: "Third-party API failures require resilience patterns: retry (transient failures), circuit breaker (prevent cascade when API is down), timeout (prevent hanging), bulkhead (limit concurrent calls). The circuit breaker pattern has three states: Closed (normal), Open (failing, reject immediately), Half-Open (test if recovered). opossum is a Node.js circuit breaker library." },
      { tag: "SCENARIO", q: "You need to design a Node.js REST API that will be used by both a mobile app and a web frontend. The mobile team complains the responses are too large (slow on 3G) while the web team needs all fields. How do you handle this?", a: "This is a response shaping / API versioning problem. Multiple approaches:\n\n1. Sparse fieldsets (simplest — let clients request what they need):\n   // Client sends: GET /users/123?fields=id,name,email\n   app.get('/users/:id', async (req, res) => {\n     const user = await User.findById(req.params.id).lean();\n     if (req.query.fields) {\n       const fields = req.query.fields.split(',');\n       const filtered = Object.fromEntries(\n         Object.entries(user).filter(([key]) => fields.includes(key))\n       );\n       return res.json(filtered);\n     }\n     res.json(user);\n   });\n   Mobile sends ?fields=id,name,avatar — gets a 200-byte response.\n   Web sends no fields param — gets the full object.\n\n2. API versioning for different response shapes:\n   GET /v1/users/123 → full response (web)\n   GET /v2/users/123 → optimized compact response (mobile)\n   Problem: two versions to maintain.\n\n3. GraphQL — the proper solution for this exact problem:\n   - Each client requests exactly the fields it needs in the query\n   - Server returns only what was requested\n   - No over-fetching or under-fetching by design\n   - Tradeoff: adds complexity, learning curve, requires caching strategy changes\n\n4. Response compression — always do this regardless:\n   app.use(require('compression')()); // gzip/Brotli all responses\n   Compression alone can cut response size by 60-80% for JSON.\n\n5. Pagination on mobile: mobile responses should paginate aggressively (10 items) while web can handle 50.\n\n6. Separate mobile BFF (Backend for Frontend): a thin Node.js layer in front of your main API that aggregates and reshapes responses for mobile specifically. Adds a service but gives full control.", theory: "API design for multiple clients requires thinking about versioning, response shaping, and bandwidth. Response shaping (sparse fieldsets) lets clients request only needed fields, reducing payload for mobile. GraphQL enables clients to specify exact data requirements. REST with optional field selection is a simpler middle ground." },
      { tag: "SCENARIO", q: "Your Node.js application is deployed in Docker containers and managed by Kubernetes. The DevOps team reports pods are being killed with OOMKilled (Out of Memory). Your app's memory limit is 512MB but it often hits 480MB. How do you investigate?", a: "OOMKilled means the container exceeded its memory limit and the OS killed the process. Two scenarios: memory leak or insufficient memory limit.\n\n1. First, distinguish leak from normal usage:\n   - Memory leak: heap grows monotonically over days, never decreasing\n   - Normal usage: heap fluctuates, spikes under load but comes back down\n   Add metrics: expose /metrics endpoint with process.memoryUsage() in Prometheus format\n\n2. Profile to find the leak:\n   - Run with --inspect flag and connect Chrome DevTools\n   - Take heap snapshots at intervals: baseline, after 1 hour, after 8 hours\n   - DevTools 'Comparison' view shows which object types grew\n   - Use heapdump npm package for production snapshots\n\n3. Common Node.js memory leak causes:\n   a) Growing Map/Set/Array with no eviction: global cache with no max size\n   b) Event listeners accumulated: emitter.on() in a loop without removeListener()\n   c) Closures holding large objects: callbacks capturing request/response objects that should be GC'd\n   d) Mongoose connection not properly closed in Lambda/serverless\n   e) Promises that never resolve, keeping their closure chain alive\n\n4. Set Node.js memory limit to match container:\n   NODE_OPTIONS=--max-old-space-size=400 # leave headroom below 512MB container limit\n   Without this, V8's GC doesn't know it's in a constrained environment and won't collect aggressively enough.\n\n5. Fix the leak AND right-size the container:\n   - Fix the actual leak (most important)\n   - Set appropriate container limits with headroom: if app needs 400MB, set limit to 512-600MB\n   - Set requests (minimum guaranteed): this ensures Kubernetes schedules pods on nodes with enough memory\n\n6. Monitor with alerts: alert at 80% memory usage so you can investigate before OOMKilled happens.", theory: "Kubernetes runs multiple pod replicas for redundancy and scale. Kubernetes lifecycle hooks (preStop) enable graceful shutdown — stop accepting new requests, drain in-flight requests, then exit. Health checks (readiness/liveness probes) let Kubernetes route traffic only to healthy pods and restart unhealthy ones." },
      { tag: "HARD", q: "Explain the difference between horizontal and vertical scaling for a Node.js API, and describe a scenario where you'd choose each. What specific Node.js features support each approach?", a: "Vertical scaling (scale up): add more CPU/RAM to the existing machine.\nHorizontal scaling (scale out): add more machines/instances, distribute load.\n\nVertical scaling — when to choose:\n- DB-heavy API where the bottleneck is the database server itself (more RAM = larger query cache)\n- Monolith in early stage where operational complexity of distributed systems isn't justified\n- Stateful application where distributing state is complex\n- Quick fix: can vertically scale in minutes without code changes\n- Limit: there's a maximum machine size — you hit a ceiling. Also, single point of failure.\n\nHorizontal scaling — when to choose:\n- Traffic is unpredictable and needs auto-scaling\n- High availability requirements (no single point of failure)\n- Different parts of the system have different load profiles (scale API servers independently from workers)\n- Cost efficiency: many small machines often cheaper than one large machine\n\nNode.js features for each:\n\nVertical (single machine, multiple cores):\n- Cluster module: forks N worker processes (one per CPU core), all sharing the same port\n  const cluster = require('cluster');\n  if (cluster.isPrimary) {\n    for (let i = 0; i < os.cpus().length; i++) cluster.fork();\n  } else { app.listen(3000); }\n- Worker Threads: for CPU-intensive tasks within a single process\n\nHorizontal (multiple machines):\n- Stateless API design: no in-memory session state — all state in Redis/DB\n- PM2 with ecosystem.config.js: manages multiple instances across machines\n- Health check endpoints: /health for load balancer instance routing\n- Sticky sessions in socket apps: same user always routes to same instance\n- Redis for shared state: session storage, rate limiting, pub/sub across instances\n\nPractical answer for interviews: 'Node.js itself is single-threaded, so vertical scaling on a single machine requires the cluster module. For true horizontal scaling across machines, the app must be stateless — no local memory caches, no local file storage, all shared state in Redis or a database.'", theory: "Vertical scaling adds more CPU/RAM to a single server — simple but has a ceiling and creates a single point of failure. Horizontal scaling adds more server instances behind a load balancer — theoretically unlimited scale and redundancy. Node.js is well-suited for horizontal scaling because its stateless event-driven model works across independent instances." }
    ]
  },
  "JavaScript": {
  Beginner: [
    { q: "What is JavaScript?", a: "JavaScript is a lightweight, interpreted, high-level programming language primarily used to make web pages interactive. It runs in the browser (client-side) and on servers (Node.js). It is dynamically typed, prototype-based, and supports multiple programming paradigms: procedural, object-oriented, and functional.\n\nKey traits:\n- Runs everywhere: browser, server (Node.js), mobile (React Native), desktop (Electron)\n- Dynamic typing: variables can hold any type and change types at runtime\n- First-class functions: functions are values — they can be passed around like any other variable\n- Single-threaded with async support via the event loop", theory: "JavaScript is a high-level, dynamically-typed, interpreted language originally created for browser interactivity. It follows the ECMAScript specification and runs in a single-threaded event loop. Unlike compiled languages (Java, C++), JS is parsed and executed at runtime by the JS engine (V8 in Chrome/Node, SpiderMonkey in Firefox)." },
    { q: "What are the data types in JavaScript?", a: "JavaScript has 8 data types:\n\nPrimitive types (7):\n1. string — text: 'hello', \"world\", `template`\n2. number — integers and floats: 42, 3.14, NaN, Infinity\n3. bigint — large integers beyond Number.MAX_SAFE_INTEGER: 9007199254740993n\n4. boolean — true or false\n5. undefined — variable declared but not assigned\n6. null — intentional absence of value (typeof null === 'object' is a known JS bug)\n7. symbol — unique, immutable identifiers (used as object keys)\n\nNon-primitive:\n8. object — collections of key-value pairs, including arrays, functions, dates, maps\n\nKey distinction: primitives are passed by value, objects are passed by reference.\n\ntypeof examples:\ntypeof 'hi'        → 'string'\ntypeof 42          → 'number'\ntypeof true        → 'boolean'\ntypeof undefined   → 'undefined'\ntypeof null        → 'object' ← historical bug\ntypeof {}          → 'object'\ntypeof []          → 'object'\ntypeof function(){} → 'function'", theory: "JavaScript is dynamically typed — variables hold values of any type and can change types at runtime. Types are divided into primitives (passed by value, immutable) and non-primitives/objects (passed by reference, mutable). The typeof operator checks types at runtime, though it has quirks (typeof null === \"object\" is a historical bug)." },
    { q: "What is the difference between var, let, and const?", a: "Three ways to declare variables with different scoping and mutation rules:\n\nvar (legacy — avoid in modern JS):\n- Function-scoped (not block-scoped)\n- Hoisted to top of function with value undefined\n- Can be re-declared and re-assigned\n- Creates property on the global object\n\nlet (modern — use for mutable values):\n- Block-scoped (inside {}, for loops, if statements)\n- Hoisted but NOT initialized (Temporal Dead Zone — accessing before declaration throws ReferenceError)\n- Cannot be re-declared in the same scope\n- Can be re-assigned\n\nconst (modern — use by default):\n- Block-scoped, same as let\n- Must be initialized at declaration\n- Cannot be re-assigned (the binding is constant)\n- Objects/arrays declared with const can still be mutated — const prevents reassignment of the variable, not mutation of the value\n\nconst arr = [1, 2];\narr.push(3);  // ✓ allowed — mutating the array\narr = [];     // ✗ TypeError — reassigning the variable\n\nRule of thumb: use const by default, let when you need to reassign, never var.", theory: "Variable declarations have two dimensions: scope (where accessible) and hoisting (when initialized). var uses function scope inherited from early JS design; let/const use block scope which matches most other languages. const doesn't make values immutable — it prevents rebinding the variable, not mutating what it points to." },
    { q: "What is the difference between == and ===?", a: "== (loose equality): compares values after type coercion — JavaScript converts one or both operands to the same type before comparing.\n\n=== (strict equality): compares both value AND type — no coercion.\n\nExamples of == surprises:\n0 == false        → true  (false coerces to 0)\n'' == false       → true\nnull == undefined → true\n'5' == 5          → true  ('5' coerces to 5)\n[] == false       → true\n[] == ![]         → true  (famous JS quirk)\n\nWith ===:\n0 === false       → false (different types)\n'5' === 5         → false\nnull === undefined → false\n\nRule: always use === in production code. The only common exception: null == undefined (catches both) is sometimes used intentionally.\n\nGolden rule: if you're ever surprised by a comparison result, you probably used == when you should have used ===.", theory: "Type coercion is JavaScript's automatic type conversion during loose equality comparison. The Abstract Equality Comparison algorithm applies a complex set of conversion rules that can produce counterintuitive results. Strict equality (===) skips coercion entirely, comparing both value and type directly." },
    { q: "What is hoisting in JavaScript?", a: "Hoisting is JavaScript's behavior of moving declarations to the top of their scope before code execution. Only the declaration is hoisted — not the initialization.\n\nvar hoisting:\nconsole.log(x); // undefined (not ReferenceError)\nvar x = 5;\n// JavaScript sees it as: var x; console.log(x); x = 5;\n\nfunction declaration hoisting:\nsayHi(); // Works! 'Hello'\nfunction sayHi() { console.log('Hello'); }\n// Entire function body is hoisted\n\nlet/const hoisting (Temporal Dead Zone):\nconsole.log(y); // ReferenceError: Cannot access 'y' before initialization\nlet y = 10;\n// let/const are hoisted but NOT initialized — accessing them before declaration throws\n\nfunction expression NOT hoisted:\ngreet(); // TypeError: greet is not a function\nvar greet = function() { console.log('Hi'); };\n// var is hoisted (undefined), but the function assignment is not\n\nKey insight: always declare variables at the top of their scope and use const/let to avoid hoisting surprises.", theory: "Hoisting is a JavaScript engine behavior where declarations are processed during the compilation phase before code executes. Function declarations are fully hoisted (callable anywhere in scope). var declarations are hoisted but initialized to undefined. let/const are hoisted but uninitialized, creating the Temporal Dead Zone." },
    { q: "What are arrow functions and how are they different from regular functions?", a: "Arrow functions (=>) are a shorter syntax for writing functions introduced in ES6. They have important behavioral differences beyond just syntax.\n\nSyntax comparison:\n// Regular function\nfunction add(a, b) { return a + b; }\n\n// Arrow function\nconst add = (a, b) => a + b;\n// Parentheses optional for single param: x => x * 2\n// Curly braces needed for multiple statements: (a,b) => { const c = a+b; return c; }\n\nKey differences:\n\n1. this binding — the most important difference:\n   - Regular function: 'this' is determined by HOW the function is called (dynamic)\n   - Arrow function: 'this' is inherited from the surrounding lexical scope (static)\n\n   const obj = {\n     name: 'Alice',\n     greetRegular: function() { console.log(this.name); }, // 'Alice'\n     greetArrow: () => { console.log(this.name); }         // undefined (this = outer scope)\n   };\n\n2. No 'arguments' object: arrow functions don't have their own arguments. Use rest params instead: (...args) => {}\n\n3. Cannot be used as constructors: new arrowFn() throws TypeError\n\n4. No prototype property\n\nWhen to use arrow functions: callbacks, array methods (.map, .filter), anywhere you want 'this' to refer to the enclosing context.\n\nWhen to use regular functions: object methods, constructors, when you need 'arguments' or dynamic 'this'.", theory: "Arrow functions are a concise ES6 function syntax with an important behavioral difference: they don't have their own 'this' binding. Instead, they inherit 'this' from the enclosing lexical scope at definition time. This makes them ideal for callbacks where you need to preserve the outer context's 'this'." },
    { q: "What is a closure in JavaScript?", a: "A closure is a function that remembers the variables from its outer (enclosing) scope even after that outer function has returned.\n\nSimple example:\nfunction makeCounter() {\n  let count = 0;          // count lives in makeCounter's scope\n  return function() {     // inner function closes over count\n    count++;\n    return count;\n  };\n}\n\nconst counter = makeCounter(); // makeCounter has returned, but count persists\ncounter(); // 1\ncounter(); // 2\ncounter(); // 3\n\nWhy it works: the inner function holds a reference to count in its closure — the variable doesn't get garbage collected as long as the inner function exists.\n\nReal-world uses:\n1. Private variables: closures create private state that can't be accessed from outside\n2. Function factories: makeMultiplier(2) returns a function that always multiplies by 2\n3. Memoization: cache results of expensive functions\n4. Event handlers: callbacks remember variables from when they were created\n\nCommon closure bug (interview classic):\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100); // prints 3,3,3 — not 0,1,2!\n}\n// Fix with let: for (let i = 0; ...) — each iteration gets its own 'i'", theory: "A closure is a function bundled with its lexical environment — references to all variables in scope when the function was defined. Even after the outer function returns, those variable references remain alive as long as the inner function exists. This enables private state, function factories, and memoization patterns." },
    { q: "What is the difference between null and undefined?", a: "Both represent 'no value' but have different semantics:\n\nundefined:\n- Variable declared but not assigned a value\n- Function parameter not passed\n- Object property that doesn't exist\n- Function with no return statement returns undefined\n- typeof undefined → 'undefined'\n\nlet x;           // undefined\nfunction fn(a) { return a; }\nfn();             // undefined\nconst obj = {};\nobj.missing;      // undefined\n\nnull:\n- Intentional absence of a value — explicitly assigned\n- Represents 'no object' — used when you want to signal 'this intentionally has no value'\n- typeof null → 'object' (historical bug in JS)\n\nlet user = null;  // explicitly no user\n\nComparisons:\nnull == undefined  → true  (loose equality)\nnull === undefined → false (strict equality)\ntypeof null        → 'object' (bug — not 'null')\ntypeof undefined   → 'undefined'\n\nBest practice: use null when you explicitly want to represent 'no value'. Let undefined be the default 'not set' state. Never set something to undefined manually — just don't set it.", theory: "undefined is the engine's automatic default for uninitialized variables and missing object properties. null is a programmer-assigned sentinel value meaning 'intentionally no value'. The typeof null === 'object' is a legacy bug from JS's first implementation that can't be fixed without breaking existing code." },
    { q: "What are template literals?", a: "Template literals (backtick strings) are an ES6 feature that allows embedded expressions and multi-line strings.\n\nSyntax: use backticks (`) instead of quotes.\n\n1. String interpolation:\nconst name = 'Alice';\nconst age = 30;\nconsole.log(`Hello, ${name}! You are ${age} years old.`);\n\n2. Any expression works inside ${}:\nconst price = 9.99;\nconsole.log(`Total: $${(price * 1.1).toFixed(2)}`); // 'Total: $10.99'\n\n3. Multi-line strings:\nconst html = `\n  <div>\n    <h1>${title}</h1>\n  </div>\n`; // No need for \\n or string concatenation\n\n4. Tagged templates (advanced):\n// A function processes the template literal\nconst result = sql`SELECT * FROM users WHERE id = ${userId}`;\n// Used by libraries: styled-components, graphql-tag\n\nWhy use template literals over string concatenation:\n- Readable: 'Hello ' + name + '!' vs `Hello ${name}!`\n- Multi-line without escape characters\n- Can embed any expression, not just variables", theory: "Template literals use backtick syntax and enable string interpolation, multi-line strings, and tagged templates. The ${expression} syntax evaluates any JavaScript expression and coerces the result to string. Tagged templates let a function pre-process the template, used by libraries like styled-components and GraphQL." },
    { q: "What are the different ways to create objects in JavaScript?", a: "JavaScript has multiple ways to create objects:\n\n1. Object literal (most common):\nconst person = { name: 'Alice', age: 30 };\n\n2. Constructor function:\nfunction Person(name, age) {\n  this.name = name;\n  this.age = age;\n}\nconst alice = new Person('Alice', 30);\n\n3. ES6 Class (syntactic sugar over prototypes):\nclass Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n  greet() { return `Hi, I'm ${this.name}`; }\n}\nconst alice = new Person('Alice', 30);\n\n4. Object.create():\nconst proto = { greet() { return 'Hi'; } };\nconst obj = Object.create(proto);\nobj.name = 'Alice';\n\n5. Factory function:\nfunction createPerson(name, age) {\n  return { name, age, greet() { return `Hi, I'm ${name}`; } };\n}\n\n6. Object spread:\nconst base = { role: 'user' };\nconst alice = { ...base, name: 'Alice' };\n\nModern preference: class for OOP patterns, object literals for data, factory functions for encapsulation without 'this' complexity.", theory: "JavaScript is a prototype-based object-oriented language. Objects are the primary data structure. Different creation methods serve different use cases: literals for simple data bags, constructors/classes for object-oriented inheritance hierarchies, and factory functions for encapsulation and composition without 'this' complexity." },
    { q: "What is the difference between for...of and for...in loops?", a: "for...of: iterates over VALUES of an iterable (arrays, strings, Maps, Sets, generators).\nfor...in: iterates over KEYS (property names) of an object.\n\nfor...of examples:\nconst arr = ['a', 'b', 'c'];\nfor (const val of arr) {\n  console.log(val); // 'a', 'b', 'c'\n}\n\nconst str = 'hello';\nfor (const char of str) {\n  console.log(char); // 'h','e','l','l','o'\n}\n\nfor...in examples:\nconst obj = { name: 'Alice', age: 30 };\nfor (const key in obj) {\n  console.log(key, obj[key]); // 'name' Alice, 'age' 30\n}\n\nfor...in pitfall: it also iterates over INHERITED properties from the prototype chain.\nAlways use hasOwnProperty check or use Object.keys(obj).forEach() instead.\n\nWhen to use which:\n- for...of: iterating arrays, strings, Maps, Sets — working with VALUES\n- for...in: inspecting object properties — working with KEYS\n- Never use for...in on arrays — use for...of, forEach, or map instead", theory: "for...in iterates over all enumerable property keys (including inherited prototype chain properties). for...of iterates over values of iterables (arrays, strings, Maps, Sets — objects implementing [Symbol.iterator]). for...in predates the iteration protocol and has surprising behavior with arrays — always prefer for...of or array methods for array iteration." },
    { q: "What is the spread operator and rest parameters?", a: "Both use ... syntax but serve opposite purposes:\n\nSpread operator: EXPANDS an iterable into individual elements.\n\n// In arrays:\nconst arr1 = [1, 2, 3];\nconst arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]\nconst copy = [...arr1];       // shallow copy\n\n// In function calls:\nconst nums = [1, 2, 3];\nMath.max(...nums); // same as Math.max(1, 2, 3)\n\n// In objects:\nconst obj1 = { a: 1 };\nconst obj2 = { ...obj1, b: 2 }; // { a: 1, b: 2 }\n\nRest parameters: COLLECTS multiple arguments into an array.\n\nfunction sum(...numbers) {\n  return numbers.reduce((total, n) => total + n, 0);\n}\nsum(1, 2, 3, 4); // 10\n\n// Can have regular params before rest:\nfunction first(a, b, ...rest) {\n  console.log(a, b, rest); // 1 2 [3, 4, 5]\n}\nfirst(1, 2, 3, 4, 5);\n\nCommon uses of spread:\n- Copying arrays/objects without mutation\n- Merging objects\n- Passing array elements as function arguments\n- Converting NodeLists to arrays: [...document.querySelectorAll('div')]", theory: "Spread and rest both use ... syntax but operate in opposite directions. Spread expands an iterable into individual elements at a call site or array/object literal. Rest collects individual values into an array at a function parameter list. Together they enable variadic functions, shallow copying, and array/object merging patterns." },
    { q: "What is destructuring in JavaScript?", a: "Destructuring is a concise syntax to unpack values from arrays or properties from objects into distinct variables.\n\nArray destructuring:\nconst [a, b, c] = [1, 2, 3];\n\n// Skip elements:\nconst [first, , third] = [1, 2, 3];\n\n// Default values:\nconst [x = 0, y = 0] = [5]; // x=5, y=0\n\n// Swap variables:\nlet p = 1, q = 2;\n[p, q] = [q, p]; // p=2, q=1\n\n// Rest in destructuring:\nconst [head, ...tail] = [1, 2, 3, 4]; // head=1, tail=[2,3,4]\n\nObject destructuring:\nconst { name, age } = { name: 'Alice', age: 30 };\n\n// Rename:\nconst { name: userName } = { name: 'Alice' }; // userName='Alice'\n\n// Default values:\nconst { role = 'user' } = { name: 'Alice' }; // role='user'\n\n// Nested:\nconst { address: { city } } = { address: { city: 'Mumbai' } };\n\n// In function parameters:\nfunction greet({ name, age = 0 }) {\n  return `${name} is ${age}`;\n}\ngreet({ name: 'Bob', age: 25 });\n\nWhy destructuring matters:\n- Cleaner code: const { data, error } = useFetch(url)\n- API responses: const { user: { id, email } } = response\n- Swap variables: [a, b] = [b, a]", theory: "Destructuring is syntactic sugar for extracting multiple values from data structures in a single statement. Array destructuring uses position; object destructuring uses property names. Both support default values (for undefined), renaming, and rest patterns. Destructuring makes function parameters, API responses, and state management more declarative." },
    { q: "What are Promises in JavaScript?", a: "A Promise is an object representing the eventual completion or failure of an asynchronous operation.\n\nA Promise has 3 states:\n- pending: initial state\n- fulfilled: operation completed → .then() runs\n- rejected: operation failed → .catch() runs\n\nCreating a Promise:\nconst myPromise = new Promise((resolve, reject) => {\n  setTimeout(() => {\n    const success = true;\n    if (success) resolve('Data loaded!');\n    else reject(new Error('Something went wrong'));\n  }, 1000);\n});\n\nConsuming:\nmyPromise\n  .then(data => console.log(data))\n  .catch(err => console.error(err))\n  .finally(() => setLoading(false));\n\nPromise combinators:\n// All must succeed:\nconst [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]);\n\n// All settle (success or failure):\nconst results = await Promise.allSettled([p1, p2, p3]);\n\n// First to resolve wins:\nconst fastest = await Promise.race([p1, p2]);\n\nWhy Promises over callbacks:\n- Chainable .then() vs nested callbacks\n- Single .catch() handles all errors\n- Composable with Promise.all, Promise.race\n- Foundation for async/await", theory: "A Promise is a proxy for a value not yet known — a placeholder for an async operation's result. Promises are stateful: pending → fulfilled or pending → rejected (state is final once settled). The .then() method returns a new Promise, enabling chain composition. Promise combinators (all, race, allSettled, any) coordinate multiple async operations." },
    { q: "What is async/await in JavaScript?", a: "async/await is syntactic sugar over Promises that makes asynchronous code look synchronous.\n\nasync function fetchUser(id) {\n  const response = await fetch(`/api/users/${id}`);\n  const user = await response.json();\n  return user; // async functions always return a Promise\n}\n\nRules:\n- async: makes the function return a Promise\n- await: pauses the async function until Promise resolves\n- Can only use await inside async functions (or top-level modules)\n\nError handling:\nasync function getUser(id) {\n  try {\n    const res = await fetch(`/api/users/${id}`);\n    if (!res.ok) throw new Error(`HTTP ${res.status}`);\n    return await res.json();\n  } catch (err) {\n    console.error('Failed:', err.message);\n    throw err;\n  }\n}\n\nParallel vs Sequential:\n// Sequential (each waits for previous):\nconst a = await fetchA();\nconst b = await fetchB();\n\n// Parallel (both fire simultaneously):\nconst [a, b] = await Promise.all([fetchA(), fetchB()]);", theory: "async/await is syntactic sugar over Promises and generators. The async keyword marks a function as returning a Promise. The await keyword pauses execution of the containing async function (not the entire thread) until the Promise settles. The event loop continues processing other tasks during the pause — it's non-blocking despite appearing synchronous." },
    { q: "What are array methods: map, filter, reduce?", a: "The three most important higher-order array methods.\n\nmap: transforms every element, returns new array of same length.\nconst nums = [1, 2, 3, 4];\nconst doubled = nums.map(n => n * 2);     // [2, 4, 6, 8]\nconst names = users.map(user => user.name); // extract field\n\nfilter: keeps elements that pass a test, returns subset.\nconst evens = nums.filter(n => n % 2 === 0);   // [2, 4]\nconst adults = users.filter(u => u.age >= 18);\n\nreduce: accumulates array into a single value.\nconst sum = nums.reduce((acc, curr) => acc + curr, 0); // 10\n\n// Count occurrences:\nconst words = ['cat','dog','cat','bird','dog','cat'];\nconst count = words.reduce((acc, word) => {\n  acc[word] = (acc[word] || 0) + 1;\n  return acc;\n}, {}); // { cat:3, dog:2, bird:1 }\n\nChaining:\nconst total = users\n  .filter(u => u.active && u.age >= 18)\n  .map(u => u.balance)\n  .reduce((sum, bal) => sum + bal, 0);", theory: "map, filter, and reduce are higher-order array methods that implement functional programming patterns. They are pure — they don't mutate the original array, instead returning new arrays or values. This immutability makes them safe to compose and chain. They abstract the iteration pattern, letting you focus on the transformation logic." },
    { q: "What is event delegation in JavaScript?", a: "Event delegation adds ONE listener to a parent element and uses event bubbling to handle events from children.\n\nWithout delegation (bad for large lists):\ndocument.querySelectorAll('.item').forEach(item => {\n  item.addEventListener('click', handleClick); // 1000 listeners!\n});\n\nWith delegation (one listener handles all):\nconst list = document.getElementById('list');\nlist.addEventListener('click', (event) => {\n  if (event.target.matches('.item')) {\n    console.log('Clicked:', event.target.dataset.id);\n  }\n});\n// New items added dynamically are automatically handled!\n\nWhy delegation:\n1. Performance: one listener vs hundreds\n2. Dynamic content: new elements are handled automatically\n3. Memory: fewer listeners = less memory\n\nevent.target vs event.currentTarget:\n- event.target: element actually clicked\n- event.currentTarget: element the listener is on (the parent)\n\nReact uses event delegation internally — all listeners attach to the root.", theory: "Event delegation leverages the browser's event propagation model. Events bubble up from the target element through all ancestors. By placing one listener on a parent, you handle events from all current and future children. The event.target property identifies which specific element triggered the event." },
    { q: "What is the prototype chain in JavaScript?", a: "Every object has a [[Prototype]] that links to another object. When you access a property, JS checks the object, then its prototype, then the prototype's prototype — the prototype chain.\n\nconst animal = {\n  breathe() { return 'breathing'; }\n};\nconst dog = Object.create(animal);\ndog.bark = function() { return 'woof'; };\n\ndog.bark();    // own property\ndog.breathe(); // found on prototype\ndog.toString(); // found on Object.prototype\n\nChain: dog → animal → Object.prototype → null\n\nWith classes:\nclass Animal {\n  breathe() { return 'breathing'; }\n}\nclass Dog extends Animal {\n  bark() { return 'woof'; }\n}\nconst rex = new Dog();\n// rex → Dog.prototype → Animal.prototype → Object.prototype → null\n\nrex instanceof Dog;    // true\nrex instanceof Animal; // true\n\nhasOwnProperty:\nrex.hasOwnProperty('bark'); // false — inherited, not own\n\nWhy this matters: explains how inheritance works, why typeof null === 'object', and how methods are shared efficiently across instances.", theory: "JavaScript implements inheritance through prototype chains — linked lists of objects. Every object has an internal [[Prototype]] slot pointing to another object (or null). Property lookup walks this chain until the property is found or null is reached. Classes in ES6 are syntactic sugar over this prototypal system." },
    { q: "What is the 'this' keyword in JavaScript?", a: "The 'this' keyword refers to the context in which a function is called. Its value is NOT fixed — it changes depending on HOW the function is called.\n\n4 binding rules (priority order):\n\n1. new binding (highest):\nfunction Person(name) { this.name = name; }\nconst alice = new Person('Alice');\n// 'this' = the newly created object\n\n2. Explicit binding (call / apply / bind):\nfunction greet() { return this.name; }\ngreet.call({ name: 'Bob' });    // 'Bob'\ngreet.bind({ name: 'Carol' })(); // 'Carol'\n\n3. Implicit binding:\nconst obj = { name: 'Dave', greet() { return this.name; } };\nobj.greet(); // 'Dave' — this = obj (object before the dot)\n\n// Lost when extracted from object:\nconst fn = obj.greet;\nfn(); // undefined — no dot, no implicit binding\n\n4. Default binding (lowest):\nfunction show() { console.log(this); }\nshow(); // window (browser) or global (Node) — undefined in strict mode\n\nArrow functions — inherit 'this' from enclosing scope (no own 'this'):\nconst obj = {\n  name: 'Eve',\n  greet: function() {\n    const inner = () => console.log(this.name); // lexical 'this'\n    inner();\n  }\n};\nobj.greet(); // 'Eve'\n\nCommon React mistake:\n// ✗ class method loses 'this' when passed as event handler:\n<button onClick={this.handleClick}>  // 'this' is undefined inside handleClick\n// ✓ Fix with bind or arrow:\n<button onClick={this.handleClick.bind(this)}>\n<button onClick={() => this.handleClick()}>\n// ✓ Or use class field arrow (modern):\nhandleClick = () => { this.setState(...); }", theory: "The 'this' keyword is a runtime binding dynamically set based on how a function is invoked, not where it's defined. JavaScript has 4 binding rules with clear priority: new > explicit (call/apply/bind) > implicit (method call) > default (global/undefined in strict mode). Arrow functions are exempt — they use lexical this." }
  ],
  Intermediate: [
    { q: "What are higher-order functions in JavaScript?", a: "A higher-order function either takes functions as arguments OR returns a function.\n\nFunctions as arguments:\nfunction applyTwice(fn, value) {\n  return fn(fn(value));\n}\napplyTwice(x => x + 1, 5); // 7\n\n// Built-in HOFs: map, filter, reduce, forEach, sort, every, some\n[1,2,3].map(n => n * 2);\n[1,2,3].filter(n => n > 1);\n[1,2,3].sort((a,b) => a - b);\n\nFunctions returning functions:\nfunction multiply(factor) {\n  return (number) => number * factor;\n}\nconst double = multiply(2);\nconst triple = multiply(3);\ndouble(5); // 10\n\nWhy HOFs matter:\n- Array methods (map, filter, reduce)\n- Event handlers, middleware, callbacks\n- Debounce, throttle, memoize — all return functions\n- React: useEffect(fn, deps), React.memo(Component)", theory: "Higher-order functions are possible because JavaScript treats functions as first-class values — they can be stored in variables, passed as arguments, and returned from other functions. This enables functional programming: composing small, pure functions into complex behavior without mutation or shared state." },
    { q: "Explain the JavaScript event loop with microtasks and macrotasks.", a: "JavaScript is single-threaded but handles async via the event loop.\n\nExecution order:\n1. Synchronous code (call stack)\n2. Microtasks (Promises, queueMicrotask) — drain FULLY after each task\n3. Macrotasks (setTimeout, setInterval, I/O) — one per iteration\n\nconsole.log('1 - sync');\nsetTimeout(() => console.log('4 - macrotask'), 0);\nPromise.resolve().then(() => console.log('3 - microtask'));\nconsole.log('2 - sync');\n// Output: 1 → 2 → 3 → 4\n\nWhy: after each task, the engine drains the ENTIRE microtask queue before picking the next macrotask. Even with 0ms delay, setTimeout is a macrotask and runs after all Promises.\n\nCommon gotcha:\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0); // 3, 3, 3\n  // Timers fire after loop — i is already 3\n  // Fix: use let instead of var", theory: "JavaScript runs on a single thread but handles async via an event loop with multiple queues. The call stack runs synchronous code. After each task, the engine drains the entire microtask queue (Promises) before picking the next macrotask (setTimeout, setInterval). This priority ordering ensures Promises resolve predictably." },
    { q: "What is memoization and how do you implement it?", a: "Memoization caches results of expensive function calls and returns cached results for the same inputs.\n\nfunction memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}\n\nconst fastFib = memoize(function fib(n) {\n  if (n <= 1) return n;\n  return fastFib(n-1) + fastFib(n-2); // calls memoized version\n});\nfastFib(40); // instant after first call\n\nLimitations:\n- Memory grows for many unique inputs\n- JSON.stringify can't handle functions, symbols, circular references\n- Not useful for functions with side effects\n\nIn React: useMemo() and useCallback() are built-in memoization.", theory: "Memoization is an optimization for pure functions (same input always produces same output). It trades memory for computation time by caching results. The cache key is typically a serialized version of the function arguments. It's only effective when the same inputs are called multiple times." },
    { q: "What is the difference between call, apply, and bind?", a: "All three control what 'this' refers to inside a function.\n\ncall: invokes immediately with specific 'this' and args passed individually.\nfunction greet(greeting) { return `${greeting}, ${this.name}`; }\nconst user = { name: 'Alice' };\ngreet.call(user, 'Hello'); // 'Hello, Alice'\n\napply: same as call but arguments passed as an ARRAY.\ngreet.apply(user, ['Hi']); // 'Hi, Alice'\n\n// Classic apply use (before spread):\nMath.max.apply(null, [3,1,4,1,5]); // 5\n\nbind: returns a NEW function with 'this' permanently bound.\nconst boundGreet = greet.bind(user, 'Hey');\nboundGreet(); // 'Hey, Alice'\n\n// Partial application:\nfunction multiply(a, b) { return a * b; }\nconst double = multiply.bind(null, 2);\ndouble(5); // 10\n\nWhen to use:\n- call: invoke with different 'this' immediately\n- apply: same, when args are in an array\n- bind: create a new function with fixed 'this' for later use", theory: "All three methods allow explicit 'this' binding by overriding the default call-site binding. call and apply invoke immediately (args individually vs array). bind returns a new function with 'this' permanently set. They're essential for method borrowing and ensuring correct context in event handlers and callbacks." },
    { q: "What are generators in JavaScript?", a: "Generators are functions that can pause and resume execution using function* and yield.\n\nfunction* counter() {\n  yield 1;\n  yield 2;\n  yield 3;\n}\n\nconst gen = counter();\ngen.next(); // { value: 1, done: false }\ngen.next(); // { value: 2, done: false }\ngen.next(); // { value: 3, done: false }\ngen.next(); // { value: undefined, done: true }\n\nInfinite generator:\nfunction* infiniteIds() {\n  let id = 1;\n  while (true) { yield id++; }\n}\nconst ids = infiniteIds();\nids.next().value; // 1\nids.next().value; // 2\n\nRange generator (iterable):\nfunction* range(start, end) {\n  for (let i = start; i <= end; i++) yield i;\n}\nfor (const n of range(1, 5)) console.log(n);\n[...range(1, 5)]; // [1,2,3,4,5]\n\nUse cases:\n1. Lazy sequences — generate values on demand\n2. Infinite sequences without memory overflow\n3. Custom iterators for data structures\n4. Basis for async/await implementation", theory: "Generators are pausable functions that implement the iterator protocol. The function* syntax creates a generator factory; each call returns a generator object. yield pauses execution and returns a value; .next() resumes execution. They enable lazy evaluation — computing values only when requested." },
    { q: "What is the difference between deep copy and shallow copy?", a: "Shallow copy: copies top-level properties only. Nested objects are still shared by reference.\n\nconst original = { a: 1, nested: { b: 2 } };\nconst shallow = { ...original };\nshallow.nested.b = 99;\nconsole.log(original.nested.b); // 99 — shared reference modified!\n\nDeep copy: recursively copies ALL levels — completely independent.\n\n// Method 1: structuredClone (modern, recommended)\nconst deep = structuredClone(original);\n// Handles: Dates, Maps, Sets, circular refs\n// Doesn't handle: functions, DOM nodes\n\n// Method 2: JSON (simple but limited)\nconst deep = JSON.parse(JSON.stringify(original));\n// Loses: functions, undefined, Dates → strings\n\n// Method 3: Lodash\nimport cloneDeep from 'lodash/cloneDeep';\nconst deep = cloneDeep(original);\n\nVerify independence:\ndeep.nested.b = 999;\nconsole.log(original.nested.b); // 2 — unchanged\n\nRule: for flat objects use spread. For nested data use structuredClone().", theory: "JavaScript objects and arrays are reference types — variables hold memory addresses, not values. Shallow copy duplicates the top-level structure but shares nested object references. Deep copy recursively duplicates all levels creating complete independence. The right approach depends on whether you need to isolate nested changes." },
    { q: "What is currying in JavaScript?", a: "Currying transforms a function that takes multiple arguments into a sequence of single-argument functions.\n\n// Normal: f(a, b, c)\nfunction add(a, b, c) { return a + b + c; }\nadd(1, 2, 3); // 6\n\n// Curried: f(a)(b)(c)\nconst add = a => b => c => a + b + c;\nadd(1)(2)(3); // 6\n\nPartial application:\nconst add5 = add(5);\nadd5(3)(2); // 10\n\nReal-world:\nconst multiply = a => b => a * b;\nconst double = multiply(2);\nconst triple = multiply(3);\n[1,2,3,4].map(double); // [2,4,6,8]\n\nGeneric curry function:\nfunction curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) return fn.apply(this, args);\n    return (...more) => curried(...args, ...more);\n  };\n}\n\nconst curriedAdd = curry((a, b, c) => a + b + c);\ncurriedAdd(1)(2)(3); // 6\ncurriedAdd(1, 2)(3); // 6\n\nUse cases: function composition, specialized functions from general ones, point-free programming.", theory: "Currying (named after mathematician Haskell Curry) transforms f(a,b,c) into f(a)(b)(c). Each partial application returns a new function waiting for the next argument. This enables partial application — creating specialized functions from general ones — and is fundamental to function composition pipelines." },
    { q: "What are WeakMap and WeakSet?", a: "WeakMap and WeakSet hold weak references — they don't prevent garbage collection of their keys/values.\n\nWeakMap:\n- Keys must be objects\n- Keys weakly referenced — GC'd when no other reference exists\n- Not iterable (no .forEach, no .size)\n- Methods: .get, .set, .has, .delete\n\nconst cache = new WeakMap();\nlet user = { id: 1 };\ncache.set(user, { data: '...' });\n\nuser = null; // user GC'd — WeakMap entry auto-cleaned, no memory leak\n\nWeakSet:\n- Values must be objects\n- Not iterable\n- Methods: .add, .has, .delete\n\nWhen to use:\n1. Caching with object keys without memory leaks\n2. Tracking DOM elements: store per-element data without preventing GC\n3. Marking objects without modifying them\n\nKey insight: regular Map/Set hold STRONG references — objects won't be GC'd while in the collection. WeakMap/WeakSet hold WEAK references — objects can be GC'd even while in the collection.", theory: "WeakMap and WeakSet store object references weakly — they don't prevent garbage collection. Regular Map/Set hold strong references keeping objects alive. Weak references allow the GC to collect objects when no strong references remain, automatically cleaning the WeakMap/WeakSet entry. They're designed for memory-safe caching with object keys." },
    { q: "What is the Proxy object in JavaScript?", a: "Proxy wraps an object and intercepts fundamental operations — property access, assignment, function calls.\n\nconst handler = {\n  get(target, prop) {\n    return prop in target ? target[prop] : `Property ${prop} not found`;\n  },\n  set(target, prop, value) {\n    if (typeof value !== 'number') throw new TypeError('Only numbers allowed');\n    target[prop] = value;\n    return true; // must return true\n  }\n};\n\nconst scores = new Proxy({}, handler);\nscores.math = 95;     // sets successfully\nscores.math = 'A+';   // throws TypeError\nscores.missing;       // 'Property missing not found'\n\nReal-world uses:\n1. Validation: validate data before setting\n2. Vue 3's reactivity: setting a property triggers UI updates\n3. Default values: return defaults for missing properties\n4. Logging/debugging: trace all property access\n\nReflect API: companion to Proxy for default behaviors:\nget(target, prop) {\n  console.log('getting', prop);\n  return Reflect.get(target, prop);\n}", theory: "Proxy implements the Proxy/Interceptor design pattern at the JavaScript engine level. It intercepts fundamental operations (property access, assignment, function calls) via handler 'traps'. The Reflect API provides default implementations of each trap, so you can call Reflect.get() to perform the normal operation after custom logic." },
    { q: "What is optional chaining (?.) and nullish coalescing (??) in JavaScript?", a: "Two ES2020 features for safer null/undefined handling.\n\nOptional chaining (?.):\nReturns undefined instead of throwing when any part of the chain is null/undefined.\n\n// Without:\nconst city = user && user.address && user.address.city;\n\n// With:\nconst city = user?.address?.city;\n\n// Methods:\nconst name = user?.getName?.();\n\n// Arrays:\nconst first = arr?.[0];\n\nNullish coalescing (??):\nReturns right side only when left is null or undefined — NOT for other falsy values.\n\n// || problem: treats 0 and '' as falsy\nconst count = userCount || 10; // 0 → 10 (wrong!)\n\n// ?? solution:\nconst count = userCount ?? 10;\n// 0 → 0 (correct!), null → 10, undefined → 10, '' → ''\n\nCombined:\nconst city = user?.address?.city ?? 'Unknown city';\n\nNullish assignment:\nuser.settings ??= {}; // assign only if null/undefined", theory: "Optional chaining returns undefined for null/undefined mid-chain instead of throwing TypeError. Nullish coalescing provides a default only for null/undefined (not all falsy values). Together they enable safe navigation of potentially missing data without verbose null checks or the false-positive falsy behavior of ||." },
    { q: "What are Object.keys(), Object.values(), and Object.entries()?", a: "Three static methods for extracting keys, values, or both from an object.\n\nconst user = { name: 'Alice', age: 30, role: 'admin' };\nObject.keys(user);    // ['name', 'age', 'role']\nObject.values(user);  // ['Alice', 30, 'admin']\nObject.entries(user); // [['name','Alice'], ['age',30], ['role','admin']]\n\nPractical uses:\n\n// Iterate like an array:\nfor (const [key, value] of Object.entries(user)) {\n  console.log(`${key}: ${value}`);\n}\n\n// Transform object values:\nconst prices = { apple: 1.5, banana: 0.5 };\nconst discounted = Object.fromEntries(\n  Object.entries(prices).map(([item, price]) => [item, price * 0.9])\n);\n\n// Filter object properties:\nconst adults = Object.fromEntries(\n  Object.entries(users).filter(([id, u]) => u.age >= 18)\n);\n\n// Check if empty:\nObject.keys(obj).length === 0;\n\n// Convert to Map:\nconst map = new Map(Object.entries(user));\n\nNote: only returns OWN enumerable properties — not prototype properties.", theory: "These static methods extract an object's own enumerable properties as arrays, enabling array methods (map, filter, reduce) to work on object data. They only see own properties, not prototype chain properties. Object.fromEntries() is the inverse operation, converting [key, value] pairs back into an object." },
    { q: "What are the ES6+ features you use most in modern JavaScript?", a: "Modern JavaScript (ES6+) essentials:\n\nES6 (2015):\n- let/const: block-scoped variables\n- Arrow functions: shorter syntax + lexical 'this'\n- Template literals: `Hello ${name}`\n- Destructuring: const { name, age } = user\n- Default parameters: function fn(x = 0) {}\n- Rest/Spread: ...args, ...arr\n- Promises\n- Classes\n- Modules: import/export\n- Map, Set, WeakMap, WeakSet, Symbol\n- for...of, generators\n\nES2017: async/await, Object.entries/values\n\nES2018: Object spread, Promise.finally, for await...of\n\nES2019: Array.flat/flatMap, Object.fromEntries, optional catch\n\nES2020:\n- Optional chaining: user?.address?.city\n- Nullish coalescing: value ?? 'default'\n- Promise.allSettled, BigInt\n\nES2021: String.replaceAll, Promise.any, logical assignment (??=, ||=)\n\nES2022:\n- Array.at(-1) → last element\n- Class private fields: #privateField\n- Top-level await (in modules)\n- Object.hasOwn()\n\nES2023+: Array.toSorted(), toReversed() — non-mutating array methods", theory: "ES2015 (ES6) was the most transformative JavaScript update, introducing classes, modules, Promises, generators, and template literals. Since then, annual TC39 releases have added async/await, optional chaining, nullish coalescing, and private class fields. Modern JavaScript development relies heavily on these features, most transpiled by Babel/TypeScript for older browsers." },
    { q: "What is the difference between Map and Object in JavaScript?", a: "Both store key-value pairs with important differences:\n\nKey type:\n- Object: keys must be strings or Symbols\n- Map: keys can be ANY value — objects, functions, numbers\n\nconst map = new Map();\nmap.set({ id: 1 }, 'user data'); // object as key ✓\nmap.set(42, 'number key'); // number as key ✓\n\nSize:\n- Object: Object.keys(obj).length — O(n)\n- Map: map.size — O(1) instant\n\nOrdering:\n- Object: not guaranteed (modern engines mostly preserve)\n- Map: always maintains insertion order\n\nIteration:\n- Object: for...in (includes prototype!), Object.keys/values/entries()\n- Map: for...of, map.forEach(), map.keys(), map.values()\n\nSerialization:\n- Object: JSON.stringify() works\n- Map: doesn't serialize to JSON (need to convert first)\n\nWhen to use Map:\n- Dynamic keys, non-string keys\n- Need accurate .size\n- Frequent add/delete operations\n\nWhen to use Object:\n- Known string keys (config, data models)\n- JSON serialization needed", theory: "Map and Object both store key-value pairs, but with different capabilities and semantics. Maps maintain insertion order, support any key type, provide O(1) size property, and are iterable without conversion. Objects are optimized for known string key lookups and JSON serialization. Use Map for dynamic key sets; Object for fixed structure records." },
    { q: "What are JavaScript Symbols and when do you use them?", a: "Symbol creates unique, immutable identifiers. Every Symbol() call returns a unique value.\n\nconst sym1 = Symbol('id');\nconst sym2 = Symbol('id');\nsym1 === sym2; // false — always unique\n\nUse case 1 — Unique object keys:\nconst ID = Symbol('id');\nconst obj = { name: 'Alice', [ID]: 123 };\nobj[ID];    // 123\nobj['id'];  // undefined — string 'id' is different\n\nUse case 2 — Private-ish properties:\n// Symbol keys don't appear in for...in, Object.keys(), or JSON.stringify()\nconst _private = Symbol('private');\nclass Service {\n  constructor() { this[_private] = 'secret'; }\n}\n\nUse case 3 — Well-known Symbols (customize built-in behavior):\nclass Range {\n  constructor(start, end) { this.start = start; this.end = end; }\n  [Symbol.iterator]() {\n    let current = this.start;\n    const end = this.end;\n    return { next() {\n      return current <= end\n        ? { value: current++, done: false }\n        : { done: true };\n    }};\n  }\n}\nfor (const n of new Range(1, 5)) console.log(n); // 1 2 3 4 5\n\nGlobal Symbol registry:\nconst s1 = Symbol.for('shared');\nconst s2 = Symbol.for('shared');\ns1 === s2; // true — same symbol", theory: "Symbol is the seventh primitive type, added in ES6. Every Symbol() call returns a guaranteed-unique value, even with the same description string. They're used as unique object property keys (no collision risk), for implementing well-known Symbols that customize language behavior (Symbol.iterator, Symbol.toPrimitive), and for creating private-ish class properties." },
    { q: "What are Service Workers in JavaScript?", a: "Service Workers are background scripts that run in the browser separately from the main page thread. They act as a proxy between the web app, browser, and network, enabling powerful offline and performance features.\n\nKey capabilities:\n1. Offline caching — intercept network requests and serve cached responses\n2. Background sync — defer tasks until network is available\n3. Push notifications — receive and display push messages even when app is closed\n4. Intercepting fetch requests — custom caching strategies\n\nLifecycle:\nInstall → Activate → Fetch (intercept requests)\n\nBasic example:\n// Register the service worker (in main JS):\nif ('serviceWorker' in navigator) {\n  navigator.serviceWorker.register('/sw.js')\n    .then(reg => console.log('SW registered:', reg.scope))\n    .catch(err => console.error('SW failed:', err));\n}\n\n// sw.js — the service worker file:\nconst CACHE_NAME = 'v1';\nconst ASSETS = ['/', '/index.html', '/styles.css', '/app.js'];\n\n// Install: cache core assets\nself.addEventListener('install', event => {\n  event.waitUntil(\n    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))\n  );\n});\n\n// Fetch: serve from cache, fallback to network\nself.addEventListener('fetch', event => {\n  event.respondWith(\n    caches.match(event.request)\n      .then(cached => cached || fetch(event.request))\n  );\n});\n\nImportant constraints:\n- Only works on HTTPS (or localhost)\n- Runs in a separate thread — no DOM access\n- Asynchronous only (Promises/async-await)\n- Scope-limited: a SW at /admin/sw.js only controls /admin/ routes\n\nReal-world use: Progressive Web Apps (PWAs) use service workers for offline support, fast repeat visits, and push notifications. Tools like Workbox (by Google) simplify SW caching strategies.", theory: "Service workers are Web Workers that proxy network requests. They run independently of the web page, persisting even when the page is closed. Registration scopes them to a URL path. The install event caches assets; the fetch event intercepts network requests and can respond from cache. They're the foundation of PWAs and offline-capable web apps." }
  ],
  "Advanced & Scenario": [
    { tag: "SCENARIO", q: "A colleague's code has a bug: a loop creates 5 buttons, but clicking any button always alerts '5' instead of the button's index. Explain the bug and provide three different fixes.", a: "This is the classic closure-in-loop bug:\n\nBuggy code:\nfor (var i = 0; i < 5; i++) {\n  btn.addEventListener('click', function() {\n    alert(i); // always alerts 5!\n  });\n}\n// When any button is clicked, the loop has finished and i = 5\n// All 5 closures share the SAME 'i' variable (var is function-scoped)\n\nFix 1 — Use let (simplest, modern):\nfor (let i = 0; i < 5; i++) {\n  // let creates a NEW binding for each iteration\n  btn.addEventListener('click', () => alert(i)); // alerts 0,1,2,3,4\n}\n\nFix 2 — IIFE (classic fix):\nfor (var i = 0; i < 5; i++) {\n  (function(j) {\n    btn.addEventListener('click', () => alert(j));\n  })(i); // immediately invoke, locking in current i as j\n}\n\nFix 3 — bind:\nfor (var i = 0; i < 5; i++) {\n  btn.addEventListener('click', alert.bind(null, i));\n}\n\nFix 4 — data attribute:\nfor (var i = 0; i < 5; i++) {\n  btn.dataset.index = i;\n  btn.addEventListener('click', (e) => alert(e.target.dataset.index));\n}\n\nWhy let fixes it: let is block-scoped — each loop iteration creates a new scope with its own 'i'. var is function-scoped — all iterations share the same 'i'.", theory: "Closure-in-loop is a classic JavaScript interview problem rooted in var's function scope. All loop iterations share the same variable binding — callbacks capture the variable, not its value at iteration time. The fix with let works because let creates a new binding per iteration (block scope). IIFE and bind achieve the same result more explicitly." },
    { tag: "SCENARIO", q: "You need to implement a debounce function from scratch for a search input. Explain how debouncing works and write a full implementation.", a: "Debouncing delays execution until N milliseconds after the last invocation.\n\nfunction debounce(fn, delay) {\n  let timerId = null; // [1] Closure: timerId persists between calls\n  return function(...args) {\n    clearTimeout(timerId);  // [2] Cancel any pending execution\n    timerId = setTimeout(() => {\n      timerId = null;\n      fn.apply(this, args); // [3] Call with correct 'this' and args\n    }, delay);\n  };\n}\n\nconst searchAPI = debounce(async (query) => {\n  const results = await fetch(`/search?q=${query}`);\n  renderResults(await results.json());\n}, 300);\n\ninput.addEventListener('input', (e) => searchAPI(e.target.value));\n// User types 'react hooks' (11 chars) → only 1 API call\n\nWith cancel:\nfunction debounce(fn, delay) {\n  let timerId = null;\n  const debounced = function(...args) {\n    clearTimeout(timerId);\n    timerId = setTimeout(() => { timerId = null; fn.apply(this, args); }, delay);\n  };\n  debounced.cancel = () => { clearTimeout(timerId); timerId = null; };\n  return debounced;\n}\n\nDebounce vs Throttle:\n- Debounce: waits for a PAUSE — 'call me after you stop typing'\n- Throttle: limits to once per interval — 'call me at most once per 100ms'", theory: "Debounce is implemented using closure to maintain timer state across calls. Each invocation cancels the pending timer (clearTimeout) and schedules a new one. Only when calls pause for the delay duration does the timer fire. The this context and arguments must be forwarded correctly using apply(). flush() and cancel() are production-quality additions." },
    { tag: "HARD", q: "Explain JavaScript's memory management, garbage collection, and common memory leak patterns with code examples.", a: "JavaScript uses automatic garbage collection — Mark-and-Sweep algorithm:\n1. Start from roots (global vars, call stack, active closures)\n2. Mark all reachable objects\n3. Sweep (collect) everything not marked\n\nCommon memory leak patterns:\n\n1. Accidental global variables:\nfunction leak() {\n  data = new Array(1000000); // no var/let/const → global!\n}\n// Fix: 'use strict';\n\n2. Forgotten timers:\nconst data = fetchLargeData();\nsetInterval(() => process(data), 1000); // data can't be GC'd\n// Fix: clearInterval(id) when done\n\n3. Detached DOM nodes:\nconst elements = [];\nconst div = document.createElement('div');\ndocument.body.appendChild(div);\nelements.push(div);\ndocument.body.removeChild(div); // removed from DOM\n// elements[0] still referenced → detached DOM node leak\n// Fix: elements.shift() — remove from array too\n\n4. Event listeners not removed:\nfunction setup() {\n  const handler = () => {};\n  window.addEventListener('resize', handler);\n  // If component unmounts without removeEventListener → leak\n}\n// Fix: removeEventListener in cleanup/unmount\n\nDebugging: Chrome DevTools → Memory tab → heap snapshots", theory: "JavaScript uses automatic garbage collection based on reachability. The Mark-and-Sweep algorithm starts from roots (global scope, stack), marks all reachable objects, and collects unmarked ones. Leaks occur when code unintentionally maintains references to objects that should be collectible — the GC can't distinguish intended from unintended retention." },
    { tag: "SCENARIO", q: "You're asked to implement throttle from scratch for window scroll events. How does throttle differ from debounce and how do you implement it?", a: "Throttle limits a function to fire AT MOST once per interval — unlike debounce which waits for a pause.\n\nfunction throttle(fn, limit) {\n  let lastRun = 0;\n  return function(...args) {\n    const now = Date.now();\n    if (now - lastRun >= limit) {\n      lastRun = now;\n      fn.apply(this, args);\n    }\n  };\n}\n\nconst handleScroll = throttle(() => {\n  updateProgressBar(window.scrollY);\n}, 100); // execute at most once per 100ms\n\nwindow.addEventListener('scroll', handleScroll);\n\nWith trailing edge (runs once after final call too):\nfunction throttle(fn, limit) {\n  let lastRun = 0;\n  let timerId = null;\n  return function(...args) {\n    const now = Date.now();\n    const remaining = limit - (now - lastRun);\n    if (remaining <= 0) {\n      clearTimeout(timerId);\n      lastRun = now;\n      fn.apply(this, args);\n    } else if (!timerId) {\n      timerId = setTimeout(() => {\n        lastRun = Date.now();\n        timerId = null;\n        fn.apply(this, args);\n      }, remaining);\n    }\n  };\n}\n\nDebounce vs Throttle:\n- Search input: debounce (wait for pause)\n- Scroll handler: throttle (regular updates while scrolling)\n- Window resize: debounce (final size)\n- Button rate-limit: throttle (prevent double-submit)", theory: "Throttling enforces a minimum interval between function calls by tracking the timestamp of the last execution. Unlike debounce (which waits for a pause), throttle fires on the leading edge and enforces spacing. A timer for the trailing edge ensures the last call always executes after the throttle period, preventing missed final values." },
    { tag: "HARD", q: "Explain prototypal inheritance vs classical inheritance. How do ES6 classes work under the hood?", a: "Classical inheritance (Java, C++): classes are blueprints, instances copy methods.\nPrototypal inheritance (JavaScript): objects inherit directly from other objects through the prototype chain.\n\nES6 classes are SYNTACTIC SUGAR over prototypes:\n\n// ES6 class:\nclass Animal {\n  constructor(name) { this.name = name; }\n  speak() { return `${this.name} makes a sound`; }\n}\nclass Dog extends Animal {\n  speak() { return `${this.name} barks`; }\n}\n\n// What JavaScript actually creates:\nfunction Animal(name) { this.name = name; }\nAnimal.prototype.speak = function() { return `${this.name} makes a sound`; };\n\nfunction Dog(name) { Animal.call(this, name); } // super()\nDog.prototype = Object.create(Animal.prototype); // extends\nDog.prototype.constructor = Dog;\nDog.prototype.speak = function() { return `${this.name} barks`; };\n\n// Prototype chain:\n// dog → Dog.prototype → Animal.prototype → Object.prototype → null\n\nKey differences from classical:\n1. Prototype chain lookup is dynamic at runtime\n2. Can modify prototypes at runtime — all instances affected immediately\n3. 'new' does 4 things: creates empty object, sets [[Prototype]], calls constructor, returns this\n\nClass features not in desugared form:\n- Private fields (#field) — genuinely private\n- Static blocks\n- Class field initializers", theory: "JavaScript has always been prototype-based — ES6 classes are syntactic sugar that creates the same prototype chain using friendlier syntax. In classical inheritance (Java/C++), methods are copied to subclasses. In prototypal inheritance, objects link to prototype objects and method lookup traverses the chain dynamically at runtime." },
    { tag: "SCENARIO", q: "Implement retry logic with exponential backoff in JavaScript for unreliable API calls.", a: "Exponential backoff: retry with increasing delays (500ms → 1s → 2s → 4s) to avoid hammering a struggling service.\n\nasync function withRetry(fn, options = {}) {\n  const {\n    maxRetries = 3,\n    baseDelay = 1000,\n    factor = 2,\n    shouldRetry = () => true,\n  } = options;\n\n  for (let attempt = 0; attempt <= maxRetries; attempt++) {\n    try {\n      return await fn();\n    } catch (err) {\n      if (!shouldRetry(err) || attempt === maxRetries) throw err;\n\n      // Exponential backoff with jitter (random delay to prevent thundering herd)\n      const delay = baseDelay * Math.pow(factor, attempt)\n        + Math.random() * 100;\n\n      console.log(`Attempt ${attempt + 1} failed. Retrying in ${Math.round(delay)}ms...`);\n      await new Promise(resolve => setTimeout(resolve, delay));\n    }\n  }\n}\n\n// Usage:\nconst data = await withRetry(\n  () => fetch('/api/endpoint').then(r => {\n    if (!r.ok) throw Object.assign(new Error('HTTP error'), { status: r.status });\n    return r.json();\n  }),\n  {\n    maxRetries: 4,\n    baseDelay: 500,\n    // Don't retry client errors (400-499) — only server errors\n    shouldRetry: (err) => !err.status || err.status >= 500,\n  }\n);\n// Delays: 500ms, 1000ms, 2000ms, 4000ms\n\nJitter prevents 'thundering herd': all clients retrying in sync amplifies load on the server. Random jitter spreads retries out.", theory: "Exponential backoff prevents thundering herd — all clients retrying simultaneously amplifying load on a struggling server. The wait time doubles after each failure: 1s, 2s, 4s, 8s... Jitter (random variance) staggers retries across multiple clients. shouldRetry() predicate distinguishes transient errors (worth retrying) from permanent errors (don't retry)." },
    { tag: "HARD", q: "What is the JavaScript event loop? Explain with detailed execution trace of a complex async example.", a: "Components:\n- Call Stack: synchronous code (LIFO)\n- Web APIs: handle async ops (setTimeout, fetch, DOM events)\n- Microtask Queue: Promise callbacks, queueMicrotask\n- Macrotask Queue: setTimeout, setInterval, I/O\n\nProcessing order:\n1. Run synchronous code\n2. Drain entire microtask queue\n3. Run ONE macrotask\n4. Drain microtask queue again\n5. Repeat\n\nDetailed trace:\nconsole.log('A'); // sync\n\nsetTimeout(() => console.log('B'), 0); // macrotask\nsetTimeout(() => console.log('C'), 0); // macrotask\n\nPromise.resolve()\n  .then(() => {\n    console.log('D'); // microtask\n    Promise.resolve().then(() => console.log('E')); // nested microtask\n  })\n  .then(() => console.log('F')); // microtask\n\nconsole.log('G'); // sync\n\n// Output: A → G → D → E → F → B → C\n// A, G: synchronous\n// D: first microtask\n// E: nested microtask — runs before next macrotask\n// F: chained microtask\n// B, C: macrotasks, one per iteration\n\nKey insight: entire microtask queue drains between macrotasks. A nested Promise.resolve inside a .then() still runs before any setTimeout — even setTimeout 0.", theory: "The JavaScript runtime has a call stack, Web APIs, microtask queue, and macrotask queue. Synchronous code runs on the stack. When empty, the event loop first drains all microtasks (Promises), then runs one macrotask (setTimeout), then drains microtasks again. This interleaving ensures Promises resolve predictably relative to timers." },
    { tag: "SCENARIO", q: "Implement pipe() and compose() functions for functional programming. Show real-world usage.", a: "Pipe and compose chain transformations. Pipe is left-to-right, compose is right-to-left.\n\n// pipe: f1 → f2 → f3 (data flows left to right)\nconst pipe = (...fns) => (value) => fns.reduce((v, fn) => fn(v), value);\n\n// compose: f3 ← f2 ← f1 (mathematical notation)\nconst compose = (...fns) => (value) => fns.reduceRight((v, fn) => fn(v), value);\n\n// Utilities:\nconst trim       = str => str.trim();\nconst lower      = str => str.toLowerCase();\nconst slugify    = str => str.replace(/\\s+/g, '-');\nconst addPrefix  = pre => str => `${pre}-${str}`;\nconst truncate   = n => str => str.slice(0, n);\n\n// pipe — reads like a recipe:\nconst createSlug = pipe(trim, lower, slugify, addPrefix('post'), truncate(30));\ncreateSlug('  Hello World  '); // 'post-hello-world'\n\n// Same with compose — reversed reading order:\nconst createSlugC = compose(truncate(30), addPrefix('post'), slugify, lower, trim);\n\n// Async pipe:\nconst pipeAsync = (...fns) => (v) =>\n  fns.reduce((p, fn) => p.then(fn), Promise.resolve(v));\n\nconst processUser = pipeAsync(fetchUser, validateUser, enrichData, saveToDatabase);\nawait processUser(userId);\n\nWhy pipe/compose:\n- Replaces deeply nested function calls: fn3(fn2(fn1(x)))\n- Self-documenting: the pipeline IS the documentation\n- Reusable: swap individual functions easily", theory: "Pipe and compose implement function composition — a mathematical concept from category theory. They transform nested function calls f(g(h(x))) into readable pipelines. Pipe applies left-to-right (natural reading order), compose right-to-left (mathematical notation). Both use reduce/reduceRight to chain function application." },
    { tag: "SCENARIO", q: "A junior developer asks: why does 'this' behave differently in JavaScript? Explain all 4 binding rules with examples.", a: "'this' is determined by HOW a function is called, not where it's defined. 4 rules in priority order:\n\n1. new binding (highest priority):\nfunction Person(name) {\n  this.name = name; // 'this' = new object being created\n}\nconst alice = new Person('Alice');\n\n2. Explicit binding (call/apply/bind):\nfunction greet() { return `Hello, ${this.name}`; }\nconst user = { name: 'Bob' };\ngreet.call(user);           // 'Hello, Bob'\nconst bound = greet.bind(user);\nbound();                    // 'Hello, Bob'\n\n3. Implicit binding:\nconst obj = {\n  name: 'Carol',\n  greet() { return `Hello, ${this.name}`; }\n};\nobj.greet(); // 'Hello, Carol' — this = obj (before the dot)\n\n// Lost when extracted:\nconst fn = obj.greet;\nfn(); // 'Hello, undefined' — no object before dot\n\n4. Default binding (lowest):\nfunction show() { console.log(this); }\nshow(); // window (browser) or global (Node) — undefined in strict mode\n\nArrow functions — NO 'this' binding:\nArrows inherit 'this' from the enclosing scope at DEFINITION time.\n\nconst obj = {\n  name: 'Dave',\n  arrowMethod: function() {\n    setTimeout(() => {\n      console.log(this.name); // 'Dave' — arrow inherits from arrowMethod\n    }, 100);\n  }\n};\n\nCommon mistake:\nconst counter = {\n  count: 0,\n  // ✗ Arrow: 'this' is window\n  increment: () => { this.count++; },\n  // ✓ Regular function: 'this' = counter\n  increment: function() { this.count++; }\n};", theory: "'this' is one of JavaScript's most misunderstood features. Unlike most languages where 'this' is lexically bound, JavaScript's 'this' is dynamically bound at call time. Four binding rules determine its value with strict priority. Arrow functions are the exception — they capture 'this' from their lexical environment at definition time." },
    { tag: "HARD", q: "Implement a custom Promise class from scratch showing internal states and how chaining works.", a: "class MyPromise {\n  static PENDING   = 'pending';\n  static FULFILLED = 'fulfilled';\n  static REJECTED  = 'rejected';\n\n  constructor(executor) {\n    this.state = MyPromise.PENDING;\n    this.value = undefined;\n    this.onFulfilledCallbacks = [];\n    this.onRejectedCallbacks  = [];\n\n    const resolve = (value) => {\n      if (this.state !== MyPromise.PENDING) return; // immutable once set\n      this.state = MyPromise.FULFILLED;\n      this.value = value;\n      this.onFulfilledCallbacks.forEach(fn => fn(value));\n    };\n\n    const reject = (reason) => {\n      if (this.state !== MyPromise.PENDING) return;\n      this.state = MyPromise.REJECTED;\n      this.reason = reason;\n      this.onRejectedCallbacks.forEach(fn => fn(reason));\n    };\n\n    try { executor(resolve, reject); }\n    catch (err) { reject(err); }\n  }\n\n  then(onFulfilled, onRejected) {\n    // Returns NEW promise — this is how chaining works\n    return new MyPromise((resolve, reject) => {\n      const handle = (value) => {\n        try {\n          const result = typeof onFulfilled === 'function'\n            ? onFulfilled(value)\n            : value;\n          resolve(result);\n        } catch (err) { reject(err); } // throw in .then → reject chain\n      };\n\n      // Always run async (microtask) — even if already resolved\n      if (this.state === MyPromise.FULFILLED)\n        queueMicrotask(() => handle(this.value));\n      else if (this.state === MyPromise.PENDING)\n        this.onFulfilledCallbacks.push(() => queueMicrotask(() => handle(this.value)));\n    });\n  }\n\n  catch(fn) { return this.then(undefined, fn); } // catch = then with no fulfillment\n  static resolve(v) { return new MyPromise(r => r(v)); }\n  static reject(r)  { return new MyPromise((_, rej) => rej(r)); }\n}\n\nKey insights:\n- Immutability: once resolved/rejected, state never changes\n- Chaining: .then() returns NEW promise, resolved with handler's return value\n- Async: handlers always run asynchronously via queueMicrotask\n- catch(fn) === then(undefined, fn) — just syntactic convenience", theory: "Building a Promise reveals how they work: three immutable states, a queue of callbacks for multiple .then() calls, and microtask scheduling for async behavior. Chaining works by .then() returning a NEW Promise resolved with the handler's return value. Throwing in a handler rejects the chained Promise, enabling error propagation through the chain." },
    { tag: "SCENARIO", q: "What is layout thrashing in JavaScript and how do you fix it?", a: "Layout thrashing is when JS alternates between reading and writing DOM layout properties, forcing the browser to recalculate layout repeatedly.\n\nBAD — thrashing:\nconst boxes = document.querySelectorAll('.box');\nboxes.forEach(box => {\n  const width = box.offsetWidth;     // READ — forces layout\n  box.style.width = (width * 2) + 'px'; // WRITE — invalidates layout\n  const newWidth = box.offsetWidth;  // READ — forces layout AGAIN\n});\n// 100 boxes → 200 forced layout calculations!\n\nFIX — Batch reads before writes:\nconst widths = [...boxes].map(box => box.offsetWidth); // all reads\nboxes.forEach((box, i) => { box.style.width = widths[i] * 2 + 'px'; }); // all writes\n// Only 2 layout calculations total\n\nBETTER — requestAnimationFrame:\nrequestAnimationFrame(() => {\n  const widths = [...boxes].map(b => b.offsetWidth); // read\n  requestAnimationFrame(() => {\n    boxes.forEach((b, i) => { b.style.width = widths[i] * 2 + 'px'; }); // write\n  });\n});\n\nBEST — CSS transforms (avoid layout entirely):\nbox.style.width = '200px';     // triggers layout (expensive)\nbox.style.transform = 'scale(2)'; // only composite — no layout, no paint\n\nLayout properties that trigger reflow: offsetHeight, getBoundingClientRect, scrollTop, clientWidth.\nTools: Chrome DevTools → Performance tab → 'Forced reflow' warnings in yellow.", theory: "Layout thrashing (forced synchronous layout) is a browser performance anti-pattern. Reading layout properties (offsetWidth, getBoundingClientRect) after DOM mutations forces the browser to immediately recalculate layout, bypassing its batching optimization. The fix: batch all reads before any writes, or use requestAnimationFrame to separate read/write phases." },
    { tag: "HARD", q: "What is the difference between compile time and runtime errors in JavaScript? How do you handle both systematically?", a: "Compile-time equivalent (parse errors — before execution):\nconst x = { // SyntaxError: missing closing brace\n// Entire script fails to parse — nothing runs\n\nRuntime error types:\n- ReferenceError: accessing undeclared variable\n- TypeError: wrong type operation (null.toString(), undefined())\n- RangeError: value out of range (new Array(-1))\n- URIError: malformed URI (decodeURIComponent('%'))\n\nHandling strategy for large applications:\n\n1. TypeScript — catch type errors before runtime:\nfunction add(a: number, b: number): number { return a + b; }\nadd('hello', 5); // TS error at compile time\n\n2. Global error handlers:\nwindow.onerror = (msg, src, line, col, err) => { logToService(err); };\nwindow.addEventListener('unhandledrejection', e => { logToService(e.reason); });\n\n3. Custom error classes:\nclass AppError extends Error {\n  constructor(message, code, isOperational = true) {\n    super(message);\n    this.code = code;\n    this.isOperational = isOperational;\n    // Operational: user not found → handle gracefully\n    // Programming: null deref → alert dev team\n  }\n}\n\n4. Error monitoring: Sentry, Datadog, Bugsnag\n   - Capture stack traces in production\n   - Alert on new/spike errors\n\n5. Defensive patterns:\nconst city = user?.address?.city;\nconst name = input ?? 'Anonymous';\nif (typeof value === 'string') value.toUpperCase();", theory: "Service workers run in a separate browser thread with access to the Cache API and Fetch API but no DOM access. They act as a programmable network proxy — intercepting fetch requests and responding from cache or network based on custom strategies. They're the core technology behind Progressive Web Apps (PWAs)." }
  ]
  },
  "Express.js": {
    Beginner: [
    { q: "What is Express.js and why is it used?", a: "Express.js is a minimal, unopinionated web application framework for Node.js. It provides a thin layer of fundamental web application features without obscuring the core Node.js functionality.\n\nWhy Express is used:\n1. Simplicity: build HTTP servers with very little code\n2. Routing: clean, declarative route handling\n3. Middleware: composable request/response pipeline\n4. Performance: thin wrapper over Node.js HTTP — very fast\n5. Ecosystem: massive npm ecosystem of Express middleware\n\nMinimal Express app:\nconst express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Hello World!');\n});\n\napp.listen(3000, () => {\n  console.log('Server running on port 3000');\n});\n\nExpress vs raw Node.js http:\n// Raw Node.js — verbose:\nconst http = require('http');\nhttp.createServer((req, res) => {\n  if (req.url === '/' && req.method === 'GET') {\n    res.writeHead(200, { 'Content-Type': 'text/plain' });\n    res.end('Hello World');\n  }\n}).listen(3000);\n\n// Express — clean:\napp.get('/', (req, res) => res.send('Hello World'));\n\nWhat Express adds:\n- Router with pattern matching and params\n- Middleware pipeline (app.use)\n- res.json(), res.send(), res.redirect() helpers\n- Static file serving\n- Template engine integration", theory: "Express.js is a minimal web framework for Node.js that adds routing, middleware, and HTTP utilities without imposing structure. It follows the middleware pipeline pattern where each request passes through a chain of functions. Express is 'unopinionated' — it doesn't prescribe how to organize code, databases, or templates." },
    { q: "What is middleware in Express.js?", a: "Middleware are functions that have access to the request (req), response (res), and the next middleware function in the cycle. They form a pipeline — each middleware can: modify req/res, end the request, or call next() to pass to the next middleware.\n\nMiddleware signature:\nfunction myMiddleware(req, res, next) {\n  // Do something with req or res\n  next(); // Pass control to next middleware\n}\n\nTypes of middleware:\n\n1. Application-level: app.use() — runs for all routes\napp.use(express.json()); // parse JSON bodies for ALL routes\n\n2. Route-level: runs for specific routes\napp.use('/admin', adminAuthMiddleware);\n\n3. Error-handling: 4 parameters (err, req, res, next)\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({ error: err.message });\n});\n\n4. Third-party: installed from npm\napp.use(cors());\napp.use(helmet());\napp.use(morgan('dev'));\n\n5. Built-in:\napp.use(express.json());           // parse JSON\napp.use(express.urlencoded({ extended: true })); // parse form data\napp.use(express.static('public')); // serve static files\n\nMiddleware execution order matters:\napp.use(logger);       // 1st\napp.use(authenticate); // 2nd — can block if auth fails\napp.use(rateLimit);    // 3rd\napp.get('/data', handler); // 4th — only runs if all above called next()\n\nKey rule: always call next() unless you're ending the request with res.send/json/end.", theory: "Express middleware implements the Chain of Responsibility design pattern. Each function in the pipeline receives req, res, and next. It can handle the request (res.send/json), pass to the next handler (next()), or skip to error handling (next(err)). Registration order determines execution order." },
    { q: "How does routing work in Express.js?", a: "Routing refers to how the application responds to client requests for specific endpoints (URI paths) with specific HTTP methods.\n\nBasic routing syntax:\napp.METHOD(PATH, HANDLER)\n// METHOD = get, post, put, patch, delete, all\n// PATH = string, pattern, or regex\n// HANDLER = function(req, res, next)\n\nHTTP methods:\napp.get('/users', (req, res) => res.json(users));\napp.post('/users', (req, res) => createUser(req.body));\napp.put('/users/:id', (req, res) => replaceUser(req.params.id));\napp.patch('/users/:id', (req, res) => updateUser(req.params.id));\napp.delete('/users/:id', (req, res) => deleteUser(req.params.id));\napp.all('/users', handler); // responds to ALL HTTP methods\n\nRoute parameters:\napp.get('/users/:id', (req, res) => {\n  const { id } = req.params; // URL: /users/42 → id = '42'\n  res.json({ userId: id });\n});\n\n// Multiple params:\napp.get('/posts/:year/:month', (req, res) => {\n  const { year, month } = req.params;\n});\n\nQuery strings:\napp.get('/search', (req, res) => {\n  const { q, page = 1 } = req.query; // URL: /search?q=express&page=2\n});\n\nRoute patterns:\napp.get('/ab?cd', handler);   // matches /acd and /abcd\napp.get('/ab+cd', handler);   // matches /abcd, /abbcd, etc.\napp.get(/\\/api\\/v[0-9]+/, handler); // regex\n\nExpress Router (modular routing):\nconst router = express.Router();\nrouter.get('/', getAllUsers);\nrouter.post('/', createUser);\nrouter.get('/:id', getUserById);\napp.use('/api/users', router); // mount at /api/users", theory: "Express routes are matched against the request method and URL path. Route parameters (:id) extract dynamic values from the URL path. Query strings are parsed from the URL and available on req.query. The Router class creates modular mini-applications that can be mounted at any base path." },
    { q: "What is the difference between app.use() and app.get()?", a: "app.use(): mounts middleware for ALL HTTP methods at a path (or all paths if no path given). It matches any request that STARTS with the given path.\n\napp.get(): registers a route handler for GET requests ONLY. It matches the EXACT path.\n\napp.use() — matches prefix:\napp.use('/api', router); // matches /api, /api/users, /api/products/123\n\napp.get() — exact match:\napp.get('/api', handler); // only matches exactly /api (not /api/users)\n\nExamples:\n// Middleware for ALL routes, ALL methods:\napp.use((req, res, next) => {\n  console.log(`${req.method} ${req.url}`);\n  next();\n});\n\n// Middleware for all routes under /admin:\napp.use('/admin', authenticate);\n\n// Route handler for GET /users only:\napp.get('/users', getUsers);\n\n// Route handler for POST /users only:\napp.post('/users', createUser);\n\nKey differences table:\n| Feature         | app.use()          | app.get()         |\n|-----------------|--------------------|-----------------|\n| HTTP methods    | All                | GET only         |\n| Path matching   | Prefix             | Exact            |\n| Use case        | Middleware         | Route handler    |\n| next() required | Usually            | Optional         |\n\nOrder matters: app.use() and app.get() are processed in the order they're defined. Place general middleware before specific routes.", theory: "app.use() registers middleware using prefix matching — it matches any request whose URL starts with the specified path. app.get() registers a route handler using exact matching for GET requests only. Middleware applies to all matching routes below it in the chain; routes apply to specific endpoints." },
    { q: "How do you handle request and response objects in Express?", a: "The req (request) and res (response) objects are enhanced versions of Node's built-in HTTP objects with additional properties and methods.\n\nRequest object (req) — incoming data:\n// URL and routing\nreq.params    // { id: '42' } — route parameters (:id)\nreq.query     // { page: '2', q: 'express' } — query string\nreq.body      // { name: 'Alice' } — request body (needs body parser)\nreq.path      // '/api/users'\nreq.url       // '/api/users?page=2'\nreq.method    // 'GET', 'POST', etc.\nreq.headers   // { 'content-type': 'application/json', ... }\nreq.cookies   // { sessionId: 'abc' } — needs cookie-parser\nreq.ip        // Client IP address\nreq.hostname  // 'example.com'\n\n// Useful methods:\nreq.get('Authorization') // get specific header\nreq.is('application/json') // check content type\n\nResponse object (res) — sending data:\n// Common response methods:\nres.json({ user: 'Alice' });         // JSON response, sets Content-Type\nres.send('Hello');                    // string/buffer/object\nres.status(404).json({ error: 'Not found' }); // chain status\nres.sendStatus(204);                  // status + default message\nres.redirect(301, '/new-url');        // redirect\nres.sendFile('/path/to/file.pdf');    // send a file\nres.download('/path/to/report.pdf'); // trigger download\nres.render('index', { title: 'Home' }); // template rendering\n\n// Setting headers:\nres.set('Cache-Control', 'no-cache');\nres.set({ 'X-Custom': 'value', 'Content-Language': 'en' });\n\n// Cookies:\nres.cookie('token', 'abc123', { httpOnly: true, maxAge: 3600000 });\nres.clearCookie('token');\n\nImportant: only ONE response can be sent per request. Calling res.json() after res.send() throws 'Cannot set headers after they are sent'.", theory: "req and res are augmented versions of Node's http.IncomingMessage and http.ServerResponse. Express adds convenience properties (req.params, req.query, req.body) and methods (res.json(), res.send(), res.redirect()). One response per request — calling res.json() after res.send() throws a 'headers already sent' error." },
    { q: "What is Express Router and why use it?", a: "Express Router is a mini-application that handles middleware and routing independently, allowing you to organize routes into separate files instead of stuffing everything into app.js.\n\nCreating a Router:\n// routes/users.js\nconst express = require('express');\nconst router = express.Router();\n\n// Routes are relative to the mount point\nrouter.get('/', getAllUsers);           // GET /api/users\nrouter.post('/', createUser);           // POST /api/users\nrouter.get('/:id', getUserById);       // GET /api/users/42\nrouter.put('/:id', updateUser);        // PUT /api/users/42\nrouter.delete('/:id', deleteUser);     // DELETE /api/users/42\n\nmodule.exports = router;\n\n// app.js — mount the router:\nconst userRouter = require('./routes/users');\nconst postRouter = require('./routes/posts');\n\napp.use('/api/users', userRouter);\napp.use('/api/posts', postRouter);\n\nRouter-level middleware:\n// Apply to all routes within this router:\nrouter.use(authenticate); // all user routes require auth\n\n// Apply to one route:\nrouter.get('/admin', authorize('admin'), adminHandler);\n\nNested routers:\nconst orderRouter = express.Router({ mergeParams: true });\n// mergeParams: access parent params in child router\norderRouter.get('/', (req, res) => {\n  const { userId } = req.params; // from parent /users/:userId\n});\nrouter.use('/:userId/orders', orderRouter);\n\nWhy use Router:\n1. Separation of concerns — each feature has its own file\n2. Reusability — mount the same router at multiple paths\n3. Maintainability — easy to find and modify specific routes\n4. Team collaboration — different devs work on different route files", theory: "Express Router creates mini-Express applications with their own middleware and routes. Routers are mounted using app.use() at a base path, with all router paths being relative to that base. This enables feature-based code organization, reducing app.js to just mounting routers at their respective base paths." },
    { q: "How do you parse request bodies in Express?", a: "By default, Express does not parse request bodies — you need middleware to handle it.\n\nJSON bodies (most common for REST APIs):\napp.use(express.json());\n// Content-Type: application/json\n// Now req.body = { name: 'Alice', age: 30 }\n\napp.post('/users', (req, res) => {\n  const { name, age } = req.body;\n  res.status(201).json({ created: { name, age } });\n});\n\nURL-encoded form data:\napp.use(express.urlencoded({ extended: true }));\n// Content-Type: application/x-www-form-urlencoded\n// extended: true uses qs library (supports nested objects)\n// extended: false uses built-in querystring (flat only)\n\nRaw/text bodies:\napp.use(express.raw());  // Buffer\napp.use(express.text()); // plain text string\n\nFile uploads:\n// Built-in express doesn't handle multipart/form-data\n// Use multer:\nconst multer = require('multer');\nconst upload = multer({ dest: 'uploads/' });\n\napp.post('/upload', upload.single('photo'), (req, res) => {\n  console.log(req.file);  // file info\n  console.log(req.body);  // other form fields\n});\n\nLimit body size (security):\napp.use(express.json({ limit: '10kb' })); // reject bodies > 10kb\n\nOld way (Express 3): separate body-parser package\nconst bodyParser = require('body-parser');\napp.use(bodyParser.json());\n// express.json() is body-parser bundled into Express 4.16+", theory: "HTTP request bodies arrive as raw byte streams with a Content-Type header indicating encoding. Body-parsing middleware reads the stream, parses according to Content-Type, and populates req.body. Different encodings need different parsers: JSON needs express.json(), forms need express.urlencoded(), files need multer." },
    { q: "What is the purpose of next() in Express middleware?", a: "next() is a function that passes control to the NEXT middleware or route handler in the pipeline. Without calling next(), the request hangs — no response is sent and the next middleware never runs.\n\nBasic usage:\napp.use((req, res, next) => {\n  console.log('Middleware 1');\n  next(); // → passes to Middleware 2\n});\n\napp.use((req, res, next) => {\n  console.log('Middleware 2');\n  next(); // → passes to the route handler\n});\n\napp.get('/', (req, res) => {\n  res.send('Response');\n});\n\nSkipping to error handler with next(err):\napp.use(async (req, res, next) => {\n  try {\n    const data = await fetchData();\n    req.data = data;\n    next(); // all good → continue\n  } catch (err) {\n    next(err); // pass error → jumps to error-handling middleware\n  }\n});\n\n// Error handler (4 params):\napp.use((err, req, res, next) => {\n  res.status(500).json({ error: err.message });\n});\n\nnext('route') — skip remaining handlers for current route:\nrouter.get('/user/:id',\n  (req, res, next) => {\n    if (req.params.id === '0') next('route'); // skip to next route definition\n    else next();\n  },\n  (req, res) => res.json({ user: 'regular' })\n);\nrouter.get('/user/:id', (req, res) => res.json({ user: 'special' }));\n\nCommon next() mistakes:\n// ✗ Calling next() after res.send() — response already sent\nres.send('OK');\nnext(); // Headers already sent error\n\n// ✗ Forgetting next() — request hangs indefinitely\napp.use((req, res, next) => {\n  console.log('Logging...');\n  // next() missing — request never proceeds", theory: "next() is Express's mechanism for chaining middleware. Without it, requests hang indefinitely. next() with no argument passes to the next regular middleware/route. next(error) jumps directly to the 4-parameter error handler, bypassing all remaining normal middleware. next('route') skips remaining handlers for the current route." },
    { q: "How do you handle errors in Express.js?", a: "Express has a built-in error-handling mechanism: any middleware with 4 parameters (err, req, res, next) is an error-handling middleware.\n\nThrowing errors in route handlers:\n// Synchronous — Express catches automatically in routes\napp.get('/users/:id', (req, res) => {\n  if (!req.params.id) throw new Error('ID required');\n  // Express 5 also catches async throws automatically\n});\n\n// Async — must call next(err) manually in Express 4:\napp.get('/users/:id', async (req, res, next) => {\n  try {\n    const user = await User.findById(req.params.id);\n    if (!user) return res.status(404).json({ error: 'Not found' });\n    res.json(user);\n  } catch (err) {\n    next(err); // forwards to error handler\n  }\n});\n\nCentralized error handler (define LAST):\nclass AppError extends Error {\n  constructor(message, statusCode) {\n    super(message);\n    this.statusCode = statusCode;\n    this.isOperational = true;\n  }\n}\n\n// Error-handling middleware — must have exactly 4 params:\napp.use((err, req, res, next) => {\n  const statusCode = err.statusCode || 500;\n  const message = err.isOperational\n    ? err.message\n    : 'Something went wrong'; // hide internal errors in production\n\n  res.status(statusCode).json({\n    status: 'error',\n    message,\n    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })\n  });\n});\n\n// Usage:\napp.get('/item/:id', (req, res, next) => {\n  const item = items.find(i => i.id === req.params.id);\n  if (!item) return next(new AppError('Item not found', 404));\n  res.json(item);\n});\n\nUnhandled 404 (place before error handler):\napp.use((req, res, next) => {\n  next(new AppError(`Route ${req.originalUrl} not found`, 404));\n});", theory: "Express identifies error-handling middleware by its 4-parameter signature (err, req, res, next). Errors are forwarded via next(err) from any middleware or route. Centralized error handling separates error processing from business logic. Custom error classes with statusCode and isOperational properties enable structured error responses." },
    { q: "How do you serve static files in Express?", a: "Express has a built-in middleware express.static() for serving static files like HTML, CSS, images, and JavaScript.\n\nBasic usage:\napp.use(express.static('public'));\n// Files in /public folder are served at root:\n// public/index.html → http://localhost:3000/index.html\n// public/css/style.css → http://localhost:3000/css/style.css\n// public/images/logo.png → http://localhost:3000/images/logo.png\n\nWith a virtual path prefix:\napp.use('/static', express.static('public'));\n// public/index.html → http://localhost:3000/static/index.html\n\nAbsolute path (recommended — works regardless of where you start Node):\nconst path = require('path');\napp.use(express.static(path.join(__dirname, 'public')));\n\nOptions:\napp.use(express.static('public', {\n  maxAge: '1d',          // Cache for 1 day\n  etag: true,            // Enable ETag headers for caching\n  index: 'index.html',  // Default file to serve\n  dotfiles: 'deny',     // Deny access to .env, .git etc.\n  extensions: ['html'],  // Try /about → /about.html if no extension\n}));\n\nMultiple static directories:\napp.use(express.static('public'));\napp.use(express.static('files'));\n// Express checks each directory in order\n\nServing a Single Page App (React/Vue build):\napp.use(express.static(path.join(__dirname, 'client/build')));\n\n// Fallback — all unknown routes → index.html (SPA routing)\napp.get('*', (req, res) => {\n  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));\n});", theory: "express.static() is a built-in middleware that serves files from a directory using Node's fs module. It automatically sets Content-Type headers based on file extension, handles ETags for caching, and supports conditional requests (If-None-Match). For SPAs, a catch-all route serves index.html for client-side routing." },
    { q: "What is CORS and how do you enable it in Express?", a: "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts web pages from making requests to a different domain than the one that served the page.\n\nSame-origin policy: browser blocks a page at http://myapp.com from fetching http://api.differentdomain.com unless the server explicitly allows it.\n\nSimple manual CORS headers:\napp.use((req, res, next) => {\n  res.header('Access-Control-Allow-Origin', '*'); // allow all origins\n  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');\n  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');\n  if (req.method === 'OPTIONS') return res.sendStatus(200); // preflight\n  next();\n});\n\nUsing the cors package (recommended):\nnpm install cors\n\nconst cors = require('cors');\n\n// Allow all origins:\napp.use(cors());\n\n// Specific origin:\napp.use(cors({\n  origin: 'https://myfrontend.com',\n  methods: ['GET', 'POST', 'PUT', 'DELETE'],\n  allowedHeaders: ['Content-Type', 'Authorization'],\n  credentials: true, // allow cookies/auth headers\n}));\n\n// Dynamic origins (whitelist):\nconst allowedOrigins = ['https://app.com', 'https://admin.app.com'];\napp.use(cors({\n  origin: (origin, callback) => {\n    if (!origin || allowedOrigins.includes(origin)) {\n      callback(null, true);\n    } else {\n      callback(new Error('Not allowed by CORS'));\n    }\n  },\n  credentials: true\n}));\n\n// Enable CORS for specific route only:\napp.get('/public-data', cors(), (req, res) => res.json({ data: 'public' }));\n\nPreflight requests: browsers send OPTIONS request first for non-simple requests (DELETE, PUT, custom headers). Express cors() handles this automatically.", theory: "CORS is a browser security feature enforced client-side — browsers check server headers to allow cross-origin requests. Simple requests (GET, HEAD, POST with standard headers) require no preflight. Complex requests trigger an OPTIONS preflight that the server must respond to correctly before the actual request is sent." },
    { q: "How do environment variables work in Express?", a: "Environment variables are key-value pairs set outside the application — in the OS, CI/CD, or a .env file — used to configure the app without hardcoding sensitive values.\n\nAccessing environment variables:\nprocess.env.NODE_ENV  // 'development' | 'production' | 'test'\nprocess.env.PORT      // '3000'\nprocess.env.DB_URL    // 'mongodb://localhost:27017/mydb'\nprocess.env.JWT_SECRET // 'supersecretkey'\n\nUsing dotenv (standard approach):\nnpm install dotenv\n\n// .env file (NEVER commit to git — add to .gitignore):\nPORT=3000\nDB_URL=mongodb://localhost:27017/mydb\nJWT_SECRET=mysecretkey123\nNODE_ENV=development\n\n// app.js — load as early as possible:\nrequire('dotenv').config();\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\n// Using in routes:\napp.get('/config', (req, res) => {\n  res.json({ env: process.env.NODE_ENV }); // safe to expose\n  // NEVER expose secrets: JWT_SECRET, DB credentials, API keys\n});\n\nConfig pattern (centralize all env vars):\n// config/index.js:\nrequire('dotenv').config();\n\nmodule.exports = {\n  port: parseInt(process.env.PORT) || 3000,\n  nodeEnv: process.env.NODE_ENV || 'development',\n  db: { url: process.env.DB_URL },\n  jwt: { secret: process.env.JWT_SECRET, expiresIn: '7d' },\n};\n\nBest practices:\n- .env for local development, .env.example as template (committed)\n- Use different .env files for environments: .env.test, .env.production\n- In production: set vars in the hosting platform (Heroku Config Vars, AWS Secrets Manager)\n- Validate required env vars at startup and crash early if missing", theory: "Environment variables are the 12-factor app way to configure applications across deployments without code changes. process.env holds all environment variables. dotenv loads .env files in development. Never commit .env files — use .env.example as a template. Production environments set variables directly in the deployment platform." },
    { q: "How do you connect Express with a database?", a: "Express itself doesn't include database functionality — you connect to databases using third-party libraries.\n\nWith MongoDB (Mongoose ODM):\nnpm install mongoose\n\nconst mongoose = require('mongoose');\n\n// Connect:\nasync function connectDB() {\n  await mongoose.connect(process.env.MONGO_URI, {\n    useNewUrlParser: true,\n    useUnifiedTopology: true\n  });\n  console.log('MongoDB connected');\n}\nconnectDB();\n\n// Define model:\nconst userSchema = new mongoose.Schema({\n  name: { type: String, required: true },\n  email: { type: String, required: true, unique: true },\n  createdAt: { type: Date, default: Date.now }\n});\nconst User = mongoose.model('User', userSchema);\n\n// Use in routes:\napp.get('/users', async (req, res, next) => {\n  try {\n    const users = await User.find().select('-password');\n    res.json(users);\n  } catch (err) { next(err); }\n});\n\nWith PostgreSQL (pg / Sequelize ORM):\nnpm install pg sequelize\n\nconst { Sequelize, DataTypes } = require('sequelize');\nconst sequelize = new Sequelize(process.env.DB_URL);\n\nconst User = sequelize.define('User', {\n  name: DataTypes.STRING,\n  email: { type: DataTypes.STRING, unique: true }\n});\n\napp.get('/users', async (req, res, next) => {\n  try {\n    const users = await User.findAll();\n    res.json(users);\n  } catch (err) { next(err); }\n});\n\nWith MySQL (mysql2):\nconst mysql = require('mysql2/promise');\nconst pool = mysql.createPool({ host, user, password, database });\n\napp.get('/users', async (req, res, next) => {\n  const [rows] = await pool.query('SELECT * FROM users');\n  res.json(rows);\n});", theory: "Express is database-agnostic — you choose your own database client or ORM. Database connections are established at application startup and shared across all requests via module-level variables (singleton pattern). Connection pools manage multiple simultaneous database connections efficiently." }
    ],
    Intermediate: [
    { q: "How do you implement authentication in Express using JWT?", a: "JWT (JSON Web Token) authentication involves issuing a signed token on login, then verifying it on protected routes.\n\nFlow:\n1. User logs in → server validates credentials → signs JWT → sends to client\n2. Client stores JWT (memory / HttpOnly cookie / localStorage)\n3. Client sends JWT in Authorization header for protected requests\n4. Server verifies JWT signature → grants access\n\nSetup:\nnpm install jsonwebtoken bcryptjs\n\n// Login route — issue JWT:\napp.post('/auth/login', async (req, res, next) => {\n  try {\n    const { email, password } = req.body;\n    const user = await User.findOne({ email });\n    if (!user || !await bcrypt.compare(password, user.password)) {\n      return res.status(401).json({ error: 'Invalid credentials' });\n    }\n\n    const token = jwt.sign(\n      { id: user._id, role: user.role }, // payload\n      process.env.JWT_SECRET,             // secret\n      { expiresIn: '7d' }                 // options\n    );\n\n    res.json({ token, user: { id: user._id, name: user.name } });\n  } catch (err) { next(err); }\n});\n\n// Auth middleware — protect routes:\nfunction authenticate(req, res, next) {\n  const authHeader = req.headers.authorization;\n  if (!authHeader?.startsWith('Bearer ')) {\n    return res.status(401).json({ error: 'No token provided' });\n  }\n\n  const token = authHeader.split(' ')[1];\n  try {\n    const decoded = jwt.verify(token, process.env.JWT_SECRET);\n    req.user = decoded; // attach to request\n    next();\n  } catch (err) {\n    res.status(401).json({ error: 'Invalid or expired token' });\n  }\n}\n\n// Authorization middleware:\nfunction authorize(...roles) {\n  return (req, res, next) => {\n    if (!roles.includes(req.user.role)) {\n      return res.status(403).json({ error: 'Access denied' });\n    }\n    next();\n  };\n}\n\n// Protected routes:\napp.get('/profile', authenticate, (req, res) => {\n  res.json({ user: req.user });\n});\napp.delete('/users/:id', authenticate, authorize('admin'), deleteUser);", theory: "JWT authentication is stateless — the server validates the token's signature without a database lookup. The token payload contains claims (user ID, role). Access tokens are short-lived (15min) to limit exposure. Refresh tokens are long-lived (7 days) and stored server-side to allow revocation." },
    { q: "How do you implement input validation in Express?", a: "Input validation ensures data from users is safe and correct before processing. Never trust client-side input.\n\nUsing express-validator (most popular):\nnpm install express-validator\n\nconst { body, param, query, validationResult } = require('express-validator');\n\n// Validation rules:\nconst createUserRules = [\n  body('name')\n    .trim()\n    .notEmpty().withMessage('Name is required')\n    .isLength({ min: 2, max: 50 }).withMessage('Name 2-50 chars'),\n\n  body('email')\n    .trim()\n    .isEmail().withMessage('Invalid email')\n    .normalizeEmail(),\n\n  body('age')\n    .optional()\n    .isInt({ min: 0, max: 120 }).withMessage('Age must be 0-120'),\n\n  body('password')\n    .isLength({ min: 8 }).withMessage('Password min 8 chars')\n    .matches(/[A-Z]/).withMessage('Must contain uppercase')\n    .matches(/[0-9]/).withMessage('Must contain number'),\n\n  param('id')\n    .isMongoId().withMessage('Invalid ID format'),\n];\n\n// Validation handler middleware:\nfunction validate(req, res, next) {\n  const errors = validationResult(req);\n  if (!errors.isEmpty()) {\n    return res.status(422).json({\n      errors: errors.array().map(e => ({ field: e.path, message: e.msg }))\n    });\n  }\n  next();\n}\n\n// Use in routes:\napp.post('/users', createUserRules, validate, createUserHandler);\n\nUsing Zod (TypeScript-friendly):\nconst { z } = require('zod');\n\nconst UserSchema = z.object({\n  name: z.string().min(2).max(50),\n  email: z.string().email(),\n  age: z.number().int().min(0).max(120).optional(),\n});\n\napp.post('/users', (req, res, next) => {\n  const result = UserSchema.safeParse(req.body);\n  if (!result.success) {\n    return res.status(422).json({ errors: result.error.flatten() });\n  }\n  const validatedData = result.data;\n  // proceed with validatedData\n});", theory: "Input validation is the first defense layer before data reaches business logic. express-validator provides a declarative middleware-based approach with built-in sanitizers (trim, normalizeEmail) and validators (isEmail, isLength). Validation results are checked in a separate middleware, keeping route handlers clean." },
    { q: "How does Express handle asynchronous route handlers?", a: "Express 4 does NOT automatically catch errors from async functions — you must use try/catch and pass errors to next(). Express 5 (beta) handles async automatically.\n\nExpress 4 — manual error handling:\napp.get('/users', async (req, res, next) => {\n  try {\n    const users = await User.find();\n    res.json(users);\n  } catch (err) {\n    next(err); // must call next(err) or Express won't catch it\n  }\n});\n\nasyncHandler wrapper (avoid try-catch repetition):\nconst asyncHandler = (fn) => (req, res, next) =>\n  Promise.resolve(fn(req, res, next)).catch(next);\n// OR: (fn) => (req, res, next) => fn(req, res, next).catch(next)\n\n// Now route is clean:\napp.get('/users', asyncHandler(async (req, res) => {\n  const users = await User.find();\n  res.json(users);\n}));\n\n// npm install express-async-handler — same thing from npm:\nconst asyncHandler = require('express-async-handler');\n\nExpress 5 (future):\n// Express 5 automatically catches rejected promises:\napp.get('/users', async (req, res) => {\n  const users = await User.find(); // throws → automatically caught\n  res.json(users);\n});\n\nParallel async operations:\napp.get('/dashboard', asyncHandler(async (req, res) => {\n  // Run independent queries in parallel:\n  const [users, products, orders] = await Promise.all([\n    User.find(),\n    Product.find(),\n    Order.find({ status: 'pending' })\n  ]);\n  res.json({ users, products, orders });\n}));\n\nError types to handle:\n// Database connection errors: next(err) → 500\n// Validation errors: next(err) → 422\n// Not found: next(new AppError('Not found', 404))\n// Auth errors: res.status(401).json()", theory: "Express 4 catches synchronous errors automatically but not Promise rejections from async functions. Unhandled rejections cause warnings (Node 15+: crashes). The asyncHandler wrapper converts Promise rejections into next(err) calls, bridging the async world with Express's error handling pipeline." },
    { q: "How do you implement rate limiting in Express?", a: "Rate limiting prevents abuse by limiting how many requests a client can make in a time window — protects against brute force, DDoS, and API abuse.\n\nnpm install express-rate-limit\n\nconst rateLimit = require('express-rate-limit');\n\n// Basic rate limiter:\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100,                  // max 100 requests per window\n  standardHeaders: true,     // return RateLimit-* headers\n  legacyHeaders: false,\n  message: { error: 'Too many requests, please try again later.' },\n  handler: (req, res) => {\n    res.status(429).json({ error: 'Rate limit exceeded', retryAfter: res.getHeader('Retry-After') });\n  }\n});\n\n// Apply globally:\napp.use(limiter);\n\n// Stricter for auth endpoints (brute force protection):\nconst authLimiter = rateLimit({\n  windowMs: 60 * 60 * 1000, // 1 hour\n  max: 10,                   // only 10 login attempts per hour\n  message: { error: 'Too many login attempts' }\n});\napp.post('/auth/login', authLimiter, loginHandler);\n\n// Skip rate limiting for trusted IPs:\nconst limiter = rateLimit({\n  skip: (req) => req.ip === '127.0.0.1',\n  // ...\n});\n\n// With Redis store (for multi-instance deployments):\nconst RedisStore = require('rate-limit-redis');\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 100,\n  store: new RedisStore({\n    client: redisClient,\n    prefix: 'rate_limit:'\n  })\n});\n\n// Rate limit by user (not just IP) after auth:\nconst userLimiter = rateLimit({\n  keyGenerator: (req) => req.user?.id || req.ip,\n  max: 1000,\n  windowMs: 60 * 1000\n});\napp.use('/api', authenticate, userLimiter, apiRouter);", theory: "Rate limiting tracks request frequency per identifier (IP, user ID, API key) within a sliding or fixed time window. When limits are exceeded, 429 Too Many Requests is returned. Production deployments need Redis-backed rate limiting so multiple server instances share the same counter state." },
    { q: "How do you implement file uploads in Express?", a: "Express doesn't natively handle multipart/form-data (file uploads) — use Multer, the de-facto standard.\n\nnpm install multer\n\nconst multer = require('multer');\n\n// Disk storage (save to filesystem):\nconst storage = multer.diskStorage({\n  destination: (req, file, cb) => {\n    cb(null, 'uploads/'); // folder must exist\n  },\n  filename: (req, file, cb) => {\n    const ext = path.extname(file.originalname);\n    cb(null, `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`);\n  }\n});\n\nconst upload = multer({\n  storage,\n  limits: {\n    fileSize: 5 * 1024 * 1024, // 5MB max\n    files: 5                    // max 5 files\n  },\n  fileFilter: (req, file, cb) => {\n    // Accept images only\n    if (file.mimetype.startsWith('image/')) {\n      cb(null, true);\n    } else {\n      cb(new Error('Only image files allowed'), false);\n    }\n  }\n});\n\n// Single file upload:\napp.post('/upload/photo', upload.single('photo'), (req, res) => {\n  console.log(req.file); // { fieldname, originalname, mimetype, size, path }\n  res.json({ filename: req.file.filename });\n});\n\n// Multiple files (same field):\napp.post('/upload/gallery', upload.array('images', 10), (req, res) => {\n  res.json({ files: req.files.map(f => f.filename) });\n});\n\n// Multiple fields:\napp.post('/upload/mixed', upload.fields([\n  { name: 'avatar', maxCount: 1 },\n  { name: 'documents', maxCount: 3 }\n]), (req, res) => {\n  const { avatar, documents } = req.files;\n});\n\n// Memory storage (for cloud uploads like S3):\nconst upload = multer({ storage: multer.memoryStorage() });\napp.post('/upload', upload.single('file'), async (req, res) => {\n  // req.file.buffer is available\n  await s3.putObject({ Body: req.file.buffer, ... }).promise();\n});", theory: "File uploads use multipart/form-data — a binary encoding for form data including files. Multer is the standard Express middleware for handling this format. Files can be stored on disk (good for large files) or in memory as Buffers (good for cloud uploads where you process then forward to S3)." },
    { q: "How do you structure a large Express.js application?", a: "A well-structured Express app separates concerns into layers — routes, controllers, services, models — making it maintainable and testable.\n\nRecommended folder structure:\nproject/\n├── src/\n│   ├── app.js              # Express app setup (no listen)\n│   ├── server.js           # HTTP server start\n│   ├── config/\n│   │   ├── index.js        # All env vars centralized\n│   │   └── database.js     # DB connection\n│   ├── routes/\n│   │   ├── index.js        # Mount all routers\n│   │   ├── users.route.js\n│   │   └── posts.route.js\n│   ├── controllers/        # Request/Response handling\n│   │   ├── users.controller.js\n│   │   └── posts.controller.js\n│   ├── services/           # Business logic\n│   │   ├── users.service.js\n│   │   └── email.service.js\n│   ├── models/             # Database models\n│   │   ├── User.js\n│   │   └── Post.js\n│   ├── middleware/         # Custom middleware\n│   │   ├── auth.js\n│   │   ├── validate.js\n│   │   └── errorHandler.js\n│   └── utils/              # Helper functions\n├── tests/\n├── .env\n└── package.json\n\nLayer responsibilities:\n\n// Route — only maps HTTP methods to controllers:\nrouter.post('/', authenticate, validate(CreateUserDto), createUser);\n\n// Controller — handles req/res, calls service:\nconst createUser = asyncHandler(async (req, res) => {\n  const user = await userService.create(req.body);\n  res.status(201).json(user);\n});\n\n// Service — contains business logic, no req/res:\nconst create = async (userData) => {\n  const existing = await User.findOne({ email: userData.email });\n  if (existing) throw new AppError('Email taken', 409);\n  const hashed = await bcrypt.hash(userData.password, 12);\n  return User.create({ ...userData, password: hashed });\n};\n\napp.js (clean setup):\nconst express = require('express');\nconst app = express();\napp.use(express.json());\napp.use(cors());\napp.use('/api/v1', routes);\napp.use(notFoundHandler);\napp.use(errorHandler);\nmodule.exports = app;", theory: "Large Express apps separate concerns across layers: routes (HTTP mapping), controllers (request/response handling), services (business logic), models (data schemas). This mirrors the MVC pattern. Separating app.js (Express setup) from server.js (HTTP listener) enables clean testing with supertest." },
    { q: "What is Express security best practices?", a: "Production Express apps need multiple layers of security.\n\nnpm install helmet cors express-rate-limit express-mongo-sanitize\n\nconst helmet = require('helmet');\nconst mongoSanitize = require('express-mongo-sanitize');\n\n// 1. Helmet — sets secure HTTP headers:\napp.use(helmet());\n// Sets: X-XSS-Protection, X-Content-Type-Options, Strict-Transport-Security,\n//       Content-Security-Policy, X-Frame-Options, etc.\n\n// 2. Rate limiting — prevent brute force:\napp.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));\n\n// 3. Data sanitization — prevent NoSQL injection:\napp.use(mongoSanitize()); // strips $ and . from user input\n\n// 4. Limit body size — prevent large payload DoS:\napp.use(express.json({ limit: '10kb' }));\n\n// 5. CORS — restrict allowed origins:\napp.use(cors({ origin: process.env.ALLOWED_ORIGIN }));\n\n// 6. SQL injection — use parameterized queries:\n// ✗ NEVER: db.query(`SELECT * FROM users WHERE id = ${req.params.id}`)\n// ✓ ALWAYS: db.query('SELECT * FROM users WHERE id = $1', [req.params.id])\n\n// 7. Hide Express fingerprint:\napp.disable('x-powered-by');\n// Or helmet does this automatically\n\n// 8. JWT security:\nconst token = jwt.sign(payload, secret, {\n  expiresIn: '1h',    // short-lived tokens\n  algorithm: 'HS256'\n});\n// Store in HttpOnly cookie, not localStorage (prevents XSS)\nres.cookie('token', token, {\n  httpOnly: true,     // not accessible via JS\n  secure: true,       // HTTPS only\n  sameSite: 'strict', // prevents CSRF\n  maxAge: 3600000\n});\n\n// 9. Validate and sanitize ALL user input (express-validator)\n// 10. HTTPS — use SSL certificate in production (Let's Encrypt)", theory: "Defense in depth means multiple overlapping security layers. Helmet sets security headers automatically. Rate limiting prevents brute force. Input sanitization prevents injection. Parameterized queries prevent SQL injection. HttpOnly cookies prevent XSS token theft. Short-lived JWTs limit breach exposure." },
    { q: "How do you implement logging in Express?", a: "Logging in Express helps debug issues, monitor performance, and audit API usage.\n\nHTTP request logging with Morgan:\nnpm install morgan\n\nconst morgan = require('morgan');\n\n// Preset formats:\napp.use(morgan('dev'));     // colored: GET /users 200 5ms\napp.use(morgan('combined')); // Apache combined format\napp.use(morgan('short'));   // shorter version\napp.use(morgan('tiny'));    // minimal\n\n// Custom format:\napp.use(morgan(':method :url :status :res[content-length] - :response-time ms'));\n\n// Log only errors to file:\nconst fs = require('fs');\nconst accessLogStream = fs.createWriteStream('./logs/access.log', { flags: 'a' });\napp.use(morgan('combined', { stream: accessLogStream }));\n\nStructured application logging with Winston:\nnpm install winston\n\nconst winston = require('winston');\nconst logger = winston.createLogger({\n  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',\n  format: winston.format.combine(\n    winston.format.timestamp(),\n    winston.format.errors({ stack: true }),\n    winston.format.json()\n  ),\n  transports: [\n    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),\n    new winston.transports.File({ filename: 'logs/combined.log' }),\n    new winston.transports.Console({\n      format: winston.format.colorize({ all: true })\n    })\n  ]\n});\n\n// Use in routes:\napp.get('/users', async (req, res, next) => {\n  logger.info('Fetching all users', { userId: req.user?.id, ip: req.ip });\n  try {\n    const users = await User.find();\n    logger.debug(`Found ${users.length} users`);\n    res.json(users);\n  } catch (err) {\n    logger.error('Failed to fetch users', { error: err.message, stack: err.stack });\n    next(err);\n  }\n});", theory: "Production logging has two purposes: operational visibility and debugging. HTTP access logs (Morgan) record every request for traffic analysis. Application logs (Winston) record events, errors, and business operations. Structured JSON logging enables log aggregation and querying in tools like Datadog or CloudWatch." },
    { q: "How does Express handle cookies and sessions?", a: "Cookies are small pieces of data stored in the browser. Sessions build on cookies to maintain user state across requests.\n\nCookies with cookie-parser:\nnpm install cookie-parser\n\nconst cookieParser = require('cookie-parser');\napp.use(cookieParser(process.env.COOKIE_SECRET)); // optional secret for signed cookies\n\n// Set a cookie:\nres.cookie('username', 'alice', {\n  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms\n  httpOnly: true,   // cannot be accessed by JS (XSS protection)\n  secure: true,     // HTTPS only\n  sameSite: 'lax'  // CSRF protection\n});\n\n// Read cookies:\nreq.cookies.username      // 'alice' — plain cookies\nreq.signedCookies.userId  // verified signed cookies (tamper-proof)\n\n// Clear a cookie:\nres.clearCookie('username');\n\nSession-based auth with express-session:\nnpm install express-session connect-redis redis\n\nconst session = require('express-session');\nconst RedisStore = require('connect-redis').default;\n\napp.use(session({\n  store: new RedisStore({ client: redisClient }), // persist to Redis\n  secret: process.env.SESSION_SECRET,\n  resave: false,\n  saveUninitialized: false,\n  cookie: {\n    secure: true,     // HTTPS only\n    httpOnly: true,\n    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days\n  }\n}));\n\n// Set session data:\napp.post('/login', async (req, res) => {\n  const user = await validateCredentials(req.body);\n  req.session.userId = user.id; // stored server-side in Redis\n  res.json({ message: 'Logged in' });\n});\n\n// Read session:\napp.get('/profile', (req, res) => {\n  if (!req.session.userId) return res.status(401).send('Not logged in');\n  res.json({ userId: req.session.userId });\n});\n\nCookie vs Session vs JWT:\n- Cookie: simple data stored in browser\n- Session: server stores data (in Redis), browser only has session ID\n- JWT: stateless token, server verifies signature without database lookup", theory: "Cookies are key-value pairs stored in the browser and sent with every request to the matching domain. Sessions store data server-side, using only a session ID cookie on the client. HttpOnly cookies can't be accessed by JavaScript (XSS protection). Secure cookies only transmit over HTTPS." },
    { q: "How do you test an Express.js API?", a: "Testing Express APIs involves unit tests, integration tests, and end-to-end tests.\n\nnpm install --save-dev jest supertest\n\nsetup — testable app.js (no listen):\n// app.js — export without listening:\nconst app = express();\napp.use(express.json());\napp.use('/api', routes);\nmodule.exports = app;\n\n// server.js — only starts the server:\nconst app = require('./app');\napp.listen(3000, () => console.log('Server started'));\n\nIntegration tests with Supertest:\nconst request = require('supertest');\nconst app = require('../app');\n\ndescribe('POST /api/users', () => {\n  test('creates a user with valid data', async () => {\n    const res = await request(app)\n      .post('/api/users')\n      .send({ name: 'Alice', email: 'alice@example.com', password: 'Pass123!' })\n      .expect('Content-Type', /json/)\n      .expect(201);\n\n    expect(res.body).toHaveProperty('id');\n    expect(res.body.name).toBe('Alice');\n    expect(res.body.password).toBeUndefined(); // password never returned\n  });\n\n  test('returns 422 for invalid email', async () => {\n    const res = await request(app)\n      .post('/api/users')\n      .send({ name: 'Bob', email: 'not-an-email', password: 'Pass123!' })\n      .expect(422);\n\n    expect(res.body.errors[0].field).toBe('email');\n  });\n});\n\ndescribe('GET /api/users/:id', () => {\n  test('returns 404 for non-existent user', async () => {\n    await request(app)\n      .get('/api/users/nonexistentid123')\n      .expect(404);\n  });\n\n  test('returns user when authenticated', async () => {\n    const token = generateTestToken({ id: '123', role: 'admin' });\n    const res = await request(app)\n      .get('/api/users/123')\n      .set('Authorization', `Bearer ${token}`)\n      .expect(200);\n    expect(res.body.id).toBe('123');\n  });\n});\n\nMocking services:\njest.mock('../services/email.service');\nconst emailService = require('../services/email.service');\nemailService.sendWelcomeEmail.mockResolvedValue(true);", theory: "Supertest makes HTTP requests directly to an Express app without binding to a port, enabling fast isolated testing. Separating app setup (app.js) from server start (server.js) is the key pattern. Integration tests verify the full middleware pipeline. Unit tests mock dependencies and test controllers/services in isolation." },
    { q: "How do you implement caching in Express?", a: "Caching reduces database load and improves response times by storing computed results.\n\nHTTP Cache Headers (browser caching):\n// Cache static assets for 1 year:\napp.use('/static', express.static('public', {\n  maxAge: '1y',\n  immutable: true // file won't change (use with content-hash filenames)\n}));\n\n// Cache API responses:\napp.get('/api/config', (req, res) => {\n  res.set('Cache-Control', 'public, max-age=3600'); // cache 1 hour\n  res.json({ config: appConfig });\n});\n\n// No cache for user-specific data:\nres.set('Cache-Control', 'no-store');\n\nIn-memory caching with node-cache:\nnpm install node-cache\n\nconst NodeCache = require('node-cache');\nconst cache = new NodeCache({ stdTTL: 300 }); // 5min default TTL\n\n// Cache middleware:\nfunction cacheMiddleware(ttl = 300) {\n  return (req, res, next) => {\n    const key = req.originalUrl;\n    const cached = cache.get(key);\n    if (cached) {\n      return res.json(cached); // cache hit\n    }\n    res.sendJsonCached = (data) => {\n      cache.set(key, data, ttl);\n      res.json(data);\n    };\n    next();\n  };\n}\n\napp.get('/api/products', cacheMiddleware(600), async (req, res) => {\n  const products = await Product.find();\n  res.sendJsonCached(products);\n});\n\nRedis caching (production — distributed, survives restarts):\nconst redis = require('redis');\nconst client = redis.createClient({ url: process.env.REDIS_URL });\n\nasync function getCachedOrFetch(key, fetchFn, ttl = 3600) {\n  const cached = await client.get(key);\n  if (cached) return JSON.parse(cached); // cache hit\n  const data = await fetchFn();\n  await client.setEx(key, ttl, JSON.stringify(data));\n  return data;\n}\n\napp.get('/api/users/:id', async (req, res, next) => {\n  try {\n    const user = await getCachedOrFetch(\n      `user:${req.params.id}`,\n      () => User.findById(req.params.id),\n      1800\n    );\n    res.json(user);\n  } catch (err) { next(err); }\n});\n\n// Cache invalidation on update:\napp.put('/api/users/:id', async (req, res, next) => {\n  const user = await User.findByIdAndUpdate(req.params.id, req.body);\n  await client.del(`user:${req.params.id}`); // bust cache\n  res.json(user);\n});", theory: "Caching reduces database load and improves response times. HTTP Cache-Control headers enable browser and CDN caching. In-memory caches (node-cache) are fast but lost on restart. Redis provides distributed caching that persists across restarts and scales across multiple server instances." },
    { q: "How do you version an Express API?", a: "API versioning allows you to make breaking changes without disrupting existing clients.\n\nMethod 1: URL path versioning (most common):\nconst v1Router = require('./routes/v1');\nconst v2Router = require('./routes/v2');\n\napp.use('/api/v1', v1Router);\napp.use('/api/v2', v2Router);\n\n// Client calls: GET /api/v1/users or GET /api/v2/users\n\n// Folder structure:\nroutes/\n├── v1/\n│   ├── index.js\n│   ├── users.route.js\n│   └── products.route.js\n└── v2/\n    ├── index.js\n    ├── users.route.js  // breaking changes from v1\n    └── products.route.js\n\nMethod 2: Header versioning:\nfunction versionMiddleware(req, res, next) {\n  const version = req.headers['api-version'] || '1';\n  req.apiVersion = parseInt(version);\n  next();\n}\n\napp.use(versionMiddleware);\n\napp.get('/api/users', (req, res) => {\n  if (req.apiVersion === 2) {\n    return res.json(getUsersV2());\n  }\n  res.json(getUsersV1());\n});\n\nMethod 3: Query parameter versioning:\n// GET /api/users?version=2\napp.get('/api/users', (req, res) => {\n  const version = req.query.version || '1';\n  version === '2' ? res.json(v2data) : res.json(v1data);\n});\n\nBest practice — shared business logic:\n// Both versions share same service, only response shape differs:\n// v1/users.route.js:\nrouter.get('/', async (req, res) => {\n  const users = await userService.getAll();\n  res.json(users.map(u => ({ id: u.id, name: u.name }))); // v1 shape\n});\n\n// v2/users.route.js:\nrouter.get('/', async (req, res) => {\n  const users = await userService.getAll();\n  res.json(users.map(u => ({ id: u.id, fullName: u.name, email: u.email }))); // v2 shape\n});\n\nDeprecation headers:\nres.set('Deprecation', 'true');\nres.set('Sunset', 'Sat, 31 Dec 2025 23:59:59 GMT');\nres.set('Link', '</api/v2/users>; rel=\"successor-version\"');", theory: "API versioning preserves backward compatibility while enabling evolution. URL path versioning (/v1/, /v2/) is explicit, easy to route in Express, and widely understood. Clients choose their version explicitly. Deprecation headers (Deprecation, Sunset) signal migration timelines. Share business logic across versions, varying only response shape." }
    ],
    "Advanced & Scenario": [
    { tag: "SCENARIO", q: "You're building a production REST API with Express. How would you design and implement a complete authentication and authorization system?", a: "A production auth system needs registration, login, JWT issuance, refresh tokens, role-based access, and secure storage.\n\nComplete flow:\n1. Registration → hash password (bcrypt) → save user → send welcome email\n2. Login → verify credentials → sign access token (15min) + refresh token (7d)\n3. Authenticated request → verify access token in Authorization header\n4. Token expired → use refresh token to get new access token\n5. Logout → blacklist/delete refresh token\n\nPassword hashing:\nconst bcrypt = require('bcryptjs');\nconst SALT_ROUNDS = 12; // higher = slower = more secure\nconst hash = await bcrypt.hash(password, SALT_ROUNDS);\nconst valid = await bcrypt.compare(plainPassword, hash);\n\nJWT strategy:\nconst ACCESS_TOKEN_SECRET = process.env.ACCESS_SECRET;\nconst REFRESH_TOKEN_SECRET = process.env.REFRESH_SECRET;\n\nfunction generateTokens(user) {\n  const accessToken = jwt.sign(\n    { id: user._id, role: user.role },\n    ACCESS_TOKEN_SECRET,\n    { expiresIn: '15m' }    // short-lived\n  );\n  const refreshToken = jwt.sign(\n    { id: user._id },\n    REFRESH_TOKEN_SECRET,\n    { expiresIn: '7d' }     // long-lived, stored in DB\n  );\n  return { accessToken, refreshToken };\n}\n\nRefresh token endpoint:\napp.post('/auth/refresh', async (req, res, next) => {\n  const { refreshToken } = req.cookies; // stored in HttpOnly cookie\n  if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });\n  try {\n    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);\n    // Verify token exists in DB (rotation strategy):\n    const stored = await RefreshToken.findOne({ token: refreshToken, userId: decoded.id });\n    if (!stored || stored.revoked) return res.status(401).json({ error: 'Invalid token' });\n    // Rotate: delete old, issue new\n    await stored.deleteOne();\n    const user = await User.findById(decoded.id);\n    const tokens = generateTokens(user);\n    await RefreshToken.create({ token: tokens.refreshToken, userId: user._id });\n    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, secure: true });\n    res.json({ accessToken: tokens.accessToken });\n  } catch (err) { res.status(401).json({ error: 'Expired or invalid refresh token' }); }\n});\n\nRole-based authorization:\nconst roles = { admin: 3, moderator: 2, user: 1 };\nfunction requireRole(minRole) {\n  return (req, res, next) => {\n    if (roles[req.user.role] < roles[minRole]) {\n      return res.status(403).json({ error: 'Insufficient permissions' });\n    }\n    next();\n  };\n}\napp.delete('/users/:id', authenticate, requireRole('admin'), deleteUser);", theory: "Production auth systems have multiple concerns: secure password storage (bcrypt), token issuance (JWT with short-lived access + long-lived refresh tokens), token rotation (revoke on use), role-based authorization, and proper secret management. HttpOnly cookies prevent XSS token theft. Refresh token rotation detects token theft by invalidating reuse attempts." },
    { tag: "SCENARIO", q: "Your Express API is getting slow under load. How do you diagnose and optimize performance?", a: "Performance optimization is a systematic process: measure, identify bottleneck, fix, measure again.\n\n1. Measure — identify the bottleneck:\n// Add response time logging:\napp.use((req, res, next) => {\n  const start = Date.now();\n  res.on('finish', () => {\n    const duration = Date.now() - start;\n    if (duration > 1000) {\n      logger.warn(`Slow request: ${req.method} ${req.path} took ${duration}ms`);\n    }\n  });\n  next();\n});\n// Use: clinic.js, autocannon, Artillery for load testing\n\n2. Database query optimization:\n// N+1 problem — BAD:\nconst posts = await Post.find();\nconst postsWithAuthors = await Promise.all(\n  posts.map(p => User.findById(p.authorId)) // N+1 queries!\n);\n// FIX — populate in one query:\nconst posts = await Post.find().populate('author', 'name email');\n\n// Missing indexes:\nawait User.createIndex({ email: 1 });        // unique lookup\nawait Post.createIndex({ createdAt: -1 });   // sort by date\nawait Post.createIndex({ category: 1, status: 1 }); // compound\n\n// Pagination instead of .find():\nconst PAGE_SIZE = 20;\nconst posts = await Post.find()\n  .skip((page - 1) * PAGE_SIZE)\n  .limit(PAGE_SIZE);\n\n3. Redis caching for expensive operations:\nconst getCachedOrFetch = async (key, fn, ttl = 3600) => {\n  const cached = await redis.get(key);\n  if (cached) return JSON.parse(cached);\n  const result = await fn();\n  await redis.setEx(key, ttl, JSON.stringify(result));\n  return result;\n};\n\n4. Compression:\nconst compression = require('compression');\napp.use(compression()); // gzip responses — reduces size 70-80%\n\n5. Cluster mode (use all CPU cores):\nconst cluster = require('cluster');\nconst os = require('os');\nif (cluster.isPrimary) {\n  for (let i = 0; i < os.cpus().length; i++) cluster.fork();\n} else { app.listen(3000); }\n\n6. Connection pooling:\nconst pool = mysql.createPool({ connectionLimit: 10, ... });\n\n7. Avoid blocking the event loop:\n// Move CPU-heavy work to Worker Threads\nconst { Worker } = require('worker_threads');\napp.post('/process', (req, res) => {\n  const worker = new Worker('./workers/processor.js', { workerData: req.body });\n  worker.on('message', result => res.json(result));\n});", theory: "Performance optimization follows the measurement-first principle: profile before optimizing. Common Express bottlenecks: N+1 database queries, missing indexes, synchronous CPU work blocking the event loop, large uncompressed responses, and cold cache hits. Each has specific tools for detection and specific fixes." },
    { tag: "HARD", q: "How do you implement a complete middleware pipeline with error handling, request ID tracking, and structured logging in Express?", a: "A production middleware pipeline needs: request tracking, structured logging, input sanitization, error boundaries, and contextual error responses.\n\nComplete pipeline setup:\nconst { v4: uuidv4 } = require('uuid');\nconst winston = require('winston');\n\n// 1. Request ID — trace requests across services:\napp.use((req, res, next) => {\n  req.id = req.headers['x-request-id'] || uuidv4();\n  res.set('X-Request-ID', req.id);\n  next();\n});\n\n// 2. Structured request logging:\napp.use((req, res, next) => {\n  const startTime = Date.now();\n  res.on('finish', () => {\n    logger.info('HTTP Request', {\n      requestId: req.id,\n      method: req.method,\n      path: req.path,\n      statusCode: res.statusCode,\n      duration: `${Date.now() - startTime}ms`,\n      userAgent: req.headers['user-agent'],\n      ip: req.ip,\n      userId: req.user?.id\n    });\n  });\n  next();\n});\n\n// 3. Security headers + parsing:\napp.use(helmet());\napp.use(express.json({ limit: '10kb' }));\napp.use(mongoSanitize());\n\n// 4. Async wrapper:\nconst wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next);\n\n// 5. Custom AppError class:\nclass AppError extends Error {\n  constructor(message, statusCode, code) {\n    super(message);\n    this.statusCode = statusCode;\n    this.code = code;\n    this.isOperational = true;\n  }\n}\n\n// 6. Global error handler:\napp.use((err, req, res, next) => {\n  const isDev = process.env.NODE_ENV === 'development';\n  const statusCode = err.statusCode || 500;\n\n  logger.error('Unhandled error', {\n    requestId: req.id,\n    error: err.message,\n    stack: err.stack,\n    path: req.path\n  });\n\n  res.status(statusCode).json({\n    status: 'error',\n    requestId: req.id,    // client can reference this in bug reports\n    message: err.isOperational ? err.message : 'An unexpected error occurred',\n    ...(isDev && { stack: err.stack, details: err })\n  });\n});\n\n// 7. 404 handler (before global error handler):\napp.use((req, res, next) => {\n  next(new AppError(`Cannot ${req.method} ${req.path}`, 404, 'NOT_FOUND'));\n});", theory: "Production middleware pipelines implement cross-cutting concerns: request tracking (unique ID for log correlation), structured logging (JSON for aggregation), security headers (helmet), input sanitization, authentication, rate limiting, and centralized error handling. Order matters — logging goes first, error handling goes last." },
    { tag: "SCENARIO", q: "How would you build and secure a REST API in Express that handles file uploads, processes images, and streams results back to the client?", a: "A file processing API needs upload handling, validation, async processing, and streaming responses.\n\nComplete implementation:\nconst multer = require('multer');\nconst sharp = require('sharp');\nconst { PassThrough } = require('stream');\n\n// Upload with validation:\nconst upload = multer({\n  storage: multer.memoryStorage(),\n  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB\n  fileFilter: (req, file, cb) => {\n    if (!file.mimetype.startsWith('image/')) {\n      return cb(new AppError('Only images allowed', 400));\n    }\n    cb(null, true);\n  }\n});\n\n// Process and save:\napp.post('/api/images/upload', authenticate, upload.single('image'), async (req, res, next) => {\n  try {\n    const { buffer, mimetype, originalname } = req.file;\n\n    // Process in parallel — generate multiple sizes:\n    const [thumbnail, medium, original] = await Promise.all([\n      sharp(buffer).resize(150, 150, { fit: 'cover' }).webp({ quality: 80 }).toBuffer(),\n      sharp(buffer).resize(800, null, { withoutEnlargement: true }).webp({ quality: 85 }).toBuffer(),\n      sharp(buffer).webp({ quality: 90 }).toBuffer()\n    ]);\n\n    // Upload to S3 in parallel:\n    const filename = `${Date.now()}-${uuidv4()}`;\n    const [thumbKey, mediumKey, originalKey] = await Promise.all([\n      s3Upload(`${filename}-thumb.webp`, thumbnail),\n      s3Upload(`${filename}-medium.webp`, medium),\n      s3Upload(`${filename}.webp`, original)\n    ]);\n\n    const image = await Image.create({\n      userId: req.user.id,\n      thumbnailUrl: getS3Url(thumbKey),\n      mediumUrl: getS3Url(mediumKey),\n      originalUrl: getS3Url(originalKey),\n    });\n\n    res.status(201).json(image);\n  } catch (err) { next(err); }\n});\n\n// Streaming download:\napp.get('/api/images/:id/download', authenticate, async (req, res, next) => {\n  try {\n    const image = await Image.findById(req.params.id);\n    if (!image) return next(new AppError('Not found', 404));\n\n    // Stream from S3 → client:\n    const s3Stream = s3.getObject({ Bucket: BUCKET, Key: image.s3Key }).createReadStream();\n    res.set({\n      'Content-Type': 'image/webp',\n      'Content-Disposition': `attachment; filename=\"image-${image.id}.webp\"`,\n      'Cache-Control': 'private, max-age=3600'\n    });\n    s3Stream.on('error', next);\n    s3Stream.pipe(res);\n  } catch (err) { next(err); }\n});", theory: "File upload APIs require validation (MIME type, size limits), secure storage (avoid serving uploaded files as code), and efficient processing. Streaming downloads pipe S3/disk streams directly to the client without buffering in memory — enabling arbitrarily large files with constant memory usage." },
    { tag: "HARD", q: "How do you implement WebSockets in an Express application for real-time features?", a: "Express is HTTP — for real-time bidirectional communication, add WebSocket support via the ws package or Socket.IO on the same server.\n\nWith ws (lightweight):\nconst express = require('express');\nconst http = require('http');\nconst WebSocket = require('ws');\n\nconst app = express();\nconst server = http.createServer(app); // share HTTP server\nconst wss = new WebSocket.Server({ server });\n\n// Track connected clients by room:\nconst rooms = new Map(); // roomId → Set of ws connections\n\nwss.on('connection', (ws, req) => {\n  // Parse auth from URL: ws://host/ws?token=xyz\n  const token = new URL(req.url, 'http://host').searchParams.get('token');\n  const user = verifyToken(token);\n  if (!user) return ws.close(1008, 'Unauthorized');\n\n  ws.userId = user.id;\n  ws.isAlive = true;\n\n  ws.on('message', (rawData) => {\n    try {\n      const { type, roomId, payload } = JSON.parse(rawData);\n      switch (type) {\n        case 'JOIN_ROOM':\n          if (!rooms.has(roomId)) rooms.set(roomId, new Set());\n          rooms.get(roomId).add(ws);\n          ws.currentRoom = roomId;\n          ws.send(JSON.stringify({ type: 'JOINED', roomId }));\n          break;\n        case 'MESSAGE':\n          // Broadcast to room:\n          rooms.get(ws.currentRoom)?.forEach(client => {\n            if (client !== ws && client.readyState === WebSocket.OPEN) {\n              client.send(JSON.stringify({ type: 'MESSAGE', from: ws.userId, payload }));\n            }\n          });\n          break;\n      }\n    } catch (err) { ws.send(JSON.stringify({ type: 'ERROR', message: err.message })); }\n  });\n\n  // Heartbeat (detect dead connections):\n  ws.on('pong', () => { ws.isAlive = true; });\n\n  ws.on('close', () => {\n    rooms.get(ws.currentRoom)?.delete(ws);\n  });\n});\n\n// Ping every 30s, close dead connections:\nsetInterval(() => {\n  wss.clients.forEach(ws => {\n    if (!ws.isAlive) return ws.terminate();\n    ws.isAlive = false;\n    ws.ping();\n  });\n}, 30000);\n\n// HTTP routes still work normally:\napp.get('/api/rooms', (req, res) => res.json({ rooms: [...rooms.keys()] }));\n\nserver.listen(3000);\n\nWith Socket.IO (higher-level, auto-reconnect, rooms built-in):\nconst { Server } = require('socket.io');\nconst io = new Server(server, { cors: { origin: '*' } });\nio.on('connection', (socket) => {\n  socket.join('room-1');\n  io.to('room-1').emit('message', { text: 'Hello room!' });\n});", theory: "WebSockets maintain persistent TCP connections enabling bidirectional real-time communication. The ws library attaches to Node's HTTP server, sharing the same port. Authentication happens at connection time. Rooms group clients for targeted broadcasts. Heartbeat pings detect dead connections that didn't cleanly close." },
    { tag: "SCENARIO", q: "You're asked to design an Express API that needs to handle 10,000 concurrent requests. What architectural decisions would you make?", a: "High-concurrency Express requires: horizontal scaling, stateless design, efficient I/O, caching, and proper resource management.\n\n1. Stateless application:\n// No in-memory session state — store in Redis:\napp.use(session({ store: new RedisStore({ client }) }));\n// No local file processing — use S3 for storage\n// No in-memory caches — use Redis for caching\n\n2. Cluster mode (vertical scaling first):\nconst cluster = require('cluster');\nconst os = require('os');\nif (cluster.isPrimary) {\n  const numCPUs = os.cpus().length; // e.g., 8 cores = 8 workers\n  for (let i = 0; i < numCPUs; i++) cluster.fork();\n  cluster.on('exit', (worker) => {\n    console.log(`Worker ${worker.id} died, restarting...`);\n    cluster.fork(); // auto-restart dead workers\n  });\n} else {\n  app.listen(3000);\n}\n\n3. Horizontal scaling (multiple servers):\n// Deploy behind a load balancer (Nginx, AWS ALB)\n// Use PM2 ecosystem for process management:\n// ecosystem.config.js:\nmodule.exports = {\n  apps: [{ name: 'api', script: 'server.js', instances: 'max', exec_mode: 'cluster' }]\n};\n\n4. Database connection pooling:\nconst pool = mysql.createPool({\n  connectionLimit: 20,  // don't exceed DB max_connections\n  acquireTimeout: 10000,\n  queueLimit: 0\n});\n\n5. Redis for shared state + caching:\n// Rate limiting across pods:\nconst limiter = rateLimit({ store: new RedisStore({ client }) });\n// Caching expensive queries\n// Session storage\n// Pub/Sub for real-time events\n\n6. Async everything:\n// All I/O is non-blocking — Node.js handles 10k+ concurrent with:\n// - Proper async/await (no blocking sync calls in routes)\n// - No CPU-heavy work on main thread (use Worker Threads)\n// - Streaming responses for large data (res.pipe)\n\n7. Nginx in front:\n// Handle: SSL termination, gzip, static files, rate limiting, load balancing\n// Let Node focus only on API logic\n\n8. Monitoring:\nconst prometheus = require('prom-client');\nconst httpDuration = new prometheus.Histogram({\n  name: 'http_request_duration_seconds',\n  labelNames: ['method', 'route', 'status_code']\n});", theory: "High-concurrency Express requires stateless design (no in-memory state), connection pooling (reuse DB connections), Redis for shared state (sessions, rate limiting, cache), compression (reduce response size), and horizontal scaling behind a load balancer. Node's event loop handles thousands of concurrent I/O-bound requests with a single thread." }
  ]
  },
  "Microservices": {
    Beginner: [
      { q: "What are Microservices?", a: "Microservices is an architectural style where an application is divided into small, independent services. Each service focuses on a specific business capability and can be developed, deployed, and scaled independently.\n\nKey characteristics:\n- Each service runs in its own process\n- Services communicate via APIs (REST, gRPC, messaging)\n- Each service has its own database (Database Per Service pattern)\n- Services can be written in different programming languages\n- Services can be deployed independently without affecting others\n\nExample breakdown of an e-commerce app:\n- User Service: handles registration, login, profiles\n- Product Service: manages product catalog\n- Order Service: creates and tracks orders\n- Payment Service: handles payments\n- Notification Service: sends emails and SMS", theory: "Microservices emerged as a solution to the problems of large monolithic applications. As applications grow, a single codebase becomes hard to understand, slow to deploy, and risky to change. Microservices apply the Single Responsibility Principle at the architectural level: each service does one thing well. Netflix, Amazon, and Uber pioneered this architecture to enable hundreds of independent teams to deploy changes thousands of times per day without coordinating with each other." },
      { q: "What is the difference between Monolith and Microservices?", a: "Monolith vs Microservices:\n\n| Aspect | Monolith | Microservices |\n|--------|----------|---------------|\n| Codebase | Single codebase | Multiple services |\n| Deployment | Single deployment | Independent deployment |\n| Database | Shared database | Database per service |\n| Scaling | Scale entire app | Scale individual services |\n| Technology | Single tech stack | Polyglot (any language) |\n| Failure | One bug can crash all | Fault isolation |\n\nAdvantages of Microservices:\n- Independent deployment\n- Better scalability\n- Technology flexibility\n- Fault isolation\n\nDisadvantages:\n- Complex architecture\n- Network latency\n- Distributed transactions", theory: "Monoliths are simple to start with — one codebase, one deployment, one database. They become problems at scale when deployment speed, team size, or scaling requirements grow. Microservices trade deployment simplicity for operational complexity. Conway's Law: organizations design systems that mirror their communication structure — microservices enable team autonomy by aligning service boundaries with team ownership." },
      { q: "Why do companies use Microservices?", a: "Companies adopt microservices for both technical and organizational scale:\n\nTechnical reasons:\n- Faster deployments: deploy individual services without touching others\n- Better scalability: scale only the services under load\n- Better fault tolerance: if one service fails, others keep working\n- Technology flexibility: use the best tool for each job\n\nOrganizational reasons:\n- Independent development teams: Team A deploys without waiting for Team B\n- Easier maintenance: a 10,000-line service is more understandable than a 500,000-line monolith\n- Faster onboarding: new developers understand one service without learning the whole system\n\nReal examples:\n- Netflix: 700+ microservices, deploys thousands of times per day\n- Amazon: entire checkout flow split into independent services\n- Uber: split monolith when scaling to millions of rides", theory: "The core motivation is Conway's Law: organizations design systems that mirror their communication structure. A 500-person engineering org cannot effectively work on a single monolith. Microservices allow organizations to scale their engineering teams independently — each team owns services and can release without coordinating with other teams. Netflix famously moved to microservices when their monolith made it impossible for 600+ engineers to work efficiently." },
      { q: "What are the disadvantages of Microservices?", a: "Microservices introduce significant complexity:\n\n1. Increased complexity\n- Many services to manage, deploy, monitor\n- Network calls replace in-process function calls\n\n2. Service communication challenges\n- Network failures, timeouts, retries needed\n- Need patterns like Circuit Breaker, Bulkhead\n\n3. Distributed data management\n- No ACID transactions across services\n- Need Saga pattern for distributed transactions\n- Eventual consistency instead of immediate consistency\n\n4. Monitoring difficulties\n- A single request touches 10+ services\n- Need distributed tracing (Jaeger, Zipkin)\n- Centralized logging (ELK Stack)\n\n5. More infrastructure requirements\n- Container orchestration (Kubernetes)\n- API Gateway, Service Discovery\n- Message brokers (Kafka, RabbitMQ)", theory: "The distributed systems fallacies apply fully to microservices: the network is NOT reliable, latency is NOT zero, bandwidth is NOT infinite. Every inter-service call is a potential failure point that does not exist in a monolith. Martin Fowler's Microservice Premium concept: microservices only pay off once the system is complex enough that the operational overhead is worth it." },
      { q: "What is the Database Per Service Pattern?", a: "Each microservice owns its own database. No other service can directly access another service's database.\n\nExample:\n- User Service → Users PostgreSQL DB\n- Order Service → Orders MongoDB DB\n- Payment Service → Payments MySQL DB\n\nBenefits:\n- Loose coupling: schema changes in one service do not break others\n- Independent deployment: deploy DB changes with the service\n- Technology choice: use the best DB for each use case\n- Better scalability: scale each database independently\n\nChallenges:\n- No JOIN queries across services\n- Distributed transactions need Saga pattern\n\nAnti-pattern — Shared Database:\n- Tight coupling between services\n- Schema changes require coordinating all teams\n- One service heavy queries slow all others", theory: "Database Per Service is the most important microservices pattern for achieving true independence. If two services share a database, they are coupled at the data layer. The pattern enforces encapsulation at the data level. The trade-off: no cross-service JOINs — instead you denormalize data or make API calls, accepting eventual consistency." },
      { q: "What is an API Gateway?", a: "An API Gateway is a single entry point that sits in front of all microservices and handles cross-cutting concerns.\n\nResponsibilities:\n- Request routing: /api/users → User Service, /api/orders → Order Service\n- Authentication: validates JWT tokens before forwarding requests\n- Authorization: checks permissions\n- Rate limiting: limits requests per client (e.g., 1000 req/min)\n- Logging: logs all requests centrally\n- Response aggregation: combines responses from multiple services\n- SSL termination: handles HTTPS at the gateway level\n\nWithout API Gateway: clients know all service URLs and ports, manage auth separately\nWith API Gateway: single URL, centralized auth, hidden service locations\n\nPopular API Gateways: AWS API Gateway, Kong, Nginx, Spring Cloud Gateway", theory: "The API Gateway implements the Facade pattern at the infrastructure level — a simple unified interface hiding distributed complexity. It also solves the chatty client problem: a single UI screen needing data from 10 services would require 10 round trips without the gateway. The Backend For Frontend (BFF) pattern extends this — different gateways for mobile vs web optimize responses for each client type." },
      { q: "Why is an API Gateway needed?", a: "Without API Gateway, clients face several problems:\n\n1. Must know all service URLs and ports\n   - Any service change breaks the client\n\n2. Authentication scattered across services\n   - Each service validates JWT independently\n   - Duplicate authentication code everywhere\n\n3. Too many round trips from client\n   - Mobile app calls 5 services to render one screen\n   - High latency on mobile networks\n\nWhat API Gateway provides:\n- Single endpoint: client calls one URL, gateway routes internally\n- Centralized auth: JWT validation once at the gateway\n- Rate limiting: enforce limits without per-service logic\n- Request aggregation: bundles multiple service responses into one\n- Service location abstraction: services can move without client changes\n- Circuit breaking: stops forwarding to failing services", theory: "Without a gateway, clients must know service locations, handle authentication per service, and make multiple network round trips. On mobile networks (high latency), 10 separate API calls for one screen is unacceptable. The gateway aggregates responses and provides a stable API contract even as internal services change. Main risk: gateway becoming a bottleneck if too much business logic leaks into it." },
      { q: "What is Service Discovery?", a: "Service Discovery helps services dynamically locate each other without hardcoded IP addresses and ports.\n\nProblem: Payment Service runs on multiple dynamic instances. Hardcoding IPs breaks when instances change.\n\nSolution — Service Registry:\n1. Payment Service starts → registers: { name: 'payment-service', ip: '10.0.0.1', port: 8080 }\n2. Order Service queries registry for 'payment-service'\n3. Registry returns available instances → Order Service picks one\n\nTypes:\n- Client-Side Discovery (Eureka/Ribbon): client queries registry, does load balancing\n- Server-Side Discovery (Kubernetes, AWS ELB): load balancer queries and routes\n\nPopular tools: Eureka, Consul, Kubernetes Service DNS, AWS Cloud Map\n\nIn Kubernetes: each service gets stable DNS: payment-service.default.svc.cluster.local", theory: "Service Discovery is the dynamic phone book of microservices. In cloud environments, service instances are ephemeral — they come and go based on load and failures. Static IP configuration breaks almost immediately. Kubernetes simplifies this enormously — every Service resource gets a stable DNS name that automatically load-balances across healthy pods, making explicit service discovery tools often unnecessary." },
      { q: "What is Inter-Service Communication?", a: "Inter-Service Communication is how microservices talk to each other to complete business operations.\n\nSynchronous Communication (immediate response):\n\nREST (HTTP/JSON):\n- Simple, widely supported\n- Best for: CRUD operations, data queries\n\ngRPC (Protocol Buffers over HTTP/2):\n- Binary format, faster than JSON\n- Strongly typed with auto-generated client code\n- Best for: high-performance internal services\n\nAsynchronous Communication (eventual processing):\n\nRabbitMQ (Message Queue):\n- Producer sends message, consumer processes when ready\n- Best for: background tasks, email notifications\n\nApache Kafka (Event Streaming):\n- Publish events to topics, multiple consumers, messages retained\n- Best for: high-throughput, event sourcing, analytics\n\nChoice guide:\n- Need immediate response: REST or gRPC\n- Background processing: RabbitMQ\n- High-throughput event streaming: Kafka", theory: "The choice between synchronous and asynchronous communication is a fundamental design decision. Synchronous (REST, gRPC) creates temporal coupling — both services must be running simultaneously. Asynchronous messaging (RabbitMQ, Kafka) decouples services temporally — one service publishes and continues; the other processes when available. Async improves resilience but introduces eventual consistency and more complex error handling." },
      { q: "What is the difference between Synchronous and Asynchronous Communication?", a: "Synchronous Communication (REST/gRPC):\n- Caller waits for response before proceeding\n- Both services must be running simultaneously\n- Example: Order Service calls Payment Service and waits\n\nWhen to use: immediate response required, data needed now\nProblems: temporal coupling, cascading failures if downstream is slow\n\nAsynchronous Communication (RabbitMQ/Kafka):\n- Caller publishes message and continues immediately\n- Consumer processes when available\n- Example: Order Service publishes event → queue → Payment Service processes later\n\nWhen to use: background processing, tolerate delay, decoupled workflows\n\nBest practice:\nUse synchronous for user-facing real-time operations.\nUse asynchronous for background work and cross-service event propagation.", theory: "Synchronous is like a phone call — both parties must be present simultaneously. Asynchronous is like sending a letter — the sender does not wait. In microservices, synchronous chains create brittleness: one slow service in a chain of 5 makes everything slow. Asynchronous messaging breaks this coupling through a durable message broker that buffers messages when consumers are busy or down." }
    ],
    Intermediate: [
      { q: "What is the difference between REST, RabbitMQ, and Kafka?", a: "| Feature | REST | RabbitMQ | Kafka |\n|---------|------|----------|-------|\n| Style | Synchronous | Asynchronous | Asynchronous |\n| Pattern | Request/Response | Queue Based | Event Streaming |\n| Response | Immediate | Delayed | Delayed |\n| Persistence | No | Until consumed | Configurable retention |\n| Throughput | Medium | Medium-High | Very High |\n| Message replay | No | No | Yes |\n| Best for | User APIs | Task queues | Event streaming, analytics |\n\nREST: client needs immediate response, simple CRUD, external-facing APIs\n\nRabbitMQ: background processing, work queues, reliable delivery\nExample: Order placed → queue → email service sends confirmation\n\nKafka: very high throughput, multiple consumers need same events, event replay\nExample: Every user action tracked by analytics AND fraud detection simultaneously", theory: "Think of REST as a telephone call (synchronous, immediate), RabbitMQ as postal mail (asynchronous queue, delivered once, discarded), and Kafka as a newspaper subscription (published once, multiple subscribers, archived editions available for replay). Kafka's key innovation is a distributed commit log — every event is stored durably and consumers track their own position (offset). This enables time-travel: replay past events to populate a new service." },
      { q: "When would you use RabbitMQ?", a: "RabbitMQ is useful for:\n\n1. Email notifications: User places order → queue → Email Service sends confirmation\n   - Decoupled: Email Service failure does not fail the order\n\n2. Order processing: Queue handles traffic spikes, workers process at sustainable rate\n\n3. Background jobs: PDF generation, image resizing, video transcoding\n   - CPU-intensive tasks offloaded from main request thread\n\n4. Task queues with worker pools:\n   - Multiple workers consume from same queue\n   - RabbitMQ distributes tasks round-robin\n   - Easy horizontal scaling by adding workers\n\n5. Decoupled communication:\n   - Service A does not need to know Service B exists\n\nWhen NOT to use RabbitMQ:\n- Need message replay (use Kafka)\n- Need millions of events per second (Kafka scales better)\n- Multiple independent consumer groups (Kafka's strength)", theory: "RabbitMQ is built around exchanges and queues. Producers publish to exchanges; exchanges route messages to queues; consumers pull from queues. Messages are deleted after acknowledgment — ideal for tasks that should happen exactly once. The dead letter queue (DLQ) pattern handles failures: failed messages go to DLQ for inspection rather than being lost silently." },
      { q: "What is the difference between Kafka and RabbitMQ?", a: "RabbitMQ (Message Broker / Queue):\n- Queue-based: each message goes to one consumer\n- Messages deleted after acknowledged consumption\n- Better for: task queues, background jobs\n- Easier setup and management\n\nKafka (Event Streaming Platform / Distributed Log):\n- Topic-based: multiple consumer groups read independently\n- Messages retained for configurable duration (days/weeks)\n- Consumers track their own offset (position in log)\n- Better for: event streaming, audit logs, analytics, event sourcing\n- Handles millions of messages per second\n- Replay capability: new service can read all past events\n\nKey difference — message retention:\n- RabbitMQ: message consumed → deleted\n- Kafka: message retained until TTL expires regardless of consumption\n\nExamples:\nRabbitMQ: send one email per order (one consumer)\nKafka: order event consumed by Analytics AND Email AND Inventory independently", theory: "The fundamental difference: RabbitMQ is a message broker (smart routing, ensures delivery, deletes after consumption). Kafka is a distributed commit log (retention-based, consumers manage their own position). RabbitMQ answers please do this task; Kafka answers this event happened. Kafka's retention makes it powerful for event sourcing — you can add a new service that replays the entire event history to build its own read model." },
      { q: "What is the Circuit Breaker Pattern?", a: "Circuit Breaker prevents repeated requests to an unhealthy service, allowing it time to recover while protecting the caller from cascading failures.\n\nStates:\n\n1. CLOSED (normal operation):\n   - All requests pass through\n   - Monitors failure rate\n   - If failures exceed threshold (e.g., 50% in last 10 calls) → OPEN\n\n2. OPEN (service is failing):\n   - Requests immediately rejected with fallback response\n   - No calls made to downstream service\n   - After timeout period (e.g., 30 seconds) → HALF-OPEN\n\n3. HALF-OPEN (testing recovery):\n   - Allow a small number of test requests through\n   - If successful → CLOSED\n   - If failed → back to OPEN\n\nBenefits:\n- Prevents cascading failures\n- Improves system resilience\n- Fast-fail instead of waiting for timeout", theory: "The Circuit Breaker was popularized by Michael Nygard's 'Release It!'. A failing service does not just fail — it causes slowness as threads block waiting for timeout. Circuit Breaker fast-fails, returning immediately with an error or degraded response. This preserves system resources and lets other features continue working while one service recovers. Netflix's Hystrix was the pioneer implementation." },
      { q: "What is the difference between Retry and Circuit Breaker?", a: "Retry Pattern:\n- Recovers from transient (temporary) failures\n- Automatically retries the request after failure\n- Works for: network hiccups, momentary service restarts\n\nExample with exponential backoff:\n- Attempt 1 Failed → wait 1s\n- Attempt 2 Failed → wait 2s\n- Attempt 3 Success\n\nCircuit Breaker Pattern:\n- Protects system from cascading failures when service is persistently down\n- Stops calling the failing service after threshold\n- Works for: extended outages, overloaded services\n\nUsed together:\nRequest → Retry (3 times) → if still failing → Circuit Breaker opens\nCircuit Breaker open → return fallback immediately (no retry)\n\nInterview Answer:\nRetry helps recover from temporary failures while Circuit Breaker protects the system from continuously calling unhealthy services.", theory: "Retry alone is dangerous: if a service is truly down, retrying means N x M calls hammering the struggling service, making recovery harder — the retry storm problem. Circuit Breaker solves it by failing fast after detecting a pattern of failures. The combination: retry handles the blip (brief network issue), circuit breaker handles the outage. Always add jitter to retries to prevent multiple clients retrying in synchrony." },
      { q: "What is the Timeout Pattern?", a: "Timeout stops waiting for a service response after a specified time, preventing threads from blocking indefinitely.\n\nProblem without Timeout:\n- Order Service calls Payment Service\n- Payment Service is slow (DB overload)\n- Order Service thread blocks indefinitely\n- Thread pool exhausts → Order Service becomes unresponsive\n\nWith Timeout (3 seconds):\n- Payment does not respond in 3 seconds\n- Request fails fast with TimeoutException\n- Thread freed immediately\n- User gets error response quickly\n\nTimeout values:\n- External API calls: 5-10 seconds\n- Internal service calls: 1-3 seconds\n- Database queries: 2-5 seconds\n\nBest practice: use timeout + retry + circuit breaker together.", theory: "Timeout is the first and most basic resilience pattern. Without it, slow downstream services cause thread exhaustion. Threads are finite: a service with 200 threads blocking on 30-second timeouts can only handle ~6 requests per second before becoming unresponsive. Measure P99 latency of the downstream service and set timeout to 3-5x that value." },
      { q: "What is the Bulkhead Pattern?", a: "Bulkhead isolates resources so failure in one service does not impact others.\n\nNamed after ship bulkheads: compartments prevent flooding in one section from sinking the entire ship.\n\nProblem without Bulkhead:\n- All calls share one thread pool (100 threads)\n- Notification Service becomes slow\n- 100 threads exhausted waiting for Notification\n- Payment Service calls fail too — no threads available\n\nWith Bulkhead (separate thread pools):\n- Payment Thread Pool: 40 threads\n- Inventory Thread Pool: 30 threads\n- Notification Thread Pool: 30 threads\n\nResult:\n- Notification Service slow → its 30 threads exhaust\n- Payment Service continues with its own 40 threads — unaffected\n\nIf Notification Service crashes, Payment Service continues working.", theory: "Netflix used Bulkhead in Hystrix to ensure a slow Recommendations service (non-critical) could not take down the critical Playback service. The key insight: resource isolation prevents a non-critical feature failure from impacting critical functionality. Shared thread pools are the single hull — one slow service floods all threads and sinks the ship." },
      { q: "What is the Saga Pattern?", a: "Saga Pattern manages distributed transactions across multiple microservices using compensation actions.\n\nExample:\n1. Create Order\n2. Reserve Inventory\n3. Process Payment\n\nIf Payment fails:\n1. Restore Inventory (compensating transaction)\n2. Cancel Order (compensating transaction)\n\nKey principles:\n- Each step has a compensating transaction (undo operation)\n- Saga guarantees eventual consistency\n- No distributed locks or two-phase commit needed\n\nTwo types:\n1. Choreography Saga: services react to events (decentralized)\n2. Orchestration Saga: central coordinator controls the flow", theory: "The Saga pattern was introduced in 1987 for long-running transactions. In microservices, it replaces two-phase commit (2PC) — too slow and fragile for production. Sagas achieve eventual consistency through compensation rather than rollback. The critical insight: design compensating transactions upfront for every step that can fail. Compensation is not always a perfect rollback — a sent email cannot be unsent, so compensations are semantic undo operations." },
      { q: "Why can't we use traditional database transactions in Microservices?", a: "Traditional ACID transactions work within a single database. In microservices, each service owns its own database — a single transaction cannot span multiple databases.\n\nACID in Microservices:\n- Order Service DB is PostgreSQL on server 1\n- Payment Service DB is MySQL on server 2\n- No single database connection spans both\n\nTwo-Phase Commit (2PC) problems:\n- Requires distributed locks (very slow)\n- If coordinator crashes, databases stuck in locked state\n- Blocking protocol — not suitable for microservices at scale\n\nSolution: Saga Pattern\n- Break transaction into local transactions\n- Each service commits immediately\n- If a later step fails, compensating transactions undo earlier steps\n- Eventual consistency instead of immediate consistency", theory: "The CAP theorem states distributed systems can guarantee at most two of: Consistency, Availability, Partition Tolerance. Most microservices choose AP (Availability + Partition Tolerance), accepting eventual consistency. Traditional ACID transactions require distributed locks (2PC) — too slow and fragile for production microservices. Saga embraces eventual consistency, which aligns with how real-world business processes work anyway." },
      { q: "What is the difference between Choreography and Orchestration Saga?", a: "Choreography Saga (Event-Driven):\n- No central coordinator\n- Each service publishes events and reacts to events from other services\n\nExample:\nOrder Created event → Inventory Service reserves → Inventory Reserved event → Payment Service processes → Payment Processed event → Order confirmed\n\nAdvantages: Truly decoupled, no single point of failure\nDisadvantages: Hard to track workflow status, complex debugging\n\nOrchestration Saga (Central Coordinator):\n- Dedicated Saga Orchestrator controls the flow\n\nExample:\nSaga Orchestrator → calls Order Service → calls Inventory → calls Payment → calls Order Confirm\nOn failure: calls compensation services explicitly\n\nAdvantages: Clear visibility, easier to debug\nDisadvantages: Orchestrator is a critical service, tighter coupling\n\nChoose Choreography for: simple 2-3 step sagas, truly independent services\nChoose Orchestration for: complex flows, need visibility", theory: "Choreography vs Orchestration mirrors jazz vs symphony orchestra. In jazz (choreography), each musician listens and responds — decentralized, flexible. In a symphony (orchestration), a conductor directs each part — centralized, clear. Choreography aligns with event-driven architecture but becomes hard to reason about at scale (event spaghetti). Orchestration via AWS Step Functions or Temporal.io provides workflow visibility at the cost of a coordinator service." },
      { q: "What happens if the Payment Service fails after Inventory is reduced?", a: "Compensation transactions are executed:\n\nStep 1: Order Service creates order (PENDING)\nStep 2: Inventory Service reduces stock\nStep 3: Payment Service fails\n\nSaga compensation triggers:\n- Payment Service publishes 'Payment Failed' event\n- Inventory Service: Restore Inventory (compensating transaction)\n- Order Service: Cancel Order\n\nFinal state: inventory restored, order cancelled, customer not charged\n\nThis ensures data consistency through compensation rather than rollback.", theory: "This illustrates the partial execution problem of distributed transactions. With a monolith, BEGIN/ROLLBACK cleanly undoes everything. In microservices, there is no global rollback — Saga compensations are semantic undos. The critical design requirement: every saga step that modifies state must have a defined compensating transaction before it is implemented. Teams that skip this end up with inconsistent data and no clean recovery path." },
      { q: "What is Eventual Consistency?", a: "Data may not be immediately consistent across services but becomes consistent eventually.\n\nExample:\nAt t=0ms: User places order\nAt t=1ms: Order Service marks order CONFIRMED\nAt t=5ms: Inventory Service still shows old stock (update pending)\nAt t=10ms: Analytics Service still shows old data\nAt t=50ms: All services are consistent\n\nDuring that 50ms window: different services show different data — this is eventual consistency.\n\nAcceptable for: social media likes, search index updates, analytics dashboards\nNot acceptable for: bank account balance, airline seat booking, inventory overselling", theory: "Eventual consistency comes from Werner Vogels (Amazon CTO) who described Amazon's distributed systems. It is a trade-off: by relaxing consistency, you gain availability and partition tolerance (CAP theorem). DNS is the classic example — updating a DNS record does not propagate instantly. Different users may see different IPs for minutes, but eventually all see the new value. Microservices embrace eventual consistency for the same reason." },
      { q: "Why is a Shared Database considered bad in Microservices?", a: "Problems with Shared Database:\n\n1. Tight Coupling:\n   - User Service needs to rename a column in a shared Users table\n   - Order Service must be updated and deployed at the same time\n   - Defeats independent deployment\n\n2. Deployment Dependencies:\n   - Teams must coordinate all schema changes\n\n3. Difficult Scaling:\n   - Cannot scale one service's DB independently\n   - All services compete for the same database resources\n\n4. Schema Conflicts:\n   - Multiple teams modifying same tables causes migration conflicts\n\n5. Blast radius:\n   - One service's bad query slows all others\n\nPreferred approach: Database Per Service\nEach service owns its data and exposes it only through its API", theory: "The shared database anti-pattern is the most common microservices mistake. Teams split code into services but leave the database shared. The database becomes the hidden coupling point — the monolith at the data layer. Sam Newman's 'Building Microservices' identifies this as the top anti-pattern. The rule: if two services share a database table, they should be one service." },
      { q: "What is Idempotency in Microservices?", a: "Multiple identical requests produce the same result.\n\nExample:\nUser clicks payment button twice.\n\nWithout Idempotency: Payment charged twice.\nWith Idempotency: Payment charged once.\n\nWhy critical in Microservices:\n- Network failures cause retries\n- Message queues deliver at-least-once\n- Users double-click submit buttons\n\nImplementation — Idempotency Key:\nPOST /payments\nIdempotency-Key: order-123-payment-attempt-1\n{ amount: 1000, currency: 'INR' }\n\nServer behavior:\n- First request: process payment, store result with idempotency key\n- Duplicate request (same key): return stored result (do not charge again)\n\nOther techniques: Database unique constraints, Upsert operations, Event deduplication", theory: "Idempotency is a mathematical concept: f(f(x)) = f(x). In distributed systems, exactly-once delivery does not exist — at-least-once is the best achievable. Every operation with side effects (charges money, sends emails, reduces inventory) must be safely callable multiple times with the same input. Stripe's API is the gold standard: every POST accepts an Idempotency-Key header making their entire payments API retry-safe." },
      { q: "How do Microservices handle Authentication?", a: "Typically using JWT, with authentication centralized at the API Gateway.\n\nFlow:\nClient → API Gateway → JWT Validation → Microservices\n\nStep by step:\n1. User logs in → Auth Service validates credentials\n2. Auth Service issues JWT token (signed with secret)\n3. Client includes JWT: Authorization: Bearer <token>\n4. API Gateway validates JWT signature\n5. Gateway extracts user info and forwards to microservices\n6. Microservices trust the forwarded user info (no re-validation needed)\n\nBenefits:\n- Centralized authentication: auth logic in one place\n- Stateless: no shared session store needed\n- Self-contained: user info in token (no DB lookup per request)\n- Reduced duplicate logic across services", theory: "JWT solves the stateless authentication challenge in microservices. With session-based auth, every service needs access to the session store, creating coupling. JWT encodes user identity and claims in the token itself — any service can validate it using the public key without a central lookup. The API Gateway as the authentication boundary means internal services operate in a trusted zone." },
      { q: "If the Payment Service is down, what strategies would you use?", a: "Use multiple resilience strategies together:\n\n1. Circuit Breaker:\n   - Detects 50%+ error rate → opens circuit\n   - Stops forwarding requests immediately\n   - Returns fallback response without waiting for timeout\n\n2. Retry Mechanism:\n   - Retry transient failures with exponential backoff: 1s, 2s, 4s\n   - Max 3 retries before giving up\n\n3. Timeout:\n   - Payment requests fail after 3 seconds\n   - Thread freed quickly\n\n4. Fallback Response:\n   - Queue payment request for later processing\n   - Return 'Payment pending, we will process shortly'\n\n5. Graceful Degradation:\n   - Allow browsing and cart to continue\n   - Disable checkout temporarily\n\n6. Monitoring Alerts:\n   - Alert on-call engineer immediately\n   - Dashboard shows circuit state and error rates\n\n7. Bulkhead:\n   - Payment thread pool separate from other operations", theory: "Defense in depth for distributed systems: design for failure, not just success. Each resilience pattern targets a different failure mode: Timeout prevents thread exhaustion, Retry recovers from transient failures, Circuit Breaker prevents cascades, Bulkhead isolates blast radius. The fallback strategy is a business decision: is a payment pending message acceptable? Can the order proceed and complete payment asynchronously?" },
      { q: "An Order Service receives 10,000 requests per minute. How will you handle it?", a: "Strategies for handling 10,000 req/min (166 req/sec):\n\n1. Horizontal Scaling:\n   - Deploy multiple Order Service instances\n   - Kubernetes HPA adds instances when CPU > 70%\n   - Load balancer distributes traffic\n\n2. Load Balancer:\n   - Nginx or AWS ALB in front of instances\n   - Health checks remove unhealthy instances\n\n3. Redis Caching:\n   - Cache product details, pricing, user profiles\n   - Reduces DB load significantly\n\n4. RabbitMQ/Kafka (Async Processing):\n   - Post-order steps (email, analytics, inventory) via message queue\n   - Decouples fast path from slow downstream processing\n\n5. Database Optimization:\n   - Read replicas for read-heavy queries\n   - Connection pooling\n   - Query optimization and proper indexing\n\n6. Auto Scaling:\n   - Kubernetes HPA based on CPU/memory\n   - KEDA based on queue depth", theory: "10,000 req/min is a common scale interview benchmark. The key insight: most web service bottlenecks are at the database, not application code. A horizontally-scaled stateless service with an unscaled database just shifts the bottleneck. Comprehensive scaling requires thinking about each tier: application (horizontal pods), cache (Redis), database (read replicas, connection pooling), and async processing (queue for post-order work)." },
      { q: "How do you prevent duplicate Order creation?", a: "Use multiple layers of protection:\n\n1. Idempotency Keys (Client-Side):\n   - Client generates unique key: UUID v4\n   - Header: Idempotency-Key: uuid-here\n   - Server stores result; duplicate requests return same result\n\n2. Database Constraints:\n   - Unique constraint on (user_id, idempotency_key)\n   - Database rejects duplicate inserts\n\n3. Redis Distributed Lock:\n   - SET lock:order:cart-123 1 EX 10 NX (atomic check-and-set)\n   - Only one request processes the order at a time\n\n4. Order Status Check:\n   - Check if order for this cart already in PENDING/CONFIRMED state\n\n5. Frontend Prevention:\n   - Disable submit button after first click\n   - Must be backed by server-side idempotency", theory: "Duplicate prevention requires atomic operations. The naive check-then-act pattern has a race condition: two concurrent requests both check (no duplicate found), both proceed (duplicate created). Correct solutions use atomic operations: SET NX in Redis, INSERT with unique constraint in database. Defense in depth: frontend disables button (UX), idempotency key prevents logical duplicates, database constraints catch concurrent duplicates." },
      { q: "How would you send emails after Order placement?", a: "Order Service publishes message. RabbitMQ Queue receives message. Email Service consumes message and sends email.\n\nStep by step:\n1. Order Service creates order in DB (synchronous)\n2. Order Service publishes event to queue: { orderId, email, items, total }\n3. Order Service returns 200 to user immediately\n4. Email Service consumes the message from queue\n5. Email Service sends email via provider (SendGrid, SES)\n6. If email fails: queue retries automatically (up to 3 times)\n7. If all retries fail: message goes to Dead Letter Queue (DLQ)\n\nWhy not call Email Service directly:\n- If Email Service is down, Order creation fails\n- Email sending adds 2-3 seconds to response time\n- Tight coupling\n\nBenefits of queue-based approach:\n- Decoupled architecture\n- Better scalability\n- Resilient: queue retains message if Email Service is down", theory: "Email sending is the canonical example for asynchronous messaging in microservices. It has all properties that make async ideal: it is a side effect (not part of the core business operation), it can tolerate delay, it is fire-and-forget, and it can fail without blocking the primary operation. The outbox pattern extends this: write the event to an outbox table in the same DB transaction, then a background process reliably publishes to the queue." },
      { q: "How would you design an E-Commerce Checkout Flow?", a: "Architecture:\nClient → API Gateway → Order Service → Inventory Service → Payment Service → Notification Service\n\nConcepts Used:\n- API Gateway, Service Discovery, RabbitMQ/Kafka\n- Saga Pattern, Circuit Breaker, Redis, Docker, Kubernetes\n\nCheckout Flow (Happy Path):\n1. Client → API Gateway → validates JWT → routes to Order Service\n2. Order Service creates order (PENDING), calls Inventory Service (sync): reserve items\n3. Inventory Service checks availability, reserves items, returns confirmation\n4. Order Service calls Payment Service (sync) with idempotency key\n5. On Payment Success:\n   - Update order to CONFIRMED\n   - Deduct inventory (async via event)\n   - Send confirmation email (async via queue)\n   - Log to analytics (async via Kafka)\n\nFailure Handling (Saga Pattern):\nIf Payment fails after step 3:\n- Restore Inventory (compensation)\n- Cancel Order (compensation)", theory: "This is the capstone microservices design question — it tests whether you can apply all patterns together coherently. The key design decisions: what is synchronous (user-facing, needs immediate confirmation) vs asynchronous (side effects, can be delayed); where Circuit Breakers prevent cascades; how Saga manages distributed transactions; how Idempotency prevents duplicates. Great architects draw service boundaries first, define communication patterns second, then add resilience patterns." }
    ]
  }
};

const challenges = {
  React: [
    {
      level: "Beginner",
      tag: "CODE",
      title: "Counter App",
      q: `Problem: Build a simple counter component with Increment, Decrement, and Reset buttons. The count should never go below 0.`,
      code: `import { useState } from "react";

function Counter() {
  // [1] useState initializes count to 0. 'count' is the current value,
  //     'setCount' is the function to update it — triggers a re-render.
  const [count, setCount] = useState(0);

  // [2] Functional updater form (prev => ...) is used because the new
  //     value depends on the previous one. Safer than using 'count'
  //     directly when updates may batch together.
  const increment = () => setCount(prev => prev + 1);

  // [3] Math.max(0, prev - 1) ensures count never drops below 0.
  //     This is the constraint from the problem — handle edge cases in logic.
  const decrement = () => setCount(prev => Math.max(0, prev - 1));

  // [4] Reset always goes back to 0 — no need for functional updater
  //     since we're not depending on the previous value.
  const reset = () => setCount(0);

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      {/* [5] Display count. React re-renders this whenever setCount is called. */}
      <h2 style={{ fontSize: 48, margin: "0 0 16px" }}>{count}</h2>

      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        {/* [6] Each button calls its handler on click.
                Arrow functions in JSX create new refs each render —
                acceptable here since these are simple, non-memoized components. */}
        <button onClick={decrement}>− Decrement</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+ Increment</button>
      </div>

      {/* [7] Conditional rendering — show a message when count hits 0.
              Uses && operator: only renders if count === 0 is truthy. */}
      {count === 0 && <p style={{ color: "#9ca3af", marginTop: 12 }}>Count is at minimum</p>}
    </div>
  );
}

export default Counter;`,
      note: `Line-by-line notes:
[1] useState(0) — always provide a meaningful initial value. Here 0 makes semantic sense for a counter.
[2] Functional updater setCount(prev => prev + 1) — React batches state updates in event handlers. Using prev guarantees you're working with the latest state, not a stale closure value.
[3] Math.max(0, prev - 1) — business logic lives in the updater. One line enforces the "no negatives" requirement cleanly.
[4] setCount(0) is fine for reset because we don't care what the previous value was — we're setting an absolute value.
[5] JSX automatically re-renders when state changes. You never manually touch the DOM — React handles it.
[6] onClick={decrement} passes a reference, not a call. onClick={decrement()} would call it immediately on render — a classic bug.
[7] {count === 0 && <p>...} — the && short-circuits: if count === 0 is false, nothing renders. Safe here because the left side is a boolean (not a number like count directly).`
    
    },
    {
      level: "Beginner",
      tag: "CODE",
      title: "Toggle Show/Hide",
      q: `Problem: Build a component that toggles visibility of a text section. Clicking a button should show or hide a paragraph. The button label should change based on the current state ("Show Details" / "Hide Details").`,
      code: `import { useState } from "react";

function ToggleDetails() {
  // [1] Boolean state — the simplest form. true = visible, false = hidden.
  //     Name it descriptively: 'isVisible' reads like plain English in JSX.
  const [isVisible, setIsVisible] = useState(false);

  // [2] Toggle pattern: always flip the previous value.
  //     Using (prev => !prev) is correct even if multiple toggles fire rapidly —
  //     each one correctly flips from whatever state actually is, not a stale snapshot.
  const toggle = () => setIsVisible(prev => !prev);

  return (
    <div style={{ padding: 20 }}>
      {/* [3] The button label is derived from state — single source of truth.
              No separate 'buttonLabel' state needed; compute it from existing state. */}
      <button onClick={toggle}>
        {isVisible ? "Hide Details" : "Show Details"}
      </button>

      {/* [4] Conditional rendering with ternary vs &&:
              Using && here is fine because isVisible is always a boolean.
              If isVisible were a number (e.g. count), you'd use count > 0 && ... to avoid rendering "0". */}
      {isVisible && (
        <p style={{ marginTop: 12, color: "#94a3b8" }}>
          This is the hidden content. It only renders when isVisible is true.
          React removes this from the DOM entirely when false — not just hidden with CSS.
        </p>
      )}
    </div>
  );
}

export default ToggleDetails;`,
      note: `Key concepts practiced:
[1] Boolean state for show/hide is idiomatic React. Resist the urge to store "show" / "hide" as strings — booleans are easier to flip and compare.
[2] prev => !prev is the toggle pattern you'll use constantly. Memorize it. Never do setIsVisible(!isVisible) — that reads a potentially stale closure.
[3] Deriving the label from state (not a separate state variable) keeps your data model simple. A rule of thumb: if you can compute a value from existing state, don't store it as separate state.
[4] When React renders {false}, it renders nothing — this is how && conditional rendering works. But {0} renders the number 0 on screen, which is a common bug when using numbers with &&.`
    
    },
    {
      level: "Beginner",
      tag: "CODE",
      title: "Controlled Form with Validation",
      q: `Problem: Build a login form with email and password fields. Validate: email must contain "@", password must be at least 6 characters. Show error messages below each field. On successful submit, show a success message.`,
      code: `import { useState } from "react";

function LoginForm() {
  // [1] Controlled form state — each field maps to a state variable.
  //     The input's value prop is set from state, making React the single source of truth.
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  // [2] Separate error state object — keeps errors co-located and easy to update.
  const [errors, setErrors]     = useState({});

  // [3] Success flag — once submitted successfully, show confirmation instead of form.
  const [submitted, setSubmitted] = useState(false);

  // [4] Validation function returns an errors object.
  //     Empty object = valid (no errors). This pattern scales well as rules grow.
  const validate = () => {
    const errs = {};
    if (!email.includes("@"))       errs.email    = "Enter a valid email address.";
    if (password.length < 6)        errs.password = "Password must be at least 6 characters.";
    return errs;
  };

  const handleSubmit = (e) => {
    // [5] e.preventDefault() stops the browser's native form submission
    //     (which would reload the page). Always required in React form handlers.
    e.preventDefault();

    const errs = validate();

    // [6] Object.keys(errs).length === 0 checks if there are no errors.
    //     If validation passes, clear errors and show success state.
    if (Object.keys(errs).length === 0) {
      setErrors({});
      setSubmitted(true);
    } else {
      // [7] Set errors into state — React re-renders and shows messages below each field.
      setErrors(errs);
    }
  };

  // [8] Early return pattern — if submitted, show success screen instead of the form.
  //     Cleaner than wrapping the entire form in a conditional.
  if (submitted) {
    return <p style={{ color: "#34d399" }}>✓ Login successful! Welcome, {email}</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
      <div>
        {/* [9] value={email} makes this a controlled input — its display value
                always matches React state. onChange syncs every keystroke to state. */}
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px 12px", borderRadius: 6,
            border: \`1px solid \${errors.email ? "#f87171" : "#374151"}\` }}
        />
        {/* [10] Only render error message if errors.email exists (truthy).
                 Inline error display gives immediate feedback next to the offending field. */}
        {errors.email && <p style={{ color: "#f87171", fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px 12px", borderRadius: 6,
            border: \`1px solid \${errors.password ? "#f87171" : "#374151"}\` }}
        />
        {errors.password && <p style={{ color: "#f87171", fontSize: 12, marginTop: 4 }}>{errors.password}</p>}
      </div>

      {/* [11] type="submit" inside a form triggers the onSubmit handler.
               Alternatively you could use onClick on a button with type="button",
               but using form's onSubmit also captures Enter-key submission. */}
      <button type="submit" style={{ padding: "10px", borderRadius: 6, background: "#7c3aed", color: "#fff", border: "none", cursor: "pointer" }}>
        Login
      </button>
    </form>
  );
}

export default LoginForm;`,
      note: `Why each decision was made:
[1] Controlled inputs: every character typed updates state via onChange. This lets React always know the input's value — enabling real-time validation, disabling submit, formatting input, etc.
[2] One errors object instead of separate emailError/passwordError states — easier to update together and check if any errors exist.
[3] A separate submitted flag keeps form state clean — you're not checking if email/password are set correctly; you're tracking a distinct lifecycle event.
[4] Validation returns an object, not a boolean — this allows returning multiple errors at once and keeps the validation logic decoupled from the UI rendering.
[5] e.preventDefault() is the #1 thing to remember in React forms. Without it, the page refreshes on submit and all state is lost.
[6] Object.keys({}).length === 0 is idiomatic "empty object" check in JavaScript.
[7] Setting errors into state causes a re-render — the error messages appear automatically.
[8] Early return keeps the happy path and error path visually separated — easier to read than a big conditional block around the form.
[9] Border color changes red when there's an error — visual feedback using a ternary directly in the style prop.
[10] {errors.email && <p>} — only renders the error paragraph when there's an error string. Undefined is falsy, so it renders nothing.
[11] type="submit" lets the browser handle form submission semantics including Enter key — better UX than a plain onClick button.`
    
    },
    {
      level: "Beginner",
      tag: "CODE",
      title: "Todo List (Add & Delete)",
      q: `Problem: Build a todo list where users can add new todos via an input and button, and delete individual todos by clicking a delete button next to each item. Each todo should have a unique ID.`,
      code: `import { useState } from "react";

function TodoList() {
  // [1] todos is an array of objects: { id, text }.
  //     Start with an empty array — no hardcoded data in production.
  const [todos, setTodos] = useState([]);

  // [2] Separate input state for the "new todo" text field.
  //     This is lifted into the parent because the button (sibling of input) needs to read it.
  const [input, setInput]   = useState("");

  const addTodo = () => {
    // [3] Guard clause: don't add empty or whitespace-only todos.
    //     .trim() removes leading/trailing spaces before checking.
    if (!input.trim()) return;

    // [4] Spread existing todos and append the new one.
    //     Date.now() as ID is fine for small apps — use uuid in production.
    //     Never mutate the array directly (e.g. todos.push(...)) — React won't detect the change.
    setTodos(prev => [...prev, { id: Date.now(), text: input.trim() }]);

    // [5] Clear the input after adding — good UX, user can type the next item immediately.
    setInput("");
  };

  const deleteTodo = (id) => {
    // [6] Filter returns a NEW array excluding the deleted item.
    //     This is the correct immutable pattern — never splice the original array.
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // [7] Allow pressing Enter in the input field to add a todo —
  //     same outcome as clicking the button, better keyboard UX.
  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  };

  return (
    <div style={{ maxWidth: 400, padding: 20 }}>
      <h3>Todo List ({todos.length})</h3>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new todo..."
          style={{ flex: 1, padding: "8px 12px", borderRadius: 6, border: "1px solid #374151" }}
        />
        <button onClick={addTodo} style={{ padding: "8px 16px", borderRadius: 6, background: "#7c3aed", color: "#fff", border: "none", cursor: "pointer" }}>
          Add
        </button>
      </div>

      {/* [8] Show empty state message when no todos exist.
              Always handle the empty state — it's part of the UX. */}
      {todos.length === 0 && (
        <p style={{ color: "#6b7280", textAlign: "center" }}>No todos yet. Add one above!</p>
      )}

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {todos.map(todo => (
          // [9] key={todo.id} — unique stable ID, NOT the array index.
          //     Using index as key would cause bugs if todos are deleted out of order —
          //     React would map the wrong component to the wrong item.
          <li key={todo.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", marginBottom: 8, background: "rgba(255,255,255,0.05)", borderRadius: 8 }}>
            <span>{todo.text}</span>
            {/* [10] Pass todo.id to deleteTodo via arrow function.
                     Avoid onClick={deleteTodo(todo.id)} — that calls it immediately on render! */}
            <button onClick={() => deleteTodo(todo.id)} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: 16 }}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;`,
      note: `Why each decision matters:
[1] Array of objects (not array of strings) — objects let you attach an ID, completion status, timestamps later. Always design state to be extendable.
[2] Separate input state, not part of the todos array — the "draft" input is a different concern from the committed todo list.
[3] Guard clause at the top of addTodo — fail fast, return early. Cleaner than wrapping the whole body in an if.
[4] Immutable update: [...prev, newItem] — React uses referential equality to detect changes. Mutating the array directly (push, splice) won't trigger a re-render.
[5] Clearing input after submit is a UX detail but important — imagine typing 10 todos and having to clear the field manually each time.
[6] filter() is the idiomatic way to delete from a React array. It creates a new array, leaving the original untouched.
[7] onKeyDown Enter handling is a small UX detail that makes the app feel native. Check e.key not e.keyCode (deprecated).
[8] Empty state is part of the spec — always consider what the component looks like with zero data.
[9] Using Date.now() as an ID is quick but has a tiny risk of collision in rapid succession. For production, use crypto.randomUUID() or the uuid package.
[10] onClick={() => deleteTodo(todo.id)} — the arrow function wraps the call, so deleteTodo only fires when clicked, not during render. A very common React bug is () missing.`
    
    },
    {
      level: "Beginner",
      tag: "CODE",
      title: "Star Rating Component",
      q: `Problem: Build a reusable StarRating component that accepts a totalStars prop (default 5). The user can click a star to set the rating and hover over stars to preview the rating before clicking. Highlight filled stars in gold.`,
      code: `import { useState } from "react";

// [1] totalStars prop with default value — makes the component flexible.
//     A caller can do <StarRating totalStars={10} /> for a 10-star scale.
function StarRating({ totalStars = 5, onRate }) {
  // [2] rating = the committed (clicked) rating. 0 means nothing selected.
  const [rating, setRating]   = useState(0);

  // [3] hovered = the star currently under the mouse cursor (preview state).
  //     Separate from rating because hovering doesn't commit a choice yet.
  const [hovered, setHovered] = useState(0);

  // [4] The displayed fill = hovered if hovering, else the committed rating.
  //     This single derived value drives all star colors — no per-star state.
  const displayValue = hovered || rating;

  const handleClick = (starIndex) => {
    // [5] Clicking the same star again deselects (toggle off). UX pattern.
    const newRating = starIndex === rating ? 0 : starIndex;
    setRating(newRating);
    // [6] Optional callback to notify parent of the selected rating.
    //     The parent can use this for form submission, API calls, etc.
    onRate?.(newRating);
  };

  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      {/* [7] Array.from creates [1,2,3,4,5] to map over.
               Each element becomes one star button. */}
      {Array.from({ length: totalStars }, (_, i) => i + 1).map(star => (
        <button
          key={star}
          onClick={() => handleClick(star)}
          // [8] onMouseEnter/Leave manage hover preview.
          //     Leave resets hovered to 0, which falls back to committed rating.
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 28,
            padding: 2,
            // [9] Transition makes the color change smooth on hover.
            transition: "transform 0.1s",
            transform: hovered === star ? "scale(1.2)" : "scale(1)",
            // [10] Fill gold if within displayValue, otherwise gray.
            //      This is the entire "which stars are filled" logic — one ternary.
            color: star <= displayValue ? "#f59e0b" : "#374151",
          }}
          // [11] aria-label for screen readers — accessibility matters in interviews.
          aria-label={\`Rate \${star} out of \${totalStars}\`}
        >
          ★
        </button>
      ))}

      {/* [12] Show selected rating as text — "3 / 5" gives precise feedback. */}
      <span style={{ color: "#6b7280", fontSize: 13, marginLeft: 8 }}>
        {rating > 0 ? \`\${rating} / \${totalStars}\` : "Not rated"}
      </span>
    </div>
  );
}

// Usage example
export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h3>Rate this product</h3>
      <StarRating totalStars={5} onRate={(r) => console.log("Rated:", r)} />
    </div>
  );
}`,
      note: `Key concepts this challenge tests:
[1] Default prop value (totalStars = 5) — always give sensible defaults for optional props. This makes the component usable with just <StarRating /> and configurable when needed.

[2] Two separate state variables (rating vs hovered) — a common interview mistake is trying to use one state for both. They represent different things: rating is committed data, hovered is transient UI state.

[3] hovered state tracks mouse position. Without it you'd have to derive hover state from DOM events and CSS, which is messy.

[4] displayValue = hovered || rating — this is the elegant part. || (OR) means: use hovered if it's non-zero (truthy), otherwise fall back to rating. One derived value drives all star colors.

[5] Toggle-off: if user clicks the already-selected star, deselect it. Small UX detail that shows thoughtfulness.

[6] onRate?.() uses optional chaining — calling the function only if it was passed as a prop. Avoids TypeError if parent doesn't pass onRate.

[7] Array.from({length: n}, (_, i) => i + 1) generates [1,2,3,4,5]. This is the standard way to create a range array in modern JS without a for loop.

[8] onMouseEnter/onMouseLeave on each star — React's synthetic events. This is cleaner than CSS :hover for star ratings because JS needs to know which star is hovered.

[9] CSS transform: scale(1.2) on hover creates a subtle grow effect. Small micro-interactions make components feel polished.

[10] star <= displayValue is the entire fill logic. Elegant one-liner. If star=3 and displayValue=4, stars 1,2,3,4 are gold.

[11] aria-label on buttons — interviews often ask about accessibility. Buttons without text need labels for screen readers.`
    
    },
    {
      level: "Beginner",
      tag: "CODE",
      title: "Accordion / FAQ Component",
      q: `Problem: Build an Accordion component that receives an array of FAQ items [{question, answer}]. Only one item should be open at a time — opening a new item closes the previous one. Clicking an open item should close it.`,
      code: `import { useState } from "react";

const faqs = [
  { id: 1, question: "What is React?",          answer: "A JavaScript library for building user interfaces using components." },
  { id: 2, question: "What are React Hooks?",   answer: "Functions that let you use state and lifecycle features in functional components." },
  { id: 3, question: "What is the virtual DOM?",answer: "A lightweight in-memory copy of the real DOM used to optimize updates." },
  { id: 4, question: "What is JSX?",            answer: "A syntax extension that lets you write HTML-like markup inside JavaScript." },
];

function Accordion({ items }) {
  // [1] Store only the ID of the open item (not a boolean per item).
  //     null means nothing is open. This automatically ensures only one is open —
  //     setting a new ID implicitly "closes" the previous one.
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    // [2] If clicked item is already open → close it (set null).
    //     If a different item is clicked → open it (set its id).
    //     This single line handles both cases.
    setOpenId(prev => prev === id ? null : id);
  };

  return (
    <div style={{ maxWidth: 600 }}>
      {items.map((item) => {
        // [3] Derive isOpen from state — don't store it separately.
        //     This is the "derive from state" principle: compute what you can.
        const isOpen = openId === item.id;

        return (
          <div key={item.id} style={{ marginBottom: 8, borderRadius: 10, overflow: "hidden", border: \`1px solid \${isOpen ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.08)"}\`, transition: "border 0.2s" }}>
            {/* [4] The header is a button for accessibility.
                     Using <div onClick> would not be keyboard-navigable.
                     Buttons get focus, Enter/Space activation for free. */}
            <button
              onClick={() => handleToggle(item.id)}
              style={{ width: "100%", background: isOpen ? "rgba(124,58,237,0.1)" : "rgba(255,255,255,0.03)", border: "none", cursor: "pointer", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}
              // [5] aria-expanded communicates open/closed state to screen readers.
              aria-expanded={isOpen}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{item.question}</span>
              {/* [6] Rotate the chevron 180° when open — pure CSS transform driven by state.
                       No separate icon swap needed. */}
              <span style={{ color: "#7c3aed", fontSize: 18, transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s", display: "inline-block" }}>▾</span>
            </button>

            {/* [7] Conditional render: when closed, the element is removed from DOM entirely.
                     For smoother animation, you could use max-height CSS transition instead,
                     but DOM removal is simpler and fine for most use cases. */}
            {isOpen && (
              <div style={{ padding: "0 20px 16px", color: "#94a3b8", fontSize: 13.5, lineHeight: 1.7, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ marginBottom: 16 }}>FAQ</h3>
      <Accordion items={faqs} />
    </div>
  );
}`,
      note: `Design decisions explained:
[1] Single openId state (not a boolean array) — this is the key insight. Storing one ID instead of an array of booleans automatically enforces the "only one open" rule. If you stored [false, true, false, false], you'd need extra logic to close others when one opens.

[2] setOpenId(prev => prev === id ? null : id) — this single ternary handles both toggle-close and open-new. The functional updater is used because the new value depends on the previous value.

[3] const isOpen = openId === item.id — derived inside the loop. No extra state, no side effects. Each item knows if it's open by comparing its own ID to the single source of truth.

[4] <button> for the header — a very common accessibility mistake is using <div onClick>. Buttons are natively focusable with Tab, activatable with Enter/Space, and recognized by screen readers as interactive. Always use semantic elements.

[5] aria-expanded is an ARIA attribute that communicates accordion state to assistive technologies. Interviewers increasingly ask about accessibility.

[6] CSS transform: rotate(180deg) driven by state — elegant way to animate a chevron without swapping icons. The transition property makes it smooth.

[7] Conditional rendering removes the answer from the DOM. An alternative for smoother animation: CSS max-height transition (0 when closed, some large value when open). DOM removal is fine for basic accordions but can cause reflow if items are large.`
    
    },
    {
      level: "Intermediate",
      tag: "CODE",
      title: "Pagination Component",
      q: `Problem: You have an array of 50 users. Build a pagination component that shows 5 users per page with Previous / Next buttons and page number indicators. The current page button should be visually highlighted.`,
      code: `import { useState } from "react";

// [1] Generate dummy data outside the component — it doesn't depend on props/state,
//     so there's no reason to recreate it on every render.
const ALL_USERS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: \`User \${i + 1}\`,
  email: \`user\${i + 1}@example.com\`,
}));

const PAGE_SIZE = 5; // [2] Named constant — easy to change in one place.

function Pagination() {
  // [3] Only store the current page number in state — everything else is derived.
  //     Storing the visible items separately would be duplicate state.
  const [currentPage, setCurrentPage] = useState(1);

  // [4] Derived values — computed from state on every render, no extra useState needed.
  const totalPages  = Math.ceil(ALL_USERS.length / PAGE_SIZE);
  const startIndex  = (currentPage - 1) * PAGE_SIZE;   // e.g. page 2 → index 5
  const endIndex    = startIndex + PAGE_SIZE;            // e.g. page 2 → index 10
  const currentData = ALL_USERS.slice(startIndex, endIndex); // [5] slice doesn't mutate original

  // [6] Array.from({length: totalPages}) creates [1, 2, 3, ..., totalPages]
  //     Used to render the page number buttons dynamically.
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goToPage = (page) => {
    // [7] Clamp to valid range — defensive programming.
    //     Prevents going to page 0 or past the last page.
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: 20, maxWidth: 500 }}>
      <h3>Users (Page {currentPage} of {totalPages})</h3>

      {/* [8] Render only the current page's data — not all 50 users.
              This is the core of pagination: slice the data, render the slice. */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {currentData.map(user => (
          <li key={user.id} style={{ padding: "10px 12px", marginBottom: 6, background: "rgba(255,255,255,0.05)", borderRadius: 8 }}>
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div style={{ display: "flex", gap: 6, marginTop: 16, alignItems: "center", flexWrap: "wrap" }}>
        {/* [9] Disable the button at boundaries — don't let users go to page 0 or page N+1.
                disabled prop makes the button unclickable and visually grayed out. */}
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}
          style={{ padding: "6px 12px", borderRadius: 6, cursor: currentPage === 1 ? "not-allowed" : "pointer", opacity: currentPage === 1 ? 0.4 : 1 }}>
          ← Prev
        </button>

        {/* [10] Map over page numbers to render each page button.
                 Highlight the active page with different background — visual feedback. */}
        {pageNumbers.map(num => (
          <button key={num} onClick={() => goToPage(num)}
            style={{ padding: "6px 12px", borderRadius: 6, cursor: "pointer",
              background: num === currentPage ? "#7c3aed" : "rgba(255,255,255,0.08)",
              color: num === currentPage ? "#fff" : "#9ca3af",
              border: num === currentPage ? "none" : "1px solid rgba(255,255,255,0.1)",
              fontWeight: num === currentPage ? 700 : 400 }}>
            {num}
          </button>
        ))}

        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}
          style={{ padding: "6px 12px", borderRadius: 6, cursor: currentPage === totalPages ? "not-allowed" : "pointer", opacity: currentPage === totalPages ? 0.4 : 1 }}>
          Next →
        </button>
      </div>

      {/* [11] Show range info — "Showing 6–10 of 50" — common UX pattern for tables. */}
      <p style={{ color: "#6b7280", fontSize: 12, marginTop: 8 }}>
        Showing {startIndex + 1}–{Math.min(endIndex, ALL_USERS.length)} of {ALL_USERS.length} users
      </p>
    </div>
  );
}

export default Pagination;`,
      note: `Architecture decisions explained:
[1] Data outside component — objects/arrays defined inside a component are re-created every render. For static data, always define outside.
[2] PAGE_SIZE as a named constant — magic numbers (like the number 5 scattered throughout) are hard to maintain. One change here updates everything.
[3] Only currentPage in state — a fundamental React principle: derive everything you can from existing state instead of duplicating it.
[4] startIndex = (page - 1) * size is the universal pagination formula. Page 1 → index 0, Page 2 → index 5, Page 3 → index 10.
[5] slice(start, end) returns a new array without mutating the original. Safe for React state updates.
[6] Array.from({length: n}, (_, i) => i + 1) is the clean way to create [1..n] arrays in modern JavaScript.
[7] Guard clause in goToPage prevents invalid state. Never trust that the UI alone will prevent edge-case calls.
[8] Rendering only the current slice is the entire point — if you render all 50 and CSS-hide others, you're not really paginating (the DOM has all 50 nodes).
[9] disabled on Previous/Next is a UX requirement. The cursor:not-allowed visual reinforces that the action isn't available.
[10] Active page highlighting is critical for orientation — without it, users don't know where they are.
[11] "Showing X–Y of Z" is a standard data table pattern — always show users their context.`
    
    },
    {
      level: "Intermediate",
      tag: "CODE",
      title: "Search & Filter with Debounce",
      q: `Problem: You have a list of 20 products. Build a search input that filters products by name in real time. Implement debouncing so the filter only runs 300ms after the user stops typing (not on every keystroke). Show a "No results found" message when nothing matches.`,
      code: `import { useState, useEffect, useMemo } from "react";

const PRODUCTS = [
  "Apple iPhone 15", "Samsung Galaxy S24", "Google Pixel 8", "OnePlus 12",
  "MacBook Pro 16", "Dell XPS 15", "Lenovo ThinkPad X1", "HP Spectre x360",
  "Sony WH-1000XM5", "Bose QuietComfort 45", "AirPods Pro 2", "Galaxy Buds 2",
  "iPad Pro M4", "Samsung Tab S9", "Amazon Fire HD", "Lenovo Tab P12",
  "Apple Watch Ultra 2", "Samsung Galaxy Watch 6", "Fitbit Sense 2", "Garmin Fenix 7",
];

function SearchFilter() {
  // [1] Two separate state values: inputValue (what user types) and
  //     debouncedQuery (what we actually filter with — updated 300ms after typing stops).
  //     This separation is the key to debouncing in React.
  const [inputValue, setInputValue]         = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // [2] The debounce effect: sets a timer whenever inputValue changes.
  //     The cleanup function (return statement) clears the timer if
  //     inputValue changes again before 300ms — so only the last change fires.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inputValue); // [3] Only updates after 300ms of inactivity
    }, 300);

    return () => clearTimeout(timer); // [4] Cleanup: cancel pending timer on next change
  }, [inputValue]); // [5] Re-runs every time inputValue changes

  // [6] useMemo caches the filtered list.
  //     Only recomputes when debouncedQuery changes — not on every render.
  //     For 20 items this isn't critical, but for 10,000 items it matters a lot.
  const filtered = useMemo(() => {
    if (!debouncedQuery.trim()) return PRODUCTS; // [7] Empty search = show all
    const q = debouncedQuery.toLowerCase();
    return PRODUCTS.filter(p => p.toLowerCase().includes(q));
  }, [debouncedQuery]);

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      <h3>Product Search</h3>

      {/* [8] inputValue controls the input display — user sees their typing immediately.
              The actual filtering is delayed via debouncedQuery. */}
      <input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Search products..."
        style={{ width: "100%", padding: "10px 14px", borderRadius: 8,
          border: "1px solid #374151", marginBottom: 12, boxSizing: "border-box" }}
      />

      {/* [9] Show result count for UX context */}
      <p style={{ color: "#6b7280", fontSize: 12, marginBottom: 8 }}>
        {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        {debouncedQuery ? \` for "\${debouncedQuery}"\` : ""}
      </p>

      {/* [10] Empty state — always handle the zero-results case */}
      {filtered.length === 0 ? (
        <p style={{ color: "#9ca3af", textAlign: "center", padding: 20 }}>
          No products found for "{debouncedQuery}"
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filtered.map((product, idx) => (
            // [11] Using idx as key here is acceptable — the list is static
            //      (PRODUCTS never changes) and never reordered.
            //      For dynamic lists, always use a stable ID.
            <li key={idx} style={{ padding: "9px 12px", marginBottom: 6, background: "rgba(255,255,255,0.05)", borderRadius: 8, color: "#e2e8f0" }}>
              {product}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchFilter;`,
      note: `Deep dive into debouncing in React:
[1] Two states (inputValue + debouncedQuery) is the standard React debounce pattern. The input stays responsive because inputValue updates on every keystroke. The expensive operation (filtering) only runs when debouncedQuery updates — 300ms after typing pauses.

[2] The entire debounce is built from useEffect + setTimeout + cleanup. No library needed. This is worth memorizing as a pattern.

[3] setDebouncedQuery(inputValue) fires after 300ms of silence. If the user types "iphone", we get one filter run, not 6 (one per character).

[4] The cleanup return () => clearTimeout(timer) is what makes debouncing work. Without it, every keystroke would still set the debouncedQuery 300ms later — all 6 timers would fire, just delayed. The cleanup cancels the previous timer before the new one starts.

[5] [inputValue] as dependency — the effect re-runs on every keystroke, each time resetting the 300ms clock.

[6] useMemo for the filter — without it, the filter runs on every render (even unrelated ones). With useMemo, it only recalculates when debouncedQuery changes.

[7] Empty query guard returns all products — avoids filtering with an empty string which would still show all products but through a slower .includes("") call.

[11] Index as key is acceptable when: the list is static (won't add/remove items), and items won't be reordered. For PRODUCTS (a fixed constant), this is safe.`
    
    },
    {
      level: "Intermediate",
      tag: "CODE",
      title: "useFetch Custom Hook",
      q: `Problem: You notice multiple components in your app all have the same fetch-data-with-loading-and-error pattern copy-pasted. Extract it into a reusable useFetch custom hook that any component can use. It should return { data, loading, error } and handle cleanup to avoid setting state on unmounted components.`,
      code: `import { useState, useEffect } from "react";

// [1] A custom hook is just a function starting with "use".
//     It can use other hooks inside — that's what makes it a "hook".
//     Rule: call it only from React function components or other custom hooks.
function useFetch(url) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true); // [2] Start as true — we're fetching immediately
  const [error, setError]     = useState(null);

  useEffect(() => {
    // [3] Reset state on new URL — if url changes, we're fetching new data.
    //     Without this, old data stays visible while new data loads.
    setData(null);
    setLoading(true);
    setError(null);

    // [4] 'cancelled' flag prevents setState on an unmounted component.
    //     If the component unmounts before fetch completes, React would throw
    //     a "Can't perform state update on unmounted component" warning.
    let cancelled = false;

    fetch(url)
      .then(res => {
        // [5] Check res.ok — fetch only rejects on network errors, NOT on 404/500.
        //     Without this, a 404 response would be treated as success.
        if (!res.ok) throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
        return res.json();
      })
      .then(json => {
        if (!cancelled) setData(json); // [6] Only update state if still mounted
      })
      .catch(err => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false); // [7] Always stop loading, success or failure
      });

    // [8] Cleanup: set cancelled = true when component unmounts or url changes.
    //     This prevents stale state updates and race conditions.
    return () => { cancelled = true; };
  }, [url]); // [9] Re-fetch whenever url changes

  return { data, loading, error }; // [10] Return the three states the consumer cares about
}

// ─── Example usage ───────────────────────────────────────────────────────────

function UserProfile({ userId }) {
  // [11] Clean one-liner — all the fetch complexity is hidden in the hook.
  //      Every component that uses useFetch gets loading/error handling for free.
  const { data: user, loading, error } = useFetch(
    \`https://jsonplaceholder.typicode.com/users/\${userId}\`
  );

  if (loading) return <p>Loading user...</p>;
  if (error)   return <p style={{ color: "#f87171", theory: "API versioning allows evolving the API while maintaining backward compatibility. URL path versioning (/api/v1/) is explicit and easy to route in Express. Consumers know exactly which version they're using. Deprecated versions should return Deprecation headers to signal migration." }}>Error: {error}</p>;
  if (!user)   return null;

  return (
    <div style={{ padding: 16, background: "rgba(255,255,255,0.05)", borderRadius: 10 }}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>{user.company?.name}</p>
    </div>
  );
}

export { useFetch };
export default UserProfile;`,
      note: `Why this pattern is interview gold:
[1] Custom hooks are just functions — the "magic" is that they can call other hooks. The name starting with "use" isn't just convention — React's linter rules enforce it to catch misuse.

[2] loading starts as true, not false. If it started false, there'd be a flash where loading=false before the first fetch completes, possibly showing an empty/error state.

[3] Resetting all state when URL changes prevents showing stale data from the previous URL while the new data loads. A subtle but important UX detail.

[4] The cancelled flag is the simplest way to prevent state updates on unmounted components. Alternative: AbortController (cancels the actual network request too, more correct for production).

[5] res.ok check — this is a CRITICAL mistake candidates miss. fetch() only throws on network failure (no internet, DNS failure). A 404 or 500 response from the server resolves successfully! You must check res.ok manually.

[6] if (!cancelled) setData(json) — the guard that prevents the React warning and potential bugs from race conditions (e.g., user navigates away then back quickly — old response shouldn't overwrite new one).

[7] finally() runs whether the promise resolved or rejected — use it for cleanup that must always happen (stopping the spinner).

[8] The cleanup return is what makes this production-quality vs. beginner code. This is usually what separates a good answer from a great one in interviews.

[9] [url] dependency: the hook re-runs the entire fetch when the URL changes. This means UserProfile just needs to change userId and the data updates automatically — no extra code.

[10] Destructuring with rename: { data: user } renames data to user locally. This makes the consuming component's code more readable.

[11] This is the value of custom hooks: consumers get loading/error/data in one line. Without this hook, every component would have 20+ lines of duplicated fetch boilerplate.`
    
    },
    {
      level: "Intermediate",
      tag: "CODE",
      title: "Shopping Cart with useReducer",
      q: `Problem: Build a shopping cart with products list and cart panel. Users can add items, remove items, and change quantity. Use useReducer to manage cart state since it involves multiple related state transitions. Show total price in the cart.`,
      code: `import { useReducer, useMemo } from "react";

const PRODUCTS = [
  { id: 1, name: "Mechanical Keyboard", price: 1200 },
  { id: 2, name: "Wireless Mouse",      price: 450  },
  { id: 3, name: "27\" Monitor",         price: 8500 },
  { id: 4, name: "USB-C Hub",            price: 650  },
];

// [1] All possible cart actions defined as constants.
//     Strings prevent typos — "ADD_ITEM" is clearer than just "add".
const ADD_ITEM      = "ADD_ITEM";
const REMOVE_ITEM   = "REMOVE_ITEM";
const UPDATE_QTY    = "UPDATE_QTY";
const CLEAR_CART    = "CLEAR_CART";

// [2] The reducer is a PURE function: (currentState, action) => newState.
//     Pure = no side effects, no async, no mutations — same input always = same output.
//     This makes it easy to test and reason about.
function cartReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM: {
      // [3] Check if item already in cart — increment qty instead of adding duplicate.
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        // [4] Return a NEW array with the updated item — never mutate state directly.
        //     map() creates a new array; the spread {...item} creates a new object.
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      // [5] New item: spread existing cart and add the new item with qty: 1.
      return [...state, { ...action.payload, qty: 1 }];
    }

    case REMOVE_ITEM:
      // [6] filter() removes the item by ID — immutable, returns new array.
      return state.filter(item => item.id !== action.payload.id);

    case UPDATE_QTY:
      // [7] If quantity drops to 0, remove the item entirely — better UX.
      if (action.payload.qty <= 0) {
        return state.filter(item => item.id !== action.payload.id);
      }
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, qty: action.payload.qty }
          : item
      );

    case CLEAR_CART:
      // [8] Reset to empty array — the initial state.
      return [];

    default:
      // [9] Always return current state for unknown actions — prevents silent bugs.
      return state;
  }
}

export default function ShoppingCart() {
  // [10] useReducer(reducer, initialState) — better than useState for complex state
  //      with multiple transition types. dispatch(action) triggers the reducer.
  const [cart, dispatch] = useReducer(cartReducer, []);

  // [11] useMemo computes total only when cart changes.
  //      reduce() sums price * qty for each item.
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div style={{ display: "flex", gap: 24, padding: 20, flexWrap: "wrap" }}>
      {/* Products */}
      <div style={{ flex: 1, minWidth: 260 }}>
        <h3>Products</h3>
        {PRODUCTS.map(product => (
          <div key={product.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", marginBottom: 8, background: "rgba(255,255,255,0.04)", borderRadius: 10 }}>
            <div>
              <div style={{ fontWeight: 600, color: "#e2e8f0" }}>{product.name}</div>
              <div style={{ color: "#6b7280", fontSize: 13 }}>₹{product.price}</div>
            </div>
            {/* [12] Dispatch ADD_ITEM with the full product as payload.
                     The reducer knows what to do with it. */}
            <button onClick={() => dispatch({ type: ADD_ITEM, payload: product })}
              style={{ padding: "6px 14px", borderRadius: 7, background: "#7c3aed", color: "#fff", border: "none", cursor: "pointer", fontSize: 13 }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart */}
      <div style={{ width: 280 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>Cart ({cartCount})</h3>
          {cart.length > 0 && (
            <button onClick={() => dispatch({ type: CLEAR_CART })}
              style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: 12 }}>
              Clear all
            </button>
          )}
        </div>

        {cart.length === 0
          ? <p style={{ color: "#6b7280" }}>Cart is empty</p>
          : cart.map(item => (
            <div key={item.id} style={{ padding: "10px 12px", marginBottom: 8, background: "rgba(255,255,255,0.04)", borderRadius: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 600 }}>{item.name}</span>
                <button onClick={() => dispatch({ type: REMOVE_ITEM, payload: { id: item.id } })}
                  style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer" }}>✕</button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* [13] Qty controls dispatch UPDATE_QTY — reducer handles the 0 edge case. */}
                <button onClick={() => dispatch({ type: UPDATE_QTY, payload: { id: item.id, qty: item.qty - 1 } })}
                  style={{ width: 26, height: 26, borderRadius: 6, border: "1px solid #374151", background: "none", color: "#e2e8f0", cursor: "pointer" }}>−</button>
                <span style={{ color: "#e2e8f0", minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                <button onClick={() => dispatch({ type: UPDATE_QTY, payload: { id: item.id, qty: item.qty + 1 } })}
                  style={{ width: 26, height: 26, borderRadius: 6, border: "1px solid #374151", background: "none", color: "#e2e8f0", cursor: "pointer" }}>+</button>
                <span style={{ marginLeft: "auto", color: "#a78bfa", fontSize: 13 }}>₹{item.price * item.qty}</span>
              </div>
            </div>
          ))
        }

        {cart.length > 0 && (
          <div style={{ marginTop: 12, padding: "12px 14px", background: "rgba(124,58,237,0.1)", borderRadius: 10, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 700 }}>Total</span>
            <span style={{ fontWeight: 700, color: "#a78bfa" }}>₹{total}</span>
          </div>
        )}
      </div>
    </div>
  );
}`,
      note: `Why useReducer instead of useState:
[1] Action type constants prevent typos. "ADD_ITEM" as a constant means a typo like "ADD_ITME" causes a ReferenceError at runtime, not a silent bug. Some teams use an enum/object: const ACTIONS = { ADD: "ADD_ITEM" }.

[2] Pure reducer function — this is the most important concept. Pure means: (a) no side effects, (b) no mutations, (c) same arguments → same result always. This makes reducers trivially testable: cartReducer(state, action) === expectedState.

[3] Check for existing item before adding — a real shopping cart requirement. You could skip this and let items duplicate, but "add again = increase quantity" is the correct UX.

[4] Immutable update pattern: map() + spread. NEVER do state.find(...).qty++. That mutates the existing object in place — React won't detect the change and won't re-render. Always return new objects/arrays.

[5] [...state, newItem] — spread creates a new array containing all old items plus the new one. Same as state.concat(newItem) but more idiomatic modern JS.

[7] qty <= 0 auto-removes the item — defensive handling of edge cases in the reducer keeps this logic in one place rather than scattered in button click handlers.

[9] Default case returns state — without this, an unrecognized action type would return undefined, breaking the app silently.

[10] useReducer vs useState: use useState for independent simple values. Use useReducer when: (a) state is an object/array with multiple fields, (b) multiple actions affect the same state, (c) next state depends on complex logic. This cart has 4 action types — useReducer is the right choice.

[11] useMemo for total — total is derived from cart. Without memoization, it recalculates on every render (even ones unrelated to cart). With [cart] dependency, it only recalculates when cart changes.

[13] qty - 1 dispatched to reducer — the reducer handles the "remove if 0" logic internally. Keeps dispatch calls simple and logic centralized.`
    
    },
    {
      level: "Intermediate",
      tag: "CODE",
      title: "Infinite Scroll",
      q: `Problem: Build an infinite scroll list that loads 10 items at a time. When the user scrolls to the bottom, automatically load the next batch. Show a loading spinner while fetching. Stop loading when all items are fetched (total: 50).`,
      code: `import { useState, useEffect, useRef, useCallback } from "react";

const TOTAL_ITEMS = 50;
const PAGE_SIZE   = 10;

// [1] Simulates an async API call with a delay.
//     Returns items for the requested page.
//     In production this would be: fetch(\`/api/items?page=\${page}&limit=\${size}\`)
const fetchItems = (page, size) =>
  new Promise(resolve =>
    setTimeout(() => {
      const start = (page - 1) * size;
      const items = Array.from({ length: size }, (_, i) => ({
        id: start + i + 1,
        title: \`Item #\${start + i + 1}\`,
        description: \`Description for item \${start + i + 1}\`,
      }));
      resolve(items);
    }, 800) // [2] 800ms delay simulates network latency
  );

export default function InfiniteScroll() {
  const [items, setItems]       = useState([]);
  const [page, setPage]         = useState(1);
  const [loading, setLoading]   = useState(false);
  // [3] hasMore tracks whether there are more items to load.
  //     When false, the intersection observer stops triggering loads.
  const [hasMore, setHasMore]   = useState(true);

  // [4] sentinelRef is attached to an invisible div at the bottom of the list.
  //     When this div enters the viewport, we load the next page.
  //     This is the Intersection Observer pattern — more efficient than scroll events.
  const sentinelRef = useRef(null);

  // [5] useCallback memoizes loadMore so it can be a stable dependency
  //     for the useEffect that sets up the IntersectionObserver.
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return; // [6] Guard: don't double-fetch or fetch past the end

    setLoading(true);
    const newItems = await fetchItems(page, PAGE_SIZE);
    setItems(prev => [...prev, ...newItems]);  // [7] Append — don't replace existing items
    setPage(prev => prev + 1);

    // [8] Check if we've loaded all items.
    //     (page * PAGE_SIZE) because page hasn't updated yet (state is async).
    if (page * PAGE_SIZE >= TOTAL_ITEMS) setHasMore(false);

    setLoading(false);
  }, [loading, hasMore, page]);

  useEffect(() => {
    // [9] IntersectionObserver fires when the sentinel div enters/leaves the viewport.
    //     threshold: 0.1 = trigger when 10% of the sentinel is visible.
    //     Much better than scroll event listeners — no constant firing, browser-optimized.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 }
    );

    // [10] Observe the sentinel element if it exists in the DOM.
    if (sentinelRef.current) observer.observe(sentinelRef.current);

    // [11] Cleanup: disconnect the observer when component unmounts or loadMore changes.
    //      Without cleanup, you'd accumulate multiple observers on the same element.
    return () => observer.disconnect();
  }, [loadMore]); // [12] Re-run when loadMore changes (which includes page/hasMore/loading)

  return (
    <div style={{ maxWidth: 500, padding: 20 }}>
      <h3>Infinite Scroll ({items.length}/{TOTAL_ITEMS})</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map(item => (
          <div key={item.id} style={{ padding: "12px 16px", background: "rgba(255,255,255,0.04)", borderRadius: 10 }}>
            <div style={{ fontWeight: 600, color: "#e2e8f0" }}>{item.title}</div>
            <div style={{ color: "#6b7280", fontSize: 13 }}>{item.description}</div>
          </div>
        ))}
      </div>

      {/* [13] Loading spinner — shown while fetching */}
      {loading && (
        <div style={{ textAlign: "center", padding: 20, color: "#a78bfa" }}>
          ⟳ Loading more...
        </div>
      )}

      {/* [14] End message — shown when all items are loaded */}
      {!hasMore && (
        <p style={{ textAlign: "center", color: "#4b5563", fontSize: 13, marginTop: 16 }}>
          All {TOTAL_ITEMS} items loaded ✓
        </p>
      )}

      {/* [15] The sentinel: an invisible div at the bottom.
               When it scrolls into view, IntersectionObserver fires → loadMore().
               Must be present in DOM even when not loading — observer watches it continuously. */}
      {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
    </div>
  );
}`,
      note: `IntersectionObserver vs scroll events:
[1] Simulated API — the real pattern is identical, just swap the mock for a real fetch. The page/size parameters are standard REST pagination conventions.

[3] hasMore flag prevents triggering fetches after all data is loaded. Without it, the observer would keep firing and fetching empty pages.

[4] The sentinel pattern — an invisible div at the bottom of the list. When the user scrolls to the bottom, this div enters the viewport and triggers loading. This is the industry-standard infinite scroll implementation.

[5] useCallback for loadMore — because loadMore is used as a dependency in the useEffect, it must be stable between renders. Without useCallback, every render creates a new function → useEffect re-runs → new observer set up → memory leak.

[6] Double-fetch guard (if loading || !hasMore) — without this, rapid scrolling could trigger multiple simultaneous fetches for the same page.

[7] setItems(prev => [...prev, ...newItems]) — spread existing items and append new ones. This is the append pattern for infinite scroll. Compare to pagination which replaces items.

[8] page state is async — when loading page 1, page is still 1, so the "all loaded" check is page * PAGE_SIZE (1 * 10 = 10). This check uses the current page value before the state update fires.

[9] IntersectionObserver is browser-native and much more efficient than scroll events. Scroll events fire hundreds of times per second; IntersectionObserver fires only when the element crosses the threshold. No debouncing needed.

[11] observer.disconnect() cleanup — without this, if the component unmounts (user navigates away) and the observer fires, it would call loadMore on an unmounted component — a memory leak and potential state update error.

[15] The sentinel div must have height: 1 (at least 1px) to be "intersectable." A 0-height element might not trigger the observer correctly in all browsers.`
    
    },
    {
      level: "Intermediate",
      tag: "CODE",
      title: "Multi-Step Form (Wizard)",
      q: `Problem: Build a 3-step registration wizard: Step 1 — Personal Info (name, email), Step 2 — Account Setup (username, password), Step 3 — Review & Submit. Show a progress bar. Validate each step before allowing Next. On final submit, log the complete form data.`,
      code: `import { useState } from "react";

// [1] Step configuration array — each step has a title and its field names.
//     Centralizing this makes adding/removing steps trivial.
const STEPS = [
  { title: "Personal Info",   fields: ["name", "email"]             },
  { title: "Account Setup",  fields: ["username", "password"]       },
  { title: "Review & Submit",fields: []                             },
];

// [2] All form data in a single flat object — easier to pass around and submit.
//     Keys match the field names in STEPS above.
const INITIAL_DATA = { name: "", email: "", username: "", password: "" };

// [3] Validation rules per field — co-locate rules with field definitions.
//     Returns error string or null. Used in Step 1 and 2 validation.
const VALIDATORS = {
  name:     v => !v.trim()         ? "Name is required"              : null,
  email:    v => !v.includes("@")  ? "Enter a valid email"           : null,
  username: v => v.trim().length < 3? "Username min 3 characters"    : null,
  password: v => v.length < 6      ? "Password min 6 characters"     : null,
};

export default function MultiStepForm() {
  const [step, setStep]       = useState(0); // [4] 0-indexed: 0=Personal, 1=Account, 2=Review
  const [data, setData]       = useState(INITIAL_DATA);
  const [errors, setErrors]   = useState({});
  const [submitted, setSubmitted] = useState(false);

  // [5] Update a single field by name — generic handler works for all inputs.
  //     No need for separate onChange for each field.
  const handleChange = (field) => (e) => {
    setData(prev => ({ ...prev, [field]: e.target.value }));
    // [6] Clear the error for a field as soon as the user starts typing in it.
    //     Immediate feedback: error disappears once user addresses it.
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  // [7] Validate only the fields for the current step.
  const validateStep = () => {
    const stepFields = STEPS[step].fields;
    const newErrors  = {};
    stepFields.forEach(field => {
      const err = VALIDATORS[field]?.(data[field]);
      if (err) newErrors[field] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // [8] true = valid
  };

  const handleNext = () => {
    if (validateStep()) setStep(s => s + 1);
  };

  const handleBack = () => {
    setErrors({}); // [9] Clear errors when going back — fresh validation on next attempt.
    setStep(s => s - 1);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
        <h3>Registration Complete!</h3>
        <p style={{ color: "#6b7280" }}>Welcome, {data.name}!</p>
      </div>
    );
  }

  // [10] Progress: (currentStep / totalSteps) * 100 gives percentage.
  const progress = (step / (STEPS.length - 1)) * 100;

  return (
    <div style={{ maxWidth: 440, padding: 24 }}>
      {/* Step indicator */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        {STEPS.map((s, i) => (
          <span key={i} style={{ fontSize: 12, fontWeight: i === step ? 700 : 400, color: i <= step ? "#a78bfa" : "#4b5563" }}>
            {i + 1}. {s.title}
          </span>
        ))}
      </div>

      {/* [11] Progress bar — width driven by the progress variable. */}
      <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 4, marginBottom: 24 }}>
        <div style={{ height: "100%", width: \`\${progress}%\`, background: "linear-gradient(90deg,#7c3aed,#a78bfa)", borderRadius: 4, transition: "width 0.3s" }} />
      </div>

      {/* ── Step 1: Personal Info ── */}
      {step === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <h3>Personal Information</h3>
          {["name", "email"].map(field => (
            <div key={field}>
              <input
                value={data[field]}
                onChange={handleChange(field)}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: \`1px solid \${errors[field] ? "#f87171" : "#374151"}\`, background: "rgba(255,255,255,0.05)", color: "#e2e8f0", boxSizing: "border-box" }}
              />
              {errors[field] && <p style={{ color: "#f87171", fontSize: 12, marginTop: 4 }}>{errors[field]}</p>}
            </div>
          ))}
        </div>
      )}

      {/* ── Step 2: Account Setup ── */}
      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <h3>Account Setup</h3>
          {[{ f: "username", t: "text" }, { f: "password", t: "password" }].map(({ f, t }) => (
            <div key={f}>
              <input
                type={t}
                value={data[f]}
                onChange={handleChange(f)}
                placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: \`1px solid \${errors[f] ? "#f87171" : "#374151"}\`, background: "rgba(255,255,255,0.05)", color: "#e2e8f0", boxSizing: "border-box" }}
              />
              {errors[f] && <p style={{ color: "#f87171", fontSize: 12, marginTop: 4 }}>{errors[f]}</p>}
            </div>
          ))}
        </div>
      )}

      {/* ── Step 3: Review ── */}
      {step === 2 && (
        <div>
          <h3>Review Your Info</h3>
          {Object.entries(data).map(([key, val]) => (
            <div key={key} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ color: "#6b7280", textTransform: "capitalize" }}>{key}</span>
              {/* [12] Never show password in plain text on review — mask it. */}
              <span style={{ color: "#e2e8f0" }}>{key === "password" ? "••••••" : val}</span>
            </div>
          ))}
        </div>
      )}

      {/* Navigation buttons */}
      <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "space-between" }}>
        {step > 0 && (
          <button onClick={handleBack} style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid #374151", background: "none", color: "#e2e8f0", cursor: "pointer" }}>
            ← Back
          </button>
        )}
        <button
          onClick={step < STEPS.length - 1 ? handleNext : handleSubmit}
          style={{ marginLeft: "auto", padding: "10px 24px", borderRadius: 8, border: "none", background: "linear-gradient(90deg,#7c3aed,#2563eb)", color: "#fff", cursor: "pointer", fontWeight: 600 }}
        >
          {step < STEPS.length - 1 ? "Next →" : "Submit ✓"}
        </button>
      </div>
    </div>
  );
}`,
      note: `Multi-step form architecture:
[1] STEPS config array — the form structure is data, not hardcoded JSX. Adding a step means adding one object to the array, not restructuring the component. This is the "data-driven UI" pattern.

[2] Flat state object for all form data — all fields in one object means you have one submit payload ready. No need to merge multiple state variables before submitting.

[3] Validator map — each field has one validation function. Centralized, testable, and extendable. Adding a new rule means editing one place.

[4] step as a 0-indexed number — simpler than string names. step < STEPS.length - 1 is the "has more steps" check. step === STEPS.length - 1 is "on the last step".

[5] Curried onChange: handleChange(field) returns a function — this is the "generic handler" pattern. One function handles all fields instead of handleNameChange, handleEmailChange, etc.

[6] Clear error on type — errors disappear the moment the user starts addressing them. This is the correct UX pattern (don't wait for Next click to clear an error).

[7] Validate only current step's fields — users don't see step 2 errors while on step 1. Validation is scoped to what's currently visible.

[8] Return boolean from validateStep so handleNext can decide whether to advance — clean separation of validation logic from navigation logic.

[9] Clear errors on Back — when going back to a previous step, reset errors so the user doesn't see stale red borders on fields they've already fixed.

[11] CSS transition on progress bar width makes the progress animation smooth. One line of CSS for a polished effect.

[12] Masking the password in review — never show passwords in plain text, even in your own review step. Use "••••••" as a placeholder.`
    
    },
    {
      level: "Intermediate",
      tag: "CODE",
      title: "Drag and Drop List (without library)",
      q: `Problem: Build a reorderable list of tasks using HTML5 drag-and-drop API (no external library). Users should be able to drag a task and drop it to a new position. The list should update its order after each drop.`,
      code: `import { useState, useRef } from "react";

const INITIAL_TASKS = [
  { id: 1, text: "Design the database schema" },
  { id: 2, text: "Build REST API endpoints"   },
  { id: 3, text: "Create React components"    },
  { id: 4, text: "Write unit tests"           },
  { id: 5, text: "Deploy to production"       },
];

export default function DragDropList() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  // [1] useRef for drag state — NOT useState. We don't want a re-render when
  //     these change. They're transient drag metadata, not UI state.
  const dragItem  = useRef(null); // index of the item being dragged
  const dragOver  = useRef(null); // index of the item being hovered over

  const onDragStart = (index) => {
    // [2] Store the index of the dragged item. This persists through the drag.
    dragItem.current = index;
  };

  const onDragEnter = (index) => {
    // [3] Update the "over" index as user moves the dragged item over others.
    //     Don't update if hovering over the item itself — no-op.
    if (index !== dragItem.current) dragOver.current = index;
  };

  const onDrop = () => {
    // [4] Early return if nothing to swap (dropped on same position).
    if (dragItem.current === null || dragOver.current === null) return;

    // [5] Create a copy of the array — never mutate state directly.
    const newTasks = [...tasks];

    // [6] Reorder: remove the dragged item from its original position,
    //     then insert it at the drop target position.
    //     splice(start, deleteCount, ...items) modifies the array in place.
    const [removed] = newTasks.splice(dragItem.current, 1);
    newTasks.splice(dragOver.current, 0, removed);

    // [7] Reset refs after drop — clean state for next drag operation.
    dragItem.current  = null;
    dragOver.current  = null;

    setTasks(newTasks); // [8] Update state with the reordered array
  };

  const [draggingIdx, setDraggingIdx] = useState(null); // [9] For visual feedback only

  return (
    <div style={{ maxWidth: 400, padding: 20 }}>
      <h3>Task Order (drag to reorder)</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {tasks.map((task, index) => (
          <li
            key={task.id}
            // [10] draggable="true" enables the HTML5 drag-and-drop API on this element.
            draggable
            onDragStart={() => { onDragStart(index); setDraggingIdx(index); }}
            onDragEnter={() => onDragEnter(index)}
            // [11] onDragOver must call e.preventDefault() to allow dropping.
            //      Without it, the browser treats the target as "not droppable".
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            onDragEnd={() => setDraggingIdx(null)} // [12] Cleanup dragging state
            style={{
              padding: "12px 16px",
              marginBottom: 8,
              borderRadius: 10,
              // [13] Visual feedback: dim the item being dragged.
              opacity: draggingIdx === index ? 0.4 : 1,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "grab",
              display: "flex",
              alignItems: "center",
              gap: 12,
              transition: "opacity 0.15s",
              userSelect: "none", // [14] Prevent text selection while dragging
            }}
          >
            {/* [15] Drag handle icon — visual affordance telling user this is draggable */}
            <span style={{ color: "#4b5563", fontSize: 16 }}>⠿</span>
            <span style={{ color: "#e2e8f0" }}>{task.text}</span>
            <span style={{ marginLeft: "auto", color: "#4b5563", fontSize: 12 }}>#{index + 1}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      note: `HTML5 Drag-and-Drop API explained:
[1] useRef for drag metadata (not useState) — this is a key optimization. dragItem.current and dragOver.current change during drag but we don't need a re-render for each change. Refs are perfect for "remember this value, but don't re-render." Using useState here would cause dozens of unnecessary renders during a single drag.

[2] dragItem.current = index stores which item is being dragged. This persists for the entire drag operation without triggering renders.

[3] dragEnter fires when the dragged item moves over another item. Updating dragOver.current tracks the drop target.

[5] [...tasks] creates a shallow copy before mutation — we need to mutate the array for splice to work, but we never mutate the original state. Creating a copy then mutating the copy is the correct pattern.

[6] Two-step reorder with splice:
    Step 1: splice(dragItem, 1) removes the dragged item and captures it as [removed]
    Step 2: splice(dragOver, 0, removed) inserts it at the target position
    This is the standard array reorder algorithm.

[7] Reset refs after drop — prevents stale state on the next drag operation.

[11] onDragOver must call e.preventDefault() — this is the one thing beginners always forget. The browser's default dragover behavior is "you can't drop here." preventDefault() overrides this to allow dropping.

[12] onDragEnd fires when drag ends regardless of whether it was dropped on a valid target or cancelled. Good place for cleanup.

[13] Opacity feedback during drag — dimming the source item to 0.4 gives visual confirmation of what's being moved.

[14] userSelect: none prevents the annoying text selection behavior when users accidentally drag-select text instead of dragging the item.

[15] The ⠿ braille character (or ≡) is commonly used as a drag handle icon without needing an icon library.`
    
    },
  ],
  "Node.js": [
    {
      level: "Beginner",
      tag: "CODE",
      title: "Basic Express REST API",
      q: `Problem: Build a simple Express.js REST API for a list of books. It should support: GET /books (all books), GET /books/:id (one book), POST /books (add book), DELETE /books/:id (remove book). Data lives in memory (no database needed).`,
      code: `// [1] Import express — the web framework. Install with: npm install express
const express = require("express");
const app     = express(); // [2] Create the Express application instance

// [3] express.json() is built-in middleware that parses incoming JSON request bodies.
//     Without this, req.body would be undefined for POST/PUT requests.
app.use(express.json());

// [4] In-memory data store — an array of book objects.
//     In a real app this would be a database. For this problem, memory is fine.
let books = [
  { id: 1, title: "The Pragmatic Programmer", author: "David Thomas" },
  { id: 2, title: "Clean Code",               author: "Robert Martin"  },
  { id: 3, title: "You Don't Know JS",         author: "Kyle Simpson"  },
];

// [5] Counter for generating unique IDs.
//     Simple and works for in-memory data. In a DB, the DB generates IDs.
let nextId = 4;

// ─── GET /books ── return all books ──────────────────────────────────────────
app.get("/books", (req, res) => {
  // [6] res.json() serializes the value to JSON and sets Content-Type: application/json.
  //     Always use res.json() for API responses, not res.send() with a string.
  res.json(books);
});

// ─── GET /books/:id ── return one book ───────────────────────────────────────
app.get("/books/:id", (req, res) => {
  // [7] req.params.id is always a STRING from the URL — "1", not 1.
  //     Number() converts it for comparison with numeric IDs in the array.
  const id   = Number(req.params.id);
  const book = books.find(b => b.id === id);

  // [8] Return 404 if not found — correct HTTP semantics.
  //     Never return 200 with an error message — that confuses clients.
  if (!book) return res.status(404).json({ error: "Book not found" });

  res.json(book); // [9] 200 OK is the default status — no need to call res.status(200)
});

// ─── POST /books ── add a new book ───────────────────────────────────────────
app.post("/books", (req, res) => {
  const { title, author } = req.body; // [10] Destructure expected fields from parsed body

  // [11] Validate required fields before creating the resource.
  //      Return 400 Bad Request for invalid input — not 500 (that means server error).
  if (!title || !author) {
    return res.status(400).json({ error: "title and author are required" });
  }

  const newBook = { id: nextId++, title, author }; // [12] Post-increment: use current value, then increment
  books.push(newBook); // [13] Add to in-memory store

  // [14] 201 Created is the correct status for successful resource creation.
  //      Return the created resource so the client knows the assigned ID.
  res.status(201).json(newBook);
});

// ─── DELETE /books/:id ── remove a book ──────────────────────────────────────
app.delete("/books/:id", (req, res) => {
  const id    = Number(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) return res.status(404).json({ error: "Book not found" });

  // [15] splice(index, 1) removes one element at the found index.
  //      Mutating the array is fine here since this is the server — not React.
  //      In React you'd use filter() to create a new array.
  const [deleted] = books.splice(index, 1);

  // [16] Return the deleted item so the client knows what was removed.
  //      Some APIs return 204 No Content — valid too, but returning the item is friendlier.
  res.json({ message: "Deleted successfully", book: deleted });
});

// [17] Start the server on port 3000.
//      process.env.PORT || 3000 allows the port to be configured via environment variable —
//      required for deployment to Heroku, Railway, etc.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`,
      note: `REST API fundamentals covered:
[1] require vs import: Node.js uses CommonJS (require) by default. To use import, add "type":"module" to package.json or use .mjs extension.
[3] express.json() middleware — this is the #1 thing beginners forget. The middleware chain processes req before it reaches your route handler. Without express.json(), req.body is always undefined.
[6] res.json() vs res.send(): res.json() sets the correct Content-Type header automatically and handles serialization. Always use it for APIs.
[7] URL params are strings — always convert to the right type before comparing. Number("1") === 1, but "1" === 1 is false in JavaScript.
[8] Correct HTTP status codes matter: 200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Internal Server Error. Interviewers notice when you use the right ones.
[11] Validate inputs server-side always — never trust client data. Even if the frontend validates, direct API calls bypass the frontend.
[14] 201 vs 200 for POST: 201 Created is the semantically correct response when a new resource is created. Some APIs use 200 — but 201 is the standard.
[15] splice() vs filter(): On the server, mutating data is fine (no re-render triggers). On the client (React), always use immutable patterns.`
    
    },
    {
      level: "Beginner",
      tag: "CODE",
      title: "JWT Authentication Middleware",
      q: `Problem: Your Express API has routes that should only be accessible to logged-in users. Build a POST /login route that returns a JWT token, and an authentication middleware that protects any route it's applied to. Demonstrate it with a protected GET /profile route.`,
      code: `// Install: npm install express jsonwebtoken bcryptjs
const express    = require("express");
const jwt        = require("jsonwebtoken");
const bcrypt     = require("bcryptjs");
const app        = express();

app.use(express.json());

// [1] Store the JWT secret in an environment variable — NEVER hardcode secrets.
//     In production: process.env.JWT_SECRET loaded from .env file via dotenv.
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-prod";

// [2] Mock user database — in reality this would be a DB query.
//     Passwords must always be stored as hashes, never plain text.
//     bcrypt.hashSync("password123", 10) generates the hash at startup.
const USERS = [
  { id: 1, email: "alice@example.com", passwordHash: bcrypt.hashSync("password123", 10) },
  { id: 2, email: "bob@example.com",   passwordHash: bcrypt.hashSync("secret456",   10) },
];

// ─── POST /login ─────────────────────────────────────────────────────────────
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // [3] Always return the same generic error for wrong email OR wrong password.
  //     Separate messages ("email not found" vs "wrong password") help attackers
  //     enumerate valid email addresses — a security vulnerability.
  const user = USERS.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  // [4] bcrypt.compare() is async — it safely checks plain password against hash.
  //     Never compare password directly: password === user.passwordHash would NEVER match
  //     because the hash is not the plain password.
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

  // [5] jwt.sign(payload, secret, options) creates a signed token.
  //     Payload: data encoded in the token (NOT secret data — it's base64, not encrypted).
  //     expiresIn: '15m' — short expiry forces refresh, limits damage if token is stolen.
  const token = jwt.sign(
    { userId: user.id, email: user.email }, // payload
    JWT_SECRET,                              // secret for signing
    { expiresIn: "15m" }                    // token expiry
  );

  // [6] Return the token to the client. The client stores it (memory or localStorage)
  //     and sends it with every subsequent request in the Authorization header.
  res.json({ token, message: "Login successful" });
});

// ─── AUTH MIDDLEWARE ──────────────────────────────────────────────────────────
// [7] Middleware is a function with (req, res, next) signature.
//     Call next() to pass control to the next handler.
//     Call res.status(401).json(...) to block the request and stop the chain.
function authenticate(req, res, next) {
  // [8] By convention, tokens are sent in: Authorization: Bearer <token>
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  // [9] Split "Bearer eyJ..." to extract just the token part.
  const token = authHeader.split(" ")[1];

  try {
    // [10] jwt.verify() checks the signature AND expiry.
    //      If the token was tampered with or expired, it throws an error.
    //      The decoded payload is the object we signed in jwt.sign().
    const decoded = jwt.verify(token, JWT_SECRET);

    // [11] Attach decoded user info to req — available to all subsequent middleware and route handlers.
    req.user = decoded;

    next(); // [12] Token is valid — continue to the actual route handler
  } catch (err) {
    // [13] jwt.verify throws: JsonWebTokenError (bad token), TokenExpiredError (expired)
    const message = err.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    return res.status(401).json({ error: message });
  }
}

// ─── PROTECTED ROUTE ─────────────────────────────────────────────────────────
// [14] authenticate is passed as a middleware argument BEFORE the route handler.
//      Express runs middleware in order — authenticate runs first, and only if
//      next() is called does the route handler run.
app.get("/profile", authenticate, (req, res) => {
  // [15] req.user was attached in the middleware — available here.
  //      Fetch full user data from DB using req.user.userId in a real app.
  res.json({
    message: "Protected data",
    user: req.user, // contains { userId, email, iat, exp } from decoded JWT
  });
});

app.listen(3000, () => console.log("Auth server running on port 3000"));`,
      note: `Security fundamentals this code covers:
[1] Secrets in environment variables — hardcoded secrets in source code get committed to git and leaked. Always use process.env. Use dotenv in development.
[2] Password hashing — NEVER store plain-text passwords. bcrypt uses a salt (random data added before hashing) that makes pre-computed rainbow table attacks impossible. The "10" is the cost factor (rounds of computation).
[3] Generic error message — "Invalid credentials" for both wrong email and wrong password. If you say "email not found", attackers can test millions of emails to discover which ones are registered. This is called username enumeration.
[4] bcrypt.compare() — the only safe way to check a password. It extracts the salt from the hash and re-hashes the input for comparison.
[5] Short JWT expiry (15m) — if a token is stolen, the damage window is limited. In production, pair with refresh tokens (long-lived tokens used to get new access tokens).
[7] Middleware signature — three parameters: req (request), res (response), next (function to call next middleware/route). Forgetting to call next() means the request hangs forever.
[10] jwt.verify() does TWO things: (1) verifies the signature wasn't tampered with, (2) checks if the token has expired. Both in one call.
[11] Attaching data to req — this is how middleware passes data to route handlers. req.user is a convention; you could use any property name.
[14] Route-specific middleware: app.get("/profile", authenticate, handler) — authenticate only runs for this route. app.use(authenticate) would run for ALL routes (global middleware). Apply selectively.`
    
    },
    {
      level: "Beginner",
      tag: "CODE",
      title: "File Upload API with Multer",
      q: `Problem: Build a Node.js Express API that accepts image file uploads via POST /upload. Validate that only image files (jpg, png, gif) are accepted and size is max 2MB. Save the file to an /uploads folder and return the file URL. Add GET /files to list all uploaded files.`,
      code: `// Install: npm install express multer
const express = require("express");
const multer  = require("multer");
const path    = require("path");
const fs      = require("fs");
const app     = express();

// [1] Serve the uploads folder as static files.
//     This lets clients access uploaded files at: /uploads/filename.jpg
app.use("/uploads", express.static("uploads"));

// [2] Ensure uploads directory exists before any upload happens.
//     fs.mkdirSync with recursive: true creates nested dirs safely and
//     does NOT throw if the directory already exists.
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads", { recursive: true });

// [3] diskStorage controls WHERE and WHAT NAME files are saved with.
//     Alternative: memoryStorage (keeps file in RAM as Buffer) —
//     useful if you need to process/upload to S3 before saving to disk.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // [4] cb(error, path) — first arg is error (null = no error), second is destination folder.
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // [5] Unique filename: timestamp + original extension.
    //     Prevents overwriting files with the same name.
    //     path.extname extracts ".jpg", ".png" etc from the original name.
    const uniqueName = \`\${Date.now()}-\${Math.round(Math.random() * 1e6)}\${path.extname(file.originalname)}\`;
    cb(null, uniqueName);
  },
});

// [6] fileFilter runs BEFORE the file is saved — reject early to save disk space.
//     Call cb(null, true) to accept, cb(null, false) or cb(new Error) to reject.
const fileFilter = (req, file, cb) => {
  const allowedMimes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);  // accept
  } else {
    // [7] Pass an Error to cb to reject the file with a custom message.
    cb(new Error("Only JPG, PNG, GIF images are allowed"), false);
  }
};

// [8] Compose the multer middleware with storage, filter, and size limit.
//     limits.fileSize is in bytes: 2 * 1024 * 1024 = 2MB.
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

// ─── POST /upload ─────────────────────────────────────────────────────────────
// [9] upload.single("image") is the multer middleware.
//     "image" must match the field name in the multipart form.
//     It runs before the route handler and attaches the file to req.file.
app.post("/upload", upload.single("image"), (req, res) => {
  // [10] If no file was in the request, req.file is undefined.
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  // [11] Build the file URL. In production, this would be a CDN URL (S3, Cloudinary).
  //      req.protocol + req.get("host") dynamically builds http://localhost:3000.
  const fileUrl = \`\${req.protocol}://\${req.get("host")}/uploads/\${req.file.filename}\`;

  res.status(201).json({
    message:  "Upload successful",
    filename: req.file.filename,
    size:     req.file.size,
    url:      fileUrl,
  });
});

// ─── GET /files ── list all uploaded files ────────────────────────────────────
app.get("/files", (req, res) => {
  // [12] fs.readdirSync reads the directory synchronously.
  //      Fine for low-traffic endpoints. Use fs.readdir (async) for high-traffic.
  const files = fs.readdirSync("uploads").map(filename => ({
    filename,
    url: \`\${req.protocol}://\${req.get("host")}/uploads/\${filename}\`,
    size: fs.statSync(\`uploads/\${filename}\`).size,
  }));
  res.json({ count: files.length, files });
});

// ─── Error handler for multer errors ─────────────────────────────────────────
// [13] Multer throws MulterError for size limits and our custom Error for type rejection.
//      This centralized handler formats both into consistent API responses.
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ error: "File too large. Max 2MB allowed." });
  }
  res.status(400).json({ error: err.message });
});

app.listen(3000, () => console.log("File upload server on port 3000"));`,
      note: `File upload fundamentals:
[1] express.static("uploads") serves the directory as static files — the most important line for making uploaded files accessible via URL. Without this, the files exist on disk but aren't reachable via HTTP.

[2] Create uploads dir on startup — if the directory doesn't exist when the first upload arrives, multer will throw an error. This startup check prevents that. recursive: true is like "mkdir -p" — creates parent dirs if needed and doesn't error if already exists.

[3] diskStorage vs memoryStorage: diskStorage saves directly to disk (good for large files, persists across restarts). memoryStorage keeps the file as a Buffer in req.file.buffer (good for small files you want to process or forward to S3/Cloudinary without touching disk).

[5] Unique filename with Date.now() + random number — critical to prevent filename collisions. Never save files with their original names: users could overwrite each other's files or exploit path traversal with filenames like "../../etc/passwd".

[6] fileFilter validates MIME type before saving — early rejection means no disk space wasted on invalid files. Note: MIME type can be spoofed by a malicious client changing the Content-Type header. For security-critical apps, also validate file contents (magic bytes) using a library like file-type.

[7] Passing an Error to cb propagates to Express's error handling middleware — the 4-param (err, req, res, next) handler at the bottom.

[8] limits.fileSize: 2MB in bytes (2 * 1024 * 1024). Writing out the math makes the intent clear. Multer throws a MulterError with code LIMIT_FILE_SIZE when exceeded.

[9] upload.single("image") — the string "image" must match the name attribute of the file input in the HTML form, or the field name in the multipart request.

[11] Building URLs from req.protocol and req.get("host") is portable — it works on localhost:3000 in dev and yourdomain.com in production without hardcoding.

[13] err.code === "LIMIT_FILE_SIZE" is the multer-specific code. Regular errors (like our fileFilter error) have a message but no code.`
    
    },
    {
      level: "Beginner",
      tag: "CODE",
      title: "MongoDB CRUD with Mongoose",
      q: `Problem: Build a Node.js Express API with full CRUD for a "Product" resource using MongoDB and Mongoose. Each product has: name, price, category, inStock. Include proper error handling, input validation with Mongoose schema, and correct HTTP status codes.`,
      code: `// Install: npm install express mongoose dotenv
const express  = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// ─── Database Connection ──────────────────────────────────────────────────────
// [1] Connect to MongoDB. URI is in .env file — never hardcode credentials.
//     useNewUrlParser and useUnifiedTopology are required for the latest drivers.
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/products_db")
  .then(() => console.log("MongoDB connected"))
  .catch(err => { console.error("DB connection failed:", err); process.exit(1); });
//   [2] process.exit(1) on DB failure — if the database is unavailable,
//       the app cannot function. Exit immediately rather than serving broken responses.

// ─── Mongoose Schema & Model ──────────────────────────────────────────────────
// [3] Schema defines the shape and validation rules for documents.
//     This is schema-level validation — runs before any save() or create() call.
const productSchema = new mongoose.Schema({
  name: {
    type:     String,
    required: [true, "Product name is required"], // [4] Custom error message
    trim:     true,         // [5] Removes leading/trailing whitespace automatically
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [100, "Name cannot exceed 100 characters"],
  },
  price: {
    type:    Number,
    required:[true, "Price is required"],
    min:     [0, "Price cannot be negative"],
  },
  category: {
    type:    String,
    required: true,
    // [6] enum restricts the value to allowed options — DB-level constraint.
    enum: {
      values:  ["electronics", "clothing", "books", "food", "other"],
      message: "{VALUE} is not a valid category",
    },
  },
  inStock: {
    type:    Boolean,
    default: true, // [7] default = true if not provided in the request
  },
}, {
  timestamps: true, // [8] Automatically adds createdAt and updatedAt fields
});

// [9] Model is the interface to the collection. "Product" → "products" collection.
//     Convention: singular PascalCase model name → plural lowercase collection name.
const Product = mongoose.model("Product", productSchema);

// ─── GET /products ── list all (with optional category filter) ────────────────
app.get("/products", async (req, res) => {
  try {
    // [10] Build query dynamically — if ?category=books is in URL, filter by it.
    //      Otherwise {}, which matches all documents.
    const filter = req.query.category ? { category: req.query.category } : {};

    // [11] .find(filter) returns all matching docs. .lean() returns plain JS
    //      objects instead of Mongoose documents — faster when you don't need
    //      Mongoose methods like .save().
    const products = await Product.find(filter).lean();
    res.json({ count: products.length, products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /products/:id ────────────────────────────────────────────────────────
app.get("/products/:id", async (req, res) => {
  try {
    // [12] findById is shorthand for findOne({ _id: id }).
    //      Returns null if not found (no error thrown).
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    // [13] CastError occurs when :id is not a valid MongoDB ObjectId format.
    //      Return 400 (bad input) not 500 (server error).
    if (err.name === "CastError") return res.status(400).json({ error: "Invalid product ID format" });
    res.status(500).json({ error: err.message });
  }
});

// ─── POST /products ───────────────────────────────────────────────────────────
app.post("/products", async (req, res) => {
  try {
    // [14] Product.create() = new Product(data) + product.save().
    //      Mongoose runs schema validation before saving to DB.
    const product = await Product.create(req.body);
    res.status(201).json(product); // [15] 201 Created
  } catch (err) {
    // [16] ValidationError is Mongoose's error for schema violations.
    //      Format the errors into a readable object: { fieldName: "error message" }
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).reduce((acc, e) => {
        acc[e.path] = e.message;
        return acc;
      }, {});
      return res.status(400).json({ error: "Validation failed", details: errors });
    }
    res.status(500).json({ error: err.message });
  }
});

// ─── PATCH /products/:id ──────────────────────────────────────────────────────
app.patch("/products/:id", async (req, res) => {
  try {
    // [17] findByIdAndUpdate with { new: true } returns the UPDATED document.
    //      Without new: true, it returns the document BEFORE the update.
    //      runValidators: true applies schema validation to the update fields.
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    if (err.name === "CastError")       return res.status(400).json({ error: "Invalid ID" });
    if (err.name === "ValidationError") return res.status(400).json({ error: err.message });
    res.status(500).json({ error: err.message });
  }
});

// ─── DELETE /products/:id ─────────────────────────────────────────────────────
app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    // [18] Return the deleted document and a message — client knows what was removed.
    res.json({ message: "Product deleted", product });
  } catch (err) {
    if (err.name === "CastError") return res.status(400).json({ error: "Invalid ID" });
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Products API on port 3000"));`,
      note: `Mongoose and MongoDB essentials:
[1] Connection URI in .env — MongoDB URIs contain credentials (username, password, cluster URL). These must never appear in source code. dotenv loads them from a .env file which is gitignored.

[2] process.exit(1) on DB failure — fail fast. An API that starts without a database connection will serve 500 errors on every request. Better to crash immediately with a clear error.

[3] Mongoose Schema — unlike raw MongoDB (which accepts any structure), Mongoose schemas enforce structure at the application layer. This catches bad data before it reaches the database.

[5] trim: true is important for string fields — users often accidentally type " Apple " with spaces. Mongoose trims it automatically so your DB doesn't have duplicate-ish entries.

[6] enum validation — restricts values to a predefined list. Better than validating manually in route handlers. The {VALUE} placeholder in the error message shows what was actually provided.

[8] timestamps: true automatically manages createdAt and updatedAt. Never manually set these — let Mongoose handle them. They're invaluable for debugging, sorting, and soft-delete patterns.

[11] .lean() returns plain JS objects instead of Mongoose Documents. Mongoose Documents have extra methods and properties. lean() is 2-3x faster for read-only operations where you don't need to call .save() or other instance methods.

[12] findById vs findOne: findById(id) is exactly findOne({ _id: id }) but shorter. Use it when querying by the primary key.

[13] CastError happens when an invalid ObjectId is passed (e.g., /products/abc instead of /products/64f1a...24). Return 400 (client error), not 500 (server error) — the client sent bad data.

[17] runValidators: true on update — by default, Mongoose skips schema validation on update operations. You must explicitly enable it. Without this, you could update price to -500 and Mongoose wouldn't complain.

[16] ValidationError formatting — Mongoose's err.errors is an object keyed by field name. Reducing it to {fieldName: message} gives the API consumer clear, actionable error messages.`
    
    },
    {
      level: "Intermediate",
      tag: "CODE",
      title: "Async Error Handling Middleware",
      q: `Problem: Your Express app has 10 routes, each with identical try/catch blocks. Every catch block sends a 500 error response. Refactor this using: (1) a reusable asyncHandler wrapper that eliminates try/catch from every route, (2) a centralized error-handling middleware that formats all errors consistently.`,
      code: `const express = require("express");
const app     = express();
app.use(express.json());

// ─── PROBLEM: Every route looks like this (bad) ───────────────────────────────
// app.get("/users", async (req, res) => {
//   try {
//     const users = await db.getAll();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message }); // duplicated everywhere!
//   }
// });

// ─── SOLUTION 1: asyncHandler wrapper ────────────────────────────────────────
// [1] asyncHandler takes an async route function and returns a new function.
//     The new function catches any rejected promise and forwards it to next(err).
//     Express's error-handling middleware picks up anything passed to next(err).
const asyncHandler = (fn) => (req, res, next) => {
  // [2] Promise.resolve(fn(req, res, next)) handles both:
  //     - async functions (returns a Promise)
  //     - sync functions that might throw (wrapped in Promise.resolve)
  //     .catch(next) forwards any error to Express's error handler.
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ─── SOLUTION 2: Custom Error class ──────────────────────────────────────────
// [3] Extending Error lets us attach a statusCode to our errors.
//     Now route handlers can throw errors with specific HTTP status codes,
//     and the error handler reads them — no more hardcoded 500 everywhere.
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);           // [4] Pass message to the base Error class
    this.statusCode = statusCode;
    this.name = "AppError";   // [5] Name helps identify error type in logs
  }
}

// ─── Simulated DB functions (for demo) ───────────────────────────────────────
const fakeUsers = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob",   email: "bob@example.com"   },
];

const getUserById = async (id) => {
  await new Promise(r => setTimeout(r, 50)); // simulate DB latency
  const user = fakeUsers.find(u => u.id === id);
  // [6] Throw AppError with the right status code from the data layer.
  //     The route handler and error middleware don't need to know the details.
  if (!user) throw new AppError(\`User \${id} not found\`, 404);
  return user;
};

// ─── Routes using asyncHandler ────────────────────────────────────────────────
// [7] No try/catch needed! asyncHandler handles it.
//     The route handler is clean — only happy-path logic.
app.get("/users", asyncHandler(async (req, res) => {
  const users = fakeUsers;
  res.json(users);
}));

app.get("/users/:id", asyncHandler(async (req, res) => {
  const id   = Number(req.params.id);
  const user = await getUserById(id); // [8] If this throws, asyncHandler catches it
  res.json(user);
}));

app.post("/users", asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  // [9] Throw validation errors with 400 status — they bubble up to error middleware.
  if (!name || !email) throw new AppError("name and email required", 400);

  const newUser = { id: fakeUsers.length + 1, name, email };
  fakeUsers.push(newUser);
  res.status(201).json(newUser);
}));

// ─── Centralized Error-Handling Middleware ────────────────────────────────────
// [10] Express identifies error-handling middleware by its FOUR parameters: (err, req, res, next).
//      If you write (req, res, next) with 3 params, Express treats it as a regular middleware.
//      Must be registered AFTER all routes — errors bubble down to it.
app.use((err, req, res, next) => {
  // [11] Log to server console — in production, use a logger like Winston or Pino.
  console.error(\`[\${new Date().toISOString()}] \${err.name}: \${err.message}\`);

  // [12] Use the statusCode from AppError if available; default to 500.
  const statusCode = err.statusCode || 500;

  // [13] Don't expose stack traces to clients in production.
  //      Only include them in development for debugging.
  const response = {
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  res.status(statusCode).json(response);
});

// [14] 404 handler for routes that don't exist — must come AFTER all routes.
app.use((req, res) => {
  res.status(404).json({ error: \`Route \${req.method} \${req.path} not found\` });
});

app.listen(3000, () => console.log("Server on port 3000"));`,
      note: `Why this pattern is essential for production Express apps:
[1] asyncHandler is the #1 pattern for async Express routes. Without it, any unhandled promise rejection in a route handler crashes the process in older Node or silently fails in newer ones. This wrapper ensures ALL async errors reach Express's error handler.

[2] Promise.resolve().catch(next) is elegant: it wraps both sync throws and async rejections. The single .catch(next) passes the error to Express as if you wrote next(err).

[3] Custom AppError class is the second essential pattern. Without it, all errors become generic 500s. With it, any layer (service, DB, validation) can throw a descriptive error with the right status code, and the error middleware handles it uniformly.

[4] super(message) is required when extending built-in classes in JavaScript. It calls the parent Error constructor with the message argument.

[7] Clean route handlers — this is what interviewers want to see. Business logic only, no error-handling boilerplate. The separation of concerns (route logic vs error handling) is a senior-level skill.

[10] Four-parameter signature — if you write 3 params, Express ignores your error handler. This is a common gotcha. You MUST have all four: (err, req, res, next).

[13] Don't expose stack traces in production — they reveal your file structure, library versions, and internal logic to potential attackers. The NODE_ENV check is the right guard.

[14] The 404 handler position matters — it must come AFTER all routes. Express processes middleware top-to-bottom; if no route matched, this catches it.`
    
    },
    {
      level: "Intermediate",
      tag: "CODE",
      title: "Rate Limiter Middleware",
      q: `Problem: Your public API is getting abused — one IP is sending 500 requests per minute. Build a custom in-memory rate limiter middleware that allows maximum 10 requests per minute per IP. Return a 429 Too Many Requests response when the limit is exceeded. Include a Retry-After header.`,
      code: `const express = require("express");
const app     = express();

// ─── In-Memory Rate Limiter ───────────────────────────────────────────────────
// [1] Map<IP, { count, resetTime }> — a Map is used instead of a plain object
//     because it has better performance for frequent get/set operations and
//     doesn't have prototype-chain pollution issues.
const requestCounts = new Map();

const WINDOW_MS    = 60 * 1000; // [2] 1 minute window in milliseconds
const MAX_REQUESTS = 10;        // [3] Max requests per window per IP

function rateLimiter(req, res, next) {
  // [4] req.ip gives the client's IP address. In production behind a proxy (nginx, ELB),
  //     use req.headers["x-forwarded-for"] or set app.set("trust proxy", 1) first.
  const ip  = req.ip;
  const now = Date.now();

  // [5] Get existing record for this IP, or undefined if first request.
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    // [6] First request from this IP, OR the previous window has expired.
    //     Start a fresh window: count = 1, resetTime = now + 1 minute.
    requestCounts.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return next(); // [7] Allow the request — within limit
  }

  if (record.count >= MAX_REQUESTS) {
    // [8] Limit exceeded. Calculate how many seconds until the window resets.
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);

    // [9] Set standard Retry-After header — tells clients when to retry.
    //     Some HTTP clients (like axios-retry) read this automatically.
    res.set("Retry-After", retryAfter);

    // [10] 429 Too Many Requests — the correct HTTP status for rate limiting.
    //      Include helpful info so the developer debugging knows what happened.
    return res.status(429).json({
      error: "Rate limit exceeded",
      message: \`Max \${MAX_REQUESTS} requests per minute. Try again in \${retryAfter}s.\`,
      retryAfter,
    });
  }

  // [11] Within limit — increment the count and allow the request.
  record.count++;
  next();
}

// ─── Cleanup stale entries ────────────────────────────────────────────────────
// [12] The Map grows unboundedly if IPs never make a second request.
//      This cleanup runs every minute and removes entries whose window has expired.
//      In production, use Redis with TTL instead — it handles expiry automatically.
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of requestCounts) {
    if (now > record.resetTime) requestCounts.delete(ip);
  }
}, WINDOW_MS);

// ─── Apply middleware ─────────────────────────────────────────────────────────
// [13] Apply globally to all routes. Could also apply to specific routes:
//      app.get("/api/data", rateLimiter, handler)
app.use(rateLimiter);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get("/api/data", (req, res) => {
  res.json({ message: "Here is your data!", timestamp: new Date() });
});

app.get("/api/status", (req, res) => {
  // [14] Debug endpoint — shows current rate limit state for requesting IP.
  //      Remove this in production or protect it!
  const record = requestCounts.get(req.ip);
  const remaining = record ? Math.max(0, MAX_REQUESTS - record.count) : MAX_REQUESTS;
  res.json({ ip: req.ip, requestsRemaining: remaining });
});

app.listen(3000, () => console.log("Rate limited server on port 3000"));`,
      note: `Production considerations and design decisions:
[1] Map vs Object: JavaScript objects are fine for key-value storage, but Maps are preferred when keys are dynamic (like IP addresses) — better performance for frequent adds/lookups, no prototype-chain keys, and the size property is built in.

[2] WINDOW_MS = 60 * 1000: Writing 60000 vs 60 * 1000 — the second form is self-documenting. Anyone reading knows it's 60 seconds without a mental calculation.

[3] Named constants at the top: changing rate limit rules means editing ONE place instead of hunting through the code. This is the "magic numbers" antipattern fix.

[4] req.ip behind a proxy: If your Node server is behind Nginx or an AWS load balancer, req.ip might return the proxy's IP (127.0.0.1), not the real client. You MUST set app.set("trust proxy", 1) to let Express read X-Forwarded-For correctly.

[6] Window reset check (now > record.resetTime): The sliding window resets after 1 minute. If someone makes request 10 at 0:59, their window doesn't reset until 1:59. Fixed window (simpler) resets at exactly 1:00 — can be gamed by sending 10 at 0:59 and 10 at 1:01.

[9] Retry-After header: This is a standardized HTTP header (RFC 7231). Well-behaved API clients read this and wait before retrying — reducing hammering on your server.

[10] 429 is the correct status: Don't use 403 (Forbidden — permanent) or 400 (Bad Request — client error). 429 specifically means "slow down, you're going too fast."

[12] Memory leak prevention: The cleanup interval is critical. Without it, every unique IP ever seen stays in memory forever. In a high-traffic app, this Map would grow to millions of entries. The production solution is Redis with TTL — keys auto-expire without manual cleanup.`
    
    },
    {
      level: "Intermediate",
      tag: "CODE",
      title: "Pagination + Sorting API",
      q: `Problem: Build a GET /products API endpoint that supports: (1) Pagination via ?page=2&limit=5, (2) Sorting via ?sortBy=price&order=asc, (3) Filtering via ?category=electronics&minPrice=100&maxPrice=500. Return pagination metadata (totalPages, currentPage, hasNext, hasPrev) along with the results.`,
      code: `const express  = require("express");
const mongoose = require("mongoose");
const app      = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/products_db");

const Product = mongoose.model("Product", new mongoose.Schema({
  name: String, price: Number, category: String, inStock: Boolean,
}));

// ─── GET /products ─────────────────────────────────────────────────────────────
app.get("/products", async (req, res) => {
  try {
    // ── 1. PAGINATION ─────────────────────────────────────────────────────────
    // [1] Parse page and limit from query string. Provide sane defaults.
    //     Number() converts string "2" to number 2. || handles NaN and undefined.
    const page  = Math.max(1, Number(req.query.page)  || 1);  // min page = 1
    const limit = Math.min(50, Number(req.query.limit) || 10); // max limit = 50

    // [2] skip = how many documents to skip before returning results.
    //     Page 1: skip 0. Page 2: skip 10. Page 3: skip 20. Formula: (page-1)*limit.
    const skip = (page - 1) * limit;

    // ── 2. SORTING ────────────────────────────────────────────────────────────
    // [3] Whitelist allowed sort fields — prevents sorting by arbitrary fields
    //     like _id internals or injecting MongoDB operators.
    const ALLOWED_SORT_FIELDS = ["name", "price", "createdAt"];
    const sortBy    = ALLOWED_SORT_FIELDS.includes(req.query.sortBy)
                        ? req.query.sortBy
                        : "createdAt"; // default sort

    // [4] Mongoose sort direction: 1 = ascending, -1 = descending.
    //     { [sortBy]: direction } uses a computed property key.
    const sortOrder = req.query.order === "desc" ? -1 : 1;
    const sortObj   = { [sortBy]: sortOrder };

    // ── 3. FILTERING ──────────────────────────────────────────────────────────
    // [5] Build filter object incrementally — only add conditions that were provided.
    //     This way, missing query params don't filter out results.
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category; // [6] Exact match
    }

    if (req.query.inStock !== undefined) {
      // [7] Convert "true"/"false" string to boolean for MongoDB comparison.
      filter.inStock = req.query.inStock === "true";
    }

    // [8] Price range filter using MongoDB comparison operators:
    //     $gte = greater than or equal, $lte = less than or equal.
    //     Only add the condition if the query param was provided.
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
    }

    // [9] Text search — partial, case-insensitive via regex.
    //     $options: "i" = case-insensitive. For production, use MongoDB text indexes.
    if (req.query.search) {
      filter.name = { $regex: req.query.search, $options: "i" };
    }

    // ── 4. EXECUTE QUERIES ────────────────────────────────────────────────────
    // [10] Run count and data queries in PARALLEL using Promise.all.
    //      countDocuments(filter) gets total matching docs (for pagination metadata).
    //      Running them sequentially would double the response time unnecessarily.
    const [total, products] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter)
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .lean(), // [11] lean() for read-only data — faster
    ]);

    // ── 5. BUILD PAGINATION METADATA ─────────────────────────────────────────
    // [12] totalPages rounded up — 11 items / 10 per page = 2 pages.
    const totalPages = Math.ceil(total / limit);

    res.json({
      // [13] Pagination metadata — always return this so clients can build pagination UI.
      pagination: {
        total,
        totalPages,
        currentPage:  page,
        limit,
        hasNextPage:  page < totalPages,  // [14] Useful for "Load More" buttons
        hasPrevPage:  page > 1,
      },
      // [15] Applied filters — helps client debug what filters are active.
      appliedFilters: { sortBy, order: req.query.order || "asc", ...filter },
      products,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Paginated API on port 3000"));`,
      note: `Why each decision in this API matters:
[1] Sane defaults and max limits — page defaults to 1, limit defaults to 10 and is capped at 50. Without the cap, a client could request limit=10000 and load your entire database in one call, crashing your server.

[2] skip formula: (page - 1) * limit — this is the universal formula. Memorize it. Page 1 skips 0, page 2 skips 10 (one page worth), page 3 skips 20.

[3] Whitelist sort fields — never trust user input directly. sortBy=__proto__ or sortBy=$where could be used to probe or attack the database. Only allow known safe field names.

[4] Computed property key { [sortBy]: 1 } — JavaScript dynamic object key syntax. If sortBy = "price", this creates { price: 1 }. Essential for building dynamic queries.

[5] Incremental filter building — start with {} and only add conditions when query params exist. This means no query param = no filter applied for that field.

[7] String-to-boolean conversion — URL query params are always strings. "true" !== true in JavaScript. Explicit comparison req.query.inStock === "true" converts correctly.

[8] MongoDB $gte/$lte operators — MongoDB query operators for comparisons. $gte means >=, $lte means <=. Building the price range object only when needed avoids the query always having a price filter.

[10] Parallel queries with Promise.all — running count and data queries in parallel cuts response time roughly in half. This is a standard optimization for paginated APIs. Sequential await would wait for count, then wait for data.

[14] hasNextPage/hasPrevPage — computed flags clients use to show/hide pagination buttons. Clients shouldn't have to recalculate these from totalPages and currentPage.

[15] Returning applied filters — helps API consumers debug. "Why am I seeing these results?" is answered by the appliedFilters object.`
    
    },
    {
      level: "Intermediate",
      tag: "CODE",
      title: "WebSocket Real-Time Chat",
      q: `Problem: Build a real-time chat server using Node.js WebSockets (ws library). Multiple clients should be able to connect, send messages, and receive messages from all other connected clients. Track online user count. Broadcast join/leave notifications. Handle client disconnections gracefully.`,
      code: `// Install: npm install ws
const { WebSocketServer, WebSocket } = require("ws");
const http = require("http");

// [1] Create an HTTP server first, then attach the WebSocket server to it.
//     This lets you serve both HTTP and WebSocket on the same port.
//     WebSocket upgrades an existing HTTP connection — they share the port.
const server = new http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Chat server is running. Connect via WebSocket.");
});

// [2] WebSocketServer attached to the HTTP server.
//     { server } means: upgrade WebSocket connections on this existing server.
const wss = new WebSocketServer({ server });

// [3] Map<WebSocket, userInfo> — tracks all connected clients with their metadata.
//     Map is used (not array) because lookups by key (the ws object) are O(1).
//     Store username and joinTime per connection.
const clients = new Map();

// [4] Helper: broadcast a message to ALL connected clients.
//     ws.readyState === WebSocket.OPEN ensures we don't send to closing connections.
function broadcast(message, excludeClient = null) {
  const data = JSON.stringify(message);
  for (const [client] of clients) {
    if (client !== excludeClient && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  }
}

// [5] Helper: send to a specific client only (for private/system messages).
function sendTo(client, message) {
  if (client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(message));
  }
}

// ─── Connection handler ───────────────────────────────────────────────────────
wss.on("connection", (ws, req) => {
  // [6] Generate a temporary username until the client sends their real name.
  //     Using a counter ensures uniqueness. In production, use authentication.
  const guestName = \`Guest_\${clients.size + 1}\`;
  clients.set(ws, { username: guestName, joinedAt: new Date() });

  console.log(\`New connection. Total clients: \${clients.size}\`);

  // [7] Welcome message sent only to the new client — not broadcast.
  sendTo(ws, {
    type:    "welcome",
    message: \`Welcome! You are \${guestName}. Send {"type":"setName","name":"YourName"} to set your name.\`,
    onlineCount: clients.size,
  });

  // [8] Notify all OTHER clients of the new arrival.
  broadcast({ type: "system", message: \`\${guestName} joined the chat\`, onlineCount: clients.size }, ws);

  // ── Message handler ───────────────────────────────────────────────────────
  ws.on("message", (rawData) => {
    let parsed;
    try {
      // [9] Always try/catch JSON.parse — a malformed message would crash the server.
      parsed = JSON.parse(rawData.toString());
    } catch {
      return sendTo(ws, { type: "error", message: "Invalid JSON format" });
    }

    const user = clients.get(ws);

    // [10] Message routing based on type — extensible pattern.
    //      Add new message types here without changing other logic.
    switch (parsed.type) {
      case "setName": {
        // [11] Update username in the Map.
        const oldName = user.username;
        const newName = (parsed.name || "").trim().slice(0, 20) || oldName; // [12] Sanitize: max 20 chars
        clients.set(ws, { ...user, username: newName });
        broadcast({ type: "system", message: \`\${oldName} is now known as \${newName}\` });
        break;
      }

      case "message": {
        const text = (parsed.text || "").trim();
        if (!text) return; // [13] Ignore empty messages

        // [14] Broadcast to everyone including the sender (sender needs to see their own message).
        broadcast({
          type:      "message",
          username:  user.username,
          text,
          timestamp: new Date().toISOString(),
        });
        break;
      }

      default:
        sendTo(ws, { type: "error", message: \`Unknown message type: \${parsed.type}\` });
    }
  });

  // ── Disconnect handler ────────────────────────────────────────────────────
  ws.on("close", (code, reason) => {
    const user = clients.get(ws);
    // [15] Remove from Map — crucial cleanup. Without this, the Map grows forever
    //      with dead connections (memory leak).
    clients.delete(ws);

    console.log(\`\${user?.username} disconnected. Code: \${code}\`);

    // [16] Notify remaining clients — only if someone was registered.
    if (user) {
      broadcast({
        type:        "system",
        message:     \`\${user.username} left the chat\`,
        onlineCount: clients.size,
      });
    }
  });

  // [17] Error handler prevents unhandled errors from crashing the server.
  ws.on("error", (err) => {
    console.error("WebSocket error:", err.message);
    clients.delete(ws); // [18] Cleanup on error too
  });
});

server.listen(8080, () => {
  console.log("WebSocket chat server running on ws://localhost:8080");
});`,
      note: `WebSocket patterns and real-time concepts:
[1] HTTP + WebSocket on same port — WebSocket is an upgrade of HTTP. The client sends a special HTTP request with Upgrade: websocket header, and the server switches the connection protocol. No need for a separate port.

[2] { server } option — attaches wss to the existing HTTP server. Alternative: { port: 8080 } creates a standalone WebSocket server. Sharing a server is preferred in production.

[3] Map<ws, userInfo> instead of Array — when a message arrives, you need to look up the user's info by the ws object. Array lookup would be O(n) (loop to find the matching socket). Map lookup is O(1). For 10,000 concurrent users, this matters.

[4] broadcast() helper — the most important function in a chat server. It iterates all clients and sends to each. The excludeClient option lets you skip the sender when broadcasting messages (or include them — depends on your UX). readyState === OPEN guards against sending to closing sockets.

[6] Temporary guest names — in production, clients authenticate before connecting (JWT in the WebSocket URL or cookie). Here we assign a guest name as a placeholder.

[7] sendTo vs broadcast — sendTo is for messages only the recipient should see (welcome message, error responses, DMs). broadcast is for messages everyone should see (chat messages, join/leave notifications).

[9] try/catch around JSON.parse — a single malformed message without this would throw an uncaught exception, potentially crashing the server. Always validate/parse incoming data.

[10] Switch on message type — this is the standard WebSocket protocol pattern. You define your own "message types" and route accordingly. Think of it as a miniature API over the persistent connection.

[12] Input sanitization — slice(0, 20) limits username length. In production, also strip HTML, check for profanity, etc. Never trust client data.

[15] clients.delete(ws) on close — the most critical cleanup in WebSocket servers. Each connection holds memory. If you forget to delete, the Map accumulates dead entries and you have a memory leak.

[17] ws.on("error") — without this handler, unhandled errors would emit an uncaughtException and potentially crash Node. Always handle both "close" and "error" events on sockets.`
    
    },
  ],

  "JavaScript": [
  {
    level: "Beginner",
    tag: "CODE",
    title: "Flatten a Nested Array",
    q: `Problem: Write a function to flatten a deeply nested array into a flat array. Implement 3 ways: using Array.flat(), a recursive solution, and a stack-based iterative approach.`,
    code: `// Method 1: Built-in Array.flat()
// [1] Array.flat(Infinity) flattens ALL nesting levels regardless of depth
function flattenBuiltIn(arr) {
  return arr.flat(Infinity);
}

// Method 2: Recursive using reduce (interview-preferred)
// [2] reduce is perfect — we collapse nested arrays into one flat array
function flattenRecursive(arr) {
  return arr.reduce((flat, item) => {
    if (Array.isArray(item)) {
      // [3] Array.isArray is the correct check — typeof [] === 'object' won't work
      return flat.concat(flattenRecursive(item)); // [4] Recurse into nested array
    }
    return flat.concat(item); // [5] Primitive — just add it
  }, []); // [6] Start with empty array accumulator
}

// Method 3: Stack-based iterative (no recursion, avoids stack overflow)
function flattenIterative(arr) {
  const result = [];
  const stack = [...arr]; // [7] Copy to avoid mutating input

  while (stack.length) {
    const item = stack.pop(); // [8] LIFO — take from the end
    if (Array.isArray(item)) {
      stack.push(...item); // [9] Push nested items back for processing
    } else {
      result.unshift(item); // [10] unshift preserves order (we pop from right)
    }
  }
  return result;
}

// Tests
const nested = [1, [2, 3], [4, [5, [6, 7]]], 8];
console.log(flattenBuiltIn(nested));   // [1,2,3,4,5,6,7,8]
console.log(flattenRecursive(nested)); // [1,2,3,4,5,6,7,8]
console.log(flattenIterative(nested)); // [1,2,3,4,5,6,7,8]

// Edge cases
console.log(flattenRecursive([]));       // []
console.log(flattenRecursive([1,2,3]));  // [1,2,3] — already flat
console.log(flattenRecursive([[[1]]]));  // [1] — deeply nested`,
    note: `Line-by-line notes:
[1] flat(Infinity) — always mention this first in interviews. Knowing the built-in shows JS fluency. flat(1) only flattens one level. Always mention the depth parameter.

[2] reduce as accumulator — reduce is the right tool when you're collapsing an array into a single value. The pattern "flat.concat(...)" builds the result without mutation.

[3] Array.isArray() — the only correct way to check for arrays. typeof [] returns 'object', which also matches plain objects, null, etc. Never use typeof for array detection.

[4] Recursive call — this is what makes it handle arbitrary depth. Each nested array triggers another reduce from scratch, which eventually hits only primitives at the base case.

[5] Base case — when item is a primitive (number, string, etc.), just concat it. Recursion terminates naturally.

[6] Initial accumulator [] — always provide an initial value for reduce. Without it, reduce on an empty array throws "Reduce of empty array with no initial value".

[7] Stack copy — [...arr] prevents mutating the original. A key functional programming principle: don't modify inputs.

[8] stack.pop() — LIFO order means we process from the end. This means items come out in reverse unless we compensate with unshift.

[9] stack.push(...item) — spreads nested array's items back onto the stack for processing. This is the key insight: instead of recursion, we re-queue the work.

[10] result.unshift() compensates for the LIFO reversal. Since we pop from the right, items would come out reversed. unshift adds to the front, preserving original order.

Interview tip: start with flat(Infinity), then implement recursively when asked "without built-ins?", then offer the iterative version as the most production-ready for very deeply nested data.`
  },
  {
    level: "Beginner",
    tag: "CODE",
    title: "Debounce Function",
    q: `Problem: Implement a debounce(fn, delay) function that delays execution until N ms after the last call. Add .cancel() and .flush() methods. Demonstrate with a search input scenario.`,
    code: `// [1] debounce is a higher-order function: takes a function, returns a function
function debounce(fn, delay) {
  let timerId = null; // [2] Closure: persists across calls, tracks pending timer

  function debounced(...args) {
    clearTimeout(timerId); // [3] Cancel any previously scheduled execution

    // [4] Schedule new execution — resets the clock on every call
    timerId = setTimeout(() => {
      timerId = null;         // [5] Reset so cancel/flush know no timer is pending
      fn.apply(this, args);   // [6] Execute with correct 'this' and all arguments
    }, delay);
  }

  // [7] cancel() aborts any pending execution — useful for cleanup on unmount
  debounced.cancel = function () {
    clearTimeout(timerId);
    timerId = null;
  };

  // [8] flush() fires immediately if there's a pending call — useful for form submit
  debounced.flush = function (...args) {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
      fn.apply(this, args);
    }
  };

  return debounced;
}

// Usage: search input — user types fast, API called only once
let callCount = 0;
const searchAPI = debounce(function (query) {
  callCount++;
  console.log(\`API call #\${callCount} for: "\${query}"\`);
}, 300);

// Simulate typing "React" — 5 keystrokes 50ms apart
['R','Re','Rea','Reac','React'].forEach((text, i) => {
  setTimeout(() => {
    console.log(\`Keystroke: "\${text}"\`);
    searchAPI(text); // [9] Called 5 times, fires only ONCE after last keystroke
  }, i * 50);
});
// At t=200ms: last keystroke "React"
// At t=500ms: API fires → "API call #1 for: React"

// cancel() usage — component unmounting
const debouncedSave = debounce(saveDocument, 1000);
debouncedSave('content...');
debouncedSave.cancel(); // abort before it fires

// flush() usage — form submit should send immediately
const debouncedValidate = debounce(validate, 500);
debouncedValidate(formData);
// User presses Submit before 500ms expires:
debouncedValidate.flush(formData); // fire right now`,
    note: `How every piece works:
[1] Higher-order function — debounce takes fn and returns debounced. The returned function is what you use instead of fn. This is the decorator pattern.

[2] timerId in closure — the key mechanism. timerId lives in debounce's scope, not inside the returned function. So it persists between calls. Without closure, each call would have its own timer and the "reset" wouldn't work.

[3] clearTimeout(timerId) — if timerId is null, this is a no-op (safe). If a timer is pending, this cancels it. "Reset the clock" step.

[4] setTimeout re-schedules — each call starts a fresh N-ms countdown. Only if the user pauses for N ms does the timer actually fire.

[5] Reset timerId to null after firing — important for knowing "is a timer pending?" which flush() checks.

[6] fn.apply(this, args) — preserves 'this' context. If you used fn(...args), 'this' inside fn would be wrong for methods. apply is the safe way to forward both context and arguments.

[7] .cancel() — production debounce includes this. React's useEffect cleanup calls cancel() to abort pending debounced calls when a component unmounts, preventing "can't update unmounted component" errors.

[8] .flush() — "execute now even if the debounce hasn't expired." Critical for form submission: the user might submit before the 500ms validation debounce fires.

[9] 5 calls, 1 API request — this is the whole point. Each call resets the 300ms timer. Since keystrokes are only 50ms apart, only the last one's 300ms timer completes.

Debounce vs Throttle in one sentence: debounce fires AFTER a pause; throttle fires AT MOST once per interval. Use debounce for search, resize-final; throttle for scroll, mousemove.`
  },
  {
    level: "Beginner",
    tag: "CODE",
    title: "Deep Clone an Object",
    q: `Problem: Implement deepClone() that creates a fully independent copy of a nested object. Handle nested objects, arrays, Dates, null, and primitives. Explain why JSON.parse/stringify is insufficient.`,
    code: `// Method 1: structuredClone — modern native solution (recommended)
// [1] Available in Node 17+ and all modern browsers
// Handles: nested objects, arrays, Dates, Maps, Sets, circular refs
// Doesn't handle: functions, DOM nodes
function deepCloneModern(value) {
  return structuredClone(value);
}

// Method 2: JSON (simple but lossy — know the limits)
// [2] Loses: functions (silently dropped), undefined (dropped),
//     Dates → strings, NaN → null, Infinity → null, Map/Set → {}
function deepCloneJSON(value) {
  return JSON.parse(JSON.stringify(value));
}

// Method 3: Recursive implementation — interview gold
function deepClone(value) {
  // [3] Base case: primitives (string, number, boolean, null, undefined, symbol)
  //     are already values — no cloning needed, just return them
  if (value === null || typeof value !== 'object') return value;

  // [4] Handle Date — instanceof check before generic object handling
  //     new Date(value.getTime()) creates an independent Date with same timestamp
  if (value instanceof Date) return new Date(value.getTime());

  // [5] Handle Array — must check BEFORE the generic object case
  //     typeof [] === 'object', so we'd treat arrays as plain objects without this
  if (Array.isArray(value)) {
    return value.map(item => deepClone(item)); // [6] Clone each element recursively
  }

  // [7] Handle plain objects — Object.create preserves the prototype chain
  const cloned = Object.create(Object.getPrototypeOf(value));

  // [8] Copy each own enumerable property recursively
  for (const key of Object.keys(value)) {
    cloned[key] = deepClone(value[key]);
  }

  return cloned;
}

// Verification — prove full independence
const original = {
  name: 'Alice',
  scores: [95, 87, 92],
  address: { city: 'Mumbai', pincode: { code: 400001 } },
  createdAt: new Date('2024-01-01'),
  active: true,
  notes: null
};

const clone = deepClone(original);

clone.name = 'Bob';           // change primitive
clone.scores.push(100);       // modify nested array
clone.address.city = 'Delhi'; // modify nested object

// [9] Original is untouched — deep clone worked
console.log(original.name);          // 'Alice'   ✓
console.log(original.scores);        // [95,87,92] ✓ — no 100 added
console.log(original.address.city);  // 'Mumbai'  ✓
console.log(clone.createdAt instanceof Date); // true ✓

// [10] JSON method failure:
const obj = { fn: () => 'hi', d: new Date(), x: undefined };
console.log(JSON.parse(JSON.stringify(obj)));
// { d: "2024-01-01T00:00:00.000Z" } — fn and x silently dropped, Date to string`,
    note: `Why each decision matters:
[1] structuredClone — always mention this first. It's native, handles much more than JSON, and is available everywhere modern. For most real-world use (API data, React state), this is the right answer. Limitation: no functions.

[2] JSON.parse/stringify — most common beginner answer. Know the losses: silently drops functions and undefined; converts Date to ISO string; converts NaN and Infinity to null; throws on circular references. Acceptable only for simple JSON-safe data.

[3] Primitive check — the base case. Note: null check must come BEFORE the typeof check because typeof null === 'object' is the famous JS historical bug. Always handle null explicitly first.

[4] Date handling — Dates are typeof 'object', so they'd fall into the generic object branch and be wrongly cloned as empty objects. The instanceof Date guard catches them first. new Date(getTime()) creates a new independent Date.

[5] Array.isArray() before generic object — arrays are also typeof 'object'. Without this check, [] would be cloned as {} (losing all array methods and numeric indices). Array.isArray is the only reliable check.

[6] value.map(item => deepClone(item)) — functional recursive array cloning. map creates a new array of the same length, with each element independently cloned.

[7] Object.create(Object.getPrototypeOf(value)) — preserves the prototype chain. If value is an instance of a class, the clone inherits the same prototype. Using {} would lose class methods.

[8] Object.keys — only own enumerable properties. Prototype properties are inherited, not copied (correct behavior). Non-enumerable properties (like array.length) are handled by Array.isArray branch.

[9] Verification is critical — always demonstrate independence by modifying the clone and showing the original is unchanged. This is what makes a deep clone correct.

[10] JSON failure demonstration — showing WHY JSON is insufficient is as important as knowing the alternative. It proves you understand the trade-offs.`
  },
  {
    level: "Beginner",
    tag: "CODE",
    title: "Event Emitter / Pub-Sub",
    q: `Problem: Build an EventEmitter class from scratch with on(event, fn), off(event, fn), emit(event, ...args), and once(event, fn) methods. This tests understanding of the Observer pattern.`,
    code: `class EventEmitter {
  constructor() {
    // [1] Map for event storage — safer than plain object (no prototype pollution)
    //     Keys: event names | Values: arrays of listener functions
    this.events = new Map();
  }

  // [2] on(): register a persistent listener
  on(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }
    if (!this.events.has(event)) {
      this.events.set(event, []); // [3] Lazy-initialize listener array
    }
    this.events.get(event).push(listener);
    return this; // [4] Return 'this' for method chaining
  }

  // [5] off(): remove a specific listener (matched by reference)
  off(event, listener) {
    if (!this.events.has(event)) return this;
    const filtered = this.events.get(event).filter(fn => fn !== listener);
    // [6] Comparison is by REFERENCE — must pass the exact same function object
    if (filtered.length > 0) {
      this.events.set(event, filtered);
    } else {
      this.events.delete(event); // [7] Clean up empty entries
    }
    return this;
  }

  // [8] emit(): call all listeners for an event
  emit(event, ...args) {
    if (!this.events.has(event)) return false;

    // [9] Spread to copy before iterating — a listener might call off() during emit
    //     Without the copy, modifying the array mid-loop causes missed callbacks
    const listeners = [...this.events.get(event)];
    listeners.forEach(listener => {
      try {
        listener.apply(this, args); // [10] Correct 'this' and all emitted args
      } catch (err) {
        console.error('Listener error:', err); // [11] Isolate bad listeners
      }
    });
    return true;
  }

  // [12] once(): listener fires exactly once, then self-removes
  once(event, listener) {
    const wrapper = (...args) => {
      listener.apply(this, args);
      this.off(event, wrapper); // [13] Remove wrapper (not original fn) after firing
    };
    wrapper._original = listener; // [14] Store for reference if needed
    return this.on(event, wrapper);
  }

  removeAllListeners(event) {
    if (event) this.events.delete(event);
    else this.events.clear();
    return this;
  }

  listenerCount(event) {
    return this.events.has(event) ? this.events.get(event).length : 0;
  }
}

// Demo
const emitter = new EventEmitter();

const onData = (payload) => console.log('Data received:', payload);
emitter.on('data', onData);

// once — fires only once
emitter.once('connect', () => console.log('Connected!'));
emitter.emit('connect');  // 'Connected!'
emitter.emit('connect');  // nothing — listener was removed

// Method chaining
emitter
  .on('error', console.error)
  .on('close', () => console.log('Closed'))
  .emit('data', { id: 1, value: 42 }); // 'Data received: { id: 1, value: 42 }'

// off — remove specific listener
emitter.off('data', onData);
emitter.emit('data', { id: 2 }); // nothing — listener was removed

console.log(emitter.listenerCount('error')); // 1`,
    note: `Design decisions explained:
[1] Map instead of {} — plain objects have prototype properties ('constructor', 'toString', etc.) that could clash with event names. A Map has no prototype baggage, making any string safe as a key.

[3] Lazy initialization — only create the listener array when the first listener is added. Saves memory for events that are declared but never subscribed to.

[4] Return this for chaining — the fluent interface pattern. Allows emitter.on('a', fn1).on('b', fn2).emit('a') in one expression. Common in JS libraries (jQuery, EventEmitter, streams).

[5] off() removes by REFERENCE — this catches beginners. If you do: emitter.off('data', (x) => x), it won't remove anything even if a similar anonymous function was registered. You must hold a reference to the exact same function object.

[9] Defensive copy [...listeners] — critical for correctness. If a listener calls off() (to remove itself) during emit, without the copy it would modify the array being iterated — causing some listeners to be skipped. The copy prevents this.

[10] listener.apply(this, args) — two things: 'this' inside the listener will be the emitter (matches Node.js EventEmitter behavior); and spread args means emit('data', 1, 2, 3) calls listener(1, 2, 3).

[11] try/catch per listener — isolates bad listeners. If listener A throws, listeners B and C still run. Without this, one bad listener silently kills all subsequent ones.

[12] once() uses a wrapper — rather than special-casing in emit(), once() registers a wrapper function that calls the original listener then removes itself. Clean separation of concerns.

[13] off(event, wrapper) — we registered wrapper with on(), so we must remove wrapper (not the original listener). off() compares by reference, so we must pass the exact same function.

[14] Storing _original — allows advanced implementations to find and remove once() listeners by the original function, not the wrapper. Used in Node.js EventEmitter's removeAllListeners.`
  },
  {
    level: "Beginner",
    tag: "CODE",
    title: "Implement map, filter, reduce from Scratch",
    q: `Problem: Implement your own Array.myMap(), Array.myFilter(), and Array.myReduce() on Array.prototype without using the built-ins. Explain what each method actually does internally.`,
    code: `// [1] Extending Array.prototype — educational only!
//     In production: never modify built-in prototypes (library conflicts, future collisions)

// ─── myMap ────────────────────────────────────────────────────────────────────
// [2] map: transform every element, return new array of SAME length
Array.prototype.myMap = function(callback) {
  // [3] 'this' = the array myMap is called on: [1,2,3].myMap(...)
  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this) { // [4] Skip holes in sparse arrays: [1,,3] has no index 1
      // [5] callback gets: currentValue, index, original array — same as built-in
      result.push(callback(this[i], i, this));
    }
  }

  return result; // [6] NEW array — never mutates the original
};

// ─── myFilter ─────────────────────────────────────────────────────────────────
// [7] filter: keep elements where callback returns truthy, return smaller array
Array.prototype.myFilter = function(callback) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      // [8] If callback is truthy, add the ORIGINAL element (not the truthy result)
      if (callback(this[i], i, this)) {
        result.push(this[i]);
      }
    }
  }

  return result;
};

// ─── myReduce ─────────────────────────────────────────────────────────────────
// [9] reduce: collapse the array into a SINGLE value (number, string, object, array...)
Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator;
  let startIndex;

  if (arguments.length >= 2) {
    // [10] Initial value provided — start accumulator at it, iterate from index 0
    accumulator = initialValue;
    startIndex = 0;
  } else {
    // [11] No initial value — first element is the accumulator, start from index 1
    if (this.length === 0) {
      // [12] Match built-in: empty array + no initial value = TypeError
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      // [13] Each iteration: callback receives acc, current, index, array
      //      The RETURN VALUE becomes the next accumulator
      accumulator = callback(accumulator, this[i], i, this);
    }
  }

  return accumulator; // [14] Final accumulated value
};

// ─── Tests ─────────────────────────────────────────────────────────────────────
const nums = [1, 2, 3, 4, 5];

console.log(nums.myMap(n => n * 2));            // [2, 4, 6, 8, 10]
console.log(nums.myFilter(n => n % 2 === 0));   // [2, 4]
console.log(nums.myReduce((sum, n) => sum + n, 0)); // 15

// Chaining — works exactly like built-ins
const result = nums
  .myFilter(n => n > 2)            // [3, 4, 5]
  .myMap(n => n * n)               // [9, 16, 25]
  .myReduce((sum, n) => sum + n, 0); // 50
console.log(result); // 50

// [15] Prove no mutation
console.log(nums); // [1, 2, 3, 4, 5] — original unchanged`,
    note: `What each decision teaches:
[1] Why not in production — augmenting Array.prototype breaks "open/closed principle." If ES2030 adds Array.prototype.myMap, it would collide. Libraries like Prototype.js famously caused this problem.

[3] 'this' inside prototype methods — 'this' refers to the array the method is called on. This is why arrow functions CANNOT be prototype methods — they don't bind their own 'this'. Always use function() for prototype methods.

[4] Sparse array holes — [1,,3] has length 3 but no element at index 1. i in this checks if the index actually exists. Built-in array methods skip holes the same way. Beginners often miss this.

[5] Three callback parameters — many devs only know about the first (value). The index and original array are powerful: arr.map((v, i, arr) => arr[i-1]) accesses the previous element.

[7] Filter's contract — the callback is a PREDICATE (returns boolean-ish). If truthy, include the ORIGINAL element, not the truthy value. filter(x => x > 2) includes 3, 4, 5 — not true, true, true.

[10] Two forms of reduce — with initial value is safer and more predictable. Without initial value, the first element becomes the accumulator, which works for simple sum/product but can surprise.

[12] Error matching built-in — throwing the same TypeError as Array.prototype.reduce for empty array + no initial value shows mastery. Matching edge cases is what separates good implementations from great ones.

[13] accumulator = callback(...) — the accumulator is REPLACED each iteration. It's not mutated, it's reassigned. This is the essence of reduce: fold all elements into one value by continuously updating the accumulator.

[14] The final accumulator — what reduce ultimately returns. For sum: the total. For object building: the completed object. For array transformation: the new array.

[15] Non-mutation proof — always verify. The array methods should be pure: same input always produces same output, no side effects on the original array.`
  },
  {
    level: "Intermediate",
    tag: "CODE",
    title: "LRU Cache",
    q: `Problem: Implement an LRU (Least Recently Used) Cache with get(key) and put(key, value) methods and a fixed capacity. When full, evict the least recently used item. Both operations must be O(1).`,
    code: `// LRU Cache: O(1) get and put using JavaScript Map's insertion-order guarantee
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    // [1] Map maintains insertion order — we exploit this as LRU ordering
    //     First key in Map = LRU (oldest accessed)
    //     Last key in Map  = MRU (most recently accessed)
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1; // [2] Cache miss — return -1 (LeetCode convention)

    // [3] Move to MRU position: delete + re-insert at the end
    //     Map.set on existing key updates in-place without changing order
    //     But delete + set DOES move to end — this is the trick!
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      // [4] Key exists — delete first so re-insertion moves it to MRU position
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // [5] At capacity with a new key — evict LRU (first entry in Map)
      //     Map.keys() returns keys in insertion order, .next().value = first key
      const lruKey = this.cache.keys().next().value;
      this.cache.delete(lruKey); // [6] O(1) eviction
    }
    this.cache.set(key, value); // [7] Insert at MRU position (end of Map)
  }

  // Debug helper: visualize current cache state LRU → MRU
  toString() {
    const entries = [...this.cache.entries()].map(([k, v]) => \`\${k}:\${v}\`);
    return \`[LRU] \${entries.join(' → ')} [MRU] (size:\${this.cache.size}/\${this.capacity})\`;
  }
}

// Tests
const cache = new LRUCache(3);

cache.put('a', 1);  // [a:1]
cache.put('b', 2);  // [a:1, b:2]
cache.put('c', 3);  // [a:1, b:2, c:3] — full

console.log(cache.get('a'));  // 1 — 'a' moves to MRU
console.log(cache.toString()); // [LRU] b:2 → c:3 → a:1 [MRU]

cache.put('d', 4);  // Evict LRU ('b') — it's now oldest unaccessed
console.log(cache.get('b'));   // -1 — 'b' was evicted ✓
console.log(cache.toString()); // [LRU] c:3 → a:1 → d:4 [MRU]

cache.put('c', 99); // Update 'c' — moves to MRU
console.log(cache.toString()); // [LRU] a:1 → d:4 → c:99 [MRU]

// [8] Bonus: Classic doubly linked list + HashMap (true O(1) without relying on Map order)
// Used in interviews requiring explicit DLL implementation
class Node {
  constructor(k, v) { this.key = k; this.val = v; this.prev = this.next = null; }
}
class LRUCacheClassic {
  constructor(cap) {
    this.cap = cap; this.map = new Map();
    this.head = new Node(0, 0); // [9] Sentinel head (LRU side)
    this.tail = new Node(0, 0); // [10] Sentinel tail (MRU side)
    this.head.next = this.tail; this.tail.prev = this.head;
  }
  _remove(n) { n.prev.next = n.next; n.next.prev = n.prev; } // [11] O(1) unlink
  _addTail(n) { // [12] O(1) insert before tail = MRU position
    n.prev = this.tail.prev; n.next = this.tail;
    this.tail.prev.next = n; this.tail.prev = n;
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const n = this.map.get(key);
    this._remove(n); this._addTail(n); // move to MRU
    return n.val;
  }
  put(key, val) {
    if (this.map.has(key)) this._remove(this.map.get(key));
    else if (this.map.size >= this.cap) {
      const lru = this.head.next; // [13] LRU = first node after sentinel head
      this._remove(lru); this.map.delete(lru.key);
    }
    const n = new Node(key, val);
    this._addTail(n); this.map.set(key, n);
  }
}`,
    note: `Algorithm design breakdown:
[1] The Map-ordering trick — JavaScript Maps maintain insertion order (guaranteed by spec). By deleting and re-inserting a key, we move it to the "most recent" position (end of Map). The "least recent" is always the first key. This lets us build LRU using only a Map with O(1) operations.

[2] Return -1 for cache miss — this is the LeetCode/interview convention for LRU Cache. In production you'd return undefined or throw.

[3] delete + set moves key to end — this is the core insight. map.set on an existing key UPDATES the value but does NOT change insertion order. delete + set creates a fresh insertion at the end. This is how we track "most recently used."

[5] .keys().next().value — the Map iterator's first value is the oldest-inserted key (LRU). This is O(1) because iterators are lazy — they don't build a full list.

[6] O(1) eviction — because we know exactly which key to evict (first in Map), deletion is O(1). No scanning needed.

[9+10] Sentinel nodes — dummy head and tail nodes eliminate edge cases. Without them, insert/remove at boundaries need special if/else logic. With sentinels: "insert MRU" always means "insert before tail.prev"; "get LRU" always means head.next. Uniform operations, no conditionals.

[11] _remove in O(1) — doubly linked list removal is just 2 pointer updates. prev.next = next, next.prev = prev. The node itself can be GC'd.

[12] _addTail in O(1) — 4 pointer updates to insert before the tail sentinel.

[13] LRU = head.next — the node right after the head sentinel is always the least recently used.

Interview strategy: Start with the Map-ordering solution (elegant, O(1), easy to explain). Then offer the DLL+HashMap version if asked "what if you couldn't use Map ordering?" Both are O(1) — the Map version just leverages a JS runtime guarantee.`
  },
  {
    level: "Intermediate",
    tag: "CODE",
    title: "Observable Store (Observer Pattern)",
    q: `Problem: Build a reactive Store class where multiple components can subscribe to state changes. When setState() is called, all registered observers are notified. Simulate multiple UI components watching the same store.`,
    code: `class Store {
  #data;        // [1] Private field — genuinely inaccessible from outside (ES2022)
  #observers;   // [2] Set of observer functions — Set prevents duplicates
  #history;     // [3] Audit trail of all state changes

  constructor(initialState) {
    this.#data      = { ...initialState }; // [4] Copy — don't hold caller's reference
    this.#observers = new Set();
    this.#history   = [{ ...initialState }];
  }

  // [5] subscribe(): register an observer, returns an unsubscribe function
  subscribe(observer) {
    if (typeof observer !== 'function') throw new TypeError('Observer must be a function');
    this.#observers.add(observer);
    // [6] Cleanup pattern used in React useEffect: return the unsubscribe function
    return () => this.#observers.delete(observer);
  }

  // [7] setState(): merge updates and notify observers
  setState(updates) {
    const prev = { ...this.#data }; // [8] Snapshot previous state for comparison

    // [9] Shallow merge — like React's class component setState
    this.#data = { ...this.#data, ...updates };

    // [10] Change detection — only notify if something actually changed
    const changed = Object.keys(updates).some(k => prev[k] !== this.#data[k]);

    if (changed) {
      this.#history.push({ ...this.#data, _timestamp: new Date() });
      this.#notify(prev); // [11] Pass previous state so observers can diff
    }
  }

  // [12] Private notify — calls every observer with new and previous state
  #notify(prev) {
    for (const observer of this.#observers) {
      try {
        observer(this.getState(), prev);
      } catch (err) {
        console.error('Observer error:', err);
      }
    }
  }

  getState()  { return { ...this.#data }; } // [13] Read-only copy — prevent direct mutation
  get size()  { return this.#observers.size; }
  get history() { return this.#history.length; }
}

// Demo: multiple UI components watching the same store
const store = new Store({ user: null, count: 0, theme: 'light', loading: false });

// Component 1: user profile — only reacts to user changes
const unsubProfile = store.subscribe((state, prev) => {
  if (state.user !== prev.user) { // [14] Selective reaction — ignore irrelevant changes
    console.log('[Profile]', state.user ? \`Welcome, \${state.user.name}!\` : 'Logged out');
  }
});

// Component 2: counter display — only reacts to count changes
const unsubCounter = store.subscribe((state, prev) => {
  if (state.count !== prev.count) {
    console.log(\`[Counter] \${prev.count} → \${state.count}\`);
  }
});

// Component 3: theme — reacts to all changes that affect it
store.subscribe((state, prev) => {
  if (state.theme !== prev.theme) {
    console.log(\`[Theme] Switched to: \${state.theme}\`);
    document.body?.setAttribute('data-theme', state.theme);
  }
});

// Trigger state changes
store.setState({ count: 5 });
// → [Counter] 0 → 5  (only counter reacted)

store.setState({ user: { name: 'Alice', role: 'admin' } });
// → [Profile] Welcome, Alice!  (only profile reacted)

store.setState({ theme: 'dark', count: 6 });
// → [Theme] Switched to: dark
// → [Counter] 5 → 6

// [15] Unsubscribe — component unmounts
unsubProfile();
store.setState({ user: null }); // Profile observer gone — no log for this

console.log('Active observers:', store.size);   // 2
console.log('History entries:', store.history); // 5`,
    note: `Pattern design principles:
[1] Private class fields (#field) — ES2022 genuinely private fields. Unlike _privateConvention (just a naming hint), # fields throw if accessed from outside the class. Prevents external code from bypassing the observer system by directly mutating #data.

[2] Set for observers — prevents the same observer function from being registered twice. If a component accidentally calls subscribe twice, the second registration is ignored.

[4] Copying initialState — if you stored initialState directly, the caller could mutate it externally and bypass setState/notify. Always store your own copy.

[5] subscribe returns unsubscribe — the cleanup pattern. React's useEffect:
  useEffect(() => {
    const unsub = store.subscribe(handler);
    return unsub; // cleanup called on unmount
  }, []);
Much cleaner than store.unsubscribe(id) API.

[8] Snapshot prev — needed so observers can compare old vs new state. Without prev, an observer receiving state can't tell what changed. This is how Redux's connect works.

[9] Shallow merge — { ...this.#data, ...updates }. Only provided keys are changed; others remain. This mirrors React's class component setState and Redux's combineReducers.

[10] Change detection — critical optimization. Without this, store.setState({ count: store.getState().count }) (no actual change) would still trigger all observers, causing unnecessary re-renders. This is the foundation of React's shouldComponentUpdate / PureComponent.

[12] Private #notify — the # prefix makes it inaccessible outside the class. External code cannot call store.#notify() — it's truly private to the class.

[14] Selective reaction — each observer filters what it cares about. Component 1 only re-renders when user changes, not when count or theme changes. This is the pattern behind React's useMemo and selector libraries like Reselect.

[15] Unsubscribe on unmount — prevents memory leaks. Unsubscribed observers can be garbage collected along with their closures. This is why React's useEffect return value is called on every cleanup.`
  },
  {
    level: "Intermediate",
    tag: "CODE",
    title: "Async Task Queue with Concurrency Limit",
    q: `Problem: Build an AsyncQueue class that runs async tasks with a configurable max concurrency. With concurrency=2, at most 2 tasks run simultaneously. New tasks queue and auto-start when a slot frees. Return results in completion order.`,
    code: `class AsyncQueue {
  constructor(concurrency = 1) {
    this.concurrency = concurrency; // [1] Max simultaneous tasks
    this.running     = 0;           // [2] Currently executing task count
    this.queue       = [];          // [3] Pending wrapped tasks (FIFO)
    this.completed   = 0;
    this.total       = 0;
  }

  // [4] add(): enqueue a task (fn that returns Promise), returns Promise of result
  add(taskFn) {
    this.total++;
    return new Promise((resolve, reject) => {
      // [5] Wrap: intercepts completion to free the slot and start next task
      const wrapped = async () => {
        try {
          const result = await taskFn();
          this.completed++;
          resolve(result);   // [6] Resolve the outer Promise with the task's result
        } catch (err) {
          this.completed++;
          reject(err);       // [7] Propagate errors to the caller
        } finally {
          this.running--;    // [8] ALWAYS free slot — success or failure
          this._run();       // [9] Immediately try to start next queued task
        }
      };
      this.queue.push(wrapped); // [10] Enqueue the wrapped task
      this._run();              // [11] Try to start immediately if slot available
    });
  }

  // [12] _run(): start as many tasks as concurrency allows
  _run() {
    // [13] Fill all available slots — not just one
    while (this.running < this.concurrency && this.queue.length > 0) {
      const task = this.queue.shift(); // [14] FIFO: take from front
      this.running++;
      task(); // [15] Start without await — fire and forget from _run's perspective
    }
  }

  // [16] addAll(): add multiple tasks, resolve when ALL complete (like Promise.all)
  addAll(taskFns) {
    return Promise.all(taskFns.map(fn => this.add(fn)));
  }

  get stats() {
    return { total: this.total, running: this.running, pending: this.queue.length, completed: this.completed };
  }
}

// Demo — concurrency = 2
const queue = new AsyncQueue(2);

const makeTask = (name, ms) => () => new Promise(resolve => {
  console.log(\`  → START: \${name}\`);
  setTimeout(() => {
    console.log(\`  ✓ DONE:  \${name} (\${ms}ms)\`);
    resolve(\`result-\${name}\`);
  }, ms);
});

// Add 5 tasks — only 2 run at once
const p1 = queue.add(makeTask('Alpha',   1000));
const p2 = queue.add(makeTask('Beta',    500));
const p3 = queue.add(makeTask('Gamma',   800));
const p4 = queue.add(makeTask('Delta',   300));
const p5 = queue.add(makeTask('Epsilon', 600));

// Timeline with concurrency=2:
// t=0:    Alpha + Beta start (2 slots full, Gamma/Delta/Epsilon queued)
// t=500:  Beta done → Gamma starts
// t=1000: Alpha done → Delta starts
// t=1300: Gamma done → Epsilon starts
// t=1300: Delta done (queue empty)
// t=1900: Epsilon done — all finished

Promise.all([p1, p2, p3, p4, p5]).then(results => {
  console.log('All results:', results);
  console.log('Stats:', queue.stats);
});

// Real-world use: rate-limited API fetching
const apiQueue = new AsyncQueue(3); // max 3 concurrent requests

const userIds = Array.from({ length: 20 }, (_, i) => i + 1);
const fetchUser = id => () => fetch(\`/api/users/\${id}\`).then(r => r.json());

// [17] Fetch 20 users, 3 at a time — prevents overwhelming the server
apiQueue.addAll(userIds.map(fetchUser)).then(users => {
  console.log(\`Fetched \${users.length} users with max 3 concurrent requests\`);
});`,
    note: `Concurrency control explained:
[1] concurrency cap — the invariant: this.running ≤ this.concurrency always holds. With concurrency=1, tasks run serially. With concurrency=Infinity, it's equivalent to Promise.all.

[2+3] running vs queue — two separate concerns. "Running" = active tasks right now. "Queue" = tasks waiting for a slot. This separation is the core of the rate limiter.

[4] add() returns a Promise — this is the key API decision. Callers can: await a single task (const r = await queue.add(task)), or collect all promises (Promise.all([...promises])).

[5] Wrapped task — we can't just call taskFn() directly because we need to hook into completion (to free the slot). The wrapper intercepts the resolution/rejection and adds cleanup logic.

[8] finally for slot cleanup — critical. Whether the task resolves OR rejects, the concurrency slot must be freed. Without finally, a rejected task permanently occupies a slot and the queue stalls forever.

[9] _run() in finally — immediately after freeing a slot, try to fill it. This creates the waterfall effect: as soon as one task completes, the next begins with no wasted time.

[11] _run() in add() — when a task is added, immediately check if there's a free slot. If running < concurrency, start it right away. This handles the "queue is empty, slot available" case.

[13] while loop in _run() — multiple slots might be free simultaneously. If 3 tasks finish at the same time, the while loop fills all 3 free slots, not just 1.

[14] queue.shift() — FIFO ensures tasks start in the order they were added. Fair scheduling: first-come, first-served.

[15] task() without await — _run() doesn't await the task. It just fires it off. The task manages its own completion via the Promise returned by add(). _run's job is just to start tasks, not wait for them.

[17] Real-world value — fetching 1000 records at once: bad (exhausts connections, hits rate limits, overwhelms server). Fetching 1000 records 3 at a time: controlled, predictable, server-friendly.`
  },
  {
    level: "Intermediate",
    tag: "CODE",
    title: "JavaScript State Machine",
    q: `Problem: Implement a StateMachine class for an order lifecycle: pending → processing → shipped → delivered (or cancelled). Transitions must be validated — invalid transitions should throw. Log all state changes.`,
    code: `class StateMachine {
  constructor(config) {
    // [1] config = { initial, transitions, onTransition? }
    this.current     = config.initial;
    this.transitions = config.transitions; // [2] Explicit transition table (whitelist)
    this.onTransition = config.onTransition || null;
    this.history     = [{ state: config.initial, at: new Date() }];
  }

  // [3] can(): check if an event is valid in the current state
  can(event) {
    return !!(this.transitions[this.current]?.[event]);
  }

  // [4] send(): fire an event, throwing if invalid
  send(event, payload = {}) {
    if (!this.can(event)) {
      const valid = Object.keys(this.transitions[this.current] || {});
      throw new Error(
        // [5] Helpful error messages — tell the developer what IS valid
        \`Cannot fire "\${event}" in state "\${this.current}". \` +
        \`Valid events: [\${valid.join(', ')}]\`
      );
    }

    const from = this.current;
    const to   = this.transitions[this.current][event]; // [6] Look up next state

    this.current = to; // [7] Update current state
    this.history.push({ from, event, to, payload, at: new Date() }); // [8] Audit log

    // [9] Side effects hook — keeps transition logic separate from state logic
    if (this.onTransition) this.onTransition({ from, event, to, payload });

    return this; // [10] Chain: machine.send('PROCESS').send('SHIP')
  }

  get availableEvents() {
    return Object.keys(this.transitions[this.current] || {});
  }
}

// Order lifecycle machine
const createOrder = (id) => new StateMachine({
  initial: 'pending',

  // [11] Transition table — the complete spec of what's allowed
  //      Anything NOT listed here is automatically invalid
  transitions: {
    pending: {
      CONFIRM:  'confirmed',
      CANCEL:   'cancelled',
    },
    confirmed: {
      PROCESS:  'processing',
      CANCEL:   'cancelled',
    },
    processing: {
      SHIP:     'shipped',
      // Note: no CANCEL here — can't cancel once processing started
    },
    shipped: {
      DELIVER:  'delivered',
      RETURN:   'returned',
    },
    delivered: {
      RETURN:   'returned', // [12] Customer returns after delivery
      // Terminal: no forward transitions from delivered (except return)
    },
    cancelled:  {}, // [13] True terminal state — no exits
    returned: {
      REFUND:   'refunded',
    },
    refunded:   {},  // Terminal state
  },

  onTransition: ({ from, event, to, payload }) => {
    console.log(\`[Order-\${id}] \${from.padEnd(12)} --\${event}--> \${to}\`,
      Object.keys(payload).length ? JSON.stringify(payload) : '');
  }
});

// Happy path
const order = createOrder('ORD-001');
console.log(order.current); // 'pending'

order.send('CONFIRM');
order.send('PROCESS');
order.send('SHIP',    { tracking: 'TRK-789', carrier: 'FedEx' });
order.send('DELIVER', { signedBy: 'Alice' });

console.log(order.current);          // 'delivered'
console.log(order.availableEvents);  // ['RETURN']
console.log('History:', order.history.length); // 5 entries

// [14] Invalid transition caught
try {
  order.send('CANCEL'); // Can't cancel a delivered order
} catch (e) {
  console.error(e.message);
  // 'Cannot fire "CANCEL" in state "delivered". Valid events: [RETURN]'
}

// Cancellation path
const order2 = createOrder('ORD-002');
order2.send('CONFIRM').send('CANCEL');
console.log(order2.current); // 'cancelled'
console.log(order2.can('CANCEL')); // false — terminal state`,
    note: `State machine design patterns:
[1] Config object — using a config object instead of multiple constructor parameters makes the API readable and extensible. Adding a new option (like guards or timeouts) doesn't break existing callers.

[2] Transition table as data — the entire behavior is declared as a plain JS object. This is the declarative approach: you describe WHAT is allowed, not HOW to enforce it. The machine enforces it automatically.

[3] can() as a guard — always expose can() for UI: if (!machine.can('SHIP')) shipButton.disabled = true. This prevents invalid transitions at the UI layer before they even reach the machine.

[5] Helpful errors — error messages should tell you what TO do, not just what went wrong. Listing valid events from the current state saves debugging time.

[6] Look up transition, don't hard-code — transitions[current][event] is the lookup. The machine doesn't know what states exist — it just follows the table. Adding a new state is just adding to the config.

[8] Audit history — every production state machine needs a change log: who transitioned what when, with what data. This history.json answers "why is this order stuck in processing?".

[9] onTransition for side effects — the machine's job is managing state. Side effects (send email, update DB, emit analytics) belong in the hook, not in the machine. Separation of concerns.

[11] Whitelist approach — anything NOT in the transition table is invalid by default. This is safer than blacklisting. You define what's ALLOWED; everything else is blocked. Hard to accidentally allow a forbidden transition.

[12] Non-linear paths — a real order can be returned after delivery. The transition table makes this explicit. Linear state machines (only forward) can't handle real-world complexity.

[13] Terminal states — states with empty transition objects. can() returns false for all events. The machine can't be "stuck" because terminal states are explicit.

[14] Throwing on invalid transitions — fail loudly. Silent failures (returning false) hide bugs. A delivery system silently ignoring an invalid state change could lead to real-world problems. Always throw meaningful errors.

Real-world state machines: React Query (idle/loading/success/error), payment processing (created/authorized/captured/refunded), traffic lights, UI modals (closed/opening/open/closing).`
  }
  ],
  "Express.js": [
  {
    level: "Beginner",
    tag: "CODE",
    title: "Build a Basic REST API",
    q: `Problem: Build a complete REST API for a Todo list with Express. Implement GET /todos, POST /todos, GET /todos/:id, PUT /todos/:id, DELETE /todos/:id. Use in-memory storage with proper status codes and error handling.`,
    code: `const express = require('express');
const app = express();

// [1] Middleware: parse JSON bodies — must be BEFORE routes
app.use(express.json());

// [2] In-memory store — replace with DB in production
let todos = [];
let nextId = 1;

// GET /todos — list all with optional filter
app.get('/todos', (req, res) => {
  const { completed, search } = req.query; // [3] Query params
  let result = [...todos];

  if (completed !== undefined) {
    result = result.filter(t => t.completed === (completed === 'true'));
  }
  if (search) {
    result = result.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
  }
  res.json({ count: result.length, data: result }); // [4] Consistent shape
});

// GET /todos/:id — get single todo
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id); // [5] params are strings — parse!
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: \`Todo \${id} not found\` }); // [6] 404
  res.json(todo);
});

// POST /todos — create
app.post('/todos', (req, res) => {
  const { title, description } = req.body;
  if (!title?.trim()) {
    return res.status(400).json({ error: 'Title is required' }); // [7] Validate first
  }
  const todo = {
    id: nextId++,
    title: title.trim(),
    description: description?.trim() || '',
    completed: false,
    createdAt: new Date().toISOString()
  };
  todos.push(todo);
  res.status(201).json(todo); // [8] 201 Created — not 200
});

// PUT /todos/:id — full replace
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });

  const { title, description, completed } = req.body;
  if (!title?.trim()) return res.status(400).json({ error: 'Title required' });

  // [9] PUT = full replace — keep id and createdAt
  todos[index] = {
    id,
    title: title.trim(),
    description: description?.trim() || '',
    completed: Boolean(completed),
    createdAt: todos[index].createdAt,
    updatedAt: new Date().toISOString()
  };
  res.json(todos[index]);
});

// PATCH /todos/:id — partial update
app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Not found' });

  const { title, description, completed } = req.body;
  // [10] PATCH = merge — only update provided fields
  if (title !== undefined) todo.title = title.trim();
  if (description !== undefined) todo.description = description;
  if (completed !== undefined) todo.completed = Boolean(completed);
  todo.updatedAt = new Date().toISOString();
  res.json(todo);
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  todos.splice(index, 1);
  res.status(204).send(); // [11] 204 No Content
});

// [12] 404 catch-all — LAST
app.use((req, res) => {
  res.status(404).json({ error: \`Route \${req.method} \${req.path} not found\` });
});

app.listen(3000, () => console.log('Running on port 3000'));
module.exports = app; // [13] Export for testing`,
    note: `REST API essentials:
[1] express.json() — without this middleware, req.body is undefined for POST/PUT requests. Must come before any route that reads req.body.

[2] In-memory store — fine for learning. Production: replace with MongoDB (mongoose), PostgreSQL (sequelize/pg), or any DB. The API contract stays the same.

[3] req.query vs req.params — query string (?completed=true) is optional filtering; route params (:id) are required identifiers in the URL path.

[4] Consistent response shape — always {count, data} not just the array. Makes adding pagination/metadata later non-breaking.

[5] parseInt on params — ALL req.params values are strings. "42" === 42 is false in JavaScript. Always convert to the expected type.

[6] return res.status(404) — the return keyword stops execution. Without return, code after the if block runs and Express throws "Cannot set headers after they are sent."

[7] Validate before processing — check required fields first, return 400 (Bad Request) for client errors. Never assume req.body has valid data.

[8] 201 Created — not 200 OK. RFC 7231 standard: 200 = request succeeded, 201 = resource was created. Return the created resource so client gets the assigned ID.

[9] PUT vs PATCH — PUT replaces the entire resource. If you omit a field in PUT, it's removed/defaulted. PATCH only changes what you provide.

[10] PATCH merge — only update fields that are NOT undefined. This lets clients send {"completed": true} without accidentally wiping out the title.

[11] 204 No Content — successful delete returns no body. res.status(204).send() — NOT res.json({}). A body with 204 is technically invalid per HTTP spec.

[12] Catch-all 404 — any request that doesn't match a defined route hits this. Must be registered AFTER all routes.

[13] Export for testing — export app without calling listen. Test files import app and use supertest. server.js calls app.listen() for production.`
  },
  {
    level: "Beginner",
    tag: "CODE",
    title: "Middleware Pipeline",
    q: `Problem: Build a complete Express middleware pipeline with: request logging, JWT authentication, role-based authorization, and centralized error handling. Show how data flows between middleware via the req object.`,
    code: `const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// ── MIDDLEWARE 1: Request Logger ──────────────────────────────────────────────
// [1] Logs every request with method, path, status, and duration
function logger(req, res, next) {
  const start = Date.now();

  // [2] Listen for 'finish' — fires after response is sent (gives us final status)
  res.on('finish', () => {
    const ms = Date.now() - start;
    const color = res.statusCode >= 500 ? '\x1b[31m'
                : res.statusCode >= 400 ? '\x1b[33m'
                : '\x1b[32m';
    console.log(\`\${color}[\${new Date().toISOString()}] \${req.method} \${req.path} \${res.statusCode} \${ms}ms\x1b[0m\`);
  });

  next(); // [3] Always next() — logger never ends the request
}

// ── MIDDLEWARE 2: JWT Authentication ─────────────────────────────────────────
// [4] Verifies JWT and attaches payload to req.user
function authenticate(req, res, next) {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    return next(new AppError('Authentication required', 401));
  }

  try {
    const token = header.split(' ')[1];
    req.user = jwt.verify(token, JWT_SECRET); // [5] Attach to req — shared with all downstream
    next();
  } catch (err) {
    const message = err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
    next(new AppError(message, 401));
  }
}

// ── MIDDLEWARE 3: Role Authorization ─────────────────────────────────────────
// [6] Factory middleware — authorize('admin') returns a configured middleware
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) return next(new AppError('Login required', 401));
    if (!roles.includes(req.user.role)) {
      return next(new AppError(\`Access denied. Required role: \${roles.join(' or ')}\`, 403));
    }
    next(); // [7] Authorized — proceed to route handler
  };
}

// ── CUSTOM ERROR CLASS ────────────────────────────────────────────────────────
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // [8] Known error — safe to expose to client
  }
}

// ── GLOBAL ERROR HANDLER ──────────────────────────────────────────────────────
// [9] Express identifies error handlers by the 4-parameter signature
function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const isDev  = process.env.NODE_ENV === 'development';

  res.status(status).json({
    error: err.isOperational ? err.message : 'Internal server error', // [10] Hide bugs
    ...(isDev && { stack: err.stack }) // Show stack in dev only
  });
}

// ── REGISTER GLOBAL MIDDLEWARE ────────────────────────────────────────────────
app.use(logger); // Runs for every request

// ── ROUTES ────────────────────────────────────────────────────────────────────
// Public — no auth:
app.post('/auth/login', (req, res) => {
  const { email, role = 'user' } = req.body;
  const token = jwt.sign({ id: 1, email, role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Protected — any authenticated user:
app.get('/profile', authenticate, (req, res) => {
  res.json({ user: req.user }); // req.user was set by authenticate middleware
});

// Protected — admin only:
app.get('/admin/dashboard', authenticate, authorize('admin'), (req, res) => {
  res.json({ message: 'Admin dashboard', user: req.user });
});

// Protected — admin or moderator:
app.delete('/posts/:id', authenticate, authorize('admin', 'moderator'), (req, res) => {
  res.status(204).send();
});

// 404 for unknown routes — before error handler, after routes:
app.use((req, res, next) => {
  next(new AppError(\`\${req.method} \${req.path} not found\`, 404));
});

// [11] Error handler — ALWAYS last
app.use(errorHandler);

app.listen(3000);`,
    note: `Middleware pipeline explained:
[1] Logger first — logging middleware should be the very first middleware so it captures every request, including those that fail authentication. If auth middleware is first and rejects the request, we'd lose the log.

[2] res.on('finish') hook — the clever way to log response status. We can't log it synchronously at request start because the response hasn't happened yet. 'finish' fires after res.end() is called, giving us the final status code and total duration.

[3] next() in logger — logger is transparent middleware. It never ends the request, so it must always call next(). Forgetting next() here would silently hang every request.

[4] authenticate middleware — pure security middleware. It either attaches req.user and calls next(), or calls next(error). It has no knowledge of what route comes after it.

[5] req.user = decoded — Express request object is mutable. Middleware communicates with downstream handlers by mutating req. This is the Express convention: auth sets req.user, file upload sets req.file, etc.

[6] authorize factory pattern — authorize('admin') is a factory that returns a middleware function. The closure captures the roles array. This lets you write authorize('admin', 'moderator') inline in route definitions — clean and readable.

[7] next() in authorize — authorization only ends the request on failure (403). On success, it calls next() to pass control to the actual route handler.

[8] isOperational flag — separates "expected" errors (auth failure = operational) from bugs (null reference = programming error). Operational errors: expose the message. Programming errors: say "Internal server error."

[9] 4-parameter error handler — Express detects error handlers by function arity (parameter count). (err, req, res, next) = error handler. (req, res, next) = regular middleware. The signature must have exactly 4 params, even if you don't use next.

[10] Hiding error details — exposing stack traces or DB errors to clients is a security risk. In production, show "Internal server error" for 500s. In development, show the full stack for debugging.

[11] Error handler last — errors flow to the error handler via next(err). The handler must be defined AFTER all routes so it can catch errors from any of them.`
  },
  {
    level: "Intermediate",
    tag: "CODE",
    title: "JWT Auth System",
    q: `Problem: Build a complete JWT authentication system with access tokens (15min), refresh tokens (7 days), token rotation, HttpOnly cookie storage, and protected routes. Include register, login, refresh, logout, and profile endpoints.`,
    code: `const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser()); // [1] Needed to read req.cookies

const ACCESS_SECRET  = process.env.ACCESS_SECRET  || 'access-secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh-secret';

// [2] In-memory stores — use PostgreSQL + Redis in production
const users = new Map();
const validRefreshTokens = new Set(); // server-side token whitelist
let uid = 1;

// Token generators:
const signAccess  = (payload) => jwt.sign(payload, ACCESS_SECRET,  { expiresIn: '15m' });
const signRefresh = (payload) => jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });

// ── REGISTER ──────────────────────────────────────────────────────────────────
app.post('/auth/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields required' });
    }
    if ([...users.values()].some(u => u.email === email)) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hash = await bcrypt.hash(password, 12); // [3] 12 salt rounds
    const user = { id: uid++, name, email, password: hash, role: 'user' };
    users.set(user.id, user);

    const { password: _, ...safe } = user; // [4] Never return password
    res.status(201).json({ message: 'Registered', user: safe });
  } catch (err) { next(err); }
});

// ── LOGIN ─────────────────────────────────────────────────────────────────────
app.post('/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = [...users.values()].find(u => u.email === email);

    // [5] Same error for wrong email AND wrong password — prevents user enumeration
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken  = signAccess(payload);
    const refreshToken = signRefresh({ id: user.id });

    validRefreshTokens.add(refreshToken); // [6] Track server-side

    // [7] Refresh token in HttpOnly cookie — invisible to JavaScript (XSS safe)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7d in ms
    });

    res.json({ accessToken, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) { next(err); }
});

// ── REFRESH TOKEN ─────────────────────────────────────────────────────────────
app.post('/auth/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken || !validRefreshTokens.has(refreshToken)) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    const user = users.get(decoded.id);
    if (!user) return res.status(401).json({ error: 'User not found' });

    // [8] Token rotation: delete old, issue new pair — prevents reuse
    validRefreshTokens.delete(refreshToken);
    const newAccess  = signAccess({ id: user.id, email: user.email, role: user.role });
    const newRefresh = signRefresh({ id: user.id });
    validRefreshTokens.add(newRefresh);

    res.cookie('refreshToken', newRefresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken: newAccess });
  } catch (err) {
    validRefreshTokens.delete(refreshToken);
    res.status(401).json({ error: 'Expired or invalid refresh token' });
  }
});

// ── LOGOUT ────────────────────────────────────────────────────────────────────
app.post('/auth/logout', (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) validRefreshTokens.delete(token); // [9] Revoke server-side
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
});

// ── AUTHENTICATION MIDDLEWARE ─────────────────────────────────────────────────
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token required' });
  try {
    req.user = jwt.verify(token, ACCESS_SECRET);
    next();
  } catch (err) {
    res.status(401).json({
      error: err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token'
    });
  }
}

// ── PROTECTED ROUTES ──────────────────────────────────────────────────────────
app.get('/profile', authenticate, (req, res) => {
  const { password: _, ...safe } = users.get(req.user.id);
  res.json(safe);
});

app.use((err, req, res, next) => res.status(500).json({ error: err.message }));
app.listen(3000);`,
    note: `JWT auth design decisions:
[1] cookieParser() — required to read req.cookies. Without it, req.cookies is undefined even when the browser sends cookies.

[2] Server-side token tracking — using a Set to track valid refresh tokens enables instant revocation. Purely stateless JWT (no server storage) can't be revoked before expiry. The Set is the trade-off: slight statefulness for revocability.

[3] bcrypt with 12 salt rounds — bcrypt is deliberately slow (12 rounds ≈ 300ms per hash). This makes brute force attacks impractical. Higher rounds = more secure but slower server response.

[4] Never return password — even hashed passwords shouldn't be in API responses. Use destructuring: const { password: _, ...safe } = user. The underscore signals "intentionally ignoring this."

[5] Generic "Invalid credentials" — don't say "email not found" or "wrong password" separately. Attackers use specific messages to enumerate valid emails. Generic message prevents this.

[6] Server-side refresh token storage — the Set is the "whitelist" of valid tokens. Adding to it on login, checking it on refresh, deleting on logout — this is the revocation mechanism. Without it, logout is only cosmetic.

[7] HttpOnly cookie for refresh token — JavaScript (including malicious XSS scripts) cannot read HttpOnly cookies. Your React app never touches the refresh token directly — it just exists in the cookie jar and is sent automatically by the browser on /auth/refresh requests.

[8] Token rotation — every refresh call: (a) verifies old refresh token, (b) deletes it from the whitelist, (c) issues a new access + refresh pair. If an attacker steals a refresh token and uses it, the legitimate user's next refresh attempt will find the token is already gone — alerting the system to potential compromise.

[9] Proper logout — calls validRefreshTokens.delete() to invalidate server-side. Without this, "logout" only deletes the cookie from the browser. Anyone who captured the refresh token (e.g., from network logs) could still use it until expiry.`
  },
  {
    level: "Intermediate",
    tag: "CODE",
    title: "Pagination, Filtering & Sorting API",
    q: `Problem: Build an Express API supporting offset pagination, dynamic filtering by multiple fields (category, price range, search), multi-field sorting, and field selection (sparse fieldsets). Return proper metadata and navigation links.`,
    code: `const express = require('express');
const app = express();
app.use(express.json());

// [1] Sample dataset — 100 products
const products = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: \`Product \${String.fromCharCode(65 + (i % 26))}\${Math.floor(i / 26) + 1}\`,
  category: ['electronics', 'clothing', 'books', 'food'][i % 4],
  price: parseFloat((Math.random() * 500 + 10).toFixed(2)),
  inStock: i % 3 !== 0,
  rating: parseFloat((Math.random() * 4 + 1).toFixed(1)),
  createdAt: new Date(Date.now() - i * 86400000).toISOString()
}));

// ── QUERY PARAM PARSER ────────────────────────────────────────────────────────
function parseQuery(query) {
  const page     = Math.max(1, parseInt(query.page) || 1);
  const limit    = Math.min(100, Math.max(1, parseInt(query.limit) || 10)); // [2] Cap at 100

  // [3] Whitelist sort fields — never sort by arbitrary fields
  const SORTABLE = new Set(['id', 'name', 'price', 'rating', 'createdAt']);
  const sortBy   = SORTABLE.has(query.sortBy) ? query.sortBy : 'id';
  const sortOrder = query.sortOrder === 'desc' ? -1 : 1;

  // [4] Parse filter params with type coercion
  const filters = {
    category:  query.category || null,
    minPrice:  query.minPrice  ? parseFloat(query.minPrice)  : null,
    maxPrice:  query.maxPrice  ? parseFloat(query.maxPrice)  : null,
    inStock:   query.inStock === 'true' ? true : query.inStock === 'false' ? false : null,
    minRating: query.minRating ? parseFloat(query.minRating) : null,
    search:    query.search ? query.search.toLowerCase() : null,
  };

  // [5] Field selection — ?fields=id,name,price
  const fields = query.fields
    ? new Set(query.fields.split(',').map(f => f.trim()))
    : null;

  return { page, limit, sortBy, sortOrder, filters, fields };
}

// ── FILTER ────────────────────────────────────────────────────────────────────
function applyFilters(data, filters) {
  return data.filter(item => {
    if (filters.category  && item.category !== filters.category) return false;
    if (filters.minPrice  !== null && item.price  < filters.minPrice)  return false;
    if (filters.maxPrice  !== null && item.price  > filters.maxPrice)  return false;
    if (filters.inStock   !== null && item.inStock !== filters.inStock) return false;
    if (filters.minRating !== null && item.rating < filters.minRating)  return false;
    if (filters.search && !item.name.toLowerCase().includes(filters.search)) return false;
    return true;
  });
}

// ── SORT ──────────────────────────────────────────────────────────────────────
function applySort(data, sortBy, order) {
  return [...data].sort((a, b) => { // [6] Spread to avoid mutating source
    const va = a[sortBy], vb = b[sortBy];
    const cmp = typeof va === 'string' ? va.localeCompare(vb) : va - vb;
    return cmp * order; // order = 1 (asc) or -1 (desc)
  });
}

// ── FIELD SELECTION ───────────────────────────────────────────────────────────
function selectFields(items, fields) {
  if (!fields) return items;
  return items.map(item =>
    [...fields].reduce((obj, f) => {
      if (f in item) obj[f] = item[f];
      return obj;
    }, {})
  );
}

// ── MAIN ENDPOINT ─────────────────────────────────────────────────────────────
app.get('/api/products', (req, res) => {
  const { page, limit, sortBy, sortOrder, filters, fields } = parseQuery(req.query);

  // Pipeline: Filter → Sort → Paginate → Select
  let data = applyFilters(products, filters);
  data = applySort(data, sortBy, sortOrder);

  const total      = data.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const safePage   = Math.min(page, totalPages); // [7] Clamp page to valid range
  const skip       = (safePage - 1) * limit;
  const paginated  = selectFields(data.slice(skip, skip + limit), fields);

  // [8] Build HATEOAS navigation links
  const base = (p) => {
    const params = new URLSearchParams({
      page: p, limit, sortBy,
      sortOrder: sortOrder === -1 ? 'desc' : 'asc',
      ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== null))
    });
    return \`\${req.baseUrl || ''}/api/products?\${params}\`;
  };

  res.json({
    data: paginated,
    meta: {
      total, page: safePage, limit, totalPages,
      hasNext: safePage < totalPages,
      hasPrev: safePage > 1,
    },
    links: {
      self:  base(safePage),
      first: base(1),
      last:  base(totalPages),
      next:  safePage < totalPages ? base(safePage + 1) : null,
      prev:  safePage > 1         ? base(safePage - 1) : null,
    },
    // [9] Echo applied filters so client can display active filter state
    activeFilters: Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== null)
    )
  });
});

// Test URLs:
// GET /api/products?page=2&limit=5
// GET /api/products?category=electronics&minPrice=50&maxPrice=300
// GET /api/products?sortBy=price&sortOrder=desc
// GET /api/products?search=product&fields=id,name,price
// GET /api/products?inStock=true&minRating=3.5&sortBy=rating&sortOrder=desc

app.listen(3000);`,
    note: `Pagination and filtering patterns:
[1] In-memory data — the same pattern applies to databases. With MongoDB: Product.find(filters).sort(sort).skip(skip).limit(limit). With SQL: WHERE ... ORDER BY ... OFFSET skip LIMIT limit. The logic maps directly.

[2] Cap limit at 100 — without a cap, GET /api/products?limit=99999 fetches all records from DB in one query. Always cap and enforce sensible defaults.

[3] Sort field whitelist — never use req.query.sortBy directly as a DB column/field name. Attackers could sort by 'password', 'secretKey', or cause a full table scan with an unindexed column. A whitelist ensures only safe, indexed fields are sortable.

[4] Filter type coercion — query params are always strings. "true" !== true. parseFloat("50") = 50. Always coerce to the expected type before comparing.

[5] Fields as Set — using a Set for O(1) lookup when checking if a field should be included. ?fields=id,name,price returns only those three properties — useful for reducing payload size on mobile.

[6] Spread before sort — [...data].sort() creates a shallow copy before sorting. Array.sort() mutates in-place. Without spread, we'd modify the source array, corrupting future requests in the same server process.

[7] Clamp page — if page > totalPages (e.g., page=5 but only 3 pages of results), return the last valid page instead of empty results.

[8] HATEOAS links — Hypermedia As The Engine Of Application State. Return pre-built URLs for navigation. Clients follow links instead of building URLs. Standard in mature REST APIs. Enables API discoverability.

[9] Echo active filters — return which filters were applied. Useful for client-side UI: "Showing 23 electronics (price: $50-$300, in stock: yes)". The client doesn't have to track filter state separately.

Production enhancements:
- Database: indexes on category, price, rating for performance
- Cursor pagination: more efficient for large datasets (no OFFSET scan)
- Cache: cache popular filter combinations in Redis
- Search: use full-text search index (MongoDB $text, PostgreSQL tsvector, Elasticsearch)`
  }
  ],
  "Microservices": []
};

const TABS = ["JavaScript", "React", "Node.js", "Express.js", "Microservices"];
const LEVELS_REACT   = ["Beginner", "Hooks & Core Concepts", "Intermediate", "Advanced & Scenario", "Coding Challenges"];
const LEVELS_NODE    = ["Beginner", "Intermediate", "Advanced & Scenario", "Coding Challenges"];
const LEVELS_JS      = ["Beginner", "Intermediate", "Advanced & Scenario", "Coding Challenges"];
const LEVELS_EXPRESS = ["Beginner", "Intermediate", "Advanced & Scenario", "Coding Challenges"];
const LEVELS_MICRO   = ["Beginner", "Intermediate"];

const TAG_STYLES = {
  SCENARIO: { bg: "rgba(16,185,129,0.15)", color: "#34d399", label: "SCENARIO" },
  HARD:     { bg: "rgba(239,68,68,0.15)",  color: "#f87171", label: "HARD"     },
  CODE:     { bg: "rgba(99,102,241,0.18)", color: "#818cf8", label: "CODE"     },
};

const LEVEL_COLORS = {
  "Beginner":             { active: "#22d3ee", bg: "rgba(34,211,238,0.08)"  },
  "Hooks & Core Concepts":{ active: "#fb923c", bg: "rgba(251,146,60,0.08)"  },
  "Intermediate":         { active: "#a78bfa", bg: "rgba(167,139,250,0.08)" },
  "Advanced & Scenario":  { active: "#f87171", bg: "rgba(248,113,113,0.08)" },
  "Coding Challenges":    { active: "#818cf8", bg: "rgba(99,102,241,0.08)"  },
};

function InterviewPrep() {
  const [topic, setTopic]     = useState("JavaScript");
  const [level, setLevel]     = useState("Beginner");
  const [openIdx, setOpenIdx] = useState(null);
  const [revealed, setRevealed]   = useState({});
  const [showNote, setShowNote]   = useState({});
  const [search, setSearch]   = useState("");

  const levels = topic === "React" ? LEVELS_REACT : topic === "Node.js" ? LEVELS_NODE : topic === "Express.js" ? LEVELS_EXPRESS : topic === "Microservices" ? LEVELS_MICRO : LEVELS_JS;
  const isCoding = level === "Coding Challenges";

  const safeLevel = (isCoding ? true : data[topic]?.[level]) ? level : levels[0];
  const lc = LEVEL_COLORS[safeLevel] || LEVEL_COLORS["Beginner"];

  // For coding challenges use the challenges data
  const allQuestions = isCoding
    ? (challenges[topic] || [])
    : (data[topic]?.[safeLevel] || []);

  const questions = search.trim()
    ? allQuestions.filter(q =>
        q.q.toLowerCase().includes(search.toLowerCase()) ||
        (q.title && q.title.toLowerCase().includes(search.toLowerCase())) ||
        (q.a && q.a.toLowerCase().includes(search.toLowerCase()))
      )
    : allQuestions;

  const toggle      = (idx) => setOpenIdx(openIdx === idx ? null : idx);
  const rkey        = (idx) => `${topic}-${safeLevel}-${idx}`;
  const revealAnswer= (idx) => setRevealed(p => ({ ...p, [rkey(idx)]: true }));
  const toggleNote  = (idx) => setShowNote(p => ({ ...p, [rkey(idx)]: !p[rkey(idx)] }));

  const totalAll = isCoding
    ? (challenges[topic] || []).length
    : Object.values(data[topic] || {}).reduce((s, arr) => s + (Array.isArray(arr) ? arr.length : 0), 0);

  const switchTopic = (t) => {
    setTopic(t);
    setOpenIdx(null);
    setSearch("");
    setLevel("Beginner");
  };

  const switchLevel = (l) => {
    setLevel(l);
    setOpenIdx(null);
    setSearch("");
  };

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", minHeight: "100vh", background: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)", padding: "28px 16px", color: "#e8e8f0" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-block", background: "linear-gradient(90deg,#a78bfa,#60a5fa,#f87171)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: 30, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 4 }}>
            Interview Prep
          </div>
          <div style={{ color: "#6b7280", fontSize: 13 }}>React · Node.js · JavaScript · Express.js · Microservices · Q&amp;A + Coding Challenges</div>
          <div style={{ marginTop: 6, color: "#4b5563", fontSize: 12 }}>
            {isCoding ? `${topic} Coding Challenges: ` : `${topic}: `}
            <span style={{ color: lc.active }}>{totalAll} {isCoding ? "challenges" : "questions"}</span>
          </div>
        </div>

        {/* Topic Tabs */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 14 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => switchTopic(t)} style={{ padding: "8px 32px", borderRadius: 50, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, transition: "all 0.2s", background: topic === t ? "linear-gradient(90deg,#7c3aed,#2563eb)" : "rgba(255,255,255,0.06)", color: topic === t ? "#fff" : "#6b7280", boxShadow: topic === t ? "0 0 18px rgba(124,58,237,0.35)" : "none" }}>{t}</button>
          ))}
        </div>

        {/* Level Tabs */}
        <div style={{ display: "flex", gap: 7, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
          {levels.map(l => {
            const c = LEVEL_COLORS[l];
            const active = safeLevel === l;
            const count = l === "Coding Challenges" ? challenges[topic].length : (data[topic][l] ? data[topic][l].length : 0);
            return (
              <button key={l} onClick={() => switchLevel(l)} style={{ padding: "6px 16px", borderRadius: 50, border: `1.5px solid ${active ? c.active : "rgba(255,255,255,0.1)"}`, cursor: "pointer", fontWeight: 600, fontSize: 12, transition: "all 0.2s", background: active ? c.bg : "transparent", color: active ? c.active : "#6b7280", whiteSpace: "nowrap" }}>
                {l} <span style={{ opacity: 0.6 }}>({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div style={{ marginBottom: 18 }}>
          <input value={search} onChange={e => { setSearch(e.target.value); setOpenIdx(null); }} placeholder="🔍  Search questions, titles, or answers..." style={{ width: "100%", padding: "10px 16px", borderRadius: 10, border: "1.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
          <span style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: "3px 14px", fontSize: 12, color: "#6b7280" }}>
            {questions.length} {search ? "results" : isCoding ? "challenges" : "questions"}
          </span>
          {isCoding && <span style={{ background: "rgba(99,102,241,0.15)", borderRadius: 20, padding: "3px 14px", fontSize: 11, color: "#818cf8", fontWeight: 600 }}>Coding Challenges · With line-by-line notes</span>}
          {safeLevel === "Advanced & Scenario" && <span style={{ background: "rgba(248,113,113,0.1)", borderRadius: 20, padding: "3px 14px", fontSize: 11, color: "#f87171", fontWeight: 600 }}>3–4 yrs exp level</span>}
        </div>

        {/* ── CODING CHALLENGES VIEW ── */}
        {isCoding ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {questions.length === 0 && <div style={{ textAlign: "center", color: "#4b5563", padding: 40 }}>No challenges match your search.</div>}
            {questions.map((item, idx) => {
              const isOpen   = openIdx === idx;
              const noteOpen = showNote[rkey(idx)];
              return (
                <div key={idx} style={{ background: "rgba(255,255,255,0.035)", borderRadius: 14, border: isOpen ? `1.5px solid ${lc.active}55` : "1.5px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
                  {/* Header row */}
                  <button onClick={() => toggle(idx)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "16px 20px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, textAlign: "left" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flex: 1 }}>
                      <span style={{ minWidth: 26, height: 26, background: `linear-gradient(135deg,${lc.active}99,${lc.active}44)`, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: lc.active, marginTop: 2, flexShrink: 0 }}>{idx + 1}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                          <span style={{ background: "rgba(99,102,241,0.18)", color: "#818cf8", borderRadius: 4, padding: "2px 8px", fontSize: 10, fontWeight: 700 }}>CODE</span>
                          <span style={{ background: item.level === "Beginner" ? "rgba(34,211,238,0.15)" : "rgba(167,139,250,0.15)", color: item.level === "Beginner" ? "#22d3ee" : "#a78bfa", borderRadius: 4, padding: "2px 8px", fontSize: 10, fontWeight: 600 }}>{item.level}</span>
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", marginBottom: 4 }}>{item.title}</div>
                        <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5 }}>{item.q}</div>
                      </div>
                    </div>
                    <span style={{ color: lc.active, fontSize: 18, transform: isOpen ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0, marginTop: 4 }}>+</span>
                  </button>

                  {/* Code + Notes panel */}
                  {isOpen && (
                    <div style={{ padding: "0 20px 20px 20px" }}>
                      {/* Code block */}
                      <div style={{ background: "#0d1117", borderRadius: 10, padding: "16px", marginBottom: 12, overflowX: "auto", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                          <span style={{ color: "#6b7280", fontSize: 11, fontFamily: "monospace" }}>Solution</span>
                          <span style={{ color: "#22d3ee", fontSize: 11, fontWeight: 600 }}>{topic === "React" ? "JSX" : topic === "Express.js" ? "Express.js" : "Node.js"}</span>
                        </div>
                        <pre style={{ margin: 0, color: "#e2e8f0", fontSize: 12.5, lineHeight: 1.7, fontFamily: "'Fira Code', 'Consolas', monospace", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                          {item.code}
                        </pre>
                      </div>

                      {/* Notes toggle */}
                      <button onClick={() => toggleNote(idx)} style={{ background: noteOpen ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 8, padding: "8px 18px", cursor: "pointer", fontWeight: 600, fontSize: 13, marginBottom: noteOpen ? 12 : 0, display: "flex", alignItems: "center", gap: 6 }}>
                        {noteOpen ? "▼" : "▶"} {noteOpen ? "Hide" : "Show"} Line-by-Line Notes
                      </button>

                      {noteOpen && (
                        <div style={{ background: "rgba(99,102,241,0.06)", borderLeft: "3px solid #818cf8", borderRadius: "0 10px 10px 0", padding: "14px 16px", fontSize: 13, lineHeight: 1.85, color: "#cbd5e1", whiteSpace: "pre-line" }}>
                          {item.note}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
        /* ── REGULAR Q&A VIEW ── */
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {questions.length === 0 && <div style={{ textAlign: "center", color: "#4b5563", padding: 40 }}>No questions match your search.</div>}
          {questions.map((item, idx) => {
            const isOpen     = openIdx === idx;
            const globalIdx  = allQuestions.indexOf(item);
            const isRevealed = revealed[rkey(globalIdx >= 0 ? globalIdx : idx)];
            const tagStyle   = item.tag ? TAG_STYLES[item.tag] : null;
            return (
              <div key={idx} style={{ background: "rgba(255,255,255,0.035)", borderRadius: 13, border: isOpen ? `1.5px solid ${lc.active}55` : "1.5px solid rgba(255,255,255,0.07)", overflow: "hidden", transition: "border 0.2s" }}>
                <button onClick={() => toggle(idx)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "15px 18px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, textAlign: "left" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 11, flex: 1 }}>
                    <span style={{ minWidth: 24, height: 24, background: `linear-gradient(135deg,${lc.active}99,${lc.active}44)`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: lc.active, marginTop: 2, flexShrink: 0 }}>{globalIdx >= 0 ? globalIdx + 1 : idx + 1}</span>
                    <div style={{ flex: 1 }}>
                      {tagStyle && <span style={{ display: "inline-block", background: tagStyle.bg, color: tagStyle.color, borderRadius: 4, padding: "2px 7px", fontSize: 9.5, fontWeight: 700, letterSpacing: "0.5px", marginBottom: 5 }}>{tagStyle.label}</span>}
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", lineHeight: 1.5 }}>{item.q}</div>
                    </div>
                  </div>
                  <span style={{ color: lc.active, fontSize: 18, transform: isOpen ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0, marginTop: 3 }}>+</span>
                </button>
                {isOpen && (
                  <div style={{ padding: "0 18px 18px 53px" }}>
                    {!isRevealed ? (
                      <button onClick={() => revealAnswer(globalIdx >= 0 ? globalIdx : idx)} style={{ background: `linear-gradient(90deg,${lc.active}cc,${lc.active}77)`, color: "#fff", border: "none", borderRadius: 7, padding: "7px 18px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Reveal Answer</button>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {item.theory && (
                          <div style={{ background: "rgba(251,146,60,0.07)", borderLeft: "3px solid #fb923c", borderRadius: "0 9px 9px 0", padding: "11px 14px" }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#fb923c", letterSpacing: "0.8px", marginBottom: 6, textTransform: "uppercase" }}>📖 Theory</div>
                            <div style={{ fontSize: 13, lineHeight: 1.8, color: "#e2c9a0", whiteSpace: "pre-line" }}>{item.theory}</div>
                          </div>
                        )}
                        <div style={{ background: `${lc.active}0d`, borderLeft: `3px solid ${lc.active}88`, borderRadius: "0 9px 9px 0", padding: "13px 15px", fontSize: 13.5, lineHeight: 1.85, color: "#cbd5e1", whiteSpace: "pre-line" }}>{item.a}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        )}

        <div style={{ textAlign: "center", marginTop: 32, color: "#374151", fontSize: 11 }}>
          {isCoding ? "Click to expand · Toggle notes to see line-by-line explanations" : "Click to expand · Reveal answer when ready · Search works across questions and answers"}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <InterviewPrep />
    </ErrorBoundary>
  );
}