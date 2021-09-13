import Vue from 'vue'
import Vuex from 'vuex'

import users from '@/store/users/index'
import detailedUser from '@/store/detailed-user/index'

import {ModuleNames} from '@/constants/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    [ModuleNames.Users]: users,
    [ModuleNames.DetailedUser]: detailedUser,
  }
})
