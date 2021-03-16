<template>
  <div>
    <el-row class="tac">

      <el-col :span="5" :offset="5">111111</el-col>
      <el-col :span="5">111111</el-col>
      <el-col :span="5">111111</el-col>
      <el-col :span="4">111111</el-col>

    </el-row>
     



  </div>
</template>

<script>
  export default {
    data: () => ({

    }),
    methods: {

    },
    mounted() {
    // console.log(this.t_list[this.t_index].tid);
    console.log("参数："+this.$route.params.cardId)
    // if(this.$route.params.tid)
    //     // this.$store.commit("home/setListTitle",this.$route.params.value);
    //     this.fetchAList(this.$route.params.tid);
    // else    this.fetchAList(0); 
    }
  }
</script>

<style>
  
</style>