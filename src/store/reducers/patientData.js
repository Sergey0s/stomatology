import * as actionTypes from '../actions/actionTypes'

const initialState = {
    patientsExist: false,
    pageLoading: true,
    testStarted: false,
    testFinished: false,
    statusChanged: true,
    stageChanged: true,
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
                testFinished: false,
                statusChanged: true,
                stageChanged: true,
            }
        }
        case actionTypes.ENTRY_PROFILE_SUCCESS: {
            return {
                ...state,
                testFinished: false,
                statusChanged: true,
                stageChanged: true,
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
                statusChanged: false,
                stageChanged: false,
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

        case actionTypes.HANDLE_STATUS: {
            return {
                ...state,
                statusChanged: true,
                testFinished: false,
                patients: {
                    ...state.patients,
                    [action.patientId]: {
                        ...state.patients[action.patientId],
                        status: action.status
                    }
                }
            }
        }

        case actionTypes.HANDLE_STAGE: {
            return {
                ...state,
                stageChanged: true,
                statusChanged: false,
                testStarted: false,
                testFinished: false,
                patients: {
                    ...state.patients,
                    [action.patientId]: {
                        ...state.patients[action.patientId],
                        stages: {
                            ...state.patients[action.patientId].stages,
                            [action.stage]: action.value,
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
                statusChanged: true,
                stageChanged: true,
            }
        }

        default:
            return state
    }
};

export default patientData;
