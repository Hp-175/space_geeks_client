import * as ActionTypes from './ActionTypes';

export const Theories=(state = {
        isLoading: true,
        errMess: null,
        theories: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_THEORIES:
            return {...state, isLoading: false, errMess: null, theories: action.payload};

        case ActionTypes.THEORIES_LOADING:
            return {...state, isLoading: true, errMess: null, theories: []};

        case ActionTypes.THEORIES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, theories: []};

        default:
            return state;
    }
}