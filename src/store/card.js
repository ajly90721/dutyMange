import {getCardList,addCard,getCardById,getCardDetail,editCardDetail,getDeps,getCardByDep} from '../utils/api';

const state=
{
    cardList:[],
    cardDetail:[],
    name:''
    //记录页面参数

};
const mutations=
{
  setList(state,payload)
  {
    console.log("zhixing setList");
    // console.log(payload);
    state.cardList=payload.data;
    // console.log(state.t_list);
    // state.rank_contact=payload.res.newlyAddedVisitRecordRank;
    // state.rank_visit=payload.res.newlyAddedContactRank;
  },
  setDetail(state,payload)
    {
      console.log("zhixing setDetail");
      // console.log(payload);
      state.cardDetail=payload.data;
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
  getCardList: ({commit,state}) =>{
    return new Promise(resolve => {
      getCardList().then(res => {
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
    
    getCardById: ({commit,state},id) =>{
      return new Promise(resolve => {
        getCardById(id).then(res => {
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
      getCardByDep: ({commit,state},id) =>{
        return new Promise(resolve => {
          getCardByDep(id).then(res => {
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
  getCardDetail: ({commit,state},id) =>{
    return new Promise(resolve => {
      getCardDetail(id).then(res => {
            console.log(res.data);
            resolve(res.data);
            commit({
              type:"setDetail",
              data:res.data.data
            });

            
            }).catch(err => {
                console.log(err);
                resolve({});
            })
        })
    },
  editCardDetail: ({commit,state},obj) =>{
    return new Promise(resolve => {
      editCardDetail(obj).then(res => {
            resolve(res.data);
            }).catch(err => {
                console.log(err);
                resolve({});
            })
        })
    },
    getDeps: ({commit,state}) =>{
      return new Promise(resolve => {
        getDeps().then(res => {
              console.log(res.data);
              resolve(res.data);
  
              }).catch(err => {
                  console.log(err);
                  resolve({});
              })
          })
      },
      addCard: ({commit,state},str) =>{
        return new Promise(resolve => {
          addCard(str).then(res => {
                console.log(res.data);
                resolve(res.data);
    
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