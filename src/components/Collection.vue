<template lang="pug">
.collection
  .row
    .col.records
      q-list.collection__list
        transition(v-for='record of currentRecords', :key='record.links.self'
          appear enter-active-class='animated fadeIn')
          q-item
            q-item-section(avatar)
              q-avatar(size='xl')
                q-icon(name='fas fa-book')
            q-item-section
              .text-h6 {{ record.metadata.title }}
              .text-subtitle1 {{ record.metadata.creator }}
    .col
      div(v-for='facet of facetsWithQuery', :key='facet.code')
        | {{ facet.label }}
        .facet-values
          div(v-for='fb in facet.facets', :key='fb.code')
            input(type='checkbox', v-model='fb.model')
            |  {{ fb.count }} {{ fb.label }}
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator'

import { facetQuerySynchronization } from '@oarepo/invenio-api-vuex'

export default @Component({
  name: 'Collection',
  props: {
    query: Object
  },
  components: {},
  timers: {
    showNextRecord: {
      time: 200,
      autostart: false,
      repeat: true
    }
  }
})
class Collection extends Vue {
  currentRecords = []

  showNextRecord () {
    const recs = this.records
    if (this.currentRecords.length < recs.length) {
      this.currentRecords.push(recs[this.currentRecords.length])
    } else {
      this.$timer.stop('showNextRecord')
    }
  }

  mounted () {
    this.recordsChanged()
  }

  @Watch('records')
  recordsChanged () {
    this.currentRecords = []
    this.$timer.start('showNextRecord')
  }

  get records () {
    return this.$oarepo.collection.records
  }

  get totalPages () {
    return this.$oarepo.collection.totalPages
  }

  get facets () {
    return this.$oarepo.collection.facets
  }

  facetsWithQuery () {
    return facetQuerySynchronization(this.facets, this.query)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.records
  margin-top: 130px
/* space for search box */

.facet-values
  margin-left: 30px
  margin-top: 10px
  margin-bottom: 20px

.collection
  &__list
    margin-left: 50px

</style>
