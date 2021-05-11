<template>
  <div>
    <el-container>
      <el-header style="text-align: left; margin-top:20px"><h2>到位卡注册</h2></el-header>
      <el-main style="text-align: left; margin-top:20px">
        <el-form>
          <el-form-item label="检查卡标题">
            <el-input v-model="cardName" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="部门" v-if="isBOSS">
            <el-select v-model="department" placeholder="请选择部门">
                <el-option v-for="{text,value} in depSorter" :key="text" :label="text" :value="text"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="handleUpload">注册</el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <el-header style="text-align: left; margin-top:20px"><h2>到位卡上传</h2></el-header>
      <el-main>
        <el-upload ref="upload" drag :auto-upload="true" :limit="1" action="http://localhost:8081/card/uploadExcel/">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将xls/xlsx文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
      </el-main>
          

      <el-header style="text-align: left; font-size: 15px"><h2>到位卡管理</h2></el-header>
      <el-main>
        <el-table :data="cardList">
            <el-table-column prop="cardId" label="ID" width="200">
            </el-table-column>
            <el-table-column prop="name" label="标题" width="200">
            </el-table-column>
            <el-table-column prop="department" label="部门" width="200"
              :filters="depSorter"
              :filter-method="handleFilter">
            </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        @click="handleEdit(scope.$index, scope.row)">编辑详情</el-button>

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
      isBOSS:false,
      cardName:'',
      department:'',
      depSorter:[],
      // user:{department:'董事局',staffId:11,position:"BOSS"},
      

    }),
    computed: {
            cardList:
            {
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
    methods: {
      getCardList(){
          this.$store.dispatch("card/getCardList").then(res=>{});
      },
      getCardById(id){
        this.$store.dispatch("card/getCardById",id).then(res=>{});
      },
      getCardByDep(id){
        this.$store.dispatch("card/getCardByDep",id).then(res=>{});
      },
      getDeps(){
        this.$store.dispatch("card/getDeps").then(res=>{
          
          for(var i=0;i<res.data.length;i++)
            this.depSorter.push({text:res.data[i].department,value:res.data[i].department})
        });
      },
      handleEdit(index,obj){
        this.$store.commit("card/setName",obj.name)
        this.$router.push({name:'cardEdit',params:{name:obj.name,cardId:obj.cardId}});
      },
      handleFilter(value, row, column) {
        const property = column['property'];
        return row[property] === value;},
      handleUpload(){
        if(this.department==""||this.department==null)
            this.department=this.user.department
        if(this.cardName!=""&&this.cardName!=null)
          this.$store.dispatch("card/addCard",JSON.stringify({name:this.cardName,department:this.department})).then(res=>{
            if(res.status) {
              this.getCardAuto(); this.$message({type: 'success',message: res.info}); 
              this.department=''; this.cardName=''
            } else this.$message({type: 'success',message: res.info});
          });
        else
          this.$message({type: 'success',message: '检查卡标题不能为空！'});
      },
      getCardAuto(){
              if(this.user.position=="BOSS"){
          this.getCardList();
          this.isBOSS=true
        }
      else
        this.getCardByDep(this.user.department);
      }


    },
    mounted() {
      this.getCardAuto()
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