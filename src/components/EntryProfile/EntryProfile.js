import classes from "../../containers/FirstEntry/FirstEntry.css";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Input from "../UI/Input/Input";
import React, {Component} from "react";

class EntryProfile extends Component {
    state = {
        
    };


    render() {
        //
        // let form = (
        //     (<div className={classes.testBlock}>
        //         <h1 className={classes.testBlock__title}> Первичный прием пациента</h1>
        //         <form className={classes.testBlock__form} onSubmit={this.onSubmitHandler}>
        //             {formElementArray.map((formElement, i) => (
        //                     <Aux key={i}>
        //                         <p className={classes.testBlock__form__p}> {formElement.config.text} </p>
        //                         <div className={classes.testBlock__form__input}>
        //                             <Input
        //                                 key={formElement.id}
        //                                 elementType={formElement.config.elementType}
        //                                 elementConfig={formElement.config.elementConfig}
        //                                 value={formElement.config.value}
        //                                 changed={(event) => this.inputChangeHandler(event, formElement.id)}
        //                             /></div>
        //                     </Aux>
        //                 )
        //             )}
        //             <h2 className={classes.testBlock__diagnosis}>Диагноз: К 12.0 - рецидивирующие афты полости
        //                 рта</h2>
        //             <div className={classes.testBlock__form__buttonDiv}>
        //                 <button className={classes.saveButton}> Сохранить данные</button>
        //             </div>
        //         </form>
        //     </div>));


        return (1);
    }
}

export default EntryProfile;


