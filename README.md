## System Architecture

```mermaid
flowchart TB

Client[Client Apps<br/>Web / Mobile]

API[Node.js API Server<br/>Express + TypeScript]

DB[(PostgreSQL<br/>Primary Database)]
Redis[(Redis<br/>Cache & Cart Storage)]

Queue[BullMQ Workers<br/>Background Jobs]

S3[(Amazon S3<br/>Product Images)]

Payment[Razorpay<br/>Payment Gateway]

Webhook[Payment Webhook Handler]

Client --> API

API --> DB
API --> Redis
API --> S3
API --> Payment

Payment --> Webhook
Webhook --> API

API --> Queue
Queue --> DB

```

## Order Processing Flow

```mermaid
sequenceDiagram
participant User
participant API
participant Inventory
participant Payment
participant Webhook
participant Queue

User->>API: Checkout Request
API->>Inventory: Reserve Stock
API->>Payment: Create Payment Order
Payment-->>User: Payment Page

Payment->>Webhook: Payment Success
Webhook->>API: Verify Signature
API->>Inventory: Deduct Stock
API->>Queue: Send Order Confirmation Email
```# ecommerce-backend
