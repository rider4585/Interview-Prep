const nodeData = {
    Beginner: [{
            q: "What is Node.js?",
            a: "Node.js is a runtime environment that allows JavaScript to run on the server side. It is built on Chrome's V8 JavaScript engine and uses a non-blocking, event-driven architecture, making it highly efficient for handling concurrent requests and building scalable network applications.",
            whyUse: "Node.js is commonly used for building REST APIs, real-time applications, microservices, chat applications, streaming platforms, and backend services that handle many concurrent connections efficiently.",
            example: "A chat application can use Node.js to handle thousands of simultaneous WebSocket connections without creating a separate thread for each user.",
        },
        {
            q: "What is the event loop in Node.js?",
            a: "The event loop is the core mechanism that enables Node.js to perform non-blocking operations using a single thread. When asynchronous operations such as file access, database queries, or API requests are initiated, Node.js delegates them to the operating system. Once completed, their callbacks are placed in a queue and executed by the event loop.",
            whyUse: "The event loop allows Node.js to efficiently handle thousands of concurrent I/O operations without requiring multiple application threads, making it ideal for scalable backend systems.",
            example: `
setTimeout(() => {
  console.log("Executed");
}, 1000);

console.log("Start");
`,
        },
        {
            q: "What is the difference between require() and import?",
            a: "require() belongs to the CommonJS module system and loads modules synchronously. import belongs to the ES Module system and supports static analysis, asynchronous loading, and tree-shaking. CommonJS has traditionally been the default in Node.js, while ES Modules are now the modern JavaScript standard.",
            whyUse: "ES Modules improve maintainability and bundle optimization through tree-shaking, while CommonJS is still widely used in older Node.js applications and legacy codebases.",
            example: `
const express = require("express");

import express from "express";
`,
        },
        {
            q: "What is npm and what is package.json?",
            a: "npm is the default package manager for Node.js and is used to install, update, and manage project dependencies. package.json is the project's configuration file that contains metadata, scripts, dependencies, version information, and project settings. package-lock.json stores exact dependency versions to ensure consistent installations across environments.",
            whyUse: "npm simplifies dependency management, while package.json acts as the central configuration file for project setup, build scripts, and package versioning.",
            example: `
{
  "name": "my-app",
  "scripts": {
    "start": "node server.js"
  }
}
`,
        },
        {
            q: "What is Express.js?",
            a: "Express.js is a lightweight and flexible web framework built on top of Node.js. It simplifies server-side development by providing routing, middleware support, request handling, response utilities, and API development capabilities. It is one of the most widely used frameworks for building RESTful services in Node.js.",
            whyUse: "Express.js reduces the amount of boilerplate code required to build web servers and APIs. It is commonly used for backend services, microservices, authentication systems, and full-stack applications.",
            example: `
app.get("/users", (req, res) => {
  res.send("Users List");
});
`,
        },
        {
            q: "What are callbacks in Node.js?",
            a: "A callback is a function passed as an argument to another function and executed after an operation completes. Callbacks were the original approach for handling asynchronous operations in Node.js. Node follows the error-first callback pattern, where the first argument represents an error and the second contains the result. While callbacks are still common in some APIs, Promises and async/await are preferred today because they improve readability and maintainability.",
            whyUse: "Callbacks allow Node.js to perform asynchronous operations such as file access, database queries, and network requests without blocking the event loop.",
            example: `
fs.readFile("data.txt", (err, data) => {
  if (err) return;
  console.log(data);
});
`,
        },
        {
            q: "What is the difference between synchronous and asynchronous code?",
            a: "Synchronous code executes one statement at a time and waits for each operation to complete before moving forward. Asynchronous code allows other work to continue while waiting for long-running operations such as file reads, database queries, or API calls. Node.js relies heavily on asynchronous programming to keep applications responsive and scalable.",
            whyUse: "Asynchronous operations prevent the event loop from being blocked, allowing a Node.js application to handle many concurrent requests efficiently.",
            example: `
console.log("Start");

setTimeout(() => {
  console.log("Async Task");
}, 1000);

console.log("End");
`,
        },
        {
            q: "What are Node.js streams?",
            a: "Streams are objects that allow data to be processed piece by piece instead of loading everything into memory at once. Node.js provides Readable, Writable, Duplex, and Transform streams. Streams are highly efficient for handling large files, media content, and network communication because memory usage remains low regardless of data size.",
            whyUse: "Streams are commonly used for file processing, video streaming, log processing, file uploads, and real-time data transfer where loading all data into memory would be inefficient.",
            example: `
const stream =
  fs.createReadStream("large-file.txt");

stream.on("data", chunk => {
  console.log(chunk);
});
`,
        },
        {
            q: "What is the difference between fs.readFile and fs.createReadStream?",
            a: "fs.readFile reads the entire file into memory before making the data available, which is suitable for small files. fs.createReadStream reads the file in smaller chunks and processes data as it becomes available. For large files, streams are more memory efficient and scalable.",
            whyUse: "Use fs.readFile for small files and quick operations. Use fs.createReadStream for large files, media processing, file downloads, and situations where memory consumption must remain low.",
            example: `
fs.readFile("small.txt");

fs.createReadStream(
  "large-video.mp4"
);
`,
        },
        {
            q: "What is the global object in Node.js?",
            a: "The global object in Node.js is called global. It provides access to built-in functionality such as process, Buffer, setTimeout, setInterval, console, and other globally available APIs. Unlike browsers, Node.js does not have a window object. Each module has its own scope, so variables declared in a file are not automatically added to the global object.",
            whyUse: "The global object provides access to runtime information, timers, environment variables, and utility APIs that are needed throughout a Node.js application.",
            example: `
console.log(process.version);

setTimeout(() => {
  console.log("Hello");
}, 1000);
`,
        },
        {
            q: "What is the Buffer class in Node.js?",
            a: "Buffer is a built-in Node.js class used for handling raw binary data. It is commonly used when working with files, network protocols, streams, encryption, and binary formats. Buffers allocate memory outside the V8 JavaScript heap and provide methods for reading, writing, and converting binary data.",
            whyUse: "Buffers are essential when processing images, videos, file uploads, network packets, cryptographic data, and any information that is not plain text.",
            example: `
const buffer =
  Buffer.from("Hello");

console.log(
  buffer.toString()
);
`,
        },
        {
            q: "What is the difference between dependencies and devDependencies in package.json?",
            a: "Dependencies are packages required for the application to run in production, such as Express, Axios, or Mongoose. DevDependencies are packages used only during development, such as Jest, ESLint, Nodemon, or TypeScript. Production deployments typically install only dependencies, while development environments install both.",
            whyUse: "Separating runtime and development packages keeps production deployments smaller, more secure, and easier to maintain.",
            example: `
{
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
`,
        },
        {
            q: "What is Nodemon and why do developers use it?",
            a: "Nodemon is a development tool that automatically restarts a Node.js application whenever source files change. This removes the need to manually stop and restart the server after every code modification, improving developer productivity and speeding up development workflows.",
            whyUse: "Nodemon is commonly used during local development to provide instant feedback and reduce repetitive manual server restarts.",
            example: `
{
  "scripts": {
    "dev": "nodemon src/index.js"
  }
}
`,
        },
        {
            q: "How do you create a basic HTTP server in Node.js without Express?",
            a: "Node.js provides a built-in HTTP module that can create web servers without requiring external frameworks. A server listens for incoming requests, processes them, and sends responses back to clients. Express internally builds on top of this HTTP module and adds routing, middleware, and convenience features.",
            whyUse: "Understanding the native HTTP module helps developers understand how Express works internally and provides greater control when building lightweight services.",
            example: `
const http = require("http");

const server =
  http.createServer();

server.listen(3000);
`,
        },
        {
            q: "What is process.env and why is it important?",
            a: "process.env is an object that contains environment variables available to the Node.js process. It is commonly used to store configuration values such as database connection strings, API keys, application secrets, and environment-specific settings. Using environment variables prevents sensitive information from being hardcoded into source code.",
            whyUse: "Environment variables support secure configuration management and make it easy to use different settings across development, staging, and production environments.",
            example: `
const port =
  process.env.PORT || 3000;

const dbUrl =
  process.env.DB_URL;
`,
        },
        {
            q: "What is CORS and how do you enable it in Express?",
            a: "CORS, or Cross-Origin Resource Sharing, is a browser security mechanism that controls whether a web application can make requests to a different origin. Browsers block cross-origin requests unless the server explicitly allows them through CORS headers. In Express, the cors middleware is commonly used to configure and manage these permissions.",
            whyUse: "CORS is essential when frontend and backend applications are hosted on different domains, ports, or environments. Proper configuration ensures secure communication between systems.",
            example: `
const cors =
  require("cors");

app.use(cors());
`,
        },
    ],
    Intermediate: [{
            q: "What is middleware in Express.js?",
            a: "Middleware functions execute during the request-response lifecycle and have access to the request object, response object, and next function. Middleware can modify requests, validate data, perform authentication, log activity, handle errors, or terminate the request. If a middleware calls next(), control passes to the next middleware in the chain. The order of middleware registration is important because Express executes middleware sequentially.",
            whyUse: "Middleware promotes code reuse and separation of concerns. Common use cases include authentication, authorization, request logging, request validation, body parsing, rate limiting, and error handling.",
            example: `
app.use((req, res, next) => {
  console.log(req.method);
  next();
});
`,
        },
        {
            q: "What is the difference between process.nextTick() and setImmediate()?",
            a: "Both functions schedule asynchronous execution, but they run at different times in the event loop. process.nextTick executes immediately after the current operation completes and before the event loop continues to the next phase. setImmediate executes during the check phase of the event loop after I/O events have been processed. Because process.nextTick has higher priority, excessive use can delay I/O processing.",
            whyUse: "process.nextTick is useful for executing callbacks before the event loop continues, while setImmediate is preferred when you want to defer work and allow pending I/O operations to complete first.",
            example: `
process.nextTick(() => {
  console.log("nextTick");
});

setImmediate(() => {
  console.log("immediate");
});
`,
        },
        {
            q: "How do you handle errors in async/await in Node.js?",
            a: "Errors in async functions should be handled using try-catch blocks. When an awaited Promise rejects, execution jumps to the catch block. In Express applications, errors should be forwarded to centralized error-handling middleware using next(error). This approach keeps error handling consistent and prevents unhandled promise rejections.",
            whyUse: "Proper error handling improves application reliability, prevents crashes, and provides consistent error responses for APIs and backend services.",
            example: `
try {
  const user = await getUser();
} catch (error) {
  console.error(error);
}
`,
        },
        {
            q: "What is clustering in Node.js and why is it used?",
            a: "Clustering allows Node.js applications to utilize multiple CPU cores by creating multiple worker processes that share the same server port. Each worker runs its own event loop and handles incoming requests independently. This improves throughput, scalability, and fault tolerance because if one worker crashes, others can continue serving requests.",
            whyUse: "Clustering is used in production environments to maximize hardware utilization, improve performance under heavy traffic, and increase application availability.",
            example: "On an 8-core server, a clustered Node.js application can create 8 worker processes so requests are distributed across all available CPU cores instead of using only one.",
        },
        {
            q: "What is the difference between PUT and PATCH in REST APIs?",
            a: "PUT is used to replace an entire resource with a new representation, while PATCH is used to update only specific fields of an existing resource. PUT typically requires the complete resource payload, whereas PATCH sends only the fields that need to change. PATCH is generally more efficient for partial updates.",
            whyUse: "Using PATCH for partial updates reduces payload size and network usage, while PUT is appropriate when replacing a resource completely with a new version.",
            example: `
PUT /users/1
{
  "name": "John",
  "email": "john@example.com"
}

PATCH /users/1
{
  "name": "John"
}
`,
        },
        {
            q: "What are environment variables and how do you manage them?",
            a: "Environment variables are configuration values stored outside the application's source code. They are accessed through process.env and are commonly used for database credentials, API keys, application secrets, and environment-specific settings. During development, tools such as dotenv load variables from a .env file, while production environments inject them through deployment platforms, CI/CD pipelines, container orchestration systems, or cloud services.",
            whyUse: "Environment variables improve security, simplify deployment across environments, and prevent sensitive information from being hardcoded into the codebase.",
            example: `
require("dotenv").config();

const port =
  process.env.PORT;

const dbUrl =
  process.env.DB_URL;
`,
        },
        {
            q: "What is JWT and how is it used for authentication?",
            a: "JWT, or JSON Web Token, is a compact token format used for authentication and authorization. After a successful login, the server generates a signed token containing user information and permissions. The client stores the token and sends it with subsequent requests, typically in the Authorization header. The server verifies the token signature and grants access if it is valid. JWT-based authentication is stateless because user sessions do not need to be stored on the server.",
            whyUse: "JWT is widely used in REST APIs, microservices, mobile applications, and Single Page Applications because it enables scalable and stateless authentication.",
            example: `
Authorization:
Bearer eyJhbGciOi...
`,
        },
        {
            q: "How do you prevent SQL injection and common security vulnerabilities?",
            a: "The most important defense against SQL injection is using parameterized queries or prepared statements instead of building SQL queries through string concatenation. Input validation should be implemented using libraries such as Joi or express-validator. Additional security measures include using HTTPS, setting secure HTTP headers with Helmet, implementing rate limiting, keeping dependencies updated, sanitizing user input, and following the principle of least privilege for database access.",
            whyUse: "Security vulnerabilities can lead to data breaches, unauthorized access, and application compromise. Implementing secure coding practices helps protect both users and business data.",
            example: `
SELECT * FROM users
WHERE id = ?
`,
        },
        {
            q: "What is the difference between SQL and NoSQL databases, and when do you choose each?",
            a: "SQL databases such as PostgreSQL and MySQL use structured schemas, relational tables, and support ACID transactions. They are ideal for applications that require strong consistency, complex relationships, and transactional integrity. NoSQL databases such as MongoDB, Redis, and DynamoDB provide flexible schemas and are optimized for scalability, high throughput, and specialized data models. The choice depends on the application's data structure, query requirements, and scalability needs.",
            whyUse: "SQL databases are commonly used for financial systems, ERP platforms, and transactional applications. NoSQL databases are often chosen for content management systems, real-time analytics, caching, and applications with rapidly changing data structures.",
            example: "An online banking system typically uses PostgreSQL for transactional consistency, while a product catalog with flexible attributes may use MongoDB.",
        },
        {
            q: "What is connection pooling in databases and why does it matter in Node.js?",
            a: "Connection pooling is the practice of maintaining a pool of reusable database connections instead of creating a new connection for every request. Since establishing database connections is expensive, pooling reduces latency and improves performance. When a request needs database access, it borrows a connection from the pool and returns it when finished. This allows applications to handle high traffic efficiently without overwhelming the database server.",
            whyUse: "Connection pooling improves application performance, reduces connection overhead, prevents database exhaustion, and enables Node.js applications to scale under concurrent workloads.",
            example: `
const pool = new Pool({
  max: 20
});

const client =
  await pool.connect();
`,
        },
        {
            q: "How does Node.js handle concurrency if it's single-threaded?",
            a: "Node.js executes JavaScript on a single thread but achieves concurrency through its event-driven, non-blocking architecture. Long-running I/O operations such as file access, database queries, and network requests are delegated to the operating system or libuv's thread pool. While those operations are running, the event loop continues processing other requests. When an operation completes, its callback is placed in a queue and executed by the event loop. This allows Node.js to handle thousands of concurrent I/O operations efficiently.",
            whyUse: "Understanding Node.js concurrency is essential for building scalable backend services. It explains why Node.js performs exceptionally well for APIs, microservices, chat applications, and other I/O-intensive workloads.",
            example: "When one user is waiting for a database query to complete, the event loop can continue processing requests from thousands of other users instead of blocking the entire application.",
        },
        {
            q: "What are the main differences between Promises and async/await?",
            a: "Promises and async/await solve the same asynchronous programming problem but provide different syntax. Promises use method chaining with then, catch, and finally, while async/await allows asynchronous code to be written in a synchronous-looking style. Async/await generally improves readability and error handling through try-catch blocks. However, Promises remain useful for operations such as Promise.all, Promise.race, and complex asynchronous compositions.",
            whyUse: "Async/await improves code readability and maintainability, while Promise utility methods make it easy to run multiple asynchronous operations in parallel.",
            example: `
const usersPromise =
  fetchUsers();

const postsPromise =
  fetchPosts();

await Promise.all([
  usersPromise,
  postsPromise
]);
`,
        },
        {
            q: "What is Express error handling middleware and how is it different from regular middleware?",
            a: "Express error-handling middleware is a special type of middleware designed to handle application errors centrally. Unlike regular middleware, which receives request, response, and next parameters, error middleware receives an additional error parameter. Whenever next(error) is called, Express skips normal middleware and routes the request directly to the error handler. This allows applications to standardize error responses, logging, and exception management.",
            whyUse: "Centralized error handling improves maintainability, ensures consistent API responses, and prevents duplicate error-handling logic throughout the application.",
            example: `
app.use(
  (err, req, res, next) => {
    res.status(500).json({
      message: err.message
    });
  }
);
`,
        },
        {
            q: "What is the purpose of the package-lock.json file?",
            a: "package-lock.json records the exact versions of all installed dependencies and their nested dependencies. While package.json often specifies version ranges, package-lock.json ensures every developer, build server, and deployment environment installs the same dependency tree. This creates reproducible builds and eliminates issues caused by different package versions being installed on different machines.",
            whyUse: "The lock file ensures consistent behavior across development, testing, and production environments, reducing deployment risks and 'works on my machine' problems.",
            example: `
package.json
  express: ^4.18.0

package-lock.json
  express: 4.18.2
`,
        },
        {
            q: "What is event-driven architecture and how does Node.js implement it with EventEmitter?",
            a: "Event-driven architecture is a design pattern where components communicate by emitting and listening for events instead of directly calling each other. This reduces coupling and makes applications more modular and scalable. Node.js implements this pattern through the EventEmitter class. Components can emit named events and other parts of the application can subscribe to those events and react when they occur. Many built-in Node.js modules such as streams, HTTP servers, and process objects are based on EventEmitter.",
            whyUse: "Event-driven architecture is useful for asynchronous workflows, notifications, logging systems, background processing, real-time applications, and microservices where components should remain loosely coupled.",
            example: `
const EventEmitter =
  require("events");

const emitter =
  new EventEmitter();

emitter.on("userCreated", () => {
  console.log("User created");
});

emitter.emit("userCreated");
`,
        },
        {
            q: "How do you implement caching in a Node.js API?",
            a: "Caching improves performance by storing frequently requested data and serving it without repeatedly querying the database or external services. A common approach is the cache-aside pattern, where the application first checks the cache and only queries the database if the data is missing. For production systems, Redis is the most popular caching solution because it supports distributed caching, expiration policies, and high performance. HTTP caching can also be used by setting appropriate response headers.",
            whyUse: "Caching reduces database load, decreases response times, improves scalability, and enhances user experience. It is especially valuable for frequently accessed data such as product catalogs, user profiles, reports, and dashboard metrics.",
            example: `
const cachedData =
  await redis.get("users");

if (cachedData) {
  return JSON.parse(cachedData);
}

const users =
  await getUsersFromDB();

await redis.set(
  "users",
  JSON.stringify(users)
);
`,
        },
    ],
    "Advanced & Scenario": [{
            q: "Your Node.js API handles 10,000 requests per minute normally, but every night during a batch job, response times spike from 50ms to 8 seconds. How do you diagnose and fix this?",
            a: "I would first determine whether the bottleneck is CPU-bound or I/O-bound. Using profiling tools such as Clinic.js, 0x, or performance hooks, I would measure event loop utilization and identify whether the batch process is blocking the event loop. If the batch job performs heavy computations, I would move that work to Worker Threads or a separate service. If the issue is database-related, I would inspect connection pool usage and ensure batch processing does not consume resources needed by API requests. Long term, batch jobs should ideally run in a dedicated process or service to isolate them from user-facing traffic.",
            whyUse: "Node.js performance issues are often caused by event loop blocking or resource contention. Proper diagnosis helps maintain low latency while supporting background processing workloads.",
            example: `
const {
  performance
} = require("perf_hooks");

const metrics =
  performance.eventLoopUtilization();
`,
        },
        {
            q: "You need to build a Node.js service that processes one million image thumbnails overnight. Images are stored in S3. How would you architect it for speed, reliability, and cost efficiency?",
            a: "I would use a queue-based architecture where image processing jobs are pushed into a queue such as BullMQ or Amazon SQS. Multiple worker processes would consume jobs concurrently with controlled parallelism. Images would be streamed directly from S3 through an image processing library such as Sharp and streamed back to storage, avoiding excessive memory usage. Retries, dead-letter queues, and idempotency controls would ensure reliability. For cost optimization, I would use scalable workers and run processing close to the storage region.",
            whyUse: "Queue-based processing improves scalability, fault tolerance, and resource utilization when handling very large workloads.",
            example: "Jobs are placed into a queue, workers process images concurrently, failed jobs are retried automatically, and successful results are stored back in S3.",
        },
        {
            q: "Explain the Node.js event loop phases in order, and describe a scenario where misunderstanding them caused a real bug.",
            a: "The event loop phases are Timers, Pending Callbacks, Idle/Prepare, Poll, Check, and Close Callbacks. Between phases, Node.js processes microtasks such as Promises and process.nextTick callbacks. A common bug occurs when developers recursively schedule work using process.nextTick, assuming it yields control to the event loop. Because nextTick callbacks execute before I/O processing, excessive usage can starve the event loop and prevent incoming requests from being handled. In such cases, setImmediate is usually a better choice because it allows I/O operations to proceed.",
            whyUse: "Understanding event loop phases is essential for diagnosing performance issues, avoiding event loop starvation, and designing efficient asynchronous workflows.",
            example: `
process.nextTick(() => {
  // runs before I/O
});

setImmediate(() => {
  // runs after I/O
});
`,
        },
        {
            q: "How would you design a rate limiter for a Node.js API running across 10 Kubernetes pods without creating a centralized bottleneck?",
            a: "A distributed rate limiter requires shared state across all pods. Redis is commonly used because it supports atomic operations and high throughput. I would implement either a sliding window or token bucket algorithm using Redis commands or Lua scripts for consistency. For many environments, using an API gateway such as NGINX, Kong, or a cloud API gateway is even better because it offloads rate limiting from application code. The design should also define behavior when Redis becomes unavailable, such as failing open or failing closed.",
            whyUse: "Distributed rate limiting protects APIs from abuse, prevents resource exhaustion, and ensures fair usage across multiple application instances.",
            example: `
INCR user:123
EXPIRE user:123 60
`,
        },
        {
            q: "A user can still access protected routes for 24 hours after logging out of your JWT-based application. How do you fix JWT revocation without switching back to server-side sessions?",
            a: "JWTs remain valid until they expire, even if a user logs out. To support revocation, I would implement short-lived access tokens combined with refresh tokens. On logout, the refresh token would be invalidated. For immediate revocation, I would maintain a token blocklist in Redis using the token identifier and expiration time. Another option is token versioning, where each user has a version number stored in the database and tokens become invalid whenever the version changes. These approaches preserve most of the benefits of stateless authentication while supporting secure logout.",
            whyUse: "JWT revocation is essential for security-sensitive applications where users must immediately lose access after logout, account suspension, password changes, or security incidents.",
            example: `
{
  "userId": 123,
  "tokenVersion": 4
}
`,
        },
        {
            q: "What is backpressure in Node.js streams and how do you handle it? Describe the mental model.",
            a: "Backpressure occurs when a writable stream cannot process incoming data as quickly as a readable stream produces it. If not handled correctly, data accumulates in memory and can eventually cause performance issues or crashes. The mental model is a fast water tap filling a tank while a slow drain empties it. If water enters faster than it leaves, the tank overflows. Node.js streams solve this by automatically pausing and resuming data flow when using pipe or pipeline. When handling streams manually, developers must check the return value of write and wait for the drain event before continuing.",
            whyUse: "Backpressure management is critical when processing large files, media streams, network traffic, and data pipelines because it prevents excessive memory usage and keeps applications stable under heavy workloads.",
            example: `
readable
  .pipe(transform)
  .pipe(writable);
`,
        },
        {
            q: "Your Node.js service calls four external APIs sequentially and takes 1.8 seconds. Product wants the response time under 600ms. How do you restructure it?",
            a: "The main issue is sequential execution. If the APIs are independent, I would execute them in parallel using Promise.all so the total response time becomes approximately the duration of the slowest request instead of the sum of all requests. For resilience, I would consider Promise.allSettled to handle partial failures gracefully. I would also add request timeouts, implement caching where appropriate, and analyze dependencies between API calls to identify which operations can safely run concurrently.",
            whyUse: "Parallel execution significantly reduces latency in applications that depend on multiple external services, improving both user experience and system efficiency.",
            example: `
const [users, posts, comments] =
  await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchComments()
  ]);
`,
        },
        {
            q: "What are Worker Threads in Node.js, when would you use them instead of child_process, and what are their limitations?",
            a: "Worker Threads allow JavaScript code to run in parallel threads within the same Node.js process. They are designed for CPU-intensive workloads such as image processing, encryption, compression, machine learning, and large data transformations. Unlike child processes, Worker Threads can share memory through SharedArrayBuffer and have lower startup overhead. Child processes are better suited for executing external programs, achieving stronger isolation, or running non-JavaScript workloads. Worker Threads introduce complexity around communication, debugging, and memory sharing, so they should be used selectively.",
            whyUse: "Worker Threads keep the main event loop responsive while performing computationally expensive work in parallel.",
            example: `
const worker =
  new Worker("./imageWorker.js");
`,
        },
        {
            q: "Your Node.js application has a memory leak in production. Memory grows from 200MB to 2GB over 48 hours before crashing. How do you find and fix it?",
            a: "I would first confirm the leak by monitoring heap usage through process.memoryUsage and application metrics. Next, I would capture heap snapshots using Chrome DevTools, heapdump, or Node.js inspector and compare snapshots over time to identify objects that continue growing. Common causes include unremoved event listeners, unbounded caches, long-lived closures, global variables, uncleared timers, and unresolved promises. After identifying the root cause, I would implement cleanup logic, cache eviction policies, or proper resource management. Finally, I would add monitoring and load testing to ensure the issue does not reoccur.",
            whyUse: "Memory leaks gradually degrade application performance and can eventually crash production systems, making proactive monitoring and analysis essential.",
            example: `
const memory =
  process.memoryUsage();

console.log(
  memory.heapUsed
);
`,
        },
        {
            q: "Explain how you would implement a robust job queue system in Node.js for processing background tasks like sending emails and resizing images.",
            a: "I would use a queueing solution such as BullMQ backed by Redis. Application servers would act as producers and place jobs into the queue, while dedicated worker processes would consume and process jobs asynchronously. The system should support retries with exponential backoff, job prioritization, concurrency controls, monitoring dashboards, dead-letter queues, and graceful shutdown handling. Jobs should be idempotent so retries do not create duplicate effects. Monitoring queue depth and processing times is also important to detect bottlenecks before they impact users.",
            whyUse: "Job queues decouple slow background tasks from user requests, improving API responsiveness, reliability, and scalability.",
            example: `
await queue.add(
  "sendEmail",
  {
    to: "user@example.com"
  }
);
`,
        },
        {
            q: "You need to design a Node.js API that must handle 100,000 concurrent WebSocket connections for a live sports scores application. How do you architect this?",
            a: "I would use a horizontally scalable architecture with multiple Node.js instances behind a load balancer. A pub-sub system such as Redis Pub/Sub would distribute score updates across all instances. Clients would be grouped into rooms based on sports or match identifiers so updates are sent only to interested users. I would use a lightweight WebSocket library such as ws, configure heartbeat mechanisms to detect stale connections, and tune operating system limits such as file descriptors. Resource consumption must be carefully monitored because each connection consumes memory and network resources.",
            whyUse: "Large-scale real-time systems require efficient connection management, horizontal scalability, and optimized message broadcasting to support massive numbers of concurrent users.",
            example: `
redis.publish(
  "match:123",
  scoreUpdate
);
`,
        },
        {
            q: "Your Node.js API is returning incorrect or stale data intermittently. Some users see outdated product prices. You suspect a caching bug. How do you investigate and fix it?",
            a: "I would start by identifying every caching layer involved in the request path, including browser caches, CDN caches, application caches such as Redis, and database query caches. Next, I would determine which layer is serving stale data by adding diagnostic headers, temporarily bypassing caches, and comparing cached values with the source database. Common causes include missing cache invalidation, overly broad cache keys, excessive TTL values, and race conditions during cache updates. The most reliable solution is usually a cache-aside strategy with explicit invalidation whenever underlying data changes and appropriate expiration policies.",
            whyUse: "Caching improves performance but introduces consistency challenges. Understanding cache invalidation is essential for maintaining data accuracy while preserving scalability.",
            example: "When a product price changes, the application updates the database and immediately removes the corresponding cache entry so future requests retrieve fresh data.",
        },
        {
            q: "You need to build a Node.js microservice that sends 50,000 welcome emails per day. Emails must never be lost, even if the service crashes. How do you architect it?",
            a: "I would decouple email delivery from the user registration flow by using a persistent job queue such as BullMQ backed by Redis. When a user registers, the application would create the user and enqueue an email job immediately. Dedicated worker processes would consume jobs and send emails asynchronously. Retries with exponential backoff, dead-letter queues, monitoring dashboards, and idempotency controls would ensure reliability. This design allows the API to remain responsive while guaranteeing email delivery even if workers restart or fail.",
            whyUse: "Queue-based architectures improve reliability, scalability, and fault tolerance for long-running background tasks.",
            example: "A registration request creates a user, places an email job into Redis, returns success immediately, and a background worker sends the email independently.",
        },
        {
            q: "A security audit finds SQL injection risks, broken authentication, sensitive data exposure, and missing rate limiting. How would you fix each issue?",
            a: "I would address each finding systematically. SQL injection would be eliminated using parameterized queries or ORM protections. Authentication would be strengthened through secure password hashing, short-lived access tokens, refresh token rotation, and account lockout policies. Sensitive data exposure would be reduced by removing confidential fields from logs and API responses, enforcing HTTPS, and encrypting sensitive information. Rate limiting would be implemented to protect APIs from abuse and brute-force attacks. I would also add security headers, dependency scanning, and regular vulnerability assessments as part of the security process.",
            whyUse: "Security vulnerabilities can lead to data breaches, account compromise, and service disruption. Addressing them proactively reduces risk and improves compliance.",
            example: "Login endpoints may allow only a limited number of requests per IP address within a specified time window to prevent brute-force attacks.",
        },
        {
            q: "Your Node.js application connects to PostgreSQL. During a traffic spike, you start seeing 'connection pool exhausted' errors. How do you diagnose and fix this?",
            a: "I would first inspect connection pool metrics to determine whether the issue is caused by slow queries, connection leaks, insufficient pool size, or unexpected traffic growth. Database monitoring tools can reveal long-running queries holding connections for extended periods. I would ensure connections are always released properly, optimize expensive queries, and tune pool settings based on workload and database capacity. For large-scale systems, introducing a connection pool proxy such as PgBouncer can further improve connection management.",
            whyUse: "Connection pooling reduces connection overhead, but incorrect configuration or resource leaks can prevent applications from serving users under load.",
            example: "If a query takes 30 seconds to complete, it holds a connection for the entire duration, reducing pool availability for other requests.",
        },
        {
            q: "You've deployed a Node.js API and users report intermittent 502 errors. Monitoring shows the process crashes and restarts every few hours. How do you find the cause and make the application resilient?",
            a: "I would begin by analyzing logs and crash reports to identify whether the cause is an unhandled exception, unhandled promise rejection, memory leak, deployment issue, or resource exhaustion. Once identified, I would implement proper error handling, centralized logging, monitoring, and graceful shutdown procedures. Running the application under a process manager such as PM2 or within container orchestration platforms improves recovery. Health checks, structured logging, and alerting help detect problems before they impact users.",
            whyUse: "Production systems must tolerate failures gracefully and recover automatically without causing widespread downtime.",
            example: "When receiving a termination signal, the application stops accepting new requests, completes in-flight requests, closes database connections, and then exits safely.",
        },
        {
            q: "Explain how you would implement database transactions in Node.js with PostgreSQL. When are transactions necessary and what happens without them?",
            a: "Transactions ensure that multiple database operations either all succeed or all fail together. They are essential whenever a business operation spans multiple writes that must remain consistent, such as transferring money, creating orders, updating inventory, or processing payments. Without transactions, a failure in the middle of an operation can leave data in an inconsistent state. The typical transaction flow involves starting a transaction, executing all required operations, committing if everything succeeds, and rolling back if any step fails.",
            whyUse: "Transactions preserve data integrity and prevent partial updates that could corrupt business-critical information.",
            example: "During a bank transfer, one account should not be debited unless the corresponding credit operation also succeeds. A transaction guarantees both operations succeed together or neither takes effect.",
        },
        {
            q: "What is backpressure in Node.js streams and how do you handle it? Describe the mental model.",
            a: "Backpressure occurs when data is produced faster than it can be consumed. If a writable stream cannot keep up with a readable stream, data accumulates in memory and may eventually cause performance issues or crashes. The mental model is a fast water tap filling a tank connected to a slow drain. Node.js streams automatically handle backpressure when using pipe or pipeline by pausing and resuming data flow as needed. When working manually with streams, developers must respect the write buffer status and wait for drain events before continuing.",
            whyUse: "Backpressure handling is critical when processing large files, media streams, network traffic, and data pipelines to prevent memory exhaustion.",
            example: "Streaming a large video file directly from storage to a client uses backpressure to ensure the network connection determines the transfer speed rather than filling application memory.",
        },
        {
            q: "Your team is building a Node.js service that needs to call an unreliable third-party payment API. Sometimes it times out, sometimes it returns 503 errors. How do you make the integration robust?",
            a: "When integrating with an unreliable third-party service, I focus on resilience and fault tolerance. First, I enforce request timeouts so requests never hang indefinitely. Next, I implement retry logic with exponential backoff for transient failures such as network issues and server errors. To avoid duplicate payments during retries, I use idempotency keys. I also introduce a circuit breaker pattern so the application can fail fast when the provider is experiencing widespread issues. For critical transactions, I may queue requests for later processing instead of immediately failing. Finally, I monitor latency, error rates, retry counts, and circuit breaker status to detect issues early.",
            whyUse: "External services are outside your control. Resilience patterns such as retries, timeouts, circuit breakers, and idempotency help prevent outages from affecting users and reduce the risk of duplicate transactions.",
            example: "A payment request times out. The service retries automatically using the same idempotency key. If the provider is completely unavailable, the circuit breaker opens and requests are queued until the provider recovers.",
        },
        {
            q: "You need to design a Node.js REST API that will be used by both a mobile app and a web frontend. The mobile team complains the responses are too large while the web team needs all fields. How do you handle this?",
            a: "I would implement response shaping so clients can request only the fields they need. This reduces payload size for mobile applications while still allowing web applications to retrieve complete datasets. Another option is GraphQL, which lets clients define exactly what data they require. I would also enable response compression and apply pagination where appropriate. If mobile requirements become significantly different, I might introduce a Backend for Frontend layer dedicated to mobile clients.",
            whyUse: "Different clients often have different bandwidth, performance, and data requirements. Response shaping improves efficiency while maintaining a single API.",
            example: "A mobile application requests only id, name, and avatar fields, while the web application retrieves the full user profile including preferences, permissions, and activity history.",
        },
        {
            q: "Your Node.js application runs in Kubernetes and pods are frequently being terminated with OOMKilled errors. The memory limit is 512MB. How do you investigate?",
            a: "I would first determine whether the issue is a memory leak or normal memory growth under load. Memory metrics from process.memoryUsage, Prometheus, or APM tools can reveal trends over time. Heap snapshots and profiling tools help identify objects that continue growing unexpectedly. Common causes include unbounded caches, unreleased event listeners, unresolved promises, and large objects retained in memory. I would also ensure Node.js is configured with an appropriate heap limit relative to the container memory limit and verify Kubernetes resource requests and limits are properly sized.",
            whyUse: "Memory-related issues can cause service instability, frequent restarts, and degraded application performance in containerized environments.",
            example: "If memory continuously grows over several hours and never decreases, a heap snapshot comparison can identify which object types are accumulating and causing the leak.",
        },
        {
            q: "Explain the difference between horizontal and vertical scaling for a Node.js API. When would you choose each?",
            a: "Vertical scaling increases the resources of a single server, such as CPU and memory. It is simple to implement but eventually reaches hardware limits and introduces a single point of failure. Horizontal scaling adds more application instances behind a load balancer, improving both capacity and availability. For early-stage applications or temporary performance improvements, vertical scaling may be sufficient. For high-traffic, highly available systems, horizontal scaling is usually the preferred approach. In Node.js, clustering and Worker Threads support better utilization of a single machine, while stateless application design enables scaling across multiple machines.",
            whyUse: "Choosing the correct scaling strategy impacts application availability, cost, operational complexity, and long-term scalability.",
            example: "A startup may initially increase server memory and CPU to handle growth. As traffic expands globally, it may move to multiple Node.js instances behind a load balancer with shared state stored in Redis and PostgreSQL.",
        },
    ],
}

export default nodeData;