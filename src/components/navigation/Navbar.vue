<template lang="pug">
q-toolbar.navbar.col-grow.text-grey-2
  q-toolbar(inset)
    .row.justify-between.full-width(:class="[ maximized? 'q-mx-lg': '']")
      .self-center(:class="[ maximized? 'col-6 q-mb-xl': 'col-auto']")
        q-btn.q-mr-md(v-if="!maximized" flat @click="toggleFacetsDrawer" round dense icon="menu")
        q-btn(flat @click="goHome" :class="[ maximized? 'q-mb-xl': '']")
          img(
            src="statics/logos/datacare_White.svg"
            :class="[ maximized? 'navbar__logo__maximized': 'navbar__logo']")
      q-toolbar-title.self-center.navbar__toolbar-title.text-center(
        :class="[ maximized? 'col-12 col-md-10' : 'col6']")
        .row.navbar__collection-title(v-if="maximized")
          h3.col-auto {{ $t('collection.title') }}
          q-space.col-auto
          locale-switcher.col-2.gt-md
        .row.navbar__collection-description(v-if="maximized")
          small {{ $t('collection.description') }}
        .row.search-input
          searchbar(:maximized="maximized" v-if="query || maximized" :query="query" @search="doSearch")
      .col-auto.self-center.full-height.q-ml-lg(v-if="!maximized")
        locale-switcher
      .col-auto.self-center.full-height.q-ml-md(v-if="!maximized")
        account-dropdown(
          :query="query"
          v-if="loggedIn"
          @create-record="createRecord"
          @change-record="recordsChanged")
        q-chip(clickable @click="login()" size="xl" icon="https" v-else)
          .text-caption.text-uppercase {{ $t('labels.loginBtn') }}
</template>

<script>
import { Vue, Component, Emit } from 'vue-property-decorator'
import LocaleSwitcher from 'components/i18n/LocaleSwitcher'
import Searchbar from 'components/search/Searchbar'
import AccountDropdown from 'components/navigation/AccountDropdown'

export default @Component({
  name: 'Navbar',
  components: {
    Searchbar,
    AccountDropdown,
    LocaleSwitcher
  },
  props: {
    query: Object,
    maximized: Boolean
  }
})
class Navbar extends Vue {
  get loggedIn () {
    return this.auth$.loggedLocally
  }

  login () {
    this.auth$.login(this)
  }

  @Emit('create-record')
  createRecord () { }

  @Emit('change-record')
  recordsChanged () { }

  @Emit('search')
  doSearch () { }

  @Emit('home')
  goHome () { }

  @Emit('facets')
  toggleFacetsDrawer () { }
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
