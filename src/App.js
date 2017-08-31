import React, { Component } from 'react';
import { Home } from './container'
import '@/styles/common.less'
import '@/styles/home.less'

/**
 *  在根文件 进行组装 react-redux
 */

// 1. 接受store的 包裹组件 从 react-redux中 提取
// import {Provider} from 'react-redux'
 // 单独模块中创建 直接导出        
 // 2. 创建store 的方法 从  redux 中抽取                               
 // import {createStore} from 'redux'
                               
 // 3. 导出所有的reducer                             
 // import reducers from './redux/reducer'
                               
 // 4. 调用创建store方法 传入reducer 创建store                              
 // const store = createStore(reducers)

// 导出store
// import store from './redux/store'

// 传入 store 用 Provider 将根 container 组件进行包裹

class App extends Component {
  render() {
    return (
      // <Provider  store={store}>
        <Home/>
      // </Provider>
    );
  }
}

export default App;