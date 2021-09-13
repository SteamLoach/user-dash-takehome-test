<template>
  <div>
    <route-loading-indicator :isLoading="showRouteLoading" />
    <v-row
      class="pa-6 py-md-6 px-md-8 justify-space-between"
      no-gutters>
      <v-col
        class="mb-2"
        cols="12"
        md="4">
        <h2 class="d-flex align-center primary--text">
          <v-icon
            class="mr-2"
            color="primary"
            large>
            mdi-account-group
          </v-icon>
          <span>Users</span>
        </h2>
      </v-col>
      <v-col
        cols="12"
        md="8"
        lg="6">
        <user-search-options
          :searchFieldText.sync="searchFieldText"
          :sortByParam.sync="sortByParam">
        </user-search-options>
      </v-col>
    </v-row>
    <v-divider class="mb-4"></v-divider>
    <v-slide-y-reverse-transition>
      <user-list
        v-if="!showRouteLoading"
        :users="usersBySearchText">
      </user-list>
    </v-slide-y-reverse-transition>
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import {UserActionNames, UserGetterNames} from '@/store/users/keys'

import {ModuleNames} from '@/constants/store'
import {Timeouts} from '@/constants/timeouts'
import {UserSearchableKeys, UserSortParams} from '@/constants/users'

import RouteLoadingIndicator from '@/components/common/route-loading-indicator'
import UserSearchOptions from '@/components/users/user-search-options'
import UserList from '@/components/users/user-list'

export default {

  components: {
    RouteLoadingIndicator,
    UserSearchOptions,
    UserList,
  },

  data() {
    return {
      isFetchingUsers: true,
      searchFieldText: '',
      searchableKeys: [
        UserSearchableKeys.Name,
        UserSearchableKeys.Username,
        UserSearchableKeys.Email,
      ],
      sortByParam: UserSortParams.Name,
    }
  },

  computed: {
    showRouteLoading() {
      return this.isFetchingUsers;
    },
    usersBySearchText() {
      return this.usersBySortParam.filter(user => {
        if(!this.searchFieldText) {return true}
        const searchTextRegExp = new RegExp(this.searchFieldText, 'i');
        return this.searchableKeys.some(key => searchTextRegExp.test(user[key]))
      })
    },
    usersBySortParam() {
      return this[UserGetterNames.Users].map(user => user).sort((a,b) => {
        return a[this.sortByParam] > b[this.sortByParam] ? 1 : -1;
      });
    },
    ...mapGetters(ModuleNames.Users, [
      UserGetterNames.Users,
    ])
  },

  async mounted() {
    await this[UserActionNames.GetUsers]();
    setTimeout(() => {
      this.isFetchingUsers = false;
    }, Timeouts.OneSecond)
  },

  methods: {
    ...mapActions(ModuleNames.Users, [
      UserActionNames.GetUsers,
    ])
  }

}

</script>