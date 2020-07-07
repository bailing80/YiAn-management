import axios from 'axios'

let baseUrl = 'http://localhost:8080'//正式域名

let http = axios.create({
  baseURL: baseUrl,
  withCredentials: false, //表示跨域请求时是否需要使用凭证
  timeout: 1000*30,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  transformRequest: [function (data){
    return data
  }]
})
// 添加请求拦截器
http.interceptors.request.use(
  config => {
    let token = cookieApi.getCookie('token')
    config.headers.accessToken = token;
    return config;
  },
  error => {
    if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1 && !originalRequest._retry){
      alert('当前访问人数较多，请稍后再试')
      return null;
    }
  }
)

function apiAxios(method, url, params, response , error){
  http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params: null,
  }).then(function (res){
    if(res.data.code == '100024' || res.data.code == '100028'){
      cookieApi.setCookie('token', '', -1);
      axios.get(baseUrl+'/weixin/info').then(res => {
        let url = res.data.data.url;
      
      })
    }else{
      response(res);
    }
  }).catch(function (err){
    error(err)
  })
}

export default {
  get: function (url, params, response, err){
    return apiAxios('GET',url, params, response, err)
  },
  post: function (url, params, response, err){
    return apiAxios('POST',url, params, response, err)
  },
  put: function (url, params, response, err){
    return apiAxios('PUT',url, params, response, err)
  },
  delete: function (url, params, response, err){
    return apiAxios('DELETE',url, params, response, err)
  },
}