<template lang="pug">
q-layout(view="hHh Lpr fff" class="bg-grey-1")
  q-header(elevated)
    .row.no-wrap.bg-primary.layout__header(:class="[maximized? 'layout__header__maximized': 'layout__header__minimized']")
      navbar(
        :maximized="maximized"
        :query="query"
        @facets="facetsDrawer = !facetsDrawer"
        @home="maximize"
        @search="doSearch")
      transition(leave leave-active-class="animated slideOutRight")
        particles-box(v-show="maximized")
  transition(:name="slidePageUp")
    q-page-container.layout__content(v-if="!maximized")
      router-view
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

export default @Component({
  name: 'MainLayout',
  props: {
    query: Object
  },
  components: {
    Navbar,
    FacetList,
    ParticlesBox
  }
})
class LandingPageLayout extends Vue {
  maximized = true
  facetsDrawer = false
  slidePageUp = 'overlap-left'

  created () {
    if (this.$route.name !== 'oarepoCollectionList') {
      this.maximized = false
    }
  }

  @Watch('$route', { immediate: true, deep: true })
  routeChange (to) {
    if (to.name === 'oarepoCollectionList') {
      this.maximized = true
    }
  }

  @Watch('maximized')
  hideFacetsOnMaximize () {
    if (this.maximized) {
      this.facetsDrawer = false
    }
  }

  maximize () {
    this.$router.push({ name: 'oarepoCollectionList' })
  }

  doSearch (search) {
    this.maximized = false
    this.facetsDrawer = true
    this.$router.push({
      name: 'RecordSearch',
      params: { collectionId: 'records' },
      query: { q: search }
    })
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
.overlap-left-enter, .overlap-left-enter-active
  opacity: 0
.overlap-left-enter-to
  opacity: 1
.overlap-left-leave-active
  transform: translate(100%, 0)
.overlap-right-leave-active
  z-index: -1
  opacity: 1
  transform: translate(-30px, 0)
.overlap-right-enter
  transform: translate(100%, 0)
</style>
