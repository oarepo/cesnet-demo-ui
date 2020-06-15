<template lang="pug">
q-card-section.q-pt-xs.col-sm-10.col-md-4
  .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.identifier') }}
  .text-caption {{ identifier }}
  .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.created') }}
  .text-caption {{ created | formatDate }}
  .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.updated') }}
  .text-caption {{ updated | formatDate }}
  .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.revision') }}
  .text-caption {{ revision }}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
export default @Component({
  name: 'RecordSystemMetadata',
  props: {
    identifier: String,
    created: String | Date,
    updated: String | Date,
    revision: Number
  }
})
class RecordSystemMetadata extends Vue {
}
</script>
<style lang="sass">
</style>
