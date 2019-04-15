import {Form, Row, Col, Input, Button, Icon,Pagination,Divider} from 'antd';
import  React,{Component} from 'react';
 
@Form.create()
export default class UserSearchForm extends Component {
    state = {
      expand: false,
      data:{
        username:'',
        contactPhone:'',
      }
    };
  
  
    handleSearch = (e) => {
      e.preventDefault();
      this.props.dispatch({
        type:'users/queryList',
        paylod:this.props.form.getFieldDecorator
      });
      // this.props.form.validateFields((err, values) => {
      //   if(err){

      //   }
        
      //   console.log('Received values of form: ', values);
      // });
    }
  
    handleReset = () => {
      this.props.form.resetFields();
    }
  
    toggle = () => {
      const { expand } = this.state;
      this.setState({ expand: !expand });
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form  layout="inline" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onSubmit={this.handleSearch}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col span={8} key={1}>
              <Form.Item label={'姓名/昵称'} style={{marginTop:10,marginLeft:10}}>
                {getFieldDecorator('username', {})(
                  <Input placeholder="姓名/昵称" />
                )}
              </Form.Item>
            </Col>
            <Col span={8} key={2}>
            <Form.Item label={'联系电话'} style={{marginTop:10,marginLeft:10}}>
            {getFieldDecorator('contactPhone', {})(
                  <Input placeholder="联系电话" />
                )}
            </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              
            <Col span={24} style={{ textAlign: 'right'}}>
              <Button type="primary" htmlType="submit" onClick={this.showAddModal}>查询</Button>
              <Button style={{ marginLeft: 8 ,marginRight:20}} onClick={this.handleReset}>
                重置
              </Button>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {/* <Divider/> */}
          <Col span={12} >
              <Button style={{marginLeft:20}} icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建用户
              </Button>
              </Col>
          </Row>
        </Form>

        
      );
    }
  }
  
  

