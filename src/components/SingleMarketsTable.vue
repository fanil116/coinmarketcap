<template>
  <div class="SingleMarketsTable d-flex">
    <div class="col number cursor-pointer">
      <p>{{ index + 1 }}</p>
    </div>
    <div class="col cursor-pointer">
      <p>
        <img class="image__size" :src="item.market.logo" />{{
          item.market.name
        }}
      </p>
    </div>
    <div class="col cursor-pointer">
      <a :href="item.trade_url" target="_blanck" class="text-uppercase"
        >{{ coinSymbol(item.base) }}/{{ item.target }}</a
      >
    </div>
    <div class="col-1 cursor-pointer">
      <p>{{ item.converted_last.usd }} $</p>
    </div>
    <div class="col-1 cursor-pointer">
      <p>{{ item.bid_ask_spread_percentage | numberFixed }} %</p>
    </div>
    <div class="col cursor-pointer">
      <p>{{ item.cost_to_move_up_usd | numberNoremainder | numberLocal }} $</p>
    </div>
    <div class="col cursor-pointer">
      <p>
        {{ item.cost_to_move_down_usd | numberNoremainder | numberLocal }} $
      </p>
    </div>
    <div class="col cursor-pointer">
      <p>{{ item.converted_volume.usd | numberLocal }}$</p>
    </div>
    <div class="col-1">
      {{ ((item.converted_volume.usd / volume) * 100) | numberFixed }} %
    </div>
    <div class="col">
      <span>{{ timestamp }}</span>
    </div>
    <div class="col position-relative">
      <div class="popup_trust" v-show="active">
        Показатель надежности: <span>{{ goodScore }}</span>
      </div>
      <div
        @mouseover="mouseOver"
        @mouseout="mouseOut"
        class="round-trust"
        :class="[colorBg(item.trust_score)]"
      ></div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import axios from "axios";
export default {
  name: "SingleMarketsTable",
  props: ["item", "index", "volume"],
  data: () => ({
    active: false,
    locale: "",
    posts: [],
  }),
  created() {
    /*     console.log(this.item); */
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${this.item.coin_id}`)
      .then((response) => {
        this.posts = response.data;
      });
  },
  computed: {
    timestamp: function() {
      return moment(this.item.last_traded_at).fromNow();
    },
    goodScore: function() {
      if (this.item.trust_score === "green") {
        return "хороший По нашим расчетам, у этой торговой пары хорошая ликвидность";
      } else if (this.item.trust_score === "red") {
        return "низкий. По нашим расчетам, у этой торговой пары низкая ликвидность.";
      } else if (this.item.trust_score === null) {
        return "неизвестен. У нас недостаточно данных для оценки этой торговой пары.";
      } else {
        return "удовлетворительный. По нашим расчетам, у этой торговой пары удовлетворительная ликвидность.";
      }
    },
  },
  methods: {
    coinSymbol: function(item) {
      if (item.length < 7) {
        return item;
      } else return this.posts.symbol;
    },
    colorBg: function(item) {
      if (item === "green") {
        return "bg_green";
      } else if (item === "red") {
        return "bg_red";
      } else if (item === "yellow") {
        return "bg_yellow";
      } else return "bg_white";
    },
    mouseOver: function() {
      this.active = !this.active;
    },
    mouseOut: function() {
      this.active = false;
    },
  },
  filters: {
    numberFixed: function(item) {
      if (item != null) {
        return item.toFixed(2);
      } else {
        return "";
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
};
</script>
<style scoped>
.SingleMarketsTable {
  font-size: 13px;
}
.round-trust {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin: 0 auto;
}
.bg_green {
  background-color: #badc58;
}
.bg_red {
  background-color: #ff7979;
}
.bg_yellow {
  background-color: #ffc107;
}
.bg_white {
  background-color: #fff;
}
.popup_trust {
  border: 1px solid white;
  position: absolute;
  width: 150px;
  left: -100px;
  top: -50px;
  background: #000;
  z-index: 20000;
  padding: 5px;
}
</style>
