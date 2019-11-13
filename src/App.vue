<template>
  <div id="app">
<div class="line"></div>
<el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1">用户管理</el-menu-item>
  <el-menu-item index="2">账号管理</el-menu-item>
  <el-menu-item index="3"><a href="https://www.baidu.com" target="_blank">订单管理</a></el-menu-item>
</el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
  return {
    activeIndex: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
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