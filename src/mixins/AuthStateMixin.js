import Vue from 'vue'
import Component from 'vue-class-component'
import { Emit } from 'vue-property-decorator'

@Component
class AuthStateMixin extends Vue {
  get loggedIn () {
    return this.auth$.loggedLocally
  }

  get auth () {
    return this.auth$.authInfo
  }

  ensureAuthenticated (onSuccess) {
    if (!this.loggedIn) {
      this.login(onSuccess)
    }
  }

  @Emit('login')
  login (onSuccess) {
    this.$gdpr.showGdprPrompt(() => {
      this.auth$.login({ vue: this })
      onSuccess()
    }, this)
  }
}

export { AuthStateMixin }
