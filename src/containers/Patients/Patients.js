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

    firstEntryHandler = (patientId) => {
        this.setState({
            firstEntry: true,
            patientId: patientId
        })
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

        if (this.state.firstEntry) {
            patientsList = (<Redirect to={{
                pathname: '/firstEntry',
                state: {
                    patientId: this.state.patientId
                }
            }}
            />)
        } else {
            if (this.props.patients && this.props.patients.length!==0) {
                // console.log(this.props.patients);
                // console.log('here');
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
        patients: state.patientData.patients,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPatientsData: () => dispatch(actions.getPatientsData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
