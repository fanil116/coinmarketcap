<template>
  <div class="contain mb-4 topSlider">
    <VueSlickCarousel v-bind="settings" v-if="coins.length">
      <div class="carousel__color" v-for="item in coins" :key="item.id">
        <div>
          {{ item.name }} : {{ item.current_price }} $
          <span
            class="green"
            v-if="item.price_change_percentage_24h_in_currency > 0"
          >
            &#11014;
          </span>
          <span
            class="red"
            v-if="item.price_change_percentage_24h_in_currency <= 0"
          >
            &#11015;
          </span>
          <span
            :class="[
              color(item.price_change_percentage_24h_in_currency)
                ? 'green'
                : 'red',
            ]"
            >{{
              item.price_change_percentage_24h_in_currency | numberFixed
            }}%</span
          >
        </div>
      </div>
    </VueSlickCarousel>
  </div>
</template>
<script>
import axios from "axios";
import { colorMixin } from "../mixins/exampleMixin.js";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  name: "TopSlider",
  mixins: [colorMixin],
  components: { VueSlickCarousel },
  data() {
    return {
      coins: [],
      settings: {
        arrows: false,
        autoplay: true,
        dots: false,
        infinite: true,
        speed: 2000,
        autoplaySped: 2000,
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    };
  },
  computed: {},
  mounted() {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?`, {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: "15",
          page: 1,
          sparkline: true,
          price_change_percentage: "1h,24h,7d",
        },
      })
      .then((response) => {
        this.coins = response.data;
      });
  },
  filters: {
    numberFixed(item) {
      if (item != null) {
        return item.toFixed(2);
      } else {
        return 0;
      }
    },
  },
};
</script>
<style>
.topSlider {
  font-size: 14px;
}
.carousel__color {
  color: #fff;
  text-align: left;
}
</style>
