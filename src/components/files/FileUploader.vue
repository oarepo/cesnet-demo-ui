<template lang="pug">
q-uploader.full-width(flat ref="uploader"
  editable=true
  auto-upload
  :factory="getUrl"
  @added="fileAdded"
  multiple=false
  :label="$t('labels.uploadAttachment')"
  send-raw
  method="PUT"
  with-credentials
  @uploaded="fileUploaded"
  @start="fileUploading")
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

  getUrl (files) {
    return {
      url: `${this.uploadUrl}/${files[0].name}`,
      method: 'PUT'
    }
  }

  @Emit('fileUploading')
  fileUploading () { }

  @Emit('fileUploaded')
  fileUploaded () { }
}
</script>

<style lang="sass" scoped>

</style>
