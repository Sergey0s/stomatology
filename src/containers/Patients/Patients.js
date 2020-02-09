import React, {Component} from "react";
import {connect} from "react-redux";
import Patient from "../../components/Patient/Patient";
import * as actions from '../../store/actions/actions';
import {getPatientsData} from "../../store/actions/actions";

class Patients extends Component {

    componentDidMount() {
                this.props.onInitPatientsData();
    }


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
        if (this.props.patientsData.patients) {
            patientsList = (
                <div style={{marginTop: '80px'}}>
                    {
                        fetchedPatients.map((patient) => {
                            return <Patient
                                key={patient.id}
                                surname={patient.patientData.surname}
                                name={patient.patientData.name}
                                secondName={patient.patientData.secondName}
                                registerDate={patient.patientData.registerDate}
                            />
                        })
                    }
                </div>);
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
        patientsData: state.patientData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPatientsData: ()=> dispatch(actions.getPatientsData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
