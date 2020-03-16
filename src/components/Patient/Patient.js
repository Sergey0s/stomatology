import React, {Component} from "react";
import classes from './Patient.css';
import {connect} from "react-redux";
import EntryProfile from '../EntryProfile/EntryProfile';
import TestCore from "../../containers/TestCore/TestCore";

class Patient extends Component {
    state = {
        showMore: false,
        showProfile: false,
    };




    render() {
        console.log(this.props.testStarted)

        const showMoreHandler = (id) => {
            this.setState({showMore: !this.state.showMore})
        };

        const currentPatient = this.props.patientsData[this.props.id];

        let status = null;
        if (this.props.patientsData[this.props.id].status !== undefined) {
            status = this.props.patientsData[this.props.id].status;
        }
        // console.log(status);

        // console.log(currentPatient);
        let profileCompleted = currentPatient.stages.entryProfile;
        let profileData = '';
        if (profileCompleted === true) {
            let profilePath = currentPatient.completedTests.entryProfile;
            // console.log(profilePath);
            let testKey = Object.keys(profilePath);
           if (testKey.length!==1) {
               profileData = profilePath
           } else {
               profileData = profilePath[testKey];
           }
        }

        const showProfileHandler = (id) => {
            this.setState({showProfile: !this.state.showProfile})
        };

        let content = '';
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
                        <EntryProfile profileData={profileData} clicked={(id) => showProfileHandler(this.props.id)}/>)
                        }

                        {status === 'Ожидает анкетирование' &&
                        <button className={classes.PatientFull__firstEntryButton}
                                onClick={this.props.entryProfileHandler}>Начать анкетирование</button>
                        }

                        {(status === 'Ожидает первичный прием' && !this.props.testStarted &&
                        <button className={classes.PatientFull__firstEntryButton}
                                onClick={this.props.firstTestsHandler}>Начать первичный прием</button>)
                            ||
                        (status === 'Ожидает первичный прием' && <TestCore questionList = {this.props.testList}/>)
                        }


                        <button className={classes.Patient__showMore} onClick={(id) => showMoreHandler(this.props.id)}>
                            {this.state.showMore ? 'Скрыть' : 'Подробнее'}
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
            {/*{*/}
            {/*    (!entryProfile &&*/}
            {/*    <button className={classes.Patient__firstEntryButton} onClick={this.props.entryProfileHandler}>Первичный прием</button>)*/}
            {/*    ||*/}
            {/*    <div className={classes.Patient__firstEntryInfo}>*/}
            {/*        <p className={classes.Patient__span}> Результаты первого приема: </p>*/}
            {/*        <p className={classes.Patient__p}> Жалобы: {'жалобы'} </p>*/}
            {/*        <p className={classes.Patient__p}> Диагноз: К 12.0 - рецидивирующие афты полости рта</p>*/}
            {/*    </div>*/}
            {/*}*/}
        </div>;

        return (
            content
        )
    }
}

const mapStateToProps = (state) => {
    return {
        patientsData: state.patientData.patients
    }
};

export default connect(mapStateToProps)(Patient);


//
// { status=='Ожидает повторный прием' &&
// <button className={classes.PatientFull__firstEntryButton}
//         onClick={this.props.entryProfileHandler}>Начать повторный прием</button>
// }