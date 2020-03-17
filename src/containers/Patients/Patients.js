import React, {Component} from "react";
import {connect} from "react-redux";
import Patient from "../../components/Patient/Patient";
import * as actions from '../../store/actions';
import {Redirect} from 'react-router-dom';
import classes from "../../containers/Patients/Patients.css";


class Patients extends Component {
    state = {
        profileDone: false,
        patientId: null,
        testDone: false,
    };

    componentDidMount() {
        this.props.onInitPatientsData();
    }


    entryProfileHandler = (patientId) => {
        this.setState({
            profileDone: true,
            patientId: patientId
        })
    };

    testHandler = () => {
        this.props.onTestStarted();
    };

    render() {
        const fetchedPatients = [];
        for (let key in this.props.patients) {
            fetchedPatients.push({
                ...this.props.patients[key],
                id: key
            });
        }
        let patientsList = '';

        // if (!this.props.patients || this.props.patients.length===0) {
        //     this.props.onInitPatientsData()
        // }

        if (this.state.profileDone) {
            patientsList = (<Redirect to={{
                pathname: '/firstEntry',
                state: {
                    patientId: this.state.patientId
                }
            }}
            />)
        } else {
            if (this.props.patients && this.props.patients.length !== 0) {
                patientsList = (
                    <div className={classes.Patients}>
                        {
                            fetchedPatients.reverse().map((patient) => {
                                return <Patient
                                    key={patient.id}
                                    id={patient.id}
                                    surname={patient.surname}
                                    name={patient.name}
                                    secondName={patient.secondName}
                                    registerDate={patient.registerDate}
                                    entryProfileHandler={() => this.entryProfileHandler(patient.id)}
                                    testsHandler={() => this.testHandler(patient.id)}
                                />
                            })
                        }
                    </div>);
            }
        }
        return (
            <div>
                {patientsList}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        patients: state.patientData.patients,
        testStarted: state.patientData.testStarted
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPatientsData: () => dispatch(actions.getPatientsData()),
        onTestStarted: () => dispatch(actions.testStarted())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);