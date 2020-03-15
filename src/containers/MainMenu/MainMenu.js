import React, {Component} from "react";
import classes from './MainMenu.css';
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import Spinner from '../../components/UI/Spinner/Spinner';

class MainMenu extends Component {


    componentDidMount() {
        this.props.onInitPatientsData();
    }


    render() {
        let content = '';
        if (this.props.pageLoading) {
            content = <Spinner/>
        } else {
            let baseButton = '';
            this.props.patientsExist ?
                baseButton =
                    <div className={classes.MainMenu__button} onClick={() => this.props.history.push('/patients')}>База
                        пациентов</div>
                : baseButton = <div className={classes.MainMenu__button__disabled}>База пациентов</div>;

            content =
                <div className={classes.MainMenu}>
                    <div className={classes.MainMenu__button}
                         onClick={() => this.props.history.push('/patients/register')}>Регистрация нового пациента
                    </div>
                    {baseButton}
                </div>;
        }
        return (
            content
        );
    }
}

const mapStateToProps = (state) => {
    return {
        patientsExist: state.patientData.patientsExist,
        pageLoading: state.patientData.pageLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPatientsData: () => dispatch(actions.getPatientsData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);