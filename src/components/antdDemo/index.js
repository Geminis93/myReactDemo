import React, { Component } from 'react'
import { Layout, Button, Dropdown, Icon, Menu } from 'antd';
import './index.scss';

const { Header, Footer, Content } = Layout;

class AntdDemo extends Component {
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
            <Button>登录</Button> 或 <Button>注册</Button>
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
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
};

export default AntdDemo;