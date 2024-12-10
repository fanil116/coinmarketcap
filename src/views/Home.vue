<template>
  <div class="home">
    <Header />
    <TopSlider />
    <GlobalCoin />
    <CryptoTable />
  </div>
</template>

<script>
import TopSlider from "@/components/TopSlider.vue";
import Header from "@/components/Header.vue";
import GlobalCoin from "@/components/GlobalCoin.vue";
import CryptoTable from "@/components/CryptoTable.vue";
export default {
  name: "Home",
  components: {
    TopSlider,
    Header,
    GlobalCoin,
    CryptoTable,
  },
  data() {
    return {};
  },
};
</script>
