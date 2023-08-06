const app = require("express")();

const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("User Connected ", socket.id);

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  socket.on("leave-room", (room) => {
    socket.leave(room);
    console.log(`User with ID: ${socket.id} left room: ${room}`);
  });

  socket.on("send-message", (msg) => {
    console.log({ msg });
    socket.to(msg.room).emit("receive-message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.io);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
