<template>
  <div class="TableRow d-flex align-items-center">
    <div class="col number d-flex position-relative">
      <div>
        {{ item.market_cap_rank }}
      </div>
      <div class="popup_trust" v-show="active">
        Add to Main Watchlist
      </div>
      <div class="popup_trust" v-show="activeNoUser">
        Login to add coins to watchlist
      </div>
      <div
        @mouseover="mouseOver"
        @mouseout="mouseOut"
        class="rating"
        :class="{ active: isCoinInLocalStorage }"
      >
        <span @click="addWatchlist">☆</span>
      </div>
    </div>
    <div class="col-2">
      <router-link
        :to="{ name: 'SingleCoin', params: { coin: item.name } }"
        class="coin__link"
      >
        <img class="image__size" :src="item.image" /> {{ item.name }} /
        {{ item.symbol }}
      </router-link>
    </div>
    <div class="col">
      <div>{{ item.current_price }} {{ symbol }}</div>
    </div>
    <div class="col-1">
      <div
        :class="[
          color(item.price_change_percentage_1h_in_currency) ? 'green' : 'red',
        ]"
      >
        {{ item.price_change_percentage_1h_in_currency | numberPercent }} %
      </div>
    </div>
    <div class="col-1">
      <div
        :class="[
          color(item.price_change_percentage_24h_in_currency) ? 'green' : 'red',
        ]"
      >
        {{ item.price_change_percentage_24h_in_currency | numberPercent }} %
      </div>
    </div>
    <div class="col-1">
      <div
        :class="[
          color(item.price_change_percentage_7d_in_currency) ? 'green' : 'red',
        ]"
      >
        {{ item.price_change_percentage_7d_in_currency | numberPercent }} %
      </div>
    </div>
    <div class="col">
      <div>{{ item.total_volume | numberLocal }} {{ symbol }}</div>
    </div>
    <div class="col">
      <div>{{ item.market_cap | numberLocal }} {{ symbol }}</div>
    </div>
    <div class="col">
      <trend
        :data="item.sparkline_in_7d.price"
        :gradient="[
          color(item.price_change_percentage_7d_in_currency) ? 'green' : 'red',
        ]"
        auto-draw
        >{{ item.sparkline_in_7d.price }}</trend
      >
    </div>
  </div>
</template>
<script>
import { colorMixin } from "../mixins/exampleMixin.js";
export default {
  name: "TableRow",
  mixins: [colorMixin],
  props: ["item", "value"],
  data: () => ({
    posts: [],
    errors: [],
    symbol: "$",
    symbols: {
      usd: "$",
      rub: "₽",
    },
    coinsNames: [],
    active: false,
    activeNoUser: false,
  }),

  mounted() {
    const user = JSON.parse(localStorage.getItem("User"));
    if (user !== null) {
      if (Array.isArray(user.watchlist)) {
        this.coinsNames = user.watchlist;
      }
    }
  },

  computed: {
    isCoinInLocalStorage() {
      return this.coinsNames.includes(this.item.id);
    },
    getUser() {
      return this.$store.getters.getUser;
    },
  },
  watch: {
    value() {
      this.symbolCurrency();
    },
    getUser() {
      this.watchlistUpdate();
    },
  },
  filters: {
    numberPercent: function(item) {
      if (item != null) {
        return item.toFixed(2);
      } else {
        return "";
      }
    },
    numberLocal: function(item) {
      let num = Number(item);
      return num.toLocaleString("ru-RU");
    },
  },
  methods: {
    watchlistUpdate() {
      let user = JSON.parse(localStorage.getItem("User"));
      if (user !== null) {
        // const user = JSON.parse(localStorage.getItem("User"));
        if (Array.isArray(user.watchlist)) {
          this.coinsNames = user.watchlist;
        }
      } else this.coinsNames = [];
    },
    mouseOver: function() {
      let user = JSON.parse(localStorage.getItem("User"));
      if (user !== null) {
        this.active = !this.active;
      } else {
        this.activeNoUser = !this.activeNoUser;
      }
    },
    mouseOut: function() {
      this.active = false;
      this.activeNoUser = false;
    },
    symbolCurrency: function() {
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
    },
    addWatchlist() {
      let user = JSON.parse(localStorage.getItem("User"));
      if (user !== null) {
        if (!Array.isArray(user.watchlist)) user.watchlist = [];
        user.watchlist.includes(this.item.id)
          ? (user.watchlist = user.watchlist.filter(
              (el) => el !== this.item.id
            ))
          : user.watchlist.push(this.item.id);
        localStorage.setItem("User", JSON.stringify(user));
        this.coinsNames = user.watchlist;
        let users = JSON.parse(localStorage.getItem("Users"));
        for (let i = 0; i < users.length; i++) {
          if (users[i].name === user.name) {
            users[i].watchlist = user.watchlist;
            localStorage.setItem("Users", JSON.stringify(users));
          }
        }
      }
      // let coinsNames = JSON.parse(localStorage.getItem("watchList"));
      // if (!Array.isArray(coinsNames)) coinsNames = [];

      // coinsNames.includes(this.item.id)
      //   ? (coinsNames = coinsNames.filter((el) => el !== this.item.id))
      //   : coinsNames.push(this.item.id);

      // localStorage.setItem("watchList", JSON.stringify(coinsNames));
      // this.coinsNames = coinsNames;
    },
  },
};
</script>
<style>
.popup_trust {
  font-size: 12px;
  border: 1px solid white;
  position: absolute;
  width: max-content;
  left: -50px;
  top: -30px;
  background: #000;
  z-index: 20000;
  padding: 5px;
}
.TableRow {
  color: #fff;
  padding: 10px 0;
  font-size: 15px;
}
.coin__link {
  color: #fff;
}
.rating {
  unicode-bidi: bidi-override;
  direction: rtl;
  cursor: pointer;
}
.rating > span {
  display: inline-block;
  position: relative;
  width: 1.1em;
}
.rating > span:hover:before,
.rating > span:hover ~ span:before {
  content: "\2605";
  position: absolute;
  color: yellow;
}
.rating.active > span:before {
  content: "\2605";
  position: absolute;
  color: yellow;
}
</style>
