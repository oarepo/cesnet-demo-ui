import { UIStoreModule } from '../store/ui'

export default async ({ Vue, store }) => {
  Vue.prototype.$repo = {
    ui: new UIStoreModule({ store, name: 'ui' })
  }
}
