import React, {Component} from "react";
import classes from './Patient.css';
import {connect} from "react-redux";
import EntryProfile from '../../../components/EntryProfile/EntryProfile';
import TestCore from "../../TestCore/TestCore";
import {TestList} from '../../../DataBase/TestsList';
import Treatment from "../../../components/Treatment/Treatment";
import Efficiency from "../../../components/Efficiency/Efficiency";
import Epicrisis from "../../../components/Epicrisis/Epicrisis";
import * as actions from "../../../store/actions";

class Patient extends Component {
    state = {
        daysFromRegister: null,
        daysFromLastEntry: null,
        firstPartCompleted: false,
        showMore: false,
        showProfile: false,
        showResults: false,
        showEpicrisis: false,
        repeated: null
    };

    componentDidMount() {
        this.dataEntryCheckHandler();
    }

    componentDidUpdate(nextProps, nextState, nextContext) {
        this.firstPartCompletedHandler();
    }

    showProfileHandler = (id) => {
        this.setState({showProfile: !this.state.showProfile})
    };

    showResultsHandler = (id) => {
        this.setState({showResults: !this.state.showResults})
    };

    showEpicrisisHandler = (id) => {
        this.setState({showEpicrisis: !this.state.showEpicrisis})
    };

    showMoreHandler = (id) => {
        this.setState({showMore: !this.state.showMore})
    };

    deletePatientHandler = (id) => {
        this.props.onDeletePatient(id);
    };


    repeatedEntryHandler = () => {
        this.props.onRepeatedEntryHandler(this.props.id, !this.props.patientsData[this.props.id].stages.repeatedEntry);
    };

    secondEntryClinic = (id) => {
        this.setState({repeated: 'clinic'});
        this.repeatedEntryHandler();
        this.props.testsHandler();
    };

    secondEntryLaboratory = (id) => {
        this.props.testsHandler();
        this.setState({repeated: 'laboratory'});
        this.repeatedEntryHandler();
        this.props.testsHandler();
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

    firstPartCompletedHandler() {
        if ((this.props.patientsData[this.props.id].status === 'Ожидает повторный прием в течение 7 дней' ||
            this.props.patientsData[this.props.id].status === 'Часть 2 не требуется. Ожидает повторный прием в течение 7 дней')
            && !this.state.firstPartCompleted) {
            this.setState({firstPartCompleted: true})
        }
    }


    render() {

        const currentPatient = this.props.patientsData[this.props.id];
        // if (this.state.daysFromLastEntry > 8 && !currentPatient.discharge) {
        //     this.props.onDischargePatient(this.props.id);
        //     this.props.onSetEfficiency(this.props.id, 'ВЫСОКАЯ')
        // }

        let questionListForSecondStage = null;
        if (this.state.daysFromLastEntry > 7 && this.state.repeated === 'clinic') {
            questionListForSecondStage = TestList.clinicFuture
        } else questionListForSecondStage = TestList.clinicNow;

        if (this.state.repeated === 'laboratory') {
            if (this.state.daysFromLastEntry < 7) {
                questionListForSecondStage = TestList.laboratoryAnalysisNow
            } else if (this.state.daysFromLastEntry > 7 && this.state.daysFromLastEntry < 181) {
                questionListForSecondStage = TestList.laboratoryAnalysisFuture
            } else questionListForSecondStage = TestList.laboratoryAnalysisFarFuture;
        }

        if (currentPatient.stageChanged && !currentPatient.stages.repeatedEntry && currentPatient.status !== 'Ожидает повторный прием в течение 7 дней') {
            let stage = '1';

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

        if (currentPatient.statusChanged && !currentPatient.stages.repeatedEntry && currentPatient.status !== 'Ожидает повторный прием в течение 7 дней') {

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

        if (currentPatient.statusChanged && currentPatient.stages.repeatedEntry) {
            this.props.onHandleStatus(this.props.id, 'Ожидает повторный прием в течение 7 дней');
        }

        if (currentPatient.stageChanged && currentPatient.stages.repeatedEntry) {
            this.props.onHandleStage(this.props.id, 'repeatedEntry');
            // пересчет эффективности
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

        let miniPatientContent =
            <div className={classes.Patient}
                 onClick={(id) => this.showMoreHandler(this.props.id)}>
                <p className={classes.Patient__id}>id: {currentPatient.id} </p>
                <div className={classes.Patient__nameContent}>
                    <p className={classes.Patient__name}>{this.props.surname} </p>
                    <p className={classes.Patient__name}>{this.props.name} </p>
                    <p className={classes.Patient__name}>{this.props.secondName} </p>
                </div>
                <p className={classes.Patient__regDate}>Дата
                    регистрации: <br/> {new Date(this.props.registerDate).toLocaleString('ru-RU', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                    })}</p>
                <div className={classes.Patient__statuses}>
                    <p className={classes.Patient__p}>Статус: {currentPatient.status} </p>

                    {
                        (currentPatient.efficiency !== null && currentPatient.efficiency !== 'unknown' &&
                            <p className={classes.Patient__p}>Эффективность: {currentPatient.efficiency} </p>)
                    }
                </div>
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

                        {
                            (this.props.testFinished && currentPatient.result &&
                            <Efficiency lastEntryDate={this.state.daysFromLastEntry} id={this.props.id}/>)
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


                        {(this.state.firstPartCompleted && !this.props.testStarted && status !== 'ВЫПИСАН' &&
                            <div className={classes.PatientFull__secondEntryButtons}>
                                <button className={classes.PatientFull__firstEntryButton}
                                        onClick={this.secondEntryClinic}> Клинические исследования
                                </button>
                                <button className={classes.PatientFull__firstEntryButton}
                                        onClick={this.secondEntryLaboratory}> Лабораторные исследования
                                </button>
                                <button className={classes.PatientFull__firstEntryButton}
                                        onClick={() => this.props.onDischargePatient(this.props.id, Date())}> Выписать пациента
                                </button>
                            </div>)
                        ||
                        (this.state.firstPartCompleted && this.props.testStarted &&
                            <TestCore questions={questionListForSecondStage} patientId={this.props.id}/>)
                        }

                        {
                            (currentPatient.discharge && !this.state.showEpicrisis &&
                                <div className={classes.PatientFull__epicrisisRedischargeButtons} >
                                    <button className={classes.PatientFull__firstEntryButton}
                                            onClick={() => this.showEpicrisisHandler(this.props.id)}> СМОТРЕТЬ ЭПИКРИЗ
                                    </button>
                                    <button className={classes.PatientFull__firstEntryButton}
                                            onClick={() => this.props.onReturnPatient(this.props.id)}> РЕЦИДИВ /
                                        Восстановить и начать прием
                                    </button>
                                </div>
                            )
                            ||
                            (currentPatient.discharge && this.state.showEpicrisis &&
                                <div className={classes.PatientFull__epicrisisRedischargeButtons} onClick={() => this.showEpicrisisHandler(this.props.id)}>
                                    <Epicrisis id={this.props.id} />
                                    <button className={classes.PatientFull__firstEntryButton}
                                            onClick={() => this.props.onReturnPatient(this.props.id)}> РЕЦИДИВ /
                                        Восстановить и начать прием
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
        onHandleStage: (patientId, stage) => dispatch(actions.handleStageInDb(patientId, stage)),
        onDeletePatient: (patientId) => dispatch(actions.deletePatientFromDb(patientId)),
        onDischargePatient: (patientId, date) => dispatch(actions.dischargePatient(patientId, date)),
        onReturnPatient: (patientId) => dispatch(actions.returnPatient(patientId)),
        onRepeatedEntryHandler: (patientId, value) => dispatch(actions.repeatedEntryHandler(patientId, value))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Patient);