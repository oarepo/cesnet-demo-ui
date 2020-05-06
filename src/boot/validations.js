import { i18n } from 'boot/i18n'

export default async ({ Vue }) => {
  Vue.prototype.$rules = {
    required: (msg) => {
      return x => {
        let valid = !!x
        if (valid && x.length !== undefined) {
          valid = !!x.length
        }
        return valid || msg || i18n.t('messages.validation.fieldRequired')
      }
    },
    minLength: (len, msg) => {
      return x => x.length >= len || msg
    },
    maxWords: (num, msg) => {
      return x => {
        const plain = Vue.prototype.removeJibberish(x)
        return (plain.split(' ').length < num && plain.length < 5000) || msg
      }
    }
  }
}
