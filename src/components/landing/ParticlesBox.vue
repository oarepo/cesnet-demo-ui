<template lang="pug">
.col-5.full-height.particles__backdrop.particles.gt-md
  vue-particles.full-height(
    color="#dedede"
    shapeType="edge"
    :particleSize="10"
    :particlesNumber="35")
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'ParticlesBox'
})
class ParticlesBox extends Vue {
}
</script>

<style lang="sass" scoped>
.particles
  &__backdrop
    background-image: url('../../statics/landing-bg.jpg')
    background-size: cover
    filter: sepia() blur(1px)
    opacity: .6
</style>
