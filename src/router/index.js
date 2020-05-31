import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "@/views/EventList.vue";
import NProgress from "nprogress";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
  },
  {
    path: "/event/create",
    name: "event-create",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "event-create" */ "@/views/EventCreate.vue"),
  },
  {
    path: "/event/:id",
    name: "event-show",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "event-show" */ "@/views/EventShow.vue"),
    props: true,
    // Solution 3: Global and Per-Route Guards
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch("event/fetchEvent", routeTo.params.id).then(() => {
        next();
      });
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
