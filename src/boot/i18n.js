import Vue from 'vue'
import { Quasar } from 'quasar'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'

Vue.use(VueI18n)

let browserLocale = Quasar.lang.getLocale()

if (browserLocale === 'cs') {
  browserLocale = 'cs-cz'
} if (browserLocale === 'en') {
  browserLocale = 'en-us'
}

const i18n = new VueI18n({
  locale: browserLocale,
  fallbackLocale: 'en-us',
  messages
})

export default ({ app, Vue }) => {
  Vue.prototype.$langTitle = rec => {
    if (!rec) {
      return ''
    }
    const title = rec.title || []
    const locale = Quasar.lang.getLocale() || 'cs'

    const ret = title.filter(y => y.lang === locale)
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
