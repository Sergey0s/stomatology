import React, {Component} from "react";
import {connect} from "react-redux";
import Patient from "./Patient/Patient";
import * as actions from '../../store/actions';
import {Redirect} from 'react-router-dom';
import classes from "../../containers/Patients/Patients.css";
import Spinner from "../../components/UI/Spinner/Spinner";


class Patients extends Component {
    state = {
        profileDone: false,
        patientId: null,
        testDone: false,
        setStatistics: false,
        statistics: {
            patients: 'нет данных',
            discharged: 'нет данных',
            efficiency: {
                high: 'нет данных',
                middle: 'нет данных',
                low: 'нет данных',
                absent: 'нет данных'
            }

        }
    };

    componentDidMount() {
        this.props.onInitPatientsData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.setStatistics && this.props.patientsExist && this.props.testFinished) {
            this.statisticsHandler()
        }
    }

    entryProfileHandler = (patientId) => {
        this.setState({
            profileDone: true,
            patientId: patientId
        })
    };

    testHandler = () => {
        this.props.onTestStarted();
    };

    statisticsHandler = () => {
        let patients = this.props.patients;
        let patientsArr = [];
        for (let key in patients) {
            patientsArr.push(patients[key])
        }

        this.setState({
            setStatistics: true,
            statistics: {
                patients: Object.keys(patients).length,
                discharged: patientsArr.filter(patient => patient.discharge === true).length,
                efficiency: {
                    high: patientsArr.filter(patient => patient.efficiency === 'Высокая').length,
                    middle: patientsArr.filter(patient => patient.efficiency === 'Средняя').length,
                    low: patientsArr.filter(patient => patient.efficiency === 'Низкая').length,
                    absent: patientsArr.filter(patient => patient.efficiency === 'отсутствует').length,
                }
            }
        })
    };

    render() {
        const fetchedPatients = [];
        for (let key in this.props.patients) {
            fetchedPatients.push({
                ...this.props.patients[key],
                id: key
            });
        }
        let content = '';

        if (this.props.pageLoading) {
            content = <div className={classes.Patients__spinner}><Spinner/></div>
        } else {
            if (!this.props.patientsExist) {
                content =
                    <div className={classes.Patients__absent}>
                        <p className={classes.Patients__title}> Программа по оценке эффективности лечения
                            рецидивирующего афтозного стоматита </p>
                        <div className={classes.Patients__absentContent}>
                            <p className={classes.Patients__p}> Ни одного пациента еще не зарегистрировано</p>
                                <div className={classes.Patients__button}
                                     onClick={() => this.props.history.push('/patients/register')}>Регистрация
                                    нового пациента
                                </div>
                        </div>
                    </div>
            } else {

                if (this.state.profileDone) {
                    content = (<Redirect to={{
                        pathname: '/firstEntry',
                        state: {
                            patientId: this.state.patientId
                        }
                    }}
                    />)
                } else {
                    if (this.props.patients && this.props.patients.length !== 0) {
                        content = (
                            <div className={classes.Patients}>
                                <p className={classes.Patients__title}> Программа по оценке эффективности лечения
                                    рецидивирующего афтозного стоматита </p>
                                <div className={classes.Patients__content}>
                                    <div className={classes.Patients__toolbar}>
                                        <div className={classes.Patients__register}>
                                            <div className={classes.Patients__button}
                                                 onClick={() => this.props.history.push('/patients/register')}>Регистрация
                                                нового пациента
                                            </div>
                                        </div>
                                        <div className={classes.Patients__statistics}>
                                            <p className={classes.Patients__title}> Cтатистика: </p>
                                            <p className={classes.Patients__p}> Всего
                                                пациентов: {this.state.statistics.patients} </p>
                                            <p className={classes.Patients__p}> Выписано: {this.state.statistics.discharged} </p>
                                            <p className={classes.Patients__title}> Эффективность лечения: </p>
                                            <p className={classes.Patients__p}> Высокая: {this.state.statistics.efficiency.high}</p>
                                            <p className={classes.Patients__p}> Средняя: {this.state.statistics.efficiency.middle}</p>
                                            <p className={classes.Patients__p}> Низкая: {this.state.statistics.efficiency.low}</p>
                                            <p className={classes.Patients__p}> Отсутствует: {this.state.statistics.efficiency.absent}</p>
                                            <div className={classes.Patients__button}
                                                 onClick={() => this.statisticsHandler()}>Обновить статистику
                                            </div>
                                        </div>
                                    </div>

                                    <div className={classes.Patients__list}>
                                        <div className={classes.Patients}>
                                            {fetchedPatients.reverse().map((patient) => {
                                                return <Patient
                                                    key={patient.id}
                                                    id={patient.id}
                                                    surname={patient.surname}
                                                    name={patient.name}
                                                    secondName={patient.secondName}
                                                    registerDate={patient.registerDate}
                                                    entryProfileHandler={() => this.entryProfileHandler(patient.id)}
                                                    testsHandler={() => this.testHandler(patient.id)}
                                                />
                                            })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    }
                }
            }
        }
        return (
            <div style = {{height:"100vh"}}>
                {content}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        patients: state.patientData.patients,
        testStarted: state.patientData.testStarted,
        testFinished: state.patientData.testFinished,
        pageLoading: state.patientData.pageLoading,
        patientsExist: state.patientData.patientsExist,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPatientsData: () => dispatch(actions.getPatientsData()),
        onTestStarted: () => dispatch(actions.testStarted())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);