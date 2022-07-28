import axios from 'axios'
import { authenticationConstant } from "shared/packages/globalConstant/authenticationConstant"
import { CookieHelper } from "shared/packages/utils/cookie"
import { trackPromise } from 'react-promise-tracker';
import Emitter from "./emit"

axios.interceptors.request.use(function (config) {
    const token = CookieHelper.getCookie(authenticationConstant.tokenKey);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export function request(method,
    url,
    data,
    headers = {},
    isCheck = true,
    responseType = '',
    isTracking = true,
) {
    const defaultHeaders = {
        "Content-Type": "application/json",
        ...headers
    }

    const params = {
        method: method,
        url: url,
        headers: defaultHeaders,
    };

    const isGet = (method) => {
        return method.toUpperCase() === 'GET'
    }

    if (responseType) {
        params['responseType'] = responseType
    }

    if (isGet(method)) {
        params['params'] = data || {};
    } else {
        params['data'] = data;
    }

    const promise = axios(params).then(response => {
        return response;
    }).catch(error => {
        //execute the status code enum and operation like logout , remove cookie when expired
        //Emitter.emit(EMITTER_EVENT.ACCESS_DENIED, error?.response?.data);
        throw error;
    });

    if (isGet(method) && isTracking) {
        trackPromise(promise)
    }

    return promise
}