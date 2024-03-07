import { useEffect } from "react";
import api from "../api";
import useAuth from "./useAuth";
import axios from "axios";

const useAxios = () => {
    const { auth, setAuth } = useAuth()
    useEffect(() => {
        // add a request interceptor
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                const accessToken = auth?.accessToken
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`
                }
                return config
            },
            (error) => Promise.reject(error)
        )
        // add a response interceptor
        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const refreshToken = auth?.refreshToken
                    const res = await axios.post(
                        `${import.meta.env.VITE_API_BASEURL}auth/refresh-token`,
                        refreshToken
                    );
                    const { token } = res.data
                    setAuth({ ...auth, accessToken: token })
                    console.log("new", token);
                    originalRequest.headers.Authorization = `Bearer ${token}`

                    return axios(originalRequest)

                }
                return Promise.reject(error)
            }
        )
        return () => {
            api.interceptors.request.eject(requestInterceptor)
            api.interceptors.response.eject(responseInterceptor)
        }
    }, [auth, setAuth])
    return { api }
}
export default useAxios