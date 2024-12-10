<template>
  <div class="cryptoTable contain">
    <h1>Today's Cryptocurrency Prices by Market Cap</h1>
    <p>
      The global crypto market cap is
      <span>$ {{ globalCrypto | numberNoremainder | numberLocal }}</span
      >, a
      <span :class="[color(globalPercent) ? 'green' : 'red']"
        >{{ globalPercent | numberFixed }}%</span
      >
      increase over the last day
    </p>
    <div class="d-flex justify-content-between ">
      <b-form-select
        v-model="selected"
        :options="options"
        class="btn__green-dark"
      ></b-form-select>
      <TablePage @updateParent="onUpdatePage" :currentPage="currentPage" />
    </div>
    <div class="d-flex">
      <div
        class="col number cursor-pointer"
        @click="
          sortBy = 'market_cap_rank';
          sortAsc = !sortAsc;
        "
      >
        <p>#</p>
      </div>
      <div
        class="col-2 cursor-pointer"
        @click="
          sortBy = 'name';
          sortAsc = !sortAsc;
        "
      >
        <p>Name</p>
      </div>
      <div
        class="col cursor-pointer"
        @click="
          sortBy = 'current_price';
          sortAsc = !sortAsc;
        "
      >
        <p>Price</p>
      </div>
      <div
        class="col-1 cursor-pointer"
        @click="
          sortBy = 'price_change_percentage_1h_in_currency';
          sortAsc = !sortAsc;
        "
      >
        <p>1h</p>
      </div>
      <div
        class="col-1 cursor-pointer"
        @click="
          sortBy = 'price_change_percentage_24h_in_currency';
          sortAsc = !sortAsc;
        "
      >
        <p>24h</p>
      </div>
      <div
        class="col-1 cursor-pointer"
        @click="
          sortBy = 'price_change_percentage_7d_in_currency';
          sortAsc = !sortAsc;
        "
      >
        <p>7d</p>
      </div>
      <div
        class="col cursor-pointer"
        @click="
          sortBy = 'total_volume';
          sortAsc = !sortAsc;
        "
      >
        <p>Volume</p>
      </div>
      <div
        class="col cursor-pointer"
        @click="
          sortBy = 'market_cap';
          sortAsc = !sortAsc;
        "
      >
        <p>Market Cap</p>
      </div>
      <div class="col">Last 7 days Chart</div>
    </div>
    <div v-for="item in tableSorted" :key="item.id">
      <TableRow :item="item" v-model="selected" />
    </div>
    <TablePage @updateParent="onUpdatePage" :currentPage="currentPage" />
  </div>
</template>
<script>
import { bus } from "../main";
import { colorMixin } from "../mixins/exampleMixin.js";
import axios from "axios";
import TableRow from "@/components/TableRow.vue";
import TablePage from "@/components/TablePage.vue";

export default {
  name: "CryptoTable",
  mixins: [colorMixin],
  components: {
    TableRow,
    TablePage,
  },
  data: () => ({
    posts: [],
    errors: [],
    globalCrypto: null,
    globalPercent: null,
    inCurrency: "",
    selected: "usd",
    currentPage: 1,
    options: [
      { value: "usd", text: "Show in USD" },
      { value: "rub", text: "Show in RUB" },
      { value: "eur", text: "Show in EURO" },
      { value: "btc", text: "Show in Bitcoin" },
      { value: "eth", text: "Show in Ethereum" },
      { value: "xrp", text: "Show in XRP" },
      { value: "bch", text: "Show in Bitcoin Cash" },
      { value: "ltc", text: "Show in Litecoin" },
    ],
    sortAsc: true,
    sortBy: null,
    watchList: [],
  }),
  created() {
    bus.$on("globalCrypto", (data) => {
      this.globalCrypto = data;
    });
    bus.$on("globalPercent", (data) => {
      this.globalPercent = data;
    });
  },
  mounted() {
    if (!this.urlLinks) {
      this.$router.push({ query: { page: 1 } });
    } else this.getApi();
  },
  computed: {
    urlLinks: function() {
      return this.$route.query.page;
    },
    inCurr: function() {
      return this.selected;
    },
    tableSorted: function() {
      const sortBy = this.sortBy;
      if (!sortBy) return this.posts;
      if (this.sortAsc) {
        return this.posts
          .slice(0)
          .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
      } else {
        return this.posts
          .slice(0)
          .sort((a, b) => (a[sortBy] < b[sortBy] ? 1 : -1));
      }
    },
  },
  filters: {
    numberFixed(item) {
      if (item != null) {
        return item.toFixed(2);
      } else {
        return 0;
      }
    },
    numberNoremainder(item) {
      if (item != null) {
        return item.toFixed();
      } else {
        return 0;
      }
    },
    numberLocal: function(item) {
      let num = Number(item);
      return num.toLocaleString();
    },
  },
  methods: {
    onUpdatePage(paginationData) {
      // if (this.$route.path != "/?page=1") {
      // this.$router.push({ query: { page: someData.currentPage } });
      this.currentPage = paginationData.currentPage;
      // }
    },
    getApi: function() {
      axios
        .get(`https://api.coingecko.com/api/v3/coins/markets?`, {
          params: {
            vs_currency: this.inCurr,
            order: "market_cap_desc",
            per_page: "20",
            page: this.urlLinks,
            sparkline: true,
            price_change_percentage: "1h,24h,7d",
          },
        })
        .then((response) => {
          this.posts = response.data;
        });
    },
  },
  watch: {
    currentPage() {
      // if (this.$route.path != "/?page=1") {
      this.$router.push({ query: { page: this.currentPage } });
      // }
    },
    urlLinks() {
      this.getApi();
    },
    inCurr() {
      this.getApi();
    },
  },
};
</script>
<style>
.cursor-pointer {
  cursor: pointer;
}
svg {
  height: 100%;
}
.table__color {
  color: #fff;
}
.image__size {
  width: 24px;
  height: 24px;
}
.number {
  max-width: 50px !important;
}

.table {
  color: #fff !important;
}

.cryptoTable {
  text-align: left;
}

h1 {
  color: #fff;
  font-size: 24px;
}
.btn__green-dark {
  background-color: #1e2608 !important;
  color: #fff !important;
  border-color: transparent !important;
  max-width: 200px;
}
</style>
