const http = require('http');
const socketIo = require('socket.io');

const app = require("./app");
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 12222;

io.on("connection", (socket) => {
  console.log("whiteboard online");

  socket.on("boardContent", content => {
    socket.broadcast.emit("boardContent", content);
  });
});

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
