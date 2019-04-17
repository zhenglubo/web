import { Table ,Divider,Badge,Form,Row,Col,Input ,Select,Button  ,Card} from 'antd';
import  React,{Component,Fragment} from 'react';
import { connect } from 'dva';


import { Map ,Markers} from 'react-amap';


@Form.create()
@connect(({ route, loading }) => ({
  route,
  loading: loading.models.route,
}))
export default class route extends Component{

  columns = [
    {
      title: 'ID', width: 100, dataIndex: 'id', key: '1',
    },
    {
      title: '物流公司', width: 100, dataIndex: 'transportCompanyId', key: '2',
    },
    {
      title: '出发省份', dataIndex: 'startProvince', key: '3', width: 150,
    },
    {
      title: '出发城市', dataIndex: 'startCity', key: '4', width: 150,
    },
    {
      title: '出发县（区）', dataIndex: 'startCounty', key: '5', width: 150,
    },
    {
      title: '出发乡镇', dataIndex: 'startTown', key: '6', width: 150,
    },
    {
      title: '到达省份', dataIndex: 'destinationProvince', key: '7', width: 150,
    },
    {
      title: '到达城市', dataIndex: 'destinationCity', key: '8', width: 150,
    },
    {
      title: '到达县（区）', dataIndex: 'destinationCounty', key: '9', width: 150,
    },
    {
      title: '到达乡镇', dataIndex: 'destinationTown', key: '10', width: 150,
    },
    {
      title: '开始发货日期', dataIndex: 'beginSenderDate', key: '11', width: 150,
    },
    {
      title: '截止发货日期', dataIndex: 'endSenderDate', key: '12', width: 150,
    },
    {
      title: '假期停运说明', dataIndex: 'holidayDescription', key: '13', width: 150,
    },
    {
      title: '发货周期', dataIndex: 'sendPeriod', key: '14', width: 150,
    },
    {
      title: '预计在途时间', dataIndex: 'expectedDate', key: '15', width: 150,
    },
    
    // {
    //   title: '是否禁用', 
    //   dataIndex: 'userState',
    //    key: '16', 
    //    width: 150,
    //    render:text=>
    //     text===true?
    //       (<Switch checkedChildren="否" disabled='true' defaultChecked />):
    //       (<Switch unCheckedChildren="是" disabled='true'   />)
    //     //text===true?(<Badge status="success" text="是" />):(<Badge color='red' status="false" text="否" />)
    // },
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
  state = {
    markers: [
      { longitude: 120.271431, latitude: 21.135336 },
    ],
    center: {longitude: 113.271431, latitude: 23.135336},
    data:{},
    pagination: {
      pageSize:10,
      current:1,
      total:0
    },
    formValue:{},
  }
 
  componentDidMount(){
    this.listSearch();
  }

  listSearch=()=>{
    const {pagination,formValue} =this.state
    this.props.dispatch({
      type:'route/queryList',
      payload:{
        ...pagination,
        ...formValue,
      }
    });
  }
      
  render() {
    const {pagination,data} = this.state;
    console.log(this.state.center);
    return(
      <div>
        <div style={{ width: '100%', height: '500px' }}>
          <Map plugins={['ToolBar']} center={this.state.mapCenter} zoom={6.5}>
            <Markers 
              markers={this.state.markers}
            />
          </Map>
        </div>
        <Divider/>
        <Table
        columns={this.columns} 
        pagination={pagination}
        />
      </div>
        
        
    ) 
  }
}