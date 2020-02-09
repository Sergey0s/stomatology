import React, {Component} from "react";
import classes from './FirstEntry.css';
import Input from '../../components/UI/Input/Input';

class FirstEntry extends Component {
    state = {
        FirstEntryForm: {
            complaints: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Жалобы'
                },
                value: ''
            },
            firstSymptoms: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Первое появление'
                },
                value: ''
            },
            howOften: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Как часто'
                },
                value: ''
            },
            healingIn: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Срок заживления'
                },
                value: ''
            },
            reason: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Причина болезни'
                },
                value: ''
            },
            firstLook: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Качество эпителия'
                },
                value: ''
            },
            defect: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Дефект'
                },
                value: ''
            },
            size: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Размер'
                },
                value: ''
            },
            form: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Форма'
                },
                value: ''
            },
            palpation: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Пальпация'
                },
                value: ''
            },


        }
    };

    onSubmitHandler = (event, FormData) => {
        event.preventDefault();
        console.log(FormData)
    };

    render() {
        let form =
            (<div className={classes.testBlock}>
                <h1 className={classes.testBlock__title}> Первичный прием пациента</h1>
                <form onSubmit={this.onSubmitHandler} className={classes.testBlock__form}>
                    <p className={classes.testBlock__form__p}> Жалобы: на жжение, болезненность слизистой
                        оболочки рта </p>
                    <div className={classes.testBlock__form__input}>
                        <Input

                            value={this.state.FirstEntryForm.complaints.value}
                            elementType={this.state.FirstEntryForm.complaints.elementType}
                            elementConfig={this.state.FirstEntryForm.complaints.elementConfig}
                            changed={1}
                        />
                    </div>
                    <p className={classes.testBlock__form__p}>
                        Из анамнеза выявлено: считает себя больным (-ой) </p>
                    <div className={classes.testBlock__form__input}>
                        <Input
                            className={classes.testBlock__form__input}
                            value={this.state.FirstEntryForm.firstSymptoms.value}
                            elementType={this.state.FirstEntryForm.firstSymptoms.elementType}
                            elementConfig={this.state.FirstEntryForm.firstSymptoms.elementConfig}
                        />
                    </div>
                    <p className={classes.testBlock__form__p}>лет, когда впервые заметил (-а) появляющиеся
                        болезненные
                        образования на слизистой оболочке рта. Со слов пациента, патологические элементы
                        возникают</p>
                    <div className={classes.testBlock__form__input}>
                        <Input
                            className={classes.testBlock__form__input}
                            value={this.state.FirstEntryForm.howOften.value}
                            elementType={this.state.FirstEntryForm.howOften.elementType}
                            elementConfig={this.state.FirstEntryForm.howOften.elementConfig}
                        />
                    </div>

                    <p className={classes.testBlock__form__p}>раз(-а) в год, заживают в течение</p>
                    <div className={classes.testBlock__form__input}>
                        <Input
                            className={classes.testBlock__form__input}
                            value={this.state.FirstEntryForm.healingIn.value}
                            elementType={this.state.FirstEntryForm.healingIn.elementType}
                            elementConfig={this.state.FirstEntryForm.healingIn.elementConfig}
                        />
                    </div>
                    <p className={classes.testBlock__form__p}>дней(-я). Обострение заболевания связывает с</p>
                    <div className={classes.testBlock__form__input}>
                        <Input
                            className={classes.testBlock__form__input}
                            value={this.state.FirstEntryForm.reason.value}
                            elementType={this.state.FirstEntryForm.reason.elementType}
                            elementConfig={this.state.FirstEntryForm.reason.elementConfig}
                        />
                    </div>
                    <p className={classes.testBlock__form__p}>
                        Объективно: на фоне видимо неизмененной бледно-розовой слизистой оболочки </p>
                    <div className={classes.testBlock__form__input}>
                        <Input
                            className={classes.testBlock__form__input}
                            value={this.state.FirstEntryForm.firstLook.value}
                            elementType={this.state.FirstEntryForm.firstLook.elementType}
                            elementConfig={this.state.FirstEntryForm.firstLook.elementConfig}
                        />
                    </div>
                    <p className={classes.testBlock__form__p}>обнаружен </p>
                    <div className={classes.testBlock__form__input}>
                        <Input
                            className={classes.testBlock__form__input}
                            value={this.state.FirstEntryForm.defect.value}
                            elementType={this.state.FirstEntryForm.defect.elementType}
                            elementConfig={this.state.FirstEntryForm.defect.elementConfig}
                        />
                    </div>
                    <p className={classes.testBlock__form__p}>дефект эпителия слизистой рта размерами</p>
                    <div className={classes.testBlock__form__input}>
                        <Input
                            className={classes.testBlock__form__input}
                            value={this.state.FirstEntryForm.size.value}
                            elementType={this.state.FirstEntryForm.size.elementType}
                            elementConfig={this.state.FirstEntryForm.size.elementConfig}
                        />
                    </div>
                    <p className={classes.testBlock__form__p}>мм,</p>
                    <div className={classes.testBlock__form__input}>
                        <Input
                            className={classes.testBlock__form__input}
                            value={this.state.FirstEntryForm.form.value}
                            elementType={this.state.FirstEntryForm.form.elementType}
                            elementConfig={this.state.FirstEntryForm.form.elementConfig}
                        />
                    </div>
                    <p className={classes.testBlock__form__p}>формы, имеющий четкие контуры, покрытый фибринозным
                        налетом серо-белого цвета, не снимающимся при попытке удаления, ограниченный ярким венчиком
                        гиперемии по периферии. При пальпации патологический элемент мягкий, болезненный:</p>
                    <div className={classes.testBlock__form__input}>

                        <Input
                            className={classes.testBlock__form__input}
                            value={this.state.FirstEntryForm.palpation.value}
                            elementType={this.state.FirstEntryForm.palpation.elementType}
                            elementConfig={this.state.FirstEntryForm.palpation.elementConfig}
                        />
                    </div>
                    <p className={classes.testBlock__form__p}>баллов(-а) по 10-бальной вербальной ранговой шкале.</p>
                    <h2 className={classes.testBlock__diagnosis}>Диагноз: К 12.0 - рецидивирующие афты полости рта</h2>
                    <div className={classes.testBlock__form__buttonDiv}>
                        <button className={classes.saveButton}> Сохранить данные</button>
                    </div>
                </form>
            </div>);

        return (
            <div>
                {form}
            </div>
        )
    }
}

export default FirstEntry;