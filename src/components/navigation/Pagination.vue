<template lang="pug">
q-page-sticky(v-if="totalPages > 1" position="bottom" :offset="[-50, 30]")
  q-toolbar.bg-accent.rounded-borders.shadow-4
    q-toolbar-title
      q-pagination(
        dark
        color="white"
        text-color="primary"
        v-model="pageModel.model"
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
  get pageModel () {
    // This getter trick provides a default page if not present in query props
    const query = this.query
    const ret = {
      model: this.query.page || 1
    }
    Object.defineProperty(ret, 'model', {
      get () {
        return query.page || 1
      },
      set (value) {
        query.page = value
      }
    })
    return ret
  }

  get totalPages () {
    return this.$oarepo.collection.totalPages
  }
}
</script>

<style lang="sass" scoped>
</style>
