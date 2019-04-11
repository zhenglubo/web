import { Table ,Divider,Badge,Form,Row,Col,Input ,Select,Button  } from 'antd';
import  React,{Component,Fragment} from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card } from 'antd-mobile';
import { PageHeader } from 'antd';





export default class company extends Component{



    render(){
        //const {data,pagination} =this.props.order;
        return(
          <div>
            公司信息
            {/* <Card>
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
            </Card> */}
              
          </div>
          
        )
      };
}