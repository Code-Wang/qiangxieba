<template>
<div >
  <!--搜索栏-->
<el-collapse>
  <el-collapse-item >
        <template slot="title" >
            <font color="#409EFFj " align="center" size="+2">查询</font>
        </template>
<el-col :span="24" class="toolbar">
          <el-form :inline="true" :model="filters" :label-position="left">
            <el-form-item>
              <el-input v-model="form.webset" placeholder="网站" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.account" placeholder="账号" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.accountname" placeholder="收货人" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.telphone" placeholder="联系电话" size="small" ></el-input>
            </el-form-item><br>
            <el-form-item>
              <template>
              <el-select v-model="form.address" placeholder="收货地址" size="small">
                  <el-option label="茨坝" value="茨坝"></el-option>
                  <el-option label="山水润城" value="山水润城"></el-option>
                  <el-option label="金安小区" value="金安小区"></el-option>
              </el-select>
              </template>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.paytype" placeholder="付款方式" size="small" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.payaccount" placeholder="付款账号" size="small" ></el-input>
            </el-form-item>
            <el-form-item :label-position="left">
              <el-input v-model="form.defaultsize" placeholder="购买尺码" size="small" ></el-input>
            </el-form-item><br>
            <el-form-item>
              <el-button type="primary" @click="getUser">搜索</el-button>
            </el-form-item>
          </el-form>
</el-col>
  </el-collapse-item>
</el-collapse>

    <!--<el-col :span="2" >
      <el-input v-model="form.webset" placeholder="网站" size="small"></el-input>
    </el-col>
    <el-col :span="2" >
      <el-input v-model="form.account" placeholder="账号" size="small"></el-input>
    </el-col>
    <el-col :span="2" >
      <el-input v-model="form.accountname" placeholder="收货人" size="small"></el-input>
    </el-col>
    <el-col :span="2" >
      <el-input v-model="form.telphone" placeholder="联系电话" size="small" ></el-input>
    </el-col>
    <el-col :span="2" >
      <el-select v-model="form.address" placeholder="收货地址" size="small">
        <el-option label="茨坝" value="茨坝"></el-option>
        <el-option label="山水润城" value="山水润城"></el-option>
        <el-option label="金安小区" value="金安小区"></el-option>
      </el-select>
    </el-col>
    <el-col :span="2" >
      <el-input v-model="form.paytype" placeholder="付款方式" size="small" ></el-input>
    </el-col>
    <el-col :span="2" >
      <el-input v-model="form.payaccount" placeholder="付款账号" size="small" ></el-input>
    </el-col>  
    <el-col :span="2" >
      <el-input v-model="form.defaultsize" placeholder="购买尺码" size="small" ></el-input>
    </el-col>  
    <el-col :span="2" >
      <el-button type="primary" icon="el-icon-search" @click=''>搜索</el-button>
    </el-col>   -->  

  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
 <!--  <el-table-column
      type="selection"
      width="55">
    </el-table-column>-->
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
<el-popover
  placement="top"
  width="160"
  visible.sync="DeleteVisible">
  <p>确定删除吗？</p>
  <div style="text-align: right; margin: 0">
    <el-button size="mini" type="text" @click='closedeleteform()'>取消</el-button>
    <el-button type="primary" size="mini" @click='AccountDelete(scope.row.id)'>确定</el-button>
  </div>
  <el-button slot="reference" type="text" @click='opendeleteform()'>删除</el-button>
</el-popover>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-row>
      <el-col :offset="8"  :span="4">
        <el-button type='primary' @click='AddShow()'>添加账号</el-button>
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
<!--点击添加的弹框-->
  <el-dialog title="添加信息" :visible.sync="dialogAddAcountVisible">
    <el-form :model="newaccount" label-width="80px">
    <el-form-item label="网站">
      <el-input v-model="newaccount.webset" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="账号">
      <el-input v-model="newaccount.account" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="newaccount.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="收货人">
      <el-input v-model="newaccount.accountname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="newaccount.telphone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="地址">
      <el-select v-model="newaccount.address" placeholder="请选择收货地址">
        <el-option label="茨坝" value="茨坝"></el-option>
        <el-option label="山水润城" value="山水润城"></el-option>
        <el-option label="金安小区" value="金安小区"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="付款方式">
      <el-input v-model="newaccount.paytype" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="付款账号">
      <el-input v-model="newaccount.payaccount" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="购买尺码">
      <el-input v-model="newaccount.defaultsize" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddAcountVisible = false">取 消</el-button>
                <el-button type="primary" @click='AccountAdd()'>确 定</el-button>
          </div>
  </el-dialog>
  <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
    <el-form :model="form" label-width="80px">
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
</div>
</template>

<script>
  export default {
    data() {
      return {
        DeleteVisible: false,
        tableData: [],
        multipleSelection: [],
        pageIndex: 1,
        pageCount: 10,
        totalCount: 0,
        CityList:['茨坝','山水润城','金安小区'],
        dialogFormVisible: false,
        dialogAddAcountVisible: false,
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
        },
        newaccount:{
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

    mounted(){
      this.GetAccountInfo();
      this.GetAccountCounts();
    },
    methods: {
      AddShow: function(){
        this.resetData()
        this.dialogAddAcountVisible = true;
      },
      EditShow: function(row){       
        this.form=row;
        this.dialogFormVisible = true;
      },
      AccountAdd: function() {
        var params = new URLSearchParams();
        params.append("id", this.newaccount.id);
        params.append("webset", this.newaccount.webset);
        params.append("account",this.newaccount.account); 
        params.append("password",this.newaccount.password);
        params.append("accountname",this.newaccount.accountname); 
        params.append("telphone",this.newaccount.telphone);
        params.append("address",this.newaccount.address); 
        params.append("paytype",this.newaccount.paytype);
        params.append("payaccount",this.newaccount.payaccount); 
        params.append("defaultsize",this.newaccount.defaultsize);

      this.$axios({
          method: 'post',
          url: this.ServerAddress + 'updateaccount',
          contentType: 'application/x-www-form-urlencoded',
          data:params,  
      }).then(function(response) {
          this.dialogAddAcountVisible = false
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
            this.dialogFormVisible = false
            alert(response.data.desc)
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })      
      },
      AccountDelete: function(Id) {
        this.DeleteVisible = false
        var params = new URLSearchParams();
        params.append("id", Id);

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
      GetAccountInfo: function(){
        var params = new URLSearchParams();
        params.append("index",(this.pageIndex - 1)); 
        params.append("count",this.pageCount);
        this.$axios({
            method: 'post',
            url: this.ServerAddress + 'getaccountinfo',
            contentType: 'application/x-www-form-urlencoded',
            data:params,  
        }).then(function(response) {
            this.tableData = response.data;
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
      },
      GetAccountCounts: function() {
        this.$axios({
            method: 'get',
            url: this.ServerAddress + 'getaccountinfo',
            contentType: 'application/x-www-form-urlencoded',
            data:'',  
        }).then(function(response) {
            this.totalCount = parseInt(response.data.Count);
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })      
      },
      ChangePage: function(pageIndex){
        this.pageIndex = pageIndex
        this.GetAccountInfo()
      },
      opendeleteform: function() {
        this.DeleteVisible = true
      },
      closedeleteform: function() {
        this.DeleteVisible = false
      },
      resetData: function() {
        this.newaccount.id = 0
        this.newaccount.webset = ''
        this.newaccount.account = ''
        this.newaccount.password = ''
        this.newaccount.accountname = ''
        this.newaccount.telphone = ''
        this.newaccount.address = ''
        this.newaccount.paytype = ''
        this.newaccount.payaccount = ''
        this.newaccount.defaultsize = ''
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