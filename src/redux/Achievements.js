import * as ActionTypes from './ActionTypes';

export const Achievements=(state = {
        isLoading: true,
        errMess: null,
        achievements: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_ACHIEVEMENTS:
            return {...state, isLoading: false, errMess: null, achievements: action.payload};

        case ActionTypes.ACHIEVEMENTS_LOADING:
            return {...state, isLoading: true, errMess: null, achievements: []};

        case ActionTypes.ACHIEVEMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, achievements: []};

        default:
            return state;
    }
}