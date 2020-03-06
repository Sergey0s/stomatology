import React, {Component} from "react";
import classes from './FirstEntry.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Input from '../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
// import Test from "../Test/Test";
import TestCore from "../TestCore/TestCore";
import questionList2 from "../../components/DataBase/List2";
import questionList1 from "../../components/DataBase/List1";
import {Redirect} from "react-router-dom";

class FirstEntry extends Component {
    constructor(props) {
        super(props);
        this.handleIsFinished = this.handleIsFinished.bind(this);
        this.state = {
            firstFormDone: false,
            isFinished: false,
            localFinished: false,
            numberOfTest: 0,
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
        }
    }

    handleIsFinished() {
        console.log('я тут');
        let questionsArr = [questionList1, questionList2];

        if (questionsArr.length === this.state.numberOfTest + 1) {
            this.setState({isFinished: !this.state.isFinished, numberOfTest: this.state.numberOfTest + 1});
        }
        this.setState({localFinished: !this.state.localFinished, numberOfTest: this.state.numberOfTest + 1});
    }

    inputChangeHandler = (event, inputIdentifier) => {
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
        this.props.onAddFirstEntry(this.props.location.state.patientId, this.state.firstEntryForm);
        this.setState({
            firstFormDone: true
        })
        // console.log(this.props.location.state.patientId, this.state.firstEntryForm)
    };

    render() {
        let questionsArr = [questionList1, questionList2];

        const formElementArray = [];

        for (let key in this.state.firstEntryForm) {
            formElementArray.push({
                id: key,
                config: this.state.firstEntryForm[key],
            })
        }

        let form = '';

        console.log(this.state.isFinished);

        if (this.props.location.state === undefined) {
            this.props.history.push('/patients');
        } else {
            if (!this.state.firstFormDone) {
                form = (
                    (<div className={classes.testBlock}>
                        <h1 className={classes.testBlock__title}> Первичный прием пациента</h1>
                        <form className={classes.testBlock__form} onSubmit={this.onSubmitHandler}>
                            {formElementArray.map((formElement, i) => (
                                    <Aux key={i}>
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
                            <h2 className={classes.testBlock__diagnosis}>Диагноз: К 12.0 - рецидивирующие афты полости
                                рта</h2>
                            <div className={classes.testBlock__form__buttonDiv}>
                                <button className={classes.saveButton}> Сохранить данные</button>
                            </div>
                        </form>
                    </div>));
            } else {
                if (!this.state.isFinished) {
                    if (!this.state.localFinished) {
                        form =
                            <div>
                                <TestCore
                                    isLocalFinished={this.state.localFinished}
                                    isFinished ={this.state.isFinished}
                                    isFinishedChange={this.handleIsFinished}
                                    patientId={this.props.location.state.patientId}
                                    questions={questionsArr[this.state.numberOfTest]}
                                />
                            </div>
                    } else {
                        this.setState({localFinished: false})
                    }
                } else {
                    form = <Redirect to={'/patients'}/>;
                }
            }
        }
        return (
            <div>
                {form}
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
        onAddFirstEntry: (patientId, formData) => dispatch(actions.firstEntrySuccess(patientId, formData))
    }
};


export default connect(null, mapDispatchToProps)(FirstEntry);

