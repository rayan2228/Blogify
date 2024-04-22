const actions = {
    profile: {
        dataFetching: "profileDataFetching",
        dataFetched: "profileDataFetched",
        dataFetchedError: "profileDataFetchedError",
        profileDataEdit: "profileDataEdit",
        profileImageUpload: "profileImageUpload",
        deleteBlog: "deleteBlog",
        logout: "logout"
    },
    blogs: {
        dataFetching: "blogDataFetching",
        dataFetched: "blogDataFetched",
        stopDataFetched: "stopDataFetched",
        dataFetchedError: "blogDataFetchedError",
        singleDataFetched: "singleDataFetched",
        popularDataFetched: "popularDataFetched",
        favouriteDataFetched: "favouriteDataFetched",
        searchedBlogsDataFetched: "searchedBlogsDataFetched",
        deleteBlog: "deleteBlog",
    }
}

export default actions