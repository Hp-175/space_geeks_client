import * as ActionTypes from './ActionTypes';

export const FavouriteFacts=(state = {
        isLoading: true,
        errMess: null,
        favourite_facts: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_FAVOURITE_FACTS:
            return {...state, isLoading: false, errMess: null, favourite_facts: action.payload};

        case ActionTypes.FAVOURITE_FACTS_LOADING:
            return {...state, isLoading: true, errMess: null, favourite_facts: []};

        case ActionTypes.FAVOURITES_FACTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, favourite_facts: []};

        default:
            return state;
    }
}