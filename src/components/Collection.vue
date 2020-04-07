<template>
  <div class="collection">
    <div class="row">
      <div class="col">
        <b>Records</b><br><br>
        <div v-for="record of records" :key="record.links.self">
          <router-link :to="record.links.ui">{{ record.metadata.title[0].value }}</router-link>
        </div>
        <data-renderer :options="{}" :data="{title:'hello world', creator: 'god'}" :layout="{}" ></data-renderer>
        <br>Page 1 of {{ pages }}
        <br>Filter in effect:
<!--        <pre>{{ queryParams }}</pre>-->
      </div>
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
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import DataRendererBooleanComponent from '@oarepo/data-renderer-2'
// import { facetQuerySynchronization } from '@oarepo/invenio-api-vuex'

export default {
  name: 'Collection',
  components: {
    // DataRendererBooleanComponent
  },
  props: {
    filter: Object
  },
  computed: {
    ...mapState({
      records: state => state.oarepoCollection.records,
      pages: state => state.oarepoCollection.totalPages
    })
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

  .col {
    flex: 1
  }

  .facet-values {
    margin-left: 30px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
</style>
