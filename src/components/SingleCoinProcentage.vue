<template>
  <div>
    <b-table bordered :items="items">
      <template #cell()="data">
        <i :class="[color(data.value) ? 'green' : 'red']">{{ data.value }} %</i>
      </template>
    </b-table>
  </div>
</template>
<script>
import { colorMixin } from "../mixins/exampleMixin.js";
export default {
  name: "SingleCoinProcentage",
  mixins: [colorMixin],
  props: ["coins"],
  data: () => ({}),
  created() {},
  computed: {
    oneHours() {
      return this.coins.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
        1
      );
    },
    oneDay() {
      return this.coins.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
        1
      );
    },
    sevenDay() {
      return this.coins.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
        1
      );
    },
    fourteenDay() {
      return this.coins.market_data.price_change_percentage_14d_in_currency.usd.toFixed(
        1
      );
    },
    oneMonth() {
      return this.coins.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
        1
      );
    },
    oneYears() {
      if (
        this.coins.market_data.price_change_percentage_1y !== null ||
        this.coins.market_data.price_change_percentage_1y !== undefined
      ) {
        return this.coins.market_data.price_change_percentage_1y.toFixed(1);
      } else return 0;
    },
    items() {
      return [
        {
          "1h": this.oneHours,
          "24h": this.oneDay,
          "7d": this.sevenDay,
          "14d": this.fourteenDay,
          "30d": this.oneMonth,
          "1y": this.oneYears,
        },
      ];
    },
  },
  methods: {},
};
</script>
