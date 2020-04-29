<template lang="pug">
div
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

  @Emit('remove')
  remove (name, value) {
    return { name: name, value: value }
  }
}
</script>

<style scoped>

</style>
