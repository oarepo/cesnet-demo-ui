<template lang="pug">
  q-item-section(top lines="1")
    q-item-label( lines="1").q-py-sm
      .row.items-center.justify-between
        .text-weight-bold.record__title {{ $langTitle(metadata) }}
        q-badge(v-if="owned" color="accent").text-caption.text-lowercase {{ $t('labels.record.owner') }}
    q-item-label.q-py-xs {{ metadata.creator }}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'RecordHeader',
  props: {
    owned: Boolean,
    metadata: Object
  },
  components: {
  }
})
class RecordHeader extends Vue {
}
</script>

<style lang="sass">
</style>
