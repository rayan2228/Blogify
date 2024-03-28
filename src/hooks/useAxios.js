import { useEffect } from "react";
import api from "../api";
import useAuth from "./useAuth";
import axios from "axios";
import useProfile from "./useProfile";
import actions from "../reducers/actions";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
const useAxios = () => {
    const { dispatch: profileDispatch } = useProfile();
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()
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
                        profileDispatch({ type: actions.profile.logout });
                        setAuth({});
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
    }, [auth, setAuth, profileDispatch])
    return { api }
}
export default useAxios