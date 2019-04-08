import { Table ,Divider,Badge,Form,Row,Col,Input ,Select,Button  } from 'antd';
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
  }
  columns = [
    {title: 'ID',dataIndex: 'id',key:'1',width: 50,fixed:'left'},
    {title:'订单号',dataIndex:'orderId',key:'2',width: 150,fixed:'left'},
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
      fixed:'right',
      width:150, 
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>修改</a>
          <Divider type="horize" />
          <a href="">删除</a>
        </Fragment>
      ),
    },
  ];
   

  handleUpdateModalVisible=(flag,record)=>{
    this.setState({
      visible:true
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
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <SelectOption value="0">待发货</SelectOption>
                  <SelectOption value="1">运输中</SelectOption>
                  <SelectOption value="2">已完成</SelectOption>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
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
    const {data,pagination} =this.props.order;
    return(
      <div>
        <Card>
          <PageHeader>{this.appendSearchForm()}</PageHeader>
        </Card>
        <Card>
          <Table 
              columns={this.columns}
              dataSource={data}
              pagination={{
                current:pagination.current,
                pageSize:pagination.pageSize,
                total:pagination.total,
                onChange:this.queryPage,
              }}
              scroll={{ x: 2000}}
          />
        </Card>
          
      </div>
      
    )
  };
}


