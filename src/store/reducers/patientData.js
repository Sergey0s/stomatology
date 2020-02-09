import * as actionTypes from '../actions/actionTypes'

const initialState = {
    patients: null
};



const initPatientData = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_PATIENTS: {
            return {
                ...state,
                patients: action.patients}
        }
        default: return state
    }
};

export default initPatientData;

