const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//prebuilt io methods to establish connections
io.on("connect", socket => {
  console.log("new connect!");

  socket.on("join", ({userName, room}, cb) => {
    console.log(userName, room);

    cb();
  })

  socket.on("disconnect", ({userName, room}) => {
    console.log("user left");
  });
});

const router = require("./router");

app.use(router);

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
