import Vue from "vue";
import App from "./App.vue";
import "./quasar";
import axios from "axios";
import cors from "cors";

import { Quasar, QCard, QCardSection } from "quasar";
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

Vue.use(cors);
Vue.use(Quasar, {
  components: {
    QCard,
    QCardSection,
  },
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");

export const bus = new Vue();
