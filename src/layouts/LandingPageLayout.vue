<template lang="pug">
q-layout.landing__page(view="hHh lpR fff")
  q-header.landing__header(class="bg-primary text-white" ref="hdr")
    q-toolbar
      div(style="width: 10vw")
      q-toolbar-title.row
        img.landing__avatar(src="/statics/logos/datacare_White.png")
        div.q-ml-xl.landing__title Demo repozitář
    // q-toolbar.landing__line
  .row.landing__container.items-stretch(ref="container")
    .full-height.gt-md.landing__left(ref="left")
      vue-particles.full-height(
        color="#dedede"
        shapeType="edge"
        :particleSize="10"
        :particlesNumber="35" ref="particles")
    .landing__body(ref="body")
      .landing__hero.full-width.full-height(:class="containerClass" ref="hero")
        .full-height.full-width.landing__bg_container
        q-page-container.landing__router_container.full-width(ref="routerContainer")
          transition(name="fade" mode="out-in")
            .row.justify-center.full-width
              landing-page(@search="click")
  q-footer.landing__footer.text-white(elevated)
    q-toolbar
      q-toolbar-title  # TODO: create footer component
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import LandingPage from '../pages/LandingPage'
import { TimelineLite } from 'gsap'

export default @Component({
  name: 'LandingPageLayout',
  components: {
    LandingPage
  }
})
class LandingPageLayout extends Vue {
  containerClass = ['container-full-height', 'col-12', 'col-sm-10', 'col-md-6', 'shadow-2']

  mounted () {
    window.addEventListener(this.resize)
    this.$nextTick(this.resize)
  }

  resize () {
    // const { container, left, body } = this.$refs
  }

  click () {
    const { body, left, hero, hdr, routerContainer, particles } = this.$refs
    hero.style.background = 'rgb(0, 140, 221, 0.8)'
    console.log(body, left, hero, hdr)

    this.containerClass = []
    const t1 = new TimelineLite().addLabel('start')
    t1.to(body, 1, { width: '80vw' }, 'start')
    t1.to(left, 1, { width: '10vw' }, 'start')
    t1.to(hero, 1, { background: 'rgba(255,255,255,0.95)' }, 'start')
    t1.to(hdr.$el, 1, { top: 0 }, 'start')
    t1.to(routerContainer.$el, 1.5, { opacity: 0, top: body.clientHeight }, 'start')
    t1.to(particles.$el, 1, { opacity: 0 }, 'start')
    // this.$router.push({ name: 'search' })
  }
}
</script>
<style lang="sass">
.landing
  &__page
    background-image: url('../statics/landing-bg.jpg')
    background-size: cover

  &__container
    height: calc(100vh - 50px)
    z-index: 1
    background-color: rgba(0, 150, 231, 0)

  &__left
    position: relative
    display: inline-block
    left: 0
    top: 0
    width: 50%

  &__body
    position: relative
    display: inline-block
    top: 0
    width: 50%

  &__header
    position: fixed
    top: -70px

  &__footer
    background-color: $secondary
    height: 50px

  &__hero
    display: inline-block
    width: 40vw
    position: relative
    background: rgb(0, 150, 231)
    background: -moz-linear-gradient(170deg, rgba(0, 150, 231, .8) 0%, rgba(0, 105, 162, 1) 47%, rgba(0, 85, 131, .8) 100%)
    background: -webkit-linear-gradient(170deg, rgba(0, 150, 231, .8) 0%, rgba(0, 105, 162, 1) 47%, rgba(0, 85, 131, .8) 100%)
    background: linear-gradient(170deg, rgba(0, 150, 231, .8) 0%, rgba(0, 105, 162, 1) 47%, rgba(0, 85, 131, .8) 100%)
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0096e7", endColorstr="#005583", GradientType=1)

  &__bg_container
    position: absolute
    top: 0
    left: 0

  &__router_container
    position: absolute
    top: 0
    left: 0
    z-index: 10

  &__line
    height: 20px !important
    min-height: 32px
    max-height: 32px
    background-image: url("/statics/bar.png")
    background-repeat: repeat-x

  &__avatar
    position: relative
    height: 60px
    width: 120px
    padding-top: 10px
    padding-bottom: 10px
    z-index: 10

  &__title
    font-size: 32px
//transform: translateX(-25px) !important
.container-full-height
  min-height: calc(100vh - 74px)
</style>
