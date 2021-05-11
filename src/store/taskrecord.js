import {getRecordList,getRecordListByDep,getRecordListByRecord} from '../utils/api';

const state=
{
    recordList:[],
    recordDetail:[],
    name:''
    //记录页面参数

};
const mutations=
{
  setList(state,payload)
  {
    console.log("zhixing setList");
    // console.log(payload);
    state.recordList=payload.data;
    // console.log(state.t_list);
    // state.rank_contact=payload.res.newlyAddedVisitRecordRank;
    // state.rank_visit=payload.res.newlyAddedContactRank;
  },
  setDetail(state,payload)
    {
      console.log("zhixing setDetail");
      // console.log(payload);
      state.recordDetail=payload.data;
      // console.log(state.t_list);
      // state.rank_contact=payload.res.newlyAddedVisitRecordRank;
      // state.rank_visit=payload.res.newlyAddedContactRank;
    },
  setName(state,name){
    console.log("zhixing setName");
    // console.log(name)
    state.name=name;
  }

};
const actions=
{   
  getRecordList: ({commit,state}) =>{
    return new Promise(resolve => {
        getRecordList().then(res => {
            console.log(res.data);
            resolve(res.data);
            commit({
              type:"setList",
              data:res.data.data
            });

            
            }).catch(err => {
                console.log(err);
                resolve({});
            })
        })
    },
    
    getRecordListByDep: ({commit,state},id) =>{
        return new Promise(resolve => {
            getRecordListByDep(id).then(res => {
                console.log(res.data);
                resolve(res.data);
                commit({
                    type:"setList",
                    data:res.data.data
                });
    
                
                }).catch(err => {
                    console.log(err);
                    resolve({});
                })
            })
        },
        getRecordListByRecord: ({commit,state},id) =>{
            return new Promise(resolve => {
                getRecordListByRecord(id).then(res => {
                    console.log(res.data);
                    resolve(res.data);
                    commit({
                        type:"setList",
                        data:res.data.data
                    });
        
                    
                    }).catch(err => {
                        console.log(err);
                        resolve({});
                    })
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