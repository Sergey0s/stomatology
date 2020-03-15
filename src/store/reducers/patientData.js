import * as actionTypes from '../actions/actionTypes'

const initialState = {
    patientsExist: false,
    pageLoading: true,
    patients: []
};


const patientData = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_PATIENTS: {
            return {
                ...state,
                patients: action.patients,
                patientsExist: action.patientsExist,
                pageLoading: false
            }
        }
        case actionTypes.FIRST_ENTRY_SUCCESS: {
            return {
                ...state,
                ...state.patients[action.patientId],
                firstEntryTest: action.entryFormData}
        }
        case actionTypes.TEST_COMPLETED_SUCCESS: {
            return {
                ...state,
                completedTests: {
                    name: action.testName,
                    totalScore: action.totalScore,
                    date: new Date()
                }
            }
        }
        default: return state
    }
};

export default patientData;
