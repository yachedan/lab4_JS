import React, { useState, useReducer, useRef, useEffect, } from "react";
import { SketchPicker } from "react-color";
import "./colorpicker.css";
import logo from "./img.svg";


const initialState = {
  background: "#fff",
  invert: false,
  active: {
    Q: false,
    W: false,
    E: false,
    R: false,
    T: false,
    Y: false,
    U: false,
    I: false,
    O: false,
    P: false,
    "[": false,
    "]":false,
    A: false,
    S: false,
    D: false,
    F: false,
    G: false,
    H: false,
    J: false,
    K: false,
    L: false,
    ';':false,
    "'":false,
    Z:false,
    X:false,
    C: false,
    V: false,
    B: false,
    N: false,
    M: false,
    ',':false,
    '.':false,
    '/':false,
    logo:false
  },
};
const backgroundState = {
    Q: "white",
    W: "white",
    E: "white",
    R: "white",
    T: "white",
    Y: "white",
    U: "white",
    I: "white",
    O: "white",
    P: "white",
    "[": "white",
    "]":"white",
    A: "white",
    S: "white",
    D: "white",
    F: "white",
    G: "white",
    H: "white",
    J: "white",
    K: "white",
    L: "white",
    ';':"white",
    "'":"white",
    Z:"white",
    X:"white",
    C: "white",
    V: "white",
    B: "white",
    N: "white",
    M: "white",
    ',':"white",
    '.':"white",
    '/':"white"
  };
const invertState ={
    Q: false,
    W: false,
    E: false,
    R: false,
    T: false,
    Y: false,
    U: false,
    I: false,
    O: false,
    P: false,
    "[": false,
    "]":false,
    A: false,
    S: false,
    D: false,
    F: false,
    G: false,
    H: false,
    J: false,
    K: false,
    L: false,
    ';':false,
    "'":false,
    Z:false,
    X:false,
    C: false,
    V: false,
    B: false,
    N: false,
    M: false,
    ',':false,
    '.':false,
    '/':false
  };
const groupState = {
  Q: null,
  W: null,
  E: null,
  R: null,
  T: null,
  Y: null,
  U: null,
  I: null,
  O: null,
  P: null,
  "[": null,
  "]": null,
  A: null,
  S: null,
  D: null,
  F: null,
  G: null,
  H: null,
  J: null,
  K: null,
  L: null,
  ";": null,
  "'": null,
  Z: null,
  X: null,
  C: null,
  V: null,
  B: null,
  N: null,
  M: null,
  ",": null,
  ".": null,
  "/": null,
};
export default function Colorpicker(props) {
  /* const [background, setBackground] = useState('#fff');
  const [invert, setInvert] = useState(false);
  const [backgroundPrev, setBackgroundPrev] = useState({
      Q: "white",
      W: "white"
  });
  const [active, setActive] = useState({
      Q: false,
      W: false
  });
  const [change, setChange] = useState(false);
  const [invertPrev, setInvertPrev] = useState({
      Q: false,
      W: false
  }); */
  
function useStickyState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
function useStickyRef(defaultValue, key) {
  const stickyValue = window.localStorage.getItem(key);
  const value = useRef(stickyValue !== null ? JSON.parse(stickyValue) : defaultValue);
  useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value.current));
  }, [key, value,preset]);
  return value;
}

  const [state, dispatch] = useReducer(reducer, initialState);
  const backgroundPrev = useRef(backgroundState);
  const invertPrev = useRef(invertState);
  const groupInputRef = useRef(null);
  const presetInputRef = useRef(null);
  
  const [preset, setPreset] = useStickyState({},'preset');
  const presetRef = useStickyRef({},'presetRef');
  const presetBackgroundRef = useStickyRef({},'presetBackgroundRef');
  const presetInvertRef = useStickyRef({},'presetInvertRef')
  const [group, setGroup] = useState({});
  const [groupSelected, setGroupSelected] = useState();
  const groupRef = useRef(groupState);
  const anotherGroupRef = useRef({});
  
const handleKeyPress = event =>{
    if (document.activeElement.id !== "groupInput" && document.activeElement.id !== "presetInput")
      if (
        state.active[event.key.toUpperCase()] === false &&
        state.active.hasOwnProperty(event.key.toUpperCase())
      )
        dispatch({ type: "active." + event.key.toUpperCase(), value: true });
      else
        dispatch({ type: "active." + event.key.toUpperCase(), value: false });
    else if (document.activeElement.id === "groupInput" && event.key === "Enter"){
      for(const key in state.active)
        if(state.active[key] === true){
          groupRef.current[key] = groupInputRef.current;
          backgroundPrev.current[key] = state.background;
          invertPrev.current[key] = state.invert;
        }
        setGroup({ ...group, [groupInputRef.current]:  state.background });
        anotherGroupRef.current = {...group,[groupInputRef.current]:  state.background }
    }
    else if(document.activeElement.id === "presetInput" && event.key === "Enter"){
      setPreset({...preset, [presetInputRef.current]: {...anotherGroupRef.current}});
      presetRef.current = {...presetRef.current, [presetInputRef.current]: {...groupRef.current}};
      presetBackgroundRef.current = {...presetBackgroundRef.current, [presetInputRef.current]: {...backgroundPrev.current}};
      presetInvertRef.current = {...presetInvertRef.current, [presetInputRef.current]: {...invertPrev.current}};
    }
  };

  useEffect(() => {
    //console.log('hey');
    // for(const key in backgroundPrev.current){
    //   if(state.active[key] === true){
    //     backgroundPrev.current[key] = state.background; 
    //     invertPrev.current[key] = state.invert;
    //   }
    // }
    
      document.addEventListener("keydown", handleKeyPress);
    return() => {
      document.removeEventListener("keydown", handleKeyPress);
    };
    },[state.active,group,backgroundPrev,invertPrev,presetRef]);

  const handleChange = (color) => {
    //setBackground(color.hex);
    dispatch({type: 'background', value: color.hex});
    if (color.hsl.l < 0.2) {
      //setInvert(true);
      dispatch({type:'invert', value: true});
    } else //setInvert(false); 
        dispatch({type:'invert', value:false});
  };
  // const handleChangeComplete = (event) => {
  //   //setChange(true);
  //   dispatch({type: 'change', value: true});
  // };

  const color = (text) => {
    
    return state.active[text]
      ? state.invert
        ? "white"
        : "black"
      : invertPrev.current[text]
      ? "white"
      : "black";
  };
  const outlineColor = (text) => {
    //dispatch({ type: "invertPrev." + text, value: state.invert });
    return state.active[text]
      ? "blue"
      : state.active[text]
      ? state.invert
        ? "white"
        : "black"
      : invertPrev.current[text]
      ? "white"
      : "black";
  };
  const backgroundColor = (text) => {
    //dispatch({ type: "backgroundPrev." + text, value: state.background });
    return state.active[text] ? state.background : backgroundPrev.current[text];
  };
  const handleDeselect = () =>{
    var localState = initialState.active;
    for(const key in localState)
      localState[key] = false;
    dispatch({ type: "active", value: localState});
  }
  
  const handleReset = () =>{
    backgroundPrev.current = backgroundState;
    dispatch({ type: "active", value: initialState.active });
    for (const key in backgroundPrev.current) {
      backgroundPrev.current[key] = "white";
    }
  }
  const handleGroupInput = (event) =>{
    groupInputRef.current = event.target.value;
  }
  const handlePresetInput = (event) =>{
    presetInputRef.current = event.target.value;
  }
  const handleGroupClick = (groupName,color) =>{
    if(groupName !== groupSelected){
    var invert = false;
    var localState = state.active;
    for (const key in groupRef.current) {
      if(groupRef.current[key] === groupName){
        localState[key] = true;
        backgroundPrev.current[key] = group[groupName];
        invert = invertPrev.current[key];
      }
      else
        localState[key] = false;    
    }
    dispatch({type: "background", value: color});
    dispatch({type: "active", value: localState});
    dispatch({ type: "invert", value: invert});
    setGroupSelected(groupName);
  }
}
const handlePresetClick = (p) =>{
    groupRef.current = presetRef.current[p];
    backgroundPrev.current = presetBackgroundRef.current[p];
    invertPrev.current = presetInvertRef.current[p];
    setGroup(preset[p]);
}
const handleOkClick = () =>{
  if(Object.values(state.active).includes(true)){
  group[groupSelected] = state.background;
  for(const key in state.active)
    if(state.active[key] === true){
      backgroundPrev.current[key] = state.background;
      invertPrev.current[key] = state.invert;
      groupRef.current[key] = groupSelected;
  }
}else
  handleGroupDelete(groupSelected);
  setGroupSelected(null);
}
const handleCancelClick = () =>{
  setGroupSelected(null);
  handleDeselect();
}
const handleGroupDelete = (g) =>{
  var { [g]: crap, ...rest } = group;
  for(const key in groupRef.current){
    if(groupRef.current[key] === g)
      groupRef.current[key] = null;
    if(backgroundPrev.current[key] === group[g]){
      backgroundPrev.current[key] = "white";
      invertPrev.current[key] = false;
    }
}
  
  setGroup(rest);
}
  const key =(text)=> (
      <div
        className="key"
        onClick={() => {
            if (state.active[text] === false) {
            //setActive(true);
            dispatch({type: "active."+text, value: true});
            //setChange(false);
            //dispatch({ type: "change", value: false });
            
            
            } else {
            //setActive(false);
            dispatch({ type: "active."+text, value: false });
            //setBackgroundPrev(background);
            // backgroundPrev.current[text] = state.background;
            // invertPrev.current[text] = state.invert;
            //setInvertPrev(invert);
            
            }
        }}
        active= {state.active}
        background={state.background}
        style={{color: color(text), outlineColor: outlineColor(text), backgroundColor: backgroundColor(text)}}
        >
        <span>{text}</span>
        </div>
  );
  const groupList = [];
  for(const g in group){
    groupList.push(
      <div
        className="group_listc"
        style={{
          backgroundColor: g === groupSelected ? "#353535" : "#202020",
        }}
      >
        <li
          className="group_list_li"
          key={g}
          onClick={() => handleGroupClick(g, group[g])}
        >
          {g}
          <div className="group_listcc" style={{ backgroundColor: group[g] }} />
        </li>
        <div
          className="deleteGroup"
          onClick={() => handleGroupDelete(g)}
        >
          x
        </div>
      </div>
    );
  };
const presetList=[];
for(const p in preset){
  presetList.push(
    <div className="preset_listc">
    <li className="preset_list_li" key={p} onClick={() => handlePresetClick(p)}>
      {p}
    </li>
    <div className="deletePreset" onClick={()=>{ var {[p]: crap, ...rest}=preset; setPreset(rest)}}>x</div>
    </div>
  )
}
  return (
    <div className="page" onKeyDown={() => handleKeyPress}>
      <div className="left_sidebar">
        <label>Add a group</label>
        <input
          id="groupInput"
          ref={groupInputRef}
          onChange={handleGroupInput}
        ></input>
        {groupSelected !== null && groupSelected !== undefined ? (
          <div className="group_ok" onClick={() => handleOkClick()}>
            Ok
          </div>
        ) : null}
        {groupSelected !== null && groupSelected !== undefined ? (
          <div className="group_ok" onClick={() => handleCancelClick()}>
            Cancel
          </div>
        ) : null}
        <ul className="group_list">{group.length !== {} ? groupList : null}</ul>
      </div>
      <div className="right_sidebar">
        <SketchPicker
          color={state.background}
          onChange={handleChange}
          //onChangeComplete={handleChangeComplete}
        />
        <label>Add a preset</label>
        <input
          id="presetInput"
          ref={presetInputRef}
          onChange={handlePresetInput}
        />
        <ul className="preset_list">
          {preset.length !== {} ? presetList : null}
        </ul>
      </div>
      <div className="keyboard">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="100px"
          height="100px"
          viewBox="0 0 889.000000 1280.000000"
          preserveAspectRatio="xMidYMid meet"
          style={{ outlineColor: outlineColor(), outlineStyle:"solid", outlineWidth:{state} }}
        >
          <metadata>
            Created by potrace 1.15, written by Peter Selinger 2001-2017
          </metadata>
          <g
            transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
            fill="red"
            stroke="none"
          >
            <path
              d="M4432 11911 c-156 -158 -305 -453 -356 -701 -33 -161 -39 -260 -33
-535 9 -395 51 -1623 88 -2590 29 -762 -46 -1380 -228 -1885 -69 -190 -126
-304 -186 -374 -158 -181 -323 -431 -435 -658 -196 -399 -299 -818 -318 -1294
l-7 -164 294 2 294 3 6 150 c8 170 54 488 98 670 82 338 225 643 427 915 84
112 298 333 377 388 l48 34 116 -114 c377 -370 640 -831 747 -1309 35 -159 76
-460 83 -612 l6 -127 291 2 291 3 -3 130 c-7 387 -88 770 -236 1130 -116 279
-320 610 -515 834 -30 35 -63 85 -73 110 -9 25 -35 90 -57 144 -128 311 -223
702 -265 1097 -39 361 -44 658 -21 1215 8 198 24 637 35 975 11 338 27 817 36
1064 17 487 12 610 -27 795 -57 262 -190 526 -350 695 l-66 69 -61 -62z"
            />
            <path
              d="M1190 6930 l0 -3940 913 0 914 0 28 -107 c88 -341 257 -686 477 -976
230 -303 562 -600 880 -790 l96 -57 102 58 c335 193 655 479 898 805 114 151
182 265 268 442 89 184 133 302 181 485 l36 140 914 0 913 0 0 3940 0 3940
-20 0 c-64 0 -362 -204 -588 -404 -336 -296 -647 -715 -847 -1140 -189 -401
-312 -863 -359 -1351 -47 -474 -60 -597 -96 -890 -39 -320 -74 -625 -108 -956
l-18 -177 111 -4 c125 -5 186 -23 287 -84 199 -121 308 -327 278 -521 -27
-171 -144 -309 -368 -433 -23 -13 -40 -29 -38 -34 28 -65 102 -338 127 -463 6
-35 15 -63 19 -63 16 0 188 73 240 102 237 134 404 318 497 548 61 149 77 238
78 420 0 199 -17 276 -99 445 -93 191 -219 333 -399 452 -74 49 -103 74 -113
99 -13 30 -9 73 36 436 51 414 87 742 115 1023 8 88 25 216 36 285 63 395 227
854 422 1180 70 117 235 370 242 370 3 0 5 -1399 5 -3110 l0 -3110 -1125 0
-1125 0 0 -250 0 -250 183 0 c101 0 186 -3 189 -6 9 -9 -48 -213 -92 -331 -85
-225 -219 -454 -378 -643 -44 -52 -89 -104 -101 -114 l-21 -19 2 869 3 869 34
69 c63 129 205 239 374 292 46 14 57 22 57 39 0 78 -64 461 -80 479 -10 10
-125 -27 -201 -65 -76 -38 -241 -150 -367 -248 l-103 -81 -117 92 c-132 103
-271 197 -352 238 -76 38 -190 74 -200 64 -16 -17 -88 -443 -82 -491 0 -3 35
-19 77 -34 175 -64 295 -160 356 -285 l34 -69 2 -865 3 -865 -66 68 c-120 125
-258 326 -348 505 -76 152 -197 508 -178 526 3 3 88 6 189 6 l183 0 0 250 0
250 -1125 0 -1125 0 0 3110 c0 1711 2 3110 4 3110 6 0 171 -256 246 -380 141
-233 282 -584 360 -895 45 -179 76 -385 110 -725 17 -168 53 -489 81 -715 28
-225 53 -448 55 -495 6 -103 6 -103 -126 -191 -336 -223 -533 -617 -490 -981
53 -459 304 -781 738 -948 42 -17 79 -30 82 -30 3 0 12 35 19 78 15 90 71 311
101 396 11 33 20 60 20 62 0 1 -37 25 -82 53 -235 142 -325 275 -322 476 2
149 53 256 169 363 130 118 235 163 398 170 97 4 107 6 107 23 0 39 -72 693
-115 1049 -55 456 -71 598 -90 825 -38 429 -97 733 -210 1070 -245 736 -695
1350 -1313 1792 -122 87 -251 163 -279 163 l-23 0 0 -3940z"
            />
          </g>
        </svg>
        <div className="row">
          {key("Q")}
          {key("W")}
          {key("E")}
          {key("R")}
          {key("T")}
          {key("Y")}
          {key("U")}
          {key("I")}
          {key("O")}
          {key("P")}
          {key("[")}
          {key("]")}
        </div>
        <div className="row">
          {key("A")}
          {key("S")}
          {key("D")}
          {key("F")}
          {key("G")}
          {key("H")}
          {key("J")}
          {key("K")}
          {key("L")}
          {key(";")}
          {key("'")}
        </div>
        <div className="row">
          {key("Z")}
          {key("X")}
          {key("C")}
          {key("V")}
          {key("B")}
          {key("N")}
          {key("M")}
          {key(",")}
          {key(".")}
          {key("/")}
        </div>
        <div className="deselect" onClick={handleDeselect}>
          <button>Deselect All</button>
        </div>
        <div className="reset" onClick={handleReset}>
          <button>Reset All</button>
        </div>
      </div>
      {console.log(state.active)}
    </div>
  );
}
function reducer(state, action) {
      if(action.type === 'active'){
        return {
            ...state,
            active: {
              ...action.value
            },
        }
      }
      else if(action.type.includes('active'))
        return {
          ...state,
          active: {
            ...state.active,
            [`${action.type.replace("active.","")}`]: action.value,
          },
        };
        // else if (action.type.includes("backgroundPrev"))
        //     return {
        //       ...state,
        //       backgroundPrev: {
        //         ...state.backgroundPrev,
        //         [`${action.type.replace("backgroundPrev.","")}`]: action.value,
        //       },
        //       active: {
        //         ...state.active,
        //       },
        //       invertPrev: {
        //         ...state.invertPrev,
        //       },
        //     };
        // else if(action.type.includes("invertPrev"))
        //     return {
        //       ...state,
        //       backgroundPrev: {
        //         ...state.backgroundPrev,
        //       },
        //       active: {
        //         ...state.active,
        //       },
        //       invertPrev: {
        //         ...state.invertPrev,
        //         [`${action.type.replace("invertPrev.", "")}`]: action.value,
        //       },
        //     };
        else
          return {
            ...state,
            [`${action.type}`]: action.value,
            active: {
              ...state.active,
            },
          };
  console.log(`Unknown key in state: ${action.type}`);
}
