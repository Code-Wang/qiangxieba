<template>		
    <div class="login-page">
        <div class="logo-img">
            <img src="@/assets/logo.jpg" height="150" width="150"/>
        </div>
        <!-- <div class="logo-desc">
            <div style="font-family:PingFang SC font-size:200">后台管理系统</div>
        </div> -->

        <el-row :gutter="20">
            <el-col :span="4" :offset="10"><div class="grid-content bg-purple">
                <el-input v-model="username" placeholder="用户名"></el-input>
            </div></el-col>
        </el-row>          
        <el-row :gutter="20">
            <el-col :span="4" :offset="10"><div class="grid-content bg-purple">
                <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
            </div></el-col>
        </el-row>     
        <el-button type="primary" size ="medium" v-on:click="login">登录</el-button>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login: function () {
        var params = new URLSearchParams();
        params.append("username",this.username); 
        params.append("password",this.password); 
        this.$axios({
            method: 'post',
            url: this.ServerAddress + 'managerlogin',
            contentType: 'application/x-www-form-urlencoded',
            data:params,  
        }).then(function(response) {
            var result = response.data.code;
						if(result == -1){
							alert("用户不存在!");
						}else if(result== -2){
							alert("密码错误!");
						}else if(result == -3){
							alert("错误次数过多，请15分钟后再试!");						
						}else{
							this.$router.push('/nav/statics'); 
						}
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
    }
  }
  }
</script>

<style>
  .el-row {
    margin-bottom: 10px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
