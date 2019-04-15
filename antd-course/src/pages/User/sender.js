import  React,{Component,Fragment} from 'react';
import { Table,Col,Switch ,Pagination,Alert ,PageHeader ,Card,Button,Divider, Modal, Form,Input,DatePicker,Select, Row ,Badge} from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;

@Form.create()
@connect(({ sender, loading }) => ({
    sender,
    loading: loading.models.sender,
  }))
export default class sender extends Component{

    state={
        data:[],
        pagination: {
            pageSize:10,
            current:1,
            total:0
        },
        current:{},
        visible:false,
    }
    columns = [
        {
          title: 'ID', width: 100, dataIndex: 'id', key: 'id',
        },
        {
          title: '发货人', width: 100, dataIndex: 'senderName', key: 'senderName',
        },
        {
          title: '身份证号', dataIndex: 'identityNo', key: 'identityNo', width: 150,
        },
        {
          title: '联系电话', dataIndex: 'senderPhone', key: '2', width: 150,
        },
        {
            title: '发货地址', dataIndex: 'senderAddress', key: '3', width: 150,
          },
        {
          title: '银行卡号', dataIndex: 'bankCardNo', key: '4', width: 150,
        },
        {
            title: '银行卡类型', dataIndex: 'bankCardType', key: '5', width: 150,
        },
        {
            title: '持卡人', dataIndex: 'cardholder', key: '6', width: 150,
        },
        {
            title: '公司名称', dataIndex: 'companyName', key: '7', width: 150,
        },
        {
            title: '创建时间', dataIndex: 'dataChangeCreateTime', key: '8', width: 150,
        },
        {
          title: '操作',
          key: 'operation',
          // fixed: 'right',
          width: 100,
          render: (text, record) => (
            <Fragment>
              <a onClick={() => this.handleUpdateModalVisible(true, record)}>修改</a>
            </Fragment>
          ),
        },
      ];

      handleSearch=()=>{

      };

      handleCancel=()=>{
          this.setState({
              visible:false,
              current:{},
          })
      }
      showAddModal=()=>{

      };
      handleReset=()=>{
        e.preventDefault();
        const { form} = this.props;
        form.resetFields();
        this.setState({
            //formValues: {},
        });
        this.queryList();
      }
      handleModalVisible2=(flag)=>{
        this.setState({
            visible:!!flag,
            current:{},
        })
      }

      handleUpdateModalVisible=(flag,record)=>{
        this.setState({
            visible:!!flag,
            current:record||{}
        });
      }

    appendSearchForm=()=>{

     const {form: { getFieldDecorator }} = this.props;
     return(
      <Form  layout="inline" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onSubmit={this.handleSearch}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col span={8} key={1}>
              <Form.Item label={'发货人'} style={{marginTop:10,marginLeft:10}}>
                {getFieldDecorator('senderName', {})(
                  <Input placeholder="发货人" />
                )}
              </Form.Item>
            </Col>
            <Col span={8} key={2}>
            <Form.Item label={'联系电话'} style={{marginTop:10,marginLeft:10}}>
            {getFieldDecorator('senderPhone', {})(
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
              <Button style={{marginLeft:20}} icon="plus" type="primary" onClick={() => this.handleModalVisible2(true)}>
                新增发货人
              </Button>
              </Col>
          </Row>
        </Form>
    )};

    componentDidMount(){
        this.listSearch();
      }
    
      listSearch = () =>{
        const {pagination} =this.state
        this.props.dispatch({
          type:'sender/queryList',
          payload:{
            ...pagination
          }
        });
      }

    handleSubmit(){

    }  

    render(){
        const formItemLayout = {
            labelCol: {
              xs: { span: 8 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 16 },
              sm: { span: 16 },
            },
          };
        const {getFieldDecorator } = this.props.form;
        const {data,pagination} = this.props.sender;
        const {current} = this.state;
        return(
            <div>
                <Alert
                    message={this.appendSearchForm()}
                />
                <br />
                <Table 
                    dataSource={data}
                    columns={this.columns}
                    pagination = {pagination}
                />
                <Modal visible={this.state.visible}
                    title='新增/修改'
                    destroyOnClose
                    onCancel={this.handleCancel}
                    onOk={this.handOk}
                    width={600}
          
                >
                  <Form {...formItemLayout}  onSubmit={this.handleSubmit} layout="inline">
                        <FormItem >
                            {getFieldDecorator('id', {
                            
                            initialValue:current?current.id:null,
                            })(<Input hidden placeholder="请输入" />)}
                        </FormItem>
                        <FormItem label="发货人" >
                            {getFieldDecorator('senderName', {
                            rules: [{ required: true, message: '发货人' }],
                            initialValue:current?current.senderName:null,
                            })(<Input  placeholder="请输入" />)}
                        </FormItem>
                        <FormItem label="联系电话" >
                        {getFieldDecorator('senderPhone', {
                            rules: [{ required: true, message: '请输入联系电话' }],
                            initialValue:current?current.senderPhone:null,
                        })(
                            <Input placeholder="请输入" />
                        )}
                        </FormItem>
                        <FormItem  label="身份证号" >
                        {getFieldDecorator('identityNo', {
                            rules: [{ message: '请输入身份证号', required:true}],
                            initialValue: current?current.identityNo:null,
                        })(
                            <Input placeholder="请输入" />)}
                        </FormItem>
                        <FormItem  label="公司名" >
                        {getFieldDecorator('companyName', {
                            initialValue: current?current.companyName:null,
                        })(
                            <Input placeholder="请输入" />)}
                        </FormItem>
                        <FormItem  label="发货地址" >
                        {getFieldDecorator('senderAddress', {
                            rules: [{ message: '请输入发货地址', required:true}],
                            initialValue: current?current.senderAddress:null,
                        })(
                            <Input placeholder="请输入" />)}
                        </FormItem>
                        <FormItem  label="银行卡号" >
                        {getFieldDecorator('bankCardNo', {
                            
                            initialValue: current?current.bankCardNo:null,
                        })(
                            <Input placeholder="请输入" />)}
                        </FormItem>
                        <FormItem  label="卡类型" >
                        {getFieldDecorator('bankCardType', {
                            //rules: [{ message: '请输入银行卡类型', required:true}],
                            initialValue: current?current.bankCardType:null,
                        })(
                            <Input placeholder="请输入" />)}
                        </FormItem>
                        <FormItem  label="持卡人" >
                        {getFieldDecorator('cardholder', {
                            //rules: [{ message: '请输入持卡人', required:true}],
                            initialValue: current?current.cardholder:null,
                        })(
                            <Input placeholder="请输入" />)}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
