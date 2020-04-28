import { format, date } from 'quasar'
const { capitalize } = format

export default ({ _, Vue }) => {
  Vue.filter('capitalize', function (value) {
    if (value !== '') {
      return capitalize(value)
    }
  })

  Vue.filter('truncate', function (string, length) {
    if (string.length > length) {
      return string.substring(0, length) + '…'
    }
    return string
  })

  Vue.filter('formatDate', function (input) {
    return date.formatDate(input, 'D.M.YYYY')
  })
}
