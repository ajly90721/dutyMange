import {getPlanList,updateTask,getStaffList,getPlanListByPlan,sendTasks,deleteTasks,getTaskListByTask,getTaskList,getTaskListByDep,getPlanListByDep,getPlan,createPlan,createTask,getTaskByPlan,getStaffByDep,getLocationList} from '../utils/api';

const state=
{
    planList:[],
    plan:[],
    planName:'',
    user:{department:'后勤部',staffId:1},
    taskList:[],
    staffList:[],
    locationList:[]

    //记录页面参数

};
const mutations=
{
  setList(state,payload)
  {
    console.log("zhixing setList");
    // console.log(payload);
    state.planList=payload.data;
    // console.log(state.t_list);
    // state.rank_contact=payload.res.newlyAddedVisitRecordRank;
    // state.rank_visit=payload.res.newlyAddedContactRank;
  },
  setPlan(state,name)
  {
    console.log("zhixing setPlan");
    // console.log(name.data)
    state.plan=name.data;
  },
  setTaskList(state,data)
  {
    console.log("zhixing setTaskList");
    // console.log(name.data)
    state.taskList=data.data;
  },
  setStaffList(state,data)
  {
    console.log("zhixing setStaffList");
    // console.log(name.data)
    state.staffList=data.data;
  },
  setLocationList(state,data)
  {
    console.log("zhixing setLocationList");
    // console.log(name.data)
    state.locationList=data.data;
  },


};
const actions=
{   
  getPlanList: ({commit,state}) =>{
    return new Promise(resolve => {
      getPlanList().then(res => {
            console.log(res.data); 
            resolve(res.data); 
            commit({type:"setList", data:res.data.data});
            }).catch(err => {console.log(err); resolve({});})
        })
    },
    getStaffList: ({commit,state}) =>{
      return new Promise(resolve => {
        getStaffList().then(res => {
              console.log(res.data); 
              resolve(res.data); 
              commit({type:"setStaffList", data:res.data.data});
              }).catch(err => {console.log(err); resolve({});})
          })
      },
    getPlanListByPlan: ({commit,state},str) =>{
      return new Promise(resolve => {
        getPlanListByPlan(str).then(res => {
              console.log(res.data); 
              resolve(res.data); 
              commit({type:"setList", data:res.data.data});
              }).catch(err => {console.log(err); resolve({});})
          })
      },
  getPlan: ({commit,state},str) =>{
    return new Promise(resolve => {
      getPlan(str).then(res => {
            console.log(res.data); 
            resolve(res.data); 
            commit({type:"setPlan", data:res.data.data});
            }).catch(err => {console.log(err); resolve({});})
        })
    },
  getTaskByPlan: ({commit,state},str) =>{
    return new Promise(resolve => {
      getTaskByPlan(str).then(res => {
            console.log(res.data); 
            resolve(res.data); 
            commit({type:"setTaskList", data:res.data.data});
            }).catch(err => {console.log(err); resolve({});})
        })
    },   
  getStaffByDep: ({commit,state},str) =>{
    return new Promise(resolve => {
      getStaffByDep(str).then(res => {
            console.log(str)
            console.log(res.data); 
            resolve(res.data); 
            commit({type:"setStaffList", data:res.data.data});
            }).catch(err => {console.log(err); resolve({});})
        })
    }, 
  getLocationList: ({commit,state}) =>{
  return new Promise(resolve => {
    getLocationList().then(res => {
          console.log(res.data); 
          resolve(res.data); 
          commit({type:"setLocationList", data:res.data.data});
          }).catch(err => {console.log(err); resolve({});})
      })
  },   
  createTask: ({commit,state},str) =>{
    return new Promise(resolve => {
      createTask(str).then(res => {
            console.log(res.data); 
            resolve(res.data); 
            }).catch(err => {console.log(err); resolve({});})
        })
    },  
  createPlan: ({commit,state},str) =>{
  return new Promise(resolve => {
    createPlan(str).then(res => {
          console.log(res.data); 
          resolve(res.data); 
          }).catch(err => {console.log(err); resolve({});})
      })
  },  
  getPlanListByDep: ({commit,state},str) =>{
    return new Promise(resolve => {
      getPlanListByDep(str).then(res => {
            console.log(res.data); 
            resolve(res.data); 
            commit({type:"setList", data:res.data.data});
            }).catch(err => {console.log(err); resolve({});})
        })
    },
  getTaskListByDep: ({commit,state},str) =>{
    return new Promise(resolve => {
      getTaskListByDep(str).then(res => {
            console.log(res.data); 
            resolve(res.data); 
            commit({type:"setTaskList", data:res.data.data});
            }).catch(err => {console.log(err); resolve({});})
        })
    },
  getTaskList: ({commit,state}) =>{
    return new Promise(resolve => {
      getTaskList().then(res => {
            console.log(res.data); 
            resolve(res.data); 
            commit({type:"setTaskList", data:res.data.data});
            }).catch(err => {console.log(err); resolve({});})
        })
    },
  getTaskListByTask: ({commit,state},str) =>{
    return new Promise(resolve => {
      getTaskListByTask(str).then(res => {
            console.log(res.data); 
            resolve(res.data); 
            commit({type:"setTaskList", data:res.data.data});
            }).catch(err => {console.log(err); resolve({});})
        })
    },
  sendTasks: ({commit,state},str) =>{
    return new Promise(resolve => {
      sendTasks(str).then(res => {
            console.log(res.data); 
            resolve(res.data); 
            // commit({type:"setTaskList", data:res.data.data});
            }).catch(err => {console.log(err); resolve({});})
        })
    },
  deleteTasks: ({commit,state},str) =>{
    return new Promise(resolve => {
      deleteTasks(str).then(res => {
            console.log(res.data); 
            resolve(res.data); 
            // commit({type:"setTaskList", data:res.data.data});
            }).catch(err => {console.log(err); resolve({});})
        })
    }, 
  updateTask: ({commit,state},str) =>{
    return new Promise(resolve => {
      updateTask(str).then(res => {
            console.log(res.data); 
            resolve(res.data); 
            // commit({type:"setTaskList", data:res.data.data});
            }).catch(err => {console.log(err); resolve({});})
        })
    },    
    
    
  
  

    
    
};
export default(
{
    namespaced:true,
    state,
    mutations,
    actions
})