<template>
<div>
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
    </el-table-column>
    <el-table-column
      prop="account"
      label="账号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
      width="120">
    </el-table-column>
    <el-table-column
      prop="accountname"
      label="收货人"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="telphone"
      label="联系电话"
      show-overflow-tooltip>
    </el-table-column>  
    <el-table-column
      prop="address"
      label="收货地址"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="paytype"
      label="付款方式"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="payaccount"
      label="付款账号"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="defaultsize"
      label="购买尺码"
      show-overflow-tooltip>
    </el-table-column>      
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          	编辑
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        pageIndex: 0,
        pangeCount: 10
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