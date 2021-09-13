<template>
  <div>
    <route-loading-indicator :isLoading="showRouteLoading" />
    <div  class="detailed-user-page pa-6 py-md-6 px-md-8">
      <h2 class="d-flex align-center mb-8">
        <v-icon
          class="mr-2"
          color="primary"
          large>
          mdi-account-details
        </v-icon>
        <div>
          <router-link :to="usersRoute">Users</router-link>
          <v-slide-x-transition>
            <span v-if="!showRouteLoading"> > {{detailedUser.name}}</span>
          </v-slide-x-transition>
        </div>
      </h2>
      <v-slide-y-reverse-transition>
        <div v-if="!showRouteLoading">
          <v-row class="justify-space-around align-stretch mb-12">
            <v-col
              v-for="card in detailedUserInfoCardComponents"
              :key="card"
              cols="12"
              sm="6"
              md="4">
              <component
                :is="card"
                :detailed-user="detailedUser">
              </component>
            </v-col>
          </v-row>
          <div class="mb-12">
            <h2 class="mb-4">Posts by {{detailedUser.name}}</h2>
            <circle-loader v-if="isFetchingPostsForDetailedUser"/>
            <v-slide-y-reverse-transition>
              <v-row v-if="!isFetchingPostsForDetailedUser">
                <v-col
                  v-for="post in postsForDetailedUser"
                  :key="`post-${post.id}`"
                  cols="12"
                  sm="6"
                  md="4">
                  <detailed-user-post-card
                    :post="post">
                  </detailed-user-post-card>
                </v-col>
              </v-row>
            </v-slide-y-reverse-transition>
          </div>
        </div>
      </v-slide-y-reverse-transition>
    </div>
  </div>
</template>

<script>

import {ModuleNames} from '@/constants/store'
import {RouteNames} from '@/constants/router'
import {Timeouts} from '@/constants/timeouts'
import {mapActions, mapGetters} from 'vuex'
import {DetailedUserActionNames, DetailedUserGetterNames} from '@/store/detailed-user/keys'

import RouteLoadingIndicator from '@/components/common/route-loading-indicator'
import CircleLoader from '@/components/common/circle-loader'
import DetailedUserContactCard from '@/components/detailed-user/detailed-user-contact-card'
import DetailedUserAddressCard from '@/components/detailed-user/detailed-user-address-card'
import DetailedUserCompanyCard from '@/components/detailed-user/detailed-user-company-card'
import DetailedUserPostCard from '@/components/detailed-user/detailed-user-post-card'


export default {

  components: {
    RouteLoadingIndicator,
    CircleLoader,
    DetailedUserContactCard,
    DetailedUserAddressCard,
    DetailedUserCompanyCard,
    DetailedUserPostCard,
  },

  data() {
    return {
      usersRoute: {name: RouteNames.Users},
      isFetchingDetailedUser: true,
      isFetchingPostsForDetailedUser: true,
      detailedUserInfoCardComponents: [
        'detailed-user-contact-card',
        'detailed-user-address-card',
        'detailed-user-company-card'
      ]
    }
  },

  computed: {
    userId() {
      return this.$route.params.user_id;
    },
    showRouteLoading() {
      return this.isFetchingDetailedUser;
    },
    ...mapGetters(ModuleNames.DetailedUser, {
      detailedUser: DetailedUserGetterNames.DetailedUser,
      postsForDetailedUser: DetailedUserGetterNames.DetailedUserPosts,
    })
  },

  async mounted() {
    await this[DetailedUserActionNames.GetDetailedUser](this.userId);
    setTimeout(() => {
      this.isFetchingDetailedUser = false;
    }, Timeouts.OneSecond)
    await this[DetailedUserActionNames.GetDetailedUserPosts](this.userId);
    setTimeout(() => {
      this.isFetchingPostsForDetailedUser = false;
    }, Timeouts.TwoSeconds)

  },

  methods: {
    ...mapActions(ModuleNames.DetailedUser, [
      DetailedUserActionNames.GetDetailedUser,
      DetailedUserActionNames.GetDetailedUserPosts,
    ])
  }

}

</script>

<style lang="scss" scoped>

.detailed-user-page {
  max-width: $wide-width;
}

</style>