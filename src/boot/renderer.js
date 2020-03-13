import VueUid from 'vue-uid'
import DataRenderer from '@oarepo/data-renderer'

export default async ({ Vue }) => {
  Vue.use(VueUid)
  Vue.use(DataRenderer, {})
}
