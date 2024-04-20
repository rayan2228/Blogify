import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASEURL,
    timeout: 5000,
})

export default api