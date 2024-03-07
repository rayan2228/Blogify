import actions from "../actions"

const initialState = {
    blogs: null,
    loading: false,
    error: null,
}

const blogReducer = (state, action) => {
    switch (action.type) {
        case actions.blogs.dataFetching: {
            return {
                ...state,
                loading: true
            }
        }
        case actions.blogs.dataFetched: {
            return {
                ...state,
                loading: false,
                blogs: action.data,
            }
        }
        case actions.blogs.dataFetchedError: {
            return {
                ...state,
                loading: false,
                blogs: null,
                error: action.error
            }
        }
        default: {
            return state
        }
    }
}
export { blogReducer, initialState }