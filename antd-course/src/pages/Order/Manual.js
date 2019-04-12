import {Component} from 'react';
import { Row, Col ,PageHeader,Form,Input ,Select ,Button,Card,Divider } from 'antd';
import styles from './order.less';
import { connect } from 'dva';

const FormItem = Form.Item;
const SelectOption = Select.Option;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };



@connect(({ order, loading }) => ({
    order,
    loading: loading.models.order,
  }))
  @Form.create()
export default class Manual extends Component{


    handleSearch=()=>{

    };
    appendSearchForm=()=>{
        const {form: { getFieldDecorator }} = this.props;
        return (
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 20 }} onSubmit={this.handleSearch} layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="发货人姓名">
                    {getFieldDecorator('senderName')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="发货人电话">
                    {getFieldDecorator('senderPhone')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="发货人地址">
                    {getFieldDecorator('senderAddress')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="发货人姓名">
                    {getFieldDecorator('senderName')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="发货人电话">
                    {getFieldDecorator('senderPhone')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="发货人地址">
                    {getFieldDecorator('senderAddress')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
              </Row>
             
             <Row>
                <Col md={8} sm={24}>
                  <FormItem label="订单状态">
                    {getFieldDecorator('orderStatus')(
                      <Select placeholder="请选择" style={{ width: 200 }}>
                        <SelectOption value="0">待发货</SelectOption>
                        <SelectOption value="1">运输中</SelectOption>
                        <SelectOption value="2">已完成</SelectOption>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <span className={styles.submitButtons} style={{float:"right"}}>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                      重置
                    </Button>
                    {/* <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                      展开 <Icon type="down" />
                    </a> */}
                  </span>
                </Col>
              </Row>
            </Form>
          );
    }

    render(){
        return(
            <div>
                <Card bordered={false} title='手动下单'>
                    <PageHeader>
                        {this.appendSearchForm()}
                    </PageHeader>
                </Card>
            </div>
        )
    }


}