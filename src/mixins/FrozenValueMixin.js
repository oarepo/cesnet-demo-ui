import Vue from 'vue'
import Component from 'vue-class-component'

@Component
class FrozenValueMixin extends Vue {
  frozenValue () {
    // Get a copy of props to model without reactivity watchers
    // Right now, this is probably the only working way to do it:
    // https://forum.vuejs.org/t/how-to-clone-property-value-as-simple-object/40032/3
    return JSON.parse(JSON.stringify(this.value))
  }
}

export { FrozenValueMixin }
