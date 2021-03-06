import React, { Component } from 'react'
import { Layout, Button, Dropdown, Icon, Menu } from 'antd';
import KeyBoard from './KeyBoard.js';
import './index.scss';

const { Header, Footer, Content } = Layout;

class AntdDemo extends Component {
  onClick() {
    const input = document.getElementById('checkbox');
    input.indeterminate = !input.indeterminate;
  }

  onPay = () => () => {
    console.log('支付');
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout className="antd-demo">
        <Header>
          <div>
            欢迎来到XXXX！
            <Button className="login" onClick={() => this.onClick()}>登录</Button> 或 <Button>注册</Button>
          </div>
          <ul>
            <li>
              <Dropdown overlay={menu}>
                <a href="#">
                  Hover me <Icon type="down" />
                </a>
              </Dropdown>
            </li>
          </ul>
        </Header>
        <Content>
          <input type="checkbox" id="checkbox" />
          <KeyBoard onPay={this.onPay()} />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
};

export default AntdDemo;