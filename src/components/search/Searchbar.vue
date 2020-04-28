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
  @keydown.enter.prevent="doSearch"
  v-model.trim="search")
  template(v-slot:append)
    q-icon.cursor-pointer(v-if="search === ''" name="search" @click="doSearch")
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator'

export default @Component({
  name: 'Searchbar',
  props: {
    query: Object,
    maximized: Boolean
  }
})
class Searchbar extends Vue {
  search = ''

  created () {
    this.search = this.query.q
  }

  @Watch('query')
  queryChange () {
    this.search = this.query.q
  }

  doSearch () {
    if (!this.search) {
      // Prevent null from being sent in event
      this.search = ''
    }
    this.$emit('search', this.search)
  }
}
</script>

<style lang="sass" scoped>
</style>
