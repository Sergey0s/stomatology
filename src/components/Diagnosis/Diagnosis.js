import React from "react";

const diagnosis = (props) => {
    return (
        <div>
    {props.totalValue>2 ? <p> ПИСОС </p>  : <p> GOOD </p> }
        </div>
    )};

export default diagnosis;