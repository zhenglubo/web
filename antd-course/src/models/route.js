import * as userService from '../service/user';

export default {

  namespace: 'route',

  state: {
    data:[],
    pagination:{},
  },

  effects: {
    *queryList({payload}, { call, put }) {
        const rsp = yield call(userService.queryList,payload);
        console.log(rsp);
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
        }
      },
  },

}  