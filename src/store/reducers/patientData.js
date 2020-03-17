import * as actionTypes from '../actions/actionTypes'

const initialState = {
    patientsExist: false,
    pageLoading: true,
    testStarted: false,
    testFinished: false,
    patients: []
};


const patientData = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_PATIENTS: {
            return {
                ...state,
                patients: action.patients,
                patientsExist: action.patientsExist,
                pageLoading: false
            }
        }
        case actionTypes.ENTRY_PROFILE_SUCCESS: {
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.patientId]: {
                        ...state.patients[action.patientId],
                        stages: {
                            ...state.patients[action.patientId].stages,
                            entryProfile: true,
                        },
                        status: 'Ожидает тест: наличие стоматита',
                        completedTests: {
                            entryProfile: action.entryFormData
                        }
                    }
                }
            }
        }

        case actionTypes.TEST_COMPLETED_SUCCESS: {
            if (action.testName === 'Наличие стоматита') {
                return {
                    ...state,
                    testStarted: false,
                    testFinished: true,
                    patients: {
                        ...state.patients,
                        [action.patientId]: {
                            ...state.patients[action.patientId],
                            stages: {
                                ...state.patients[action.patientId].stages,
                                stomatitisPresence: true,
                            },
                            status: 'Ожидает тест: Часть 1 - Риск развития',
                            completedTests: {
                                ...state.patients[action.patientId].completedTests,
                                [action.testName]: {
                                    totalScore: action.totalScore,
                                    date: new Date()
                                }
                            }
                        }
                    }
                }
            } else if (action.testName === 'Часть 1 - Риск развития') {
                return {
                    ...state,
                    testStarted: false,
                    testFinished: true,
                    patients: {
                        ...state.patients,
                        [action.patientId]: {
                            ...state.patients[action.patientId],
                            stages: {
                                ...state.patients[action.patientId].stages,
                                riskDevelopment: true,
                            },
                            status: 'Ожидает тест: Часть 2 - Степень тяжести',
                            completedTests: {
                                ...state.patients[action.patientId].completedTests,
                                [action.testName]: {
                                    totalScore: action.totalScore,
                                    date: new Date()
                                }
                            }
                        }
                    }
                }
            } else if (action.testName === 'Часть 2 - Степень тяжести') {
                return {
                    ...state,
                    testStarted: false,
                    testFinished: true,
                    patients: {
                        ...state.patients,
                        [action.patientId]: {
                            ...state.patients[action.patientId],
                            stages: {
                                ...state.patients[action.patientId].stages,
                                severity: true,
                            },
                            status: 'Ожидает повторный прием в течение 7 дней',
                            completedTests: {
                                ...state.patients[action.patientId].completedTests,
                                [action.testName]: {
                                    totalScore: action.totalScore,
                                    date: new Date()
                                }
                            }
                        }
                    }
                }
            }





            else {
                return {
                    ...state,
                    testStarted: false,
                    testFinished: true,
                    patients: {
                        ...state.patients,
                        [action.patientId]: {
                            ...state.patients[action.patientId],
                            completedTests: {
                                ...state.patients[action.patientId].completedTests,
                                [action.testName]: {
                                    totalScore: action.totalScore,
                                    date: new Date()
                                }
                            }
                        }
                    }
                }
            }
        }
        case actionTypes.TEST_STARTED: {
            return {
                ...state,
                testStarted: true
            }
        }

        default: return state
    }
};

export default patientData;
