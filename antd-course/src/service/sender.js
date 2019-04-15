import request from '../util/request';

export function queryList(params) {
  const reqParams = JSON.stringify(params);
  return request('http://localhost:8080/sender/listSearch',{
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:reqParams,
  });
}