import * as ActionTypes from './ActionTypes';

export const FavouriteTheories=(state = {
        isLoading: true,
        errMess: null,
        favourite_theories: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_FAVOURITE_THEORIES:
            return {...state, isLoading: false, errMess: null, favourite_theories: action.payload};

        case ActionTypes.FAVOURITE_THEORIES_LOADING:
            return {...state, isLoading: true, errMess: null, favourite_theories: []};

        case ActionTypes.FAVOURITES_THEORIES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, favourite_theories: []};

        default:
            return state;
    }
}