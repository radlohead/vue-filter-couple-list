import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hobbysList: [],
    hobbysMatchList: Array.from(Array(10), () => Array(0))
  },
  getters: {
    getAlphabetList () {
      // console.log(JSON.parse(JSON.stringify(store.state.hobbysList)))
      let result = []
      for (let i = 65; i <= 90; i++) result.push({ text: String.fromCharCode(i) })
      return result
    }
  },
  actions: {
    async getHobbysList ({ commit }) {
      const response = await axios.get('http://localhost:4000/hwahae/10')

      this.state.hobbysList.push(response.data)
      commit('getHobbysList')
    }
  },
  mutations
})

export default store
