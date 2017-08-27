/**
 *  1. 对具体的操作进行响应的抽象
 *  2. 纯方法
 *  3. (1)传入旧值和action
 *  4. (2)返回新状态
 */

// 接受state 和 action
const todo = (state, action) => {
    // 根据不同的action做处理
    switch (action.type) {
        case "ADD_TODO":
            return {
                id: action.id,
                text: action.text,
                completed: false,
            }
        case "TOGGLE_TODO":
            // 确保点中的是同一个
            if (state.id !== action.id) return state
            return Object.assign({}, state, {
                completed: !state.completed
            })
        default:
            return state
    }

}

const todos = (state = [], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [
                ...state,
                todo(undefined, action)
            ]
        case "TOGGLE_TODO":
            return state.map(t => todo(t, action))
        default:
            return state
    }
}

export default todos