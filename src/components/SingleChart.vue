<template>
  <div class="singlechart mt-4">
    <div class="d-flex justify-content-between mb-3">
      <div class="d-flex">
        <div class="d-flex align-items-center">
          <p class="mr-2">From</p>
          <input type="date" v-model="fromValue" />
        </div>
        <div class="d-flex align-items-center">
          <p class="mx-2">To</p>
          <input type="date" v-model="toValue" />
        </div>
      </div>
      <div class="d-flex">
        <button
          class="chart__day_btn"
          :class="{ active: days === 1 }"
          @click="newFromDate(1)"
        >
          24h
        </button>
        <button
          class="chart__day_btn"
          :class="{ active: days === 7 }"
          @click="newFromDate(7)"
        >
          7d
        </button>
        <button
          class="chart__day_btn"
          :class="{ active: days === 14 }"
          @click="newFromDate(14)"
        >
          14d
        </button>
        <button
          class="chart__day_btn"
          :class="{ active: days === 30 }"
          @click="newFromDate(30)"
        >
          30d
        </button>
        <button
          class="chart__day_btn"
          :class="{ active: days === 90 }"
          @click="newFromDate(90)"
        >
          90d
        </button>
        <button
          class="chart__day_btn"
          :class="{ active: days === 180 }"
          @click="newFromDate(180)"
        >
          180d
        </button>
        <button
          class="chart__day_btn"
          :class="{ active: days === 365 }"
          @click="newFromDate(365)"
        >
          1y
        </button>
      </div>
    </div>
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { use } from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import VChart, { THEME_KEY } from "vue-echarts";
use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
]);

export default {
  name: "SingleChart",
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "dark",
  },
  props: ["coins"],
  data() {
    return {
      chart: [],
      chartBtc: [],
      chartEth: [],
      newPriceArray: [],
      newPriceBtc: [],
      newPriceEth: [],
      newDate: [],
      fromValue: "2021-02-01",
      fromDate: "",
      toValue: "",
      currentDate: "",
      days: 1,
    };
  },
  created() {
    this.toValue = moment().format("YYYY-MM-DD");
    console.log(this.toValue);
    this.currentDate = moment(this.toValue);
    console.log((this.currentDate + 57367000) / 1000);
    this.getCoinChart();
  },
  methods: {
    newFromDate(item) {
      this.days = item;
      let fromMomentDays = moment(this.toValue)
        .subtract(item, "days")
        .format("YYYY-MM-DD");
      this.fromValue = fromMomentDays;
    },
    addFromValue() {
      this.fromDate = moment(this.fromValue);
    },
    addToValue() {
      this.currentDate = moment(this.toValue);
    },
    getCoinChart() {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${
            this.coins.id
          }/market_chart/range?vs_currency=usd&from=${this.fromDate /
            1000}&to=${(this.currentDate + 57367000) / 1000}`
        )
        .then((response) => {
          this.chart = response.data;
        });
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${
            this.coins.id
          }/market_chart/range?vs_currency=btc&from=${this.fromDate /
            1000}&to=${(this.currentDate + 57367000) / 1000}`
        )
        .then((response) => {
          this.chartBtc = response.data;
        });
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${
            this.coins.id
          }/market_chart/range?vs_currency=eth&from=${this.fromDate /
            1000}&to=${(this.currentDate + 57367000) / 1000}`
        )
        .then((response) => {
          this.chartEth = response.data;
        });
    },
    newChartUsdArr() {
      this.newPriceArray.length = 0;
      this.newDate.length = 0;
      for (var i = 0; i < this.chart.prices.length; i++) {
        this.newPriceArray.push(this.chart.prices[i][1].toFixed(6));
        this.newDate.push(moment(this.chart.prices[i][0]).format("llll"));
      }
      this.fromValue = moment(this.newDate[0]).format("YYYY-MM-DD");
    },
    newChartBtcArr() {
      this.newPriceBtc.length = 0;
      for (var i = 0; i < this.chartBtc.prices.length; i++) {
        this.newPriceBtc.push(this.chartBtc.prices[i][1]);
      }
    },
    newChartEthArr() {
      this.newPriceEth.length = 0;
      for (var i = 0; i < this.chartEth.prices.length; i++) {
        this.newPriceEth.push(this.chartEth.prices[i][1]);
      }
    },
  },
  computed: {
    option() {
      return {
        title: {
          text: `${this.coins.name} Chart`,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["USD", "BTC", "ETH"],
          selected: {
            USD: true,
            BTC: false,
            ETH: false,
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.newDate,
        },
        yAxis: [
          {
            name: "USD",
            type: "value",
          },
          {
            name: "BTC",
            nameLocation: "start",
            type: "value",
          },
          {
            name: "ETH",
            nameLocation: "start",
            type: "value",
            offset: 50,
          },
        ],
        series: [
          {
            name: "USD",
            type: "line",
            stack: "1",
            data: this.newPriceArray,
          },
          {
            name: "BTC",
            type: "line",
            yAxisIndex: 1,
            stack: "2",
            data: this.newPriceBtc,
            showSymbol: false,
          },
          {
            name: "ETH",
            type: "line",
            yAxisIndex: 2,
            stack: "3",
            data: this.newPriceEth,
          },
        ],
      };
    },
    valueFrom() {
      return this.fromValue;
    },
    valueTo() {
      return this.toValue;
    },
    usdChartArray() {
      return this.chart;
    },
    btcChartArray() {
      return this.chartBtc;
    },
    ethChartArray() {
      return this.chartEth;
    },
  },
  watch: {
    valueFrom() {
      this.addFromValue();
      this.getCoinChart();
    },
    valueTo() {
      this.addToValue();
      this.getCoinChart();
    },
    usdChartArray() {
      this.newChartUsdArr();
    },
    btcChartArray() {
      this.newChartBtcArr();
    },
    ethChartArray() {
      this.newChartEthArr();
    },
  },
};
</script>

<style scoped>
.chart {
  height: 400px;
}
.chart__day_btn {
  color: #fff;
  border: 1px solid white;
  padding: 3px;
  margin-right: 5px;
  cursor: pointer;
  background: #000;
}
.active {
  color: #000;
  background: #fff;
}
</style>
