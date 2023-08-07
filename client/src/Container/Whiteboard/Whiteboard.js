import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./Whiteboard.css";

const Whiteboard = ({color}) => {
    const [socket, setSocket] = useState();
    const [boardContent, setBoardContent] = useState(null);
    let timeout;
    
    useEffect(() => {
        const sock = io(`http://localhost:12222`);
        setSocket(sock);
    
        //cleanup
        return () => {
            sock.disconnect();
        }
    }, []);

    // to draw when the another user draws something
    useEffect(() => {
        if (socket == null) return;

        socket.on("boardContent", content => {
            setBoardContent(content);
            let image = new Image();
            let canvas = document.querySelector("#wboard");
            let ctx = canvas.getContext("2d");
            image.onload = () => {
                ctx.drawImage(image, 0, 0);
            };

            image.src = content;
        })
    }, [socket])


    // to feed to the backend
    useEffect(() => {
        if(socket == null || boardContent == null) return;
        socket.emit("boardContent", boardContent);
    }, [boardContent, socket]) // for evey connected user
    
    useEffect(() => {
        drawOnscreen();

        if(boardContent) {
            let image = new Image();
            let canvas = document.querySelector("#wboard");
            let ctx = canvas.getContext("2d");
            image.onload = () => {
                ctx.drawImage(image, 0, 0);
            }
            image.src = boardContent;
        }
    }, [color])
    
    const drawOnscreen = () => {
        let canvas = document.querySelector("#wboard");
        let ctx = canvas.getContext("2d"); // only for drawing on screen as pointer follows
    
        let whiteboard = document.querySelector("#whiteboard");
        let style = window.getComputedStyle(whiteboard);
        canvas.width = parseInt(style.getPropertyValue("width"));
        canvas.height = parseInt(style.getPropertyValue("height"));
    
        let currentPosition = {x: 0, y: 0}
        let lastPosition = {x: 0, y: 0};
    
        canvas.addEventListener("mousemove", function(e) {
            lastPosition.x = currentPosition.x;
            lastPosition.y = currentPosition.y;
    
    
            // update current mouse positon
            currentPosition.x = e.pageX - this.offsetLeft;
            currentPosition.y = e.pageY - this.offsetTop;
        }, false)
    
    
        ctx.lineWidth = 5;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = color;

        canvas.addEventListener("mousedown", () => {
            canvas.addEventListener("mousemove", onPaint, false);
        })

        canvas.addEventListener("mouseup", () => {
            canvas.removeEventListener("mousemove", onPaint, false);
        })
    
        const onPaint = () => {
            ctx.beginPath();
            ctx.moveTo(lastPosition.x, lastPosition.y);
            ctx.lineTo(currentPosition.x, currentPosition.y);
            ctx.closePath();
            ctx.stroke();
            if (timeout !== undefined) {
                clearTimeout(timeout);
            }
    
            timeout = setTimeout(() => {
                let content = canvas.toDataURL("image/png");
                setBoardContent(content);
            },1000)
        }
    }

    console.log(color);
    return <>
        <div id="whiteboard" className="whiteboard">
            <canvas className="wboard" id="wboard" />
        </div>
    </>
}

export default Whiteboard;