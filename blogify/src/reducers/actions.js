const actions = {
    profile: {
        dataFetching: "profileDataFetching",
        dataFetched: "profileDataFetched",
        dataFetchedError: "profileDataFetchedError",
        profileDataEdit: "profileDataEdit",
        profileImageUpload: "profileImageUpload",
        deleteBlog: "deleteBlog"
    },
    blogs: {
        dataFetching: "blogDataFetching",
        dataFetched: "blogDataFetched",
        dataFetchedError: "blogDataFetchedError",
        singleDataFetched: "singleDataFetched",
        popularDataFetched: "popularDataFetched",
        favouriteDataFetched: "favouriteDataFetched",
        searchedBlogsDataFetched: "searchedBlogsDataFetched",
        deleteBlog: "deleteBlog"
    }
}

export default actions