<template>
  <div class="TablePage">
    <div class="overflow-auto">
      <!-- Use text in props -->
      <b-pagination
        v-model="currenPage"
        :total-rows="rows"
        :per-page="perPage"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        size="sm"
        align="right"
      ></b-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "TablePage",
  props: ["currentPage"],
  data: () => ({
    posts: [],
    errors: [],
    rows: 6125,
    perPage: 20,
  }),
  methods: {
    /*     urlPush: function() {
      if (this.$route.path != "/?page=1") {
        this.$router.push({ query: { page: this.currentPage } });
      }
    }, */
  },
  computed: {
    currenPage: {
      get: function() {
        return this.currentPage;
      },
      set: function(newValue) {
        this.$emit("updateParent", { currentPage: newValue });
      },
    },
  },
  watch: {
    /*     currentPage() {
            this.urlPush();
       this.$emit("updateParent", { currentPage: this.currentPage });
    }, */
  },
};
</script>
<style></style>
