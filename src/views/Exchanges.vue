<template>
  <div class="exchanges">
    <Header />
    <GlobalCoin />
  </div>
</template>
<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import GlobalCoin from "@/components/GlobalCoin.vue";

export default {
  name: "Exchanges",
  components: {
    Header,
    GlobalCoin,
  },
};
</script>
<style>
h1 {
  color: white;
}
</style>
