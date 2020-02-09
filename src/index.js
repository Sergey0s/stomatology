import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, combineReducers, applyMiddleware,compose} from "redux";
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import patientDataReducer from './store/reducers/patientData';

const rootReducer = combineReducers(
    {
        patientData: patientDataReducer
    }
);

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
