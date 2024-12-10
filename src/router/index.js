import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/exchanges",
    name: "Exchanges",
    component: () =>
      import(/* webpackChunkName: "exchanges" */ "../views/Exchanges.vue"),
  },
  {
    path: "/tools",
    name: "Tools",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Tools.vue"),
  },
  {
    path: "/recources",
    name: "Recources",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Recources.vue"),
  },
  {
    path: "/learn",
    name: "Learn",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Learn.vue"),
  },
  {
    path: "/community",
    name: "Community",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Community.vue"),
  },
  {
    path: "/watchlist",
    name: "WatchList",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/WatchList.vue"),
  },
  {
    path: "/singleCoin/:coin",
    name: "SingleCoin",
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/SingleCoin.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
