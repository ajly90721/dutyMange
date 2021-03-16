<template>
  <div id="app">
    
    <!-- <el-header style="text-align: right; font-size: 12px; margin-top: 10px;">
      <el-dropdown>
        <i class="el-icon-setting"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header> -->
    <h1>现场到位管控系统</h1>
    <!-- <img src="./assets/logo.png"> -->
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px"  style="background-color: rgb(238, 241, 246)">
        <el-menu 
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
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
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
