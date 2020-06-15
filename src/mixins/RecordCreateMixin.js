import Vue from 'vue'
import Component from 'vue-class-component'
import RecordCreateDialog from 'components/records/RecordCreateDialog'
import { Emit } from 'vue-property-decorator'

@Component
class RecordCreateMixin extends Vue {
  showRecordCreate () {
    this.$q.dialog({
      component: RecordCreateDialog,
      maximized: true,
      persistent: true,
      parent: this,
      title: this.$t('labels.createNew')
    }).onOk(data => {
      this.recordsChanged()
    })
  }

  @Emit('create-record')
  createRecord () { }

  @Emit('change-record')
  recordsChanged () { }
}

export { RecordCreateMixin }
