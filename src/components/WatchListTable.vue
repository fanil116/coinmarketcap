<template>
  <div class="watchListTable contain">
    <div v-if="isUserAuthorized">
      <div v-if="isUserWatchlist" class="watchlist__not-authorization">
        Please add coins to your watchlist
        <router-link to="/" class="mr-3">Market</router-link>
      </div>
      <div v-else>
        <WatchListTableHead @updateParent="onUpdateSalary" />
        <div v-for="item in tableSorted" :key="item.id">
          <WatchListTableBody :item="item" />
        </div>
      </div>
    </div>
    <div v-else class="watchlist__not-authorization">
      <div>
        To view your watchist, please log into your account or register
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import WatchListTableHead from "@/components/WatchListTableHead.vue";
import WatchListTableBody from "@/components/WatchListTableBody.vue";
export default {
  name: "WatchListTable",
  components: {
    WatchListTableHead,
    WatchListTableBody,
  },
  data: () => ({
    list: [],
    post: [],
    coinsArr: [],
    sortAsc: true,
    sortBy: "market_cap_rank",
    isUserAuthorized: false,
    isUserWatchlist: false,
  }),
  mounted() {
    this.getCoinWatchlist();
  },
  methods: {
    onUpdateSalary(sorting) {
      this.sortBy = sorting.sortAy;
      this.sortAsc = sorting.sortAsc;
    },
    getCoinWatchlist() {
      this.list = JSON.parse(localStorage.getItem("User"));
      if (this.list != null) {
        this.isUserAuthorized = true;
        if (this.list.watchlist.length !== 0) {
          for (var i = 0; i < this.list.watchlist.length; i++) {
            axios
              .get(
                `https://api.coingecko.com/api/v3/coins/${this.list.watchlist[i]}?`,
                {
                  params: {
                    localization: false,
                    tickers: false,
                    market_data: true,
                    community_data: false,
                    developer_data: false,
                    sparkline: true,
                  },
                }
              )
              .then((response) => {
                this.posts = response.data;
                this.coinsArr.push(this.posts);
              });
          }
        } else {
          this.isUserWatchlist = true;
        }
      } else {
        this.isUserAuthorized = false;
        this.isUserWatchlist = false;
      }
    },
  },
  computed: {
    tableSorted() {
      const sortBy = this.sortBy;
      if (!sortBy) return this.coinsArr;
      if (this.sortAsc) {
        return this.coinsArr
          .slice(0)
          .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
      } else {
        return this.coinsArr
          .slice(0)
          .sort((a, b) => (a[sortBy] < b[sortBy] ? 1 : -1));
      }
    },
    getUser() {
      return this.$store.getters.getUser;
    },
  },
  watch: {
    getUser() {
      this.coinsArr.length = 0;
      this.getCoinWatchlist();
    },
  },
};
</script>
<style>
.watchlist__not-authorization {
  color: #fff;
  font-size: 30px;
  margin-top: 10%;
}
</style>
