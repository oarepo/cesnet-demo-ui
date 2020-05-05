<template lang="pug">
q-layout(view="hHh Lpr fff" class="bg-grey-1")
  q-header(elevated)
    q-slide-transition(:duration="100")
      .row.no-wrap.bg-primary.layout__header(:class="[maximized? 'layout__header__maximized': 'layout__header__minimized']")
        navbar(
          :maximized="maximized"
          :query="query"
          @facets="facetsDrawer = !facetsDrawer"
          @home="maximize"
          @search="doSearch")
        transition(leave leave-active-class="animated slideOutRight")
          particles-box(v-show="maximized")
  q-slide-transition(appear)
    q-page-container.layout__content(v-if="!maximized")
      record-list(v-if="!maximized" :query="query" @remove-filter="resetPaging()")
  q-drawer(
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

export default @Component({
  name: 'MainLayout',
  props: {
    query: Object
  },
  components: {
    Navbar,
    FacetList,
    RecordList,
    ParticlesBox
  }
})
class MainLayout extends Vue {
  maximized = true
  facetsDrawer = false

  created () {
    if (this.query.list) {
      this.maximized = false
    }
  }

  @Watch('$route', { immediate: true, deep: true })
  routeChange (to) {
    if (to.name === 'landing') {
      this.maximized = true
    }
  }

  @Watch('maximized')
  hideFacetsOnMaximize () {
    if (this.maximized) {
      this.facetsDrawer = false
    }
  }

  @Watch('$i18n.locale')
  localeChange () {
    this.$oarepo.collection.transform()
  }

  resetPaging () {
    this.query.page = 1
  }

  maximize () {
    this.maximized = true
    this.query.list = 0
  }

  doSearch () {
    if (!this.query.list) {
      this.maximized = false
      this.facetsDrawer = true
      this.query.list = 1
      console.log('show record list', this.query)
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
