import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as home from './home/reducer';
import * as producation from './production/reducer';

var store = createStore(
    combineReducers({ ...home, ...producation }),
    applyMiddleware(thunk)
);

export default store;