export const HOBBYS_FILTER = 'HOBBYS_FILTER'

export default {
  async getHobbysList ({ commit }) {
    try {
      const hobbysResponse = await fetch('http://mynode2-env.q5kasmz2p2.ap-northeast-2.elasticbeanstalk.com/hwahae/100')
      const hobbys = await hobbysResponse.json()
      this.state.hobbysList.push(hobbys)
      commit('getHobbysList')
    } catch (err) {
      console.log('hobbs to fetch fail', err)
    }
  }
}
