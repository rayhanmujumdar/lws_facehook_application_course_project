import axios from 'axios';
import { useEffect } from 'react';
import { api } from '../api';
import { useAuth } from './useAuth';
export function useAxios() {
    const { auth, setAuth } = useAuth();
    useEffect(() => {
        // add request interceptor
        const requestInterceptor = api.interceptors.request.use(
            config => {
                const accessToken = auth?.authToken;
                config.headers.Authorization = `Bearer ${accessToken}`;
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
        // add response interceptor
        const responseInterceptor = api.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;
                if (error?.response?.status === 401 && !originalRequest._retry) {
                    try {
                        originalRequest._retry = true;
                        const refreshToken = auth.refreshToken;

                        const { data } = await axios.post(
                            `${
                                import.meta.env.VITE_BASE_URL
                            }/auth/refresh-token`,
                            { refreshToken }
                        );
                        setAuth({ ...auth, authToken: data?.token });
                        originalRequest.headers.Authorization = `Bearer ${data?.token}`;
                        return axios(originalRequest);
                    } catch (err) {
                        throw err;
                    }
                }
                return Promise.reject(error);
            }
        );
        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.request.eject(responseInterceptor);
        };
    }, [auth.authToken]);
    return { api };
}
