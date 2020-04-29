<template lang="pug">
q-page-sticky.filters(position="top" expand)
  q-toolbar.bg-grey-3.shadow-3
    q-toolbar-title
      q-btn(flat round dense)
        q-icon(:name="filtersEmpty? 'filter_none': 'filter_list'")
      span.q-mr-md.text-caption.text-uppercase {{ !filtersEmpty ? $t('labels.activeFilters.header'): $t('labels.activeFilters.empty') }}
      q-chip(
        v-for="(value, name) in query"
        v-if="value !== ''"
        :key="name"
        :icon="icon(name)"
        removable
        :label="$t('labels.activeFilters.' + name) + ': '+ value"
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
    if (filterName === 'q') {
      return 'search'
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
