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
  pagination(:query="query")
</template>

<script>
import { State } from '@oarepo/invenio-api-vuex'
import { Component, Vue } from 'vue-property-decorator'
import Record from 'components/records/Record'
import ActiveFilters from 'components/search/ActiveFilters'
import Pagination from 'components/navigation/Pagination'

export default @Component({
  name: 'RecordList',
  components: {
    Record,
    ActiveFilters,
    Pagination
  },
  props: {
    query: Object
  }
})
class RecordList extends Vue {
  get filteredQueryParams () {
    const excluded = ['page', 'list']
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

  get queryParams () {
    return this.$oarepo.collection.queryParams
  }

  get loaded () {
    return this.$oarepo.collection.state === State.LOADED
  }

  get facets () {
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
