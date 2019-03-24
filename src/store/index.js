import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hobbysList: [],
    hobbysMatchList: Array.from(Array(2), () => Array(0)),
    hobbysResultList: []
  },
  getters: {
    getAlphabetList () {
      let result = []
      for (let i = 65; i <= 90; i++) result.push({ text: String.fromCharCode(i) })
      return result
    },
    getHobbysMatchList (state, items) {
      console.log('getHobbysMatchList', state.hobbysMatchList, items)
      return state.hobbysMatchList
    }
  },
  actions: {
    async getHobbysList ({ commit }) {
      const response = await axios.get('http://localhost:4000/hwahae/100')

      this.state.hobbysList.push(response.data)
      commit('getHobbysList')
    }
  },
  mutations
})

export default store
