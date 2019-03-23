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
    .map(v => v.join('')).sort()
}

const getHobbysMatchList = (state) => {
  // 2.10개의 취미가 일치한 데이터와 남은 데이터를 비교해서 같은 데이터가 있다면 id, hobbys키 값을 가진 객체로 1번 배열에 저장
  hobbysAllMatchList(state)
  console.log(JSON.parse(JSON.stringify(state)))
  // 3.9개 취미부터 1개의 취미까지 1번대로 진행
  // 4.취미의 갯수가 일치하는 순서대로 저장된 배열을 matched, left, right키 값을 가진 객체로 state에 저장
  // 5.10개의 취미를 가진 배열은 커플인 데이터마다 배열로 값을 저장한다.
  // [
  //   [{id: ?, hobbys: ?},{id: ?, hobbys: ?}],
  //   [{id: ?, hobbys: ?},{id: ?, hobbys: ?}]
  // ] 10개의 취미가 커플인 데이터는 배열내에 1depth가 추가된다.
  // 6.만약 삼각관계가 존재한다면 10개의 취미가 일치하는 배열에서는 1개의 데이터가 남게 되므로 이 데이터를 5번에 저장된 데이터와 비교한다.
  // hobbys가 일치하는 데이터와 삼각관계를 만든다. 그럼 해당 배열내에는 id, hobbys를 가진 객체가 3개가 존재하게 된다.
  // 7.삼각관계를 어떻게 표현할 것 인가? id값이 작은순서를 기준으로 1-2, 1-3 두개의 객체생성후 1번은 제거 그 후 2-3 생성
  // 8.배열에 취미의 갯수가 일치한 배열 데이터를 저장해야 하므로 2중배열을 이용해야 하고 10개의 취미를 가진 배열은 3중배열로 저장이 된다.

  // return [
  //   {
  //     matched: '1-3',
  //     left: 'aadffaf',
  //     right: 'bvbgffg'
  //   },
  //   {
  //     matched: '2-3',
  //     left: 'aadffaf',
  //     right: 'bvbgffg'
  //   },
  //   {
  //     matched: '3-3',
  //     left: 'aadffaf',
  //     right: 'bvbgffg'
  //   },
  //   {
  //     matched: '4-3',
  //     left: 'aadffaf',
  //     right: 'bvbgffg'
  //   }
  // ]
  // return store.state.hobbysList
}

const hobbysAllMatchList = (state) => {
  // 1.10개의 취미가 일치하는 문자열 id, hobbys키 값을 가진 객체로 배열내부에 저장 후 hobbysList에는 해당데이터 제거
  const hobbysList = store.state.hobbysList
  const hobbysMatchList = store.state.hobbysMatchList
  let count = Array.slice(store.state.hobbysList).length
  let temp = []

  while (--count > 0) {
    if (hobbysList[count].hobbys === hobbysList[count - 1].hobbys) {
      temp.push([
        {
          id: hobbysList[count - 1].id,
          hobbys: hobbysList[count - 1].hobbys
        },
        {
          id: hobbysList[count].id,
          hobbys: hobbysList[count].hobbys
        }
      ])
      hobbysList.splice(count - 1, 2)
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
  console.log(temp, JSON.parse(JSON.stringify(hobbysMatchList)), JSON.parse(JSON.stringify(hobbysList)))
}
