<template>
  <div>
    <el-container>
      <el-header style="text-align: left;margin-top:20px"><h2>{{name}}</h2></el-header>
      <el-main>
        <template>
          <el-dialog
          title="编辑"
          :visible="dialogVisible"
          width="30%"
          @close="handleClose">
          <el-input v-model="content" placeholder="输入条目内容"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancel()">取 消</el-button>
            <el-button type="primary" @click="handleSubmit(cardId,ruleId,content)">提 交</el-button>
          </span>
        </el-dialog>
        </template>
        
        
        <el-table :data="cardDetail">
          
            <el-table-column prop="ruleId" label="条目ID" width="200">
            </el-table-column>
            <el-table-column prop="content" label="内容" width="200">
            </el-table-column>
            <el-table-column prop="updateCTime" label="修改时间" width="200">
            </el-table-column>

            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
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
        cardId:0,
        ruleId:0,
        content:'',
        dialogVisible: false
      };
    },
    methods: {
      getCardDetail(id){
          this.$store.dispatch("card/getCardDetail",id).then(res=>{});
      },
      editCardDetail(row){
        this.$store.dispatch("card/editCardDetail",JSON.stringify(row))
        .then(res=>{this.getCardDetail(row.cardId)});
      },
      handleEdit(row){
        this.dialogVisible=true;
        this.cardId=row.cardId;
        this.ruleId=row.ruleId;
        this.content=row.content;
      },
      handleCancel(){
        this.dialogVisible=false;
      },
      handleSubmit(){
        this.dialogVisible=false;
        this.editCardDetail({cardId:this.cardId,ruleId:this.ruleId,content:this.content});
        // console.log(cardId);
        // console.log(ruleId);
        // console.log(content);
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
      cardDetail:
            {
                get(){
                    return this.$store.state.card.cardDetail
                }
            },
    },
    mounted() {
    // console.log(this.t_list[this.t_index].tid);
    var id=this.$route.params.cardId
    this.name=this.$route.params.name
    if(id)
    { //console.log("参数："+ id)
      this.getCardDetail(id)
    }else{
      // console.log("刷新后参数："+ id)
      // console.log("刷新后参数cardDetail："+ this.$store.state.card.cardDetail[0].cardId)
      this.getCardDetail(this.$store.state.card.cardDetail[0].cardId)
    }
    if(!this.name)
      this.name=this.$store.state.card.name
    // if(this.$route.params.tid)
    //     // this.$store.commit("home/setListTitle",this.$route.params.value);
    //     this.fetchAList(this.$route.params.tid);
    // else    this.fetchAList(0); 
    }
  }
</script>

<style>
  
</style>