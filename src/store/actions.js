import axios from 'axios'

export const HOBBYS_FILTER = 'HOBBYS_FILTER'

export default {
  async getHobbysList ({ commit }) {
    const response = await axios.get('http://mynode2-env.q5kasmz2p2.ap-northeast-2.elasticbeanstalk.com/hwahae/100')

    this.state.hobbysList.push(response.data)
    commit('getHobbysList')
  }
}
