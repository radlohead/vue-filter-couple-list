import store from './index'
import { HOBBYS_FILTER } from './actions'

export default {
  getHobbysList (state) {
    state.hobbysList = stringListSort(state)
    state.hobbysList = state.hobbysList.map((hobbys, i) => {
      return {
        id: i + 1,
        hobbys
      }
    })
    getHobbysMatchList(state)
  },
  handleChangeHobbysListFilter (state, items) {
    if (items.value) {
      state.hobbysResultList = state.hobbysMatchList.filter(hobbysMatchData => {
        return hobbysMatchData.left.includes(items.value) && hobbysMatchData.right.includes(items.value)
      })
    }
    if (items.value === HOBBYS_FILTER) state.hobbysResultList = state.hobbysMatchList
  }
}

const stringListSort = (state) => {
  return state.hobbysList
    .flat()
    .map(hobbys => hobbys.split('').sort())
    .map(hobbysList => hobbysList.join('')).sort()
}

const getHobbysMatchList = (state) => {
  hobbysMatchListAll(state)

  if (state.hobbysMatchList[0].length) state.hobbysMatchList = state.hobbysMatchList[0]
  else state.hobbysMatchList = state.hobbysMatchList[1]
  state.hobbysResultList = state.hobbysMatchList.flat(1)
}

const hobbysMatchListAll = (state) => {
  hobbysAllMatchList(state)
  hobbysAllMatchSetList(state)

  hobbysRestMatchList(state)
  hobbysRestMatchSetList(state)
}

const hobbysAllMatchSetList = (state) => {
  let hobbysMatchList = state.hobbysMatchList
  let temp = []

  for (const hobbys of Array.from(hobbysMatchList[0])) {
    if (hobbys.length > 2) {
      hobbys.forEach((v, i) => {
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
  let index = Array.slice(store.state.hobbysList).length
  let temp = []

  while (--index > 0) {
    if (hobbysList[index].hobbys === hobbysList[index - 1].hobbys) {
      const idHobbysListObjParam = [hobbysList, index - 1, index]

      temp.unshift(
        idHobbysListObj(...idHobbysListObjParam)
      )
      hobbysList.splice(index - 1, 2)
      --index
    }
  }
  temp.forEach(tempObj => {
    hobbysList.forEach((hobbysListObj, i) => {
      if (tempObj[0].hobbys === hobbysListObj.hobbys) {
        tempObj.push(JSON.parse(JSON.stringify(hobbysListObj)))
        hobbysList.splice(i, 1)
      }
    })
  })
  store.state.hobbysMatchList[0] = temp
  hobbysAllMatchIdSortList(state)
}

const hobbysAllMatchIdSortList = (state) => {
  state.hobbysMatchList = state.hobbysMatchList.map(v => v.map(o => o.sort((a, b) => a.id - b.id)))
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
  if (!state.hobbysList[0]) return
  let hobbysMutableLength = Number(state.hobbysList[0].hobbys.slice().length) - 1

  while (hobbysMutableLength > 0) {
    hobbysMatchList(state, hobbysMutableLength)
    if (state.hobbysMatchList[1].length) break
    --hobbysMutableLength
  }
  hobbysMatchIdSortList(state)
}

const hobbysMatchIdSortList = (state) => {
  state.hobbysMatchList[1] = state.hobbysMatchList[1].sort((a, b) => a[0].id - b[0].id)
}

const hobbysMatchList = (state, hobbysMutableLength) => {
  const hobbysList = state.hobbysList
  let index = hobbysList.slice().length

  while (--index > 1) {
    for (let i = index - 1; i >= 0; --i) {
      const hobbysEachMatchList = hobbysList[i].hobbys.match(new RegExp(`[${hobbysList[index].hobbys}]`, 'g'))

      if (!hobbysEachMatchList) continue
      if (hobbysEachMatchList.length === hobbysMutableLength) {
        const idHobbysListObjParam = [hobbysList, i, index]

        state.hobbysMatchList[1].unshift(
          idHobbysListObj(...idHobbysListObjParam)
        )
        hobbysList.splice(index, 1)
        hobbysList.splice(i, 1)
        --index
        break
      }
    }
  }
}

const idHobbysListObj = (...param) => {
  const [hobbysList, firstIndex, lastIndex] = param

  return (
    [
      {
        id: hobbysList[firstIndex].id,
        hobbys: hobbysList[firstIndex].hobbys
      },
      {
        id: hobbysList[lastIndex].id,
        hobbys: hobbysList[lastIndex].hobbys
      }
    ]
  )
}
