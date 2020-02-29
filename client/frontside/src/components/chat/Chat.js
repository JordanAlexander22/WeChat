import React, {useState, useEffect} from 'react';  //hooks and lifecycle method
import queryString from 'query-string'; //retriving the data from the url 
import io from 'socket.io-client';


let socket;


//location comes built in to react router 
const Chat = ({location}) => {

    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState("");
    const ENDPOINT= "localhost:5000";

    
    useEffect(() => {
       const {userName, room}= queryString.parse(location.search);

       socket= io(ENDPOINT);

       setUserName(userName);
       setRoom(room);

       console.log(socket)
    })
    
    return(
        <h1>Chat component</h1>
    )
}


export default Chat;