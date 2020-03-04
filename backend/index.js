const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const {addUser, removeUser, getUser, getUsersinRoom }= require("./users");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//prebuilt io methods to establish connections
io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, cb) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return cb(error);

    socket.join(user.room);

    socket.emit("message", { user: "admin", text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit("message", { user: 'admin', text: `${user.name} has joined!` });
    
    cb();
  })

  socket.on("sendMessage", (message, cb) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", {user: user.name, text: message})

    cb()
  })


  socket.on("disconnect", ({user, room}) => {
    console.log("user left");
  });
});

const router = require("./router");

app.use(router);

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
