<template lang="pug">
q-card-section.q-pt-xs
  .row.justify-between
    .col-8
      .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.creator') }}
      .text-weight-medium {{ creator }}
    .col-auto.text-center.justify-center
      .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.difficulty') }}
      .text-caption.text-center.q-pl-md
        difficulty-bar(:difficulty="difficulty")
  .text-overline.text-weight-bold.text-uppercase(v-if="event") {{ $t('labels.record.event') }}
  .text-caption.q-mb-md(v-if="event")
    taxonomy-chip(:initial="event")
  .text-overline.text-weight-bold.text-uppercase(v-if="contributors") {{ $t('labels.record.contributors') }}
  .text-caption.q-mb-md(v-if="contributors") {{ contributors }}
  .text-overline.text-weight-bold.text-uppercase(v-if="abstract") {{ $t('labels.record.abstract') }}
  .text-caption.q-mb-md(v-if="abstract") {{ $langTitle({ title: abstract }) }}
  .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.formats') }}
  .text-caption(v-if="formats.length > 0")
    .row.justify-start
      taxonomy-chip(v-for="format in formats" :key="format.slug" :initial="format")
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import DifficultyBar from 'components/widgets/DifficultyBar'
import TaxonomyChip from 'components/widgets/TaxonomyChip'

export default @Component({
  name: 'RecordBasicMetadata',
  props: {
    creator: String,
    difficulty: String,
    event: Object,
    contributors: String,
    abstract: Array,
    formats: Array
  },
  components: {
    DifficultyBar,
    TaxonomyChip
  }
})
class RecordBasicMetadata extends Vue {
}
</script>

<style lang="sass">
</style>
