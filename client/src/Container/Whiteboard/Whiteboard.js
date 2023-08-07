import React, { useState } from "react";
import io from "socket.io-client";
import "./Whiteboard.css";

const [socket, setSocket] = useState()

const Whiteboard = ({color}) => {
    console.log(color);
    return <>
        <div id="whiteboard" className="whiteboard">
            <canvas className="wboard" id="wboard" />
        </div>
    </>
}

export default Whiteboard;