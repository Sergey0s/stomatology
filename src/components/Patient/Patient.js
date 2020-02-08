import React from "react";
import classes from './Patient.css';

const patient = (props) => {
    return (
    <div className={classes.Patient}>
        <p>ФИО: {props.surname} {props.name} {props.secondName} </p>
        <p>Дата регистрации: {new Date(props.registerDate).toLocaleString()}</p>
        <button>Первичный прием</button>
    </div>
    )};


export default patient;