<template>
  <div>
    <el-container>
      <el-header style="text-align: left;margin-top:20px"><h1>任务管理</h1></el-header>
      <template>
        <el-dialog
          style="text-align: left;"
          title="调整"
          :visible="dialogVisible"
          width="30%"
          @close="handleClose">
          不选择则不更改
        <el-form ref="form" :inline="false" :model="formt" label-width="100px">
            <el-form-item label="任务时间">
                <el-date-picker type="datetime" :picker-options="pickerOptions" placeholder="选择时间" v-model="formt.taskTime" style="width: 100%;" value-format="yyyy-MM-ddTHH:mm:ss.000Z"></el-date-picker>
            </el-form-item>
            <el-form-item label="检查卡">
              <el-select v-model="formt.cardId" placeholder="请选择检查卡">
                  <el-option v-for="{cardId,name} in this.cardList" :key="cardId" :label="name" :value="cardId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务地点">
              <el-select v-model="formt.taskLocation" placeholder="请选择任务地点" >
                <el-option v-for="{taskLocation,locationId} in this.locationList" :key="locationId" :label="taskLocation" :value="taskLocation"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="执行人">
              <el-select v-model="formt.staffId" placeholder="请选择执行人" >
                <el-option v-for="{name,staffId} in this.staffList" :key="staffId" :label="name" :value="staffId" ></el-option>
              </el-select>
            </el-form-item>


        </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancelP()">取 消</el-button>
            <el-button type="primary" @click="handleSubmitP()">提 交</el-button>
          </span>
        </el-dialog>
        </template>
        
      <el-main>
        <el-form ref="form" :inline="true" :model="form" label-width="100px" style="text-align: left;">
            <el-form-item label="任务ID">
              <el-input v-model="form.taskId"></el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-select v-model="form.status" placeholder="请选择状态">
                  <el-option label="已下发" value="已下发"></el-option><el-option label="未下发" value="未下发"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务地点">
              <el-select v-model="form.taskLocation" placeholder="请选择任务地点" >
                <el-option v-for="{taskLocation,locationId} in this.locationList" :key="locationId" :label="taskLocation" :value="taskLocation"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.createTTime" style="width: 100%;" value-format="yyyy-MM-ddTHH:mm:ss.000Z"></el-date-picker>
            </el-form-item>
            <el-form-item label="签到签退时间">
              <el-col :span="11">
                <el-date-picker type="datetime" placeholder="选择签到时间" v-model="form.clockinTime" style="width: 100%;" value-format="yyyy-MM-ddTHH:mm:ss.000Z"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker type="datetime" placeholder="选择签退时间" v-model="form.clockoutTime" style="width: 100%;" value-format="yyyy-MM-ddTHH:mm:ss.000Z" default-time="23:59:59.000Z"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.createTTime" style="width: 100%;" value-format="yyyy-MM-ddTHH:mm:ss.000Z"></el-date-picker>
            </el-form-item>
            <el-form-item label="更新时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.updateTTime" style="width: 100%;" value-format="yyyy-MM-ddTHH:mm:ss.000Z"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="margin-left:40px" @click="onSubmit">查询</el-button>
              <el-button @click="onReset">重置</el-button>
              
            </el-form-item>
          </el-form>
      </el-main>
      <el-main style="text-align: left;">
        <el-button type="primary" style="margin-left:40px" @click="handleSend">下发</el-button>
        <el-button @click="handleDel">删除</el-button>
        <el-table :data="taskList"  @selection-change="handleSelectionChange">
          

            <el-table-column type="selection" width="55"> </el-table-column>

            <el-table-column prop="taskId" label="任务ID" width="100"></el-table-column>
            <el-table-column prop="planId" label="计划ID" width="100"></el-table-column>
            <el-table-column prop="planName" label="计划标题" width="100"></el-table-column>
            <el-table-column prop="department" label="部门" width="100"
              :filters="depSorter"
              :filter-method="handleFilter">
            </el-table-column>
            <el-table-column prop="taskLocation" label="任务地点" width="100"></el-table-column>
            <el-table-column prop="taskTime" label="任务时间" width="100"> </el-table-column>
            <el-table-column prop="staffName" label="执行人" width="100"> </el-table-column>
            <el-table-column prop="status" label="状态" width="100"> </el-table-column>
            <el-table-column sortable prop="clockinTime" label="签到时间" width="100" ></el-table-column>
            <el-table-column sortable prop="clockoutTime" label="签退时间" width="100" > </el-table-column>
            <el-table-column sortable prop="timeTostart" label="计划开始时间" width="100" ></el-table-column>
            <el-table-column sortable prop="timeTofinish" label="计划结束时间" width="100" ></el-table-column>
            <el-table-column sortable prop="createTTime" label="任务创建时间" width="100" ></el-table-column>
            <el-table-column sortable prop="updateTTime" label="任务更新时间" width="100" ></el-table-column>
            <el-table-column>
            <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        @click="handleUpdate(scope.$index, scope.row)">调整</el-button>

                    </template>
                  </el-table-column>
          </el-table>
      </el-main>
    </el-container>
     
  </div>
</template>

<script>
  export default {
    data: () => ({
      dialogVisible:false,
      isBOSS:false,
      depSorter:[],
      selection:[],
      // user:{department:'董事局',staffId:11,position:"BOSS"},
      form: {
          cardId: '',
          planId: '',
          taskId:'',
          staffId:'',
          creatorId:'',
          status:'',
          taskLocation:'',
          taskTime:'',
          clockinTime: '',
          clockoutTime: '',
          createTTime: '',
          updateTTime: '',
          department:''
        },
      formt:{
              staffId: '',taskLocation: '',taskTime: '',cardId: '',taskId:''
            },
      plan:'',staffList:'',cardList:'',
      pickerOptions:'',
      curTask:''
    
    }),
    computed: {
      
      taskList:
      {
          get(){
              return this.$store.state.task.taskList
          }
      },
      locationList:{
          get(){
              return this.$store.state.task.locationList
          }
      },


      user:{
                get(){
                            return this.$store.state.user
                        }
      }
    },
    methods: {
      getPlan(id){
          this.$store.dispatch("task/getPlan",id).then(res=>{this.content=res.data[0].content});
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
      getTaskAuto(){
        if(this.user.position=="BOSS")
          {
            this.getTaskList();
            this.isBOSS=true
          }
        else this.getTaskListByDep(this.user.department);
      },
      getTaskList(){
          this.$store.dispatch("task/getTaskList").then(res=>{});
      },
      getTaskListByDep(str){
          this.$store.dispatch("task/getTaskListByDep",str).then(res=>{});
      },
      getDeps(){
        this.$store.dispatch("card/getDeps").then(res=>{
          
          for(var i=0;i<res.data.length;i++)
            this.depSorter.push({text:res.data[i].department,value:res.data[i].department})
        });
      },
      handleSelectionChange(val){this.selection = val;},
      handleSend(){
        // console.log(this.selection)
        this.$store.dispatch("task/sendTasks",JSON.stringify(this.selection)).then(res=>{this.getTaskAuto()});
        
      },
      handleDel() {
        this.$confirm('此操作将删除选中记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //数组第一个对象携带发送者信息
          // this.selection[0].senderId=this.user.staffId
          this.selection[0].senderId=1
          console.log(this.selection)
          this.$store.dispatch("task/deleteTasks",JSON.stringify(this.selection)).then(res=>{
            
            this.getTaskAuto()
            this.$message({
            type: 'success',
            message: res.info
          });
            });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleUpdate(index,row) {
        if(row.clockoutTime!=""&&row.clockoutTime!=null)
          this.$alert('任务已执行结束，不可调整！',{confirmButtonText: '确定',})
        else{
          this.formt.taskId=row.taskId
          this.curTask=row
          this.$store.dispatch("task/getPlan",row.planId).then(res=>{
            this.plan=res.data[0]
            this.pickerOptions={
          disabledDate:(time)=>{
                return time.getTime() < Date.now() -8.64e7||time.getTime() < new Date(this.plan.timeTostart).getTime()-8.64e7 || time.getTime() > new Date(this.plan.timeTofinish).getTime();
                //设置不可选的日期
            }
          }
            this.$store.dispatch("task/getStaffByDep",this.plan.department).then(res=>{
              this.staffList=res.data
              this.$store.dispatch("card/getCardByDep",this.plan.department).then(res=>{
                this.cardList=res.data
                this.dialogVisible=true
              })
            })
            
          })
        }

        
      },
      handleFilter(value, row, column) {
        const property = column['property'];
        return row[property] === value;},
      onSubmit() {
        console.log(this.form);
        if(this.user.position=="BOSS")
          this.form.department="" 
        else this.form.department=this.user.department
        this.$store.dispatch("task/getTaskListByTask",JSON.stringify(this.form)).then(res=>{});
      },
      onReset() {
        this.form= {cardId: '',planId: '',taskId:'',staffId:'',creatorId:'',status:'',taskLocation:'',
          taskTime:'',clockinTime: '',clockoutTime: '',createTTime: '',updateTTime: '',department:''}
          },
      handleSubmitP() {
        if(this.formt.taskTime=="") this.formt.taskTime=this.curTask.taskTime
        if(this.formt.taskLocation=="") this.formt.taskLocation=this.curTask.taskLocation
        if(this.formt.staffId=="") this.formt.staffId=this.curTask.staffId
        if(this.formt.cardId=="") this.formt.cardId=this.curTask.cardId

        console.log(this.formt)
        this.$store.dispatch("task/updateTask",JSON.stringify(this.formt))
        .then(res=>{this.getTaskAuto()});
        this.dialogVisible=false;
      },
      handleCancelP() {this.dialogVisible=false;},
      handleClose(){this.dialogVisible=false;},



    },
    mounted() {
      this.getLocationList()
      this.getTaskAuto()
      this.getDeps();

      // console.log("sorter：")
      // console.log(this.depSorter)
    // console.log(this.t_list[this.t_index].tid);
    // console.log("参数："+this.$route.params.tid)
    // if(this.$route.params.tid)
    //     // this.$store.commit("home/setListTitle",this.$route.params.value);
    //     this.fetchAList(this.$route.params.tid);
    // else    this.fetchAList(0); 
    }
  }
</script>

<style>
  
</style>