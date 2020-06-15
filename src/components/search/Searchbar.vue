<template lang="pug">
q-input.searchbar__input.full-width(
  clearable
  type="search"
  clear-icon="clear"
  dark
  hide-bottom-space
  autofocus
  standout
  @clear="query.q = ''"
  @input="doSearch"
  :debounce="1000"
  :placeholder="$t('labels.searchInputMaximized') + '…'"
  v-model.trim="query.q"
  @keydown.enter.prevent="doSearch")
  template(v-slot:append)
    q-icon(v-if="query.q === ''" name="search")
</template>

<script>
import { Component } from 'vue-property-decorator'
import { SearchMixin } from 'src/mixins/SearchMixin'
import { mixins } from 'vue-class-component'

export default @Component({
  name: 'Searchbar',
  props: {
    query: Object,
    maximized: Boolean
  }
})
class Searchbar extends mixins(SearchMixin) {
}
</script>

<style lang="sass" scoped>
</style>
