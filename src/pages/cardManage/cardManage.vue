<template>
  <div>
    <el-container>
      <el-header style="text-align: left; font-size: 15px"><h2>到位卡导入</h2></el-header>
      <el-main>
        <el-button type="primary" @click="importExcel">导入Excel</el-button>
      </el-main>

      <el-header style="text-align: left; font-size: 15px"><h2>到位卡管理</h2></el-header>
      <el-main>
        <el-table :data="cardList">
          
            <el-table-column prop="cardId" label="ID" width="200">
            </el-table-column>
            <el-table-column prop="name" label="标题" width="200">
            </el-table-column>
            <el-table-column prop="department" label="部门" width="200">
            </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

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
      // tableData: [{
      //         cardId: '2016-05-02',
      //         name: '王小虎',
      //         department: '后勤部'
      //       }, 
      //       {
      //         cardId: '2016-05-02',
      //         name: '王小虎',
      //         department: '后勤部'
      //       }, 
      //       {
      //         cardId: '2016-05-02',
      //         name: '王小虎',
      //         department: '后勤部'
      //       }, ],

    }),
    computed: {
            searchWords() {
                return this.$route.params.words
            },
            hideSlogan() {
                return this.category || this.searchWords
            },

            cardList:
            {
                get(){
                    return this.$store.state.card.cardList
                }
            },
    },
    methods: {

      handleEdit(index,obj){
        this.$router.push({name:'cardEdit',params:{cardId:obj.cardId}});
      },
      importExcel(){
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },

    },
    mounted() {
    // console.log(this.t_list[this.t_index].tid);
    // console.log("参数："+this.$route.params.tid)
    if(this.$route.params.tid)
        // this.$store.commit("home/setListTitle",this.$route.params.value);
        this.fetchAList(this.$route.params.tid);
    else    this.fetchAList(0); 
    }
  }
</script>

<style>
  
</style>