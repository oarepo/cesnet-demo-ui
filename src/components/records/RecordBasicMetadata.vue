<template lang="pug">
q-card-section.col-8.q-pt-xs
  .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.creator') }}
  .text-caption {{ creator }}
  .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.contributors') }}
  .text-caption {{ contributors }}
  .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.abstract') }}
  .text-caption {{ $langTitle({ title: abstract }) }}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
export default @Component({
  name: 'RecordBasicMetadata',
  props: {
    creator: String,
    contributors: String,
    abstract: Array
  }
})
class RecordBasicMetadata extends Vue {
}
</script>

<style lang="sass">
</style>
