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
                console.log(response.data);
                dispatch(setPatientsData(response.data))
                    // .catch(err => {
                    //     // dispatch(fetchIngredientsFailed(err.response.data))
                    // })
            })
    }
};