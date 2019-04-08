import request from '../util/request';

export async function search(params) {
    const reqParams = JSON.stringify(params);
   // console.log(reqParams);
    return request('http://localhost:8080/order/listSearch',{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: reqParams,
    });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}





export async function addRule(params) {
    return request('/api/rule', {
      method: 'POST',
      data: {
        ...params,
        method: 'post',
      },
    });
}
