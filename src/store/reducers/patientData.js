import * as actionTypes from '../actions/actionTypes'

const initialState = {
    patientsExist: false,
    pageLoading: true,
    testStarted: false,
    testFinished: true,
    patients: []
};

const patientData = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_PATIENTS: {
            return {
                ...state,
                patients: action.patients,
                patientsExist: action.patientsExist,
                pageLoading: false,
                testFinished: true,
            }
        }
        case actionTypes.ENTRY_PROFILE_SUCCESS: {
            return {
                ...state,
                testFinished: true,
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
            return {
                ...state,
                testStarted: false,
                testFinished: true,
                patients: {
                    ...state.patients,
                    [action.patientId]: {
                        ...state.patients[action.patientId],
                        stageChanged: true,
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

        case actionTypes.HANDLE_STATUS: {
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.patientId]: {
                        ...state.patients[action.patientId],
                        status: action.status,
                        statusChanged: false,
                        stages: {
                            ...state.patients[action.patientId].stages,
                            repeatedEntry: false,
                        }
                    }
                }
            }
        }

        case actionTypes.HANDLE_STAGE: {
            return {
                ...state,
                testStarted: false,
                testFinished: true,
                patients: {
                    ...state.patients,
                    [action.patientId]: {
                        ...state.patients[action.patientId],
                        statusChanged: true,
                        stageChanged: false,
                        stages: {
                            ...state.patients[action.patientId].stages,
                            [action.stage]: true
                        }
                    }
                }
            }
        }

        case actionTypes.DELETE_PATIENT: {
            const fetchedPatients = [];
            for (let key in state.patients) {
                fetchedPatients.push({
                    ...state.patients[key],
                    patientId: key
                });
            }
            let updPatients = fetchedPatients.filter(patient => patient.patientId !== action.patientId);
            let newPatients = {};

            for (let key of updPatients) {
                newPatients[key.patientId] = key
            }

            return {
                ...state,
                 patients: newPatients,
                }
            }

        case actionTypes.DISCHARGE_PATIENT: {
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.patientId]: {
                        ...state.patients[action.patientId],
                        discharge: true
                    }
                }
            }
        }

        case actionTypes.RETURN_PATIENT: {
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.patientId]: {
                        ...state.patients[action.patientId],
                        discharge: false
                    }
                }
            }
        }

        case actionTypes.SET_EFFICIENCY: {
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.patientId]: {
                        ...state.patients[action.patientId],
                        efficiency: action.efficiency
                    }
                }
            }
        }

        case actionTypes.SET_LAST_ENTRY_DATE: {
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.patientId]: {
                        ...state.patients[action.patientId],
                        lastEntryDate: action.date
                    }
                }
            }
        }

        case actionTypes.SET_REPEATED_ENTRY: {
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.patientId]: {
                        ...state.patients[action.patientId],
                        discharge: false,
                        result: true,
                        stages: {
                            ...state.patients[action.patientId].stages,
                            repeatedEntry: action.value,
                        }
                    }
                }
            }
        }

        case actionTypes.TEST_STARTED: {
            return {
                ...state,
                testStarted: true,
                testFinished: false,
            }
        }

        default:
            return state
    }
};

export default patientData;
