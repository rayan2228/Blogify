import { useEffect } from "react";
import api from "../api";
import axios from "axios";
import useProfile from "./useProfile";
import actions from "../reducers/actions";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import Cookies from "js-cookie";
import useAuth from "./useAuth";
const useAxios = () => {
    const { setAuth } = useAuth();
    const { dispatch: profileDispatch } = useProfile();
    const navigate = useNavigate()
    useEffect(() => {
        // add a request interceptor
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                const accessToken = Cookies.get("_blogifyAccessToken")
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
                if (error?.response?.status === 403 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const refreshToken = Cookies.get("_blogifyRefreshToken")
                    try {
                        const res = await axios.post(
                            `${import.meta.env.VITE_API_BASEURL}auth/refresh-token`,
                            { refreshToken }
                        );
                        const { accessToken } = res.data
                        Cookies.set("_blogifyAccessToken", accessToken, { expires: 1, secure: true });
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`
                        return axios(originalRequest)
                    } catch (error) {
                        profileDispatch({ type: actions.profile.logout });
                        localStorage.removeItem("_blogify")
                        setAuth({})
                        navigate("/")
                        toast.error(error?.message, {
                            position: "bottom-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            transition: Bounce,
                        });
                    }

                }
            },
            (error) => Promise.reject(error)
        )
        return () => {
            api.interceptors.request.eject(requestInterceptor)
            api.interceptors.response.eject(responseInterceptor)
        }
    }, [profileDispatch])
    return { api }
}
export default useAxios