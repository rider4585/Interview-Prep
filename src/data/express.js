const expressData = {
    Beginner: [{
            q: "What is Express.js and why is it used?",
            a: "Express.js is a lightweight and unopinionated web framework built on top of Node.js. It simplifies server-side development by providing routing, middleware support, request and response utilities, and integration with various databases and services. Express is widely used because it reduces boilerplate code, improves maintainability, and allows developers to build REST APIs, web applications, and microservices quickly.",
            whyUse: "Used for building REST APIs, backend services, authentication systems, microservices, real-time applications, and full-stack web applications.",
            example: `
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);
`,
        },
        {
            q: "What is middleware in Express.js?",
            a: "Middleware are functions that execute during the request-response cycle. They have access to the request object, response object, and the next function. Middleware can modify requests, validate data, perform authentication, log information, handle errors, or terminate the request. Express processes middleware in the order they are registered, making execution order very important.",
            whyUse: "Used for authentication, authorization, request validation, logging, error handling, rate limiting, parsing request bodies, and other cross-cutting concerns.",
            example: `
function logger(req, res, next) {
  console.log(req.method, req.url);
  next();
}

app.use(logger);
`,
        },
        {
            q: "How does routing work in Express.js?",
            a: "Routing determines how an application responds to incoming requests based on the HTTP method and URL path. Express matches the request against registered routes and executes the corresponding handler. Routes can contain parameters, query strings, middleware, and multiple handlers. For larger applications, routes are usually organized using Express Router to create modular and maintainable code.",
            whyUse: "Routing is used to expose API endpoints, separate business functionality, organize application modules, and handle different client requests efficiently.",
            example: `
app.get('/users/:id', (req, res) => {
  res.json({ id: req.params.id });
});
`,
        },
        {
            q: "What is the difference between app.use() and app.get()?",
            a: "app.use() is primarily used to register middleware and works for all HTTP methods. It performs prefix-based path matching and is commonly used for logging, authentication, validation, and mounting routers. app.get() is used specifically for handling GET requests and matches a particular route. Middleware registered through app.use() typically runs before route handlers and can control whether the request continues through the pipeline.",
            whyUse: "app.use() is used for reusable middleware and route grouping, while app.get() is used for implementing specific GET API endpoints.",
            example: `
app.use('/api', authMiddleware);

app.get('/users', (req, res) => {
  res.json(users);
});
`,
        },
        {
            q: "How do you handle request and response objects in Express?",
            a: "The request object contains information sent by the client, including route parameters, query parameters, request body, headers, cookies, and metadata about the request. The response object is used to send data back to the client, such as JSON responses, files, redirects, status codes, or rendered templates. Express provides helper methods that make working with HTTP requests and responses much simpler than using the native Node.js HTTP module.",
            whyUse: "Request and response objects are used in every API endpoint to receive client data, perform business logic, and send appropriate responses back to the client.",
            example: `
app.post('/users', (req, res) => {
  const user = req.body;

  res.status(201).json({
    message: 'User created',
    user
  });
});
`,
        },
        {
            q: "What is Express Router and why use it?",
            a: "Express Router is a mini Express application that provides its own routing and middleware capabilities. It helps organize routes into separate modules instead of keeping all routes in a single file. This improves code maintainability, scalability, readability, and team collaboration. In large applications, routers are commonly organized by features such as users, products, orders, and authentication.",
            whyUse: "Used to structure large applications, separate feature modules, apply route-specific middleware, and improve maintainability.",
            example: `
const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);

app.use('/api/users', router);
`,
        },
        {
            q: "How do you parse request bodies in Express?",
            a: "Express uses middleware to parse incoming request bodies and make the data available through req.body. Different middleware is used depending on the content type. express.json() handles JSON payloads, express.urlencoded() handles form data, and libraries such as Multer are used for file uploads. Without body-parsing middleware, req.body remains undefined.",
            whyUse: "Required when handling form submissions, REST APIs, file uploads, authentication requests, and any endpoint that receives data from clients.",
            example: `
app.use(express.json());

app.post('/users', (req, res) => {
  console.log(req.body);
  res.send('User received');
});
`,
        },
        {
            q: "What is the purpose of next() in Express middleware?",
            a: "The next() function passes control to the next middleware or route handler in the request-response cycle. If next() is not called and a response is not sent, the request will remain pending indefinitely. It enables middleware chaining, allowing multiple functions to process a request sequentially. next(error) can also be used to skip normal middleware and forward control directly to error-handling middleware.",
            whyUse: "Used for authentication, logging, validation, authorization, error handling, and building reusable middleware pipelines.",
            example: `
app.use((req, res, next) => {
  console.log('Request received');
  next();
});
`,
        },
        {
            q: "How do you handle errors in Express.js?",
            a: "Express handles errors using dedicated error-handling middleware. Errors can be thrown or passed using next(error), and Express forwards them to middleware that accepts four parameters: err, req, res, and next. A centralized error handler helps standardize responses, improve debugging, and keep business logic clean. In production applications, custom error classes and logging tools are often used to provide better monitoring and error management.",
            whyUse: "Used to provide consistent API responses, improve debugging, prevent application crashes, and centralize error management.",
            example: `
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message
  });
});
`,
        },
        {
            q: "How do you serve static files in Express?",
            a: "Express provides the built-in express.static() middleware to serve static assets such as HTML files, CSS, JavaScript, images, fonts, and downloadable resources. When configured, Express automatically maps files from a directory to public URLs. Static file serving is commonly used for frontend assets, uploaded files, documentation, and production builds of React or other frontend frameworks.",
            whyUse: "Used to serve website assets, images, CSS files, JavaScript bundles, PDFs, and frontend application builds.",
            example: `
app.use(express.static('public'));

// public/logo.png
// Accessible at:
// http://localhost:3000/logo.png
`,
        },
        {
            q: "What is CORS and how do you enable it in Express?",
            a: "CORS, or Cross-Origin Resource Sharing, is a browser security mechanism that controls whether a web application can make requests to a different domain, protocol, or port. By default, browsers enforce the same-origin policy and block unauthorized cross-origin requests. To allow cross-origin communication, the server must send specific CORS headers. In Express, CORS is typically enabled using the cors middleware package, which simplifies configuration and handles preflight requests automatically.",
            whyUse: "Used when a frontend application and backend API are hosted on different domains, subdomains, or ports and need to communicate securely.",
            example: `
const cors = require('cors');

app.use(cors({
  origin: 'https://myfrontend.com',
  credentials: true
}));
`,
        },
        {
            q: "How do environment variables work in Express?",
            a: "Environment variables are configuration values stored outside the application code. They are commonly used to manage sensitive information such as database credentials, API keys, JWT secrets, and environment-specific settings. In Express applications, environment variables are accessed through process.env. During development, the dotenv package is often used to load variables from a .env file. This approach improves security and allows the same codebase to run across multiple environments without modification.",
            whyUse: "Used for managing configuration, securing secrets, supporting multiple environments, and following industry-standard deployment practices.",
            example: `
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT);
`,
        },
        {
            q: "How do you connect Express with a database?",
            a: "Express is database-agnostic, meaning it does not provide built-in database functionality. Developers connect databases using dedicated libraries or ORMs such as Mongoose for MongoDB, Sequelize for SQL databases, Prisma, TypeORM, or native database drivers. Typically, the database connection is established when the application starts, and the same connection or connection pool is reused across requests. Business logic then interacts with the database through models, repositories, or service layers.",
            whyUse: "Used to persist application data such as users, products, orders, transactions, logs, and business records.",
            example: `
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected'))
  .catch(err => console.error(err));
`,
        },
    ],
    Intermediate: [{
            q: "How do you implement authentication in Express using JWT?",
            a: "JWT authentication is a stateless authentication mechanism where the server generates a signed token after successful login and sends it to the client. The client includes this token in subsequent requests, typically through the Authorization header. The server verifies the token signature before granting access to protected resources. JWT-based authentication is scalable because the server does not need to maintain session data, making it suitable for REST APIs and distributed systems.",
            whyUse: "Used for securing APIs, implementing login systems, role-based access control, microservices authentication, and mobile applications.",
            example: `
const token = jwt.sign(
  { id: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET
);
`,
        },
        {
            q: "How do you implement input validation in Express?",
            a: "Input validation ensures that incoming data is correct, safe, and follows business rules before processing. It helps prevent invalid data, security vulnerabilities, and unexpected application behavior. Validation is commonly implemented using middleware libraries such as express-validator, Joi, or Zod. A good validation strategy checks required fields, data types, formats, length constraints, and custom business rules before the request reaches the application logic.",
            whyUse: "Used to prevent invalid data, improve security, reduce bugs, and ensure data integrity across APIs.",
            example: `
const { body } = require('express-validator');

app.post('/users', [
  body('email').isEmail(),
  body('password').isLength({ min: 8 })
], createUser);
`,
        },
        {
            q: "How does Express handle asynchronous route handlers?",
            a: "Asynchronous route handlers allow Express applications to perform operations such as database queries, API calls, and file processing without blocking the event loop. In Express 4, errors inside async functions must be caught manually and passed to next(). Many teams use async wrapper utilities to avoid repetitive try-catch blocks. Proper async handling ensures that rejected promises are forwarded to centralized error handlers and do not crash the application.",
            whyUse: "Used when interacting with databases, third-party APIs, file systems, cloud services, and any asynchronous operation.",
            example: `
app.get('/users', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});
`,
        },
        {
            q: "How do you implement rate limiting in Express?",
            a: "Rate limiting restricts how many requests a client can make within a specified time period. It protects applications from brute-force attacks, denial-of-service attempts, excessive API usage, and abusive traffic patterns. Rate limiting is commonly implemented using middleware such as express-rate-limit, and in distributed systems it is often backed by Redis so that limits are shared across multiple server instances.",
            whyUse: "Used to protect APIs, login endpoints, payment systems, and public-facing services from abuse and excessive traffic.",
            example: `
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);
`,
        },
        {
            q: "How do you implement file uploads in Express?",
            a: "Express does not natively support multipart form data, so file uploads are typically handled using Multer. Multer processes incoming files, validates them, and stores them either on disk or in memory. Uploaded files can then be saved locally or forwarded to cloud storage services such as AWS S3. Proper file upload implementations include validation for file type, size limits, and security checks to prevent malicious uploads.",
            whyUse: "Used for profile pictures, documents, invoices, media files, reports, and cloud storage integrations.",
            example: `
const multer = require('multer');

const upload = multer({
  dest: 'uploads/'
});

app.post(
  '/upload',
  upload.single('file'),
  uploadHandler
);
`,
        },
        {
            q: "How do you structure a large Express.js application?",
            a: "A large Express application should be organized using separation of concerns. Routes handle URL mapping, controllers manage request and response logic, services contain business logic, models interact with the database, and middleware handles cross-cutting concerns such as authentication and validation. This layered architecture improves maintainability, scalability, testing, and team collaboration. It also keeps the codebase clean and prevents business logic from being tightly coupled to HTTP-specific code.",
            whyUse: "Used in enterprise applications, microservices, and large-scale projects where maintainability and scalability are important.",
            example: `
src/
├── routes/
├── controllers/
├── services/
├── models/
├── middleware/
├── config/
└── app.js
`,
        },
        {
            q: "What are Express.js security best practices?",
            a: "Securing an Express application requires multiple layers of protection. Common practices include using Helmet for security headers, enabling rate limiting to prevent abuse, validating and sanitizing all user input, using parameterized database queries, implementing proper authentication and authorization, restricting CORS origins, storing secrets in environment variables, enforcing HTTPS, and keeping dependencies updated. Security should be considered at every layer of the application rather than relying on a single protection mechanism.",
            whyUse: "Used to prevent common vulnerabilities such as XSS, CSRF, SQL injection, NoSQL injection, brute-force attacks, and sensitive data exposure.",
            example: `
app.use(helmet());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

app.disable('x-powered-by');
`,
        },
        {
            q: "How do you implement logging in Express?",
            a: "Logging helps monitor application behavior, troubleshoot issues, audit requests, and analyze performance. HTTP request logging is commonly implemented using Morgan, while application-level logging is often handled using Winston or Pino. Production logging should include request details, error information, timestamps, and contextual metadata. Structured logging is preferred because it integrates easily with monitoring platforms and log aggregation tools.",
            whyUse: "Used for debugging, monitoring, auditing, performance tracking, and incident investigation in production systems.",
            example: `
const morgan = require('morgan');

app.use(morgan('combined'));

logger.info('User login successful');
`,
        },
        {
            q: "How does Express handle cookies and sessions?",
            a: "Cookies are small pieces of data stored in the browser and automatically sent with requests to the server. Sessions use cookies to maintain user state across multiple requests. In session-based authentication, the server stores session data while the browser stores only a session identifier. Express commonly uses cookie-parser for cookie management and express-session with Redis or another storage solution for session management. Sessions provide stateful authentication, while JWT provides a stateless alternative.",
            whyUse: "Used for authentication, user preferences, shopping carts, tracking user activity, and maintaining application state.",
            example: `
res.cookie('username', 'john', {
  httpOnly: true,
  secure: true
});

req.cookies.username;
`,
        },
        {
            q: "How do you test an Express.js API?",
            a: "Testing an Express API typically involves unit testing, integration testing, and end-to-end testing. Unit tests verify individual functions and services, while integration tests validate complete API endpoints and middleware interactions. Jest is commonly used as the test framework, and Supertest is used to simulate HTTP requests directly against the Express application. A well-tested API verifies both successful scenarios and error handling behavior.",
            whyUse: "Used to improve reliability, prevent regressions, validate business requirements, and support continuous integration workflows.",
            example: `
const request = require('supertest');

await request(app)
  .get('/api/users')
  .expect(200);
`,
        },
        {
            q: "How do you implement caching in Express?",
            a: "Caching improves performance by storing frequently accessed data and reducing repeated database queries or expensive computations. Express applications can implement browser caching through HTTP cache headers, in-memory caching using libraries such as node-cache, or distributed caching using Redis. Cache invalidation strategies are important to ensure users receive up-to-date information while still benefiting from improved response times.",
            whyUse: "Used to reduce database load, improve API response times, lower infrastructure costs, and enhance scalability.",
            example: `
res.set(
  'Cache-Control',
  'public, max-age=3600'
);

const cachedData = await redis.get('users');
`,
        },
        {
            q: "How do you version an Express API?",
            a: "API versioning allows developers to introduce new features and breaking changes without affecting existing clients. The most common approach is URL versioning, where different versions are exposed through separate routes such as /api/v1 and /api/v2. Other approaches include header-based versioning and query parameter versioning. A good versioning strategy maintains backward compatibility, allows gradual client migration, and minimizes code duplication by sharing business logic across versions while exposing different response formats when needed.",
            whyUse: "Used when APIs evolve over time, response structures change, fields are added or removed, or new functionality must be introduced without breaking existing consumers.",
            example: `
app.use('/api/v1', v1Router);

app.use('/api/v2', v2Router);

// Examples:
// GET /api/v1/users
// GET /api/v2/users
`,
        },
    ],
    "Advanced & Scenario": [{
            q: "You're building a production REST API with Express. How would you design and implement a complete authentication and authorization system?",
            a: "A production-grade authentication system should include user registration, secure password hashing, login, JWT-based authentication, refresh token management, role-based authorization, and secure logout mechanisms. Passwords should always be hashed using bcrypt before storage. Access tokens should be short-lived, while refresh tokens should be stored securely and rotated periodically. Authorization should be implemented through middleware that validates user roles and permissions. Security measures such as HttpOnly cookies, token expiration, rate limiting, and audit logging should also be included.",
            whyUse: "Used in enterprise applications, SaaS platforms, admin dashboards, banking systems, healthcare applications, and any system requiring secure user access control.",
            example: `
app.post('/login', loginController);

app.get(
  '/profile',
  authenticate,
  getProfile
);

app.delete(
  '/users/:id',
  authenticate,
  authorize('admin'),
  deleteUser
);
`,
        },
        {
            q: "Your Express API is getting slow under load. How do you diagnose and optimize performance?",
            a: "Performance optimization should begin with measurement and profiling. I would first identify bottlenecks using monitoring and load-testing tools. Common issues include inefficient database queries, missing indexes, excessive API calls, lack of caching, large payloads, and CPU-intensive operations blocking the event loop. After identifying the bottleneck, I would optimize database access, introduce caching with Redis, enable response compression, use connection pooling, paginate large datasets, move CPU-heavy tasks to worker threads, and scale the application horizontally when necessary.",
            whyUse: "Used when APIs experience high latency, increased traffic, slow database responses, or scalability challenges in production environments.",
            example: `
app.use(compression());

const users = await redis.get('users');

const results = await Promise.all([
  getUsers(),
  getOrders()
]);
`,
        },
        {
            q: "How do you implement a complete middleware pipeline with error handling, request ID tracking, and structured logging in Express?",
            a: "A production middleware pipeline should process requests consistently across the application. It typically starts with request tracking, logging, security middleware, body parsing, validation, authentication, routing, and centralized error handling. Request IDs help trace requests across services, structured logging improves observability, and centralized error handlers ensure consistent responses. The order of middleware is critical because each layer builds upon the previous one.",
            whyUse: "Used in enterprise applications, microservices, distributed systems, and APIs requiring monitoring, debugging, and observability.",
            example: `
app.use(requestIdMiddleware);

app.use(loggerMiddleware);

app.use(authMiddleware);

app.use(routes);

app.use(errorHandler);
`,
        },
        {
            q: "How would you build and secure a REST API in Express that handles file uploads, processes images, and streams results back to the client?",
            a: "I would use Multer for secure file uploads, validate file size and MIME types, process images using a library such as Sharp, and store files in cloud storage like AWS S3. Uploaded files should never be trusted directly, so validation and sanitization are essential. For large downloads, I would stream files instead of loading them entirely into memory. Authentication, rate limiting, virus scanning, and secure access controls should also be implemented to protect the API.",
            whyUse: "Used for profile picture uploads, document management systems, media platforms, content management systems, and cloud storage integrations.",
            example: `
app.post(
  '/upload',
  authenticate,
  upload.single('image'),
  uploadController
);

fileStream.pipe(res);
`,
        },
        {
            q: "How do you implement WebSockets in an Express application for real-time features?",
            a: "Express is built on HTTP and does not provide real-time communication by default. To implement real-time features, WebSockets can be added using libraries such as ws or Socket.IO. A WebSocket connection remains open between the client and server, allowing both sides to exchange messages instantly. Common use cases include chat applications, notifications, collaborative editing, live dashboards, and multiplayer games. Authentication should be performed during connection establishment, and disconnected clients should be handled gracefully.",
            whyUse: "Used for chat systems, real-time notifications, collaborative applications, live tracking, stock updates, and online gaming.",
            example: `
io.on('connection', socket => {
  socket.emit('connected');

  socket.on('message', data => {
    io.emit('message', data);
  });
});
`,
        },
        {
            q: "You're asked to design an Express API that needs to handle 10,000 concurrent requests. What architectural decisions would you make?",
            a: "To handle high concurrency, I would design the application to be stateless and horizontally scalable. Shared state such as sessions and caching would be stored in Redis rather than memory. Database connections would use connection pooling, and expensive queries would be optimized and cached. The application would run in cluster mode or behind a process manager such as PM2, with multiple instances deployed behind a load balancer. CPU-intensive work would be moved to worker threads or background queues, and monitoring would be implemented to track performance, errors, and resource usage.",
            whyUse: "Used in large-scale APIs, SaaS platforms, e-commerce systems, streaming services, and enterprise applications handling significant traffic.",
            example: `
PM2 Cluster Mode

Load Balancer
      ↓
Multiple Express Instances
      ↓
Redis Cache
      ↓
Database Pool

Worker Threads for CPU Tasks
`,
        },
    ],
};

export default expressData;