import store from './index'

export default {
  getHobbysList (state) {
    state.hobbysList = stringListSort(state)
    state.hobbysList = state.hobbysList.map((v, i) => {
      return Object.assign({
        id: i + 1,
        hobbys: v
      })
    })
    getHobbysMatchList(state)
  },
  handleChangeHobbysListFilter (state, items) {
    if (items.value) {
      state.hobbysResultList = state.hobbysMatchList.filter(v => {
        return v.left.includes(items.value) && v.right.includes(items.value)
      })
    }
    console.log('handleChangeHobbysListFilter', JSON.parse(JSON.stringify(state.hobbysResultList)), items.value)
  }
}

const stringListSort = (state) => {
  return state.hobbysList
    .flat()
    .map(v => v.split('').sort())
    .map(v => v.join('')).sort()
}

const getHobbysMatchList = (state) => {
  hobbysAllMatchList(state)
  state.hobbysMatchList = state.hobbysMatchList.map(s => s.map(v => v.sort((a, b) => a.id - b.id)))
  hobbysAllMatchSetList(state)

  hobbysRestMatchList(state)
  hobbysRestMatchSetList(state)
  state.hobbysMatchList = state.hobbysMatchList[0] || state.hobbysMatchList[1]
  state.hobbysResultList = state.hobbysMatchList
  console.log(JSON.parse(JSON.stringify(state.hobbysResultList)))
}

const hobbysAllMatchSetList = (state) => {
  let hobbysMatchList = state.hobbysMatchList
  let temp = []

  for (const hobbys of Array.from(hobbysMatchList[0])) {
    if (hobbys.length > 2) {
      hobbys.forEach((v, i, arr) => {
        temp.push({
          matched: `${hobbys[i !== 2 ? 0 : 1].id}-${hobbys[!i ? 1 : 2].id}`,
          left: hobbys[i !== 2 ? 0 : 1].hobbys,
          right: hobbys[!i ? 1 : 2].hobbys
        })
      })
      continue
    }
    temp.push({
      matched: `${hobbys[0].id}-${hobbys[1].id}`,
      left: hobbys[0].hobbys,
      right: hobbys[1].hobbys
    })
  }
  state.hobbysMatchList[0] = temp
}

const hobbysAllMatchList = (state) => {
  const hobbysList = store.state.hobbysList
  const hobbysMatchList = store.state.hobbysMatchList
  let index = Array.slice(store.state.hobbysList).length
  let temp = []

  while (--index > 0) {
    if (hobbysList[index].hobbys === hobbysList[index - 1].hobbys) {
      temp.unshift([
        {
          id: hobbysList[index - 1].id,
          hobbys: hobbysList[index - 1].hobbys
        },
        {
          id: hobbysList[index].id,
          hobbys: hobbysList[index].hobbys
        }
      ])
      hobbysList.splice(index - 1, 2)
    }
  }
  temp.forEach(v => {
    hobbysList.forEach((obj, i) => {
      if (v[0].hobbys === obj.hobbys) {
        v.push(JSON.parse(JSON.stringify(obj)))
        hobbysList.splice(i, 1)
      }
    })
  })
  hobbysMatchList[0] = temp
  console.log(JSON.parse(JSON.stringify(hobbysMatchList)))
}

const hobbysRestMatchSetList = (state) => {
  let hobbysMatchList = state.hobbysMatchList
  let temp = []

  for (const hobbys of Array.from(hobbysMatchList[1])) {
    temp.push({
      matched: `${hobbys[0].id}-${hobbys[1].id}`,
      left: hobbys[0].hobbys,
      right: hobbys[1].hobbys
    })
  }
  state.hobbysMatchList[1] = temp
}

const hobbysRestMatchList = (state) => {
  let hobbysImmutableLength = state.hobbysList[0].hobbys.length
  let hobbysMutableLength = Number(hobbysImmutableLength) - 1

  while (hobbysMutableLength > 0) {
    hobbysMatchList(state)
    if (state.hobbysMatchList[1].length) break
    --hobbysMutableLength
  }
}

const hobbysMatchList = (state) => {
  let hobbysImmutableLength = state.hobbysList[0].hobbys.length
  let hobbysMutableLength = Number(hobbysImmutableLength) - 1
  let index = state.hobbysList.slice().length

  while (--index > 1) {
    for (let i = index - 1; i >= 0; --i) {
      if (!state.hobbysList[i].hobbys.match(new RegExp(`[${state.hobbysList[index].hobbys}]`, 'g'))) continue
      if (state.hobbysList[i].hobbys.match(new RegExp(`[${state.hobbysList[index].hobbys}]`, 'g')).length === hobbysMutableLength) {
        state.hobbysMatchList[Math.abs(hobbysMutableLength - hobbysImmutableLength)].push([
          {
            id: state.hobbysList[i].id,
            hobbys: state.hobbysList[i].hobbys
          },
          {
            id: state.hobbysList[index].id,
            hobbys: state.hobbysList[index].hobbys
          }
        ])
        state.hobbysList.splice(index, 1)
        state.hobbysList.splice(i, 1)
        --index
        break
      }
    }
  }
}
