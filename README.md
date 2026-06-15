# Handling Multiple TCP Clients in Node.js

This project demonstrates how a TCP server can handle multiple clients using Node.js and the built-in `net` module.

## Overview

A TCP server can accept connections from multiple clients at the same time. Each connected client gets its own socket object. The server stores all connected sockets in an array and can send messages to one or all clients.

This is the basic idea behind chat applications, multiplayer games, live notifications, and real-time communication systems.

---

## Creating the Server

```js
import net from "net";

const clientList = [];

const server = net.createServer((socket) => {
    clientList.push(socket);

    console.log("New client connected");
    console.log(`Total Clients: ${clientList.length}`);
});

server.listen(4000, () => {
    console.log("Server running on port 4000");
});
```

### How it Works

1. `net.createServer()` creates a TCP server.
2. Every new connection creates a new socket.
3. The socket is stored in `clientList`.
4. The server can communicate with all connected clients.

---

## Taking Input from the Server Terminal

```js
process.stdin.on("data", (input) => {
    clientList.forEach((socket) => {
        socket.write(input);
    });
});
```

### What Happens?

1. Server reads keyboard input.
2. The message is sent to every connected client.
3. All clients receive the same message.

Example:

```text
Server Input:
Hello Everyone

Client 1:
Hello Everyone

Client 2:
Hello Everyone

Client 3:
Hello Everyone
```

This process is called **broadcasting**.

---

## Creating a Client

```js
import net from "net";

const socket = net.createConnection({
    host: "192.168.1.10",
    port: 4000
});

socket.on("data", (data) => {
    console.log(data.toString());
});
```

### Sending Messages to the Server

```js
process.stdin.on("data", (input) => {
    socket.write(input);
});
```

### Flow

```text
Keyboard
   ↓
process.stdin
   ↓
socket.write()
   ↓
Server
```

---

## Handling Messages from Clients

```js
socket.on("data", (data) => {
    console.log(data.toString());
});
```

When a client sends a message, the server receives it through the socket associated with that client.

---

## Broadcasting Client Messages

```js
socket.on("data", (data) => {

    clientList.forEach((client) => {
        client.write(data);
    });

});
```

### Flow

```text
Client 1
   ↓
Server
   ↓
Client 1
Client 2
Client 3
```

Now every connected client receives the message.

---

## Understanding Sockets

Every connected client gets a unique socket.

Example:

```text
Client 1 → Socket A
Client 2 → Socket B
Client 3 → Socket C
```

The server uses these sockets to send and receive data.

You can inspect a socket using:

```js
console.log(socket);
```

Each socket contains:

* Remote IP Address
* Remote Port
* Local Port
* Connection State
* Read/Write Streams

---

## TCP is Stateful

TCP remembers connection information.

```text
Client
   ↓
Connected
   ↓
Send Message
   ↓
Send Message Again
   ↓
Same Connection
```

TCP keeps track of:

* Source IP
* Destination IP
* Source Port
* Destination Port
* Sequence Numbers
* Connection State

Because TCP maintains connection information, it is called **stateful**.

---

## HTTP is Stateless

HTTP works differently.

```text
Browser
   ↓
Request
   ↓
Server
   ↓
Response
```

After sending the response, the request is completed.

The next request is treated independently.

Because the server does not automatically remember previous requests, HTTP is called **stateless**.

---

## Testing with Multiple Devices

You can run:

```bash
node server.js
```

on your laptop and:

```bash
node client.js
```

on multiple devices such as:

* Laptop
* Mobile (Termux)
* Another PC

As long as they can reach the server's IP address, they can communicate through the TCP server.

---

## Real-World Applications

The same concept is used in:

* Chat Applications
* WhatsApp
* Discord
* Multiplayer Games
* Live Notifications
* WebSocket Servers
* Real-Time Monitoring Systems

---

## Key Takeaways

* A TCP server can handle multiple clients.
* Each client gets its own socket.
* The server stores client sockets in an array.
* Messages can be broadcast to all connected clients.
* TCP is stateful because it maintains connection information.
* This architecture forms the foundation of real-time communication systems.
