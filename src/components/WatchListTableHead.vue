<template>
  <div class="d-flex tableHead mt-5 text-left">
    <div
      class="col number cursor-pointer"
      @click="pushSortBy('market_cap_rank')"
    >
      <p>#</p>
    </div>
    <div class="col-2 cursor-pointer" @click="pushSortBy('name')">
      <p>Name</p>
    </div>
    <div
      class="col cursor-pointer"
      @click="pushSortBy('market_data.current_price.usd')"
    >
      <p>Price</p>
    </div>
    <div
      class="col-1 cursor-pointer"
      @click="pushSortBy('market_data.price_change_percentage_1h')"
    >
      <p>1h</p>
    </div>
    <div
      class="col-1 cursor-pointer"
      @click="pushSortBy('market_data.price_change_percentage_24h')"
    >
      <p>24h</p>
    </div>
    <div
      class="col-1 cursor-pointer"
      @click="
        pushSortBy('market_data.price_change_percentage_7d_in_currency.usd')
      "
    >
      <p>7d</p>
    </div>
    <div
      class="col cursor-pointer"
      @click="pushSortBy('market_data.total_volume.usd')"
    >
      <p>Volume</p>
    </div>
    <div
      class="col cursor-pointer"
      @click="pushSortBy('market_data.market_cap.usd')"
    >
      <p>Market Cap</p>
    </div>
    <div class="col">Last 7 days Chart</div>
  </div>
</template>
<script>
export default {
  name: "WatchListTableHead",
  date: () => ({
    sortAy: null,
    sortAsc: false,
  }),
  methods: {
    pushSortBy(item) {
      this.sortAy = item;
      this.sortAsc = !this.sortAsc;
      this.$emit("updateParent", {
        sortAy: this.sortAy,
        sortAsc: this.sortAsc,
      });
    },
  },
};
</script>
<style>
.tableHead {
  color: #fff;
}
</style>
