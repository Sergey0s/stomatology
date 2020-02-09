import React, {Component} from "react";
import classes from './Patient.css';
import {connect} from "react-redux";

class Patient extends Component {

    render() {
        // console.log(this.props.firstEntry)
        console.log()
        return (
            <div className={classes.Patient}>
                <p>ФИО: {this.props.surname} {this.props.name} {this.props.secondName} </p>
                <p>Дата регистрации: {new Date(this.props.registerDate).toLocaleString()}</p>
                {
                    !this.props.firstEntry[this.props.id].patientData.entryTest &&
                    <button onClick={this.props.firstEntryHandler}>Первичный прием</button>
                }
            </div>
        )};
    }

    const mapStateToProps = (state) => {
    return {
        firstEntry: state.patientData.patients
    }
    };

    export default connect(mapStateToProps)(Patient);