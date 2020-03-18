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
    if (Object.keys(patients).length !== 0) {
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
        axios.post('/patients/' + patientId + '/completedTests/' + testName + '.json', {totalScore, date: new Date()})
            .then(response => {
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

export const testStarted = () => {
    return {
        type: actionTypes.TEST_STARTED
    }
};

export const handleStatusInDb = (patientId, status) => {
    return dispatch => {
        axios.patch('/patients/' + patientId + '/.json', {status: status})
            .then(response => {
                dispatch(saveStatus(patientId, status))
            })
    }
};


export const saveStatus = (patientId, status) => {
    return {
        type: actionTypes.HANDLE_STATUS,
        patientId,
        status
    }
};

export const handleStageInDb = (patientId, stage) => {
    return dispatch => {
        axios.patch('/patients/' + patientId + '/stages/.json', {[stage]: true})
            .then(response => {
                dispatch(saveStage(patientId, stage))
            })
    }
};


export const saveStage = (patientId, stage) => {
    return {
        type: actionTypes.HANDLE_STAGE,
        patientId,
        stage
    }
};

export const deletePatientFromDb = (patientId) => {
    return dispatch => {
        axios.delete('/patients/' + patientId + '.json')
            .then(response => {
                dispatch(deletePatientFromStore(patientId))
            })
    }
};


export const deletePatientFromStore = (patientId) => {
    return {
        type: actionTypes.DELETE_PATIENT,
        patientId,
    }
};