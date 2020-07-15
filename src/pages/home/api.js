
import { postRequest, getRequest, postRequests, postRequestJson } from '@/axios'

export const getUserApi = (params) => { //获取默认列表
    return getRequest('/api/v1/road/getUser', params)
}

export const getOrdersApi = (params) => { //获取默认列表
    return getRequest('/api/v1/road/orderCount', params)
}