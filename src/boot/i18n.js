import Vue from 'vue'
import { Quasar } from 'quasar'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: Quasar.lang.getLocale(),
  fallbackLocale: 'en-us',
  messages
})

export default ({ app, Vue }) => {
  Vue.prototype.$langTitle = rec => {
    if (!rec) {
      return ''
    }
    const title = rec.title || []
    const ret = title.filter(y => y.lang === 'cs')
    if (ret.length) {
      return ret[0].value
    } else if (title.length) {
      return title[0].value
    } else {
      return null
    }
  }

  // Set i18n instance on app
  app.i18n = i18n
}

export { i18n }
