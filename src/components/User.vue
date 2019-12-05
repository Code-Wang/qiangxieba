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
          @click="editUserForm(scope.row)"
          type="text">
          	编辑
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-row>
      <el-col :offset="8"  :span="4">
        <el-button type='primary' @click='AddNewUser()'>新增用户</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          :page-size="pageCount"
          :current-page.sync="pageIndex"
          @current-change="ChangePage">
        </el-pagination>
      </el-col>
    </el-row>
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
  <el-dialog title="编辑用户" 
    :visible.sync="editDialogVisible">
    <el-form :model="editUser" class="add-user" label-width="80px">
      <el-form-item label="用户名称*">
        <el-input v-model="editUser.username" placeholder="用户名称"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名*">
        <el-input v-model="editUser.truename" placeholder="真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码*">
        <el-input v-model="editUser.password" placeholder="密码"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="sendEditUserMsg">确 定</el-button>
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
        pageIndex: 1,
        pageCount: 10,
        totalCount: 0,
        dialogVisible: false,
        editDialogVisible: false,
        newUser:{
          id:0,
          username:'',
          truename:'',
          password:'',
        },
        editUser:{
          id:0,
          username:'',
          truename:'',
          password:'',
        },
      }
    },

    mounted() {
      this.GetUserCounts();
      this.GetUserInfo();
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
    sendEditUserMsg: function(){
      if (this.editUser.username == '' ||
          this.editUser.truename == '' ||
          this.editUser.password == '' ){
        alert("请填写所有的必填项")
        return
      }

      var params = new URLSearchParams();
      params.append("id", this.editUser.id); 
      params.append("username", this.editUser.username); 
      params.append("truename", this.editUser.truename);
      params.append("password", this.editUser.password);

      this.$axios({
          method: 'post',
          url: this.ServerAddress + 'updateuser',
          contentType: 'application/x-www-form-urlencoded',
          data:params,  
      }).then(function(response) {
          this.editDialogVisible = false
          alert(response.data.desc)
          }.bind(this)).catch(function (error) { 
              console.log(error);
          })           
    },
    UserDelete: function() {
      var params = new URLSearchParams();
      params.append("id",this.form.id); 
      this.$axios({
        method: 'post',
        url: this.ServerAddress + 'deluser',
        contentType: 'application/x-www-form-urlencoded',
        data:params,  
      }).then(function(response) {
        alert(response.data.desc)
        }.bind(this)).catch(function (error) { 
        console.log(error);
        })      
      },
    editUserForm: function(row){
      this.editUser=row;
      this.editDialogVisible = true;      
    },

    AddNewUser: function() {
      this.resetdata()
      this.dialogVisible = true
    },
    resetdata: function() {
        this.newUser.id = 0
        this.newUser.username = ''
        this.newUser.truename = ''
        this.newUser.password = ''
    },
    GetUserCounts: function(){
        this.$axios({
            method: 'get',
            url: this.ServerAddress + 'getuserinfo?index=usercounts',
            contentType: 'application/x-www-form-urlencoded',
            data:'',
        }).then(function(response) {
            this.totalCount = parseInt(response.data.Count);
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
    },

    GetUserInfo: function(){
        var params = new URLSearchParams();
        params.append("index",(this.pageIndex - 1));
        params.append("count",this.pageCount);
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

    ChangePage: function(pageIndex){
      this.pageIndex = pageIndex
      this.GetUserInfo()
    }
  }
}
</script>