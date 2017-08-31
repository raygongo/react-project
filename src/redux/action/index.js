import http from '@/ajax'

/**
 * action 类型 声明
 */
// 添加新应用 
export const ADD_NEW_APP = 'ADD_NEW_APP'
// 更换应用
export const CHANGE_APP = 'CHANGE_APP'
// 打开TopBar
export const TOGGLE_TOP_BAR = 'TOGGLE_TOP_BAR'
// 刷新应用
export const REFRESH = 'REFRESH'
// 更换模式 
export const CHANGE_MODE = 'CHANGE_MODE'
// 获取首页列表数据
export const HTTP_LIST_DATA = 'HTTP_LIST_DATA'
// 首页列表获取成功
export const COMPLETE_HTTP_LIST = 'COMPLETE_HTTP_LIST'
// 获取tip列表 成功
export const COMPLETE_HTTP_TIP_LIST = 'COMPLETE_HTTP_TIP_LIST'

// 获取数据
const httpListData = path => {
    return {
        type: HTTP_LIST_DATA,
        path
    }
}
// 数据获取成功
const completeHttpList = (data) => {
    return {
        type: COMPLETE_HTTP_LIST,
        data
    }
}
/**
 * 获取首页数据
 * @param {string} path 
 * @param {*} data 
 */
export const getHomeListData = (path, data) => {
    let url = path;
    return dispatch => {
        dispatch(httpListData(path))
        return http.get(url)
            .then(data => {
                console.log(data)
                dispatch(completeHttpList(data))
            })
            .catch(error => console.log(error))
    }

}

export const toggleTopBar = (id) => {
    return {
        type:TOGGLE_TOP_BAR,
        id,
    }
}
// // 添加新应用
// export const openAppTip = (id) =>{
//     return {
//         type:ADD_NEW_APP,
//         id
//     }
// }
// const completeHttpTipList = (path ,json)=> {
//     return {
//         type:COMPLETE_HTTP_TIP_LIST,
//         path,
//         json

//     }
// }
// // 获取tip 应用程序数据
// export const getTipListData = (path , id) => {
//     return dispatch => {
//         return fetch(path,{
//             "Content-Type": "application/json",
//         })
//         .then(response => {
//             if (response.ok) {
//                 response.json().then(json => dispatch(completeHttpTipList(id, json)))
//             } else {
//                 console.log("status");
//             }
//         })
//         .catch(error => console.log(error))
//     }
// }