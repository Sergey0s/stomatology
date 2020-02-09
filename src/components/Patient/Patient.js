import React, {Component} from "react";
import classes from './Patient.css';
import Button from '../UI/Button/Button';

class Patient extends Component {

    firstEntryHandler = () => {

    };

    state= {

    };

    render() {
        return (
            <div className={classes.Patient}>
                <p>ФИО: {this.props.surname} {this.props.name} {this.props.secondName} </p>
                <p>Дата регистрации: {new Date(this.props.registerDate).toLocaleString()}</p>
                <Button  btnType='Success'>Первичный прием</Button>
            </div>
        )};
    }






export default Patient;