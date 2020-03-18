import React from "react";
import classes from './Treatment.css';
// import Aux from '../../hoc/Auxiliary/Auxiliary';
import {connect} from "react-redux";

const treatment = (props) => {
    const currentPatient = props.patientsData[props.id];


    let stomatitisPresenceResults = null;

    let stomatitisPresencePath = currentPatient.completedTests['Наличие стоматита'];
    let stomatitisPresenceKey = Object.keys(stomatitisPresencePath);
    if (stomatitisPresenceKey.length !== 1) {
        stomatitisPresenceResults = stomatitisPresencePath.totalScore;
    } else {
        stomatitisPresenceResults = stomatitisPresencePath[stomatitisPresenceKey].totalScore;
    }

    console.log(stomatitisPresenceResults);


    let riskDevelopmentResults = null;

    let riskDevelopmentPath = currentPatient.completedTests['Часть 1 - Риск развития'];
    let riskDevelopmentKey = Object.keys(riskDevelopmentPath);
    if (riskDevelopmentKey.length !== 1) {
        riskDevelopmentResults = riskDevelopmentPath.totalScore;
    } else {
        riskDevelopmentResults = riskDevelopmentPath[riskDevelopmentKey].totalScore;
    }

    console.log(riskDevelopmentResults);


    let severityResults = null;

    let severityPath = currentPatient.completedTests['Часть 2 - Степень тяжести'];
    let severityKey = Object.keys(severityPath);
    if (severityKey.length !== 1) {
        severityResults = severityPath.totalScore;
    } else {
        severityResults = severityPath[severityKey].totalScore;
    }

    console.log(severityResults);


    let msg = '';
    let risk = '';
    let acid = '';
    let gel = '';

    if (props.firstTestResult <= 10) {
        risk = 'Низкий'
    } else if (props.firstTestResult > 10 && props.firstTestResult <= 20) {
        risk = 'Умеренный'
    } else if (props.firstTestResult > 20 && props.firstTestResult <= 30) {
        risk = 'Высокий';
    }

    if (props.secondTestResult) {
        if (props.secondTestResult <= 3) {
            acid = 'по 1 капсуле в день: 30 дней';
            gel = '2 раза в день: 4-5 дней';
        } else if (props.secondTestResult > 3 && props.secondTestResult <= 6) {
            acid = 'по 1 капсуле 2 раза в день: 30 дней';
            gel = '3 раза в день: 6-7 дней';
        } else if (props.secondTestResult > 6 && props.secondTestResult <= 9) {
            acid = 'по 2 капсулы 2 раза в день: 30 дней';
            gel = '4 раза в день: 8-10 дней';
        }
    }

    if (!props.secondTestResult) {
        msg =
            <div className={classes.Treatment}>
                <p className={classes.Treatment__title}>Результат теста:</p>
                <p>{risk} риск развития РАC.</p>
                <p>Рекомендации по питанию.</p>
                <p>Коррекция выявленных нарушений.</p>
                <p>Санация полости рта.</p>
                <p>Профессиональная гигиена полости рта</p>
                {risk === 'Высокий' &&
                <p>Профилактический курс гиалуроновой кислоты в капсулах: 1 раз в год, по 1 капсуле, 1 месяц</p>}
            </div>;
    } else if (props.secondTestResult && !props.stomatitNow) {
        msg =
            <div className={classes.Treatment}>
                <p className={classes.Treatment__title}>Результат теста:</p>
                <p>{risk} риск развития РАC.</p>
                <p>Рекомендации по питанию.</p>
                <p>Коррекция выявленных нарушений.</p>
                <p>Санация полости рта.</p>
                <p>Профессиональная гигиена полости рта</p>
                {risk === 'Высокий' &&
                <p>Профилактический курс гиалуроновой кислоты в капсулах: 1 раз в год, по 1 капсуле, 1 месяц</p>}
                <div className={classes.Treatment}>
                    <p> Курс Гиалуроновой кислоты в капсулах для приема внутрь {acid} </p>
                </div>
            </div>;
    } else if (props.secondTestResult && props.stomatitNow) {
        msg =
            <div className={classes.Treatment}>
                <p className={classes.Treatment__title}>Результат теста:</p>
                <p>{risk} риск развития РАC.</p>
                <p>Рекомендации по питанию.</p>
                <p>Коррекция выявленных нарушений.</p>
                <p>Санация полости рта.</p>
                <p>Профессиональная гигиена полости рта</p>
                {risk === 'Высокий' &&
                <p>Профилактический курс гиалуроновой кислоты в капсулах: 1 раз в год, по 1 капсуле, 1 месяц</p>}
                <div className={classes.Treatment__content}>
                    <p>  {acid} </p>
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