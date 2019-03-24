import axios from 'axios'

export default {
  async getHobbysList ({ commit }) {
    const response = await axios.get('http://localhost:4000/hwahae/100')

    this.state.hobbysList.push(response.data)
    commit('getHobbysList')
  }
}
