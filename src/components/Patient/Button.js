import React from "react";
import classes from './Button.css'

const button = (props) => {
    return(
    <div>
    <button className={classes.Button} onClick={()=>props.onClick()}> Сохранить </button>
    </div>)
};

export default button;