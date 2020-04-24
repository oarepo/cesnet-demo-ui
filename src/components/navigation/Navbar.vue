<template lang="pug">
q-toolbar.bg-primary.col-grow.text-grey-2
  q-toolbar(inset)
    .row.full-width.q-px-lg
      .col-auto(v-if=maximized)
      q-toolbar-title.col-12.col-md-10.navbar__toolbar-title.text-center
        .row.navbar__collection-title(v-if="maximized")
          h3.col-auto {{ $t('app.title') }}
          q-space.col-auto
          locale-switcher.col-2.gt-md
        .row.navbar__collection-description(v-if="maximized")
          small {{ collection.description[$i18n.locale] }}
        .row.search-input
          searchbar(:maximized="maximized" :query="query" @search="doSearch")
      .col-auto(v-if=maximized)
</template>

<script>
import { Component, Emit } from 'vue-property-decorator'
import LocaleSwitcher from 'components/i18n/LocaleSwitcher'
import Collection from 'components/mixins/Collection'
import Searchbar from 'components/search/Searchbar'
import { mixins } from 'vue-class-component'

export default @Component({
  name: 'Navbar',
  components: {
    Searchbar,
    LocaleSwitcher
  },
  props: {
    query: Object,
    maximized: Boolean
  }
})
class Navbar extends mixins(Collection) {
  @Emit('search')
  doSearch (search) {
    return search
  }
}
</script>

<style lang="sass" scoped>
.navbar
  &__collection-title h3
    letter-spacing: .2rem
  &__toolbar-title
    white-space: normal
</style>
