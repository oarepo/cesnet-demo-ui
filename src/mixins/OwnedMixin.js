import Vue from 'vue'
import Component from 'vue-class-component'

@Component
class OwnedMixin extends Vue {
  get owned () {
    if (this.auth$.loggedLocally) {
      return this.metadata.owners.includes(this.auth$.authInfo.user.id)
    }
    return false
  }
}

export { OwnedMixin }
