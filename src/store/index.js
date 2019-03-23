import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hobbysList: [],
    hobbysMatchList: []
  },
  getters: {
    getAlphabetList () {
      // console.log(JSON.parse(JSON.stringify(store.state.hobbysList)))
      let result = []
      for (let i = 65; i <= 90; i++) result.push({ text: String.fromCharCode(i) })
      return result
    },
    getHobbysMatchList () {
      // return store.state.hobbysList
      return [
        {
          matched: '1-3',
          left: 'aadffaf',
          right: 'bvbgffg'
        },
        {
          matched: '2-3',
          left: 'aadffaf',
          right: 'bvbgffg'
        },
        {
          matched: '3-3',
          left: 'aadffaf',
          right: 'bvbgffg'
        },
        {
          matched: '4-3',
          left: 'aadffaf',
          right: 'bvbgffg'
        }
      ]
    }
  },
  actions: {
    async getHobbysList ({ commit }) {
      const response = await axios.get('http://localhost:4000/hwahae/3')
      console.log(response.data)
      this.state.hobbysList.push(response.data)
      commit('getHobbysList')
    }
  },
  mutations
})

export default store
