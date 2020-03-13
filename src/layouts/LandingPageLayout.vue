<template lang="pug">
  q-layout.landing__body(view="hHh lpR fff")
    .row.landing__container.justify-center
      .col-6.full-height.gt-md
        vue-particles.full-height(
          color="#dedede"
          shapeType="edge"
          :particleSize="10"
          :particlesNumber="35")
      .landing__hero.col-12.col-sm-10.col-md-6.shadow-2.full-height
        q-page-container
          landing-page
    q-footer.landing__footer.text-white(elevated)
      q-toolbar
        q-toolbar-title  # TODO: create footer component
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
}
</script>
<style lang="sass">
.landing
  &__body
    background-image: url('../statics/landing-bg.jpg')
    background-size: cover
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
