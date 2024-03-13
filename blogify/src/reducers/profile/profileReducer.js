import actions from "../actions"

const initialState = {
    user: null,
    blogs: [],
    favourites: [],
    loading: false,
    error: null,
}

const profileReducer = (state, action) => {
    switch (action.type) {
        case actions.profile.dataFetching: {
            return {
                ...state,
                loading: true,
                error: null
            }
        }
        case actions.profile.dataFetched: {
            return {
                ...state,
                loading: false,
                error: null,
                user: action.data,
                blogs: action.data.blogs,
                favourites: action.data.favourites,
            }
        }
        case actions.profile.dataFetchedError: {
            return {
                ...state,
                loading: false,
                user: null,
                blogs: [],
                favourites: [],
                error: action.error
            }
        }
        case actions.profile.profileDataEdit: {
            return {
                ...state,
                loading: false,
                error: null,
                user: action.data,
            }
        }
        case actions.profile.profileImageUpload: {
            return {
                ...state,
                loading: false,
                error: null,
                user: action.data,
            }
        }
        case actions.profile.deleteBlog: {
            return {
                ...state,
                loading: false,
                error: null,
                blogs: state?.blogs?.filter((blogs) => blogs.id !== action.data)
            }
        }
        default: {
            return state
        }
    }
}
export { profileReducer, initialState }