import React, {Component} from "react";
import classes from './MainMenu.css';

class MainMenu extends Component{
    render() {
        return (
            <div className={classes.MainMenu}>
                <div className={classes.MainMenu__button} onClick={()=>this.props.history.push('/patients/register')}>Регистрация нового пациента</div>
                <div className={classes.MainMenu__button} onClick={()=>this.props.history.push('/patients')}>База пациентов</div>
            </div>
        );
    }
}

export default MainMenu;