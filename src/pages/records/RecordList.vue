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
  q-page-sticky(v-if="totalPages > 1" position="bottom" :offset="[0, 30]")
    q-toolbar.bg-accent.rounded-borders.shadow-4
      q-toolbar-title
        q-pagination(
          dark
          color="white"
          text-color="primary"
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
  currentPage = 1
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
