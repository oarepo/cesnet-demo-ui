<template lang="pug">
q-page(padding).q-pb-xl
  .row.q-my-xl
    q-list(separator).records__list
      q-item-label(header) {{ $t('labels.recordList.header', { num: totalRecords }) }}
        transition-group(
          appear
          enter-active-class="animated slideInUp"
          leave-active-class="animated fadeOut")
          record(
            v-for="record in records"
            :key="record.id"
            :links="record.links"
            :revision="record.revision"
            :created="record.created"
            :updated="record.updated"
            :metadata="record.metadata")
      q-inner-loading(:showing="!loaded")
        q-spinner-gears(size="100px" color="accent")
  active-filters(:query="filteredQueryParams" @remove="removeFilter")
  q-page-sticky(v-if="totalPages > 1" position="bottom" :offset="[-10, 30]")
    q-toolbar.bg-accent.rounded-borders.shadow-4
      q-toolbar-title
        q-pagination(
          dark
          color="white"
          text-color="primary"
          v-model="query.page"
          :max="totalPages"
          :max-pages="6"
          :boundary-numbers="true"
        )
</template>

<script>
import { State } from '@oarepo/invenio-api-vuex'
import { Component, Vue, Watch } from 'vue-property-decorator'
import Record from 'components/records/Record'
import ActiveFilters from 'components/search/ActiveFilters'

export default @Component({
  name: 'RecordList',
  components: {
    Record,
    ActiveFilters
  },
  props: {
    query: Object
  }
})
class RecordList extends Vue {
  prevPage = this.query.page

  validatePageQuery () {
    // Sanity check if page query does not exceed total pages
    if (this.query.page > this.totalPages) {
      console.error(`Page query exceeds total pages (${this.query.page} > ${this.totalPages})`)
      this.query.page = 1
    }
  }

  created () {
    this.validatePageQuery()
  }

  @Watch('query.page')
  onPageChange () {
    this.validatePageQuery()
  }

  @Watch('totalPages')
  onTotalPagesChange () {
    this.validatePageQuery()
  }

  get filteredQueryParams () {
    const excluded = ['page']
    return Object.keys(this.queryParams)
      .filter(key => !excluded.includes(key))
      .reduce((obj, key) => {
        obj[key] = this.queryParams[key]
        return obj
      }, {})
  }

  get totalRecords () {
    return this.$oarepo.collection.totalRecords
  }

  get records () {
    return this.$oarepo.collection.records
  }

  get totalPages () {
    return this.$oarepo.collection.totalPages
  }

  get queryParams () {
    return this.$oarepo.collection.queryParams
  }

  get loaded () {
    return this.$oarepo.collection.state === State.LOADED
  }

  get facets () {
    console.log(this.$oarepo.collection.facets)
    return this.$oarepo.collection.facets
  }

  removeFilter (filter) {
    if (filter.name === 'q') {
      this.query.q = ''
    } else {
      console.log(filter, this.query)
      this.query._remove(filter.name, filter.value)
      console.log(this.query)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .row {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
