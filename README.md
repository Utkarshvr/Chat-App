How WebSocket and Socket.io address the increasing demand for real-time communication in modern web applications.

Source Code: [https://github.com/Utkarshvr/Chat-App](https://github.com/Utkarshvr/Chat-App)

Before getting started we need to understand what is WebSocket & How is it different from HTTP

## WebSocket

- WebSocket is a computer communications protocol, providing full-duplex communication channels over a single TCP connection.
- The first time when client and server connects it connects with the help of http and then upgraded to another protocol request but that is changed from the HTTP protocol to the WebSocket protocol.
- And once the bi-direction connection is estabilished, it will be open & persistant.
- And if any one side (client or server) chose to close the connection, the connection will be closed from both sides.

## Differnce b/w Http & WebSocket

- Http is a request-response in which the connection is closed after a request from the client to the server or a response from the server to the client. Whereas WebSocket is a real-time, bidirectional, event-driven communication protocol that provides persistent connections between clients and servers.

## Socket.io

- Socket.IO is an event-driven library for real-time web applications. It enables real-time, bi-directional communication between web clients and servers. It consists of two components: a client, and a server. Both components have a nearly identical API.

## Benifits of using socket.io

- By connecting with a WebSocket protocol, we reduce the number of requests we send to the server and only one request is needed and after that connection will be open until disconnected by any one side.
- No need to use http polling (a process in which we send request to a server every few second or minutes to check if there is any additional change in response).
