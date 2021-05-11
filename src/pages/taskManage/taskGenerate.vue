<template>
  <div>
    <el-container>
      <el-header style="text-align: left;margin-top:20px"><h2>{{name}}</h2></el-header>
      <el-main style="text-align: left;">  
        <template>
          <el-dialog
          title="编辑"
          :visible="dialogVisible"
          width="30%"
          @close="handleClose">
        <el-form ref="form" :inline="true" :model="form" label-width="80px">
            <el-form-item label="任务时间">
                <el-date-picker type="datetime" :picker-options="pickerOptions" placeholder="选择时间" v-model="form.taskTime" style="width: 100%;" value-format="yyyy-MM-ddTHH:mm:ss.000Z"></el-date-picker>
            </el-form-item>
            <el-form-item label="任务地点">
              <el-select v-model="form.taskLocation" placeholder="请选择任务地点" >
                <el-option v-for="{taskLocation,locationId} in this.locationList" :key="locationId" :label="taskLocation" :value="taskLocation"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="执行人">
              <el-select v-model="form.staffId" placeholder="请选择执行人" >
                <el-option v-for="{name,staffId} in this.staffList" :key="staffId" :label="name" :value="staffId" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="检查卡">
              <el-select v-model="form.cardId" placeholder="请选择检查卡" >
                <el-option v-for="{name,cardId} in this.cardList" :key="cardId" :label="name" :value="cardId"></el-option>
              </el-select>
            </el-form-item>
        </el-form>
          


          <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancel()">取 消</el-button>
            <el-button type="primary" @click="handleSubmit()">提 交</el-button>
          </span>
        </el-dialog>
        </template>
        <el-table :data="plan">
            <el-table-column prop="planId" label="ID" width="50"></el-table-column>
            <el-table-column prop="planName" label="标题" width="200"></el-table-column>
            <el-table-column prop="department" label="部门" width="200"></el-table-column>
            <el-table-column  prop="timeTostart" label="计划开始时间" width="200" ></el-table-column>
            <el-table-column  prop="timeTofinish" label="计划结束时间" width="200" ></el-table-column>
            <el-table-column  prop="createPTime" label="创建时间" width="200" ></el-table-column>
            <el-table-column  prop="updatePTime" label="更新时间" width="200" ></el-table-column>
        </el-table>
        <el-input disabled  :autosize="{ minRows: 2, maxRows: 14}" type="textarea" v-model="content">
        </el-input>
        
        <el-button type="primary" style="margin-top:20px" @click="onGenerate">生成任务</el-button>
        <!-- <el-button @click="onReset">重置</el-button> -->
        <el-table :data="taskList">
            <el-table-column prop="taskId" label="任务ID" width="100"></el-table-column>
            <el-table-column prop="staffName" label="执行人" width="100"></el-table-column>
            <el-table-column  prop="cardName" label="检查卡标题" width="100" ></el-table-column>
            
            <el-table-column  prop="taskTime" label="时间" width="100" ></el-table-column>
            <el-table-column  prop="taskLocation" label="地点" width="100" ></el-table-column>
            <el-table-column  prop="status" label="状态" width="70" ></el-table-column>
            <el-table-column  prop="createTTime" label="创建时间" width="100" ></el-table-column>
            <el-table-column  prop="updateTTime" label="更新时间" width="100" ></el-table-column>
            <el-table-column  prop="clockinTime" label="签到时间" width="100" ></el-table-column>
            <el-table-column  prop="clockoutTime" label="签退时间" width="100" ></el-table-column>
        </el-table>

      </el-main>
    </el-container>
     



  </div>
</template>

<script>
  export default {
    data() {
      return {
        name:'',
        content:'',
        dialogVisible: false,
        // user:{department:'董事局',staffId:11,position:"BOSS"},
        form:{
          taskLocation:'',
          taskTime:'',
          staffId:'',
          cardId:'',
          planId:'',
          creatorId:''
        },

      pickerOptions:{
        disabledDate:(time)=>{

              // return time.getTime() < Date.now() 
              //设置不可选的日期
              return time.getTime() < Date.now() -8.64e7||time.getTime() < new Date(this.plan[0].timeTostart).getTime()-8.64e7 || time.getTime() > new Date(this.plan[0].timeTofinish).getTime();
          }
        },
      }  
    },
    methods: {
      getPlan(id){
          this.$store.dispatch("task/getPlan",id).then(res=>{this.content=res.data[0].content});
      },
      createTask(){
          this.form.planId=this.plan[0].planId
          this.form.creatorId=this.user.staffId
          console.log(this.form)
          this.$store.dispatch("task/createTask",JSON.stringify(this.form)).then(res=>{this.getTaskByPlan(this.$store.state.task.plan[0].planId)});
      },
      getStaffByDep(id){
          this.$store.dispatch("task/getStaffByDep",id).then(res=>{});
      },
      getCardByDep(id){
          this.$store.dispatch("card/getCardByDep",id).then(res=>{});
      },
      getLocationList(){
          this.$store.dispatch("task/getLocationList").then(res=>{});
      },
      getTaskByPlan(id){
        this.$store.dispatch("task/getTaskByPlan",id).then(res=>{});
      },
      editCardDetail(row){
        this.$store.dispatch("card/editCardDetail",JSON.stringify(row))
        .then(res=>{this.getCardDetail(row.cardId)});
      },
      onGenerate(){
        this.dialogVisible=true;
      },
      handleCancel(){
        this.dialogVisible=false;
      },
      handleSubmit(){
      
        this.createTask()
        this.dialogVisible=false;
        // this.editCardDetail({cardId:this.cardId,ruleId:this.ruleId,content:this.content});

      },
      handleClose(index,content) {
        this.dialogVisible=false;
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     // console.log(index);
        //     // console.log(content);
        //   })
        //   .catch(_ => {});
      }
    },
    computed:{
      plan:{
                get(){
                    return this.$store.state.task.plan
                }
      },
      taskList:{
                get(){
                    return this.$store.state.task.taskList
                }
      },
      locationList:{
                get(){
                    return this.$store.state.task.locationList
                }
      },
      staffList:{
                get(){
                    return this.$store.state.task.staffList
                }
      },
      cardList:{
                get(){
                    return this.$store.state.card.cardList
                }
      },
      user:{
                get(){
                            return this.$store.state.user
                        }
      }


      
    },
    mounted() {
    
    this.getLocationList()
    if(this.$route.params.planId)
    {
      this.getPlan(this.$route.params.planId)
      this.getTaskByPlan(this.$route.params.planId)
      this.name=this.$route.params.planName
      this.getStaffByDep(this.$route.params.department)
      this.getCardByDep(this.$route.params.department)
    }
    else
    {
      this.getPlan(this.$store.state.task.plan[0].planId)
      this.getTaskByPlan(this.$store.state.task.plan[0].planId)
      this.name=this.$store.state.task.plan[0].planName
      this.getStaffByDep(this.$store.state.task.plan[0].department)
      this.getCardByDep(this.$store.state.task.plan[0].department)
    }
      

    


   }
}
</script>

<style>
  
</style>