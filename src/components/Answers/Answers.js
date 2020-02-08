import React from "react";
import Answer from './Answer/Answer';
// import classes from './Answers.css'

const answers = (props) => {
    // console.log(props)
    return (
            <ul>
                     {props.answers.map((answer,i) => {
                        return <Answer
                            key={i}
                            answer={answer}
                            onAnswerClick={props.onAnswerClick}/>
                     })}
            </ul>
    )};

export default answers;