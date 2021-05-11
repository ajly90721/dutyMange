import axios from 'axios'
import store from '@/store/index'

// create an axios instance
const service = axios.create({
    baseURL: 'http://localhost:8081',
    timeout: 5000 // request timeout
})

// // request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        // if (store.getters.token) {
        //     config.headers['X-Token'] = getToken()
        // }
         // 判断是否存在token，如果存在的话，则每个http header都加上token
        let token = sessionStorage.getItem('token')
        if (!config.headers.hasOwnProperty('token') && token) {
            config.headers.token = token;
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data
        // store.commit('SET_LOADING',false);
        console.log("response 拦截") 
        console.log(res)
        // if the custom code is not 20000, it is judged as an error.
        if(res.code == 909){
            sessionStorage.removeItem('token') 
            // console.log("清空token") 
            // console.log(sessionStorage.getItem('token'))
        }
        else if (res.code !== 200) {
            alert(res.info)
            return Promise.reject(new Error(res.info || 'Error'))
        }

        // alert(res)
        return response

    },
    error => {
        console.log('err' + error) // for debug
        alert(error)
        return Promise.reject(error)
    }
)

export default service
