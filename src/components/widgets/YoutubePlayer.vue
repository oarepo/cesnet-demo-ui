<template lang="pug">
.q-video.full-width.full-height
  iframe(
    width="560" height="315"
    ref="video"
    :src="'https://www.youtube-nocookie.com/embed/'+ contentId"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen)
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'YoutubePlayer',
  props: {
    contentId: String
  }
})
class YoutubePlayer extends Vue {
}
</script>

<style lang="sass" scoped>

</style>
