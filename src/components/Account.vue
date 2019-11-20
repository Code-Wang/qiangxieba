<template>
<div >
  <el-button @click='AddShow()'>添加一条</el-button>
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="webset"
      label="网站"
      width="120">
         <template slot-scope="scope"><!--添加框-->
           <el-input v-if="scope.row.status" v-model="scope.row.webset"></el-input>
           <span v-else>{{scope.row.webset}}</span>
         </template>
    </el-table-column>
    <el-table-column
      prop="account"
      label="账号"
      width="120">
         <template slot-scope="scope"><!--添加框-->
           <el-input v-if="scope.row.status" v-model="scope.row.account"></el-input>
           <span v-else>{{scope.row.account}}</span>
         </template>
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
      width="120">
         <template slot-scope="scope"><!--添加框-->
           <el-input v-if="scope.row.status" v-model="scope.row.password"></el-input>
           <span v-else>{{scope.row.password}}</span>
         </template>      
    </el-table-column>
    <el-table-column
      prop="accountname"
      label="收货人"
      show-overflow-tooltip>
         <template slot-scope="scope"><!--添加框-->
           <el-input v-if="scope.row.status" v-model="scope.row.accountname"></el-input>
           <span v-else>{{scope.row.accountname}}</span>
         </template>
    </el-table-column>
    <el-table-column
      prop="telphone"
      label="联系电话"
      show-overflow-tooltip>
         <template slot-scope="scope"><!--添加框-->
           <el-input v-if="scope.row.status" v-model="scope.row.telphone"></el-input>
           <span v-else>{{scope.row.telphone}}</span>
         </template>      
    </el-table-column>  
    <el-table-column
      prop="address"
      label="收货地址"
      show-overflow-tooltip>
       <template slot-scope="scope">
        <el-select  v-if="scope.row.status" v-model="scope.row.address" placeholder="请选择">
        <el-option
        v-for="item in CityList"
        :key="item"
        :label="item"
        :value="item">
        </el-option>
        </el-select>
        <span v-else>{{scope.row.address}}</span>
       </template>
    </el-table-column>
    <el-table-column
      prop="paytype"
      label="付款方式"
      show-overflow-tooltip>
         <template slot-scope="scope"><!--添加框-->
           <el-input v-if="scope.row.status" v-model="scope.row.paytype"></el-input>
           <span v-else>{{scope.row.paytype}}</span>
         </template>      
    </el-table-column>
    <el-table-column
      prop="payaccount"
      label="付款账号"
      show-overflow-tooltip>
         <template slot-scope="scope"><!--添加框-->
           <el-input v-if="scope.row.status" v-model="scope.row.payaccount"></el-input>
           <span v-else>{{scope.row.payaccount}}</span>
         </template>      
    </el-table-column>
    <el-table-column
      prop="defaultsize"
      label="购买尺码"
      show-overflow-tooltip>
         <template slot-scope="scope"><!--添加框-->
           <el-input v-if="scope.row.status" v-model="scope.row.defaultsize"></el-input>
           <span v-else>{{scope.row.defaultsize}}</span>
         </template>      
    </el-table-column>      
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button type="text" @click='EditShow(scope.row)'>编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
<!--点击添加的弹框-->
  <el-dialog title="添加信息" :visible.sync="dialogFormVisible">
    <el-form :model="form">
    <el-form-item label="网站">
      <el-input v-model="form.webset" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="账号">
      <el-input v-model="form.account" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="收货人">
      <el-input v-model="form.accountname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="form.telphone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="地址">
      <el-select v-model="form.address" placeholder="请选择收货地址">
        <el-option label="茨坝" value="茨坝"></el-option>
        <el-option label="山水润城" value="山水润城"></el-option>
        <el-option label="金安小区" value="金安小区"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="付款方式">
      <el-input v-model="form.paytype" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="付款账号">
      <el-input v-model="form.payaccount" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="购买尺码">
      <el-input v-model="form.defaultsize" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click='AccountAdd()'>确 定</el-button>
          </div>
  </el-dialog>
  <!--点击编辑的弹框：https://blog.csdn.net/HH18700418030/article/details/98969370
  https://segmentfault.com/q/1010000010176928-->
  <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
    <el-form :model="form">
    <el-form-item label="网站">
      <el-input v-model="form.webset" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="账号">
      <el-input v-model="form.account" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="收货人">
      <el-input v-model="form.accountname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="form.telphone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="地址">
      <el-select v-model="form.address" placeholder="请选择收货地址">
        <el-option label="茨坝" value="茨坝"></el-option>
        <el-option label="山水润城" value="山水润城"></el-option>
        <el-option label="金安小区" value="金安小区"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="付款方式">
      <el-input v-model="form.paytype" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="付款账号">
      <el-input v-model="form.payaccount" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="购买尺码">
      <el-input v-model="form.defaultsize" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click='AccountEdit()'>确 定</el-button>
          </div>
  </el-dialog>
 <!-- <div style="margin-top: 20px">
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>-->
</div>
</template>

<script>
//var AccountUpdate={webset:'',account:'',password:'',accountname:'',telphone:'',address:'',paytype:'',payaccount:'',defaultsize:''};

  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        pageIndex: 0,
        pangeCount: 10,
        CityList:['茨坝','山水润城','金安小区'],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form:{
          id: 0,
          webset:'',
          account:'',
          password:'',
          accountname:'',
          telphone:'',
          address:'',
          paytype:'',
          payaccount:'',
          defaultsize:''          
        }
      }
    },

    mounted: function() {
        var params = new URLSearchParams();
        params.append("index",this.pageIndex); 
        params.append("count",this.pangeCount);
        this.$axios({
            method: 'post',
            url: this.ServerAddress + 'getaccountinfo',
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
      AddShow: function(){
        this.dialogFormVisible = true;
      },
      EditShow: function(row){       
        this.form=row;
        this.dialogFormVisible = true;
      },
      AccountAdd: function() {
        var params = new URLSearchParams();
        params.append("id", 0);
        params.append("webset", this.form.webset);
        params.append("account",this.form.account); 
        params.append("password",this.form.password);
        params.append("accountname",this.form.accountname); 
        params.append("telphone",this.form.telphone);
        params.append("address",this.form.address); 
        params.append("paytype",this.form.paytype);
        params.append("payaccount",this.form.payaccount); 
        params.append("defaultsize",this.form.defaultsize);

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
      AccountEdit: function() {
        var params = new URLSearchParams();
        params.append("id",this.form.id); 
        params.append("webset", this.form.webset);
        params.append("account",this.form.account); 
        params.append("password",this.form.password);
        params.append("accountname",this.form.accountname); 
        params.append("telphone",this.form.telphone);
        params.append("address",this.form.address); 
        params.append("paytype",this.form.paytype);
        params.append("payaccount",this.form.payaccount); 
        params.append("defaultsize",this.form.defaultsize);

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
      AccountDelete: function() {
        var params = new URLSearchParams();
        params.append("id",this.form.id); 

        this.$axios({
            method: 'post',
            url: this.ServerAddress + 'delaccount',
            contentType: 'application/x-www-form-urlencoded',
            data:params,  
        }).then(function(response) {
            alert(response.data.desc)
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })      
      },
      add(){//添加函数
        this.tableData.map(item=>{
          if(item.status){
            item.status=0;
          }
          return item;
        })
        this.tableData.push({
          webset:'',
          account:'',
          password:'',
          accountname:'',
          telphone:'',
          address:'',
          paytype:'',
          payaccount:'',
          defaultsize:'',
          status: 1
        })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>