<template>
  <div class="globalCoin contain">
    <div class="d-flex align-items-center">
      <div class="mr-5">
        <p class="globalCoin__subtitle">Coins:</p>
        <p class="globalCoin__size">{{ coin_active }}</p>
      </div>
      <div>
        <p class="globalCoin__subtitle">Exchanges:</p>
        <p class="globalCoin__size">{{ market }}</p>
      </div>
      <div class="mx-5 globalCoin__info">
        <p>BTC Dominance</p>
        <p class="globalCoin__size">{{ btcDomination }} %</p>
      </div>
      <div class="mr-5">
        <p class="globalCoin__subtitle">Market Cap:</p>
        <p
          class="globalCoin__size"
          :class="[color(percentage_24h) ? 'green' : 'red']"
        >
          {{ totalMarket | mathFloor | numberLocal }} $
        </p>
      </div>
      <div>
        <p class="globalCoin__subtitle">24h Volume:</p>
        <p
          class="globalCoin__size"
          :class="[color(updateAt) ? 'green' : 'red']"
        >
          {{ totalVolume | mathFloor | numberLocal }} $
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { colorMixin } from "../mixins/exampleMixin.js";
import { bus } from "../main";
import axios from "axios";
export default {
  name: "GlobalCoin",
  mixins: [colorMixin],
  data: () => ({
    posts: [],
    errors: [],
    coin_active: null,
    market: null,
    btcDomination: null,
    totalMarket: null,
    totalVolume: null,
    percentage_24h: null,
    updateAt: null,
  }),
  created() {
    axios
      .get("https://api.coingecko.com/api/v3/global")
      .then((response) => {
        this.posts = response.data;
        this.coin_active = this.posts.data.active_cryptocurrencies;
        this.market = this.posts.data.markets;
        this.btcDomination = this.posts.data.market_cap_percentage.btc.toFixed(
          2
        );
        this.totalMarket = this.posts.data.total_market_cap.usd;
        this.totalVolume = this.posts.data.total_volume.usd;
        this.percentage_24h = this.posts.data.market_cap_change_percentage_24h_usd;
        this.updateAt = this.posts.data.updated_at;
        bus.$emit("globalCrypto", this.totalMarket);
        bus.$emit(
          "globalPercent",
          this.posts.data.market_cap_change_percentage_24h_usd
        );
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  filters: {
    numberLocal: function(item) {
      let num = Number(item);
      return num.toLocaleString("ru-RU");
    },
    mathFloor: function(item) {
      return Math.floor(item);
    },
  },
};
</script>
<style>
.globalCoin {
  color: #fff;
  text-align: left;
}
.globalCoin__info {
  padding: 15px;
  background: rgb(205, 122, 63);
  background: radial-gradient(
    circle,
    rgba(205, 122, 63, 1) 0%,
    rgba(135, 11, 167, 1) 95%
  );
  border-radius: 20px;
}
.globalCoin__size {
  font-size: 18px;
}
.green {
  color: #badc58;
}
.red {
  color: #ff7979;
}
.globalCoin__subtitle {
  color: #565669;
}
.contain {
  margin: 0 auto;
}
@media (min-width: 1200px) {
  .contain {
    max-width: 1285px;
  }
}
</style>
