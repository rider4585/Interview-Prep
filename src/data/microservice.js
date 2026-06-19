const microserviceData = {
    Beginner: [{
            q: "What are Microservices?",
            a: "Microservices is an architectural style where an application is divided into small, independent services, each responsible for a specific business capability. Every service can be developed, deployed, scaled, and maintained independently. Services communicate with each other through APIs, messaging systems, or event-driven mechanisms. This approach improves scalability, fault isolation, and team autonomy while allowing different services to use different technologies when needed.",
            whyUse: "Used in large-scale applications where different business domains need independent deployment, scaling, and ownership by separate teams.",
            example: `
E-Commerce Application

User Service
Product Service
Order Service
Payment Service
Notification Service
`,
        },
        {
            q: "What is the difference between Monolith and Microservices?",
            a: "A monolithic application consists of a single codebase, deployment unit, and often a shared database. In contrast, a microservices architecture breaks the application into multiple independent services that can be deployed and scaled separately. Monoliths are simpler to build and manage initially, while microservices provide better scalability, flexibility, and team autonomy. However, microservices introduce additional complexity related to networking, monitoring, deployment, and distributed data management.",
            whyUse: "This comparison helps determine the right architecture based on application size, team structure, deployment requirements, and scalability needs.",
            example: `
Monolith:
Frontend + Backend + Database

Microservices:
User Service
Order Service
Payment Service
Notification Service
`,
        },
        {
            q: "Why do companies use Microservices?",
            a: "Companies adopt microservices to improve scalability, deployment speed, fault isolation, and team productivity. Individual services can be developed and released independently, allowing multiple teams to work in parallel without affecting each other. Organizations also gain flexibility in choosing technologies and scaling only the services experiencing high demand. This approach becomes especially valuable as applications and engineering teams grow.",
            whyUse: "Used by large organizations to support independent teams, continuous deployment, rapid scaling, and complex business domains.",
            example: `
Benefits:
- Independent deployment
- Independent scaling
- Fault isolation
- Faster development cycles
- Team autonomy
`,
        },
        {
            q: "What are the disadvantages of Microservices?",
            a: "While microservices offer flexibility and scalability, they also introduce significant operational complexity. Developers must handle network communication, service discovery, distributed transactions, monitoring, logging, security, and deployment orchestration. Debugging becomes more difficult because a single request may travel through multiple services. Additional infrastructure such as Kubernetes, API gateways, message brokers, and distributed tracing tools is often required.",
            whyUse: "Understanding these trade-offs helps determine whether microservices are appropriate for a project or if a monolithic architecture is more suitable.",
            example: `
Challenges:
- Network latency
- Distributed transactions
- Service monitoring
- Deployment complexity
- Infrastructure overhead
`,
        },
        {
            q: "What is the Database Per Service Pattern?",
            a: "The Database Per Service pattern states that each microservice should own and manage its own database. Other services must access data through APIs rather than directly querying another service's database. This ensures loose coupling, independent deployments, and better service autonomy. Although this approach improves isolation, it introduces challenges such as data duplication, eventual consistency, and the inability to perform direct joins across services.",
            whyUse: "Used to maintain service independence, prevent tight coupling, and support autonomous development and deployment of microservices.",
            example: `
User Service    → PostgreSQL
Order Service   → MongoDB
Payment Service → MySQL

Communication happens through APIs,
not direct database access.
`,
        },
        {
            q: "What is an API Gateway?",
            a: "An API Gateway is a single entry point that sits between clients and microservices. It receives incoming requests and routes them to the appropriate backend services while handling common concerns such as authentication, authorization, rate limiting, logging, monitoring, SSL termination, and response aggregation. By centralizing these responsibilities, the gateway simplifies client interactions and hides the complexity of the underlying microservices architecture.",
            whyUse: "Used in microservices architectures to provide centralized security, routing, monitoring, traffic management, and simplified client communication.",
            example: `
Client
   ↓
API Gateway
   ↓
User Service
Order Service
Payment Service
`,
        },
        {
            q: "Why is an API Gateway needed?",
            a: "Without an API Gateway, clients must communicate directly with multiple services, manage different endpoints, and handle authentication separately for each service. An API Gateway provides a single endpoint, centralizes authentication and authorization, reduces client complexity, supports request aggregation, enables rate limiting, and hides internal service locations. This improves maintainability, security, and overall system flexibility.",
            whyUse: "Used to simplify client interactions, reduce network calls, centralize security, and provide a stable API interface for consumers.",
            example: `
Without Gateway:
Client → User Service
Client → Order Service
Client → Payment Service

With Gateway:
Client → API Gateway → Services
`,
        },
        {
            q: "What is Service Discovery?",
            a: "Service Discovery is a mechanism that allows services to dynamically locate and communicate with each other without hardcoded IP addresses or ports. In distributed environments, service instances are created, terminated, and scaled frequently. Service discovery maintains a registry of available service instances and provides routing information when services need to communicate. Modern platforms such as Kubernetes provide built-in service discovery through DNS-based service names.",
            whyUse: "Used in cloud-native and microservices environments where service instances change dynamically and manual configuration is impractical.",
            example: `
Order Service
      ↓
Service Registry
      ↓
Payment Service Instance

Service lookup happens dynamically.
`,
        },
        {
            q: "What is Inter-Service Communication?",
            a: "Inter-Service Communication refers to the way microservices exchange information to complete business operations. Communication can be synchronous using protocols such as REST or gRPC, where the caller waits for a response, or asynchronous using message brokers such as RabbitMQ or Kafka, where services communicate through events and messages. The choice depends on business requirements, performance needs, and coupling considerations.",
            whyUse: "Used whenever multiple microservices collaborate to fulfill business workflows such as orders, payments, notifications, and inventory updates.",
            example: `
Synchronous:
Order Service → Payment Service

Asynchronous:
Order Service → Kafka Topic
                    ↓
             Payment Service
`,
        },
        {
            q: "What is the difference between Synchronous and Asynchronous Communication?",
            a: "In synchronous communication, the calling service waits for an immediate response before continuing execution. REST and gRPC are common examples. In asynchronous communication, the calling service sends a message or event and continues processing without waiting for a response. Message brokers such as RabbitMQ and Kafka are commonly used for this approach. Synchronous communication is simpler and suitable for real-time operations, while asynchronous communication improves scalability, resilience, and decoupling between services.",
            whyUse: "Understanding this distinction helps design scalable and reliable distributed systems based on business requirements and latency expectations.",
            example: `
Synchronous:
Service A → Service B → Response

Asynchronous:
Service A → Message Queue
                    ↓
               Service B
`,
        },
    ],
    Intermediate: [{
            q: "What is the difference between REST, RabbitMQ, and Kafka?",
            a: "REST, RabbitMQ, and Kafka solve different communication problems in distributed systems. REST is a synchronous request-response approach where a client waits for an immediate response. RabbitMQ is an asynchronous message broker designed for reliable task processing and work queues. Kafka is an event streaming platform built for high-throughput event processing, multiple consumers, and event retention. REST is best for real-time API interactions, RabbitMQ is ideal for background jobs and task distribution, and Kafka is suited for event-driven architectures, analytics, and large-scale data streaming.",
            whyUse: "Understanding these technologies helps select the appropriate communication model based on latency, reliability, scalability, and business requirements.",
            example: `
REST:
Client → Service → Response

RabbitMQ:
Producer → Queue → Consumer

Kafka:
Producer → Topic → Multiple Consumers
`,
        },
        {
            q: "When would you use RabbitMQ?",
            a: "RabbitMQ is used when asynchronous task processing and reliable message delivery are required. It is ideal for background jobs such as sending emails, generating reports, processing payments, resizing images, and handling workload spikes. RabbitMQ decouples producers from consumers, allowing systems to remain responsive even when downstream services are busy or temporarily unavailable. It also supports worker queues, making horizontal scaling straightforward.",
            whyUse: "Used for background processing, task queues, event distribution, workload buffering, and reliable service communication.",
            example: `
Order Service
      ↓
RabbitMQ Queue
      ↓
Email Worker

Order completes immediately,
email is sent asynchronously.
`,
        },
        {
            q: "What is the difference between Kafka and RabbitMQ?",
            a: "RabbitMQ is a message broker focused on reliable message delivery and task distribution. Messages are typically removed after successful consumption. Kafka is an event streaming platform that stores events for a configurable retention period, allowing multiple consumer groups to process the same data independently. RabbitMQ is commonly used for work queues and background jobs, while Kafka is preferred for event-driven systems, analytics pipelines, auditing, and high-throughput data processing.",
            whyUse: "This comparison helps determine whether a system requires task processing, event streaming, replay capability, or multiple independent consumers.",
            example: `
RabbitMQ:
Producer → Queue → One Consumer

Kafka:
Producer → Topic
              ↓
         Analytics
              ↓
         Inventory
              ↓
         Notifications
`,
        },
        {
            q: "What is the Circuit Breaker Pattern?",
            a: "The Circuit Breaker pattern protects applications from repeatedly calling failing services. It monitors failures and temporarily stops requests to an unhealthy dependency when a threshold is exceeded. This prevents cascading failures, reduces resource exhaustion, and allows the failing service time to recover. Circuit breakers typically operate in three states: Closed, where requests flow normally; Open, where requests are blocked; and Half-Open, where limited requests are allowed to test recovery.",
            whyUse: "Used in microservices and distributed systems to improve resilience, reduce downtime, and prevent failure propagation.",
            example: `
CLOSED
   ↓
Failures Increase
   ↓
OPEN
   ↓
Recovery Check
   ↓
HALF-OPEN
   ↓
Success → CLOSED
Failure → OPEN
`,
        },
        {
            q: "What is the difference between Retry and Circuit Breaker?",
            a: "Retry and Circuit Breaker are resilience patterns used to handle failures in distributed systems, but they solve different problems. Retry attempts a failed request again because the failure may be temporary, such as a network glitch or brief service restart. Circuit Breaker protects the system from repeatedly calling a service that is consistently failing by temporarily blocking requests until the service recovers. Retry focuses on recovery from transient failures, while Circuit Breaker focuses on preventing cascading failures and resource exhaustion.",
            whyUse: "These patterns are commonly used together in microservices to improve reliability, fault tolerance, and system stability.",
            example: `
Request
   ↓
Retry (3 Attempts)
   ↓
Still Failing
   ↓
Circuit Breaker Opens
   ↓
Fallback Response
`,
        },
        {
            q: "What is the Timeout Pattern?",
            a: "The Timeout Pattern limits how long a service waits for a response from another service or resource. If the response does not arrive within the configured time, the request fails immediately. This prevents threads, connections, and resources from being blocked indefinitely. Timeouts are one of the most important resilience mechanisms because they stop slow services from causing system-wide performance issues.",
            whyUse: "Used to prevent thread exhaustion, reduce latency, improve responsiveness, and protect services from slow dependencies.",
            example: `
Order Service
      ↓
Payment Service

Timeout = 3 Seconds

No Response
      ↓
Request Fails Fast
`,
        },
        {
            q: "What is the Bulkhead Pattern?",
            a: "The Bulkhead Pattern isolates resources such as thread pools, connection pools, or service instances so that failures in one component do not affect others. The concept comes from ship compartments, where flooding in one section does not sink the entire vessel. By allocating separate resources to different services or operations, critical functionality remains available even when non-critical components become overloaded or fail.",
            whyUse: "Used to improve fault isolation, system resilience, and resource management in distributed systems and microservices.",
            example: `
Payment Pool      → 40 Threads
Inventory Pool    → 30 Threads
Notification Pool → 30 Threads

Notification Failure
      ↓
Payment Continues Working
`,
        },
        {
            q: "What is the Saga Pattern?",
            a: "The Saga Pattern is a distributed transaction management approach used in microservices. Instead of relying on a single ACID transaction across multiple databases, a business process is divided into a series of local transactions. If one step fails, compensating actions are executed to undo previously completed steps. This approach provides eventual consistency while avoiding the complexity and performance issues of distributed transactions.",
            whyUse: "Used in microservices for order processing, payments, inventory management, booking systems, and workflows spanning multiple services.",
            example: `
Create Order
      ↓
Reserve Inventory
      ↓
Process Payment

Payment Failed
      ↓
Release Inventory
      ↓
Cancel Order
`,
        },
        {
            q: "Why can't we use traditional database transactions in Microservices?",
            a: "Traditional ACID transactions work effectively within a single database but become difficult across multiple independent databases owned by different microservices. Distributed transaction protocols such as Two-Phase Commit introduce coordination overhead, locking issues, reduced availability, and scalability challenges. Because microservices prioritize independence and scalability, most systems adopt eventual consistency patterns such as Saga instead of distributed ACID transactions.",
            whyUse: "Understanding this limitation is essential when designing distributed systems, event-driven architectures, and microservice-based applications.",
            example: `
Order Service Database
          ↓
Payment Service Database
          ↓
Inventory Service Database

Single ACID Transaction
Not Practical Across All Services

Use Saga Pattern Instead
`,
        },
        {
            q: "What is the difference between Choreography and Orchestration Saga?",
            a: "Choreography and Orchestration are two approaches for implementing the Saga Pattern in microservices. In Choreography, there is no central coordinator. Services communicate by publishing and subscribing to events, and each service decides what action to take when it receives an event. In Orchestration, a dedicated coordinator controls the workflow and explicitly tells each service what action to perform. Choreography provides loose coupling and flexibility, while Orchestration offers better visibility, monitoring, and easier debugging for complex workflows.",
            whyUse: "Choosing between these approaches depends on workflow complexity, team preferences, observability requirements, and system scale.",
            example: `
Choreography:
Order Created Event
        ↓
Inventory Service
        ↓
Payment Service
        ↓
Notification Service

Orchestration:
Saga Orchestrator
        ↓
Order Service
        ↓
Inventory Service
        ↓
Payment Service
`,
        },
        {
            q: "What happens if the Payment Service fails after Inventory is reduced?",
            a: "In a microservices architecture, a traditional rollback is not possible across multiple services. Instead, the Saga Pattern triggers compensating transactions. If inventory has already been reserved and the payment step fails, compensation actions are executed to restore the inventory and cancel the order. This ensures that the system eventually reaches a consistent state even though part of the workflow was completed before the failure occurred.",
            whyUse: "This scenario is one of the most common examples used to explain distributed transactions and Saga-based recovery mechanisms.",
            example: `
Create Order
      ↓
Reserve Inventory
      ↓
Payment Failed
      ↓
Restore Inventory
      ↓
Cancel Order
`,
        },
        {
            q: "What is Eventual Consistency?",
            a: "Eventual Consistency is a consistency model where updates may not be reflected immediately across all services or databases, but the system guarantees that all components will eventually reach the same state. This approach is commonly used in distributed systems and microservices because it improves scalability and availability. During the synchronization period, different services may temporarily display different versions of the same data.",
            whyUse: "Used in distributed systems, event-driven architectures, microservices, search indexing, analytics platforms, and large-scale cloud applications.",
            example: `
Order Created
      ↓
Order Service Updated

Inventory Service Updated Later
      ↓
Analytics Updated Later
      ↓
All Services Consistent
`,
        },
        {
            q: "Why is a Shared Database considered bad in Microservices?",
            a: "A shared database creates tight coupling between services because multiple services depend on the same schema and data structures. Changes made by one team can impact other services, making deployments more difficult and reducing service independence. Shared databases also create scalability bottlenecks and increase the blast radius of failures. The preferred approach is Database Per Service, where each service owns its data and exposes it through APIs.",
            whyUse: "Understanding this anti-pattern is important when designing truly independent microservices that can evolve and scale separately.",
            example: `
Bad:

User Service
      ↓
 Shared Database
      ↑
Order Service

Good:

User Service → User Database
Order Service → Order Database
`,
        },
        {
            q: "What is Idempotency in Microservices?",
            a: "Idempotency means that performing the same operation multiple times produces the same result as performing it once. It is critical in distributed systems because retries, duplicate requests, and message redelivery are common. By using techniques such as idempotency keys, unique constraints, or event deduplication, systems can safely handle duplicate operations without causing unintended side effects like double payments or duplicate orders.",
            whyUse: "Used to make APIs, message processing systems, payment systems, and distributed workflows safe and reliable.",
            example: `
POST /payments

Idempotency-Key:
payment-order-123

First Request:
Payment Processed

Duplicate Request:
Returns Previous Result
(No Double Charge)
`,
        },
        {
            q: "How do Microservices handle Authentication?",
            a: "Microservices commonly use JWT-based authentication with authentication centralized at an API Gateway or dedicated Auth Service. Users authenticate once and receive a signed token containing identity and authorization information. The token is included in subsequent requests and validated before access is granted. This approach is stateless, scalable, and eliminates the need for shared session storage across services.",
            whyUse: "Used in distributed systems, cloud-native applications, SaaS platforms, mobile backends, and enterprise APIs.",
            example: `
Client Login
      ↓
Auth Service
      ↓
JWT Issued
      ↓
API Gateway Validates JWT
      ↓
Microservices Access Granted
`,
        },
        {
            q: "If the Payment Service is down, what strategies would you use?",
            a: "When a Payment Service becomes unavailable, multiple resilience patterns should be applied together. First, a timeout should prevent requests from waiting indefinitely. Retries with exponential backoff can recover from temporary failures. If failures continue, a Circuit Breaker should open and stop forwarding requests to avoid cascading failures. Fallback mechanisms can queue payments for later processing or return a meaningful response to users. Bulkheads should isolate payment-related resources from other services, and monitoring systems should immediately alert engineers about the outage.",
            whyUse: "Used in production microservices to maintain system availability, improve fault tolerance, and minimize the impact of downstream service failures.",
            example: `
Client Request
      ↓
Timeout
      ↓
Retry (3 Attempts)
      ↓
Circuit Breaker
      ↓
Fallback Response
`,
        },
        {
            q: "An Order Service receives 10,000 requests per minute. How will you handle it?",
            a: "To handle high traffic, I would design the Order Service to be stateless and horizontally scalable. Multiple instances would run behind a load balancer, and auto-scaling would increase capacity based on CPU, memory, or queue metrics. Frequently accessed data would be cached using Redis, asynchronous operations would be moved to RabbitMQ or Kafka, and database performance would be optimized through indexing, connection pooling, and read replicas. Monitoring and observability tools would be used to identify bottlenecks and ensure stable performance under load.",
            whyUse: "Used when building scalable APIs, e-commerce platforms, SaaS products, and high-traffic distributed systems.",
            example: `
Load Balancer
      ↓
Order Service Pods
      ↓
Redis Cache
      ↓
Database Cluster
`,
        },
        {
            q: "How do you prevent duplicate Order creation?",
            a: "Duplicate order creation can occur due to retries, network failures, message redelivery, or users submitting the same request multiple times. The most reliable solution is to use idempotency keys so that repeated requests return the same result instead of creating new orders. Additional protection can be implemented through database unique constraints, distributed locks using Redis, and order status validation. Frontend safeguards such as disabling submit buttons improve user experience but should never be the only protection mechanism.",
            whyUse: "Used in payment systems, checkout flows, booking platforms, and APIs where duplicate processing can cause financial or business issues.",
            example: `
POST /orders

Idempotency-Key:
order-123

Duplicate Request
      ↓
Returns Existing Order
`,
        },
        {
            q: "How would you send emails after Order placement?",
            a: "Email sending should be performed asynchronously rather than during the main order-processing flow. After the order is successfully created, the Order Service publishes an event or message to a queue. An Email Service consumes the message and sends the email independently. This approach improves response times, prevents email failures from affecting order creation, and allows retries and dead-letter queues to handle delivery failures reliably.",
            whyUse: "Used for order confirmations, notifications, invoices, password resets, and other non-critical background tasks.",
            example: `
Order Service
      ↓
RabbitMQ Queue
      ↓
Email Service
      ↓
Customer Email
`,
        },
        {
            q: "How would you design an E-Commerce Checkout Flow?",
            a: "A scalable checkout flow typically involves multiple microservices such as Order, Inventory, Payment, and Notification services. The client sends a request through an API Gateway, which handles authentication and routing. The Order Service creates a pending order, Inventory Service reserves stock, and Payment Service processes payment. If all steps succeed, the order is confirmed and asynchronous events trigger notifications and analytics updates. If any critical step fails, a Saga Pattern executes compensation actions to maintain consistency across services.",
            whyUse: "This design demonstrates how microservices, messaging, resilience patterns, and distributed transaction management work together in real-world systems.",
            example: `
Client
   ↓
API Gateway
   ↓
Order Service
   ↓
Inventory Service
   ↓
Payment Service

Success:
Order Confirmed

Failure:
Saga Compensation
`,
        },
    ],
}

export default microserviceData;