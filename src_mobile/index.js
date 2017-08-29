import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';


import registerServiceWorker from './registerServiceWorker';

const App = () =>{
    return (
        <div>我是主页</div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();