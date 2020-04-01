import React from "react";
import classes from './Treatment.css';
import {connect} from "react-redux";

const treatment = (props) => {
    const currentPatient = props.patientsData[props.id];
    const currentPatientStatus = props.patientsData[props.id].status;


    let stomatitisPresenceResults = null;
    let riskDevelopmentResults = null;
    let severityResults = null;

    let stomatitisPresencePath = currentPatient.completedTests['Наличие стоматита'];
    let stomatitisPresenceKey = Object.keys(stomatitisPresencePath);
    if (stomatitisPresenceKey.length !== 1) {
        stomatitisPresenceResults = stomatitisPresencePath.totalScore;
    } else {
        stomatitisPresenceResults = stomatitisPresencePath[stomatitisPresenceKey].totalScore;
    }

    let riskDevelopmentPath = currentPatient.completedTests['Часть 1 - Риск развития'];
    let riskDevelopmentKey = Object.keys(riskDevelopmentPath);
    if (riskDevelopmentKey.length !== 1) {
        riskDevelopmentResults = riskDevelopmentPath.totalScore;
    } else {
        riskDevelopmentResults = riskDevelopmentPath[riskDevelopmentKey].totalScore;
    }

    if (currentPatient.completedTests['Часть 2 - Степень тяжести'] !== undefined) {
        if (currentPatientStatus !== 'Часть 2 не требуется. Ожидает повторный прием в течение 7 дней') {
            let severityPath = currentPatient.completedTests['Часть 2 - Степень тяжести'];
            let severityKey = Object.keys(severityPath);
            if (severityKey.length !== 1) {
                severityResults = severityPath.totalScore;
            } else {
                severityResults = severityPath[severityKey].totalScore;
            }
        }
    }


    let msg = '';
    let risk = '';
    let acid = '';
    let gel = '';

    if (riskDevelopmentResults <= 10) {
        risk = 'Низкий'
    } else if (riskDevelopmentResults > 10 && riskDevelopmentResults <= 20) {
        risk = 'Умеренный'
    } else if (riskDevelopmentResults > 20 && riskDevelopmentResults <= 30) {
        risk = 'Высокий';
    }

    if (severityResults) {
        if (severityResults <= 3) {
            acid = 'по 1 капсуле в день: 30 дней';
            gel = '2 раза в день: 4-5 дней';
        } else if (severityResults > 3 && severityResults <= 6) {
            acid = 'по 1 капсуле 2 раза в день: 30 дней';
            gel = '3 раза в день: 6-7 дней';
        } else if (severityResults > 6 && severityResults <= 9) {
            acid = 'по 2 капсулы 2 раза в день: 30 дней';
            gel = '4 раза в день: 8-10 дней';
        }
    }

    if (!severityResults) {
        msg =
            <div className={classes.Treatment}>
                <p className={classes.Treatment__title}>Результат теста:</p>
                <div className={classes.Treatment__content}>
                    <p>Риск развития РАС: {risk}</p>
                    <p className={classes.Treatment__title}> Назначения:</p>
                    <p>Рекомендации по питанию.</p>
                    <p>Коррекция выявленных нарушений.</p>
                    <p>Санация полости рта.</p>
                    <p>Профессиональная гигиена полости рта</p>
                    {risk === 'Высокий' &&
                    <p>Профилактический курс гиалуроновой кислоты в капсулах: 1 раз в год, по 1 капсуле, 1 месяц</p>}
                </div>
            </div>;
    } else if (severityResults && stomatitisPresenceResults === 3) {
        msg =
            <div className={classes.Treatment}>
                <p className={classes.Treatment__title}>Результат теста:</p>
                <div className={classes.Treatment__content}>
                    <p>Риск развития РАС: {risk}</p>
                    <p className={classes.Treatment__title}> Назначения:</p>
                    <p>Рекомендации по питанию.</p>
                    <p>Коррекция выявленных нарушений.</p>
                    <p>Санация полости рта.</p>
                    <p>Профессиональная гигиена полости рта</p>
                    {risk === 'Высокий' &&
                    <p>Профилактический курс гиалуроновой кислоты в капсулах: 1 раз в год, по 1 капсуле, 1 месяц</p>}
                </div>
                <div className={classes.Treatment__content}>
                    <p> Курс Гиалуроновой кислоты в капсулах для приема внутрь {acid} </p>
                </div>
            </div>;
    } else if (severityResults && stomatitisPresenceResults === 5) {
        msg =
            <div className={classes.Treatment}>
                <p className={classes.Treatment__title}>Результат теста:</p>
                <div className={classes.Treatment__content}>
                    <p> Риск развития РАС: {risk}</p>
                    <p className={classes.Treatment__title}> Назначения:</p>
                    <p>Рекомендации по питанию.</p>
                    <p>Коррекция выявленных нарушений.</p>
                    <p>Санация полости рта.</p>
                    <p>Профессиональная гигиена полости рта</p>
                    {risk === 'Высокий' &&
                    <p>Профилактический курс гиалуроновой кислоты в капсулах: 1 раз в год, по 1 капсуле, 1 месяц</p>}
                </div>
                <div className={classes.Treatment__content}>
                    <p> Курс Гиалуроновой кислоты в капсулах для приема внутрь {acid} </p>
                </div>
                <div className={classes.Treatment__content}>
                    <p> Курс аппликаций геля "Гиалудент" {gel} </p>
                </div>
            </div>;
    }

    return (
        <div onClick={props.clicked}>
            {msg}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        patientsData: state.patientData.patients,
    }
};

export default connect(mapStateToProps)(treatment);