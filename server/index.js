const http = require('http');
const socketIo = require('socket.io');
const PORT = process.env.PORT || 12222;

const io = socketIo(PORT, {
    cors: {
        origin: "http://localhost:62750",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
  console.log("jamboard online");
});

console.log(`server listening on port ${PORT}`);