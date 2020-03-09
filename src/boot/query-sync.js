import QuerySynchronizer from '@oarepo/vue-query-synchronizer'

export default async ({ router, Vue }) => {
  Vue.use(QuerySynchronizer, {
    router: router
  })
}
