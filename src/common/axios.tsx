const axios = require('axios'); // Axios 是一个基于 promise 网络请求库

export async function post(path: string, params: object) {
  const _path = `http://127.0.0.1:7001${path}`;
  console.log('请求地址：', _path);
  // let res = await axios.post(_path, params)
  const res = await axios({
    method: 'post',
    url: _path,
    data: params,
    withCredentials: true, // 携带跨域cookie
  })
    .then(function (response: any) {
      console.log(response);
    })
    .catch(function (error: any) {
      // console.log(error);
      // if (error.response) {
      //     // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      //     console.log(error.response.data);
      //     console.log(error.response.status);
      //     console.log(error.response.headers);
      // } else if (error.request) {
      //     // 请求已经成功发起，但没有收到响应
      //     // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
      //     // 而在node.js中是 http.ClientRequest 的实例
      //     console.log(error.request);
      // } else {
      //     // 发送请求时出了点问题
      //     console.log('Error', error.message);
      // }
      console.log(error.config);
    });
  return res;
}
