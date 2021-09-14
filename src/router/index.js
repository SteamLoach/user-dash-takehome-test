import Vue from 'vue'
import VueRouter from 'vue-router'

import {RoutePaths, RouteNames} from '@/constants/router'

import Users from '@/pages/users/index.vue'
import DetailedUser from '@/pages/_detailed-user/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: RoutePaths.Users,
    name: RouteNames.Users,
    component: Users
  },
  {
    path: RoutePaths.DetailedUser,
    name: RouteNames.DetailedUser,
    component: DetailedUser,
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior () {
    return {x: 0, y: 0}
  },
})

export default router
