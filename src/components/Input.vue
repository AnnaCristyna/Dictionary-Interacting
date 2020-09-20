<template>
  <div class="flex-row col-xs-6">
    <q-input class="input" borderless v-model="input" label="Pesquisar" />
    <q-btn class="btn" icon="search" v-on:click="handleSearch(input)" />
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
// import axios from "axios";
import { bus } from "../main";
const listaPalavras = [
  { id: 1, valor: "casa", relacionados: ["teto", "chão", "estrutura"] },
  { id: 2, valor: "garrafa", relacionados: ["bebida", "água", "sede"] },
];
export default {
  name: "Input",
  props: {
    dataToView: {
      type: Object,
    },
  },
  methods: {
    handleSearch(input) {
      console.log(input);
      const foundData = listaPalavras.find((item) => input === item.valor);
      console.log(foundData);
      this.dataToView = foundData;
      bus.$emit("changeChart", foundData);
    },
  },
};

// // axios // .get(`http://dicionario-aberto.net/search-json/palavra/random`) //
// .then((response) => { // // JSON responses are automatically parsed. //
// console.log(response.data); // this.posts = response.data; // }) // .catch((e)
// => { // this.errors.push(e); // });
// data() {
//   return {
//     posts: [],
//     errors: [],
//   };
// },
</script>
