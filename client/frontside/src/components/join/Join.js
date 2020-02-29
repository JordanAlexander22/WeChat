import React, { useState } from "react";
import { Link } from "react-router-dom"; //react hooks for this app

const Join = () => {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

return(
    <div className= "Container">
        <div className= "innerContainer">
            <h1 className= "heading"> Join </h1>
            <div><input placeholder= "Username" className= "joinInput" type= "text" onChange={(e) => setUserName(e.target.value)} /></div>
            <div> <input placeholder= "Room" className= "joinInput mt-20" type="text" onChange={(e) => setRoom(e.target.value)} /></div>
            {/* passing state through query rather than props */}
            <Link onClick= {e => (!userName) || !room ? e.preventDefault() : null } to={`/chat?userName=${userName}&room=${room}`} > 
                <button className="button mt-20" type="submit"> SignIn</button>
            </Link>
        </div>
    </div>
)
  };

export default Join;
