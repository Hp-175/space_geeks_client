import * as ActionTypes from './ActionTypes';

export const FavouriteAchievements=(state = {
        isLoading: true,
        errMess: null,
        favourite_achievements: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_FAVOURITE_ACHIEVEMENTS:
            return {...state, isLoading: false, errMess: null, favourite_achievements: action.payload};

        case ActionTypes.FAVOURITE_ACHIEVEMENTS_LOADING:
            return {...state, isLoading: true, errMess: null, favourite_achievements: []};

        case ActionTypes.FAVOURITES_ACHIEVEMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, favourite_achievements: []};

        default:
            return state;
    }
}