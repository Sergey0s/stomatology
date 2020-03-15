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
                console.log(response);
                dispatch(setPatientsData(response.data))
            })
    }
};

export const firstEntrySuccess = (patientId, entryFormData) => {
    return dispatch => {
        axios.post('/patients/' + patientId + '/patientData/entryProfile.json', entryFormData)
            .then(response => {
                console.log(response);
                dispatch(saveFirstEntry(patientId, entryFormData))
            })
    }
};

export const saveFirstEntry = (patientId, entryFormData) => {
    return {
        type: actionTypes.FIRST_ENTRY_SUCCESS,
        patientId: patientId,
        entryFormData: entryFormData
    }
};

export const testCompletedSuccess = (patientId, testName, totalScore) => {
    return dispatch => {
        axios.post('/patients/' + patientId + '/patientData/completedTests/' + testName + '.json', { totalScore, date: new Date() })
            .then(response => {
                console.log(response);
                dispatch(saveTestResults(patientId, testName, totalScore))
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
