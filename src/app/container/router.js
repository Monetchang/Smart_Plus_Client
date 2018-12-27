import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

import HomeScreen from "./home/homeScreen"
import UploadPanelScreen from "./panel/uploadPanelScreen"
import {
    Layout, Menu, Breadcrumb, Icon,
} from 'antd';

import '../assets/css/App.css';

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

class RouterManager extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header className="header">
                        <div className="logo"/>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{lineHeight: '64px'}}
                        >
                            <Menu.Item key="1"><Link to="/pray">{"祈福"}</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/">Upload Bundle</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/panel/">None</Link></Menu.Item>
                        </Menu>
                    </Header>
                    <Layout style={{padding: '24px 0', background: '#fff'}}>
                        {/*<Sider width={200} style={{background: '#fff'}}>*/}
                            {/*<Menu*/}
                                {/*mode="inline"*/}
                                {/*defaultSelectedKeys={['1']}*/}
                                {/*defaultOpenKeys={['sub1']}*/}
                                {/*style={{height: '100%'}}*/}
                            {/*>*/}
                                {/*<SubMenu key="sub1" title={<span><Icon type="user"/>nav 1</span>}>*/}
                                    {/*<Menu.Item key="1">option1</Menu.Item>*/}
                                    {/*<Menu.Item key="2">option2</Menu.Item>*/}
                                    {/*<Menu.Item key="3">option3</Menu.Item>*/}
                                    {/*<Menu.Item key="4">option4</Menu.Item>*/}
                                {/*</SubMenu>*/}
                            {/*</Menu>*/}
                        {/*</Sider>*/}
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Route path="/" exact component={HomeScreen}/>
                            <Route path="/panel/" component={UploadPanelScreen}/>
                        </Content>
                    </Layout>
                    <Footer style={{position: "absolute", left: "0px", right: "0px", bottom: "0px", textAlign: 'center'}}>
                        Smart Plus ©2018 Created by Smart Plus Team
                    </Footer>
                </div>
            </Router>
        )
    }
}

export default RouterManager