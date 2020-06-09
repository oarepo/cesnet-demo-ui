<template lang="pug">
q-page(padding).q-pb-xl
  .row.q-my-xl
    record(
      detail
      v-if="loaded"
      :id="recid"
      :links="record.links"
      :revision="record.revision"
      :created="record.created"
      :updated="record.updated"
      :metadata="record.metadata"
      @change-record="recordChanged")
      span {{ record.id }} {{ record.revision }}
      q-inner-loading(:showing="!loaded")
        q-spinner-gears(size="100px" color="accent")
</template>

<script>
import { State } from '@oarepo/invenio-api-vuex'
import { Component, Emit, Vue } from 'vue-property-decorator'
import Record from 'components/records/Record'

export default @Component({
  name: 'RecordDetail',
  components: {
    Record
  },
  props: {
    query: Object
  }
})
class RecordDetail extends Vue {
  get record () {
    return this.$oarepo.record
  }

  get recid () {
    return this.$oarepo.record.id
  }

  get loaded () {
    return this.$oarepo.record.state === State.LOADED
  }

  get facets () {
    return this.$oarepo.collection.facets
  }

  @Emit('change-record')
  recordChanged () { }
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
