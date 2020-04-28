<template lang="pug">
q-page(padding).q-pb-xl
  .row.q-gutter-sm.z-max.q-pt-xs.q-pr-lg
    q-list
      q-item-label(header) {{ Object.keys(queryParams).length > 0 ?  $t('labels.activeFilters.header'): $t('labels.activeFilters.empty') }}
      active-filters(:query="filteredQueryParams" @remove="removeFilter")
  .row
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
  .row.justify-center.q-pb-xl
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
import { State } from '@oarepo/invenio-api-vuex'
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
  prevPage = 1

  pathLayouts = {
    title: {
      arrayWrapper: {
        element: 'h4'
      }
    }
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

  changePage (num) {
    if (this.prevPage !== this.currentPage) {
      this.prevPage = num
      this.query.page = num
    }
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
