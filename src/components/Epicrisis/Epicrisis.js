import React from "react";
import classes from './Epicrisis.css';
import {connect} from "react-redux";
import EntryProfile from '../EntryProfile/EntryProfile';
import Treatment from "../Treatment/Treatment";

const epicrisis = (props) => {
    const currentPatient = props.patientsData[props.id];
    const duration = Math.ceil((Date.parse(currentPatient.registerDate) - Date.parse(currentPatient.dischargeDate)) / (1000 * 60 * 60 * 24));
    const complaints = currentPatient.completedTests.entryProfile[Object.keys(currentPatient.completedTests.entryProfile)[0]]['0complaints'].value;
    const profileData = currentPatient.completedTests.entryProfile[Object.keys(currentPatient.completedTests.entryProfile)];


    return (
        <div className={classes.Epicrisis}>
            <p className={classes.Epicrisis__title}> ЭПИКРИЗ </p>
            <p className={classes.Epicrisis__content}> {currentPatient.surname} {currentPatient.name} {currentPatient.secondName} </p>
            <p> обратился (ась) <br/> в
                стоматологическую клинику ____________ (название клиники) <br/>
                {new Date(currentPatient.registerDate).toLocaleString('ru-RU', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                })} с жалобами на {complaints}.<br/>
                Длительность лечения составила {duration} дня (ей).</p>

            <p>Диагноз: К 12.0 - рецидивирующие афты полости рта</p>
            <p>Диагноз подтверждается данными объективного осмотра
                <EntryProfile profileData={profileData}/></p>

            <p>Лечение:
                <Treatment id={props.id}/>
            </p>

            <p>Состояние больного на момент выписки удовлетворительное.</p>
            <p>Эффективность лечения: {currentPatient.efficiency}</p>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        patientsData: state.patientData.patients,
    }
};

export default connect(mapStateToProps)(epicrisis);