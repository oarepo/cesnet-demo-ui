<template lang="pug">
q-page(padding)
  .row.q-col-gutter-lg
    .col-6
      oarepo-record-inplace-editor(:record="record" :schema="schema" :options="options")
      q-btn(@click="create" icon="save" color="positive" :label="$t('labels.submitBtn')")
    .col-6
      pre {{ record }}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'record-create',
  components: {}
})
class RecordCreate extends Vue {
  schema = 'https://localhost/schemas/records/record-v1.0.0.json'
  record = {
    identifier: '',
    abstract: [{ lang: '', value: '' }], // TODO: multilingual input
    title: [{ lang: '', value: '' }], // TODO: multilingual input
    alternative: [{ lang: '', value: '' }], // TODO: multilingual input
    description: [{ lang: '', value: '' }], // TODO: multilingual input
    created: '', // TODO: date input
    available: '', // TODO: date input
    dateSubmitted: '', // TODO: date input
    modified: '', // TODO: date input
    creator: '',
    contributor: '',
    language: ''
  }

  options = {
    schema: 'table',
    showEmpty: true,
    extraProps: {
      submit: this.submit,
      cancel: this.cancel
    },
    pathLayouts: {
      dateSubmitted: {
        path: 'dateSubmitted',
        component: 'q-date',
        label: {
          value: 'labels.dateSubmitted'
        }
      }
    }
  }

  async create () {
    // TODO: invoke store action to create the record
    // return this.$oarepo.collection.create({ metadata: this.record })
  }

  submit ({ context, prop, value }) {
    context[prop] = value
  }

  cancel (props) {
    console.log('cancelling')
  }
}
</script>
