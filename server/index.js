const http = require('http');
const socketIo = require('socket.io');
const PORT = process.env.PORT || 12222;

const io = socketIo(PORT, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
  console.log("whiteboard online");

  socket.on("boardContent", content => {
    socket.broadcast.emit("boardContent", content);
  })
});

console.log(`server listening on port ${PORT}`);