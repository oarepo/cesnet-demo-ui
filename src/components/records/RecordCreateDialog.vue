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
      q-card-actions.q-pa-md.q-my-md
        q-btn(
          v-if="mode === modes.FORM"
          @click="mode = modes.IMPORT"
          icon="unarchive"
          :label="$t('labels.importJSONBtn')"
          size="md"
          color="primary")
          q-tooltip(content-class="bg-white text-black") {{ $t('tooltips.importJSON') }}
        q-btn(
          v-else
          @click="mode = modes.FORM"
          icon="list"
          :label="$t('labels.createFormBtn')"
          size="md"
          color="primary")
        q-space
        q-btn.q-mr-lg(
          icon="undo"
          @click="reset"
          :label="$t('labels.resetBtn')"
          flat
          size="md"
          type="reset"
          color="white")
        q-btn.q-px-md(
          icon="save"
          :label="$t('labels.submitBtn')"
          size="lg"
          type="submit"
          color="positive")
</template>

<script>
import { Component, Emit, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'RecordCreateDialog',
  components: {
  }
})
class RecordCreateDialog extends Vue {
  dialog = false
  maximized = true
  modes = Object.freeze({ FORM: 0, IMPORT: 1 })
  mode = this.modes.FORM
  importJSONFile = null

  created () {
    this.ensureAuthenticated()
  }

  ensureAuthenticated () {
    if (!this.$auth.loggedLocally) {
      this.$auth.login(this)
    }
  }

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

  show () {
    this.$refs.dialog.show()
  }

  hide () {
    this.$refs.dialog.hide()
  }

  @Emit('hide')
  onDialogHide () {
  }

  submit () {
    this.ensureAuthenticated()
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
