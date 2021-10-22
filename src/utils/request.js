import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

// const jsonStr = '{"art_id":1245953273786007552}'
// console.log(JSON.parse(jsonStr)) // 1245953273786007600
// console.log(JSONBig.parse(jsonStr).art_id.toString()) // 1245953273786007552
// console.log(JSONBig.stringify(JSON.parse(jsonStr)))
const request = axios.create({
    baseURL: 'http://toutiao-app.itheima.net/',
    transformResponse: [function(data) {
        try {
            return JSONBig.parse(data)
        } catch (err) {
            return data
        }
    }]
})

//请求拦截器
request.interceptors.request.use(function(config) {
    // Do something before request is sent
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error)
})

//响应拦截器

export default request