<template>
  <v-card
    height="100%"
    min-height="150">
    <v-card-title>
      Company
    </v-card-title>
    <v-card-text class="d-flex align-start">
      <v-icon
        class="mr-2"
        large
        color="primary">
        mdi-briefcase-outline
      </v-icon>
      <div>
        <b>{{detailedUser.company.name}}</b>
        <div>{{detailedUser.company.bs}}</div>
        <i>"{{detailedUser.company.catchPhrase}}"</i>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    detailedUser: {
      type: Object,
      required: true,
    }
  },
}
</script>