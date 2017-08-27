// 
/**
 * 1. 抽象 用户的一些操作行为 ..
 * 2. 是js对象
 * 3. 必须有type这个字段 
 * 4. 就是一个送外卖的. dispatch  --(action)-->  redux --(state,action)--> reducer -->(newState)-> redux(store)
 */

//  type 理解为运单号  reducer dispatch 通过这个标识进行货物的交换
//  接受的参数 为 运送的货物
export const addTodo = (text) =>{
    return {
        type:"ADD_TODO",
        id:new Date().getTime(),  //确保唯一性 生成一串id
        text
    }
}

// 根据传入条件 进行过滤显示 不同的内容
export const setVisibility = (filter) => {
    return {
        type:"SET_VISIBILITY",
        filter
    }
}

// 切换待办项的状态
export const toggleTodo = (id) => {
    return {
        type:"TOGGLE_TODO",
        id
    }
}