<template lang="pug">
.row.no-wrap.bg-primary.navbar(:class="{'navbar__maximized': maximized, 'navbar__minimized': !maximized}")
  q-toolbar.col-grow.text-grey-2.shadow-12
    q-toolbar(inset)
      .row
        .col-auto(v-if=maximized)
        q-toolbar-title.col-grow.landing__toolbar-title.text-center
          .row.landing__collection-title(v-if="maximized")
            h3 {{ $t('app.title') }}
          .row.landing__collection-description(v-if="maximized")
            small {{ collection.description[$i18n.locale] }}
          .row.search-input
            q-input.collections__search.q-my-xl.full-width(
              autofocus
              standout
              @keydown.enter.prevent="maximized = false"
              :label="$t('labels.searchInput') + '…'"
              v-model.trim="search")
              template(v-slot:append)
                q-icon.cursor-pointer(v-if="search === ''" name="search" @click="maximized = false")
                q-icon.cursor-pointer(v-else name="clear" @click="search = ''")
        .col-auto(v-if=maximized)
    transition(name="fade" leave-active-class="animated fadeOut")
      .col-5.full-height.landing__backdrop.particles.gt-md(v-if="maximized")
        vue-particles.full-height(
            color="#dedede"
            shapeType="edge"
            :particleSize="10"
            :particlesNumber="35")
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import LandingPage from '../pages/LandingPage'

export default @Component({
  name: 'LandingPageLayout',
  components: {
    LandingPage
  }
})
class LandingPageLayout extends Vue {
  maximized = true
  search = ''

  get collection () {
    if (this.$oarepo.collections.collections) {
      return this.$oarepo.collections.collections[0]
    }
  }

  reload () {
    return this.$oarepo.collections.reload()
  }
}
</script>
<style lang="sass">
.fade-enter-active, .fade-leave-active
  transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0

.navbar
  &__minimized
    height: 10vh !important
  &__maximized
    height: 100vh !important
  transition: 1s cubic-bezier(.7,.28,.47,1.15) height
  opacity: 1
.landing
  &__backdrop
    background-image: url('../statics/landing-bg.jpg')
    background-size: cover
    filter: sepia() blur(1px)
    opacity: .6
  &__collection-title
    letter-spacing: .2rem
  &__toolbar-title
    white-space: normal
  &__container
    height: calc(100vh - 50px)
  &__footer
    background-color: $secondary
    height: 50px
  &__hero
    background: rgb(0,150,231)
    background: -moz-linear-gradient(170deg, rgba(0,150,231,.8) 0%, rgba(0,105,162,1) 47%, rgba(0,85,131,.8) 100%)
    background: -webkit-linear-gradient(170deg, rgba(0,150,231,.8) 0%, rgba(0,105,162,1) 47%, rgba(0,85,131,.8) 100%)
    background: linear-gradient(170deg, rgba(0,150,231,.8) 0%, rgba(0,105,162,1) 47%, rgba(0,85,131,.8) 100%)
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0096e7",endColorstr="#005583",GradientType=1)
    //transform: translateX(-25px) !important
</style>
