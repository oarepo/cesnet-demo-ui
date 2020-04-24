<template lang="pug">
q-input.searchbar__input.q-my-xl.full-width(
  clearable
  type="search"
  :hint="maximized? $t('labels.searchInput') + '…': ''"
  clear-icon="clear"
  :dark="maximized"
  autofocus
  standout
  @keydown.enter.prevent="doSearch"
  v-model.trim="search")
  template(v-slot:append)
    q-icon.cursor-pointer(v-if="search === ''" name="search" @click="doSearch")
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'Searchbar',
  props: {
    maximized: Boolean
  }
})
class Searchbar extends Vue {
  search = ''

  doSearch () {
    this.$emit('search', this.search)
  }
}
</script>

<style lang="sass" scoped>
</style>
