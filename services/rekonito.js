import axios from "axios";
import config from '../config.json'

export const reg_face = (data) => {
    return axios.post(`${config.dataApiEndpoint}/MetaData/push-image-s3`, data, { headers: { 'content-type': 'multipart/form-data' } })
}

export const crop_image = (data) => {
    return axios.post(`${config.dataApiEndpoint}/MetaData/crop-image`, data)
}

export const compare_face = (data) => {
    return axios.post(`${config.dataApiEndpoint}/LogMetaData`, data, { headers: { 'content-type': 'multipart/form-data' } })
}