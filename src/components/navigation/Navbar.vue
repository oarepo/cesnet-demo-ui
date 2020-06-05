<template lang="pug">
q-toolbar.navbar.col-grow.text-grey-2
  .row.q-col-gutter-lg.absolute-top.items-center.justify-end.q-px-xl.q-pt-lg(v-if="maximized")
    .col-2
      locale-switcher
    .col-auto
      account-dropdown(
        :query="query"
        v-if="loggedIn"
        @create-record="createRecord"
        @change-record="recordsChanged")
      q-btn(flat color="grey-4" @click="login()" v-else)
        q-avatar
          q-icon(name="https")
        .text-caption.text-uppercase {{ $t('labels.loginBtn') }}
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
        .row.navbar__collection-description.q-mb-xl(v-if="maximized")
          small {{ $t('collection.description') }}
        .row.search-input
          searchbar(:maximized="maximized" v-if="query || maximized" :query="query" @search="doSearch")
        .row.q-mt-sm(v-if="maximized")
          q-btn.navbar__collection-action(
            square
            unelevated
            size="lg"
            @click="doSearch"
            :label="$t('labels.searchBtn')")
      .col-auto.self-center.full-height.q-ml-md(v-if="!maximized")
        account-dropdown(
          :query="query"
          v-if="loggedIn"
          @create-record="createRecord"
          @change-record="recordsChanged")
        q-chip(clickable outline color="grey-4" @click="login()" size="xl" icon="https" v-else)
          .text-caption.text-uppercase {{ $t('labels.loginBtn') }}
</template>

<script>
import { Vue, Component, Emit } from 'vue-property-decorator'
import Searchbar from 'components/search/Searchbar'
import AccountDropdown from 'components/navigation/AccountDropdown'
import LocaleSwitcher from 'components/i18n/LocaleSwitcher'

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
  mounted () {
    // Fetch user login state
    this.auth$.login({ vue: this, ensureLoggedIn: false })
  }

  get loggedIn () {
    return this.auth$.loggedLocally
  }

  @Emit('login')
  login () {
    this.$gdpr.showGdprPrompt(() => {
      this.auth$.login({ vue: this })
    }, this)
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
  &__collection-action
    background-color: $dark-primary
  &__toolbar-title
    white-space: normal
</style>
