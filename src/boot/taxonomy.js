import { VueTaxonomy } from '@oarepo/vue-taxonomy-editor'
import DefaultTaxonomyViewer from 'components/taxonomies/DefaultTaxonomyViewer'

export default async ({ Vue }) => {
  VueTaxonomy.install(Vue)
  await Vue.prototype.$taxonomies.loadTaxonomies('/api/taxonomies')
  Vue.prototype.$taxonomies.defaultViewer = DefaultTaxonomyViewer
}
