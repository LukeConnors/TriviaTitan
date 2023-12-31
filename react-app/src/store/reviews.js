export const SET_REVIEWS = "reviews/SET_REVIEWS"
export const ADD_REVIEW = "reviews/ADD_REVIEW"
export const UPDATE_REVIEW = "reviews/UPDATE_REVIEW"
export const DELETE_REVIEW = "reviews/DELETE_REVIEW"


// export const reviewsSelector = (state) => {
//     return state.reviews
// }


const setReviews = (reviews) => ({
    type: SET_REVIEWS,
    reviews
})

const addReview = (review) => ({
    type: ADD_REVIEW,
    payload: review
})

const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    payload: review
})

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId
})


export const fetchReviews = (deckId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/decks/${deckId}/reviews`)
        const data = await res.json();
        dispatch(setReviews(data.reviews))
        return data
    } catch (e) {
        console.log("THIS IS OUR ERROR", e)
        throw e
    }
}

export const createReview = (deckId, payload) => async (dispatch) => {
    try {
        const res = await fetch(`/api/decks/${deckId}/reviews`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        if (res.ok) {
            const newReview = await res.json()
            dispatch(addReview(newReview))
            return newReview
        }
    } catch (e) {
        return e
    }
}

export const editReview = (reviewId, payload) => async (dispatch) => {
    try{
        const res = await fetch(`/api/reviews/${reviewId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify(payload)
        });
        if(res.ok){
            const editedReview = await res.json();
            dispatch(updateReview(editedReview))
            return editedReview
        }
    } catch (e){
        return e
    }
}

export const removeReview = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
    });
    if(res.ok){
        dispatch(deleteReview(reviewId))
    }
}

const reviewsReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case SET_REVIEWS:
            action.reviews.forEach(review => newState[review.id] = review);
            return newState
        case ADD_REVIEW:
            const newReview = action.payload
            newState = {...state}
            newState[newReview.id] = newReview
            return newState
        case UPDATE_REVIEW:
            newState = {...state}
            const reviewId = action.payload.id
            newState[reviewId] = {...state[reviewId], ...action.payload}
            return newState
        case DELETE_REVIEW:
            const r_id = action.payload
            newState = {...state}
            delete newState[r_id]
            return newState
        default:
            return state
    }
}


export default reviewsReducer;
