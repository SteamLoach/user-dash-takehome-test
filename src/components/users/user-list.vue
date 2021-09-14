<template>
  <v-col cols="12">
    <v-list>
      <div
        v-if="noUsersToDisplay"
        class="my-12 mx-6 text-center text-subtitle-2">
        No users found, please try a different search criteria.
      </div>
      <template v-else>
        <v-list-item
          v-for="user in users"
          :key="`user-record-${user.id}`"
          class="user-list-item align-start pb-2"
          :to="getDetailedUserRoute(user)"
          :ripple="false"
          >
          <v-icon
            class="mr-2 mt-2"
            size="55"
            color="primary">
            mdi-account-circle
          </v-icon>
          <v-list-item-content>
            <v-row no-gutters>
              <v-col cols="12" md="6">
                <v-list-item-title>
                  {{user.name}}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{user.username}}
                </v-list-item-subtitle>
              </v-col>
              <v-col cols="12" md="6" class="d-flex justify-md-end">
                <v-list-item-action
                  class="primary--text text-subtitle-2">
                  <a
                    class="text-decoration-none"
                    :href="`mailto:${user.email.toLowerCase()}`"
                    :title="`email ${user.name}`"
                    @click.stop="() => {}">
                    {{user.email.toLowerCase()}}
                  </a>
                </v-list-item-action>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-col>
</template>

<script>

import {RouteNames} from '@/constants/router'

export default {

  props: {
    users: {
      type: Array,
      required: true,
    },
  },

  computed: {
    noUsersToDisplay() {
      return this.users.length <= 0;
    }
  },

  methods: {
    getDetailedUserRoute(user) {
      return {
        name: RouteNames.DetailedUser,
        params: {user_id: user.id}
      }
    }
  }

}
</script>

<style lang="scss" scoped>

.user-list-item {
  border-bottom: 1px solid $shade-light;
  &:nth-child(even) {
    background-color: $shade-lightest;
  }
}

</style>