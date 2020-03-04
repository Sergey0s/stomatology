import React, {Component} from "react";
import {connect} from "react-redux";
import Patient from "../../components/Patient/Patient";
import * as actions from '../../store/actions';
import { Redirect } from 'react-router-dom';
import classes from "../../containers/Patients/Patients.css"

class Patients extends Component {

    state = {
        firstEntry: false,
        patientId: null
    };

    componentDidMount() {
        this.props.onInitPatientsData();
    }

    UNSAFE_componentWillMount(nextProps, nextState, nextContext) {
        this.props.onInitPatientsData();
    }

    firstEntryHandler = (patientId) => {
        this.setState({
            firstEntry: true,
            patientId: patientId
        })
    };


    render() {
        const fetchedPatients = [];
        for (let key in this.props.patientsData.patients) {
            fetchedPatients.push({
                ...this.props.patientsData.patients[key],
                id: key
            });
        }
        let patientsList = '';
        if (this.state.firstEntry) {
            patientsList = (<Redirect to={{
                pathname: '/firstEntry',
                state: {
                    patientId: this.state.patientId
                }
            }}
            />)
        } else {
            if (this.props.patientsData.patients) {
                patientsList = (
                    <div className={classes.Patients}>
                        {
                            fetchedPatients.reverse().map((patient) => {
                                return <Patient
                                    key={patient.id}
                                    id={patient.id}
                                    surname={patient.patientData.surname}
                                    name={patient.patientData.name}
                                    secondName={patient.patientData.secondName}
                                    registerDate={patient.patientData.registerDate}
                                    firstEntryHandler={() => this.firstEntryHandler(patient.id)}
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
        patientsData: state.patientData,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPatientsData: () => dispatch(actions.getPatientsData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
