// import Immutable from 'immutable'
import {
    HTTP_LIST_DATA,
    COMPLETE_HTTP_LIST,
    TOGGLE_TOP_BAR
} from '../action/index.js'

const defaultlState = {
    data: [],
    isFetching: false
}

// 页面初次渲染时获取数据
export const Home = (state = defaultlState, action = {}) => {
    switch (action.type) {
        case HTTP_LIST_DATA:
            // state.set('isFetching',true)

            return {
                ...state,
                isFetching: true
            }
        case COMPLETE_HTTP_LIST:
            // return Immutable.Map({'data':action,'isFetching':false});//返回一个新的state
            const data = action.data.map(item => {
                item.openTopBar = false
                return item
            })
            return Object.assign({}, state, {
                data: data
            })    
        default:
            return state
    }
}

// export const Feature = ( state , action = {}) => {
//     switch(action.type){
//         case TOGGLE_TOP_BAR:
//     }
// }
