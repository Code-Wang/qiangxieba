<template>
  <div id="nav">
<el-menu
  router :default-active="activeIndex"
  class="el-menu"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="/nav/statics">数据统计</el-menu-item>
  <el-menu-item index="/nav/user">用户管理</el-menu-item>
  <el-menu-item index="/nav/account">账号管理</el-menu-item>
  <el-menu-item index="/nav/orders">订单管理</el-menu-item>
</el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data() {
  return {
    activeIndex: '/nav/statics'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
    console.log(key, keyPath);
    }
  }
}
</script>