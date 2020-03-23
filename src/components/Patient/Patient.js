import React, {Component} from "react";
import classes from './Patient.css';
import {connect} from "react-redux";
import EntryProfile from '../EntryProfile/EntryProfile';
import TestCore from "../../containers/TestCore/TestCore";
import {TestList} from '../../DataBase/TestsList';
import Treatment from "../Treatment/Treatment";
import * as actions from "../../store/actions";

class Patient extends Component {
    state = {
        daysFromRegister: null,
        daysFromLastEntry: null,
        showMore: false,
        showProfile: false,
        showResults: false,
        repeatedEntry: false,
    };

    componentDidMount() {
        this.dataEntryCheckHandler()
    }


    showProfileHandler = (id) => {
        this.setState({showProfile: !this.state.showProfile})
    };

    showResultsHandler = (id) => {
        this.setState({showResults: !this.state.showResults})
    };

    showMoreHandler = (id) => {
        this.setState({showMore: !this.state.showMore})
    };

    deletePatientHandler = (id) => {
        this.props.onDeletePatient(id);
    };


    repeatedEntryHandler = (id) => {
        console.log('here');
        this.setState({repeatedEntry: true})

    };

    secondEntryClinic = (id) => {
        console.log('clinic');
        this.props.testsHandler();
    };

    secondEntryLaboratory = (id) => {
        console.log('laboratory')
    };

    dataEntryCheckHandler() {
        const today = Date.now();
        const registered = Date.parse(this.props.patientsData[this.props.id].registerDate);
        const lastEntry = Date.parse(this.props.patientsData[this.props.id].lastEntryDate);
        const oneDay = 1000 * 60 * 60 * 24;
        this.setState({
            daysFromRegister: Math.ceil((today - registered) / oneDay),
            daysFromLastEntry: Math.ceil((today - lastEntry) / oneDay)
        })
    };

    // releaseCheckHandler() {
    //         console.log('Статус - выписан... Дата: ', new Date().toLocaleString());
    //         console.log('Итог лечения - супер');
    //         console.log('Эпикриз')
    // };


    render() {
        const currentPatient = this.props.patientsData[this.props.id];

        console.log(this.state.daysFromRegister);
        console.log(this.state.daysFromLastEntry);
        if (this.state.daysFromLastEntry > 8 && !currentPatient.discharge) {
            // this.releaseCheckHandler();
            this.props.onDischargePatient(this.props.id);
            this.props.onSetEfficiency(this.props.id, 'ВЫСОКАЯ')
        }


        if (currentPatient.stageChanged) {
            let stage = '1';

            // stages
            //stomatitisPresence,
            //     riskDevelopment,
            //     severity,
            //     clinicNow,
            //     clinicFuture,
            //     laboratoryAnalysisNow,
            //     laboratoryAnalysisFuture,
            //     laboratoryAnalysisFarFuture

            switch (currentPatient.status) {
                case 'Ожидает тест: наличие стоматита' :
                    stage = 'stomatitisPresence';
                    break;
                case 'Ожидает тест: Часть 1 - Риск развития' :
                    stage = 'riskDevelopment';
                    break;
                case 'Часть 2 не требуется. Ожидает повторный прием в течение 7 дней' :
                    stage = 'severity';
                    break;
                case 'Ожидает тест: Часть 2 - Степень тяжести' :
                    stage = 'severity';
                    break;
                default:
            }

            this.props.onHandleStage(this.props.id, stage);
        }

        if (currentPatient.statusChanged) {
            let status = '2';

            let stomatitisPresenceResults = null;

            let stomatitisPresencePath = currentPatient.completedTests['Наличие стоматита'];
            let stomatitisPresenceKey = Object.keys(stomatitisPresencePath);
            if (stomatitisPresenceKey.length !== 1) {
                stomatitisPresenceResults = stomatitisPresencePath.totalScore;
            } else {
                stomatitisPresenceResults = stomatitisPresencePath[stomatitisPresenceKey].totalScore;
            }

            if (currentPatient.stages.riskDevelopment === false) {
                status = 'Ожидает тест: Часть 1 - Риск развития';
            } else if (stomatitisPresenceResults >= 3 && currentPatient.stages.severity === false) {
                status = 'Ожидает тест: Часть 2 - Степень тяжести'
            } else {
                status = 'Ожидает повторный прием в течение 7 дней'
            }

            if (stomatitisPresenceResults < 3 && currentPatient.stages.riskDevelopment !== false) {
                status = 'Часть 2 не требуется. Ожидает повторный прием в течение 7 дней';
            }


            this.props.onHandleStatus(this.props.id, status);
        }

        let status = null;
        if (this.props.patientsData[this.props.id].status !== undefined) {
            status = this.props.patientsData[this.props.id].status;
        }

        let profileCompleted = null;
        let profileData = '';
        if (currentPatient.stages.entryProfile !== undefined) {
            profileCompleted = currentPatient.stages.entryProfile;
            if (profileCompleted === true) {
                let profilePath = currentPatient.completedTests.entryProfile;
                let testKey = Object.keys(profilePath);
                if (testKey.length !== 1) {
                    profileData = profilePath
                } else {
                    profileData = profilePath[testKey];
                }
            }
        }

        let content = '';

        let miniPatientContent = <div className={classes.Patient}
                                      onClick={(id) => this.showMoreHandler(this.props.id)}>
            <p className={classes.Patient__p}>id: {currentPatient.id} </p>
            <div className={classes.Patient__nameContent}>
                <p className={classes.Patient__name}>{this.props.surname} </p>
                <p className={classes.Patient__name}>{this.props.name} </p>
                <p className={classes.Patient__name}>{this.props.secondName} </p>
            </div>
            <p className={classes.Patient__p}>Дата
                регистрации: {new Date(this.props.registerDate).toLocaleString('ru-RU', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                })}</p>
            <p className={classes.Patient__p}>Статус: {currentPatient.status} </p>

            {
                (currentPatient.efficiency !== null && currentPatient.efficiency !== 'unknown' &&
                    <p className={classes.Patient__p}>Эффективность: {currentPatient.efficiency} </p>)
            }
        </div>;

        let showResultsContent = <div className={classes.PatientFull__results}>
            <p className={classes.PatientFull__link}
               onClick={(id) => this.showResultsHandler(this.props.id)}
            >Смотреть результаты тестирования / ЛЕЧЕНИЕ </p></div>;


        if (this.state.showMore) {
            content =
                <div>
                    <div className={classes.PatientFull}>
                        <div className={classes.PatientFull__baseInfo}>
                            <p className={classes.PatientFull__p}>id: {currentPatient.id} </p>
                            <p className={classes.PatientFull__p}>ФИО: {this.props.surname} {this.props.name} {this.props.secondName} </p>
                            <p className={classes.PatientFull__p}>Дата
                                регистрации: {new Date(this.props.registerDate).toLocaleString('ru-RU', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric'
                                })}</p>
                        </div>
                        <p className={classes.PatientFull__date}> Дней под
                            наблюдением: {this.state.daysFromRegister} </p>
                        <p className={classes.PatientFull__status}>Статус: {currentPatient.status} </p>

                        {(profileCompleted === true && !this.state.showProfile &&
                            <div className={classes.PatientFull__results}>
                                <p className={classes.PatientFull__link}
                                   onClick={(id) => this.showProfileHandler(this.props.id)}
                                >Смотреть результаты анкеты </p></div>)
                        ||
                        (profileCompleted === true &&
                            <EntryProfile profileData={profileData}
                                          clicked={(id) => this.showProfileHandler(this.props.id)}/>)
                        }


                        {
                            (currentPatient.status === 'Ожидает повторный прием в течение 7 дней'
                                && !this.state.showResults && showResultsContent)
                            ||
                            (currentPatient.status === 'Часть 2 не требуется. Ожидает повторный прием в течение 7 дней'
                                && !this.state.showResults && showResultsContent)
                            ||
                            (currentPatient.status === 'Ожидает повторный прием в течение 7 дней' &&
                                <Treatment id={this.props.id}
                                           clicked={(id) => this.showResultsHandler(this.props.id)}/>)
                            ||
                            (currentPatient.status === 'Часть 2 не требуется. Ожидает повторный прием в течение 7 дней' &&
                                <Treatment id={this.props.id}
                                           clicked={(id) => this.showResultsHandler(this.props.id)}/>)

                        }


                        {status === 'Ожидает анкетирование' &&
                        <button className={classes.PatientFull__firstEntryButton}
                                onClick={this.props.entryProfileHandler}>Начать анкетирование</button>
                        }


                        {(status === 'Ожидает тест: наличие стоматита' && !this.props.testStarted &&
                            <button className={classes.PatientFull__firstEntryButton}
                                    onClick={this.props.testsHandler}>Начать тест: наличие стоматита </button>)
                        ||
                        (status === 'Ожидает тест: наличие стоматита' &&
                            <TestCore questions={TestList.stomatitisPresence} patientId={this.props.id}/>)}


                        {(status === 'Ожидает тест: Часть 1 - Риск развития' && !this.props.testStarted &&
                            <button className={classes.PatientFull__firstEntryButton}
                                    onClick={this.props.testsHandler}>Начать тест: Часть 1 - Риск
                                развития </button>)
                        ||
                        (status === 'Ожидает тест: Часть 1 - Риск развития' &&
                            <TestCore questions={TestList.riskDevelopment} patientId={this.props.id}/>)}


                        {(status === 'Ожидает тест: Часть 2 - Степень тяжести' && !this.props.testStarted &&
                            <button className={classes.PatientFull__firstEntryButton}
                                    onClick={this.props.testsHandler}>Начать тест: Часть 2 - Степень
                                тяжести </button>)
                        ||
                        (status === 'Ожидает тест: Часть 2 - Степень тяжести' &&
                            <TestCore questions={TestList.severity} patientId={this.props.id}/>)}


                        {(status === 'Ожидает повторный прием в течение 7 дней' && !this.state.repeatedEntry &&
                            <button className={classes.PatientFull__firstEntryButton}
                                    onClick={this.repeatedEntryHandler}>Начать повторный прием </button>)
                        ||
                        (status === 'Ожидает повторный прием в течение 7 дней' && !this.props.testStarted &&
                            <div className={classes.PatientFull__secondEntryButtons}>
                                <button className={classes.PatientFull__firstEntryButton}
                                        onClick={this.secondEntryClinic}> Клинические исследования
                                </button>
                                <button className={classes.PatientFull__firstEntryButton}
                                        onClick={this.secondEntryLaboratory}> Лабораторные исследования
                                </button>
                            </div>)
                        ||
                        (status === 'Ожидает повторный прием в течение 7 дней' && this.props.testStarted &&
                            <TestCore questions={TestList.clinicNow} patientId={this.props.id}/>)
                        }

                        {(status === 'Часть 2 не требуется. Ожидает повторный прием в течение 7 дней' && !this.state.repeatedEntry &&
                            <button className={classes.PatientFull__firstEntryButton}
                                    onClick={this.repeatedEntryHandler}>Начать повторный прием </button>)
                        ||
                        (status === 'Часть 2 не требуется. Ожидает повторный прием в течение 7 дней' && !this.props.testStarted &&
                            <div className={classes.PatientFull__secondEntryButtons}>
                                <button className={classes.PatientFull__firstEntryButton}
                                        onClick={this.secondEntryClinic}> Клинические исследования
                                </button>
                                <button className={classes.PatientFull__firstEntryButton}
                                        onClick={this.secondEntryLaboratory}> Лабораторные исследования
                                </button>
                            </div>)
                        ||
                        (status === 'Часть 2 не требуется. Ожидает повторный прием в течение 7 дней' && this.props.testStarted &&
                            <TestCore questions={TestList.clinicNow} patientId={this.props.id}/>)
                        }


                        {
                            (status === 'ВЫПИСАН' &&
                                <div>
                                    <button className={classes.PatientFull__firstEntryButton}
                                            onClick={this.repeatedEntryHandler}> СМОТРЕТЬ ЭПИКРИЗ
                                    </button>
                                    <button className={classes.PatientFull__firstEntryButton}
                                            onClick={this.repeatedEntryHandler}> РЕЦИДИВ / Восстановить и начать прием
                                    </button>
                                </div>
                            )
                        }


                        <button className={classes.Patient__showMore}
                                onClick={(id) => this.showMoreHandler(this.props.id)}>
                            {this.state.showMore ? 'Скрыть' : 'Подробнее'}
                        </button>
                        <button className={classes.Patient__btnDelete}
                                onClick={(id) => this.deletePatientHandler(this.props.id)}>
                            Удалить пациента из базы
                        </button>
                    </div>
                </div>

        } else {
            content = miniPatientContent;
        }

        return (
            content
        )
    }
}

const mapStateToProps = (state) => {
    return {
        patientsData: state.patientData.patients,
        testStarted: state.patientData.testStarted,
        testFinished: state.patientData.testFinished,

    }
};

const mapDispatchToProps = dispatch => {
    return {
        onHandleStatus: (patientId, status) => dispatch(actions.handleStatusInDb(patientId, status)),
        onHandleStage: (patientId, stage, value) => dispatch(actions.handleStageInDb(patientId, stage, value)),
        onDeletePatient: (patientId) => dispatch(actions.deletePatientFromDb(patientId)),
        onDischargePatient: (patientId) => dispatch(actions.dischargePatient(patientId)),
        onSetEfficiency: (patientId, efficiency) => dispatch(actions.setEfficiency(patientId, efficiency)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Patient);


//
// { status=='Ожидает повторный прием' &&
// <button className={classes.PatientFull__firstEntryButton}
//         onClick={this.props.entryProfileHandler}>Начать повторный прием</button>
// }