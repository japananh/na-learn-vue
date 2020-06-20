import Vue from "vue";
import Vuex from "vuex";
// import * as user from "@/store/modules/user";
// import * as event from "@/store/modules/event";
// import * as notification from "@/store/modules/notification";
import modules from "./modules/index";

Vue.use(Vuex);

export default new Vuex.Store({
  // devide store into small stores
  // modules: {
  //   user,
  //   event,
  //   notification,
  // },
  modules,
  state: {
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community",
    ],
  },
});
