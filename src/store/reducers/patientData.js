import * as actionTypes from '../actions/actionTypes'

const initialState = {
    patients: null
};


const patientData = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_PATIENTS: {
            return {
                ...state,
                patients: action.patients}
        }
        case actionTypes.FIRST_ENTRY_SUCCESS: {
            return {
                ...state,
                ...state.patients[action.patientId].patientData,
                firstEntryTest: action.entryFormData}
        }
        default: return state
    }
};

export default patientData;
