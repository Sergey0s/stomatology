import React, {Component} from "react";
import {connect} from "react-redux";
import Patient from "../../components/Patient/Patient";
import * as actions from '../../store/actions';
import {Redirect} from 'react-router-dom';

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
        for (let key in this.props.patientsData.patients) {
            console.log(key)
            fetchedPatients.push({
                ...this.props.patientsData.patients[key],
                id: key
            });
        }
        let patientsList = '';
        console.log(this.props.patientsData);
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
                    <div style={{marginTop: '80px'}}>
                        {
                            fetchedPatients.map((patient) => {
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
        // firstEntry: state.patientData.entryTest
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPatientsData: () => dispatch(actions.getPatientsData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
