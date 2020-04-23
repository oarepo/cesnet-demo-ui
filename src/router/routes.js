import Index from 'pages/Index'
import { routerCollection } from '@oarepo/invenio-api-vuex'
import Collection from 'components/Collection'
import { query } from '@oarepo/vue-query-synchronizer'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Index,
    props: query(
      [
        'string:q'
      ], {
        collectionId: 'records'
      },
      {
        passParams: true
      }),
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
            'string:q'
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

export default routes
