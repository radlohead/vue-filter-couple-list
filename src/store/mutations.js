export default {
  getHobbysList (state) {
    state.hobbysList = stringListSort(state)
    console.log(JSON.parse(JSON.stringify(state.hobbysList)))
  },
  handleChangeHobbysListFilter (state, items) {
    console.log('handleChangeHobbysListFilter', items.value)
  }
}

const stringListSort = (state) => {
  return state.hobbysList
    .flat()
    .map(v => v.split('').sort())
    .map(v => v.join(''))
}
