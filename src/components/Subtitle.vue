<template>
  <q-card class="my-card q-ml-lg">
    <q-card-section id="definition">
      {{ word }}
    </q-card-section>
  </q-card>
</template>

<style lang="scss"></style>

<script>
// import json from "../json/dictionary/json";
import { bus } from "../main";
export default {
  name: "Subtitle",
  pros: {
    wordForShow: {
      type: String,
    },
  },
  created() {
    bus.$on("wordToMeaning", (word) => {
      this.wordForShow = word;
    });
  },
  // mounted() {
  //   const meaning = json.
  // },
};
</script>
