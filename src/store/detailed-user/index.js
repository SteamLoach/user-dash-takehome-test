import {service} from '@/api/service'
import {ModuleNames} from '@/constants/store'
import {
  DetailedUserStoreKeys,
  DetailedUserActionNames,
  DetailedUserMutationNames,
  DetailedUserGetterNames
} from "@/store/detailed-user/keys"


const state = {
  [DetailedUserStoreKeys.DetailedUser]: {},
  [DetailedUserStoreKeys.DetailedUserPosts]: [],
}

const actions = {
  async [DetailedUserActionNames.GetDetailedUser]({commit}, userId) {
    const results = await service({
      method: 'get',
      url: `users/${userId}`
    })
    if(results) {
      commit(DetailedUserMutationNames.UpdateDetailedUser, results);
    }
  },
  async [DetailedUserActionNames.GetDetailedUserPosts]({commit}, userId) {
    const results = await service({
      method: 'get',
      url: `posts?userId=${userId}`
    })
    if(results) {
      commit(DetailedUserMutationNames.UpdateDetailedUserPosts, results);
    }
  }
}

const mutations = {
  [DetailedUserMutationNames.UpdateDetailedUser](state, payload) {
    state[DetailedUserStoreKeys.DetailedUser] = payload;
  },
  [DetailedUserMutationNames.UpdateDetailedUserPosts](state, payload) {
    state[DetailedUserStoreKeys.DetailedUserPosts] = payload;
  }
}

const getters = {
  [DetailedUserGetterNames.DetailedUser](state) {
    return state[DetailedUserStoreKeys.DetailedUser];
  },
  [DetailedUserGetterNames.DetailedUserPosts](state) {
    return state[DetailedUserStoreKeys.DetailedUserPosts];
  },
}

export default {
  name: ModuleNames.DetailedUser,
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}