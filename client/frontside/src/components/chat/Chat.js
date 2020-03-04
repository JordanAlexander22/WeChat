import React, { useState, useEffect } from "react"; //hooks and lifecycle method
import queryString from "query-string"; //retriving the data from the url
import io from "socket.io-client";

let socket;

//location comes built in to react router
const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");

      socket.off(); // basic setup for users joining
    };
  }, [ENDPOINT, location.search]);

  
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    })
  }, [messages]);

  //need function for sending messages
  
  
  
  return(
  <h1>Chat component</h1>
  )
}


export default Chat;
