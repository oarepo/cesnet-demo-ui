import VuexPreloader from '@oarepo/vuex-preloader'

export default async ({ router, store, Vue }) => {
  function errorHandler ({ router, route, pathSegment, exception }) {
    console.error('Exception detected')
    return '/error/404'
  }

  Vue.use(
    VuexPreloader,
    {
      router,
      store,
      errorHandler,
      debug: process.env.DEV
    }
  )
}
