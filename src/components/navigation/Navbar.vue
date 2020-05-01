<template lang="pug">
q-toolbar.bg-primary.col-grow.text-grey-2
  q-toolbar(inset)
    .row.justify-between.full-width.q-px-lg
      .self-center(:class="[ maximized? 'col-6 q-mb-xl': 'col-auto']")
        q-btn(v-if="!maximized" flat @click="toggleFacetsDrawer" round dense icon="menu")
        q-btn(flat @click="goHome")
          img.q-mb-md(
            src="statics/logos/datacare_White.svg"
            :class="[ maximized? 'navbar__logo__maximized': 'navbar__logo']")
      q-toolbar-title.navbar__toolbar-title.text-center(:class="[ maximized? 'col-12 col-md-10' : 'col6']")
        .row.navbar__collection-title(v-if="maximized")
          h3.col-auto {{ $t('collection.title') }}
          q-space.col-auto
          locale-switcher.col-2.gt-md
        .row.navbar__collection-description(v-if="maximized")
          small {{ $t('collection.description') }}
        .row.search-input
          searchbar(:maximized="maximized" :query="query" @search="doSearch")
      .col-auto(v-if="maximized")
      .col-auto.self-center.full-height.q-pb-md.q-ml-lg(v-else)
        locale-switcher
</template>

<script>
import { Vue, Component, Emit } from 'vue-property-decorator'
import LocaleSwitcher from 'components/i18n/LocaleSwitcher'
import Searchbar from 'components/search/Searchbar'

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
class Navbar extends Vue {
  @Emit('search')
  doSearch () {
  }

  @Emit('home')
  goHome () {
  }

  @Emit('facets')
  toggleFacetsDrawer () {
  }
}
</script>

<style lang="sass" scoped>
.navbar
  &__logo
    min-height: 50px
    height: 75px
    &__maximized
      margin-left: -20px
  &__collection-title h3
    letter-spacing: .2rem
  &__toolbar-title
    white-space: normal
</style>
