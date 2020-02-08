import React from "react";
import Result from './Result/Result';
import Diagnosis from '../Diagnosis/Diagnosis';

const results = (props) => {
    return (
        <div>
            <h1> Выбранные ответы </h1>
            <h2>Пациент: {props.patientName}</h2>
    <ul>
        {props.results.map((result,i) => {
        return (
        <Result
            key={i}
            result ={result}/>
            )
    })}
    </ul>
            <Diagnosis totalValue = {props.totalValue}/>
        </div>
    )
};

export default results;