<template lang="pug">
  q-layout(view="lHh Lpr fff" class="bg-grey-1")
    q-header.bg-primary.text-white-8(elevated height-hint="64")
      q-toolbar.collection__toolbar(height-hint="64")
        q-btn.q-mx-md(
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        )
        q-toolbar-title.row.items-center.no-wrap(v-if="$q.screen.gt.sm" shrink)
          img.col-3.collection__logo(:src="collectionLogo")
          span.q-ml-sm {{ collection.title[$i18n.locale] | capitalize }}
        q-space
        q-input.collection__toolbar-search(
          dark
          dense
          standout
          v-model="search"
          :placeholder="$t('labels.searchInput') + '…'")
          template(v-slot:prepend)
            q-icon(v-if="search === ''" name="search")
            q-icon(v-else name="clear" class="cursor-pointer" @click="search = ''")
        q-btn.q-ml-sm.q-px-md(
          v-if="$q.screen.gt.xs"
          size="md"
          dark
          flat
          dense
          no-wrap
          color="grey-4"
          icon="add"
          no-caps)
          q-menu(anchor="top right" self="top right")
            q-list.text-grey-8(style="min-width: 100px")
              q-item(aria-hidden="true")
                q-item-section.text-uppercase.text-grey-7(style="font-size: 0.7rem") {{ $t('labels.createNew') }}…
              q-item(v-for="menu in createMenu" :key="menu.text" clickable v-close-popup aria-hidden="true")
                q-item-section(avatar)
                  q-icon(:name="menu.icon")
                q-item-section {{ $t(menu.label) }}
        q-space
        locale-switcher
        .row.q-gutter-sm.items-center.no-wrap.q-ml-md
          q-btn(round dense flat icon="notifications")
            q-badge(dark color="negative" text-color="white" floating) 2
            q-tooltip {{ $t('tooltips.notifications') }}
          q-btn(round flat)
            q-avatar(size="26px") AN
            q-tooltip {{ $t('tooltips.anonymous') }}
    q-page-container.collection__page-container
      router-view
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import LocaleSwitcher from '../components/i18n/LocaleSwitcher'

export default @Component({
  name: 'CollectionLayout',
  components: {
    LocaleSwitcher
  }
})
class CollectionLayout extends Vue {
  search = ''
  leftDrawerOpen = false
  collectionLogo = 'statics/logos/datacare_White.svg'
  createMenu = [
    { icon: 'book', label: 'menu.createRecord' }
  ]

  get collection () {
    if (this.$oarepo.collections.collections) {
      return this.$oarepo.collections.collections[0]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.collection
    &__toolbar
      height: 64px
    &__logo
      min-width: 64px
    &__toolbar-search
      width: 35%
</style>
