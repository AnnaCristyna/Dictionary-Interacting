<template>
  <q-layout view="lHh Lpr lFf">
    <Header />
    <q-page-container>
      <DataVisualization />
      <div class="flex-row absolute-bottom">
        <Subtitle />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from "./components/Header.vue";
// import ExportData from "./components/ExportData.vue";
import Subtitle from "./components/Subtitle.vue";
import DataVisualization from "./components/DataVisualization.vue";

export default {
  name: "LayoutDefault",

  components: {
    Header,
    // ExportData,
    Subtitle,
    DataVisualization,
  },

  data() {
    return {};
  },
};
</script>

<style></style>
