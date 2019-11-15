<template>
<div class="container">
    <div id="main1" class="box" ref='account'></div>
    <div id="main2" class="box" ref='orders'></div>
    <div id="main3" class="box" ref='login'></div>
</div>
</template>
<script>
export default {
    name: "",
    components: {},
    mounted() {
        this.initChart();
    },
    data() {
        return {};
    },
    mounted: function() {
        let myChart1 = this.$echarts.init(this.$refs.account);
        let myChart2 = this.$echarts.init(this.$refs.orders);
        let myChart3 = this.$echarts.init(this.$refs.login);

        this.drawCircleChart(myChart1, '账户状态汇总');
        this.drawColumnarChart(myChart2, '订单状态汇总');
        this.drawLineChart(myChart3, '登录情况汇总');
    },
    methods: {
        drawCircleChart: function (chart, title) {
            let optiondata = {
                series : [
                    {
                        name: title,
                        type: 'pie',
                        radius: '65%',
                        data:[
                            {value:235, name:'视频广告'},
                            {value:274, name:'联盟广告'},
                            {value:310, name:'邮件营销'},
                            {value:335, name:'直接访问'},
                            {value:400, name:'搜索引擎'}
                        ]
                    }
                ]
            }
            chart.setOption(optiondata)
        },

        drawColumnarChart: function (chart, title) {
            let optiondata = {
                title: { text: title },
                tooltip: {},
                xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [
                    {
                    name: "销量",
                    type: "bar",
                    data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            };
            chart.setOption(optiondata)
        },

        drawLineChart: function (chart, title) {
            var XData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
            var YData = [10, 23, 65, 36, 85, 43, 60];
            let optiondata = {
            /* 线条颜色，可设置多个颜色 */
            color: ['#ffa82f'],
            /* 图像四周边距设置 */
            grid:{
                left:30,
                top:30,
                right:20,
                bottom:30
            },
            /* 图例说明 */
            legend: {
                // 图例排项 vertical-"竖向"; horizontal-"横向"
                    orient: 'horizontal', 
                  // 图例组件离容器左侧的距离
                    right : 60,
                top: 0,
                //图例文字的样式
                textStyle:{
                	color:'#6ab2ec',
                },
                    // 与series中每个name一一对应
                    data:['人流量']
             },
            /* 鼠标悬浮时显示数据 */
            tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: XData,
                    //设置轴线的属性
                    axisLine:{
                        lineStyle:{
                            color:'#6ab2ec',
                        }
                     },
                     //调整x轴的lable
                     axisLabel:{   
                        textStyle:{
                        fontSize:10 // 让字体变小
                        }
                    } 
                },
                yAxis: {
                    type: 'value',
                    // 控制网格线是否显示
                    splitLine: {
                        show: true, 
                         //  改变轴线颜色
                      lineStyle: {
                            // 使用深浅的间隔色
                             color: ['#132a6e']
                         }                            
                  },
                    //设置轴线的属性
                 axisLine:{
                        lineStyle:{
                            color:'#6ab2ec',
                         }
                    } 
                },
                /* 数据配置，若有多条折线则在数组中追加{name: , data: } */
                series: [{
                    name:'人流量',
                    data: YData,
                    type: 'line',
                    symbol: 'circle',
                    // 设置折点大小
                    symbolSize: 10,
                    // 设置为光滑曲线
                    smooth: true
                },]
            };
            chart.setOption(optiondata)
        },        
    }
};
</script>
<style scoped>
    .container {
    position: relative;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-around;
    }
    .box {
    width: 500px;
    height: 500px;
    border: 2px solid #000;
    }
</style>