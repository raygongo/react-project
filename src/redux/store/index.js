/**
 * 这里 生成 store   带上所有的reduer 和中间件
 */

import {createStore, combineReducers, applyMiddleware} from 'redux';
// action异步处理模块
import thunk from 'redux-thunk';

// 拿出所有 reducer 
import * as reducer from '@/redux/reducer'
console.log(reducer)
 const store = createStore(
    combineReducers(reducer),
    applyMiddleware(thunk)
);

export default store



