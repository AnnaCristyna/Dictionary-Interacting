<template>
  <div>{{ this.dataToView }}</div>
</template>

<style></style>

<script>
import { bus } from "../main";
export default {
  name: "DataVisualizaton",
  props: {
    dataToView: {
      type: Object,
    },
  },
  created() {
    bus.$on("changeChart", (data) => {
      this.dataToView = data;
    });
  },
};
</script>
