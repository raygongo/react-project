import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom'
import { Home , HomeWork , Comment } from '../pages/' 
import { Layout, Menu, Breadcrumb, Icon } from 'antd' 

// import routes,{ RouteWithSubRoutes } from '../routes/'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Demo extends Component {
    constructor() {
        super()
        this.onChangeMenu = this.onChangeMenu.bind(this)
    }
    onChangeMenu(menu) {
    }
    render() {
        return (
            <Router>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <Menu
                            onClick={this.onChangeMenu}
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['home']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="home">
                                <Link to="/home">Home</Link>
                            </Menu.Item>
                            <Menu.Item key="work">
                                <Link to="/work">Work</Link>
                            </Menu.Item>
                            <Menu.Item key="about">
                                <Link to="/about">About</Link>
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Switch>
                        <Route  path="/home" component={Home}/>
                        <Route  path="/work" component={HomeWork}/>
                    </Switch>    
                </Layout>
            </Router>
        );
    }
}

