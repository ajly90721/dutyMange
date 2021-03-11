<template>
  <div id="app">
    <h1>现场到位管控系统</h1>
    <!-- <img src="./assets/logo.png"> -->
    <el-row class="tac">
      <el-col :span="5">
        <!-- <h5>自定义颜色</h5> -->
        <el-menu
          router
        :default-active="this.$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>到岗任务管理</span>
            </template>
            <el-menu-item-group>
              <!-- <template slot="title">分组一</template> -->
              <el-menu-item index="1-1">检修计划</el-menu-item>
              <el-menu-item index="1-2">任务管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="/taskRecord"  >
            <i class="el-icon-menu"></i>
            <span slot="title">到岗到位记录</span>
          </el-menu-item>

          <!-- <el-menu-item index="3" disabled> -->
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">到岗到位卡管理</span>
          </el-menu-item>

        </el-menu>
      </el-col>


    </el-row>
    <router-view/>
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
