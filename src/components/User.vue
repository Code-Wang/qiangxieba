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
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          	移除
        </el-button>
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          	查看
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
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