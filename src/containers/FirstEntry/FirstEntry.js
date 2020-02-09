import React, {Component} from "react";
import classes from './FirstEntry.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Input from '../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";


class FirstEntry extends Component {
    state = {
        firstEntryForm: {
            complaints: {
                text: 'Жалобы: на жжение, болезненность слизистой оболочки рта',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Жалобы'
                },
                value: ''
            },
            firstSymptoms: {
                text: 'Из анамнеза выявлено: считает себя больным (-ой)',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Первое появление'
                },
                value: ''
            },
            howOften: {
                text: 'лет, когда впервые заметил (-а) появляющиеся болезненные образования на слизистой оболочке рта. Со слов пациента, патологические элементы возникают',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Как часто'
                },
                value: ''
            },
            healingIn: {
                text: 'раз(-а) в год, заживают в течение',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Срок заживления'
                },
                value: ''
            },
            reason: {
                text: 'дней(-я). Обострение заболевания связывает с',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Причина болезни'
                },
                value: ''
            },
            firstLook: {
                text: 'Объективно: на фоне видимо неизмененной бледно-розовой слизистой оболочки',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Качество эпителия'
                },
                value: ''
            },
            defect: {
                text: 'обнаружен',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Дефект'
                },
                value: ''
            },
            size: {
                text: 'дефект эпителия слизистой рта размерами',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Размер'
                },
                value: ''
            },
            form: {
                text: 'мм,',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Форма'
                },
                value: ''
            },
            palpation: {
                text: 'формы, имеющий четкие контуры, покрытый фибринозным налетом серо-белого цвета, не снимающимся при попытке удаления, ограниченный ярким венчиком гиперемии по периферии. При пальпации патологический элемент мягкий, болезненный. В баллах по 10-бальной вербальной ранговой шкале - ',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Пальпация'
                },
                value: ''
            },
        }
    };

    inputChangeHandler = (event,inputIdentifier) => {
            const updatedFirstEntryForm = {
                ...this.state.firstEntryForm
            };
            const updatedFormElement = {
                ...updatedFirstEntryForm[inputIdentifier]
            };
            updatedFormElement.value = event.target.value;
        updatedFirstEntryForm[inputIdentifier] = updatedFormElement;

            this.setState({firstEntryForm: updatedFirstEntryForm})
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAddFirstEntry(this.props.location.state.patientId, this.state.firstEntryForm)
    };

    render() {
        const formElementArray = [];
        for (let key in this.state.firstEntryForm) {
            // console.log(key)
            formElementArray.push({
                id: key,
                config: this.state.firstEntryForm[key],
            })
        }

        let form = (
            (<div className={classes.testBlock}>
                <h1 className={classes.testBlock__title}> Первичный прием пациента</h1>
                <form className={classes.testBlock__form} onSubmit={this.onSubmitHandler}>
                    {formElementArray.map(formElement => (
                            <Aux>
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
                        )
                    )}
                    <h2 className={classes.testBlock__diagnosis}>Диагноз: К 12.0 - рецидивирующие афты полости рта</h2>
                    <div className={classes.testBlock__form__buttonDiv}>
                        <button className={classes.saveButton}> Сохранить данные</button>
                    </div>
                </form>
            </div>));

        return (
            <div>
                {form}
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
  return {
      patientData: state.patientData.patients
  }
};

const  mapDispatchToProps = dispatch => {
    return {
        onAddFirstEntry: (patientId, formData) => dispatch(actions.firstEntrySuccess(patientId, formData))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(FirstEntry);