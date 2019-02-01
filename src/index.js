import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import burgerBuilderReducer from './store/reducer/burgerBuilderReducer.js'
import orderReducer from './store/reducer/orderReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = store => {
    return next => {
        return action => {
            console.log('[MiddleWear] Dispatching',action);
            const result = next(action);
            console.log('[MiddleWear] next state',store.getState());
            return result;
        }
    }
}

const rootReducer = combineReducers({
    burgerBuilder : burgerBuilderReducer,
    order : orderReducer
})

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(logger,thunk)))

const app = (
    <Provider store = {store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)


ReactDOM.render( app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
