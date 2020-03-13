import { format } from 'quasar'
const { capitalize } = format

export default ({ app, Vue }) => {
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
}
