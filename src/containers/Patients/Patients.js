import React, {Component} from "react";
import {connect} from "react-redux";
import Patient from "../../components/Patient/Patient";
import * as actions from '../../store/actions';
import { Redirect } from 'react-router-dom';
import classes from "../../containers/Patients/Patients.css";
import {TestList} from '../../DataBase/TestsList';

class Patients extends Component {

    state = {
        profileDone: false,
        patientId: null,
        testStarted: false,
        testList: [],
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

    firstTestHandler = () => {
        this.setState({testStarted: true})
    };

    render() {
        console.log(this.state.testStarted);
        console.log(this.state.testList);
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
            if (this.props.patients && this.props.patients.length!==0) {
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
                                    firstTestsHandler={()=> this.firstTestHandler(patient.id)}
                                    testStarted = {this.state.testStarted}
                                    stomatitTest = {TestList.stomatitisPresence}
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
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPatientsData: () => dispatch(actions.getPatientsData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);