<template>
  <div id="nav">
<div class="line"></div>
<el-menu
  :default-active="activeIndex"
  class="el-menu"
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
  name: 'Nav',
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