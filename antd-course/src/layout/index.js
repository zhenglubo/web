import { Component } from 'react';
import { Layout, Menu, Icon  } from 'antd';
import Link from 'umi/link';
import GlobalHeader from '../component/GlobalHeader';

// Header, Footer, Sider, Content组件在Layout组件模块下
const {  Footer, Sider, Content } = Layout;
 

// 引入子菜单组件
const SubMenu = Menu.SubMenu; 

class BasicLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  handleMenuCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

    render() {
        return (
            <Layout>
              <Sider width={256} style={{ minHeight: '100vh'}}>
                <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
                <Menu theme="dark" mode="inline" >
                    <SubMenu key="sub0" title={<span><Icon type="user" /><span>用户管理</span></span>}>
                        <Menu.Item key="0"><Link to='/user/user'>用户</Link></Menu.Item>
                        <Menu.Item key="1" ><Link to='/user/sender'>发货人</Link></Menu.Item>
                    </SubMenu>
                    
                    <SubMenu key="sub1" title={<span><Icon type="dashboard" /><span>订单管理</span></span>}>
                        <Menu.Item key="2"><Link to='/order/order'>全部订单</Link></Menu.Item>
                        <Menu.Item key="3" ><Link to='/order/manual'>手动开单</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="car" theme="filled" /><span>车队管理</span></span>}>
                        <Menu.Item key="6"><Link to='/fleet/car'>货车信息</Link></Menu.Item>
                        <Menu.Item key="7" ><Link to='/fleet/driver'>司机信息</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub" title={<span><Icon type="dashboard" /><span>物流管理</span></span>}>
                        <Menu.Item key="8"><Link to='/route/route'>线路管理</Link></Menu.Item>
                        <Menu.Item key="9"><Link to='/route/company'>公司信息</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><Icon type="bar-chart" /><span>统计分析</span></span>}>
                        <Menu.Item key="10"><Link to='/summary/month'>订单数量统计</Link></Menu.Item>
                        <Menu.Item key="11"><Link to='/summary/money'>订单金额统计</Link></Menu.Item>
                        <Menu.Item key="12"><Link to='/summary/settle'>结算金额统计</Link></Menu.Item>
                    </SubMenu>
            </Menu>
            </Sider>
              <Layout >
              {/* <GlobalHeader style={{ background: '#fff', textAlign: 'center', padding: 0 }}>Header</GlobalHeader> */}
              <GlobalHeader >Header</GlobalHeader>
              <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                  {this.props.children}
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
          </Layout>
        )
      }
}

export default BasicLayout;