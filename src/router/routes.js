import { routerCollectionList, routerCollection, routerRecord } from '@oarepo/invenio-api-vuex'
import Collection from 'components/Collection'
import Collections from 'components/Collections'
import Record from 'components/Record'
import { query } from '@oarepo/vue-query-synchronizer'

const routes = [
  {
    path: '/',
    redirect: '/records'
  },
  routerCollectionList({
    path: '/records',
    component: Collections
  }),
  routerRecord({
    path: '/:collectionId/:recordId',
    component: Record
  }),
  routerCollection({
    path: '/:collectionId',
    component: Collection,
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
