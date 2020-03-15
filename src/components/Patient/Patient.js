import React, {Component} from "react";
import classes from './Patient.css';
import {connect} from "react-redux";

class Patient extends Component {
    state = {
        showMore: false
    };


    render() {

        const showMoreHandler = (id) => {
            console.log(id);
            this.setState({showMore: !this.state.showMore})
        };

         const currentPatient = this.props.patientsData[this.props.id];

         let status = null;
        if (this.props.patientsData[this.props.id].status !== undefined) {
            status = this.props.patientsData[this.props.id].status;
        }
        console.log(status);


        // console.log(this.props.patientsData);
        // const currentPatient = this.props.patientsData[this.props.id];
        // let entryProfile = null;
        // // console.log(this.props.patientsData[this.props.id]);
        // if (this.props.patientsData[this.props.id].completedTests !== undefined) {
        //     entryProfile = this.props.patientsData[this.props.id].completedTests.entryProfile;
        // }
        // console.log(entryProfile);

        // let updatedEntryProfile = [];
        // if (entryTest) {
        //     for (let key in entryTest) {
        //         updatedEntryTest.push(entryTest[key])
        //     }
        // }

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

                        { status=='Ожидает анкетирование' &&
                        <button className={classes.PatientFull__firstEntryButton}
                                onClick={this.props.entryProfileHandler}>Начать анкетирование</button>
                        }

                        { status=='Ожидает анкетирование' &&
                        <button className={classes.PatientFull__firstEntryButton}
                                onClick={this.props.entryProfileHandler}>Начать анкетирование</button>
                        }

                        { status=='Ожидает анкетирование' &&
                        <button className={classes.PatientFull__firstEntryButton}
                                onClick={this.props.entryProfileHandler}>Начать анкетирование</button>
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
        </div>

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