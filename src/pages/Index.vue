<template lang="pug">
layout.index(ref="layout" @change="state = $event" :layout="layout" :animateProps="animateProps")
  template(v-slot:left)
    vue-particles.full-height(
      color="#dedede"
      shapeType="edge"
      :particleSize="10"
      :particlesNumber="35" ref="particles")
  template(v-slot:main)
    .full-width
      .index__floating_search(ref="searchboxContainer" :class="{hidden: !started}")
        div#searchbox
          q-input.index__search.q-my-xl(
            :dark='!floatingSearch'
            autofocus
            :filled='floatingSearch'
            :standout='!floatingSearch'
            :label="$t('labels.searchInput') + '…'"
            label-color='blue'
            v-model="search"
            @keydown.enter.prevent="doSearch"
            ref="searchbox")
            template(v-slot:append)
              q-icon(v-if="search === ''" name="search")
              q-icon.cursor-pointer(v-else name="clear" @click="search = ''")
      .full-width.row(ref="container")
        .column.col-8.offset-2(ref="intro")
          .col-1
            .row.justify-end
              .col-4.col-md-3
                locale-switcher
          .col-2
            .row.justify-center
              img.col.index__logo(:src="collectionLogo")
          .col-3.text-center
            h2.index__title.text-weight-bold.text-white Demo Repository Records
          .col-1.text-center
            h4.index__subtitle.text-subtitle1.text-grey-5 A collection of a Demo Records that adhere to the DCObject metadata schema.
          .col
            .row.justify-center(style="min-height: 150px")
              .col-12
                .index__search_target.full-width(ref="portal")
            .row.justify-between
              .col-5
                q-btn.full-height.full-width(to="/records/create"
                  icon="add"
                  size="lg"
                  color="positive"
                  :label="$t('labels.createRecordBtn')")
              .col-5
                q-btn.full-height.full-width.col(
                  no-wrap
                  color="accent"
                  size="lg"
                  icon="search"
                  :label="$t('labels.searchBtn')" @click="doSearch")
          .col-1
</template>

<script>
import Layout from '../layouts/Layout'

import { Vue, Component } from 'vue-property-decorator'
import LocaleSwitcher from '../components/i18n/LocaleSwitcher'
import Collections from '../components/Collections'


export const LayoutTypes = {
  INTRO: {
    code: 'intro',
    bodyClass: 'intro',
    xs: {
      left: { width: 0 },
      right: { width: 0 }
    },
    sm: {
      left: { width: '10px' },
      right: { width: '10px' }
    },
    md: {
      left: { width: 4 },
      right: { width: 0 }
    },
    lg: {
      left: { width: 6 },
      right: { width: 0 }
    },
    xl: {
      left: { width: 4 },
      right: { width: 2 }
    },
    header: {
      top: '-70px'
    },
    main: {
      'background-color': 'rgba(255,255,255,0.0)'
    },
    mainBg2: {
      opacity: 1.0
    }
  },
  NORMAL: {
    code: 'normal',
    bodyClass: 'normal',
    xs: {
      left: { width: 0 },
      right: { width: 0 }
    },
    sm: {
      left: { width: '10px' },
      right: { width: '10px' }
    },
    md: {
      left: { width: 1 },
      right: { width: 1 }
    },
    lg: {
      left: { width: 2 },
      right: { width: 2 }
    },
    xl: {
      left: { width: 2 },
      right: { width: 2 }
    },
    header: {
      top: '0'
    },
    main: {
      'background-color': 'rgba(255,255,255,0.9)'
    },
    body: {
      'padding-top': '60px'
    },
    mainBg2: {
      opacity: 0.0
    }
  }
}


export default @Component({
  name: 'Index',
  components: {
    Layout,
    LocaleSwitcher,
    Collections
  }
})
class Index extends Vue {
  layout = LayoutTypes.INTRO
  animateProps = ['left', 'right', 'header', 'main', 'mainBg2', 'body']

  collectionLogo = 'statics/logos/datacare_White.svg'
  search = ''
  floatingSearch = false
  started = false

  doSearch () {
    this.positionSearch()
    this.animate()
  }

  mounted () {
    this.$nextTick(() => {
      this.$nextTick(() => {
        this.positionSearch()
        this.started = true
        this.$nextTick(() => {
          this.$refs.searchbox.focus()
        })
      })
    })
  }

  positionSearch () {
    // set searchbox dimensions and position, it wil lbe taken from the portal in the next tick with :disabled
    const portal = this.$refs.portal
    const searchboxPositionSize = portal.getBoundingClientRect()
    const containerPositionSize = this.$refs.container.getBoundingClientRect()

    this.$refs.searchboxContainer.style.left = `${searchboxPositionSize.left - containerPositionSize.left}px`
    this.$refs.searchboxContainer.style.top = `${searchboxPositionSize.top - containerPositionSize.top}px` // todo: hack, need to find where extra 50 pixels is
    this.$refs.searchboxContainer.style.width = `${searchboxPositionSize.width}px`
    this.$refs.searchboxContainer.height = `${searchboxPositionSize.height}px`
  }

  animate () {
    const layout = this.$refs.layout
    this.floatingSearch = true
    layout.transition(LayoutTypes.NORMAL, {
      timelineStart: (timeline) => {
        console.log(this.$refs.searchboxContainer.style.left, this.$refs.searchboxContainer.style.top)
        timeline.to(this.$refs.intro, {
          'margin-left': `-${this.$refs.searchboxContainer.style.left - 100}`,
          'margin-top': `-${this.$refs.searchboxContainer.style.top}`,
          duration: 1.5
        }, 'start')
        timeline.to(this.$refs.intro, {
          opacity: 0.0,
          duration: 1.0
        }, 'start')
        timeline.to(this.$refs.particles.$el, { opacity: 0.0 }, 'start')
        timeline.to(this.$refs.searchboxContainer, { left: 100, top: 0, duration: 1.5 }, 'start')
        this.$refs.searchbox.blur()
      }
    })
  }
}
</script>
<style lang="sass">
.index
  .layout__main_bg_2
    display: inline-block
    width: 40vw
    position: relative
    background: rgb(0, 150, 231)
    background: -moz-linear-gradient(170deg, rgba(0, 150, 231, .8) 0%, rgba(0, 105, 162, 1) 47%, rgba(0, 85, 131, .8) 100%)
    background: -webkit-linear-gradient(170deg, rgba(0, 150, 231, .8) 0%, rgba(0, 105, 162, 1) 47%, rgba(0, 85, 131, .8) 100%)
    background: linear-gradient(170deg, rgba(0, 150, 231, .8) 0%, rgba(0, 105, 162, 1) 47%, rgba(0, 85, 131, .8) 100%)
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0096e7", endColorstr="#005583", GradientType=1)

.index
  position: relative

  &__logo
    min-height: 150px
    max-height: 150px

  &__title
    letter-spacing: .3rem

  &__search
    font-size: 1.3rem

  &__floating_search
    position: absolute
    z-index: 10
    padding: 0 !important
    margin: 0 !important

  &__search_target
    height: 52px
</style>
