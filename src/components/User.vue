<template>
<div>
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="username"
      label="登录名"
      width="120">
    </el-table-column>
     <el-table-column
      prop="truename"
      label="真实姓名"
      width="120">
    </el-table-column>   
    <el-table-column
      prop="password"
      label="密码"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="editUser(scope.$index, tableData)"
          type="text"
          size="small">
          	编辑
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="AddNewUser">新增用户</el-button>
  </div>

  <el-dialog title="新增用户" 
    :visible.sync="dialogVisible">
    <el-form :model="newUser" class="add-user" label-width="80px">
      <el-form-item label="用户名称*">
        <el-input v-model="newUser.username" placeholder="用户名称"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名*">
        <el-input v-model="newUser.truename" placeholder="真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码*">
        <el-input v-model="newUser.password" placeholder="密码"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="sendAddUserMsg">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        pageIndex: 0,
        pangeCount: 10,
        dialogVisible: false,
        newUser:{
          id:0,
          username:'',
          truename:'',
          password:'',
        },
        xxx:"用户名"
      }
    },

    mounted: function() {
        var params = new URLSearchParams();
        params.append("index",this.pageIndex); 
        params.append("count",this.pangeCount);
        this.$axios({
            method: 'post',
            url: this.ServerAddress + 'getuserinfo',
            contentType: 'application/x-www-form-urlencoded',
            data:params,  
        }).then(function(response) {
            var result = response.data;
            this.tableData = result
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
    },

    methods: {
    sendAddUserMsg: function() {
      if (this.newUser.username == '' ||
          this.newUser.truename == '' ||
          this.newUser.password == '' ){
        alert("请填写所有的必填项")
        return
      }

      var params = new URLSearchParams();
      params.append("id", this.newUser.id); 
      params.append("username", this.newUser.username); 
      params.append("truename", this.newUser.truename);
      params.append("password", this.newUser.password);

      this.$axios({
          method: 'post',
          url: this.ServerAddress + 'updateuser',
          contentType: 'application/x-www-form-urlencoded',
          data:params,  
      }).then(function(response) {
          this.dialogVisible = false
          alert(response.data.desc)
          }.bind(this)).catch(function (error) { 
              console.log(error);
          })      
    },

    sendAddUserMsgxxx: function() {
      var params = new URLSearchParams();
      params.append("id",0); 
      params.append("webset", "adidas");
      params.append("account","123"); 
      params.append("password","testpassword");
      params.append("accountname","ceshi_account"); 
      params.append("telphone","17764987932");
      params.append("address","拓东体育馆"); 
      params.append("paytype","wechat");
      params.append("payaccount","wechat_test"); 
      params.append("defaultsize",42);

      console.log(params)
      console.log(params.getAll('id'))

      this.$axios({
          method: 'post',
          url: this.ServerAddress + 'updateaccount',
          contentType: 'application/x-www-form-urlencoded',
          data:params,  
      }).then(function(response) {
          alert(response.data.desc)
          }.bind(this)).catch(function (error) { 
              console.log(error);
          })      
    },

    AddNewUser: function() {
      this.dialogVisible = true
    }    
  }
}
</script>