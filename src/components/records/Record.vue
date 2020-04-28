<template lang="pug">
q-expansion-item(group="records" popup clickable ripple).q-my-lg
  template(v-slot:header)
    q-item-section(avatar top)
      q-icon(name="book" size="34px")
    q-item-section(top lines="1")
      q-item-label(overline lines="1").q-py-sm
        span.text-weight-bold.record__title {{ metadata.title[0].value }}
      q-item-label.text-grey-9.q-py-xs {{ metadata.creator }}
      q-item-label.q-body-2.q-py-sm.text-justify  {{ metadata.description[0].value }}
    q-item-section(side top)
  q-separator
  q-card
    q-card-section(horizontal)
      q-card-section.q-pt-xs
        .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.creator') }}
        .text-caption {{ metadata.creator }}
        .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.contributors') }}
        .text-caption {{ metadata.contributor }}
        .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.abstract') }}
        .text-caption {{ metadata.abstract[0].value }}
      q-separator(vertical)
      q-card-section.q-pt-xs.col-4
        .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.identifier') }}
        .text-caption {{ metadata.identifier }}
        .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.created') }}
        .text-caption {{ created | formatDate }}
        .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.updated') }}
        .text-caption {{ updated | formatDate }}
        .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.revision') }}
        .text-caption {{ revision }}
    q-separator
    q-card-section.q-pt-xs(horizontal)
      q-card-section.q-pt-xs
        .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.links') }}
        .text-caption.text-weight-bold(v-for="(uri, name) in links" :key="name")
            q-badge(outline color="primary") {{ name }}:
            q-space
            a(:href="uri" target="_blank") {{ uri }}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'Record',
  props: {
    metadata: Object,
    links: Object,
    created: String,
    updated: String,
    revision: String
  }
})
class RecordList extends Vue {
  created () {
    // TODO: add handle link just for demo purposes
    this.links.handle = 'https://hdl.handle.net/20.500.12618/DEMO-RECORD-HANDLE-LEADING-NOWHERE'
  }
}
</script>

<style lang="sass" scoped>
.record__title
  font-size: 1.1rem
</style>
