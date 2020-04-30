const _chars = ' aáäaaâbcćčdďeéěëeefghhiíiiîjklĺľmnńňnoóôooöőpqrŕřsśštťuúuůüuuvwxyýzźž0123456789'.toUpperCase()

export function czechSort (arr, getter = x => x) {
  const map = {}
  let index

  for (let i = 0, item; i < arr.length; i++) {
    index = []
    item = getter(arr[i])
    item.replace(/\s+/g, ' ')
    for (let j = 0, ch, pos; j < item.length; j++) {
      ch = item.substr(j, 1).toUpperCase()
      if (j + 1 < item.length && ch === 'C' && item.substr(j + 1, 1).toUpperCase() === 'H') {
        pos = 22
        j++
      } else {
        pos = _chars.indexOf(ch)
      }

      index.push(pos < 10 ? '0' + pos : pos)
    }
    map[item] = index.join('')
  }

  return arr.sort(function (a, b) {
    const a2 = map[getter(a)]
    const b2 = map[getter(b)]

    if (a2 > b2) {
      return 1
    }
    if (a2 < b2) {
      return -1
    }
    return 0
  })
}
