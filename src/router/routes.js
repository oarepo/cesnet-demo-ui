import { routerCollectionList, routerCollection, routerRecord } from '@oarepo/invenio-api-vuex'
import Record from 'components/records/Record'
import { query } from '@oarepo/vue-query-synchronizer'
import Error404 from 'pages/Error404'
import MainLayout from 'layouts/MainLayout'
import RecordList from 'pages/records/RecordList'

const routes = [
  routerCollectionList(
    {
      path: '/',
      component: MainLayout,
      meta: {
        preloader: {
          store: 'oarepoCollectionList'
        }
      },
      props: query([
        'string:q'
      ], {}, {
        passParams: true
      }),
      children: [
        routerCollection({
          name: 'RecordSearch',
          path: '/:collectionId',
          component: RecordList,
          meta: {
            title: 'Records',
            preloader: {
              store: 'oarepoCollection'
            }
          },
          props: query([
            'string:q',
            'number:page',
            'array:creator',
            'array:title.lang'
          ], {}, {
            passParams: true
          })
        })
      ]
    }),
  {
    name: 'Error404',
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
