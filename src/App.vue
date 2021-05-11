<template>
  <div id="app">
    
    <p style="margin:20px;font-size:25px">现场到位管控系统</p>
    <el-button type="text" @click="logout">退出登录</el-button>
    <!-- <img src="./assets/logo.png"> -->
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px"  style="background-color: rgb(238, 241, 246)">
        <el-menu 
        @select="handleSelect"
        :router="true"
        :default-active="this.$route.path" >
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>到岗任务管理</template>
            <el-menu-item-group>
              <el-menu-item index="/plan">检修计划</el-menu-item>
              <el-menu-item index="/taskManage">任务管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="/taskRecord"  >
            <i class="el-icon-menu"></i>
            <span slot="title">到岗到位记录</span>
          </el-menu-item>

          <!-- <el-menu-item index="3" disabled> -->
          <el-menu-item index="/cardManage">
            <i class="el-icon-document"></i>
            <span slot="title">到岗到位卡管理</span>
          </el-menu-item>

        </el-menu>
      </el-aside>

      <router-view/>
      
      
    </el-container>
    
  </div>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
      show: true
    }),
  computed:{
    user:{
      get(){
        return this.$store.state.user
      }
    }
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(){
        console.log(this.user)
        // if(this.user.staffId==1)
        //   this.$router.push("/login")
      },
      logout(){
        sessionStorage.removeItem('token');
        this.$router.push("/login")
      }
    },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
      // token过期后跳转到登录页面
      if(sessionStorage.getItem('token')==null) this.$router.push("/login")
    });
  },
  

}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;


}

</style>
