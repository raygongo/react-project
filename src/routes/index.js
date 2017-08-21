
import React from 'react'
import { Home , HomeWork , Comment } from '../pages/' 
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

/**
 * 将路由配置对象转为route组件
 * @param {Obj} route 
 */
const RouteWithSubRoutes = (route) => {
    return (
        <Route path={route.path} render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes}/>
      )}/>)
}

const routes = [
    {
        path :'/home',
        component : Home,
        routes :[
            {
                path :'/home/react',
                component : Comment ,
            }
        ]
    },
    {
        path :'/work',
        component : HomeWork,
    },

]
export {RouteWithSubRoutes}
export default routes
