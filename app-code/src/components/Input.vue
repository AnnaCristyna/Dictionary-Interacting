<template>
  <div class="flex-row col-xs-6">
    <q-input class="input" borderless v-model="input" label="Pesquisar" />
    <q-btn class="btn" icon="search" v-on:click="handleInput(input)" />
  </div>
</template>

<style lang="scss">
.input {
  background-color: #f6f6f6;
  padding-left: 2%;
  width: 80%;
}
</style>

<script>
import { bus } from "../main";
import json from "../json/synonyms.json";

export default {
  name: "Input",
  props: {
    wordForChart: {
      type: String,
    },
    wordForMean: {
      type: String,
    },
  },
  data() {
    return { json: json };
  },
  methods: {
    handleInput(input) {
      const word = input.toUpperCase();
      // const wordPoint = word + ".";
      // const data = json.nodes.filter((item) => item.name === wordPoint);
      // console.log(input);
      if (input) {
        this.wordForView = input;
        bus.$emit("wordForChart", input);
        this.wordForMean = word;
        bus.$emit("wordForMean", word);
      }
    },
  },
};
</script>
