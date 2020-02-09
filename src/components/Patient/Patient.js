import React, {Component} from "react";
import classes from './Patient.css';
import {connect} from "react-redux";

class Patient extends Component {

    render() {
        const entryTest = this.props.firstEntry[this.props.id].patientData.entryTest;
        let updatedEntryTest = [];
        if (entryTest) {
            for (let key in entryTest) {
                updatedEntryTest.push(entryTest[key])
            }
            console.log(updatedEntryTest)
        }
        return (
            <div className={classes.Patient}>
                <p className={classes.Patient__p}>ФИО: {this.props.surname} {this.props.name} {this.props.secondName} </p>
                <p className={classes.Patient__p}>Дата
                    регистрации: {new Date(this.props.registerDate).toLocaleString()}</p>
                {
                    !entryTest &&
                    <button className={classes.Patient__firstEntryButton} onClick={this.props.firstEntryHandler}>Первичный прием</button>
                    ||
                    <div>
                        <p className={classes.Patient__p}> Результаты первого приема: </p>
                        <p className={classes.Patient__p}> Жалобы: {updatedEntryTest[0].complaints.value} </p>
                        <p className={classes.Patient__p}> Диагноз: К 12.0 - рецидивирующие афты полости рта</p>
                    </div>
                }
            </div>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        firstEntry: state.patientData.patients
    }
};

export default connect(mapStateToProps)(Patient);