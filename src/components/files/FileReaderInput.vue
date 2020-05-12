<template lang="pug">
q-file.self-center.q-ma-md.recordcreate__fileimport.shadow-2(
  v-model="file"
  standout
  dark
  size="xl"
  @input="fileChange"
  :input-style="{ height: '50px' }"
  :label="$t('labels.fileInput')"
  :accept="accept"
)
  template(v-slot:file="{ index, file }")
    q-chip.full-width.q-my-lg(rounded size="lg")
      q-linear-progress.absolute-full.full-height(
        stripe
        rounded
        :value="readProgress"
        color="green-3"
        track-color="positive"
      )
      q-avatar(size="lg")
        q-icon(name="attachment")
      .ellipsis.relative-position.text-h6 {{ file.name }}
      q-tooltip {{ file.name }}
</template>

<script>
import { Component, Emit, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'FileReaderInput',
  props: {
    accept: String
  },
  components: {
  }
})
class FileReaderInput extends Vue {
  file = null
  readProgress = 0

  fileChange (file) {
    this.readProgress = 0
    this.$emit('input', file)

    const reader = new FileReader()
    reader.onload = e => this.loaded(e.target.result)
    reader.onprogress = e => this.updateProgress(e.loaded)
    reader.readAsText(file)
  }

  @Emit('progress')
  updateProgress (progress) {
    this.readProgress = this.file.size / progress
  }

  @Emit('load')
  loaded (result) {
    if (this.accept === 'application/json') {
      result = JSON.parse(result)
    }
    return result
  }
}
</script>

<style lang="sass" scoped>

</style>
