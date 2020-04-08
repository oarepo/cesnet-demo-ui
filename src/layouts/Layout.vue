<template lang="pug">
.full-width.full-height(v-if="layout")
  q-layout.layout__page(view="hHh lpR fff" ref="page" :class='bodyClass')
    q-header.layout__header(class="bg-primary text-white" ref="header")
      q-toolbar
        div.layout__toolbar_spacer(style="width: 10vw" ref="headerSpacer")
        q-toolbar-title.row
          img.layout__logo(src="statics/logos/datacare_White.png" ref="logo")
          div.q-ml-xl.layout__title(ref="title") {{ $repo.ui.repositoryName }}
    q-page-container.layout__body.row.items-stretch(ref="body" style="padding-top: 0")
      .layout__left(ref="left")
        slot(name='left')
      .layout__main_wrapper.col(ref="mainWrapper")
          .full-width.layout__main_bg_1(ref="mainBg1")
          .full-width.layout__main_bg_2(ref="mainBg2")
          .layout__main.full-width(ref="main")
            slot(name='main')
      .layout__right(ref="right")
        slot(name='right')
    q-footer.layout__footer.text-white(elevated)
      q-toolbar
        q-toolbar-title  # TODO: create footer component
</template>

<script>
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import LayoutMixin from './LayoutMixin'

export default @Component({
  name: 'Layout'
})
class Layout extends mixins(LayoutMixin) {
}
</script>
<style lang="sass">
@import 'src/css/sizing'
.intro
  .layout
    &__header
      top: -70px

    // &__left
      background-color: green

    // &__right
      background-color: green

    &__body
      padding-top: 0px
      // background-color: yellow

    // &__main_wrapper
      background-color: orange

    // &__main_bg_1
      background-color: white

    // &__main_bg_2
      background-color: blue

    // &__main
      background-color: rgba(255,0,0,0.5)

  // sizing, must be compatible with LayoutMixin.js so that animations work
  body.screen--xs &
    .layout
      &__left
        width: 0
      &__right
        width: 0

  body.screen--sm &
    .layout
      &__left
        width: 10px
      &__right
        width: 10px

  body.screen--md &
    .layout
      &__left
        @extend .col-4
      &__right
        @extend .col-0

  body.screen--lg &
    .layout
      &__left
        @extend .col-6
      &__right
        @extend .col-0

  body.screen--xl &
    .layout
      &__left
        @extend .col-3
      &__right
        @extend .col-3

.normal
  .layout
    &__left
      left: 0
      top: 0

    &__right
      left: 0
      top: 0
    &__main
      background-color: rgba(255,255,255,0.5)
  // sizing, must be compatible with LayoutMixin.js so that animations work
  body.screen--xs &
    .layout
      &__left
        width: 0
      &__right
        width: 0

  body.screen--sm &
    .layout
      &__left
        width: 10px
      &__right
        width: 10px

  body.screen--md &
    .layout
      &__left
        @extend .col-1
      &__right
        @extend .col-1

  body.screen--lg &
    .layout
      &__left
        @extend .col-2
      &__right
        @extend .col-2

  body.screen--xl &
    .layout
      &__left
        @extend .col-2
      &__right
        @extend .col-2

</style>
