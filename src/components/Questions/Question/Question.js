import React from "react";
import classes from './Question.css'

const question = (props) => {

    return (
        <div className={classes.Question}> {props.question} </div>
    )
};


export default question;

