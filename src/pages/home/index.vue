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
    <div>
      <div id="myChart" :style="{width: '1500px', height: '400px'}"></div>
    </div>
  </div>
</template>

<script>
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
  },
  methods: {
    onReady(instance, CountUp) {
      // const that = this;
      // instance.update(that.endVal + 100);
    },
    //初始化折线图
    initEchart() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));

      myChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
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
