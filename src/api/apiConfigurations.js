import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_BACKEND_URL

export const axiosInstance = axios.create({
    baseURL: baseURL,
});

export const axiosAuthorized = axios.create({
    baseURL: baseURL,
});

axiosAuthorized.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
});


// axiosAuthorized.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const originalRequest = error.config;

//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             return refreshToken().then(access => {
//                 originalRequest.headers['Authorization'] = `Bearer ${access}`;
//                 return axiosAuthorized(originalRequest);
//             }).catch(error => {
//                 return Promise.reject(error);
//             })
//         }
//         return Promise.reject(error);
//     }
// );

// const refreshToken = async () => {
//     try{
//         const res = await axiosInstance.post(
//         'auth/token/refresh/',
//         {
//                 refresh: localStorage.getItem('refreshToken')
//             }
//         )
//         const {access} = res.data;
//         localStorage.setItem('accessToken', access);
//         return access
//     }
//     catch (e) {
//         localStorage.removeItem('accessToken')
//         localStorage.removeItem('refreshToken')
//         store.dispatch(logout())
//         return Promise.reject(e);
//     }
// }