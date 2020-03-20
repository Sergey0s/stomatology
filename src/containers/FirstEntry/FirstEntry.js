import React, {Component} from "react";
import classes from './FirstEntry.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Input from '../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
// import TestCore from "../TestCore/TestCore";
// import questionList2 from "../../DataBase/List2";
// import questionList1 from "../../DataBase/List1";
import {Redirect} from "react-router-dom";
import {EntryProfileForm} from '../../DataBase/EntryProfileForm';

class FirstEntry extends Component {
    state = {
        isFinished: false,
        EntryProfileForm
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedEntryProfileForm = {
            ...this.state.EntryProfileForm
        };
        const updatedFormElement = {
            ...updatedEntryProfileForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedEntryProfileForm[inputIdentifier] = updatedFormElement;

        this.setState({EntryProfileForm: updatedEntryProfileForm})
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAddFirstEntry(this.props.location.state.patientId, this.state.EntryProfileForm);
        this.setState({
            isFinished: !this.state.isFinished
        })
    };

    render() {
        let content = '';

        if (this.props.location.state === undefined || this.state.isFinished) {
            content = <Redirect to={'/patients'}/>
        } else {
            const formElementArray = [];
            for (let key in this.state.EntryProfileForm) {
                formElementArray.push({
                    id: key,
                    config: this.state.EntryProfileForm[key],
                });

                content = (
                    (<div className={classes.testBlock}>
                        <h1 className={classes.testBlock__title}> Первичный прием пациента</h1>
                        <form className={classes.testBlock__form} onSubmit={this.onSubmitHandler}>
                            {formElementArray.map((formElement, i) => {
                                console.log(formElement);
                                return (<Aux key={i}>
                                        <p className={classes.testBlock__form__p}> {formElement.config.text} </p>
                                        <div className={classes.testBlock__form__input}>
                                            <Input
                                                key={formElement.id}
                                                elementType={formElement.config.elementType}
                                                elementConfig={formElement.config.elementConfig}
                                                value={formElement.config.value}
                                                changed={(event) => this.inputChangeHandler(event, formElement.id)}
                                            /></div>
                                    </Aux>
                                )}
                            )}
                            <h2 className={classes.testBlock__diagnosis}>Диагноз: К 12.0 - рецидивирующие афты
                                полости
                                рта</h2>
                            <div className={classes.testBlock__form__buttonDiv}>
                                <button className={classes.saveButton}> Сохранить данные</button>
                            </div>
                        </form>
                    </div>));
            }
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}

//
// const mapStateToProps = (state)=> {
//   return {
//       patientData: state.patientData.patients
//   }
// };

const mapDispatchToProps = dispatch => {
    return {
        onAddFirstEntry: (patientId, formData) => dispatch(actions.entryProfileSuccess(patientId, formData))
    }
};


export default connect(null, mapDispatchToProps)(FirstEntry);

