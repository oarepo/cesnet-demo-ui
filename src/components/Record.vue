<template>
  <div class="record">
    Record metadata (created {{created}}, updated {{updated}}):
    <pre>
{{ metadata }}
    </pre>
    Links:
    <pre>
{{ links }}
    </pre>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Record',
  props: {},
  computed: {
    ...mapState({
      metadata: state => state.oarepoRecord.metadata,
      links: state => state.oarepoRecord.links,
      created: state => state.oarepoRecord.created,
      updated: state => state.oarepoRecord.updated,
      // original response.data
      record: state => state.oarepoRecord.record
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
