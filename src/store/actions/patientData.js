import axios from '../../axios-orders';
import * as actionTypes from './actionTypes'

export const setPatientsData = (patients) => {
    if (patients === null) {
        return {
            type: actionTypes.INIT_PATIENTS,
            patients,
            pageLoading: false
        }
    }
     if (Object.keys(patients).length!==0) {
         return {
             type: actionTypes.INIT_PATIENTS,
             patients,
             patientsExist: true,
             pageLoading: false
         };
     }
};

export const getPatientsData = () => {
    return dispatch => {
        axios.get('/patients.json')
            .then(response => {
                dispatch(setPatientsData(response.data))
            })
    }
};

export const entryProfileSuccess = (patientId, entryFormData) => {
    return dispatch =>
    axios.post('/patients/' + patientId + '/completedTests/entryProfile.json', entryFormData)
        .then(response => {
            dispatch(saveProfile(patientId, entryFormData));
            axios.patch('/patients/' + patientId + '/.json', {status: 'Ожидает тест: наличие стоматита'});
            axios.patch('/patients/' + patientId + '/stages/.json', {entryProfile: true});
        });
};

export const saveProfile = (patientId, entryFormData) => {
    return {
        type: actionTypes.ENTRY_PROFILE_SUCCESS,
        patientId: patientId,
        entryFormData: entryFormData
    }
};

export const testCompletedSuccess = (patientId, testName, totalScore) => {
    return dispatch => {
        axios.post('/patients/' + patientId + '/completedTests/' + testName + '.json', { totalScore, date: new Date() })
            .then(response => {
                console.log(response);
                dispatch(saveTestResults(patientId, testName, totalScore))
                if (testName === 'Наличие стоматита') {
                    axios.patch('/patients/' + patientId + '/.json', {status: 'Ожидает тест: Часть 1 - Риск развития'});
                    axios.patch('/patients/' + patientId + '/stages/.json', {stomatitisPresence: true});
                }
                if (testName === 'Часть 1 - Риск развития') {
                    axios.patch('/patients/' + patientId + '/.json', {status: 'Ожидает тест: Часть 2 - Степень тяжести'});
                    axios.patch('/patients/' + patientId + '/stages/.json', {riskDevelopment: true});
                }
                if (testName === 'Часть 2 - Степень тяжести') {
                    axios.patch('/patients/' + patientId + '/.json', {status: 'Ожидает повторный прием в течение 7 дней'});
                    axios.patch('/patients/' + patientId + '/stages/.json', {severity: true});
                }
            })
    };
};

export const saveTestResults = (patientId, testName, totalScore) => {
    return {
        type: actionTypes.TEST_COMPLETED_SUCCESS,
        patientId: patientId,
        testName,
        totalScore,
    }
};

export const testStarted = () => {
    return {
        type: actionTypes.TEST_STARTED
    }
};
