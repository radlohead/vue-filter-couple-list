export default {
  getAlphabetList () {
    let result = []

    for (let i = 65; i <= 90; i++) result.push({ text: String.fromCharCode(i) })
    return result
  }
}
