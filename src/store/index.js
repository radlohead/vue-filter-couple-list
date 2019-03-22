import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hobbysList: [],
    matchHobbysList: []
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
      const response = await axios.get('http://localhost:4000/hwahae/3')
      console.log(response.data)
      this.state.hobbysList.push(response.data)
      commit('getHobbysList')
    }
  },
  mutations: {
    getHobbysList (state) {
      state.hobbysList = state.hobbysList
        .flat()
        .map(v => v.split('').sort())
        .map(v => v.join(''))
      console.log(JSON.parse(JSON.stringify(state.hobbysList)))
    },
    handleChangeHobbysListFilter (state, items) {
      console.log('handleChangeHobbysListFilter', items.value)
    }
  }
})

export default store
