<template>
  <div>
    <el-container>
      <el-header style="text-align: left;margin-top:20px"><h1>到位记录</h1></el-header>
      <template>
        <el-dialog
          style="text-align: left;"
          title="记录详情"
          :visible="dialogVisible"
          width="60%"
          @close="handleClose">
        <el-form ref="form" :inline="false" :model="curRecord" label-width="100px">
            <el-form-item label="问题">
              {{curRecord.problem}}
            </el-form-item>
            <el-form-item label="图片">
              <el-image   :src="curRecord.imgPath" fit='contain'></el-image>
            </el-form-item>
            
        </el-form>
        </el-dialog>
        </template>
        
      <el-main>
        <el-form ref="form" :inline="true" :model="form" label-width="100px" style="text-align: left;">
            <el-form-item label="任务ID">
              <el-input v-model="form.taskId"></el-input>
            </el-form-item>
            
            <el-form-item label="执行人">
              <el-select v-model="form.staffId" placeholder="请选择执行人" >
                <el-option v-for="{name,staffId} in this.staffList" :key="staffId" :label="name" :value="staffId" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="检查卡">
              <el-select v-model="form.cardId" placeholder="请选择检查卡">
                  <el-option v-for="{cardId,name} in this.cardList" :key="cardId" :label="name" :value="cardId"></el-option>
              </el-select>
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
                <el-date-picker type="date" placeholder="选择日期" v-model="form.createTRTime" style="width: 100%;" value-format="yyyy-MM-ddTHH:mm:ss.000Z"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="margin-left:40px" @click="onSubmit">查询</el-button>
              <el-button @click="onReset">重置</el-button>
            </el-form-item>
          </el-form>
      </el-main>
      <el-main style="text-align: left;">
        <el-table :data="recordList">

            <el-table-column sortable prop="taskId" label="任务ID" width="100"></el-table-column>
            <el-table-column sortable prop="cardId" label="检查卡ID" width="100"></el-table-column>
            <el-table-column sortable prop="ruleId" label="检查条目ID" width="120"></el-table-column>
            <el-table-column sortable  prop="department" label="部门" width="100"
              :filters="depSorter"
              :filter-method="handleFilter">
            </el-table-column>
            <el-table-column sortable prop="taskLocation" label="任务地点" width="100"></el-table-column>
            <el-table-column sortable prop="taskTime" label="任务时间" width="100"> </el-table-column>
            <el-table-column sortable prop="staffName" label="执行人" width="100"> </el-table-column>
            <el-table-column sortable prop="clockinTime" label="签到时间" width="100" ></el-table-column>
            <el-table-column sortable prop="clockoutTime" label="签退时间" width="100" > </el-table-column>
            <el-table-column sortable prop="createTRTime" label="记录创建时间" width="160" ></el-table-column>
            <el-table-column>
            <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        @click="handleDetail(scope.$index, scope.row)">详情</el-button>

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
      curRecord:'',
      // user:{department:'董事局',staffId:11,position:"BOSS"},
      form: {
          cardId: '',
          taskId:'',
          staffId:'',
          taskTime:'',
          clockinTime: '',
          clockoutTime: '',
          createTRTime: '',
          department:''
        },
      
    }),
    computed: {
      
      recordList:
      {
          get(){
              return this.$store.state.taskrecord.recordList
          }
      },
      locationList:{
          get(){
              return this.$store.state.task.locationList
          }
      },
      cardList:{
          get(){
              return this.$store.state.card.cardList
          }
      },
      staffList:{
        get(){
              return this.$store.state.task.staffList
          }
      },

      user:{
        get(){
              return this.$store.state.user
          }
      }
    },
    methods: {
      getStaffByDep(id){
          this.$store.dispatch("task/getStaffByDep",id).then(res=>{});
      },
      getStaffList(){
          this.$store.dispatch("task/getStaffList").then(res=>{});
      },
      getCardList(){
          this.$store.dispatch("card/getCardList").then(res=>{});
      },
      getCardByDep(id){
          this.$store.dispatch("card/getCardByDep",id).then(res=>{});
      },
      getLocationList(){
          this.$store.dispatch("task/getLocationList").then(res=>{});
      },
      getInfoAuto(){
        console.log(this.user)
        if(this.user.position=="BOSS")
          {
            this.getRecordList();
            this.getStaffList()
            this.getCardList()
            this.isBOSS=true
          }
        else {
          this.getRecordListByDep(this.user.department);
          this.getStaffByDep(this.user.department)
          this.getCardByDep(this.user.department)
          }
      },
      getRecordList(){
          this.$store.dispatch("taskrecord/getRecordList").then(res=>{});
      },
      getRecordListByDep(str){
          this.$store.dispatch("taskrecord/getRecordListByDep",str).then(res=>{});
      },
      getDeps(){
        this.$store.dispatch("card/getDeps").then(res=>{
          
          for(var i=0;i<res.data.length;i++)
            this.depSorter.push({text:res.data[i].department,value:res.data[i].department})
        });
      },
      handleFilter(value, row, column) {
        const property = column['property'];
        return row[property] === value;},
      onSubmit() {
        console.log(this.form);
        if(this.user.position=="BOSS")
          this.form.department="" 
        else this.form.department=this.user.department
        console.log(this.form)
        this.$store.dispatch("taskrecord/getRecordListByRecord",JSON.stringify(this.form)).then(res=>{});
      },
      onReset() {
        this.form= {cardId: '',planId: '',taskId:'',staffId:'',creatorId:'',status:'',taskLocation:'',
          taskTime:'',clockinTime: '',clockoutTime: '',createTTime: '',updateTTime: '',department:''}
          },
      
      handleClose(){this.dialogVisible=false;},
      handleDetail(index,row){ this.curRecord=row; this.dialogVisible=true;},



    },
    mounted() {
      this.getInfoAuto()
    this.getLocationList()
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