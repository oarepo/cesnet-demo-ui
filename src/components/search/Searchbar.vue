<template lang="pug">
q-input.searchbar__input.q-my-xl.full-width(
  clearable
  type="search"
  :hint="maximized? $t('labels.searchInput') + '…': ''"
  clear-icon="clear"
  dark
  autofocus
  standout
  @clear="doSearch"
  :placeholder="!maximized? $t('labels.searchInputMaximized') + '…': ''"
  v-model.trim="query.q"
  @keydown.enter.prevent="doSearch")
  template(v-slot:append)
    q-icon(v-if="query.q === ''" name="search")
</template>

<script>
import { Component, Emit, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'Searchbar',
  props: {
    query: Object,
    maximized: Boolean
  }
})
class Searchbar extends Vue {
  @Emit('search')
  doSearch () {
  }
}
</script>

<style lang="sass" scoped>
</style>
