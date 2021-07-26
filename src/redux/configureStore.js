import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Achievements } from './Achievements';
import {Facts} from './Facts';
import {Theories} from './Theories';
import {FavouriteAchievements} from './FavouriteAchievements';
import {FavouriteFacts} from './FavouriteFacts';
import {FavouriteTheories} from './FavouriteTheories';
import {Auth} from './Auth';
import {Image} from './Image';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            achievements: Achievements,
            facts: Facts,
            theories:Theories,
            favouriteAchievements: FavouriteAchievements,
            favouriteFacts:FavouriteFacts,
            favouriteTheories:FavouriteTheories,
            auth: Auth,
            image:Image
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}