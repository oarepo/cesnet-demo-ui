import Vue from 'vue'
import Component from 'vue-class-component'
import { Emit } from 'vue-property-decorator'
import RecordEditDialog from 'components/records/RecordEditDialog'

@Component
class RecordEditMixin extends Vue {
  showRecordEditor () {
    this.$q.dialog({
      component: RecordEditDialog,
      maximized: true,
      parent: this,
      title: this.$t('labels.editRecord'),
      value: this.metadata,
      id: this.id || this.$route.params.recordId
    }).onOk(data => {
      this.recordChanged()
    })
  }

  @Emit('change-record')
  recordChanged () { }
}

export { RecordEditMixin }
