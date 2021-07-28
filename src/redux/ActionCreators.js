import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';


export const fetchAchievements = () => (dispatch) => {
    dispatch(achievementsLoading(true));

    return fetch(baseUrl + 'SpaceAchievement')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(achievements => dispatch(addAchievements(achievements)))
        .catch(error => dispatch(achievementsFailed(error.message)));
}

export const achievementsLoading = () => ({
    type: ActionTypes.ACHIEVEMENTS_LOADING
});

export const achievementsFailed = (errmess) => ({
    type: ActionTypes.ACHIEVEMENTS_FAILED,
    payload: errmess
});

export const addAchievements = (achievements) => ({
    type: ActionTypes.ADD_ACHIEVEMENTS,
    payload: achievements
});

export const fetchFacts = () => (dispatch) => {
    dispatch(factsLoading(true));

    return fetch(baseUrl + 'Fact')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(facts => dispatch(addFacts(facts)))
        .catch(error => dispatch(factsFailed(error.message)));
}

export const factsLoading = () => ({
    type: ActionTypes.FACTS_LOADING
});

export const factsFailed = (errmess) => ({
    type: ActionTypes.FACTS_FAILED,
    payload: errmess
});

export const addFacts = (facts) => ({
    type: ActionTypes.ADD_FACTS,
    payload: facts
});

export const fetchTheories = () => (dispatch) => {
    dispatch(theoriesLoading(true));

    return fetch(baseUrl + 'FacinatingTheory')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(theories => dispatch(addTheories(theories)))
        .catch(error => dispatch(theoriesFailed(error.message)));
}

export const theoriesLoading = () => ({
    type: ActionTypes.THEORIES_LOADING
});

export const theoriesFailed = (errmess) => ({
    type: ActionTypes.THEORIES_FAILED,
    payload: errmess
});

export const addTheories = (theories) => ({
    type: ActionTypes.ADD_THEORIES,
    payload: theories
});

export const fetchFavouriteAchievements = () => (dispatch) => {
    dispatch(favouriteAchievementsLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'Favourite/favouriteAchievements', {
        method: 'GET',
        headers: {
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(favourite => dispatch(addFavouriteAchievements(favourite)))
    .catch(error => dispatch(favouriteAchievementsFailed(error.message)));
}

export const favouriteAchievementsLoading = () => ({
    type: ActionTypes.FAVOURITE_ACHIEVEMENTS_LOADING
});

export const favouriteAchievementsFailed = (errmess) => ({
    type: ActionTypes.FAVOURITES_ACHIEVEMENTS_FAILED,
    payload: errmess
});

export const addFavouriteAchievements = (favourite) => ({
    type: ActionTypes.ADD_FAVOURITE_ACHIEVEMENTS,
    payload: favourite
});

export const fetchFavouriteFacts = () => (dispatch) => {
    dispatch(favouriteFactsLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'Favourite/favouriteFacts', {
        method: 'GET',
        headers: {
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(favourite => dispatch(addFavouriteFacts(favourite)))
    .catch(error => dispatch(favouriteFactsFailed(error.message)));
}

export const favouriteFactsLoading = () => ({
    type: ActionTypes.FAVOURITE_FACTS_LOADING
});

export const favouriteFactsFailed = (errmess) => ({
    type: ActionTypes.FAVOURITES_FACTS_FAILED,
    payload: errmess
});

export const addFavouriteFacts = (favourite) => ({
    type: ActionTypes.ADD_FAVOURITE_FACTS,
    payload: favourite
});

export const fetchFavouriteTheories = () => (dispatch) => {
    dispatch(favouriteTheoriesLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'Favourite/favouriteTheories', {
        method: 'GET',
        headers: {
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(favourite => dispatch(addFavouriteTheories(favourite)))
    .catch(error => dispatch(favouriteTheoriesFailed(error.message)));
}

export const favouriteTheoriesLoading = () => ({
    type: ActionTypes.FAVOURITE_THEORIES_LOADING
});

export const favouriteTheoriesFailed = (errmess) => ({
    type: ActionTypes.FAVOURITES_THEORIES_FAILED,
    payload: errmess
});

export const addFavouriteTheories = (favourite) => ({
    type: ActionTypes.ADD_FAVOURITE_THEORIES,
    payload: favourite
});


export const postAchievement = (image, Information, credits,title) => (dispatch) => {

    const newPost = {
        image: image,
        Information: Information,
        credits: credits,
        title:title
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'SpaceAchievement', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response=>dispatch(fetchAchievements()))
    .catch(error => { console.log('Post Achievements ', error.message);
        alert('Your data could not be posted\nError: '+ error.message); })
}

export const postFact = (image, Information, credits,title) => (dispatch) => {

    const newPost = {
        image: image,
        Information: Information,
        credits: credits,
        title:title
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'Fact', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response=>dispatch(fetchFacts()))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Your data could not be posted\nError: '+ error.message); })
}

export const postTheory = (image, Information, By,title) => (dispatch) => {

    const newPost = {
        image: image,
        Information: Information,
        By: By,
        title:title
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'FacinatingTheory', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addTheories(response)))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Your data could not be posted\nError: '+ error.message); })
}

export const putAchievement = (image, Information, credits,title,_ID) => (dispatch) => {

    const updatePost = {
        image: image,
        Information: Information,
        credits: credits,
        title:title
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'SpaceAchievement/'+_ID, {
        method: 'PUT',
        body: JSON.stringify(updatePost),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => dispatch(fetchAchievements()))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Your data could not be posted\nError: '+ error.message); })
}

export const putFact = (image, Information, credits,title,_ID) => (dispatch) => {

    const updatePost = {
        image: image,
        Information: Information,
        credits: credits,
        title:title
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'Fact/'+_ID, {
        method: 'PUT',
        body: JSON.stringify(updatePost),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => dispatch(fetchFacts()))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Your data could not be posted\nError: '+ error.message); })
}

export const putTheory = (image, Information, By,title,_ID) => (dispatch) => {

    const updatePost = {
        image: image,
        Information: Information,
        By: By,
        title:title
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'FacinatingTheory/'+_ID, {
        method: 'PUT',
        body: JSON.stringify(updatePost),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => dispatch(fetchTheories()))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Your comment could not be posted\nError: '+ error.message); })
}

export const deleteAchievement = (_ID) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'SpaceAchievement/'+_ID, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => dispatch(fetchAchievements()))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Error: '+ error.message); })
}

export const deleteFact = (_ID) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'Fact/'+_ID, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => dispatch(fetchFacts()))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Error: '+ error.message); })
}

export const deleteTheory = (_ID) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'FacinatingTheory/'+_ID, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => dispatch(fetchTheories()))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Error: '+ error.message); })
}


export const postFavouriteAchievement = (_id) => (dispatch) => {

    const newFav = {
        _id:_id
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'Favourite/favouriteAchievements', {
        method: 'POST',
        body: JSON.stringify(newFav),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => dispatch(fetchFavouriteAchievements()))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Favourite achievement could not be added\nError: '+ error.message); })
}

export const postFavouriteFact = (_id) => (dispatch) => {

    const newFav = {
        _id:_id
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'Favourite/favouriteFacts', {
        method: 'POST',
        body: JSON.stringify(newFav),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => dispatch(fetchFavouriteFacts()))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Favourite fact could not be added\nError: '+ error.message); })
}

export const postFavouriteTheory = (_id) => (dispatch) => {

    const newFav = {
        _id:_id
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'Favourite/favouriteTheories', {
        method: 'POST',
        body: JSON.stringify(newFav),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => dispatch(fetchFavouriteTheories()))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Favourite Theory could not be added\nError: '+ error.message); })
}

export const deleteFavouriteAchievement = (_id) => (dispatch) => {

    const remFav = {
        _id:_id
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'Favourite/favouriteAchievements', {
        method: 'DELETE',
        body: JSON.stringify(remFav),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error( response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => dispatch(fetchFavouriteAchievements()))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Favourite achievement could not be removed from your list of favourates\nError: '+ error.message); })
}

export const deleteFavouriteFact = (_id) => (dispatch) => {

    const remFav = {
        _id:_id
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'Favourite/favouriteFacts', {
        method: 'DELETE',
        body: JSON.stringify(remFav),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => dispatch(fetchFavouriteFacts()))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Favourite fact could not be removed from your list of favourates\nError: '+ error.message); })
}

export const deleteFavouriteTheory = (_id) => (dispatch) => {

    const remFav = {
        _id:_id
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'Favourite/favouriteTheories', {
        method: 'DELETE',
        body: JSON.stringify(remFav),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => dispatch(fetchFavouriteTheories(response)))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Favourite theory could not be removed from your list of favourates\nError: '+ error.message); })
}

export const postAchievementComment = (comment,PID,CID) => (dispatch) => {

    const newComment = {
        comment:comment
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'SpaceAchievement/'+PID+'/comments/'+CID, {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => dispatch(fetchAchievements()))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Your comment could not be posted\nError: '+ error.message); })
}

export const deleteAchievementComment = (PID,CID) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'SpaceAchievement/'+PID+'/comments/'+CID, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => dispatch(fetchAchievements()))
    .catch(error => { console.log('DELETE comments ', error.message);
        alert('Error: '+ error.message); })
}

export const postFactComment = (comment,PID,CID) => (dispatch) => {

    const newComment = {
        comment:comment
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'Fact/'+PID+'/comments/'+CID, {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => dispatch(fetchFacts()))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Your comment could not be posted\nError: '+ error.message); })
}

export const deleteFactComment = (PID,CID) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'Fact/'+PID+'/comments/'+CID, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => dispatch(fetchFacts()))
    .catch(error => { console.log('DELETE comments ', error.message);
        alert('Error: '+ error.message); })
}

export const postTheoryComment = (comment,PID,CID) => (dispatch) => {

    const newComment = {
        comment:comment
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'FacinatingTheory/'+PID+'/comments/'+CID, {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => dispatch(fetchTheories()))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Your comment could not be posted\nError: '+ error.message); })
}

export const deleteTheoryComment = (PID,CID) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'FacinatingTheory/'+PID+'/comments/'+CID, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => dispatch(fetchTheories()))
    .catch(error => { console.log('DELETE comments ', error.message);
        alert('Error: '+ error.message); })
}

export const postChangeUsername = (newUsername) => (dispatch) => {

    const newName = {
        comment:newUsername
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'users/changeUsername', {
        method: 'POST',
        body: JSON.stringify(newName),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => alert(response.statusValue))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Error: '+ error.message); })
}

export const postImage=(formadata,func,information,credits,title)=>(dispatch)=>{
    const bearer ='Bearer ' +localStorage.getItem('token');
    
    return fetch(baseUrl+'ImageUpload',{
        method: 'POST',
        body: formadata,
        headers:{
            
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => {
        if(func==='Achievement')
        dispatch(postAchievement(response.file,information,credits,title));
        else if(func==='Fact')
        dispatch(postFact(response.file,information,credits,title));
        else
        dispatch(postTheory(response.file,information,credits,title))
    })
    .catch(error => {alert('Error: '+ error.message);
        dispatch(Set_default());
    })
}

export const addImage = (name) => ({
    type: ActionTypes.ADD_IMAGE,
    payload: name
});

export const Set_default=()=>({
    type:ActionTypes.SET_DEFAULT,
    payload:'00'
});
export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            console.log(response);
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            dispatch(fetchFavouriteAchievements());
            dispatch(fetchFavouriteFacts());
            dispatch(fetchFavouriteTheories());
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(favouriteAchievementsFailed("Error 401: Unauthorized"));
    dispatch(favouriteFactsFailed("Error 401: Unauthorized"));
    dispatch(favouriteTheoriesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}

export const signupUser = (username,password,firstname,lastname) => (dispatch) => {

    const newUser={
        username:username,
        password:password,
        firstname:firstname,
        lastname:lastname

    };
    return fetch(baseUrl + 'users/signup', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response =>  alert(response.status))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Error: '+ error.message); })
};