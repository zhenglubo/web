import { Table,Col,Switch ,Pagination,Alert ,PageHeader ,Card,Button,Divider, Modal, Form,Input,DatePicker,Select, Row ,Badge} from 'antd';
import  React,{Component,Fragment} from 'react';
import { connect } from 'dva';
import UserSearchForm from '../User/UserSearchForm';
import FormItem from 'antd/lib/form/FormItem';

const { Search, TextArea } = Input;



// rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
const SelectOption=Select.Option
 
@Form.create()
@connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))
export default class user extends Component{
  
columns = [
    {
      title: 'ID', width: 100, dataIndex: 'id', key: 'name',
    },
    {
      title: '昵称', width: 100, dataIndex: 'username', key: 'age',
    },
    {
      title: '联系电话', dataIndex: 'contactPhone', key: '1', width: 150,
    },
    {
      title: '用户角色', dataIndex: 'userRoleId', key: '2', width: 150,
    },
    {
      title: '姓名', dataIndex: 'realName', key: '3', width: 150,
    },
    {
      title: '是否禁用', 
      dataIndex: 'userState',
       key: '4', 
       width: 150,
       render:text=>
        text===true?
          (<Switch checkedChildren="否" disabled='true' defaultChecked />):
          (<Switch unCheckedChildren="是" disabled='true'   />)
        //text===true?(<Badge status="success" text="是" />):(<Badge color='red' status="false" text="否" />)
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
  



  state={
    pagination: {
      pageSize:10,
      current:1,
      total:0
    },
    loading: true,
    updateModalVisible: false,
    stepFormValues: {},
    data:[],
  };

  // formLayout = {
  //   labelCol: { span: 7 },
  //   wrapperCol: { span: 13 },
  // };
  
    

  componentDidMount(){
    this.listSearch();
  }

  listSearch = () =>{
    const {pagination} =this.state
    this.props.dispatch({
      type:'user/queryList',
      payload:{
        ...pagination
      }
    });
  }

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      current: record,
    });
  };

  


  handleModalVisible = flag => {
    this.handleCancel();
  };

  handleCancel = () => {
    this.setState({
      updateModalVisible: false,
      stepFormValues: {},
      current:{}
    });
  }

  handleSubmit = fieldsValue => {
    const { dispatch } = this.props;
    //this.handleModalVisible(false);
    dispatch({
      type: 'users/updateOrder',
      payload: {
        name:fieldsValue.name
      },
    });


    // setTimeout(() => this.addBtn.blur(), 0);
    // form.validateFields((err, fieldsValue) => {
    //   if (err) return;
    //   this.setState({
    //     done: true,
    //   });
    //   dispatch({
    //     type: 'list/submit',
    //     payload: { id, ...fieldsValue },
    //   });
    // });
  };


  handOk=()=>{
    const {form} = this.props;
    console.log(this.props.dispatch);
    form.validateFields((err ,fieldsValue)=>{
      if(err){
        return;
      }
      form.resetFields();
      this.handleSubmit(fieldsValue);
    })
  }

  handleModalVisible2=()=>{
    this.setState({
      updateModalVisible:true,
      stepFormValues: {},
      current:{}
    });
  }


  appendSearchForm=()=>{
    const {form: { getFieldDecorator }} = this.props;

    return(
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
              <Button style={{marginLeft:20}} icon="plus" type="primary" onClick={() => this.handleModalVisible2(true)}>
                新建用户
              </Button>
              </Col>
          </Row>
        </Form>
    )
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
    const {data,pagination} = this.props.user;
    const { getFieldDecorator } = this.props.form;
    const { modalVisible, form, handleAdd, handleModalVisible,handleSubmit } = this.props;
    const {current={}} = this.state;
    return(
      <div>
        
          <Alert message={this.appendSearchForm()} />
        <br />
        <Card>
          <Table 
            rowSelection={rowSelection} 
            columns={this.columns} 
            dataSource={data} 
            pagination={pagination}
            // scroll={{ x: 2000}}
            />
        </Card>
        <Modal visible={this.state.updateModalVisible}
          title='编辑修改'
          destroyOnClose
          onCancel={this.handleCancel}
          onOk={this.handOk}
          width={600}
          
        >
          <Form {...formItemLayout}  onSubmit={this.handleSubmit} layout="inline">
              
              <FormItem label="昵称" >
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '昵称' }],
                  initialValue:current?current.username:null,
                })(<Input disabled='true' placeholder="请输入" />)}
              </FormItem>
                <FormItem label="联系电话" >
                  {getFieldDecorator('contactPhone', {
                    rules: [{ required: true, message: '请输入用户名' }],
                    initialValue:current?current.contactPhone:null,
                  })(
                    <Input placeholder="请输入" />
                  )}
                </FormItem>
                
                <FormItem  label="姓名" >
                  {getFieldDecorator('realName', {
                    rules: [{ message: '请输入姓名', required:true}],
                    initialValue: current?current.realName:null,
                  })(
                    <Input placeholder="请输入" />)}
                </FormItem>
                <FormItem label="是否禁用" >
                  {getFieldDecorator('userState', {
                    rules: [{ required: true, message: '请设置状态' }],
                    initialValue: current?current.userState?'否':'是':'否',
                  })(
                    <Select defaultValue={current.userState} style={{width:180}} placeholder="请选择">
                      <SelectOption value="false">失效</SelectOption>
                      <SelectOption value="true">有效</SelectOption>
                    </Select>
                  )}
                </FormItem>
          </Form>
        </Modal>
      </div>
    )
  };
}


