import axios from 'axios';
import { ElNotification } from 'element-plus';

const config = {
    baseURL: process.env.VUE_APP_ENV == 'production' ?
        'http://openapi.orbiter.finance/mainnet' :
        'http://ec2-54-238-20-18.ap-northeast-1.compute.amazonaws.com:9095',
    // baseURL: 'http://localhost:9095',
};

const http = axios.create(config);

http.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
http.interceptors.response.use(
    function (response) {
        const respData = response.data;

        if (respData.code != 0) {
            return Promise.reject(new Error(respData.msg));
        }

        return respData.result;
    },
    function (error) {
        ElNotification({
            title: 'Error',
            message: `Fail: ${error.message}`,
            type: 'error',
        });

        // Do something with response error
        return Promise.reject(error);
    }
);

export default http;
