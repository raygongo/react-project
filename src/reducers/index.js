/**
 * 
 *  接受 redux 自动派发过来的 dispatch 
 *  1. 对具体的操作进行响应的抽象
 *  2. 纯方法
 *  3. (1)传入旧值和action
 *  4. (2)返回新状态
 */


 import visibilityFilter from './visibilityFilter'
 import todos from './todos'

 import {combineReducers} from 'redux'

//  利用redux 提供的方法  combineReducers 将所有的 reducer 进行合并成一个reducer

 const todoApp = combineReducers({
    visibilityFilter,
    todos
 })

 export default todoApp