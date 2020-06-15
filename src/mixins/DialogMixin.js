import Vue from 'vue'
import Component from 'vue-class-component'
import { Emit } from 'vue-property-decorator'

@Component
class DialogMixin extends Vue {
  show () {
    this.$refs.dialog.show()
  }

  hide () {
    this.$refs.dialog.hide()
  }

  @Emit('hide')
  onDialogHide () { }
}

export { DialogMixin }
