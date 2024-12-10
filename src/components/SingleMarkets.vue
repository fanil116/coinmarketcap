<template>
  <div class="SingleMarkets mt-3">
    <div class="d-flex">
      <div class="col number cursor-pointer">
        <p>#</p>
      </div>
      <div class="col cursor-pointer">
        <p>Exchange</p>
      </div>
      <div class="col cursor-pointer">
        <p>Pair</p>
      </div>
      <div class="col-1 cursor-pointer">
        <p>Price</p>
      </div>
      <div class="col-1 cursor-pointer">
        <p>Spread</p>
      </div>
      <div class="col cursor-pointer">
        <p>+2% Depth</p>
      </div>
      <div class="col cursor-pointer">
        <p>-2% Depth</p>
      </div>
      <div class="col cursor-pointer">
        <p>24h Volume</p>
      </div>
      <div class="col-1">Volume %</div>
      <div class="col">Last Traded</div>
      <div class="col">Trust Score</div>
    </div>
    <div v-for="(item, index) in coin.tickers" :key="item.id">
      <SingleMarketsTable :item="item" :index="index" :volume="volume" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import SingleMarketsTable from "@/components/SingleMarketsTable.vue";
export default {
  name: "SingleMarkets",
  props: ["coins", "volume"],
  components: {
    SingleMarketsTable,
  },
  data: () => ({
    coin: [],
  }),
  created() {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${this.coins.id}/tickers?include_exchange_logo=true&depth=true`
      )
      .then((response) => {
        this.coin = response.data;
      });
  },
};
</script>
<style></style>
