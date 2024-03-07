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
                if (error.response.status === 403 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const refreshToken = auth?.refreshToken
                    try {
                        const res = await axios.post(
                            `${import.meta.env.VITE_API_BASEURL}auth/refresh-token`,
                            { refreshToken }
                        );
                        const { accessToken } = res.data
                        setAuth({ ...auth, accessToken: accessToken })
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`
                        return axios(originalRequest)
                    } catch (error) {
                        console.log(error);
                    }

                }
            },
            (error) => Promise.reject(error)
        )
        return () => {
            api.interceptors.request.eject(requestInterceptor)
            api.interceptors.response.eject(responseInterceptor)
        }
    }, [auth, setAuth])
    return { api }
}
export default useAxios