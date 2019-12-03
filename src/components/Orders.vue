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
        <el-input v-model="newOrders.salersmanname" placeholder="销售人员"></el-input>
      </el-form-item>
      <el-form-item label="销售数量*">
        <el-input v-model="newOrders.counts" placeholder="销售数量"></el-input>
      </el-form-item>
      <el-form-item label="销售单价*">
        <el-input v-model="newOrders.price" placeholder="销售单价"></el-input>
      </el-form-item>
       <el-form-item label="销售总价*">
        <el-input v-model="newOrders.totalprice" placeholder="销售总价"></el-input>
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
          id:0,
          salersmanname:'',
          counts:'',
          price:0,
          totalprice:0,
          customername:'',
          customertelphone:'',
          customeraddress:'',
          date:'',
        },
      }
    },

    methods:{
      AddNewOrders: function() {
      this.resetdata()
      this.dialogVisible = true
    },
    resetdata: function() {
        this.newOrders.id = 0
        this.newOrders.salersmanname = ''
        this.newOrders.counts = ''
        this.newOrders.price = 0
        this.newOrders.totalprice = 0
        this.newOrders.customername = ''
        this.newOrders.customertelphone = ''
        this.newOrders.customeraddress = ''
        this.newOrders.date = ''
    },
    }
  }

  </script>