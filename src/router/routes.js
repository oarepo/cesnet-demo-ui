import { routerCollectionList, routerCollection, routerRecord } from '@oarepo/invenio-api-vuex'
import Collections from 'components/Collections'
import Record from 'components/Record'
import { query } from '@oarepo/vue-query-synchronizer'
import Error404 from 'pages/Error404'
import LandingPageLayout from 'layouts/LandingPageLayout'
import CollectionLayout from 'layouts/CollectionLayout'
import RecordCreate from 'pages/records/RecordCreate'
import Collection from 'components/Collection'

const routes = [
  {
    path: '/',
    component: LandingPageLayout,
    redirect: '/collections',
    children: [
      routerCollectionList(
        {
          path: '/collections',
          component: Collections,
          meta: {
            preloader: {
              store: 'oarepoCollectionList'
            }
          }
        })
    ]
  },
  {
    path: '/error/404',
    component: Error404
  },
  routerCollection({
    // Collection related routes
    path: '/:collectionId',
    component: CollectionLayout,
    children: [
      {
        path: '/',
        component: Collection,
        meta: {
          preloader: {
            store: 'oarepoCollection'
          }
        },
        props: query([
          'string:filter'
        ], {}, {
          passParams: true
        })
      },
      {
        // Create a new Record in a Collection
        path: '/:collectionId/create',
        component: RecordCreate,
        meta: {
          preloader: {
            store: 'oarepoCollection'
          }
        }
      },
      routerRecord({
        // Detail of a Record in a Collection
        path: '/:collectionId/:recordId',
        component: Record,
        meta: {
          preloader: {
            store: 'oarepoCollection'
          }
        }
      })
    ],
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
