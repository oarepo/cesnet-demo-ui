<template lang="pug">
div(:class="[ maximized? 'col-xs-12 col-lg-7 q-mb-xl': 'col-12']")
  .row.full-width(v-if="maximized")
    menu-dropdown.col-12.q-pt-xl(
      :query="query"
      @search="doSearch"
      @create-record="createRecord"
      @change-record="recordsChanged")
  q-toolbar.row.full-height.navbar.text-grey-2
    q-scroll-area.fit
      q-toolbar.col-12.justify-around.q-mt-sm(:class="[ maximized? 'q-ml-md-xl q-py-xl q-my-xl': '']")
        .row.full-width.justify-sm-center.justify-lg-between.items-center.full-width(:class="[ maximized? 'q-mx-lg': '']")
          q-btn.col-auto.q-mr-md.q-pa-sm(
            v-if="detail"
            flat
            v-go-back.single
            rounded
            dense
            icon="arrow_back"
            :label="$t('labels.goBackBtn')")
          q-btn.col-auto.q-mr-md(v-else-if="!maximized" flat @click="toggleFacetsDrawer" round dense icon="menu")
          div(:class="[ maximized? 'q-mb-xl col-12': 'gt-sm col-auto']")
            .row.justify-xs-center.justify-sm-center.justify-md-center.justify-lg-start
              q-btn(flat @click="goHome")
                img.col-auto(
                  src="statics/logos/datacare_White.svg"
                  :class="[ maximized? 'navbar__logo__maximized': 'navbar__logo']")
          q-toolbar-title.self-center.navbar__toolbar-title.text-center(
            :class="[ maximized? 'col-12 col-md-10' : 'col6']")
            .row.justify-xs-center.justify-sm-center.justify-md-center.justify-lg-start.navbar__collection-title(v-if="maximized")
              h3.col-auto {{ $t('collection.title') }}
              q-space.col-auto
            .row.navbar__collection-description.q-mb-xl(v-if="maximized")
              small {{ $t('collection.description') }}
            .row.search-input.q-mr-xs-none.q-mr-sm.none.q-mr-md-lg
              searchbar.col-12(:maximized="maximized" v-if="query || maximized" :query="query" @search="doSearch")
            .row.justify-sm-center.justify-xs-center.justify-md-center.justify-lg-start.q-mt-sm(v-if="maximized")
              q-btn.bg-dark-primary.col-10.col-md-auto.navbar__collection-action(
                square
                unelevated
                size="lg"
                @click="doSearch"
                :label="$t('labels.searchBtn')")
          .col-auto.gt-sm.self-center.full-height.q-ml-md(v-if="!maximized")
            account-dropdown(
              :query="query"
              v-if="loggedIn"
              @create-record="createRecord"
              @change-record="recordsChanged")
            q-chip(clickable outline color="grey-4" @click="login(doSearch)" size="xl" icon="https" v-else)
              .text-caption.text-uppercase {{ $t('labels.loginBtn') }}
</template>

<script>
import { Component, Emit } from 'vue-property-decorator'
import Searchbar from 'components/search/Searchbar'
import AccountDropdown from 'components/widgets/dropdowns/AccountDropdown'
import MenuDropdown from 'components/widgets/dropdowns/MenuDropdown'
import LocaleSwitcher from 'components/i18n/LocaleSwitcher'
import { AuthStateMixin } from 'src/mixins/AuthStateMixin'
import { mixins } from 'vue-class-component'
import { RecordCreateMixin } from 'src/mixins/RecordCreateMixin'
import { SearchMixin } from 'src/mixins/SearchMixin'

export default @Component({
  name: 'Navbar',
  components: {
    Searchbar,
    AccountDropdown,
    MenuDropdown,
    LocaleSwitcher
  },
  props: {
    detail: Boolean,
    query: Object,
    maximized: Boolean
  }
})
class Navbar extends mixins(RecordCreateMixin, SearchMixin, AuthStateMixin) {
  mounted () {
    // Fetch user login state
    this.auth$.loggedIn({ vue: this, ensureLoggedIn: false })
  }

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
    max-height: 50px
    &__maximized
      height: 180px
      max-height: 180px
      margin-left: -50px
  &__collection-title h3
    letter-spacing: .2rem
  &__toolbar-title
    white-space: normal
</style>
