<template lang="pug">
q-dialog(
  :persistent="mode !== modes.DONE"
  ref="dialog"
  @hide="onDialogHide"
  position="top"
  maximized
  transition-hide="slide-up"
  transition-show="slide-down")
    q-card.q-dialog-plugin.recordcreate__dialog.text-white
      q-bar
        q-space
        q-btn(dense flat size="md" icon="close" v-close-popup)
          q-tooltip(content-class="bg-white text-black") {{ $t('tooltips.close') }}
      q-card-section.q-pa-xl
        .text-h5 {{ $t('labels.createNew') }}
      q-card-section.q-pa-xl
        div(v-if="mode === modes.FORM")
          q-slide-transition(leave)
            record-form(ref="createForm")
        div(v-else-if="mode === modes.IMPORT")
          q-slide-transition(appear)
            q-form.justify-center
              .row.justify-center
                file-reader-input(accept="application/json" @load="fileLoad")
              .row.justify-center
                .text-caption {{ $t('messages.importFileNotice') }}
        div(v-else-if="mode === modes.DONE")
          .col.self-center.text-center.q-pa-lg.q-gutter-lg
            q-icon(name="cloud_done" size="xl")
            .text-h4 {{ $t('messages.recordCreateSuccess') }}
        div(v-else-if="mode === modes.FAILURE")
          .col.self-center.text-center.q-pa-lg.q-gutter-lg
            q-icon(name="sentiment_very_dissatisfied" size="xl")
            .text-h4 {{ $t('messages.recordCreateError') }}
            q-input.q-px-lg(v-if="errors" readonly autogrow rounded type="text" dark standout v-model="errors")
      q-inner-loading(:showing="importInProgress" dark)
        .text-h6.q-mb-md {{ $t('messages.importingRecord') }}&hellip;
        .text-h6.q-mb-lg.text-center
          strong {{ importProgress }}
        q-spinner-gears(size="50px" color="white")
      q-inner-loading(:showing="progress" dark)
        .text-h6.q-mb-md {{ $t('messages.creatingRecord') }}&hellip;
        q-spinner-gears(size="50px" color="white")
      q-card-actions.q-px-xl.q-py-md.q-my-md
        q-btn(
          v-if="mode === modes.FORM"
          :disabled="progress || importInProgress"
          @click="mode = modes.IMPORT"
          icon="unarchive"
          :label="$t('labels.importJSONBtn')"
          size="md"
          color="primary")
          q-tooltip(content-class="bg-white text-black") {{ $t('tooltips.importJSON') }}
        q-btn(
          v-else-if="mode === modes.IMPORT"
          :disabled="progress || importInProgress"
          @click="mode = modes.FORM"
          icon="list"
          :label="$t('labels.createFormBtn')"
          size="md"
          color="primary")
        q-space
        q-btn.q-mr-lg(
          :disabled="progress || importInProgress"
          :icon="mode === modes.DONE? 'add': 'undo'"
          @click="reset"
          :label="$t(resetLabel)"
          flat
          size="md"
          type="reset"
          color="white")
        q-btn.q-mr-lg(
          v-if="mode === modes.DONE && createdId"
          icon="fullscreen"
          @click="showRecordDetail"
          :label="$t('labels.recordDetailsBtn')"
          flat
          size="md"
          color="white")
        q-btn.q-px-md(
          v-if="[modes.FORM, modes.IMPORT].includes(mode)"
          :disabled="progress || importInProgress || (mode === modes.IMPORT && !fileData)"
          @click="submit"
          icon="save"
          :label="submitLabel"
          size="lg"
          type="submit"
          color="positive")
        q-btn.q-px-md(
          v-if="[modes.DONE, modes.FAILURE].includes(mode)"
          :disabled="progress || importInProgress"
          @click="hide"
          icon="close"
          :label="$t('labels.closeBtn')"
          size="lg"
          color="primary")
</template>

<script>
import { Component, Emit, Vue } from 'vue-property-decorator'
import { date } from 'quasar'
import FileReaderInput from 'components/files/FileReaderInput'
import RecordForm from 'components/widgets/forms/RecordForm'

export default @Component({
  name: 'RecordCreateDialog',
  components: {
    RecordForm,
    FileReaderInput
  }
})
class RecordCreateDialog extends Vue {
  modes = Object.freeze({ FORM: 0, IMPORT: 1, DONE: 2, FAILURE: 3 })
  progress = false
  createdId = null
  importInProgress = false
  importProgress = null
  mode = this.modes.FORM
  errors = null

  fileData = null

  created () {
    this.ensureAuthenticated()
  }

  ensureAuthenticated () {
    if (!this.$auth.loggedLocally) {
      this.$auth.login(this)
    }
  }

  fileLoad (data) {
    this.progress = false
    this.fileData = data
  }

  showRecordDetail () {
    this.$router.push({
      name: 'record',
      params: { collectionId: 'records', recordId: this.createdId }
    })
  }

  show () {
    this.$refs.dialog.show()
  }

  hide () {
    this.$refs.dialog.hide()
  }

  get submitLabel () {
    switch (this.mode) {
      case this.modes.IMPORT:
        if (this.fileData) {
          return this.$t('labels.importManyBtn', { num: this.fileData.length })
        } else {
          return this.$t('labels.importBtn')
        }
      default:
        return this.$t('labels.submitBtn')
    }
  }

  get resetLabel () {
    switch (this.mode) {
      case this.modes.DONE:
        return 'labels.createMoreBtn'
      case this.modes.FAILURE:
        return 'labels.tryAgainBtn'
      default:
        return 'labels.resetBtn'
    }
  }

  @Emit('hide')
  onDialogHide () {
  }

  async submit () {
    switch (this.mode) {
      case this.modes.FORM:
        return this.submitForm()
      case this.modes.IMPORT:
        return this.importRecords()
    }
  }

  async submitForm () {
    const result = await this.$refs.createForm.submit()
    if (!result.valid) {
      this.$q.notify({
        type: 'negative',
        message: `${this.$t('messages.validation.failed')}`
      })
      return
    }

    if (!result.record.event) {
      delete result.record.event
    }

    return this.submitRecord(result.record, this.recordCreated, this.createFailed)
  }

  async submitRecord (record, onCreated, onFailed, progress = true) {
    await this.ensureAuthenticated()

    // Generate required record metadata if needed
    const nowTs = new Date()
    record.identifier = record.identifier || record.source.substring(record.source.lastIndexOf('/') + 1)
    record.description = record.description || [{ lang: 'cs', value: '' }]
    record.created = record.created || date.formatDate(nowTs, 'YYYY-MM-DD')
    record.modified = record.modified || date.formatDate(nowTs, 'YYYY-MM-DD')

    // TODO: refactor once there is a proper create action in invenio-api-vuex library
    let res = null
    if (progress) {
      this.progress = true
    }
    this.$axios.post(
      '/api/records/', record
    ).then(resp => {
      res = onCreated(resp)
    }).catch(err => {
      res = onFailed(err.response)
    }).finally(() => {
      if (progress) {
        this.progress = false
      }
    })
    return res
  }

  async importRecords () {
    this.importInProgress = true
    const errors = {}
    const total = this.fileData.length
    let completed = 0
    let failed = false
    const that = this

    function _handleCompletion (fail = false) {
      completed += 1
      that.importProgress = `${completed}/${total}`

      if (fail) {
        failed = true
      }

      if (completed === total) {
        that.importComplete(failed, errors)
      }
    }

    this.fileData.forEach((record, idx) => {
      console.log('Processing record', idx, record)

      this.submitRecord(record, (resp) => {
        console.log(`Record ${idx} created`)
        _handleCompletion()
      }, (err) => {
        console.error('Failed to save record', idx, record, err)
        errors[idx] = this.apiErrors(err)
        _handleCompletion(true)
      }, false)
    })
  }

  importComplete (failed = false, errors = {}) {
    this.importInProgress = false

    if (failed) {
      this.mode = this.modes.FAILURE
      this.errors = JSON.stringify(errors, null, 2)
    } else {
      this.recordCreated()
    }
  }

  @Emit('ok')
  recordCreated (resp) {
    this.createdId = resp.data.id
    this.mode = this.modes.DONE
    return resp
  }

  @Emit('create-failed')
  createFailed (err) {
    console.error(err)

    this.errors = err.data.message || err.data
    this.mode = this.modes.FAILURE

    const aerr = this.apiErrors(err)
    if (aerr) {
      // TODO: maybe present failed fields to the user under FAILURE mode
      console.error(aerr)
    }
  }

  apiErrors (err) {
    if (err.status === 400 && err.data.message === 'Validation error.') {
      return err.data.errors
    }
    return err
  }

  resetValidation () {
    this.$refs.createForm.resetValidation()
  }

  reset () {
    this.errors = null
    this.createdId = null

    if (this.mode === this.modes.FAILURE) {
      // Don't clear data on failure, let the user correct it and try again
      this.mode = this.modes.FORM
      return
    }

    Object.assign(this.$data, this.$options.data.apply(this))
    this.$refs.createForm.clear()
    this.$nextTick(() => this.resetValidation())
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.recordcreate
  &__dialog
    background-color: $dark-accent
  &__fileimport
    max-width: 500px
</style>
