<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
# shubhamiitbhu-backend
---
# Transport Layer
The transport layer refers to the part of a network architecture responsible for enabling communication between devices or systems. It ensures that data is transferred efficiently, reliably, and securely over a network. In the context of APIs and backend development, the transport layer determines how data is sent and received between clients and servers.

### Components of the Transport Layer:

1. **Protocols**:  
   The transport layer uses protocols to establish communication. The two most common protocols are:
   - **Transmission Control Protocol (TCP)**: A connection-oriented protocol that ensures reliable data transmission, meaning it guarantees that data is delivered in the correct order without any loss. It's widely used for web communication.
   - **User Datagram Protocol (UDP)**: A connectionless protocol that does not guarantee delivery, making it faster but less reliable than TCP. It's useful for real-time applications like video streaming or gaming where speed is more important than reliability.

2. **Data Segmentation**:  
   The transport layer breaks down large data chunks into smaller segments or packets before sending them. When the data arrives at the destination, the layer reassembles the packets back into the original format.

3. **Connection Establishment and Termination**:  
   For protocols like TCP, the transport layer establishes a connection between the sender and receiver (using a handshake process) and terminates the connection after the data transfer is complete.

4. **Error Detection and Correction**:  
   The transport layer handles errors that may occur during data transmission. It checks for packet loss, corruption, or out-of-order packets and requests retransmission if necessary (especially with TCP).

5. **Flow Control**:  
   The transport layer ensures that the sender doesn’t overwhelm the receiver by controlling the rate at which data is sent.

6. **Multiplexing**:  
   The transport layer can handle data from multiple applications or processes at the same time. It assigns different port numbers to different processes so that multiple connections can occur simultaneously.

### Transport Layer in Application Contexts

In your scenario, when generating a resource in NestJS, you're being asked which transport layer to use for communication. Each option corresponds to a different type of data communication protocol:

- **REST API**: This is the traditional method of using HTTP/HTTPS protocols to transfer data. It’s used for standard web APIs where requests and responses are transmitted using HTTP methods (GET, POST, PUT, DELETE, etc.).
  
- **GraphQL (code first / schema first)**: GraphQL is a query language for APIs that allows clients to request exactly the data they need. The difference between code first and schema first is how the GraphQL schema is defined:
  - **Code first**: The schema is generated from code using decorators.
  - **Schema first**: The schema is manually defined, and the code follows that schema.
  
- **Microservice (non-HTTP)**: Microservices communicate using a variety of protocols like **gRPC** or **message queues** (e.g., Kafka, RabbitMQ). These are often used for service-to-service communication in large systems.

- **WebSockets**: This is a full-duplex communication protocol that allows for real-time data exchange, commonly used in applications that need live updates like chat applications, gaming, or financial data feeds.
---
# Key Differences between an API and a REST API:

| **Aspect**                  | **API (General)**                                            | **REST API**                                                           |
|-----------------------------|--------------------------------------------------------------|-------------------------------------------------------------------------|
| **Definition**               | A set of rules allowing software applications to communicate.| A type of API that follows the REST architectural principles.           |
| **Communication Protocols**  | Can use various protocols (e.g., HTTP, SOAP, gRPC, etc.).    | Primarily uses HTTP/HTTPS for communication.                            |
| **Architecture Style**       | No strict rules on architecture, can be RPC, SOAP, etc.      | Follows REST (Representational State Transfer) principles.              |
| **Methods**                  | Depends on the type of API (e.g., SOAP uses POST for all requests). | Utilizes HTTP methods like GET, POST, PUT, DELETE for different operations. |
| **Data Format**              | Can use various formats (e.g., XML, JSON, YAML, etc.).       | Typically uses JSON or XML (but JSON is most common).                   |
| **State**                    | Can be stateful or stateless.                                | Always stateless (no server-side session data).                         |
| **Caching**                  | Not necessarily cacheable.                                  | Supports caching mechanisms to improve performance.                     |
| **Flexibility**              | More flexible in terms of transport and protocols.           | Designed to work over the web, strictly using HTTP as the transport protocol. |
| **Scalability**              | Varies depending on the type of API.                         | Highly scalable due to its stateless nature.                            |
| **Error Handling**           | Error handling varies (e.g., SOAP uses XML for errors).      | Standardized error codes and responses using HTTP status codes (e.g., 404, 500). |
| **Use Case**                 | Can be used for any type of system interaction (local or remote). | Primarily used for web services and communication over the internet.    |

---

Let’s walk through an example using two scenarios to understand where a general API might be used versus where a REST API is more appropriate.

### Example 1: **Local Operating System API (General API)**
Imagine you’re developing a desktop application (e.g., a music player) that needs to interact with the underlying **operating system** to control the computer's sound settings (e.g., volume, mute, etc.). This application uses a **local API** provided by the operating system, like the Windows API, to communicate with the sound hardware.

- **Use Case**: Adjusting system volume.
- **API Type**: General API (e.g., Windows API).
- **Protocol**: No network protocols involved; direct function calls between the software and the OS.
- **Data Format**: Usually binary data, or direct function invocations (no HTTP, JSON, etc.).

This is an example where a general API would be used for direct interaction with local hardware or system resources. There's no need for web protocols like HTTP.

---

### Example 2: **Web Service using REST API**
Now, imagine you're developing an **e-commerce website** where users can browse products, add items to their cart, and make purchases. To fetch product details, manage the shopping cart, and handle payments, the web application communicates with a backend web server using a **REST API**.

- **Use Case**: Retrieve product details from a web server.
- **API Type**: REST API.
- **Protocol**: HTTP (using HTTP methods like `GET`, `POST`).
- **Data Format**: JSON (used for sending product data, such as names, prices, and images).
  
**Example REST API Calls**:
- **GET** `/products` → Fetch all available products (Read).
- **POST** `/cart` → Add a product to the shopping cart (Create).
- **PUT** `/cart/1` → Update the quantity of a product in the cart (Update).
- **DELETE** `/cart/1` → Remove a product from the cart (Delete).

### Comparison:

| **Scenario**                   | **Local Music Player (General API)**                            | **E-commerce Website (REST API)**                                       |
|---------------------------------|-----------------------------------------------------------------|-------------------------------------------------------------------------|
| **Purpose**                     | Interacting with the local system (sound settings).             | Interacting with a remote server to manage products and a shopping cart.|
| **Type of API**                 | General API (e.g., Windows API).                                | REST API (following REST principles, uses HTTP).                        |
| **Communication Protocol**      | No network protocols, direct function calls.                    | HTTP/HTTPS over the web.                                                |
| **Data Format**                 | Binary, or direct function calls.                               | JSON (data interchange between client and server).                      |
| **State Management**            | Stateful interaction (keeps session).                           | Stateless; every request contains all necessary information.            |

### Why Use REST API in the E-commerce Scenario?
1. **Scalability**: The stateless nature of REST APIs allows multiple clients to communicate with the server without worrying about session data.
2. **Platform Agnostic**: A REST API can be consumed by different platforms (web, mobile, etc.) as long as they support HTTP.
3. **Data Exchange**: REST APIs typically use JSON, which is lightweight and easy to parse on different platforms.

### Why Use General API in the Music Player Scenario?
1. **Local Communication**: There’s no need for network communication, as the interaction is with the local operating system.
2. **Low-Level Control**: General APIs provide more direct access to system resources (like sound settings), which REST APIs aren’t designed for.

This example highlights how a **general API** is ideal for interacting with local system resources, while a **REST API** is suited for web-based client-server communication.

