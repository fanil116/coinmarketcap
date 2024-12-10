<template>
  <div class="TableRow d-flex text-left table__size_sm">
    <div class="col number d-flex position-relative">
      <div>
        {{ item.market_cap_rank }}
      </div>
      <div class="popup_trust" v-show="active">
        Add to Main Watchlist
      </div>
      <div @mouseover="mouseOver" @mouseout="mouseOut" class="rating active">
        <span>☆</span>
      </div>
    </div>
    <div class="col-2">
      <router-link
        :to="{ name: 'SingleCoin', params: { coin: item.name } }"
        class="coin__link"
      >
        <img class="image__size" :src="item.image.small" /> {{ item.name }} /
        {{ item.symbol }}
      </router-link>
    </div>
    <div class="col">
      <div>{{ item.market_data.current_price.usd }} {{ symbol }}</div>
    </div>
    <div class="col-1">
      <div
        :class="[
          color(item.market_data.price_change_percentage_1h_in_currency.usd)
            ? 'green'
            : 'red',
        ]"
      >
        {{
          item.market_data.price_change_percentage_1h_in_currency.usd
            | numberPercent
        }}
        %
      </div>
    </div>
    <div class="col-1">
      <div
        :class="[
          color(item.market_data.price_change_percentage_24h_in_currency.usd)
            ? 'green'
            : 'red',
        ]"
      >
        {{
          item.market_data.price_change_percentage_24h_in_currency.usd
            | numberPercent
        }}
        %
      </div>
    </div>
    <div class="col-1">
      <div
        :class="[
          color(item.market_data.price_change_percentage_7d_in_currency.usd)
            ? 'green'
            : 'red',
        ]"
      >
        {{
          item.market_data.price_change_percentage_7d_in_currency.usd
            | numberPercent
        }}
        %
      </div>
    </div>
    <div class="col">
      <div>
        {{ item.market_data.total_volume.usd | numberLocale }} {{ symbol }}
      </div>
    </div>
    <div class="col">
      <div>
        {{ item.market_data.market_cap.usd | numberLocale }} {{ symbol }}
      </div>
    </div>
    <div class="col">
      <trend
        :data="item.market_data.sparkline_7d.price"
        :gradient="[
          color(item.market_data.price_change_percentage_7d_in_currency.usd)
            ? 'green'
            : 'red',
        ]"
        auto-draw
        >{{ item.market_data.sparkline_7d.price }}</trend
      >
    </div>
  </div>
</template>
<script>
import { colorMixin } from "../mixins/exampleMixin.js";
export default {
  name: "WatchListTableBody",
  mixins: [colorMixin],
  props: ["item", "value"],
  data: () => ({
    symbol: "$",
    active: false,
  }),

  /*   watch: {
    value() {
      this.symbolCurrency();
    },
  }, */
  filters: {
    numberPercent(item) {
      if (item != null) {
        return item.toFixed(2);
      } else {
        return "";
      }
    },
    numberLocale: function(item) {
      if (item != null) {
        return item.toLocaleString("ru-Ru");
      } else {
        return "";
      }
    },
  },
  methods: {
    mouseOver: function() {
      this.active = !this.active;
    },
    mouseOut: function() {
      this.active = false;
    },
    /*     symbolCurrency: function() {
      if (this.value === "usd") {
        this.symbol = "$";
      } else if (this.value === "rub") {
        this.symbol = "₽";
      } else if (this.value === "eur") {
        this.symbol = "€";
      } else if (this.value === "btc") {
        this.symbol = "BTC";
      } else if (this.value === "eth") {
        this.symbol = "ETH";
      } else if (this.value === "xrp") {
        this.symbol = "XRP";
      } else if (this.value === "bch") {
        this.symbol = "BCH";
      } else if (this.value === "ltc") {
        this.symbol = "LTC";
      }
    }, */
  },
};
</script>
<style>
.table__size_sm {
  font-size: 14px;
}
</style>
