import Vue from 'vue'
import Vuex from 'vuex'
import card from "./card"
import task from "./task"
import taskrecord from "./taskrecord"

import {getTimeInterval} from '../utils/utils'
import {login} from '../utils/api';

Vue.use(Vuex)
// 略:后台获取系统运行时间
const runAt = '1589878800000';
let timer = null;
const state = {
    loading: false,
    runTimeInterval: '',
    socials: '',
    websiteInfo: '',
    user:{staffId:-1, position:"", name:"李华", department:"DK"},
    // token:null
}
const mutations = {
    SET_LOADING: (state, v) => {
        state.loading = v;
    },
    SET_SOCIALS: (state, v) => {
        state.socials = v;
    },
    SET_SITE_INFO: (state, v) =>{
      state.websiteInfo = v;
    },
    GET_RUNTIME_INTERVAL: (state) => {
        if (!timer || !state.runTimeInterval) {
            clearInterval(timer)
            timer = setInterval(() => {
                state.runTimeInterval = getTimeInterval(runAt);
            }, 1000);
        }
    },
    setUser: (state, v) => {
        // console.log(v)
        state.user = v.data[0];
        state.token = v.data[1];
        // console.log("用户：")
        // console.log(state.user)
        // console.log("token：")
        // console.log(state.token)
    },
}
const actions = {
    setLoading: ({commit}, v) => {
        commit('SET_LOADING', v);
    },
    initComputeTime: ({commit}) => {
        commit('GET_RUNTIME_INTERVAL');
    },
    login: ({commit,state},str) =>{
        return new Promise(resolve => {
          login(str).then(res => {
                console.log(res.data); 
                resolve(res.data); 
                commit({type:"setUser", data:res.data.data});
                }).catch(err => {console.log(err); resolve({});})
            })
        }, 


}
const getters = {
    loading: state => state.loading,
    runTimeInterval: state => state.runTimeInterval,
    notice: state => state.websiteInfo?state.websiteInfo.notice:''
}
export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {card,task,taskrecord},
    getters
})
