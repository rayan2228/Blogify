const getDateFormat = (fromDate) => {
    let diff = new Date().getTime() - new Date(fromDate).getTime()
    diff = diff / 1000
    let hourDiff = Math.floor(diff / 3600)
    diff -= hourDiff * 3600
    let minDiff = Math.floor(diff / 60)
    diff -= minDiff * 60
    let message

    if (hourDiff > 0 && hourDiff < 24) {
        message = `${hourDiff}h`
    } else if (hourDiff <= 24) {
        message = '1d'
    } else if (hourDiff <= 48) {
        message = '2d'
    } else if (hourDiff <= 72) {
        message = '3d'
    } else if (hourDiff <= 96) {
        message = '4d'
    } else if (hourDiff <= 120) {
        message = '5d'
    } else {
        message = new Date(fromDate).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })
    }
    if (minDiff > 0 && hourDiff < 24) {
        message = message ? `${message} ${minDiff}minutes` : `${minDiff}minutes`
    }
    if (diff && hourDiff < 24) {
        message = message ? `${message} ${Math.round(diff)}seconds` : `${Math.round(diff)}seconds`
    }
    return message
}

export default getDateFormat