<template>
  <div class="watchList">
    <Header />
    <TopSlider />
    <GlobalCoin />
    <WatchListTable />
  </div>
</template>
<script>
import TopSlider from "@/components/TopSlider.vue";
import Header from "@/components/Header.vue";
import GlobalCoin from "@/components/GlobalCoin.vue";
import WatchListTable from "@/components/WatchListTable.vue";
export default {
  name: "Watchlist",
  components: {
    TopSlider,
    Header,
    GlobalCoin,
    WatchListTable,
  },
};
</script>
