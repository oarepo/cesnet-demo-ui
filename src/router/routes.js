import { routerCollectionList, routerCollection, routerRecord } from '@oarepo/invenio-api-vuex'
import Collection from 'components/Collection'
import Collections from 'components/Collections'
import Record from 'components/Record'
import { query } from '@oarepo/vue-query-synchronizer'
import Error404 from 'pages/Error404'

const routes = [
  {
    path: '/',
    component: () => ''
  },
  {
    path: '/error/404',
    component: Error404
  },
  routerCollectionList(
    {
      path: '/collections',
      component: Collections,
      meta: {
        preloader: {
          store: 'oarepoCollectionList'
        }
      }
    }),
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
      preloader: {
        store: 'oarepoCollection'
      }
    },
    props: query()
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
