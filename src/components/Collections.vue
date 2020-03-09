<template lang="pug">
  .col-10.collections.q-pl-xl
    h2.collection-title.text-weight-bold {{ $t('app.title') }}
    h4.text-subtitle1.collection-subtitle {{ collection.description[$i18n.locale] }}
    q-input.collection-search.q-my-xl.q-ml-md(
      dark
      autofocus
      standout
      :label="$t('labels.searchInput')"
      v-model="search")
      template(v-slot:append)
        q-icon(v-if="search === ''" name="search")
        q-icon.cursor-pointer(v-else name="clear" @click="search = ''")
    q-btn(:to="`/records/?filter=${search}`" no-wrap color="accent" size="lg" icon="search" :label="$t('labels.searchBtn')")
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import LocaleSwitcher from './i18n/LocaleSwitcher'

export default @Component({
  name: 'collections',
  components: {
    LocaleSwitcher
  },
  props: {
    query: Object
  }
})
class Collections extends Vue {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.collection-title
  letter-spacing: .3rem
.collection-search
  font-size: 1.3rem
</style>
