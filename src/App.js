import React, {Component} from 'react';

import Aux from './hoc/Auxiliary/Auxiliary';
import TestCreator from './containers/TestCreator/TestCreator';
import PatientData from './containers/Form/PatientData/PatientData';
import Patients from "./containers/Patients/Patients";

class App extends Component {
    render() {
        return (
            <Aux>
                <PatientData/>
                {/*<TestCreator/>*/}
                <Patients/>
            </Aux>
        )
    }
}
//
export default App;
