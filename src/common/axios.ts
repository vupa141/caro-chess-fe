import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_URL
const options = {
    baseURL: baseUrl,
    headers: {}
}

const axiosInstance = axios.create(options)

axiosInstance.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        return Promise.reject(error.response.data)
    }
)

export default axiosInstance
