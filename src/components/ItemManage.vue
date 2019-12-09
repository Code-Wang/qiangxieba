<template>
    <div>
        <el-row>
        <el-col :span="3" v-for="(item, index) in ItemList" :key="index" :offset="index > 0 ? 1 : 0">
            <el-card :body-style="{ padding: '0px' }">
            <img :src="item.itemimage" class="image" style="height: 100px">
            <div style="padding: 4px;">
                <span>{{item.itemname}}</span>
                </div>
            </el-card>
        </el-col>
        </el-row>
    </div>
</template>

<style scoped>
  .bottom {
    margin-top: 10px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    margin-top: 10px;
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
      ItemList :[],
      addItem :{
        itemimage: require("@/assets/additem.png"),
        itemname: "添加商品",
      }
    };
  },

  mounted() {
    this.GetStocksInfo();
  },

  methods: {
    GetStocksInfo: function(){
      this.$axios({
          method: 'post',
          url: this.ServerAddress + 'getstocksinfo',
          contentType: 'application/x-www-form-urlencoded',
          data:'',  
      }).then(function(response) {
          var result= response.data;
          this.ItemList = result
          this.ItemList.push(this.addItem)
          }.bind(this)).catch(function (error) { 
              console.log(error);
          })
    },
  },
}
</script>
