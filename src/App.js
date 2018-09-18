import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import Routes from './router';
import Config from './router/router';
import './App.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedKey: [],
      openKey: [],
    };
  }

  componentWillMount() {
    const { location } = this.props;
    const path = location.pathname;
    const list = Config.filter((item) => {
      return item.children && item.children.filter(sub => (sub.path === path)).length > 0;
    })
    let open = [];
    let selected = [];
    if (list.length) {
      open = list.map(item => (item.title));
      selected = list[0].children.filter(sub => (sub.path === path)).map(item => (item.title));
    }
    this.setState({
      selectedKey: selected,
      openKey: open,
    });
  }

  onMenuChange(path) {
    const { history } = this.props;
    history.push(path);
  }

  render() {
    const { selectedKey, openKey } = this.state;
    return (
      <Layout className="app">
        <Header className="header">
          <div className="logo" />
          {/* <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
          </Menu> */}
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              style={{ height: '100%', borderRight: 0 }}
              defaultOpenKeys={openKey}
              defaultSelectedKeys={selectedKey}
            >
              {
                Config.map((item) => (
                  <SubMenu key={item.title} title={item.title}>
                    {
                      item.children && item.children.map((sub) => (
                        <Menu.Item key={sub.title} onClick={() => (this.onMenuChange(sub.path))}>{ sub.title }</Menu.Item>
                      ))
                    }
                  </SubMenu>
                ))
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '24px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
            <Content style={{ background: '#fff', padding: 24, margin: 0, }}>
              <Routes />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
};

export default App;