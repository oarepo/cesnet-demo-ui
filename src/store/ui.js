import { VuexModule } from 'vuex-class-modules'

export class UIStoreModule extends VuexModule {
  get repositoryName () {
    return 'Demo Repository'
  }
}
