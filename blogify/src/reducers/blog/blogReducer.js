import actions from "../actions"

const initialState = {
    blogs: null,
    blog: null,
    popularBlogs: null,
    favouriteBlogs: null,
    searchedBlogs: null,
    loading: false,
    error: null,
}

const blogReducer = (state, action) => {
    switch (action.type) {
        case actions.blogs.dataFetching: {
            return {
                ...state,
                loading: true,
                error: null,
                searchedBlogs: null
            }
        }
        case actions.blogs.dataFetched: {
            return {
                ...state,
                loading: false,
                error: false,
                blogs: state?.blogs ? [...state.blogs, ...action.data] : action.data,
            }
        }
        case actions.blogs.dataFetchedError: {
            return {
                ...state,
                loading: false,
                blogs: [],
                blog: null,
                popularBlogs: null,
                favouriteBlogs: null,
                searchedBlogs: null,
                error: action.error
            }
        }
        case actions.blogs.singleDataFetched: {
            return {
                ...state,
                loading: false,
                error: false,
                blog: action.data,
            }
        }
        case actions.blogs.popularDataFetched: {
            return {
                ...state,
                loading: false,
                error: false,
                popularBlogs: action.data,
            }
        }
        case actions.blogs.favouriteDataFetched: {
            return {
                ...state,
                loading: false,
                error: false,
                favouriteBlogs: action.data,
            }
        }
        case actions.blogs.searchedBlogsDataFetched: {
            return {
                ...state,
                loading: false,
                error: false,
                searchedBlogs: action.data
            }
        }
        default: {
            return state
        }
    }
}
export { blogReducer, initialState }