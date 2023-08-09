import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import Whiteboard from "../Whiteboard/Whiteboard";
import whiteboardService from "../../services/whiteboardService";
import "./ColorPicker.css";

const ColorPicker = () => {
    const [whiteboardColor, setWhiteboardColor] = useState("");
    const [isTokenVerified, setIsTokenVerified] = useState(false);


    useEffect(() => {
        // Retrieve the token from local storage
        const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));

        console.log(token);
        // Make an axios GET request with the token in the authorization header
        whiteboardService.getWhiteboard(token)
        .then(response => {
            console.log(response.data);
            setIsTokenVerified(true);
        })
        .catch(error => {
            console.log("invalid token or token expired");
            console.error('Error fetching board content:', error);
            setIsTokenVerified(false);

        });
    }, []);


    // make an axios get request to the backend with the token from local storage
    return (
        <div className="container">
        {isTokenVerified ? (
            <div>
                <div className="color-picker">
                    <input
                        value={whiteboardColor}
                        type="color"
                        onChange={({target}) => setWhiteboardColor(target.value)}
                    />
                </div>
                <div className="drawing-board">
                    <Whiteboard color={whiteboardColor} />
                </div>
            </div>
        ) : (
            <Redirect to="/" />
        )}
    </div>    );
};

export default ColorPicker;