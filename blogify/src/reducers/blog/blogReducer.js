import actions from "../actions"

const initialState = {
    blogs: [],
    blog: null,
    popularBlogs: null,
    favouriteBlogs: null,
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
                blogs: [...state.blogs, ...action.data],
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
        case actions.blogs.singleDataFetched: {
            return {
                ...state,
                loading: false,
                blog: action.data,
            }
        }
        case actions.blogs.popularDataFetched: {
            return {
                ...state,
                loading: false,
                popularBlogs: action.data,
            }
        }
        case actions.blogs.favouriteDataFetched: {
            return {
                ...state,
                loading: false,
                favouriteBlogs: action.data,
            }
        }
        default: {
            return state
        }
    }
}
export { blogReducer, initialState }