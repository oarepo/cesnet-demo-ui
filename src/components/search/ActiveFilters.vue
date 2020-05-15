<template lang="pug">
transition(appear appear-to-class="animated slideInDown")
  q-page-sticky.filters(v-if="!filtersEmpty" position="top" expand)
    q-toolbar.bg-grey-3.shadow-3
      q-toolbar-title
        q-btn(flat round dense)
          q-icon(name="filter_list")
        span.q-mr-md.text-caption.text-uppercase {{ $t('labels.activeFilters.header') }}
        q-chip(
          v-for="(value, name) in query"
          v-if="value !== ''"
          :key="name"
          :icon="icon(name)"
          removable
          :label="$t('labels.activeFilters.' + name) + (name === 'owned' ? '' : `: ${value}`)"
          @remove="remove(name, value)"
          )
</template>

<script>
import { Component, Emit, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'ActiveFilters',
  props: {
    query: Object
  }
})
class ActiveFilters extends Vue {
  icon (filterName) {
    switch (filterName) {
      case 'q': {
        return 'search'
      }
      case 'owned':
        return 'all_inbox'
    }
  }

  get filtersEmpty () {
    return Object.keys(this.query).length === 0
  }

  @Emit('remove')
  remove (name, value) {
    return { name: name, value: value }
  }
}
</script>
<style lang="sass" scoped>
.filters
  z-index: 1000
</style>
