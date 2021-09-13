import {service} from '@/api/service'
import {ModuleNames} from '@/constants/store'
import {
  UserStoreKeys,
  UserActionNames,
  UserMutationNames,
  UserGetterNames
} from "@/store/users/keys"


const state = {
  [UserStoreKeys.Users]: [],
}

const actions = {
  async [UserActionNames.GetUsers]({commit}) {
    const results = await service({
      method: 'get',
      url: 'users'
    })
    if(results) {
      commit(UserMutationNames.UpdateUsers, results);
    }
  }
}

const mutations = {
  [UserMutationNames.UpdateUsers](state, payload) {
    state[UserStoreKeys.Users] = payload
  }
}

const getters = {
  [UserGetterNames.Users](state) {
    return state[UserStoreKeys.Users]
  },
}

export default {
  name: ModuleNames.Users,
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}