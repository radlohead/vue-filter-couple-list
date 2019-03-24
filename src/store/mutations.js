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
    // store._wrappedGetters.getHobbysMatchList(items.value)
    if (items.value) {
      state.hobbysResultList = state.hobbysMatchList[1]
    }
    console.log('handleChangeHobbysListFilter', JSON.parse(JSON.stringify(state.hobbysMatchList)), items.value)
  }
}

const stringListSort = (state) => {
  return state.hobbysList
    .flat()
    .map(v => v.split('').sort())
    .map(v => v.join('')).sort()
}

const getHobbysMatchList = (state) => {
  // 2.10개의 취미가 일치한 데이터와 남은 데이터를 비교해서 같은 데이터가 있다면 id, hobbys키 값을 가진 객체로 1번 배열에 저장
  hobbysAllMatchList(state)
  hobbysAllMatchSetList(state)
  // 3.9개 취미부터 일치하는 취미가 나올때까지 1번대로 진행
  hobbysRestMatchList(state)
  hobbysRestMatchSetList(state)
  state.hobbysResultList = state.hobbysMatchList
  // 4.취미의 갯수가 일치하는 순서대로 저장된 배열을 matched, left, right키 값을 가진 객체로 state에 저장
  // let hobbysMatchList = state.hobbysMatchList.map(s => s.map(v => v.sort((a, b) => a.id - b.id)))
  // let temp = []

  // for (const hobbys of Array.from(hobbysMatchList).flat(1)) {
  //   if (hobbys.length > 2) {
  //     hobbys.forEach((v, i, arr) => {
  //       temp.push({
  //         matched: `${hobbys[i !== 2 ? 0 : 1].id}-${hobbys[!i ? 1 : 2].id}`,
  //         left: hobbys[i !== 2 ? 0 : 1].hobbys,
  //         right: hobbys[!i ? 1 : 2].hobbys
  //       })
  //     })
  //     continue
  //   }
  //   temp.push({
  //     matched: `${hobbys[0].id}-${hobbys[1].id}`,
  //     left: hobbys[0].hobbys,
  //     right: hobbys[1].hobbys
  //   })
  // }
  // state.hobbysMatchList = temp
  console.log(JSON.parse(JSON.stringify(state.hobbysMatchList)))
  // 5.10개의 취미를 가진 배열은 커플인 데이터마다 배열로 값을 저장한다.
  // [
  //   [{id: ?, hobbys: ?},{id: ?, hobbys: ?}],
  //   [{id: ?, hobbys: ?},{id: ?, hobbys: ?}]
  // ] 10개의 취미가 커플인 데이터는 배열내에 1depth가 추가된다.
  // 6.만약 삼각관계가 존재한다면 10개의 취미가 일치하는 배열에서는 1개의 데이터가 남게 되므로 이 데이터를 5번에 저장된 데이터와 비교한다.
  // hobbys가 일치하는 데이터와 삼각관계를 만든다. 그럼 해당 배열내에는 id, hobbys를 가진 객체가 3개가 존재하게 된다.
  // 7.삼각관계를 어떻게 표현할 것 인가? id값이 작은순서를 기준으로 1-2, 1-3 두개의 객체생성후 1번은 제거 그 후 2-3 생성
  // 8.배열에 취미의 갯수가 일치한 배열 데이터를 저장해야 하므로 2중배열을 이용해야 하고 10개의 취미를 가진 배열은 3중배열로 저장이 된다.
  // return hobbysMatchList
}

const hobbysAllMatchSetList = (state) => {
  let hobbysMatchList = state.hobbysMatchList.map(s => s.map(v => v.sort((a, b) => a.id - b.id)))
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
  // 1.10개의 취미가 일치하는 문자열 id, hobbys키 값을 가진 객체로 배열내부에 저장 후 hobbysList에는 해당데이터 제거
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
      // console.log(temp, index)
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
