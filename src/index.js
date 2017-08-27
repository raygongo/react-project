import React from 'react';
import ReactDOM from 'react-dom';
// 分别 导入react-redux 包裹container 传入store
import {Provider} from 'react-redux';
// 用来创建store
import {createStore} from 'redux';
// 将reducer 中的app导出来
import todoApp from '@/reducers';

import Redux from '@/components/Redux';
import registerServiceWorker from './registerServiceWorker';

// 利用redux 提供的方法生成store
let store = createStore(todoApp)

ReactDOM.render(
    <Provider store={store}>
        <Redux />
    </Provider>
    
, document.getElementById('root'));
registerServiceWorker();
