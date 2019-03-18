import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import myReducer from './reducers/reducers';
import {Provider} from 'react-redux';

const middleware = [ thunk ];
const store = createStore(myReducer, applyMiddleware(...middleware));


ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
