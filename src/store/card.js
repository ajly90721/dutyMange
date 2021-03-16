import {getCardList,getCardById} from '../utils/api';

const state=
{
    cardList:[],
    //记录页面参数

};
const mutations=
{
    setList(state,payload)
    {
      console.log("zhixing setTagList");
      // console.log(payload);
      state.t_list=payload.data;
      // console.log(state.t_list);
      // state.rank_contact=payload.res.newlyAddedVisitRecordRank;
      // state.rank_visit=payload.res.newlyAddedContactRank;
    },
};
const actions=
{   
  getTList: ({commit,state}) =>{
    return new Promise(resolve => {
        getTList().then(res => {
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
    getTByAid: ({commit,state},aid) =>{
      return new Promise(resolve => {
        getTByAid(aid).then(res => {
              console.log(res.data);
                resolve(res.data);
              
              }).catch(err => {
                  console.log(err);
                  resolve({});
              })
          })
      },
      deleteTag: ({commit,state},str) =>{
        return new Promise(resolve => {
          deleteTag(str).then(res => {
                console.log(res.data);
                  resolve(res.data);
                
                }).catch(err => {
                    console.log(err);
                    resolve({});
                })
            })
        },
      addTag: ({commit,state},str) =>{
        return new Promise(resolve => {
          addTag(str).then(res => {
                console.log(res.data);
                resolve(res.data);

                
                }).catch(err => {
                    console.log(err);
                    resolve({});
                })
            })
        }
  
  

    
    
};
export default(
{
    namespaced:true,
    state,
    mutations,
    actions
})