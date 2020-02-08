import React, {Component} from "react";
import axios from '../../axios-orders';
import Patient from "../../components/Patient/Patient";

class Patients extends Component {
    state = {
        patients: []
    };

    componentDidMount() {
        axios.get('/patients.json')
            .then(response => {
                console.log(response.data)
                const fetchedPatients = [];
                for (let key in response.data) {
                    console.log(key)
                    fetchedPatients.push({
                        ...response.data[key],
                        id: key
                        });
                }
                this.setState({patients: fetchedPatients})
            })
    }


    render() {
        console.log(this.state.patients);
        let patientsList = (
            <div style={{marginTop: '80px'}}>
                    {
                    this.state.patients.map((patient) => {
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

        return (
            <div>
                {patientsList}
            </div>
        );
    }
}

export default Patients;
