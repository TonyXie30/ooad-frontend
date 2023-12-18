const state = {
  username: ''
}

const mutations = {
  SET_USERNAME: (state, username) => {
    state.username = username
  }
}

const actions = {
  setRealUser({ commit }, data) {
    commit('SET_USERNAME', data)
  }
}

export default {
  namespaced: true,
  mutations,
  state,
  actions
}
