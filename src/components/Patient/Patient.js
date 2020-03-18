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
        showMore: false,
        showProfile: false,
        showResults: false,
    };

    render() {
        const currentPatient = this.props.patientsData[this.props.id];

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
                case 'Ожидает повторный прием в течение 7 дней':
                    stage = 'clinicNow';
                    break;
                default:
                    stage = 'stomatitisPresence';
            }

            this.props.onHandleStage(this.props.id, stage);
        }

        if (currentPatient.statusChanged) {
            let status = '2';

            if (currentPatient.stages.riskDevelopment === false) {
                status = 'Ожидает тест: Часть 1 - Риск развития';
            } else if (currentPatient.completedTests['Наличие стоматита'].totalScore >= 3) {
                status = 'Ожидает тест: Часть 2 - Степень тяжести'
            } else {
                status = 'Ожидает повторный прием в течение 7 дней'
            }

            if (currentPatient.completedTests['Наличие стоматита'].totalScore < 3 && currentPatient.stages.riskDevelopment !== false) {
                status = 'Часть 2 не требуется. Ожидает повторный прием в течение 7 дней';
            }

            if (currentPatient.stages.riskDevelopment === true && currentPatient.stages.severity === true) {
                status = 'Ожидает повторный прием в течение 7 дней'
            }


            this.props.onHandleStatus(this.props.id, status);
        }

        const showMoreHandler = (id) => {
            this.setState({showMore: !this.state.showMore})
        };

        const deletePatientHandler = (id) => {
            this.props.onDeletePatient(id);
        };

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


        const showProfileHandler = (id) => {
            this.setState({showProfile: !this.state.showProfile})
        };

        const showResultsHandler = (id) => {
            this.setState({showResults: !this.state.showResults})
        };

        let content = '';

        let showResultsContent = <div className={classes.PatientFull__results}>
            <p className={classes.PatientFull__link}
               onClick={(id) => showResultsHandler(this.props.id)}
            >Смотреть результаты тестирования / ЛЕЧЕНИЕ </p></div>

        if (this.state.showMore) {
            content =
                <div>
                    <div className={classes.PatientFull}>
                        <div className={classes.PatientFull__baseInfo}>
                            <p className={classes.PatientFull__p}>id: {currentPatient.id} </p>
                            <p className={classes.PatientFull__p}>ФИО: {this.props.surname} {this.props.name} {this.props.secondName} </p>
                            <p className={classes.PatientFull__p}>Дата
                                регистрации: {new Date(this.props.registerDate).toLocaleString()}</p>
                        </div>
                        <p className={classes.PatientFull__status}>Статус: {currentPatient.status} </p>

                        {(profileCompleted === true && !this.state.showProfile &&
                            <div className={classes.PatientFull__results}>
                                <p className={classes.PatientFull__link}
                                   onClick={(id) => showProfileHandler(this.props.id)}
                                >Смотреть результаты анкеты </p></div>)
                        ||
                        (profileCompleted === true &&
                            <EntryProfile profileData={profileData}
                                          clicked={(id) => showProfileHandler(this.props.id)}/>)
                        }


                        {
                            (currentPatient.status === 'Ожидает повторный прием в течение 7 дней'
                                && !this.state.showResults && showResultsContent)
                            ||
                            (currentPatient.status === 'Часть 2 не требуется. Ожидает повторный прием в течение 7 дней'
                                && !this.state.showResults && showResultsContent)
                            ||
                            (currentPatient.status === 'Ожидает повторный прием в течение 7 дней' &&
                                <Treatment id={this.props.id} clicked={(id) => showResultsHandler(this.props.id)}/>)
                            ||
                            (currentPatient.status === 'Часть 2 не требуется. Ожидает повторный прием в течение 7 дней' &&
                                <Treatment id={this.props.id} clicked={(id) => showResultsHandler(this.props.id)}/>)

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


                        <button className={classes.Patient__showMore} onClick={(id) => showMoreHandler(this.props.id)}>
                            {this.state.showMore ? 'Скрыть' : 'Подробнее'}
                        </button>
                        <button className={classes.Patient__btnDelete} onClick={(id) => deletePatientHandler(this.props.id)}>
                            Удалить пациента из базы
                        </button>
                    </div>
                </div>

        } else content = <div className={classes.Patient}>
            <p className={classes.Patient__p}>id: {currentPatient.id} </p>
            <p className={classes.Patient__p}>ФИО: {this.props.surname} {this.props.name} {this.props.secondName} </p>
            <p className={classes.Patient__p}>Дата регистрации: {new Date(this.props.registerDate).toLocaleString()}</p>
            <p className={classes.Patient__p}>Статус: {currentPatient.status} </p>
            <button className={classes.Patient__showMore} onClick={(id) => showMoreHandler(this.props.id)}>
                {this.state.showMore ? 'Скрыть' : 'Подробнее'}
            </button>
        </div>;

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
        // patientsExist: state.patientData.patientsExist,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onHandleStatus: (patientId, status) => dispatch(actions.handleStatusInDb(patientId, status)),
        onHandleStage: (patientId, stage, value) => dispatch(actions.handleStageInDb(patientId, stage, value)),
        onDeletePatient: (patientId) => dispatch(actions.deletePatientFromDb(patientId))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Patient);


//
// { status=='Ожидает повторный прием' &&
// <button className={classes.PatientFull__firstEntryButton}
//         onClick={this.props.entryProfileHandler}>Начать повторный прием</button>
// }