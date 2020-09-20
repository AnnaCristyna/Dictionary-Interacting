<template>
  <div>
    <q-btn
      :loading="loading2"
      :percentage="percentage2"
      round
      class="btn text-white on-right q-mx-lg"
      size="140%"
      @click="startComputing(2)"
      icon="cloud_download"
    />
  </div>
</template>

<style></style>

<script>
export default {
  name: "ExportData",
};
</script>
