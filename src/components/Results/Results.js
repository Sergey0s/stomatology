import React from "react";
import Result from './Result/Result';
import Treatment from '../Treatment/Treatment';
import classes from './Results.css';

const results = (props) => {
    return (
        <div className={classes.Results}>
            <h1> Результаты и лечение </h1>
            <details>
                <summary></summary>
                <ul>
                    {props.results.map((result, i) => {
                        return (
                            <Result
                                key={i}
                                result={result}/>
                        )
                    })}
                </ul>
            </details>
            <Treatment firstTestResult={props.firstTestResult}
                       secondTestResult={props.secondTestResult}
                       stomatitNow={props.stomatitNow}/>
        </div>
    )
};

export default results;