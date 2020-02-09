import React, {Component} from "react";
import axios from '../../../axios-orders';

import classes from './PatientData.css';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

class PatientData extends Component {
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

        const patient = {
            patientData: {...formData, registerDate: Date(), firstEntry: true}
        };

        axios.post('/patients.json', patient)
            .then(response => {
            console.log(response)});
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
                <Button
                    btnType='Success'
                > Сохранить </Button>
            </form>);

        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }
}

export default PatientData;

