<template lang="pug">
q-uploader.full-width(flat ref="uploader"
  editable=true
  auto-upload=false
  :url="url"
  @added="fileAdded"
  multiple=false
  send-raw
  method="PUT"
  with-credentials
  @uploaded="fileUploaded"
  @start="fileUploading"
  accept=".jpg,image/*,application/pdf")
</template>

<script>
import { Component, Emit, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'FileUploader',
  props: {
    uploadUrl: String,
    accept: String
  },
  components: {
  }
})
class FileUploader extends Vue {
  file = ''

  fileAdded (files) {
    if (files.length > 0) {
      this.file = files[0].name
    }
  }

  get url () {
    return `${this.uploadUrl}/${this.file}`
  }

  @Emit('fileUploading')
  fileUploading () { }

  @Emit('fileUploaded')
  fileUploaded () { }
}
</script>

<style lang="sass" scoped>

</style>
