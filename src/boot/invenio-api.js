import InvenioAPI from '@oarepo/invenio-api-vuex'

export default async ({ store, Vue }) => {
  Vue.use(InvenioAPI, {
    store: store,
    apiURL: '/api'
  })
}
