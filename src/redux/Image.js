import * as ActionTypes from './ActionTypes';

export const Image=(state = {
        imgName: '00',
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_IMAGE:
            return {...state, imgName: action.payload};
        case ActionTypes.SET_DEFAULT:
            return {...state,imgName:'00'};
        default:
            return state;
    }
}