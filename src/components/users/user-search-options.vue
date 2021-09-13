<template>
  <v-form>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          :value="searchFieldText"
          class="mr-md-6"
          label="Search Users"
          hint="Search by name, username, or email"
          color="secondary"
          prepend-icon="mdi-magnify"
          clearable
          @input="updateSearchFieldText">
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          :value="sortByParam"
          :items="sortByParams"
          item-text="label"
          item-value="value"
          label="Sort Users"
          color="secondary"
          prepend-icon="mdi-sort-alphabetical-ascending"
          @change="updateSortByParam">
        </v-select>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>

import {UserSortParams} from '@/constants/users'

export default {

  props: {
    searchFieldText: {
      type: String,
      default: '',
    },
    sortByParam: {
      type: String,
      default: '',
    }
  },

  data() {
    return {
      sortByParams: [
        {label: 'By name', value: UserSortParams.Name},
        {label: 'By username', value: UserSortParams.Username},
        {label: 'By email', value: UserSortParams.Email},
      ]
    }
  },

  methods: {
    updateSearchFieldText(e) {
      this.$emit('update:searchFieldText', e)
    },
    updateSortByParam(e) {
      this.$emit('update:sortByParam', e)
    }
  }

}

</script>