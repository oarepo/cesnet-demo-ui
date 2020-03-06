<template lang="pug">
  .collections
    h5 Records
    ul(v-for="collection in collections" :key="collection.code")
      li
        p {{ collection.title['en-us'] }}
        p {{ collection.description['en-us'] }}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'Collections',
  props: {
    query: Object
  }
})
class Collections extends Vue {
  created () {
    this.reload()
  }

  get collections () {
    return this.$oarepo.collections.collections
  }

  reload () {
    return this.$oarepo.collections.reload()
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
