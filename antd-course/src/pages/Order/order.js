import { Table ,Divider,Badge,Form,Row,Col,Input ,Select,Button ,Slider ,Modal} from 'antd';
import  React,{Component,Fragment} from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card } from 'antd-mobile';
import { PageHeader } from 'antd';
import styles from './order.less';

const FormItem = Form.Item;
const SelectOption = Select.Option;



@connect(({ order, loading }) => ({
  order,
  loading: loading.models.order,
}))
@Form.create()
export default class order extends Component{

  state={
    visible:false,
    data:[],
    pagination: {
      pageSize:10,
      current:1,
      total:0,
    },
    formValues: {},
    current: {},
    deleteVisible: false,
    confirmLoading: false,
  }
  columns = [
    {
      title: 'ID',
      dataIndex: 'id',key:'1',
      width: 50,
      //fixed:'left'
    },
    {
      title:'订单号',
      dataIndex:'orderId',
      key:'2',
      width: 150,
      //fixed:'left'
    },
    {
      title:'订单状态',
      dataIndex:'orderStatus',
      key:'3',width: 150 ,
      render:text=>
        text==='0'?(<Badge status="success" text="代发货" />):text===1?
        (<Badge status="success" text="运输中" />):(<Badge status="success" text="已完成" />)

    },
    {title:'用户名称',dataIndex:'userId',key:'userId',width: 150},
    {title:'运费支付方',dataIndex:'transportPayType',key:'4',width: 150},
    {title:'运费(元)',dataIndex:'transportFee',key:'5',width: 150},
    {
      title:'是否代收',
      dataIndex:'isCollectAmount',
      key:'6',
      width: 150,
      render:text=>
        text===true?(<Badge status="success" text="是" />):
        (<Badge status="success" text="否" />)
    },
    {title:'代收金额',dataIndex:'collectAmount',key:'7',width: 150},
    {title:'接单人',dataIndex:'operatorId',key:'8',width: 150},
    {
      title:'运输方式',
      dataIndex:'transportMethod',
      key:'9',
      width: 150,
      render:text=>
        text===0?(<Badge status="success" text="汽运" />):text===1?
        (<Badge status="success" text="空运" />):(<Badge status="success" text="货运" />)
    },
    {
      title:'是否需打包',
      dataIndex:'isPackaging',
      key:'10',
      width: 150,
      render:text=>
        text===false?(<Badge status="false" text="否" />):(<Badge status="success" text="是" />)

    },
    {title:'包装费',dataIndex:'packagingFee',key:'11',width: 150},
    {
      title:'创单时间',
      dataIndex:'dataChangeCreateTime',
      key:'12',
      width: 150,
      render: text => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title:'操作',
      dataIndex:'',
      key:'operation',
      //fixed:'right',
      width:150, 
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>修改</a>
          <Divider type="horize" />
          <a onClick={()=>this.handDelete(true,record)}>删除</a>
        </Fragment>
      ),
    },
  ];
   

  handDelete=(flag,record)=>{
    this.setState({
      deleteVisible:true,
      confirmLoading:true,
    });
  }
  handleUpdateModalVisible=(flag,record)=>{
    this.setState({
      visible:true,
      current:record,
    })
  }

  componentDidMount(){
    this.queryList();
  }

  queryList=()=>{
    const {dispatch} = this.props;
    dispatch({
      type:'order/queryList',
      payload:{
        ...this.state.pagination,
        ...this.state.formValues,
      }
    })
  }

  queryPage=(page)=>{
    const pager = this.state.pagination;
    pager.current = page;
    this.setState({
      pagination:pager,
    });
    this.queryList();
  };

  handleSearch=(e)=>{
    e.preventDefault();
    const {form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });
      console.log(fieldsValue);

      this.queryList();
    });
  }

  handleFormReset=(e)=>{
    e.preventDefault();
    const { form} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    this.queryList();
  }

  appendSearchForm=()=>{

    const {form: { getFieldDecorator }} = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="订单号">
              {getFieldDecorator('orderId')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
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


  showDetail=(record)=>{
    console.log(record);
    const marks = {
      0: '待发货',
      25: '处理中',
      50: {
        style: {
          color: 'green',
        },
        label: <strong>已完成</strong>,
      },
      75: {
        style: {
          color: 'green',
        },
        label: <strong>结算中</strong>,
      },
      100: {
        style: {
          color: 'red',
          marginLeft:-50
        },
        label: <strong>退款中</strong>,
      },
    };
      return(
        <div>
          <h3>订单详情：{record.orderId}</h3>
          <Divider />
          <h4>发货人信息</h4>
          <Row gutter={16} title='用户信息'>
            <Col span={8}>用户ID：{record.userId}</Col>
            <Col span={8}>用户名称：张珊</Col>
            <Col span={8}>用户电话：15489789604</Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>用户住址：广州市白云区陈田村汽配城3路12号</Col>
            <Col span={8}>性别：男</Col>
          </Row>
          <Divider />
          <h4>收货人信息</h4>
          <Row gutter={16} title='用户信息'>
            <Col span={8}>用户ID：{record.userId}</Col>
            <Col span={8}>用户名称：李斯</Col>
            <Col span={8}>用户电话：15698784456</Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>收货人地址：广州市白云区陈田村汽配城3路12号</Col>
          </Row>
          <Divider />
          <h4>订单信息</h4>
          <Row gutter={16} title='用户信息'>
            <Col span={8}>订单编号：{record.orderId}</Col>
            <Col span={8}>订单创建时间：2019-04-15 13:10:01</Col>
            <Col span={8}>订单金额：￥27800</Col>
          </Row>
          <Row gutter={16} >
            <Col span={8}>运输方式：汽运</Col>
            <Col span={8}>付款方式：现付</Col>
            <Col span={8}>运费：￥100</Col>
          </Row>
          <Row gutter={16} >
            <Col span={8}>是否钉箱：<Badge status="success" text="是" /></Col>
            <Col span={8}>钉箱费用：￥50</Col>
          </Row>
          <Row gutter={16} >
            <Col span={8}>是否保价：是</Col>
            <Col span={8}>保价费用：￥30</Col>
            <Col span={8}>保价金额：￥2800</Col>
          </Row>
          <Row gutter={16} >
            <Col span={8}>发货日期：2019-04-15</Col>
            <Col span={8}>收货日期：2019-04-15</Col>
          </Row>
          <Divider />    
          <Row>
            <h4>订单状态</h4>
            <Slider marks={marks} defaultValue={2*25} title='订单状态'/>
          </Row>
        </div>
        
      )
    
    
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      current:{}
    });
  }

  handleCancel2 = () => {
    this.setState({
      deleteVisible: false,
      confirmLoading:false,
    });
  }

  render(){
    const {data,pagination} =this.props.order;
    const {visible,current,deleteVisible,confirmLoading} = this.state;
    const { getFieldDecorator } = this.props.form;

    return(
      <div style={{backgroundColor:'#0123'}}>
        <Card>
          <PageHeader>{this.appendSearchForm()}</PageHeader>
        </Card>
        <Card style={{marginTop:20}}>
          <Table 
              columns={this.columns}
              dataSource={data}
              pagination={{
                current:pagination.current,
                pageSize:pagination.pageSize,
                total:pagination.total,
                onChange:this.queryPage,
              }}
              // scroll={{ x: 2000}}
              expandedRowRender={(record)=>{return this.showDetail(record)}}
          />
        </Card>
        <Modal visible={visible}
          title='编辑修改'
          destroyOnClose
          onCancel={this.handleCancel}
          onOk={this.handOk}
          width={800}
        
        >
        <Form onSubmit={this.handleSubmit} layout="inline">
            <Row gutter={16}>
              <Col span={10}>
                <FormItem label="发货方名称" {...this.formLayout} layout="inline">
                    {getFieldDecorator('userId', {
                      rules: [{ required: true, message: '请输入任务名称' }],
                      initialValue:current?current.userId:null,
                    })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem label="发货方名称" {...this.formLayout} layout="inline">
                    {getFieldDecorator('userId', {
                      rules: [{ required: true, message: '请输入任务名称' }],
                      initialValue:current?current.userId:null,
                    })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
            </Row>
            {/* <Row>
              <FormItem label="联系电话" {...this.formLayout}>
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: '请输入用户名' }],
                  initialValue:current?current.phone:null,
                })(
                  <Input placeholder="请输入" />
                )}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="订单状态" {...this.formLayout}>
                {getFieldDecorator('status', {
                  rules: [{ required: true, message: '请设置订单状态' }],
                  initialValue: current?current.status:null,
                })(
                  <Select placeholder="请选择">
                    <SelectOption value="0">未发货</SelectOption>
                    <SelectOption value="1">运输中</SelectOption>
                    <SelectOption value="2">已完成</SelectOption>
                  </Select>
                )}
              </FormItem>
            </Row>
            <Row>
              <FormItem  label="评论" {...this.formLayout}>
                {getFieldDecorator('content', {
                  rules: [{ message: '请输入评论', required:true}],
                  initialValue: current?current.content:null,
                })(
                  <Input placeholder="请输入" />)}
              </FormItem>
            </Row>   */}
          </Form>
        </Modal> 
        {/* 删除提示框 */}
        <Modal
          title="删除提示框"
          style={{color:'red'}}
          visible={deleteVisible}
          //onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel2}
        >
        <p>确定要删除吗？</p>
        </Modal>
      </div>
      
    )
  };
}


