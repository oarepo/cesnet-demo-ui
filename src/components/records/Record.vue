<template lang="pug">
q-item(clickable ripple).q-py-lg
  q-item-section(avatar top)
    q-icon(name="book" size="34px")
  q-item-section(top lines="1")
    q-item-label(overline lines="1")
      span.text-weight-bold {{ metadata.title[0].value }}
    q-item-label.text-grey-9 {{ metadata.creator }}
    q-item-label.q-body-2.text-justify  {{ metadata.description[0].value }}
  q-item-section(side top)
    span.q-caption.text-weight-thin.text-italic {{ created | formatDate }}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'Record',
  props: {
    metadata: Object,
    links: Object,
    created: String,
    updated: String
  }
})
class RecordList extends Vue {
}
</script>

<style lang="sass" scoped>

</style>
