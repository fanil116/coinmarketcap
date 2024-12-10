<template>
  <div class="header">
    <div class="col-1">
      <p class="logo">FB</p>
    </div>
    <div id="nav" class="col-5">
      <router-link to="/" class="mr-3">Market</router-link>
      <router-link to="/exchanges" class="mr-3">Exchanges</router-link>
      <router-link to="/tools" class="mr-3">Tools</router-link>
      <router-link to="/recources" class="mr-3">Recources</router-link>
      <router-link to="/learn" class="mr-3">Learn</router-link>
      <router-link to="/watchlist" class="mr-3">WatchList</router-link>
    </div>
    <div class="d-flex align-items-center col-6 justify-content-end">
      <!--       <div class="d-flex align-items-center">
        <p class="text-grey">Show in</p>
        <select name="currency" id="cur">
          <option value="USD" selected>USD</option>
          <option value="Rub">RUB</option>
          <option value="Eur">EURO</option>
        </select>
      </div> -->
      <div class="ml-3">
        <select name="language" id="lang">
          <option value="Eng" selected>English</option>
          <option value="Rus">Русский</option>
        </select>
      </div>
      <div
        class="ml-3 cursor-pointer search d-flex align-items-center position-relative"
      >
        <img src="../assets/search.png" alt="" @click="toggleInput" />
        <input
          class="search__input ml-2"
          type="text"
          name="search"
          id=" search"
          placeholder="Search"
          @input="resultShow"
          v-show="input_active"
          v-model="search"
          autocomplete="off"
        />
        <div class="block__search" v-if="result_active">
          <div v-for="item in tableSorted" :key="item.market_cap_rank">
            <SearchCoinTable :item="item" />
          </div>
        </div>
      </div>
      <div class="mx-3">
        <img src="../assets/Dark-mode.png" alt="" />
      </div>
      <div class="d-flex mr-5 align-items-center" v-if="userIsLogin">
        {{ login }}
        <div @click="exit" class="ml-2 cursor-pointer signUp">Log out</div>
      </div>
      <div class="d-flex mr-5 align-items-center" v-else>
        <p class="cursor-pointer" @click="logShow">Log in</p>
        <p class="ml-3 signUp cursor-pointer" @click="signShow">Sign Up Free</p>
        <LogIn @addUser="isUser" v-show="logActive" />
        <SignUp
          v-show="signActive"
          @closeSignup="signShow"
          @openLogin="logShow"
        />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import SearchCoinTable from "@/components/SearchCoinTable.vue";
import LogIn from "@/components/LogIn.vue";
import SignUp from "@/components/SignUp.vue";
export default {
  name: "Header",
  components: {
    SearchCoinTable,
    LogIn,
    SignUp,
  },
  data: () => ({
    input_active: false,
    result_active: false,
    posts: [],
    allCoins: [],
    searchCoins: [],
    search: "",
    sortBy: "market_cap_rank",
    userIsLogin: false,
    login: "",
    password: "",
    arrUser: null,
    logActive: false,
    signActive: false,
  }),
  created() {
    for (var i = 1; i < 27; i++) {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${i}&sparkline=false`
        )
        .then((response) => {
          this.posts = response.data;
          for (var i = 0; i < this.posts.length; i++) {
            if (this.posts[i].market_cap_rank !== null) {
              this.allCoins.push(this.posts[i]);
            }
          }
        });
    }
  },
  mounted() {
    this.isUser();
    document.addEventListener("click", (e) => {
      this.toggleSearchBlock(e);
    });
  },
  methods: {
    logShow() {
      console.log("asd");
      this.logActive = !this.logActive;
    },
    signShow() {
      this.signActive = !this.signActive;
    },

    isUser() {
      this.arrUser = JSON.parse(localStorage.getItem("User"));

      if (this.arrUser) {
        this.login = this.arrUser.name;
        this.loginShow();
      }
    },
    exit() {
      this.userIsLogin = false;
      this.login = "";
      this.arrUser.length = 0;
      this.logActive = false;
      localStorage.removeItem("User");
      let user = {};
      this.$store.dispatch("ADD_USER", user);
    },
    searchCoin() {
      this.searchCoins = this.allCoins.filter((coin) => {
        const regex = new RegExp(this.search, "gi");
        return (
          coin.name.match(regex) ||
          coin.id.match(regex) ||
          coin.symbol.match(regex)
        );
      });
    },
    toggleSearchBlock(e) {
      let parent = document.querySelector(".search");
      if (!parent.contains(e.target)) {
        this.result_active = false;
      }
    },
    toggleInput() {
      this.input_active = !this.input_active;
      if (this.input_active == false) {
        this.result_active = false;
      }
    },
    resultShow() {
      this.result_active = true;
    },

    loginShow() {
      this.userIsLogin = true;
    },
  },
  computed: {
    tableSorted: function() {
      const sortBy = this.sortBy;
      if (!sortBy) return this.searchCoins;
      return this.searchCoins
        .slice(0)
        .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
    },
  },
  watch: {
    search() {
      this.searchCoin();
    },
    logActive() {
      if (this.logActive) this.signActive = false;
    },
    signActive() {
      if (this.signActive) this.logActive = false;
    },
  },
};
</script>
<style>
.block__search {
  color: #000;
  position: absolute;
  min-width: 231px;
  width: min-content;
  min-height: 300px;
  max-height: max-content;
  top: 30px;
  right: -23px;
  background: #fff;
  z-index: 999999;
}
.search img {
  height: 24px;
}
div > p {
  margin-bottom: 0;
}
.text-grey {
  color: #565669;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
}

.logo {
  font-size: 40px;
  font-weight: bold;
  color: #fff;
  margin: 0;
}

#nav a {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #ffbe76;
  text-decoration: none;
}

select {
  color: white;
  background-color: transparent;
  border-color: transparent;
}
option {
  background-color: black;
  color: #fff;
}
.signUp {
  background: #7456e1;
  border-radius: 48px;
  padding: 12px 24px;
}
</style>
