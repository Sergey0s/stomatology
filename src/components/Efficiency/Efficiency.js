import React, {useEffect} from "react";
// import classes from './Efficiency.css';
import {connect} from "react-redux";
import {TestList} from '../../DataBase/TestsList';
import * as actions from "../../store/actions";

const efficiency = (props) => {
    const currentPatient = props.patientsData[props.id];

    let clinicResult = null;
    let clinicEffect = null;

    if (currentPatient.completedTests['Клиника'] !==undefined) {
        let clinicPath = currentPatient.completedTests['Клиника'];
        if (clinicPath.totalScore !== undefined) {
            clinicResult = clinicPath.totalScore;
        } else {
            let clinicKeys = Object.keys(clinicPath);
            let clinicKey = null;
            if (clinicKeys.length>1) {
                clinicKey = clinicKeys[clinicKeys.length-1]
            } else clinicKey = clinicKeys[0];
            clinicResult = clinicPath[clinicKey].totalScore;
        }

        let clinicTest = null;

        if (clinicResult>12) {
            clinicTest = TestList.clinicFuture
        } else {
            if (props.lastEntryDate>7) {
                clinicTest = TestList.clinicFuture
            } else clinicTest = TestList.clinicNow;
        }

        clinicEffect = clinicTest.results.filter(el => {
            return (el.minScore<=clinicResult && el.maxScore>clinicResult) || (el.minScore<clinicResult && el.maxScore>=clinicResult)
        })[0].conclusion;
    }

    let laboratoryResult = null;
    let laboratoryEffect = null;

    if (currentPatient.completedTests['Лабораторные анализы'] !== undefined) {
        let laboratoryPath = currentPatient.completedTests['Лабораторные анализы'];
        if (laboratoryPath.totalScore !== undefined) {
            laboratoryResult = laboratoryPath.totalScore;
        } else {
            let laboratoryKeys = Object.keys(laboratoryPath);
            let laboratoryKey = null;
            if (laboratoryKeys.length>1) {
                laboratoryKey = laboratoryKeys[laboratoryKeys.length-1]
            } else laboratoryKey = laboratoryKeys[0];
            laboratoryResult = laboratoryPath[laboratoryKey].totalScore;
        }

        let laboratoryTest = null;

        if (laboratoryResult>22.5) {
            laboratoryTest = TestList.laboratoryAnalysisFuture;
        } else {
            if (props.lastEntryDate<7) {
                laboratoryTest = TestList.laboratoryAnalysisNow
            } else if (props.lastEntryDate > 7 && props.lastEntryDate < 181) {
                laboratoryTest = TestList.laboratoryAnalysisFuture
            } else laboratoryTest = TestList.laboratoryAnalysisFarFuture;
        }

        laboratoryEffect = laboratoryTest.results.filter(el => {
            return (el.minScore<=laboratoryResult && el.maxScore>laboratoryResult) || (el.minScore<laboratoryResult && el.maxScore>=laboratoryResult)
        })[0].conclusion;
    }

    let fullEffect = null;
    if (clinicEffect!==null && laboratoryEffect===null) {
        fullEffect = clinicEffect
    } else if (clinicEffect===null && laboratoryEffect!==null) {
        fullEffect = laboratoryEffect
    } else if (clinicEffect!==null && laboratoryEffect!==null) {

        if (clinicEffect==='Высокая' && laboratoryEffect==='Высокая') {
            fullEffect = 'Высокая'
        } else if (clinicEffect==='Высокая' && laboratoryEffect==='Средняя') {
            fullEffect = 'Средняя'
        } else if (clinicEffect==='Высокая' && laboratoryEffect==='Низкая') {
            fullEffect = 'Средняя'
        } else if (clinicEffect==='Высокая' && laboratoryEffect==='отсутствует') {
            fullEffect = 'Низкая'
        }
        else if (clinicEffect==='Средняя' && laboratoryEffect==='Высокая') {
            fullEffect = 'Средняя'
        }  else if (clinicEffect==='Средняя' && laboratoryEffect==='Средняя') {
            fullEffect = 'Средняя'
        }   else if (clinicEffect==='Средняя' && laboratoryEffect==='Низкая') {
            fullEffect = 'Низкая'
        }  else if (clinicEffect==='Средняя' && laboratoryEffect==='отсутствует') {
            fullEffect = 'Низкая'
        }
        else if (clinicEffect==='Низкая' && laboratoryEffect==='Высокая') {
            fullEffect = 'Средняя'
        } else if (clinicEffect==='Низкая' && laboratoryEffect==='Средняя') {
            fullEffect = 'Средняя'
        }  else if (clinicEffect==='Низкая' && laboratoryEffect==='Низкая') {
            fullEffect = 'Низкая'
        }  else if (clinicEffect==='Низкая' && laboratoryEffect==='отсутствует') {
            fullEffect = 'отсутствует'
        }
        else if (clinicEffect==='отсутствует' && laboratoryEffect==='Высокая') {
            fullEffect = 'Низкая'
        } else if (clinicEffect==='отсутствует' && laboratoryEffect==='Средняя') {
            fullEffect = 'Низкая'
        }  else if (clinicEffect==='отсутствует' && laboratoryEffect==='Низкая') {
            fullEffect = 'отсутствует'
        }  else if (clinicEffect==='отсутствует' && laboratoryEffect==='отсутствует') {
            fullEffect = 'отсутствует'
        } else fullEffect = 'Не удалось установить эффективность'
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        props.onSetEfficiency(props.id, fullEffect);
    }, []);

    return (
        <div>
        <p>Эффективность лечения: {fullEffect}</p>

            { (currentPatient.completedTests['Клиника'] !== undefined &&
                <p> Клиника: {clinicEffect}</p>)
            }

            { (currentPatient.completedTests['Лабораторные анализы']) !== undefined &&
                <p> Лаб. анализы: {laboratoryEffect}</p>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        patientsData: state.patientData.patients,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSetEfficiency: (patientId, efficiency) => dispatch(actions.setEfficiency(patientId, efficiency)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(efficiency);