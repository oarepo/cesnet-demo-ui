<template lang="pug">
q-layout(view="hHh Lpr fff" class="bg-grey-1")
  q-header(elevated)
    q-slide-transition(:duration="100")
      .row.no-wrap.layout__header.layout__header__minimized
        navbar(
          detail
          :maximized="false"
          :query="query"
          @create-record="recordCreateDialog = true"
          @change-record="recordsChanged"
          @home="goHome()"
          @search="doSearch()")
  q-slide-transition(appear)
    q-page-container.layout__content
      record-detail(
        @change-record="recordsChanged"
        @remove-filter="resetPaging()")
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator'
import Navbar from 'components/navigation/Navbar'
import ParticlesBox from 'components/landing/ParticlesBox'
import FacetList from 'components/search/FacetList'
import RecordDetail from 'pages/records/RecordDetail'

export default @Component({
  name: 'RecordDetailLayout',
  props: {
    query: Object
  },
  components: {
    Navbar,
    FacetList,
    RecordDetail,
    ParticlesBox
  }
})
class RecordDetailLayout extends Vue {
  async recordsChanged () {
    await this.$oarepo.collection.reload()
  }

  @Watch('$i18n.locale')
  localeChange () {
    this.$oarepo.collection.transform()
  }

  goHome () {
    this.$router.push({ name: 'index' })
  }

  doSearch () {
    if (this.$router.currentRoute.name !== 'index') {
      this.$router.push({ name: 'index' })
    }
  }
}
</script>
<style lang="sass">
.layout
  &__header
    background: linear-gradient(145deg, $primary 11%, $dark-primary 75%)
    &__minimized
      height: 80px !important
    transition: 1s cubic-bezier(.7,.28,.47,1.15) height
    opacity: 1
  &__content
    width: 100%
    position: absolute
    transition: all 0.3s
</style>
