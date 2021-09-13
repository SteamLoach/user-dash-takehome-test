<template>
  <v-card height="100%">
    <v-card-title class="post-title">
      {{post.title}}
    </v-card-title>
    <v-card-text
      class="d-flex align-start">
      {{post.body}}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped>

.post-title {
  text-transform: capitalize;
}

</style>