import React, {Component} from "react";
import axios from '../../../axios-orders';
import {connect} from "react-redux";

import classes from './PatientRegistration.css';
import Input from '../../../components/UI/Input/Input';
import * as actions from "../../../store/actions";

class PatientRegistration extends Component {
    componentDidMount() {
        this.props.onInitPatientsData();
    }

    state = {
        patientForm: {
            surname: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Фамилия'
                },
                value: ''
            },
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Имя'
                },
                value: '',
            },
            secondName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Отчество'
                },
                value: '',
            },
            gender: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '', displayValue: 'Выберите пол'},
                        {value: 'male', displayValue: 'Мужской'},
                        {value: 'female', displayValue: 'Женский'}
                    ]
                },
                value: '',
            },
            phoneNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'phoneNumber',
                    placeholder: 'Номер телефона'
                },
                value: '',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: '',
            },
        },
    };

    patientHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.patientForm) {
            formData[formElementIdentifier] = this.state.patientForm[formElementIdentifier].value;
        }

        let counter = 1;
        if (this.props.patientsData) {counter = this.props.patientsData[Object.keys(this.props.patientsData)[Object.keys(this.props.patientsData).length-1]].id+1}

        const patient = {
            id: counter ,...formData, registerDate: Date(),
            status: 'Ожидает анкетирование',
            stageChanged: false,
            statusChanged: false,
            stages: {
                entryProfile: false,
                stomatitisPresence: false,
                riskDevelopment: false,
                severity: false,
                clinicNow: false,
                clinicFuture: false,
                laboratoryAnalysisNow: false,
                laboratoryAnalysisFuture: false,
                laboratoryAnalysisFarFuture: false
            }
        };

        axios.post('/patients.json', patient)
            .then(response => {
                this.props.history.push('/patients')});

    };

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedPatientForm = {
            ...this.state.patientForm
        };
        const updatedFormElement = {
            ...updatedPatientForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedPatientForm[inputIdentifier] = updatedFormElement;
        this.setState({patientForm: updatedPatientForm})

    };

    render() {
        const formElementArray = [];
        for (let key in this.state.patientForm) {
            formElementArray.push({
                id: key,
                config: this.state.patientForm[key],
            });
        }

        let form = (
            <form onSubmit={this.patientHandler}>
                <p className={classes.PatientRegistration__title}>Регистрация нового пациента</p>
                {formElementArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event) => this.inputChangeHandler(event, formElement.id)}
                        />
                    )
                )}
                <button className={classes.PatientRegistration__button}> Сохранить </button>
            </form>);

        return (
            <div className={classes.PatientRegistration}>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state)=> {
    return {
        patientsData: state.patientData.patients
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPatientsData: () => dispatch(actions.getPatientsData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientRegistration);

