import InvenioAPI, { FacetOptions } from '@oarepo/invenio-api-vuex'

export default async ({ store, Vue }) => {
  Vue.use(InvenioAPI, {
    store: store,
    defaultFacetOptions: new FacetOptions({
      facetExtractors: function (node, path) {
        console.log('facetExt', node, path)
      }
    }),
    facetOptions: {},
    apiURL: '/api'
  })
}
