import actions from "../actions"

const initialState = {
    user: null,
    blog: [],
    favourites: [],
    loading: false,
    error: null,
}

const profileReducer = (state, action) => {
    switch (action.type) {
        case actions.profile.dataFetching: {
            return {
                ...state,
                loading: true
            }
        }
        case actions.profile.dataFetched: {
            return {
                ...state,
                loading: false,
                user: action.data,
                blog: action.data.blogs,
                favourites: action.data.favourites,
            }
        }
        case actions.profile.dataFetchedError: {
            return {
                ...state,
                loading: false,
                user: null,
                blog: [],
                favourites: [],
                error: action.error
            }
        }
        case actions.profile.profileDataEdit: {
            return {
                ...state,
                loading: false,
                user: action.data,
            }
        }
        default: {
            return state
        }
    }
}
export { profileReducer, initialState }