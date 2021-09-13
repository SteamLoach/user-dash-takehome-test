<template>
  <v-card
    min-height="150"
    height="100%">
    <v-card-title>
      Address
    </v-card-title>
    <v-card-text class="d-flex align-start">
      <v-icon
        class="mr-2"
        large
        color="primary">
        mdi-map-marker-outline
      </v-icon>
      <div>
        <template v-for="item in addressMap">
          <span :key="`address-${item.value}`">
            {{detailedUser.address[item.value]}}
          </span>
          <br
            v-if="item.lineBreak"
            :key="`linebreak-${item.value}`" />
        </template>
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
  data() {
    return {
      addressMap: [
        {value: 'suite'},
        {value: 'street', lineBreak: true},
        {value: 'city'},
        {value: 'zipcode'}
      ],
    }
  }
}
</script>