<template lang="pug">
q-dialog(
  persistent
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
      q-card-section
        .text-h5 {{ $t('labels.createNew') }}
      q-card-section
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
        div(v-else)
          q-slide-transition(appear)
            q-form.justify-center
              .row.justify-center
                q-file.self-center.q-ma-md.recordcreate__fileimport(
                  v-model="importJSONFile"
                  standout
                  dark
                  size="xl"
                  :input-style="{ height: '50px' }"
                  :label="$t('labels.fileInput')"
                  accept="application/json"
                )
      q-inner-loading(:showing="progress")
        .text-h6.q-mb-md {{ $t('messages.creatingRecord') }}&hellip;
        q-spinner-gears(size="50px" color="white")
      q-card-actions.q-pa-md.q-my-md
        q-btn(
          v-if="mode === modes.FORM"
          :disabled="progress"
          @click="mode = modes.IMPORT"
          icon="unarchive"
          :label="$t('labels.importJSONBtn')"
          size="md"
          color="primary")
          q-tooltip(content-class="bg-white text-black") {{ $t('tooltips.importJSON') }}
        q-btn(
          v-else
          :disabled="progress"
          @click="mode = modes.FORM"
          icon="list"
          :label="$t('labels.createFormBtn')"
          size="md"
          color="primary")
        q-space
        q-btn.q-mr-lg(
          :disabled="progress"
          icon="undo"
          @click="reset"
          :label="$t('labels.resetBtn')"
          flat
          size="md"
          type="reset"
          color="white")
        q-btn.q-px-md(
          :disabled="progress"
          @click="submit"
          icon="save"
          :label="$t('labels.submitBtn')"
          size="lg"
          type="submit"
          color="positive")
</template>

<script>
import { Component, Emit, Vue } from 'vue-property-decorator'
import { uid, date } from 'quasar'

export default @Component({
  name: 'RecordCreateDialog',
  components: {
  }
})
class RecordCreateDialog extends Vue {
  dialog = false
  maximized = true
  modes = Object.freeze({ FORM: 0, IMPORT: 1 })
  progress = false
  mode = this.modes.FORM
  importJSONFile = null

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

  show () {
    this.$refs.dialog.show()
  }

  hide () {
    this.$refs.dialog.hide()
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
    this.ensureAuthenticated()
    const valid = await this.validate()
    if (!valid) {
      this.$q.notify({
        type: 'negative',
        message: `${this.$t('messages.validation.failed')}`
      })
      return
    }

    // Generate additional record metadata
    const nowTs = new Date()
    this.record.identifier = uid()
    this.record.created = date.formatDate(nowTs, 'YYYY-MM-DD')
    this.record.modified = date.formatDate(nowTs, 'YYYY-MM-DD')
    console.log(this.record.modified)

    // TODO: refactor once there is a proper create action in invenio-api-vuex library
    this.progress = true
    this.$axios.post('/api/records/', this.record).then(resp => {
      this.created(resp)
    }).catch(err => {
      this.createFailed(err.response)
    }).finally(() => {
      this.progress = false
    })
  }

  @Emit('record-create')
  recordCreated (resp) {
    console.log(resp)
    return resp
  }

  @Emit('create-failed')
  createFailed (err) {
    console.error(err)

    const errors = this.apiValidationErrors(err)
    if (errors) {
      // TODO: maybe present failed fields to the user
      console.error(errors)
    }
    this.$q.notify({
      type: 'negative',
      message: `${this.$t('messages.recordCreateError')} ${err.data.message || ''}`
    })
  }

  apiValidationErrors (err) {
    if (err.status === 400 && err.data.message === 'Validation error.') {
      return err.data.errors
    }
    return null
  }

  resetValidation () {
    this.$refs.title.resetValidation()
    this.$refs.description.resetValidation()
    this.$refs.abstract.resetValidation()
    this.$refs.contributor.resetValidation()
  }

  reset () {
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
