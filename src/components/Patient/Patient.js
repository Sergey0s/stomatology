import React from "react";
import Button from '../Patient/Button';

const patient = (props) => {
    const style = {
        display:"block",
        position: "relative",
        margin: "20px auto",
        border: "2px solid red"
    };
    return (
        <div>
        <input type='text' style={style} onChange={(e)=>{props.onChange(e)}}/>
        <Button onClick={props.onClick}/>
        </div>
    )
};

export default patient;