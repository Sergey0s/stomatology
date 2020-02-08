import React from "react";
import Question from '../../components/Questions/Question/Question';
// import classes from './Questions.css';

const questions = (props) => {
return <div>
    <Question question = {props.question}/>
      </div>
};

export default questions;