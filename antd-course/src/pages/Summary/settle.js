import  React,{Component} from 'react';
import {Card,Row,Col,Tabs,Icon ,Statistic,Divider } from 'antd';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/dataZoom';









let option = {
    
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
         orient: 'vertical',
         x: 'left',
        // right:'5%',
         //align:'left',
        // top:'middle',
        // textStyle: {
        //     color:'#8C8C8C'
        // },
        data:['待发货','处理中'
        ,'已完成','待退货']
    },
    series: [
        {
            name:'demo',
            type:'pie',
            center: ['40%', '50%'],
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: true,
                    position: 'outter',
                    formatter: "{d}%"
                }
               
            },
            labelLine: {
                normal: {
                    show: true
                }
            },
            data:[
                {value:335, name:'待发货'},
                {value:310, name:'处理中'},
                {value:234, name:'已完成'},
                {value:1548, name:'待退货'}
            ]
        }
    ]
};

        



export default class settle extends Component{


    componentDidMount() {
        var myChart = echarts.init(document.getElementById('main2'));
        myChart.setOption(option);
    }



    render(){
        return(
            <div id='main2' style={{width:'50%',height: 400 }}></div>
        )
    }
}