import InvenioAPI, { FacetOptions, TranslationOptions } from '@oarepo/invenio-api-vuex'
import { i18n } from 'boot/i18n'

export default async ({ store, app, Vue }) => {
  Vue.use(InvenioAPI, {
    store: store,
    i18n (x) { return i18n.t(x) },
    defaultFacetOptions: new FacetOptions({
      translation: {
        defaultTranslateTitles: TranslationOptions.TRANSLATE,
        translateValues: {
          'title.lang': TranslationOptions.NO_PREFIX
        }
      }
    }),
    facetOptions: {},
    apiURL: '/api'
  })
}
