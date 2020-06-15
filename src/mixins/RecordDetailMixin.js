import Vue from 'vue'
import Component from 'vue-class-component'

@Component
class RecordDetailMixin extends Vue {
  showRecordDetail (id) {
    this.$router.push({
      name: 'record',
      params: { collectionId: 'records', recordId: id }
    })
  }
}

export { RecordDetailMixin }
