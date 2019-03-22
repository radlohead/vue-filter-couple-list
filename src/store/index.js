import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hobbysList: []
  },
  actions: {
    async getHobbysList ({ commit }) {
      const response = await axios.get('http://localhost:4000/hwahae/3')
      console.log(response.data)
      this.state.hobbysList.push(response.data)
      commit('getHobbysList')
    }
  },
  mutations: {
    getHobbysList (state) {
      console.log(JSON.parse(JSON.stringify(state.hobbysList[0])))
    }
  }
})

export default store
