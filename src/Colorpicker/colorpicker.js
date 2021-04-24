import ColorPicker from "@radial-color-picker/react-color-picker";
import "@radial-color-picker/react-color-picker/dist/react-color-picker.min.css";
import React, { useState } from "react";
import Key from "./../Key/key"

export default function Colorpicker(){
    const [color, setColor] = useState({
        hue: 90,
        saturation: 100,
        luminosity: 50,
        alpha: 1,
    });

    const onInput = hue => {
        setColor(prev => {
            return {
                ...prev,
                hue,
            };
        });
    };
    
    return( 
    <div>
    <ColorPicker {...color} onInput={onInput} />
    <Key name="A" bgcolor ={color}/>
    </div>
    );
}