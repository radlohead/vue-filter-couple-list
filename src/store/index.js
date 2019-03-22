import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hobbysList: []
  },
  actions: {
    async getHobbysList ({ commit }) {
      let response = null
      try {
        response = await fetch('https://recurit.hwahae.co.kr/3')
      } catch (err) {
        console.log(err)
        return
      }
      console.log(response.body)
      commit('getHobbysList', response.body)
    }
  },
  mutations: {
    getHobbysList (state) {
      console.log(state)
    }
  }
})

export default store
