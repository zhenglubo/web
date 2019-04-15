import {Component} from 'react';
import { Row, Col ,PageHeader,Form,Input ,Select ,Button,Card,Divider } from 'antd';
import styles from './order.less';
import { connect } from 'dva';
import { InputNumber } from 'antd';

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
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSearch} layout="inline">
              <h3 style={{fontWeight:'blod'}}>填写发货人信息</h3>
              <Divider/>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={6} sm={24}>
                  <FormItem label="发货人姓名">
                    {getFieldDecorator('senderName')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col md={6} sm={24}>
                  <FormItem label="发货人电话">
                    {getFieldDecorator('senderPhone')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col md={6} sm={24}>
                  <FormItem label="发货地址">
                    {getFieldDecorator('senderAddress')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col md={6} sm={24}>
                  <FormItem label="公司名称">
                    {getFieldDecorator('componyName')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={6} sm={24}>
                  <FormItem label="身份证号">
                    {getFieldDecorator('identityNo')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col md={6} sm={24}>
                  <FormItem label="银行卡号">
                    {getFieldDecorator('bankCardNo')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col md={6} sm={24}>
                  <FormItem label="开卡行">
                    {getFieldDecorator('bankCardType')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col md={6} sm={24}>
                  <FormItem label="持卡人">
                    {getFieldDecorator('cardholder')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
              </Row>
              <Divider title='填写收货人信息'/>
              <h3 style={{fontWeight:'blod'}}>填写收货人信息</h3>
              <Divider/>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={6} sm={24}>
                  <FormItem label="收货人姓名">
                    {getFieldDecorator('senderName')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col md={6} sm={24}>
                  <FormItem label="收货人电话">
                    {getFieldDecorator('senderPhone')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col md={6} sm={24}>
                  <FormItem label="收货人地址">
                    {getFieldDecorator('senderAddress')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
              </Row>

              <Divider title='填写货物信息'/>
              <h3 style={{fontWeight:'blod'}}>填写货物信息</h3>
              <Divider/>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={6} sm={24}>
                  <FormItem label="发货件数">
                    {getFieldDecorator('packagesNumber')(<Input placeholder="请输入"  type='number' />)}
                  </FormItem>
                </Col>
                <Col md={6} sm={24}>
                  <FormItem label="运费付款方">
                    {getFieldDecorator('transportFeePayType')(
                      <Select defaultValue='0' placeholder="请选择" style={{ width: 200 }}>
                        <SelectOption value="0">现付</SelectOption>
                        <SelectOption value="1">到付</SelectOption>
                    </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={6} sm={24}>
                  <FormItem label="运费（元）">
                    {getFieldDecorator('transportFee')(<Input type='number' placeholder="请输入" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={6} sm={24}>
                  <FormItem label="运输方式">
                    {getFieldDecorator('transportType')(
                      <Select defaultValue='0' placeholder="请选择" style={{ width: 200 }}>
                        <SelectOption value="0">汽运</SelectOption>
                        <SelectOption value="1">空运</SelectOption>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={6} sm={24}>
                  <FormItem label="是否打包">
                    {getFieldDecorator('isPack')(
                      <Select defaultValue='0' placeholder="请选择" style={{ width: 200 }}>
                        <SelectOption value="0">否</SelectOption>
                        <SelectOption value="1">是</SelectOption>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={6} sm={24}>
                  <FormItem label="打包费（元）">
                    {getFieldDecorator('packFee')(<Input type='number' placeholder="请输入" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={6} sm={24}>
                  <FormItem label="是否保价">
                    {getFieldDecorator('isInsurance')(
                      <Select defaultValue='0' placeholder="请选择" style={{ width: 200 }}>
                        <SelectOption value="0">否</SelectOption>
                        <SelectOption value="1">是</SelectOption>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={6} sm={24}>
                  <FormItem label="保价费（元）">
                    {getFieldDecorator('insuranceFee')(<Input type='number' placeholder="请输入" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col span={24}>
                  <span className={styles.submitButtons} style={{float:"right"}}>
                    <Button type="primary" htmlType="submit">
                      下单
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
                        {this.appendSearchForm()}
                </Card>
            </div>
        )
    }


}