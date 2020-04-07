<template lang="pug">
.column.collections.justify-center.q-px-xl
  .col
    .row.justify-center
      img.col.collections__logo(:src="collectionLogo")
  .col.text-center
    h2.collections__title.text-weight-bold {{ $t('app.title') }}
  .col.text-center
    h4.collections__subtitle.text-subtitle1 {{ collection.description[$i18n.locale] }}
  .col-5
    .row.justify-center
      .col-12
        q-input.collections__search.q-my-xl(
          dark
          autofocus
          standout
          :label="$t('labels.searchInput') + '…'"
          v-model="search")
          template(v-slot:append)
            q-icon(v-if="search === ''" name="search")
            q-icon.cursor-pointer(v-else name="clear" @click="search = ''")
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
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import LocaleSwitcher from './i18n/LocaleSwitcher'

export default @Component({
  name: 'collections',
  components: {
    LocaleSwitcher
  }
})
class Collections extends Vue {
  search = ''
  collectionLogo = 'statics/logos/datacare_White.svg'

  get collection () {
    if (this.$oarepo.collections.collections) {
      return this.$oarepo.collections.collections[0]
    }
  }

  reload () {
    return this.$oarepo.collections.reload()
  }

  doSearch () {
    this.$emit('search')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.collections
  height: auto

  &__logo
    min-height: 150px
    max-height: 150px

  &__title
    letter-spacing: .3rem

  &__search
    font-size: 1.3rem
</style>
