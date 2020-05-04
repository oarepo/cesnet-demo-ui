<template lang="pug">
q-page-sticky(v-if="totalPages > 1" position="bottom" :offset="[-50, 30]")
  q-toolbar.bg-secondary.rounded-borders.shadow-4
    q-toolbar-title.q-py-xs
      q-btn.q-mx-xs(
        v-for="p in totalPages"
        :color="p === query.page ? 'white' : 'primary'"
        :text-color="p === query.page ? 'black' : 'white'"
        dense
        round
        :key="p"
        :label="p"
        :to="pageRoute(p)"
      )
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'Pagination',
  components: {
  },
  props: {
    query: Object
  }
})
class Pagination extends Vue {
  created () {
    if (this.query.page > this.totalPages) {
      this.query.page = 1
    }
  }

  pageRoute (page) {
    const toRoute = (({ path, name }) => ({ path, name }))(this.$router.currentRoute)
    toRoute.query = Object.assign({}, this.$router.currentRoute.query)
    toRoute.query.page = page
    return toRoute
  }

  get totalPages () {
    return this.$oarepo.collection.totalPages
  }
}
</script>

<style lang="sass" scoped>
</style>
