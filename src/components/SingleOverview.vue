<template>
  <div class="singleOverview mt-3">
    <div class="overview__title">
      {{ coins.name }} - US Dollar Chart (<span class="text-uppercase">{{
        coins.symbol
      }}</span
      >/USD)
    </div>
    <div class="overview__subtitle">
      Conversion rate for
      <span class="text-gold">{{ coins.name }} to USD</span> for today is ${{
        coins.market_data.current_price.usd | numberLocale
      }}
      It has a current circulating supply of
      {{ coins.market_data.circulating_supply | numberString }} coins and a
      total volume exchanged of ${{
        coins.market_data.total_volume.usd | numberLocale
      }}
    </div>
    <div class="my-5">
      <SingleCoinProcentage :coins="coins" />
    </div>
    <div class="my-5"><SingleChart :coins="coins" /></div>
  </div>
</template>
<script>
import SingleChart from "@/components/SingleChart.vue";
import SingleCoinProcentage from "@/components/SingleCoinProcentage.vue";
export default {
  name: "SingleOverview",
  props: ["coins"],
  components: {
    SingleChart,
    SingleCoinProcentage,
  },
  data: () => ({}),
  filters: {
    numberLocale: function(item) {
      if (item != null) {
        return item.toLocaleString("en-EN");
      } else {
        return "";
      }
    },
    numberString: function(item) {
      // Nine Zeroes for Billions
      return Math.abs(Number(item)) >= 1.0e9
        ? (Math.abs(Number(item)) / 1.0e9).toFixed(1) + " Billion"
        : // Six Zeroes for Millions
        Math.abs(Number(item)) >= 1.0e6
        ? (Math.abs(Number(item)) / 1.0e6).toFixed(1) + " Million"
        : // Three Zeroes for Thousands
        Math.abs(Number(item)) >= 1.0e3
        ? (Math.abs(Number(item)) / 1.0e3).toFixed(1) + "K"
        : Math.abs(Number(item));
    },
  },
  methods: {},
};
</script>
<style>
.overview__title {
  font-size: 28px;
  line-height: 42px;
  color: #ffffff;
}
.overview__subtitle {
  font-size: 18px;
  line-height: 24px;
  color: #565669;
}
.text-gold {
  color: #ffbe76;
}
</style>
