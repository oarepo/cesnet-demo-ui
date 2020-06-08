<template lang="pug">
q-page(padding).q-pb-xl
  .row.q-mt-lt
    record(
      detail
      v-if="loaded"
      :id="record.id"
      :links="record.links"
      :revision="record.revision"
      :created="record.created"
      :updated="record.updated"
      :metadata="record.metadata"
      @change-record="recordChanged")
      span {{ record.id }} {{ record.revision }}
      q-inner-loading(:showing="!loaded")
        q-spinner-gears(size="100px" color="accent")
  .row.full-width
    q-card.col-12
      q-card-section.bg-grey-3
        .text-h5 {{ $t('labels.attachments') }}
      q-separator
      q-card-section
        q-list(separator dense v-if="latestVersionAttachments.length > 0")
          q-item(v-for="file in latestVersionAttachments" key="file.key")
            q-item-section(thumbnail)
              q-icon(:name="fileIcon(file)")
            q-item-section
              .row
                .col-grow
                  .row.justify-start
                    q-item-label.q-my-sm.text-subtitle2 {{ file.key | truncate(100) }}
                  .row.justify-start
                    q-item-label(caption) {{ $t('labels.record.created') }}: {{ file.updated }}
                .col-grow.self-center
                  .row.justify-end
                    q-item-label.col-auto(caption) {{ file.checksum }}
                  .row.justify-end
                    q-item-label.col-auto(caption) {{ Number(file.size/1024).toFixed(0) }} kb
                  .row.justify-end
                    q-btn.col-auto(@click="downloadAttachment(file)" flat color="positive" icon="save_alt")
                      q-tooltip {{ $t('tooltips.download') }}
        q-item.row.justify-center.text-center(v-else)
          .text-subtitle1.text-weight-light ~ {{ $t('labels.noAttachments') | capitalize }} ~
      q-separator
      q-card-section(v-if="owned")
        .text-subtitle1 {{ $t('labels.uploadAttachment') }}
        q-card-section
          file-uploader.full-width(
            @fileUploaded="loadAttachments()"
            :uploadUrl="record.links.files",
            accept=".jpg,image/*,application/pdf")
      q-inner-loading(:showing="loading")
        q-spinner-gears(size="100px" color="accent")
</template>

<script>
import { State } from '@oarepo/invenio-api-vuex'
import { Component, Emit, Vue } from 'vue-property-decorator'
import Record from 'components/records/Record'
import FileUploader from 'components/files/FileUploader'
import FileSaver from 'file-saver'

export default @Component({
  name: 'RecordDetail',
  components: {
    Record,
    FileUploader
  },
  props: {
    query: Object
  }
})
class RecordDetail extends Vue {
  loading = false
  attachments = []

  get owned () {
    if (this.auth$.loggedLocally) {
      return this.record.metadata.owners.includes(this.auth$.authInfo.user.id)
    }
    return false
  }

  created () {
    this.loadAttachments()
  }

  downloadAttachment (file) {
    FileSaver.saveAs(`${this.record.links.files}/${file.key}`, file.key)
  }

  loadAttachments () {
    this.loading = true
    this.$axios.get(this.record.links.files)
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
    return this.attachments.filter(att => att.is_head)
  }

  attachmentsLoaded (attachments) {
    this.attachments = attachments.contents
  }

  fileIcon (file) {
    // TODO: install FA fonts and implement convertMime from 'mimetype-to-fontawesome'
    return 'attachment'
  }

  get record () {
    return this.$oarepo.record
  }

  get recid () {
    return this.$oarepo.record.id
  }

  get loaded () {
    return this.$oarepo.record.state === State.LOADED
  }

  get facets () {
    return this.$oarepo.collection.facets
  }

  @Emit('change-record')
  recordChanged () { }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .row {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
