import React from "react";
import classes from './Answer.css';

const answer = (props) => {
    // console.log(props)
    // console.log(props.answer.id)
    return(
        <li
            className={classes.Answer}
            onClick={()=> props.onAnswerClick(props.answer.id)}>
            {props.answer.text}
        </li>
    );
};

export default answer;