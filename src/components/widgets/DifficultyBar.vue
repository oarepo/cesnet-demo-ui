<template lang="pug">
.row.no-wrap
  q-icon.difficulty-stripe.beginner(name='label' size='md' color="green-4")
  q-icon.difficulty-stripe.intermediate(
    name='label'
    size='md'
    :color="difficulty !== 'beginner' ? 'positive' : 'grey-3'")
  q-icon.difficulty-stripe.advanced(
    name='label'
    size='md'
    :color="!['beginner', 'intermediate'].includes(difficulty) ? 'yellow' : 'grey-4'")
  q-icon.difficulty-stripe.hacker(
    name='label'
    size='md'
    :color="difficulty === 'hacker' ? 'red' : 'grey-5'")
  q-tooltip {{ $t('labels.facetList.values.difficulty.' + difficulty) }}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'DifficultyBar',
  props: {
    difficulty: String
  }
})
class DifficultyBar extends Vue {
}
</script>

<style lang="sass" scoped>
.difficulty-stripe
  margin-left: -1.0rem
.beginner
  z-index: 100
.intermediate
  z-index: 99
.advanced
  z-index: 98
.hacker
  z-index: 97
</style>
