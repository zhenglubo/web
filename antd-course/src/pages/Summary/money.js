import  React,{Component,Fragment} from 'react';
import {Card,Row,Col,Tabs,Icon ,Statistic,Divider } from 'antd';
import Month from  '../Summary/month';
import Settle from '../Summary/settle';



import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/dataZoom';


const TabPane = Tabs.TabPane;

let option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data:['已完成','处理中','总量']
    },
    dataZoom: [
        {
            show: true,
            start: 50,
            end: 100
        },
        
        
    ],
    xAxis: [
        {
            type: 'category',
            data: ['2019/04/01','2019/04/02','2019/04/03','2019/04/04','2019/04/05','2019/04/06','2019/04/07',
                '2019/04/08','2019/04/09','2019/04/10','2019/04/11','2019/04/12'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '数量',
            min: 0,
            max: 500,
            interval: 50,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: '总量',
            min: 0,
            max: 500,
            interval: 50,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        {
            name:'已完成',
            type:'bar',
            data:[20, 40, 70, 23, 25, 76, 135, 162, 32, 20, 60, 30]
        },
        {
            name:'处理中',
            type:'bar',
            data:[20, 50, 90, 26, 28, 70, 175, 182, 48, 18, 60, 20]
        },
        {
            name:'总量',
            type:'line',
            yAxisIndex: 1,
            data:[40, 90, 160, 49, 53, 146, 310, 344, 80, 38, 120, 50]
        }
    ]
};


export default class money extends Component{

    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main1'));
        // 绘制图表
        myChart.setOption(option);
    }

    callback=(e)=>{
       
        
    }



    render(){
        return(

            <div>
                <Card bordered={false}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card  title='今日待发货数量' bordered={true}>
                            <Statistic
                                value={100}
                                precision={0}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<Icon type="arrow-down" />}
                                suffix="(件)"
                            />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card  title='今日已发货数量' bordered={true}>
                            <Statistic
                                value={400}
                                precision={0}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<Icon type="arrow-up" />}
                                suffix="(件)"
                            />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card  title='今日已完成数量' bordered={true}>
                                <Statistic
                                    value={200}
                                    precision={0}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<Icon type="arrow-up" />}
                                    suffix="(件)"
                                />
                            </Card>
                        </Col>
                    </Row>
                </Card>
                <Divider />
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="日营业报表" key="1">
                    <Row gutter={16}>
                        <Col span={8}>
                            <div id="main1"  style={{height: 400 }} />
                        </Col>
                        <Divider type='vertical'/>
                        <Col span={14}>
                            <Card bordered={false} style={{marginLeft:100,width:'100%',height:400}}title='dierge'>12333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333</Card>
                        </Col>
                    </Row>
                        
                        
                    </TabPane>
                    <TabPane tab='月营业报表' key="2">
                    <Month />  
                    </TabPane>
                    <TabPane tab="月结算报表" key="3">
                        <Settle />
                    </TabPane>
                </Tabs>
                <Divider />
            </div>
            
        )
    }
}