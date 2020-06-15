import Vue from 'vue'
import Component from 'vue-class-component'

@Component
class HandleMixin extends Vue {
  get handleLink () {
    const rid = this.id || this.$route.params.recordId
    return `https://hdl.handle.net/20.500.12618/9999-${rid}`
  }
}

export { HandleMixin }
