
import { postRequest, getRequest, postRequests, postRequestJson } from '@/axios'

export const getListApi = (params) => {//获取默认列表
    return getRequest('/api/v1/road/getOrderList', params)
}

export const add = (params) => { //添加商品
    return postRequest('/api/addItem', params)
}



export const del = (params) => { //删除商品
    return postRequest('/api/delItem', params)
}

export const changeItem = (params) => { //添加商品
    return postRequest('/api/changeItem', params)
}