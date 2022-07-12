const axios = require('axios'); // Axios 是一个基于 promise 网络请求库

export async function get(path: string, params: object) {
  const _path = `http://127.0.0.1:7002${path}`;
  console.log('请求地址：', _path);
  // let res = await axios.post(_path, params)
  const res = await axios({
    method: 'get',
    url: _path,
    params,
    withCredentials: true, // 携带跨域cookie
  })
    .then(function (response: any) {
      console.log('返回结果：', response);
      if (response.status === 200) {
        return response.data;
      } else {
        return { status: 0, message: '系统错误' };
      }
    })
    .catch(function (error: any) {
      console.log('请求出现错误：', error);
    });
  return res;
}

export async function post(path: string, params: object) {
  const _path = `http://127.0.0.1:7002${path}`;
  console.log('请求地址：', _path);
  // let res = await axios.post(_path, params)
  const res = await axios({
    method: 'post',
    url: _path,
    data: params,
    withCredentials: true, // 携带跨域cookie
  })
    .then(function (response: any) {
      console.log('返回结果：', response);
      if (response.status === 200) {
        return response.data;
      } else {
        return { status: 0, message: '系统错误' };
      }
    })
    .catch(function (error: any) {
      console.log('请求出现错误：', error);
    });
  return res;
}
