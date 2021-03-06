import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Aux from './hoc/Auxiliary/Auxiliary';
import PatientRegistration from './containers/Form/PatientRegistration/PatientRegistration';
import Patients from "./containers/Patients/Patients";
import FirstEntry from "./containers/FirstEntry/FirstEntry";
// import MainMenu from './containers/MainMenu/MainMenu';

class App extends Component {
    render() {
        let routes = (
            <Switch>
                <Route path='/firstEntry' component={FirstEntry}/>
                <Route path='/patients/register' component={PatientRegistration}/>
                <Route path='/patients' component={Patients}/>
                <Route path='/' component={Patients}/>
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
