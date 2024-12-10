<template>
  <div class="singleCoin">
    <Header />
    <TopSlider />
    <GlobalCoin />
    <div class="contain">
      <div class="d-flex flex-wrap mt-5">
        <div class="col-6 row">
          <div class="d-flex flex-wrap flex-column text-left w-100">
            <div class="d-flex flex-wrap">
              <div class="col-2 px-0">
                <img :src="coins.image.small" alt="" />
              </div>
              <div class="col-auto px-0">
                {{ coins.name }}/
                <span class="text-uppercase">{{ coins.symbol }}</span>
              </div>
            </div>
            <div class="d-flex flex-wrap align-items-center">
              <div class="col-2 px-0">
                Market Cap
              </div>
              <div class="col-auto">Rank № {{ coins.market_cap_rank }}</div>
            </div>
            <div class="d-flex flex-wrap mt-3 align-items-center">
              <div class="col-2 px-0">
                Website
              </div>
              <div class="col-auto px-0 d-flex flex-wrap">
                <a
                  :href="item"
                  class="singleCoin__item_round text-capitalize"
                  v-for="item in official_site"
                  :key="item.id"
                >
                  {{ item.match(/(https?:\/\/)?(www.)?(\w+)\.\w+/i)[3] }}
                </a>
              </div>
            </div>
            <div class="d-flex flex-wrap mt-3 align-items-center">
              <div class="col-2 px-0">
                Explorers
              </div>
              <div class="col-auto d-flex flex-wrap px-0">
                <a
                  :href="item"
                  v-for="item in links_site"
                  :key="item.id"
                  class="singleCoin__item_round mr-2 text-capitalize"
                >
                  <!--  {{ item.substr(8) }} -->
                  <!-- {{ /[^.]+/.exec(item)[0].substr(8) }} -->
                  {{ item.match(/(https?:\/\/)?(www.)?(\w+)\.\w+/i)[3] }}
                </a>
              </div>
            </div>

            <div
              class="d-flex flex-wrap mt-3 align-items-center"
              @mouseover="mouseOver"
              @mouseout="mouseOut"
            >
              <div class="col-2 px-0">
                Source Code
              </div>
              <div class="col-auto px-0 d-flex flex-wrap">
                <div
                  class="singleCoin__item_round mr-2 d-flex flex-column align-items-center"
                >
                  <div>
                    <img
                      src="../assets/GitHub.png"
                      class="github__logo"
                      alt=""
                    />GitHub
                  </div>
                  <div class="mt-2" v-show="active">
                    <a
                      :href="item"
                      v-for="item in source_code"
                      :key="item.id"
                      class="singleCoin__item_round text-capitalize"
                    >
                      <!-- {{ /[^.]+/.exec(item)[0].substr(8) }} -->
                      {{ item.split("/")[4] }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-6">
          <div class="mini-chart">
            <trend
              :data="coins.market_data.sparkline_7d.price"
              :gradient="[
                color(coins.market_data.price_change_percentage_7d_currency)
                  ? 'green'
                  : 'red',
              ]"
              auto-draw
              >{{ coins.market_data.sparkline_7d.price }}</trend
            >
            <div class="position-absolute mini-chart__wrapper">
              <div class="coin__price">
                {{ coins.market_data.current_price.usd | numberLocale }}
                $
                <span
                  class=" ml-4"
                  :class="[color(pricePercent) ? 'green' : 'red']"
                >
                  {{ pricePercent }}%</span
                >
              </div>
              <div class="text-right my-4">
                {{ coins.market_data.current_price.btc }} BTC
                <span
                  class=" ml-4"
                  :class="[color(btcPercent) ? 'green' : 'red']"
                >
                  {{ btcPercent }}%</span
                >
              </div>
              <div
                class="converter-field d-flex flex-column flex-md-row align-items-center justify-content-center my-2"
              >
                <div
                  class="input-group  d-flex flex-nowrap from_amount align-items-center"
                  :class="{ one: isOne }"
                >
                  <span class="center text-uppercase pl-2">{{
                    coins.symbol
                  }}</span>
                  <input
                    type="number"
                    id="from_amount"
                    class="form-control rounded-0 h-100"
                    v-model="from_amount"
                    @input="convertation"
                  />
                </div>
                <div class="mx-4" :class="{ icon_transfer: isOne }">
                  <img src="../assets/transfer.svg" alt="" @click="swap()" />
                </div>
                <div
                  class="input-group d-flex flex-nowrap to_amount align-items-center"
                  :class="{ two: isOne }"
                >
                  <span class="calc-symbol-box center text-uppercase pl-2"
                    >usd</span
                  >
                  <input
                    type="number"
                    id="to_amount"
                    class="form-control rounded-0 h-100"
                    v-model="to_amount"
                    @input="convertationReverse"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex flex-column ">
            <div class="text-right">
              <div v-if="this.coin == `Bitcoin`">
                <p class="text-gray">Fully Diluted Valuation</p>
                <p>
                  {{
                    coins.market_data.fully_diluted_valuation.usd | numberLocale
                  }}
                  $
                </p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-gray">Market Cap</p>
              <p>{{ coins.market_data.market_cap.usd | numberLocale }} $</p>
            </div>
            <div class="text-right">
              <p class="text-gray">24h Low / 24h High</p>
              <p>
                {{ coins.market_data.low_24h.usd | numberLocale }} $ /
                {{ coins.market_data.high_24h.usd | numberLocale }} $
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="text-left">
        <button
          v-for="tab in tabs"
          v-bind:key="tab"
          v-bind:class="['mt-5 tab-button', { active: currentTab === tab }]"
          v-on:click="currentTab = tab"
        >
          {{ tab }}
        </button>
        <component
          v-bind:is="currentTabComponent"
          class="tab"
          :coins="coins"
          :volume="coins.market_data.total_volume.usd"
        ></component>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { colorMixin } from "../mixins/exampleMixin.js";
import TopSlider from "@/components/TopSlider.vue";
import Header from "@/components/Header.vue";
import GlobalCoin from "@/components/GlobalCoin.vue";
import Chart from "@/components/SingleChart.vue";
import Markets from "@/components/SingleMarkets.vue";
import Overview from "@/components/SingleOverview.vue";
export default {
  name: "SingleCoin",
  props: ["coin"],
  mixins: [colorMixin],
  components: {
    TopSlider,
    Header,
    GlobalCoin,
    Chart,
    Markets,
    Overview,
  },
  data: () => ({
    coins: {},
    links_site: [],
    official_site: [],
    source_code: [],
    from_amount: "",
    to_amount: "",
    isOne: false,
    currentTab: "Overview",
    tabs: ["Overview", "Markets", "Chart"],
    volume: null,
    active: false,
  }),
  created() {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${this.coin.toLowerCase()}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`
      )
      .then((response) => {
        this.coins = response.data;
        /*         this.$store.dispath("SAVE_TODO", this.coins);
         */ for (let i = 0; i < this.coins.links.blockchain_site.length; i++) {
          if (this.coins.links.blockchain_site[i] != "") {
            this.links_site.push(this.coins.links.blockchain_site[i]);
          }
        }
        for (let j = 0; j < this.coins.links.homepage.length; j++) {
          if (this.coins.links.homepage[j] != "") {
            this.official_site.push(this.coins.links.homepage[j]);
          }
        }
        for (let k = 0; k < this.coins.links.repos_url.github.length; k++) {
          if (this.coins.links.repos_url.github[k] != "") {
            this.source_code.push(this.coins.links.repos_url.github[k]);
          }
        }
      });
  },
  methods: {
    convertation: function() {
      this.to_amount =
        this.from_amount * this.coins.market_data.current_price.usd;
    },
    convertationReverse: function() {
      this.from_amount =
        this.to_amount / this.coins.market_data.current_price.usd;
    },
    swap: function() {
      if (!this.isOne) {
        this.isOne = true;
      } else {
        this.isOne = false;
      }
    },
    mouseOver: function() {
      this.active = !this.active;
    },
    mouseOut: function() {
      this.active = false;
    },
  },
  watch: {},
  filters: {
    numberLocale: function(item) {
      if (item != null) {
        return item.toLocaleString("en-EN");
      } else {
        return "";
      }
    },
  },
  computed: {
    pricePercent: function() {
      return this.coins.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
        1
      );
    },
    btcPercent: function() {
      return this.coins.market_data.price_change_percentage_24h_in_currency.btc.toFixed(
        1
      );
    },
    currentTabComponent: function() {
      return this.currentTab;
    },
    /*     websiteSort: function() {
      for (let i = 0; i < this.coins.links.blockchain_site.length; i++) {
        if (this.coins.links.blockchain_site[i] !== "") {
          return this.links_site
            .slice(0)
            .push(this.coins.links.blockchain_site[i]);
        }
      }
      return [];
    }, */
    /*     explorerSort: function() {
      for (let j = 0; j < this.coins.links.homepage.length; j++) {
        if (this.coins.links.homepage[j] != "") {
          return this.official_site.slice(0).push(this.coins.links.homepage[j]);
        }
      }
      return [];
    }, */
  },
};
</script>
<style scoped>
.github__logo {
  max-width: 20px;
  margin-right: 5px;
}
.text-gray {
  color: #565669;
  font-size: 16px;
}
.singleCoin {
  color: #fff;
}
.singleCoin__item_round {
  background: #1c1c23;
  border-radius: 20px;
  padding: 8px 12px;
  color: #fff;
  height: fit-content;
}
.mini-chart {
  height: 185px;
  margin-left: auto;
  border: 1px solid #1c1c23;
  box-sizing: border-box;
  /* Shadow 3 */
  position: relative;
  box-shadow: 0px 8px 10px rgba(11, 11, 13, 0.14),
    0px 3px 14px rgba(11, 11, 13, 0.12), 0px 5px 5px rgba(11, 11, 13, 0.2);
  border-radius: 16px;
  background-image: linear-gradient(
    to right top,
    #19191e,
    #27243c,
    #3b2c5a,
    #583175,
    #7b328d,
    #7b328d,
    #7b328d,
    #7b328d,
    #583175,
    #3b2c5a,
    #27243c,
    #19191e
  );
}
.mini-chart__wrapper {
  top: 0;
  right: 5%;
}
.coin__price {
  font-weight: bold;
  font-size: 36px;
  line-height: 49px;
  text-align: right;
}
.one {
  order: 3;
}
.icon_transfer {
  order: 2;
}
.two {
  order: 1;
}
.from_amount,
.to_amount {
  background: #2b2b34;
  border-radius: 8px;
}
.input-group input {
  background: transparent;
  border: 0;
  max-width: fit-content;
  min-width: 180px;
  color: #fff;
}
.form-control:focus {
  box-shadow: none;
}
.tab-button {
  background: #1c1c23;
  border-color: #1c1c23;
  border-radius: 6px 0px 0px 6px;
  color: #fff;
}
.tab-button.active {
  background: #8f55db;
  border-color: #8f55db;
}
.tab-button:nth-child(2) {
  border-radius: 0px;
}
.tab-button:nth-child(3) {
  border-radius: 0px 6px 6px 0px;
}
button:focus {
  outline: none;
}
</style>
