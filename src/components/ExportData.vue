<template>
  <div>
    <q-btn
      :loading="loading2"
      :percentage="percentage2"
      round
      class="btn text-white on-right q-mx-lg"
      size="140%"
      @click="svgToPng"
      icon="cloud_download"
      id="download"
    />
  </div>
</template>

<style></style>

<script>
import { select } from "d3";
import save from "../assets/saveSvgAsPng";
export default {
  name: "ExportData",
  methods: {
    svgToPng() {
      // **** saveSvgAsPng ****
      save.saveSvgAsPng(select("svg").node(), "myDrawing.png");
    },
  },
};
</script>
