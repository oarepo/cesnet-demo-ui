import QuerySynchronizer from '@oarepo/vue-query-synchronizer'

export default async ({ Vue, router }) => {
  Vue.use(QuerySynchronizer, {
    router: router,
    debounce: 100,
    passUnknownProperties: false,
    debug: false
  })
}
