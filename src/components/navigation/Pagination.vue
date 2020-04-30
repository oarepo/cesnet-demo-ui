<template lang="pug">
q-page-sticky(v-if="totalPages > 1" position="bottom" :offset="[-50, 30]")
  q-toolbar.bg-accent.rounded-borders.shadow-4
    q-toolbar-title
      q-pagination(
        dark
        color="white"
        text-color="primary"
        v-model="query.page"
        :max="totalPages"
        :max-pages="6"
        :boundary-numbers="true"
      )
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

export default @Component({
  name: 'Pagination',
  components: {
  },
  props: {
    query: Object
  }
})
class Pagination extends Vue {
  get totalPages () {
    return this.$oarepo.collection.totalPages
  }
}
</script>

<style lang="sass" scoped>
</style>
