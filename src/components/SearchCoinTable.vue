<template>
  <div class="d-flex searchTable text-left mt-2">
    <div class="col-2"><img class="image__size" :src="item.image" /></div>
    <router-link
      :to="{ name: 'SingleCoin', params: { coin: item.id } }"
      class="col-6"
      >{{ item.name }}</router-link
    >
    <div class="col-2">{{ item.market_cap_rank }}</div>
  </div>
</template>

<script>
export default {
  name: "SearchCoinTable",
  props: ["item"],
  data: () => ({}),
};
</script>
<style scoped>
.searchTable {
  font-size: 12px;
}
</style>
