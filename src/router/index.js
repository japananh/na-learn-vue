import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "@/views/EventList";
import NotFound from "@/views/NotFound";
import NetworkIssue from "@/views/NetworkIssue";
import NProgress from "nprogress";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
    props: true,
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
      store
        .dispatch("event/fetchEvent", routeTo.params.id)
        .then(event => {
          /*
           * Get "event" from "return" at event.js
           * Set event as a prop of event-show
           * Make it easy to test because we only need to debug api call here
           */
          routeTo.params.event = event;
          next();
        })
        // Redireact to 404 page or network-issue page
        .catch(error => {
          if (error.response && error.response.status === "404") {
            next({ name: "404", params: { resource: "event" } });
          } else {
            next({ name: "network-issue" });
          }
        });
    },
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
    props: true,
  },
  {
    path: "/network-issue",
    name: "network-issue",
    component: NetworkIssue,
  },
  // Catch all navigation that doesn't match
  {
    path: "*",
    redirect: { name: "404", params: { resource: "page" } },
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
