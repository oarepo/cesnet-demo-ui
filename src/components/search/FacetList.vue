<template lang="pug">
q-list(dark padding).rounded-borders.text-white
  q-item-label.text-overline.text-uppercase(header) {{ $t('labels.facets.header') }}
  q-separator
  q-expansion-item(
    v-for="facet of facetsWithQuery()"
    :key="facet.code"
    :label="facet.label")
    q-card.bg-grey-9
      q-card-section(v-if="facet.code === 'creator'")
        q-input(
          type="search"
          v-model="creatorFilter"
          debounce="500"
          filled
          dark
          clearable
          :placeholder="$t('labels.facetList.filter.' + facet.code)")
      q-card-section(v-for="fb in filteredFacets(facet)" :key="fb.code")
        .row.justify-between
          q-checkbox.col-auto(dense v-model="fb.model" color="primary" :label="fb.label")
          q-badge.col-auto(color="secondary") {{ fb.count }}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { facetQuerySynchronization } from '@oarepo/invenio-api-vuex'

export default @Component({
  name: 'FacetList',
  props: {
    query: Object
  }
})
class FacetList extends Vue {
  creatorFilter = ''

  filteredFacets (facet) {
    if (facet.code === 'creator') {
      return facet.facets.filter(facet => {
        if (this.creatorFilter) {
          return facet.value.toLowerCase().includes(this.creatorFilter.toLowerCase())
        }
        return true
      })
    }
    return facet.facets
  }

  get facets () {
    return this.$oarepo.collection.facets
  }

  facetsWithQuery () {
    return facetQuerySynchronization(this.facets, this.query)
  }
}
</script>

<style scoped>

</style>
