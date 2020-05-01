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
import { Vue, Component, Watch } from 'vue-property-decorator'

export default @Component({
  name: 'Pagination',
  components: {
  },
  props: {
    query: Object
  }
})
class Pagination extends Vue {
  page = 1
  prevPage = 1

  created () {
    if (this.query.page > this.totalPages) {
      // this.query.page = 1
    }
  }

  @Watch('$route')
  routeChanged () {
    console.log('ROUTE query changed to', JSON.stringify(this.$route.query))
  }

  @Watch('query.page')
  queryPageChanged () {
    console.log(`PAGE query changed to q:${this.query.q}, page:${this.query.page}, query:`, this.query)
    this.prevPage = this.query.page
  }

  @Watch('query')
  queryChanged () {
    console.log(`query changed to q:${this.query.q}, page:${this.query.page}, query:`, this.query)
  }

  get pageModel () {
    // This getter trick provides a default page if not present in query props
    const totalPages = this.totalPages
    const prevPage = this.prevPage
    const query = this.query
    const ret = {
      model: query.page || 1
    }
    Object.defineProperty(ret, 'model', {
      get () {
        console.log('get page model value', query.page || 1)
        return query.page || 1
      },
      set (value) {
        console.log(`set page model to ${value} of total ${totalPages}, previousPage ${prevPage}`)
        if (value > totalPages) {
          query.page = 1
        } else {
          query.page = value
        }
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
