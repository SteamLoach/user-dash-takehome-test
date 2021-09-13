<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h1>
        <router-link :to="homeRoute">
          <span class="white--text">User Dashboard</span>
        </router-link>
      </h1>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import {RouteNames} from '@/constants/router'

export default {

  name: 'App',

  data() {
    return {
      homeRoute: {
        name: RouteNames.Users
      }
    }
  }

};

</script>

<style lang="scss">

.v-application {
   font-family: $body-font-family, sans-serif !important;
 }

</style>
