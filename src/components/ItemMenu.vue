<template>
    <div>
        <el-row>
        <el-col :span="6" v-for="(Menu, index) in MenuList" :key="index" :offset="index > 0 ? 3 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <div style="height: 480px">
                <img :src="Menu.menuimage" class="image">
              </div>
            <div style="padding: 14px;">
                <el-button type="text" style="font-size: 30px" @click=routetoPage(Menu.menuurl)>{{Menu.menuname}}</el-button>
                <div class="bottom clearfix">
                </div>
            </div>
            </el-card>
        </el-col>
        </el-row>
    </div>
</template>

<style scoped>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    margin-top:100px;
    width: 70%;
    display: center;
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
      MenuList :[{
        menuimage: require("@/assets/itemmanage.png"),
        menuname: "商品管理",
        menuurl: "/nav/itemmanage"
      },
      {
        menuimage: require("@/assets/stockmanage.png"),
        menuname: "库存管理",
        menuurl: "/nav/stocksmanage"
      },
      {
        menuimage: require("@/assets/stocks.png"),
        menuname: "库存查看",
        menuurl: "/nav/stocks"
      },],
    };
  },

  mounted() {
  },


  methods: {
    routetoPage: function(URL){
      console.log(URL)
      this.$router.push(URL)
    },
  },
}
</script>
