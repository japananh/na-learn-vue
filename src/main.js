import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaseIcon from "@/components/BaseIcon";
import "nprogress/nprogress.css";
import Vuelidate from "vuelidate";

import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

import DateFilter from "@/filters/date";

// Use global filter
Vue.filter("date", DateFilter);

Vue.component("BaseIcon", BaseIcon);

// Allow all components use vuelidate
Vue.use(Vuelidate);

/* Global mixin runs in every components
 * Use it with caution
 */
// Vue.mixin({
//   mounted() {
//     console.log("Nana uses mixin.");
//   },
// });

const requireComponent = require.context(
  // The relative path of the components folder
  "./components",
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName);

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  );
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
