<template>
<div>
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%">
    <el-table-column
      prop="buyername"
      label="进货人员"
      width="120">
    </el-table-column>
    <el-table-column
      prop="itemname"
      label="购买物品"
      width="120">
    </el-table-column>    
    <el-table-column
      prop="price"
      label="进货单价"
      width="120">
    </el-table-column>
     <el-table-column
      prop="counts"
      label="进货数量"
      width="120">
    </el-table-column>
    <el-table-column
      prop="totalprice"
      label="进货总价"
      width="120">
    </el-table-column>
    <el-table-column
      prop="inboundchannel"
      label="进货渠道"
      width="120">
    </el-table-column>
    <el-table-column
      prop="date"
      label="进货日期"
      width="120">
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-row>
      <el-col :offset="8"  :span="4">
        <el-button type='primary' @click='AddNewStocks()'>记一笔</el-button>
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

  <el-dialog title="新增进货信息"
    :visible.sync="dialogVisible">
    <el-form :model="newStock" class="add-stocks" label-width="80px">
      <el-form-item label="进货人员*">
        <el-select v-model="newStock.buyername" placeholder="进货人员">
          <el-option
            v-for="user in userlist"
            :key="user.username"
            :label="user.username"
            :value="user.username">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="购买物品*">
        <el-select v-model="newStock.itemid" placeholder="购买物品" @change="currentSel">
          <el-option
            v-for="item in itemlist"
            :key="item.itemid"
            :label="item.itemname"
            :value="item.itemid">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="进货数量*">
        <el-input v-model="newStock.counts" placeholder="进货数量" @change="changeSaleCounts"></el-input>
      </el-form-item>
      <el-form-item label="进货单价*">
        <el-input v-model="newStock.price" placeholder="进货单价 " @change="calcTotalPrice"></el-input>
      </el-form-item>
       <el-form-item label="进货总价*">
        <el-input v-model="newStock.totalprice" placeholder="进货总价" disabled></el-input>
      </el-form-item>
      <el-form-item label="进货渠道*">
        <el-input v-model="newStock.inboundchannel" placeholder="进货渠道"></el-input>
      </el-form-item>  
      <el-form-item label="进货日期*">
        <el-date-picker v-model="newStock.date" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="进货日期"></el-date-picker>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="sendAddStocksMsg">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return { 
        pageIndex: 1,
        pageCount: 10,
        totalCount: 0,
        dialogVisible: false,
        currentDate: new Date(),
        stocksdata :[],
        salersmanlist :[],
        userlist: [],
        itemlist: [],
        newStock:{
            buyername:'',
            itemid:'',
            itemname:'',
            counts:'',
            price:0,
            totalprice:0,
            inboundchannel:'',
            date:'',
      },
    };
  },

  mounted() {
    //this.GetAllStocks();
    this.getItemList()
    this.GetUserList()
    this.GetStocksCounts()
  },


  methods: {
    GetAllStocks: function(){
      this.$axios({
          method: 'post',
          url: this.ServerAddress + 'getstocksinfo',
          contentType: 'application/x-www-form-urlencoded',
          data:'',  
      }).then(function(response) {
          var result= response.data;
          this.stocksdata = result
          }.bind(this)).catch(function (error) { 
              console.log(error);
          })
    },

    sendAddStocksMsg: function(){

    },

    AddNewStocks: function(){
      this.resetdata()
      this.dialogVisible = true
    },

    resetdata: function() {
        this.newStock.buyername = ''
        this.newStock.itemid = ''
        this.newStock.itemname = ''
        this.newStock.counts = ''
        this.newStock.price = 0
        this.newStock.totalprice = 0
        this.newStock.inboundchannel = ''
        this.newStock.date = ''
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

    GetStocksCounts: function(){

    },
    
  },
}
</script>
