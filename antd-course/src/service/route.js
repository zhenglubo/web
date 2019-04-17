import request from '../util/request';

export async function search(params) {
    const reqParams = JSON.stringify(params);
   // console.log(reqParams);
    return request('http://localhost:8080/route/listSearch',{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: reqParams,
    });
}
