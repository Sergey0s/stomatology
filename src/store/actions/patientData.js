import axios from '../../axios-orders';
import * as actionTypes from './actionTypes'

export const setPatientsData = (patients) => {
    return {
        type: actionTypes.INIT_PATIENTS,
        patients: patients,
    };
};


export const getPatientsData = () => {
    return dispatch => {
        axios.get('/patients.json')
            .then(response => {
                dispatch(setPatientsData(response.data))
            })
    }
};

export const firstEntrySuccess = (patientId, entryFormData) => {
    return dispatch => {
        axios.post('/patients/'+patientId+'/patientData/entryProfile.json', entryFormData)
            .then(response => {
                console.log(response)
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

