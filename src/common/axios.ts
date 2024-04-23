import axios from 'axios';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, HTTP_STATUS_CODE } from './constant';
import { getAccessToken } from '@/services/user.service';
import { ElNotification } from 'element-plus';
import { useAuthStore } from '@/stores/auth';

const baseUrl = import.meta.env.VITE_API_URL;
const options = {
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
    },
};

const axiosInstance = axios.create(options);

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        const originalRequest = error.config;
        const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);
        if (
            error.response.status === HTTP_STATUS_CODE.UNAUTHORIZED &&
            refreshToken &&
            originalRequest.url !== '/user/access-token'
        ) {
            try {
                const accessTokenResult = await getAccessToken(refreshToken);
                axiosInstance.defaults.headers.common['Authorization'] =
                    'Bearer ' + accessTokenResult.data.accessToken;
                Cookies.set(ACCESS_TOKEN_KEY, accessTokenResult.data.accessToken);
                return axiosInstance(originalRequest);
            } catch (error) {
                ElNotification({
                    type: 'error',
                    message: 'Login session has expired, Please login again.',
                });
                const { logOut } = useAuthStore();
                logOut();
            }
        }
        return Promise.reject(error.response.data);
    },
);

export default axiosInstance;
