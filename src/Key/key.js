import React, {useEffect,useState} from "react"
import "./key.css";
export default function Key(props){
    const [color, setColor] = useState(null);

    useEffect(() => {
        window.addEventListener("click", setColor(props.bgcolor));
        return() => {
            window.removeEventListener("click", setColor(null));
        };
    },[setColor]);
    let hsl = "hsl("+props.bgcolor.hue+", "+props.bgcolor.saturation+"%, "+props.bgcolor.luminosity+"%)";
    const onClick = ()=>{
        setColor(props.bgcolor);
        console.log(props.bgcolor);
        hsl =
          "hsl(" +
          props.bgcolor.hue +
          ", " +
          props.bgcolor.saturation +
          "%, " +
          props.bgcolor.luminosity +
          "%)";
        console.log(hsl);
    }
    
    return (
      <div
        className="Key"
        style={{ backgroundColor: hsl }}
        onClick={onClick}
      >
        <span>{props.name}</span>
      </div>
    );
}