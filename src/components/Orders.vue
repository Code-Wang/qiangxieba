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
      prop="salesmanname"
      label="销售人员"
      width="120">
    </el-table-column>
    <el-table-column
      prop="saleitemname"
      label="销售物品"
      width="120">
    </el-table-column>    
    <el-table-column
      prop="salesprice"
      label="销售单价"
      width="120">
    </el-table-column>
     <el-table-column
      prop="counts"
      label="销售数量"
      width="120">
    </el-table-column>
    <el-table-column
      prop="salestotalprice"
      label="销售总价"
      width="120">
    </el-table-column>
    <el-table-column
      prop="customername"
      label="顾客姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="customertelphone"
      label="顾客电话号码"
      width="180">
    </el-table-column>
    <el-table-column
      prop="date"
      label="销售日期"
      width="120">
    </el-table-column>
    <el-table-column
      prop="customeraddress"
      label="顾客地址"
      show-overflow-tooltip>
    </el-table-column> 
  </el-table>
  <div style="margin-top: 20px">
    <el-row>
      <el-col :offset="8"  :span="4">
        <el-button type='primary' @click='AddNewOrders()'>记一笔</el-button>
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

  <el-dialog title="新增订单"
    :visible.sync="dialogVisible">
    <el-form :model="newOrders" class="add-orders" label-width="80px">
      <el-form-item label="销售人员*">
        <el-select v-model="newOrders.salersmanname" placeholder="销售人员">
          <el-option
            v-for="user in userlist"
            :key="user.username"
            :label="user.username"
            :value="user.username">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="销售物品*">
        <el-select v-model="newOrders.itemid" placeholder="销售物品" @change="currentSel">
          <el-option
            v-for="item in itemlist"
            :key="item.itemid"
            :label="item.itemname"
            :value="item.itemid">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="销售数量*">
        <el-input v-model="newOrders.counts" placeholder="销售数量" @change="changeSaleCounts"></el-input>
      </el-form-item>
      <el-form-item label="销售单价*">
        <el-input v-model="newOrders.price" placeholder="销售单价 " @change="calcTotalPrice"></el-input>
      </el-form-item>
       <el-form-item label="销售总价*">
        <el-input v-model="newOrders.totalprice" placeholder="销售总价" disabled></el-input>
      </el-form-item>
      <el-form-item label="顾客姓名*">
        <el-input v-model="newOrders.customername" placeholder="顾客姓名"></el-input>
      </el-form-item>
      <el-form-item label="顾客电话号码" label-width="100px">
        <el-input v-model="newOrders.customertelphone" placeholder="顾客电话号码"></el-input>
      </el-form-item>
     <el-form-item label="顾客地址">
        <el-input v-model="newOrders.customeraddress" placeholder="顾客地址"></el-input>
      </el-form-item>      
      <el-form-item label="销售日期*">
        <el-input v-model="newOrders.date" placeholder="销售日期"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="sendAddOrdersMsg">确 定</el-button>
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
        newOrders:{
          salersmanname:'',
          itemid:'',
          itemname:'',
          counts:'',
          price:0,
          totalprice:0,
          customername:'',
          customertelphone:'',
          customeraddress:'',
          date:'',
        },
        userlist: [],
        itemlist: [],
        maxsalecount:0,
      }
    },

    mounted (){
      this.getItemList()
      this.GetUserList()
    },

    methods:{
      AddNewOrders: function() {
      this.resetdata()
      this.dialogVisible = true
    },
      resetdata: function() {
          this.newOrders.salersmanname = ''
          this.newOrders.itemid = ''
          this.newOrders.itemname = ''
          this.newOrders.counts = ''
          this.newOrders.price = 0
          this.newOrders.totalprice = 0
          this.newOrders.customername = ''
          this.newOrders.customertelphone = ''
          this.newOrders.customeraddress = ''
          this.newOrders.date = ''
      },

      ChangePage: function(pageIndex){
        this.pageIndex = pageIndex
        this.GetOrdersInfo()
      },

      checkparams: function(){
          if(this.newOrders.salersmanname == '' ||
             this.newOrders.itemid == '' ||
             this.newOrders.itemname == ''  ||
             this.newOrders.counts == '' ||
             this.newOrders.price == 0 ||
             this.newOrders.totalprice == 0 ||
             this.newOrders.customername == ''){
               return false
             }
             return true
      },

      sendAddOrdersMsg: function(){
        if(!this.checkparams()){
          alert("请检查是否有必填项未填写！")
          return
        }

        var params = new URLSearchParams();
        params.append("operate", "sell");
        params.append("salersmanname",this.newOrders.salersmanname);
        params.append("itemid",this.newOrders.itemid);
        params.append("itemname",this.newOrders.itemname);
        params.append("counts",this.newOrders.counts);
        params.append("price",this.newOrders.price);
        params.append("totalprice",this.newOrders.totalprice);
        params.append("customername",this.newOrders.customername);
        params.append("customertelphone",this.newOrders.customertelphone);
        params.append("customeraddress",this.newOrders.customeraddress);
        params.append("date",this.newOrders.date);
        this.$axios({
            method: 'post',
            url: this.ServerAddress + 'updatestocks',
            contentType: 'application/x-www-form-urlencoded',
            data:params,  
        }).then(function(response) {
            var result = response.data;
            this.tableData = result
            this.dialogVisible = false
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
      },

      GetOrdersInfo: function(){

      },

      currentSel: function(selVal){
        for(let j = 0,len=this.itemlist.length; j < len; j++) {
          if(this.itemlist[j] != null && this.itemlist[j].itemid == selVal){
            this.newOrders.itemid = selVal
            this.newOrders.itemname = this.itemlist[j].itemname
            this.maxsalecount = this.itemlist[j].itemcount
            break
          }
        }
      },

      changeSaleCounts: function(){
        if(this.newOrders.itemid == '') {
          alert("先选择销售的商品")
          return
        }

        if(this.newOrders.counts > this.maxsalecount){
          this.newOrders.counts = this.maxsalecount 
          alert("超过最大库存，库存只有" + this.maxsalecount)
        }
        this.calcTotalPrice()
      },

      calcTotalPrice: function(){
        this.newOrders.totalprice = parseFloat(parseInt(this.newOrders.counts) * this.newOrders.price).toFixed(4)
      },

      getItemList: function (){
        this.$axios({
            method: 'get',
            url: this.ServerAddress + 'getitemlist',
            contentType: 'application/x-www-form-urlencoded',
            data:'',  
        }).then(function(response) {
            var result= response.data;
            this.itemlist = result
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
      },

      GetUserList: function(){
        this.$axios({
            method: 'get',
            url: this.ServerAddress + 'getuserinfo?index=userlist',
            contentType: 'application/x-www-form-urlencoded',
            data:'',
        }).then(function(response) {
            this.userlist = response.data;
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
    }
  }

  </script>