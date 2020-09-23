import Vue from "vue";
import App from "./App.vue";
import "./quasar";
import { Quasar, QCard, QCardSection } from "quasar";

export const bus = new Vue();
Vue.config.productionTip = false;

Vue.use(Quasar, {
  components: {
    QCard,
    QCardSection,
  },
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
