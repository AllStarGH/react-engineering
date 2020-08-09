import { createStore, combinReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as home from './home/reducer';
import * as producation from './producation/reducer';

var store = createStore(
    combinReducers({ ...home, ...producation }),
    applyMiddleware(thunk)
);

export default store;