<template>
  <div>
    <el-container>
      <el-header style="text-align: left;margin-top:20px"><h1>计划列表</h1></el-header>
      <template>
        <el-dialog
          style="text-align: left;"
          title="新建"
          :visible="dialogVisible"
          width="30%"
          @close="handleClose">
        <el-form ref="form" :inline="false" :model="formp" label-width="100px">
            <el-form-item label="计划开始时间">
                <el-date-picker type="datetime" :picker-options="pickerOptions" placeholder="选择时间" v-model="formp.timeTostart" style="width: 100%;" value-format="yyyy-MM-ddTHH:mm:ss.000Z"></el-date-picker>
            </el-form-item>
            <el-form-item label="计划结束时间">
                <el-date-picker type="datetime" :picker-options="pickerOptions" placeholder="选择时间" v-model="formp.timeTofinish" style="width: 100%;" value-format="yyyy-MM-ddTHH:mm:ss.000Z"></el-date-picker>
            </el-form-item>
            <el-form-item label="部门" v-if="isBOSS">
              <el-select v-model="formp.department" placeholder="请选择部门">
                  <el-option v-for="{text,value} in depSorter" :key="text" :label="text" :value="text"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计划标题">
                <el-input v-model="formp.planName" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="计划内容">
                <el-input v-model="formp.content" placeholder="请输入内容"></el-input>
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
            <el-form-item label="标题">
              <el-input v-model="form.planName"></el-input>
            </el-form-item>
            <el-form-item label="ID">
              <el-input v-model="form.planId"></el-input>
            </el-form-item>
            
             <el-form-item label="部门" v-if="isBOSS">
              <el-select v-model="form.department" placeholder="请选择部门">
                  <el-option v-for="{text,value} in depSorter" :key="text" :label="text" :value="text"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="起止时间">
              <el-col :span="11">
                <el-date-picker type="datetime" placeholder="选择日期时间" v-model="form.timeTostart" style="width: 100%;" value-format="yyyy-MM-ddTHH:mm:ss.000Z"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker type="datetime" placeholder="选择日期时间" v-model="form.timeTofinish" style="width: 100%;" value-format="yyyy-MM-ddTHH:mm:ss.000Z" default-time="23:59:59.000Z"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.createPTime" style="width: 100%;" value-format="yyyy-MM-ddTHH:mm:ss.000Z"></el-date-picker>
            </el-form-item>
            <el-form-item label="更新时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.updatePTime" style="width: 100%;" value-format="yyyy-MM-ddTHH:mm:ss.000Z"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="margin-left:40px" @click="onSubmit">查询</el-button>
              <el-button @click="onReset">重置</el-button>
              <el-button type="success" style="margin-left:40px" @click="onCreatePlan">新建计划</el-button>
            </el-form-item>
          </el-form>
      </el-main>
      <el-main>
        <el-table :data="planList">
            <el-table-column prop="planId" label="ID" width="50">
            </el-table-column>
            <el-table-column prop="planName" label="标题" width="200">
            </el-table-column>
            <el-table-column prop="department" label="部门" width="200"
              :filters="depSorter"
              :filter-method="handleFilter">
            </el-table-column>
            <el-table-column sortable prop="timeTostart" label="计划开始时间" width="200" >
            </el-table-column>
            <el-table-column sortable prop="timeTofinish" label="计划结束时间" width="200" >
            </el-table-column>
            <el-table-column sortable prop="createPTime" label="创建时间" width="200" >
            </el-table-column>
            <el-table-column sortable prop="updatePTime" label="更新时间" width="200" >
            </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        @click="handleCreate(scope.$index, scope.row)">生成任务</el-button>

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
      // user:{department:'董事局',staffId:11,position:"BOSS"},
      form: {
          planName: '',
          planId: '',
          department: '',
          timeTostart: '',
          timeTofinish: '',
          createPTime: '',
          updatePTime: '',
        },
      formp:{
        planName: '',department: '',timeTostart: '',timeTofinish: '',content:''
      },
      pickerOptions:{
        disabledDate:(time)=>{

              return time.getTime() < Date.now() -8.64e7
              //设置不可选的日期
          }
        },
      

    }),
    computed: {
            planList:
            {
                get(){
                    return this.$store.state.task.planList
                }
            },
      user:{
                get(){
                            return this.$store.state.user
                        }
      }
    },
    methods: {
      getPlanList(){
          this.$store.dispatch("task/getPlanList").then(res=>{});
      },
      getPlanListByDep(str){
          this.$store.dispatch("task/getPlanListByDep",str).then(res=>{});
      },
      getDeps(){
        this.$store.dispatch("card/getDeps").then(res=>{
          
          for(var i=0;i<res.data.length;i++)
            this.depSorter.push({text:res.data[i].department,value:res.data[i].department})
        });
      },
      handleCreate(index,obj){
        // this.$store.commit("task/setPlan",[obj])
        this.$router.push({name:'taskGenerate',params:{planName:obj.planName,planId:obj.planId,department:obj.department}});
      },
      handleFilter(value, row, column) {
        const property = column['property'];
        return row[property] === value;},
      onSubmit() {
        console.log(this.form);
        this.form.department=this.user.department
        this.$store.dispatch("task/getPlanListByPlan",JSON.stringify(this.form)).then(res=>{});
      },
      onReset() {
        this.form={planName: '',planId: '',department: '',timeTostart: '',timeTofinish: '',createPTime: '',updatePTime: ''}
      },
      handleSubmitP() {

        if(this.formp.department=="") this.formp.department=this.user.department
        this.$store.dispatch("task/createPlan",JSON.stringify(this.formp))
        .then(res=>{if(this.user.position=="BOSS"){this.getPlanList();this.isBOSS=true}
                    else this.getPlanListByDep(this.user.department);});
        this.dialogVisible=false;
      },
      handleCancelP() {this.dialogVisible=false;},
      handleClose(){this.dialogVisible=false;},
      onCreatePlan(){this.dialogVisible=true;}

    },
    mounted() {
      if(this.user.position=="BOSS")
        {
          this.getPlanList();
          this.isBOSS=true
        }
      else
        this.getPlanListByDep(this.user.department);
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