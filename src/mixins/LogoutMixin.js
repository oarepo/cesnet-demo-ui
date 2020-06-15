import Vue from 'vue'
import Component from 'vue-class-component'
import { Emit } from 'vue-property-decorator'

@Component
class LogoutMixin extends Vue {
  @Emit('logout')
  logout () {
    window.location = this.auth$.authLogoutURL
  }
}

export { LogoutMixin }
