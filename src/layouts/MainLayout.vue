<template lang="pug">
q-layout(view="hHh Lpr fff" class="bg-grey-1")
  q-header(elevated)
    q-slide-transition(:duration="100")
      .row.no-wrap.bg-primary.layout__header(:class="[view === views.INTRO? 'layout__header__maximized': 'layout__header__minimized']")
        navbar(
          :maximized="view === views.INTRO"
          :query="query"
          @facets="facetsDrawer = !facetsDrawer"
          @home="view = views.INTRO"
          @search="doSearch")
        transition(leave leave-active-class="animated slideOutRight")
          particles-box(v-show="view === views.INTRO")
  q-slide-transition(appear)
    q-page-container.layout__content(v-if="view !== views.INTRO")
      record-list(v-if="view === views.LIST" :query="query" @remove-filter="resetPaging()")
      record-create(v-if="view === views.CREATE")
  q-drawer(
    v-if="facetsDrawerEnabled"
    v-model="facetsDrawer"
    :width="300"
    :breakpoint="700"
    bordered
    content-class="bg-secondary text-white")
    q-scroll-area.fit
      .q-pa-md
        facet-list(:query="query")
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator'
import Navbar from 'components/navigation/Navbar'
import ParticlesBox from 'components/landing/ParticlesBox'
import FacetList from 'components/search/FacetList'
import RecordList from 'pages/records/RecordList'
import RecordCreate from 'pages/records/RecordCreate'

export default @Component({
  name: 'MainLayout',
  props: {
    query: Object
  },
  components: {
    Navbar,
    FacetList,
    RecordList,
    RecordCreate,
    ParticlesBox
  }
})
class MainLayout extends Vue {
  maximized = true
  facetsDrawer = false
  hideIntro = false
  facetsDrawerEnabled = false
  views = Object.freeze({ INTRO: 0, LIST: 1, CREATE: 2 })
  view = this.views.INTRO

  created () {
    this.updateView()
  }

  @Watch('$route', { immediate: false, deep: true })
  routeChanged (to) {
    this.updateView()
  }

  updateView (to) {
    const crn = to || this.$router.currentRoute
    console.log('update view for route', crn.name)

    if (this.query) {
      // Query dependent views
      if (!this.hideIntro && crn.name === 'index') {
        this.view = this.views.INTRO
      } else if (this.hideIntro && crn.name === 'index') {
        this.view = this.views.LIST
      } else if (crn.name === 'records-create') {
        this.view = this.views.CREATE
      }
    }
  }

  @Watch('view')
  viewChanged () {
    switch (this.view) {
      case this.views.INTRO:
        if (this.hideIntro) {
          this.hideIntro = false
        }
        this.$router.replace({ name: 'index' })
        this.facetsDrawer = false
        break
      case this.views.LIST:
        this.hideIntro = true
        this.facetsDrawerEnabled = true
        this.facetsDrawer = true
        break
      case this.views.CREATE:
        this.facetsDrawerEnabled = false
        this.facetsDrawer = false
        break
    }
  }

  @Watch('$i18n.locale')
  localeChange () {
    this.$oarepo.collection.transform()
  }

  resetPaging () {
    this.query.page = 1
  }

  doSearch () {
    if (this.$router.currentRoute.name !== 'index') {
      this.$router.push({ name: 'index' })
    }
    if (!this.hideIntro) {
      this.view = this.views.LIST
    } else {
      this.resetPaging()
    }
  }
}
</script>
<style lang="sass">
.layout
  &__header
    &__minimized
      height: 10vh !important
    &__maximized
      height: 100vh !important
    transition: 1s cubic-bezier(.7,.28,.47,1.15) height
    opacity: 1
  &__content
    width: 100%
    position: absolute
    transition: all 0.3s
</style>
