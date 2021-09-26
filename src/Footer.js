import React, { Component } from 'react'
import 'antd/dist/antd.css';
import './index.css';
import { Layout } from 'antd';

const {Footer } = Layout;

export default class BottomBar extends Component {
    render() {
        return (
            <Footer style={{ textAlign: 'center' }}>BLINK TAKE HOME @2021</Footer>
        )
    }
}
