<template>
    <div>
        <el-row>
        <el-col :span="8" v-for="(item, index) in stocksdata" :key="item" :offset="index > 0 ? 1 : 0">
            <el-card :body-style="{ padding: '0px' }">
            <img :src="item.itemimage" class="image" style="height: 300px">
            <div style="padding: 14px;">
                <span>{{item.itemname}}</span>
                <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">库存: {{item.itemcount}}</el-button>
                </div>
            </div>
            </el-card>
        </el-col>
        </el-row>
    </div>
</template>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      stocksdata :[],
    };
  },

  mounted() {
    this.GetStocksInfo();
  },


  methods: {
    GetStocksInfo: function(){
        var params = new URLSearchParams();
        this.$axios({
            method: 'post',
            url: this.ServerAddress + 'getstocksinfo',
            contentType: 'application/x-www-form-urlencoded',
            data:params,  
        }).then(function(response) {
            var result = response.data;
            this.stocksdata = result
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
    },

  },
}
</script>
