import * as ActionTypes from './ActionTypes';

export const Facts=(state = {
        isLoading: true,
        errMess: null,
        facts: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_FACTS:
            return {...state, isLoading: false, errMess: null, facts: action.payload};

        case ActionTypes.FACTS_LOADING:
            return {...state, isLoading: true, errMess: null, facts: []};

        case ActionTypes.FACTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, facts: []};

        default:
            return state;
    }
}