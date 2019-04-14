import request from '../util/request';

export function queryList(params) {
  const reqParams = JSON.stringify(params);
  return request('http://localhost:8080/user/listSearch',{
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:reqParams,
  });
}



