<template>
  <div ref="myDiv" class="fixed-center">
    <svg id="svg" width="1000" height="700"></svg>
  </div>
</template>

<style lang="scss"></style>

<script>
import { bus } from "../main";
import makeChart from "../assets/makeChart";
import nodesDataWild from "../json/Words.json";
import links1Wild from "../json/synonyms.json";
import links2Wild from "../json/antonyms.json";

export default {
  name: "DataVisualization",
  props: {
    wordToView: {
      type: String,
    },
  },
  watch: {
    wordToView: function() {
      const dataNode = filter(nodesDataWild, this.wordToView);
      const links1 = filter(links1Wild, this.wordToView);
      const links2 = filter(links2Wild, this.wordToView);
      let linksData = links1.concat(links2);
      function filter(data, word) {
        const dataFiltered = data.filter((item) => {
          return item.word === word || item.source === word;
        });
        return dataFiltered;
      }
      let nodes = linksData.map((item) => {
        return {
          word: item.target,
        };
      });
      let nodesData = nodes.concat(dataNode);
      makeChart(nodesData, linksData);
    },
  },

  created() {
    bus.$on("wordForChart", (word) => {
      this.wordToView = word;
    });
  },
};
</script>
