import $ from 'jquery'

export const HOBBYS_FILTER = 'HOBBYS_FILTER'

export default {
  getHobbysList ({ commit }) {
    $.getJSON('https://recurit.hwahae.co.kr/100', (response) => {
      this.state.hobbysList.push(response)
      commit('getHobbysList')
    })
  }
}
