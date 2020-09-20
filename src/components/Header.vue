<template>
  <q-header elevated class="glossy">
    <div class="header text-white">
      <q-toolbar inset>
        <q-toolbar-title>Dicionário Interativo</q-toolbar-title>
        <Input />
      </q-toolbar>
    </div>
  </q-header>
</template>

<style lang=""></style>

<script>
import Input from "./Input.vue";
export default {
  name: "Header",
  components: {
    Input,
  },
};
</script>
