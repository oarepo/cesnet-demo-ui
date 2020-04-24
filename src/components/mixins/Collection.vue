<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'Collection'
})
class Collection extends Vue {
  get collection () {
    if (this.$oarepo.collections.collections) {
      return this.$oarepo.collections.collections[0]
    }
  }
}
</script>
