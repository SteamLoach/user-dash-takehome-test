<template>
  <div class="route-loading-indicator">
    <v-progress-linear
      v-if="isLoading"
      indeterminate
      height="5"
      color="secondary">
    </v-progress-linear>
  </div>
</template>

<script>

export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    }
  }
}

</script>

<style lang="scss" scoped>

  .route-loading-indicator {
    min-height: 5px;
  }

</style>