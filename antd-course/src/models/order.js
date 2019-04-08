import * as orderService from '../service/order'


export default{
    namespace:'order',

    state:{
      data:[],
      pagination:{},
    },


    effects: {
        *queryList({payload}, { call, put }) {
            const rsp = yield call(orderService.search,payload);
            yield put({ type: 'saveList', payload: rsp});
        },
        *updateOrder({payload}){
          console.log("===============")
          //console.log(payload);
          debugger;
        }
      },
    
      reducers: {
        saveList(state, action) {
            return {
              ...state,
              data:action.payload.data.records,
              pagination:{
                          current:action.payload.data.current,
                          pageSize:action.payload.data.size,
                          total:action.payload.data.total
                        }
              //paganation:this.state({paganation:{current:rsp.current,pageSize:rsp.size,total:rsp.total}}),
            }
          },
      },

}