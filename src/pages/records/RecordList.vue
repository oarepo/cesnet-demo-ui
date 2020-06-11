<template lang="pug">
q-page(padding).q-pb-xl
  .row.q-my-xl
    q-list.full-width.records__list(separator)
      q-item-label(header) {{ $t('labels.recordList.header', { num: totalRecords }) }}
        transition-group(
          appear
          enter-active-class="animated slideInUp"
          leave-active-class="animated fadeOut")
          record(
            v-for="record in records"
            :key="`${record.id}-v${record.revision}`"
            @expand="recordExpanded"
            :id="record.id"
            :links="record.links"
            :revision="record.revision"
            :created="record.created"
            :updated="record.updated"
            :metadata="record.metadata"
            @change-record="recordChanged")
            span {{ record.id }} {{ record.revision }}
      q-inner-loading(:showing="!loaded")
        q-spinner-gears(size="100px" color="accent")
  active-filters(:query="filteredQueryParams" @remove="removeFilter")
  pagination(:query="query")
</template>

<script>
import { scrollToElement } from 'src/utils/scrolling'
import { State } from '@oarepo/invenio-api-vuex'
import { Component, Emit, Vue } from 'vue-property-decorator'
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

  recordExpanded (el) {
    this.$nextTick(() => {
      scrollToElement(el.$el)
    })
  }

  @Emit('change-record')
  recordChanged () { }

  @Emit('remove-filter')
  removeFilter (filter) {
    switch (filter.name) {
      case 'q': {
        this.query.q = ''
        break
      }
      case 'owned': {
        this.query.owned = false
        break
      }
      default: {
        this.query._remove(filter.name, filter.value)
        break
      }
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
