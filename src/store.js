import Vuex from 'vuex';

export default new Vuex.Store({
    state: {
        userData: {}
    },
    mutations: {
        setUserData(state, userData) {
            state.userData = userData;
        }
    },
    getters: {
      getUserData(state) {
          return state.userData
      }
    },
    actions: {
        saveUserData({ commit }, userData) {
            commit('setUserData', userData);
        }
    }
});