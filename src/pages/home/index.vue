<template>
  <div class="container">
    <div class="count-up">
      <div class="count-item">
        <img src="../../static/imgs/yh.png" alt />

        <div class="up-count">
          <div class="count-num">
            <ICountUp :delay="startPeo" :endVal="endPeo" :options="options" @ready="onReady" />人
          </div>

          <div>平台总用户</div>
        </div>
      </div>
      <div class="count-item">
        <img src="../../static/imgs/xzyy.png" alt />

        <div class="up-count">
          <div class="count-num">
            <ICountUp :delay="startPeo" :endVal="endPeo" :options="options" @ready="onReady" />人
          </div>

          <div>今日增长用户</div>
        </div>
      </div>
      <div class="count-item">
        <img src="../../static/imgs/zdd.png" alt />

        <div class="up-count">
          <div class="count-num">
            <ICountUp :delay="startPeo" :endVal="endPeo" :options="options" @ready="onReady" />单
          </div>

          <div>平台总订单</div>
        </div>
      </div>
      <div class="count-item">
        <img src="../../static/imgs/dd.png" alt />

        <div class="up-count">
          <div class="count-num">
            <ICountUp :delay="startPeo" :endVal="endPeo" :options="options" @ready="onReady" />单
          </div>

          <div>今日订单</div>
        </div>
      </div>
    </div>
    <div style="margin-top:50px;">
      <div id="myChart" :style="{width: '1500px', height: '600px'}"></div>
    </div>
  </div>
</template>

<script>
import {getUserApi} from './api.js'
import ICountUp from "vue-countup-v2";
export default {
  components: {
    ICountUp
  },
  data() {
    return {
      startPeo: 0,
      endPeo: 120,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        prefix: "",
        suffix: ""
      }
    };
  },
  mounted() {
    this.initEchart();
    this.getUser()
  },
  methods: {
    getUser(){
      getUserApi().then(res=>{
        console.log(res,'resssssss')
      })
    },
    onReady(instance, CountUp) {
      // const that = this;
      // instance.update(that.endVal + 100);
    },
    //初始化折线图
    initEchart() {
      let that = this;
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let data = [];
      let data1 = [];

      let nowDate = new Date().getTime();

      let oneDay = 24 * 3600 * 1000;
      let base = new Date().getTime() - 180 * oneDay;
      let num = (nowDate - base) / oneDay;
      let valueBase = Math.random() * 300;
      let valueBase1 = Math.random() * 300;
      for (var i = 1; i < num; i++) {
        var now = new Date((base += oneDay));
        var dayStr = [
          now.getFullYear(),
          now.getMonth() + 1,
          now.getDate()
        ].join("-");

        valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase);
        valueBase <= 0 && (valueBase = Math.random() * 300);
        data.push([dayStr, valueBase]);
        valueBase1 = Math.round((Math.random() - 0.5) * 20 + valueBase1);
        valueBase1 <= 0 && (valueBase1 = Math.random() * 100);
        data1.push([dayStr, valueBase1]);
      }
      console.log(data);
      myChart.setOption({
        title: {
          text: "每日统计图",
          left: "center",
          align: "right"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          data: data.map(function(item) {
            return item[0];
          })
        },
        yAxis: {
          splitLine: {
            show: true
          }
        },
        series: [
          {
            showSymbol: false,
            name: "平台每日增加人数",
            data: data.map(function(item) {
              return item[1];
            }),
            type: "line",
            markLine: {
              symbol: "none",

              /*symbol:"none",               //去掉警戒线最后面的箭头
                           label:{
                               position:"end"   ,       //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                           },*/
              data: [
                {
                  silent: false, //鼠标悬停事件  true没有，false有
                  lineStyle: {
                    //警戒线的样式  ，虚实  颜色
                    type: "solid",
                    color: "#3398DB"
                  },
                  label: {
                    position: "end",
                    formatter: "及格(150)"
                  },
                  yAxis: 150 // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                },
                {
                  silent: false, //鼠标悬停事件  true没有，false有
                  lineStyle: {
                    //警戒线的样式  ，虚实  颜色
                    type: "solid",
                    color: "#FA3934"
                  },
                  label: {
                    position: "end",
                    formatter: "优秀(350)",
                    fontSize: "8"
                  },
                  yAxis: 350 // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                }
              ]
            }
          },
          {
            showSymbol: false,
            name: "平台每日增加订单",
            data: data1.map(function(item) {
              return item[1];
            }),
            type: "line"
          }
        ],
        dataZoom: [
          {
            startValue: "2014-06-01"
          },
          {
            type: "inside"
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss">
@import "./index.scss";
</style>
