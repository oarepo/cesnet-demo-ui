<template lang="pug">
q-page.q-ma-xl
  .row.q-gutter-sm.z-max.q-pt-xs.q-pr-lg
    q-list
      q-item-label(header) {{ Object.keys(queryParams).length > 0 ?  $t('labels.activeFilters.header'): $t('labels.activeFilters.empty') }}
      active-filters(:query="queryParams" @remove="removeFilter")
  .row
    q-list(separator).records__list
      q-item-label(header) {{ $t('labels.recordList.header', { num: totalRecords }) }}
        record(
          v-for="record in records"
          :key="record.id"
          :links="record.links"
          :created="record.created"
          :updated="record.updated"
          :metadata="record.metadata")
  .row.justify-center
    .col-auto.q-gutter-sm.z-max.q-pt-xs.q-pr-lg
      q-pagination(
        color="accent"
        @input="changePage"
        v-model="currentPage"
        :max="totalPages"
        :max-pages="6"
        :boundary-numbers="true"
    )
<!--        data-renderer(:data="record" :pathLayouts="pathLayouts" schema="block")-->

<!--  <div class="collection">-->
<!--    <div class="row">-->
<!--      <div class="col">-->
<!--        <b>Records</b><br><br>-->
<!--        <pre>{{ records }}</pre>-->
<!--        <div v-for="record of records" :key="record.links.self">-->
<!--          <router-link :to="record.links.ui">{{ record }}</router-link>-->
<!--        </div>-->
<!--        <br>Page 1 of {{ pages }}-->
<!--        <br>Filter in effect:-->
<!--        <pre>{{ queryParams }}</pre>-->
<!--      </div>-->
<!--      <div class="col">-->
<!--        <b>Facets</b><br><br>-->
<!--        <div v-for="facet of facetsWithQuery" :key="facet.code">-->
<!--          {{ facet.label }}-->
<!--          <div class="facet-values">-->
<!--            <div v-for="fb in facet.facets" :key="fb.code">-->
<!--              <input type="checkbox" v-model="fb.model"> {{ fb.count }} {{ fb.label }}-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import { facetQuerySynchronization } from '@oarepo/invenio-api-vuex'
import { Component, Vue } from 'vue-property-decorator'
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
  currentPage=1

  pathLayouts = {
    title: {
      arrayWrapper: {
        element: 'h4'
      }
    }
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

  get facets () {
    return this.$oarepo.collection.facets
  }

  facetsWithQuery () {
    return facetQuerySynchronization(this.facets, this.query)
  }

  changePage (num) {
    console.log('changePage', num)
  }

  removeFilter (name) {
    if (name === 'q') {
      this.query.q = ''
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
