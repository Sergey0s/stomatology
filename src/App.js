import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Aux from './hoc/Auxiliary/Auxiliary';
// import TestCreator from './containers/TestCreator/TestCreator';
import PatientData from './containers/Form/PatientData/PatientData';
import Patients from "./containers/Patients/Patients";
import FirstEntry from "./containers/FirstEntry/FirstEntry";

class App extends Component {
    render() {
        let routes = (
            <Switch>
                <Route path='/firstEntry' component={FirstEntry}/>
                <Route path='/patients' component={Patients}/>
                <Route path='/' component={PatientData}/>
                <Redirect to='/'/>
            </Switch>);

        return (
            <Aux>
                {routes}
            </Aux>
        )
    }
}

//
export default App;
