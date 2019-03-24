import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hobbysList: [],
    hobbysMatchList: Array.from(Array(2), () => Array(0)),
    hobbysResultList: []
  },
  actions,
  getters,
  mutations
})

export default store
