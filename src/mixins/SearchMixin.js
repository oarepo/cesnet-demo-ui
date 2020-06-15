import Vue from 'vue'
import Component from 'vue-class-component'
import { Emit } from 'vue-property-decorator'

@Component
class SearchMixin extends Vue {
  @Emit('search')
  doSearch () { }
}

export { SearchMixin }
