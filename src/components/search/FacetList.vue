<template lang="pug">
q-list(dark padding).rounded-borders.text-white
  q-item-label.text-overline.text-uppercase(header) {{ $t('labels.facets.header') }}
  q-separator
  q-expansion-item(
    v-for="facet of pagingFacets"
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
          :placeholder="$t(`labels.facetList.filters.${facet.code}`)")
      q-card-section(v-for="fb in filteredFacets(facet)" :key="fb.code")
        .row.justify-between
          q-checkbox.col-auto(
            dense
            v-model="facet.model"
            color="primary"
            :val="fb.value"
            :label="fb.label"
            @click.native="checkboxChecked(facet.code, fb.value, $event)")
          q-badge.col-auto(color="secondary") {{ fb.count }}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { facetQuerySynchronization } from '@oarepo/invenio-api-vuex'
import { czechSort } from 'src/utils/sort'

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
      return facet.values.filter(bucket => {
        if (this.creatorFilter) {
          return bucket.value.toLowerCase().includes(this.creatorFilter.toLowerCase())
        }
        return true
      })
    }
    return facet.values
  }

  get pagingFacets () {
    const query = this.query
    const ret = this.facetsWithQuery().map(facet => {
      const values = [...facet.facets]
      czechSort(values, x => this.valueLabel(facet.code, x.value))
      query._prop({ name: facet.code, debounce: 1 })
      const ret = {
        code: facet.code,
        label: this.$t(`labels.facetList.facets.${facet.code}`),
        model: this.query[facet.code] || [],
        values: values.map(val => ({
          ...val,
          value: val.value.toString(),
          label: this.valueLabel(facet.code, val.value)
        }))
      }
      Object.defineProperty(ret, 'model', {
        get () {
          return query[facet.code] || []
        },
        set (value) {
          query[facet.code] = value
          query.page = 1
        }
      })
      return ret
    })
    return ret
  }

  valueLabel (code, value) {
    if (['creator'].includes(code)) {
      // Untranslated facets
      return value
    } else {
      return this.$t(`labels.facetList.values.${code}.${value}`)
    }
  }

  checkboxChecked (key, value, $event) {
    const list = this.query[key]
    if (!$event.ctrlKey && list.includes(value)) {
      this.query[key] = list.filter(x => x === value)
    }
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
