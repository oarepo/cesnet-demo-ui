<template lang="pug">
div
  .text-grey-6.term-title(:class="{'term-title-children': term.descendants_count}")
    span {{ $langTitle(term) }}
    q-icon(v-if="term.tooltip" name="info" right)
      q-tooltip(v-if="term.tooltip" content-class="bg-accent")
        .text-caption {{ term.tooltip }}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'DefaultTaxonomyViewer',
  props: {
    term: Object
  }
})
class DefaultTaxonomyViewer extends Vue {
}
</script>

<style lang="sass" scoped>
.term-title
  font-weight: bold

.term-url
  padding-left: 20px
  font-size: smaller
  line-height: 70%
</style>
