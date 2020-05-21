<template lang="pug">
q-card-section.q-pt-xs
  .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.links') }}
  q-markup-table(flat dense separator="vertical")
    tbody
      tr(v-for="(uri, name) in links" :key="name")
        td
          q-badge(outline color="primary") {{ name }}
        td
          a(:href="uri" target="_blank") {{ uri }}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'RecordLinks',
  props: {
    links: Object
  },
  components: {
  }
})
class RecordLinks extends Vue {
}
</script>

<style lang="sass">
</style>
