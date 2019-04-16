import { Table ,Divider,Badge,Form,Row,Col,Input ,Select,Button ,Card } from 'antd';
import  React,{Component,Fragment} from 'react';
import { connect } from 'dva';
import { PageHeader } from 'antd';

import { Map, Marker ,Markers} from 'react-amap';




export default class company extends Component{

  columns=[
    {},

  ];
  state = {
    markers: [
      
      { longitude: 120.271431, latitude: 21.135336 },
    ],
    center: {longitude: 113.271431, latitude: 23.135336},
  }
 

  render() {
    const {pagination,data} = this.props.route;
    console.log(this.state.center);
    return(
      <div>
        <Card style={{ width: '100%', height: '500px' }}>
          <Map plugins={['ToolBar']} center={this.state.mapCenter} zoom={6.5}>
            <Markers 
              markers={this.state.markers}
            />
          </Map>
        </Card>
        <Divider/>
        
      </div>
      
    ) 
  }

    
}