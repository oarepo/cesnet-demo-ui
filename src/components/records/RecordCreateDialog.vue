<template lang="pug">
q-dialog(
  :persistent="mode !== modes.DONE"
  ref="dialog"
  @hide="onDialogHide"
  position="top"
  :maximized="maximized"
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
            q-form(
              @submit="submit"
              @reset="reset"
              class="q-gutter-md")
              q-input(
                ref="title"
                autofocus
                standout
                dark
                type="text"
                :label="$t('labels.record.title') + ' (' + $t('values.lang.csCZ') + ')'"
                :rules="[$rules.required()]"
                v-model="record.title[0].value")
              q-input(
                ref="description"
                standout
                dark
                type="text"
                :label="$t('labels.record.description')"
                :rules="[$rules.required()]"
                v-model="record.description[0].value")
              q-input(
                ref="abstract"
                standout
                dark
                type="textarea"
                :label="$t('labels.record.abstract') + ' (' + $t('values.lang.csCZ') + ')'"
                :rules="[$rules.required()]"
                v-model="record.abstract[0].value")
              q-input(
                ref="creator"
                standout
                dark
                readonly
                hide-bottom-space
                type="text"
                :label="$t('labels.record.creator')"
                :rules="[$rules.required()]"
                v-model="record.creator")
              q-input(
                ref="contributor"
                standout
                dark
                type="text"
                :label="$t('labels.record.contributors')"
                v-model="record.contributor")
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
import { uid, date } from 'quasar'
import FileReaderInput from 'components/files/FileReaderInput'

export default @Component({
  name: 'RecordCreateDialog',
  components: {
    FileReaderInput
  }
})
class RecordCreateDialog extends Vue {
  dialog = false
  maximized = true
  modes = Object.freeze({ FORM: 0, IMPORT: 1, DONE: 2, FAILURE: 3 })
  progress = false
  importInProgress = false
  importProgress = null
  mode = this.modes.FORM
  errors = null

  fileData = null

  record = {
    title: [
      {
        lang: 'cs',
        value: ''
      }
    ],
    abstract: [
      {
        lang: 'cs',
        value: ''
      }
    ],
    creator: this.$auth.authInfo.user.email,
    contributor: '',
    description: [
      {
        lang: 'cs',
        value: ''
      }
    ]
  }

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

  async validate () {
    let success = false
    const resPromise = await Promise.all([
      this.$refs.title.validate(),
      this.$refs.description.validate(),
      this.$refs.abstract.validate(),
      this.$refs.contributor.validate()
    ])
    if (resPromise.reduce((a, b) => (a && b), true)) {
      success = true
    }
    return success
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
    const valid = await this.validate()
    if (!valid) {
      this.$q.notify({
        type: 'negative',
        message: `${this.$t('messages.validation.failed')}`
      })
      return
    }

    return this.submitRecord(this.record, this.recordCreated, this.createFailed)
  }

  async submitRecord (record, onCreated, onFailed, progress = true) {
    this.ensureAuthenticated()

    // Generate required record metadata if needed
    const nowTs = new Date()
    record.identifier = record.identifier || uid()
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
    this.$refs.title.resetValidation()
    this.$refs.description.resetValidation()
    this.$refs.abstract.resetValidation()
    this.$refs.contributor.resetValidation()
  }

  reset () {
    this.errors = null

    if (this.mode === this.modes.FAILURE) {
      // Don't clear data on failure, let the user correct it and try again
      this.mode = this.modes.FORM
      return
    }

    Object.assign(this.$data, this.$options.data.apply(this))
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
