import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    coins: [],
    user: {},
  },
  getters: {
    getUser: (state) => {
      return state.user;
    },
  },
  mutations: {
    ADD_USER: (state, payload) => {
      state.user = payload;
      // let localeStore = JSON.parse(localStorage.getItem("watchList"));

      // for (var i = 0; i < localeStore.length; i++) {
      //   axios
      //     .get(`https://api.coingecko.com/api/v3/coins/${localeStore[i]}`)
      //     .then((response) => {
      //       let posts = response.data;
      //       state.coins.push(posts);
      //     });
      // }
    },
    /*     ADD_NAME: (state, payload) => {
      state.coins.push(payload);
    }, */
  },
  actions: {
    ADD_USER: async (context, payload) => {
      context.commit("ADD_USER", payload);
      /* context.commit("SET_NAME", payload); */
      /*       let localeStore = JSON.parse(localStorage.getItem("watchList"));
      for (var i = 0; i < localeStore.length; i++) {
        let { test } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${localeStore[i]}`
        );
      }
      context.commit("SET_NAME", test); */
      /*       Promise.all().then(values => {
        console.log(values)
      }) */
      /*       context.dispatch("SET_NAME", payload);
       */
    },
    /*     ADD_NAME: async (context, payload) => {
      let localeStore = JSON.parse(localStorage.getItem("watchList"));
      for (var i = 0; i < localeStore.length; i++) {
        let { test } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${localeStore[i]}`
        );
      }
      context.commit("ADD_NAME", payload);
    }, */
  },
});
