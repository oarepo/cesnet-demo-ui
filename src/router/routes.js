import { routerCollectionList, routerCollection, routerRecord } from '@oarepo/invenio-api-vuex'
import Collection from 'components/Collection'
import Record from 'components/Record'
import { query } from '@oarepo/vue-query-synchronizer'
import Error404 from 'pages/Error404'
import LandingPageLayout from 'layouts/LandingPageLayout'

const routes = [
  routerCollectionList(
    {
      path: '/',
      component: LandingPageLayout,
      meta: {
        preloader: {
          store: 'oarepoCollectionList'
        }
      }
    }),
  {
    path: '/error/404',
    component: Error404
  },
  routerRecord({
    path: '/:collectionId/:recordId',
    component: Record,
    meta: {
      preloader: {
        store: 'oarepoCollection'
      }
    }
  }),
  routerCollection({
    path: '/:collectionId',
    component: Collection,
    meta: {
      title: 'Records',
      preloader: {
        store: 'oarepoCollection'
      }
    },
    props: query([
      'string:filter'
    ], {}, {
      passParams: true
    })
  })
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
