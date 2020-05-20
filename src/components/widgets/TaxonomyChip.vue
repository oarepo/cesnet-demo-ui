<template lang="pug">
.row.no-wrap
  q-badge.no-border-radius.q-mr-sm(color="grey-3")
    q-tree(v-bind:class="{ 'inactive-arrow': isSingleNode(taxonomyTree) }"
      :nodes="taxonomyTree"
      nodeKey="label")
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator'

export default @Component({
  name: 'TaxonomyChip',
  props: {
    initial: Object | Array
  }
})
class TaxonomyChip extends Vue {
  value = null
  // validatedField = null

  @Watch('initial')
  initialChanged () {
    // this.validatedField = this.$refs.field
    if (this.initial) {
      this.value = this.initial
    } else {
      this.value = null
    }
  }

  created () {
    this.initialChanged()
  }

  isSingleNode (tree) {
    return (tree.length === 1 && (tree[0].children.length === 0 ||
      (tree[0].children.length === 1 && tree[0].children[0].label === '___placeholder___')))
  }

  get taxonomyTree () {
    let tree = []
    let header = null
    let currChildren = []

    if (Array.isArray(this.value)) { return tree }

    this.parents.forEach(par => {
      if (par === this.value.slug) {
        par = this.$langTitle(this.value)
        header = 'root'
      }
      const parentNode = {
        label: par,
        header: header,
        children: currChildren
      }
      tree = [parentNode]
      currChildren = []
      currChildren.push(parentNode)
    })
    if (this.isSingleNode(tree)) {
      tree[0].children = [{ label: '___placeholder___' }]
      tree[0].expandable = false
      tree[0].textColor = 'black'
    }
    return tree
  }

  get parents () {
    const parents = []
    if (Array.isArray(this.value)) { return parents }

    this.value.path.split('/').forEach(e => {
      if (e !== '') {
        parents.push(e)
      }
    })
    return parents
  }
}
</script>

<style lang="sass" scoped>

</style>
