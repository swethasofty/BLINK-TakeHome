import React, { Component } from 'react'
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu} from 'antd';

const { Header} = Layout;

export default class TopBar extends Component {
    render() {
        console.log(window.location.pathname)
        return (
       
<Header>
  <div className="logo" />     
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item>Blink TakeHome</Menu.Item>
         <Menu.Item key="1">Drug Search</Menu.Item>
        {/* <Menu.Item key="2">Drug Details</Menu.Item> */}
      </Menu>
      
</Header>
    
)
    }
}
