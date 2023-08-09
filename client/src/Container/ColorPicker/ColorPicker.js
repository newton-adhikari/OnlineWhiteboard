import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import Whiteboard from "../Whiteboard/Whiteboard";
import whiteboardService from "../../services/whiteboardService";
import "./ColorPicker.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ColorPicker = () => {
    const [whiteboardColor, setWhiteboardColor] = useState("");
    const [isTokenVerified, setIsTokenVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState("");

    useEffect(() => {
        // Retrieve the token from local storage
        const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));

        // Make an axios GET request with the token in the authorization header
        whiteboardService.getWhiteboard(token)
        .then(response => {
            setIsTokenVerified(true);
        })
        .catch(error => {
            toast.error('Invalid token or token expired', {
                position: toast.POSITION.TOP_CENTER,
            });          
            setIsTokenVerified(false);

        })
        .finally(() => {
            setIsLoading(false);
            setName(localStorage.getItem("name"));
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

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
                    <p>Username: {name}</p>
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