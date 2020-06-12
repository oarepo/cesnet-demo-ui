<template lang="pug">
q-card.col-12
  q-markup-table(flat wrap-cells bordered)
    thead.bg-grey-3
      tr
        th(colspan=5)
          .row.justify-start
            .text-h5.q-ml-md {{ $t('labels.attachments') }}
      tr
        th.no-padding(colspan=5)
          .row.items-center
            file-uploader.bg-grey-2.full-width(
              v-if="owned"
              @fileUploaded="loadAttachments()"
              :uploadUrl="filesUrl")
      tr
        th {{ $t('labels.record.attachment.filename') }}
        th.text-left {{ $t('labels.record.attachment.created') }}
        th.text-left {{ $t('labels.record.attachment.filesize') }}
        th.text-left {{ $t('labels.record.attachment.checksum') }}
        th
    tbody(v-if="latestVersionAttachments.length > 0")
      tr(v-for="file in latestVersionAttachments" key="file.key")
        td
          .row
            .col-1
              q-icon(:name="fileIcon(file)")
            .col-auto {{ file.key }}
        td {{ file.created | formatDate }}
          q-tooltip {{ file.created }}
        td {{ Number(file.size/1024).toFixed(0) }} kb
        td
          q-badge(color="accent") {{ fileChecksum(file).digest }}
          span.q-ml-sm {{ fileChecksum(file).value }}
        td
          q-btn-group.justify-end(flat)
            q-btn(@click="downloadAttachment(file)" flat color="positive" icon="save_alt")
              q-tooltip {{ $t('tooltips.download') }}
    tfoot.shadow-0.row.justify-center.text-center(v-else-if="owned")
      tr
        td.text-weight-light(colspan=5) ~ {{ $t('labels.noAttachments') | capitalize }} ~
  q-inner-loading(:showing="loading")
    q-spinner-gears(size="100px" color="accent")
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import FileSaver from 'file-saver'
import FileUploader from 'components/files/FileUploader'

export default @Component({
  name: 'RecordAttachments',
  props: {
    owned: Boolean,
    filesUrl: String
  },
  components: {
    FileUploader
  }
})
class RecordAttachments extends Vue {
  attachments = []
  loading = false

  loadAttachments () {
    this.loading = true
    this.$axios.get(this.filesUrl)
      .then(resp => {
        this.attachmentsLoaded(resp.data)
      }).catch(err => {
        console.log(err)
        this.$q.notify({
          type: 'negative',
          message: 'Failed to load attachments.'
        })
      }).finally(() => {
        this.loading = false
      })
  }

  get latestVersionAttachments () {
    return this.attachments.filter(att => att.is_head).sort()
  }

  created () {
    this.loadAttachments()
  }

  downloadAttachment (file) {
    FileSaver.saveAs(`${this.filesUrl}/${file.key}`, file.key)
  }

  attachmentsLoaded (attachments) {
    this.attachments = attachments.contents
  }

  fileChecksum (file) {
    const checksum = file.checksum.split(':')
    return { digest: checksum[0], value: checksum[1] }
  }

  fileIcon (file) {
    // TODO: install FA fonts and implement convertMime from 'mimetype-to-fontawesome'
    return 'attachment'
  }

  deleteAttachment (file) {
    this.$q.dialog({
      title: 'Confirm',
      message: 'Would you like to turn on the wifi?',
      cancel: true,
      persistent: true
    }).onOk(() => {
      const deleteUrl = `${this.filesUrl}/${file.key}`

      this.$axios.delete(deleteUrl).then(resp => {
      })
    })
  }
}
</script>

<style lang="sass">
</style>
