import React, { useState } from "react";
import Whiteboard from "../Whiteboard/Whiteboard";
import "./ColorPicker.css";

const ColorPicker = () => {
    const [whiteboardColor, setWhiteboardColor] = useState("");

    return (
        <div className="container">
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
    )
}

export default ColorPicker;