import Index from 'pages/Index'
import { routerCollection } from '@oarepo/invenio-api-vuex'
import Collection from 'components/Collection'
import { query } from '@oarepo/vue-query-synchronizer'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Index,
    children: [
      routerCollection({
        path: 'search',
        name: 'search',
        component: Collection,
        meta: {
          title: 'Records',
          preloader: {
            store: 'oarepoCollection'
          }
        },
        props: query(
          [
            'string:filter'
          ], {
            collectionId: 'records'
          },
          {
            passParams: true
          })
      })
    ]
  }
]
/*
import { routerCollection, routerCollectionList, routerRecord } from '@oarepo/invenio-api-vuex'
import Collection from 'components/Collection'
import Record from 'components/Record'
import { query } from '@oarepo/vue-query-synchronizer'
import Error404 from 'pages/Error404'
import LandingPageLayout from 'layouts/LandingPageLayout'
import LandingPage from 'pages/LandingPage'

const routes = [
  {
    path: '/',
    component: LandingPageLayout,
    redirect: '/collections',
    children: [
      routerCollectionList(
        {
          path: '/collections',
          component: LandingPage,
          meta: {
            preloader: {
              store: 'oarepoCollectionList'
            }
          }
        }),
      routerCollection({
        path: 'search',
        name: 'search',
        component: Collection,
        meta: {
          title: 'Records',
          preloader: {
            store: 'oarepoCollection'
          }
        },
        props: query(
          [
            'string:filter'
          ], {
            collectionId: 'records'
          },
          {
            passParams: true
          })
      })
    ]
  },
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
*/
export default routes
