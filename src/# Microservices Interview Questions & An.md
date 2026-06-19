# Microservices Interview Questions & Answers

## Beginner Level Questions

---

### 1. What are Microservices?

**Answer:**

Microservices is an architectural style where an application is divided into small, independent services. Each service focuses on a specific business capability and can be developed, deployed, and scaled independently.

---

### 2. Difference Between Monolith and Microservices?

| Monolith           | Microservices          |
| ------------------ | ---------------------- |
| Single codebase    | Multiple services      |
| Single deployment  | Independent deployment |
| Shared database    | Database per service   |
| Difficult to scale | Easy to scale          |

**Advantages of Microservices:**

* Independent deployment
* Better scalability
* Technology flexibility
* Fault isolation

**Disadvantages:**

* Complex architecture
* Network latency
* Distributed transactions

---

### 3. Why Do Companies Use Microservices?

**Answer:**

* Faster deployments
* Better scalability
* Independent development teams
* Better fault tolerance
* Easier maintenance of large systems

---

### 4. What Are the Disadvantages of Microservices?

**Answer:**

* Increased complexity
* Service communication challenges
* Distributed data management
* Monitoring difficulties
* More infrastructure requirements

---

### 5. What Is Database Per Service Pattern?

**Answer:**

Each microservice owns its own database.

Example:

User Service → User DB

Order Service → Order DB

Payment Service → Payment DB

Benefits:

* Loose coupling
* Independent deployment
* Better scalability

---

### 6. What Is API Gateway?

**Answer:**

API Gateway acts as a single entry point for all client requests.

Responsibilities:

* Request routing
* Authentication
* Authorization
* Rate limiting
* Logging
* Response aggregation

---

### 7. Why Is API Gateway Needed?

**Answer:**

Without API Gateway, clients need to know all service URLs and ports.

API Gateway:

* Hides service locations
* Simplifies client communication
* Centralizes security and routing logic

---

### 8. What Is Service Discovery?

**Answer:**

Service Discovery helps services dynamically locate each other without hardcoded IP addresses and ports.

Examples:

* Eureka
* Consul
* Kubernetes Service Discovery

---

### 9. What Is Inter-Service Communication?

**Answer:**

Communication between microservices using:

* REST APIs
* gRPC
* RabbitMQ
* Kafka

---

### 10. Difference Between Synchronous and Asynchronous Communication?

**Synchronous Communication (REST):**

Order Service → Payment Service → Wait for Response

Used when immediate response is required.

**Asynchronous Communication (RabbitMQ/Kafka):**

Order Service → Queue → Payment Service

Used when services can process requests later.

---

## Intermediate Level Questions

---

### 11. REST vs RabbitMQ vs Kafka?

| REST               | RabbitMQ           | Kafka           |
| ------------------ | ------------------ | --------------- |
| Synchronous        | Asynchronous       | Asynchronous    |
| Request/Response   | Queue Based        | Event Streaming |
| Immediate Response | Delayed Processing | High Throughput |

---

### 12. When Would You Use RabbitMQ?

**Answer:**

RabbitMQ is useful for:

* Email notifications
* Order processing
* Background jobs
* Task queues
* Decoupled communication

---

### 13. Kafka vs RabbitMQ?

**RabbitMQ**

* Queue-based system
* Removes messages after processing
* Easier setup

**Kafka**

* Event streaming platform
* Retains messages
* Supports very high throughput

**Examples**

RabbitMQ:

* Email service
* Notification service

Kafka:

* Analytics
* Real-time tracking
* Event sourcing

---

### 14. What Is Circuit Breaker Pattern?

**Answer:**

Circuit Breaker prevents repeated requests to an unhealthy service.

States:

1. Closed
2. Open
3. Half Open

Benefits:

* Prevents cascading failures
* Improves system resilience

---

### 15. Difference Between Retry and Circuit Breaker?

**Retry**

Attempts request again.

Example:

Attempt 1 Failed

Attempt 2 Failed

Attempt 3 Success

**Circuit Breaker**

Stops calling failing service after threshold failures.

**Interview Answer:**

Retry helps recover from temporary failures while Circuit Breaker protects the system from continuously calling unhealthy services.

---

### 16. What Is Timeout Pattern?

**Answer:**

Stops waiting for a service response after a specified time.

Example:

If Payment Service does not respond within 3 seconds, the request fails.

Benefits:

* Improves responsiveness
* Prevents thread blocking

---

### 17. What Is Bulkhead Pattern?

**Answer:**

Bulkhead isolates resources so failure in one service does not impact others.

Example:

* Payment Thread Pool
* Inventory Thread Pool
* Notification Thread Pool

If Notification Service crashes, Payment Service continues working.

---

### 18. What Is Saga Pattern?

**Answer:**

Saga Pattern manages distributed transactions across multiple microservices using compensation actions.

Example:

1. Create Order
2. Reserve Inventory
3. Process Payment

If Payment fails:

1. Restore Inventory
2. Cancel Order

---

### 19. Why Can't We Use Traditional Database Transactions in Microservices?

**Answer:**

Traditional ACID transactions work within a single database.

In microservices:

* Each service owns its own database.
* A single transaction cannot span multiple databases.

Solution:

Saga Pattern

---

### 20. Choreography vs Orchestration Saga?

#### Choreography

Services communicate using events.

Example:

Order Created Event

↓

Inventory Service

↓

Payment Service

Advantages:

* Decentralized
* No central coordinator

---

#### Orchestration

A central service controls workflow.

Example:

Saga Orchestrator

↓

Order Service

↓

Inventory Service

↓

Payment Service

Advantages:

* Easier to manage
* Better visibility

---

### 21. What Happens If Payment Service Fails After Inventory Is Reduced?

**Answer:**

Compensation transactions are executed:

* Restore Inventory
* Cancel Order

This ensures data consistency.

---

### 22. What Is Eventual Consistency?

**Answer:**

Data may not be immediately consistent across services but becomes consistent eventually.

Example:

Order Service updated.

Inventory Service update pending.

After processing completes, all services become consistent.

---

### 23. Why Is Shared Database Considered Bad in Microservices?

**Answer:**

Problems:

* Tight coupling
* Deployment dependencies
* Difficult scaling
* Schema conflicts

Preferred approach:

Database Per Service

---

### 24. What Is Idempotency?

**Answer:**

Multiple identical requests produce the same result.

Example:

User clicks payment button twice.

Without Idempotency:

Payment charged twice.

With Idempotency:

Payment charged once.

Implementation:

Use Idempotency Key or Unique Transaction ID.

---

### 25. How Do Microservices Handle Authentication?

**Answer:**

Typically using JWT.

Flow:

Client

↓

API Gateway

↓

JWT Validation

↓

Microservices

Benefits:

* Centralized authentication
* Reduced duplicate logic

---

### 26. Suppose Payment Service Is Down. What Will You Do?

**Answer:**

Use:

* Circuit Breaker
* Retry Mechanism
* Timeout
* Fallback Response
* Monitoring Alerts

---

### 27. Suppose Order Service Receives 10,000 Requests Per Minute. How Will You Handle It?

**Answer:**

* Horizontal Scaling
* Load Balancer
* Redis Caching
* RabbitMQ/Kafka
* Auto Scaling

---

### 28. How Do You Prevent Duplicate Order Creation?

**Answer:**

Use:

* Idempotency Keys
* Unique Transaction IDs
* Database Constraints

---

### 29. How Would You Send Emails After Order Placement?

**Answer:**

Order Service publishes message.

RabbitMQ Queue receives message.

Email Service consumes message and sends email.

Benefits:

* Decoupled architecture
* Better scalability

---

### 30. How Would You Design an E-Commerce Checkout Flow?

**Answer:**

Architecture:

Client

↓

API Gateway

↓

Order Service

↓

Inventory Service

↓

Payment Service

↓

Notification Service

Concepts Used:

* API Gateway
* Service Discovery
* RabbitMQ/Kafka
* Saga Pattern
* Circuit Breaker
* Redis
* Docker
* Kubernetes

Failure Handling:

If Payment fails:

* Restore Inventory
* Cancel Order

using Saga Compensation Transactions.
