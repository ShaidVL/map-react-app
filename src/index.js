import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import './index.css';
import App from './App';

const initialState = {
    points: [
        {
            point: [55.753215, 37.622504],
            info: 'Moscow'
        },
        {
            point: [37.622504, 55.753215],
            info: 'HE Moscow'
        }
    ],
    selectedList: [],
    changeInput: false,
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NEW_MARKER':
            return {...state, points: [...state.points, {point: action.point, info: action.info}]};
        case 'CHANGE_SELECTED_LIST':
            return {...state, selectedList: action.selectedList};
        case 'CHANGE_INPUT':
            return {...state, changeInput: action.payload};
        default:
            return state;
    }
};

const reducer = combineReducers({
    form: formReducer,
    appState: mainReducer,
});

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);