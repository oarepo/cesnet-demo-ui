<template lang="pug">
q-form.q-gutter-md
  .text-overline {{ $t('labels.recordForm.basicMetadata') }}
  q-separator(inset dark)
  q-select(
    dark
    standout
    option-value="code"
    :option-label="opt => $t('labels.facetList.values.difficulty.' + opt)"
    :label="$t('labels.record.difficulty')"
    v-model="model.difficulty"
    :hint="$t('labels.recordForm.expectedAudience')"
    :options="difficultyOptions")
  .row
    .row.q-mb-sm.full-width.no-wrap(v-for="(v, index) in $v.model.title.$each.$iter")
      q-input.col-grow(
        ref="title"
        autofocus
        standout
        dark
        type="text"
        :label="$t('labels.record.title') + ' (' + $t('values.lang.' + v.lang.$model) + ')'"
        v-model="v.value.$model"
        :error="v.value.$error"
        :error-message="$t(errorMessage(v.value))"
        @blur="v.value.$touch")
      q-select.q-ml-sm.col-auto(
        dark
        standout
        :option-label="opt => $t('values.lang.' + opt)"
        :label="$t('labels.localeSwitcher')"
        hint=""
        v-model="v.lang.$model"
        :options="langOptions")
      q-btn.q-ml-sm.q-mb-md(v-if="index !== '0'"
        flat
        icon="remove"
        @click="model.title.pop()")
      q-btn.q-ml-sm.q-mb-md(v-if="index === (model.title.length - 1).toString()"
        flat
        icon="add"
        @click="model.title.push({ lang: 'cs', value: ''})")
  .row
    .row.full-width.no-wrap(v-for="(v, index) in $v.model.abstract.$each.$iter")
      q-input.col-grow(
        ref="abstract"
        standout
        dark
        type="textarea"
        :label="$t('labels.record.abstract') + ' (' + $t('values.lang.' + v.lang.$model) + ')'"
        v-model="v.value.$model"
        :error="v.value.$error"
        :error-message="$t(errorMessage(v.value))"
        @blur="v.value.$touch")
      q-select.q-ml-sm.col-auto(
        dark
        standout
        :option-label="opt => $t('values.lang.' + opt)"
        :label="$t('labels.localeSwitcher')"
        hint=""
        v-model="v.lang.$model"
        :options="langOptions")
      q-btn.q-ml-sm.q-mb-md(v-if="index !== '0'"
        flat
        icon="remove"
        @click="model.abstract.pop()")
      q-btn.q-ml-sm.q-mb-md(v-if="index === (model.abstract.length - 1).toString()"
        flat
        icon="add"
        @click="model.abstract.push({ lang: 'cs', value: ''})")
  q-input(
    ref="creator"
    standout
    dark
    hide-bottom-space
    type="text"
    :label="$t('labels.record.creator')"
    :error-message="$t(errorMessage($v.model.creator))"
    v-model="$v.model.creator.$model"
    :error="$v.model.creator.$error"
    @blur="$v.model.creator.$touch")
  q-input(
    ref="contributors"
    standout
    dark
    type="text"
    :label="$t('labels.record.contributors')"
    v-model="model.contributors")
  dialog-taxonomy-input.text-white(
    :label="$t('labels.record.event')"
    taxonomyCode="event"
    :value="model.event"
    @input="eventChanged"
    :taxonomy-url="$taxonomies.taxonomies['event'].links.tree")
  .text-overline.q-mt-lg {{ $t('labels.recordForm.mediaRecordingMetadata') }}
  q-separator(inset dark)
  .row
    q-input.col-grow(
      ref="source"
      autofocus
      standout
      dark
      type="url"
      :label="$t('labels.record.source')"
      v-model="$v.model.source.$model"
      :error="$v.model.source.$error"
      :error-message="$t(errorMessage($v.model.source))"
      @blur="$v.model.source.$touch")
    q-select.q-ml-lg.col-2(
      dark
      standout
      option-value="code"
      :label="$t('labels.record.license')"
      v-model="model.license"
      :hint="$t('labels.recordForm.recordingLicense')"
      :options="licenseOptions")
</template>

<script>
import { Component, Watch, Vue } from 'vue-property-decorator'
import { required, url } from 'vuelidate/lib/validators'
import { Validations } from 'vuelidate-property-decorators'

export default @Component({
  name: 'RecordForm',
  props: {
    initial: Object
  }
})
class RecordForm extends Vue {
  difficultyOptions = ['beginner', 'intermediate', 'advanced', 'hacker']
  licenseOptions = ['CC BY', 'CC BY-SA', 'CC BY-ND', 'CC BY-NC', 'CC BY-NC-SA', 'CC BY-NC-ND']
  langOptions = ['cs', 'en']

  @Validations()
  validations = {
    model: {
      title: {
        $each: {
          lang: { required },
          value: { required }
        }
      },
      abstract: {
        $each: {
          lang: { required },
          value: { required }
        }
      },
      creator: { required },
      source: { required, url }
    },
    validationGroup: ['model.title', 'model.abstract', 'model.creator', 'model.source']
  }

  model = {
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
    creator: this.$auth.authInfo.user_info.name,
    difficulty: 'beginner',
    event: null,
    formats: [],
    contributors: '',
    license: 'CC BY',
    source: ''
  }

  errorMessage (field) {
    if (!field.required) {
      return 'messages.validation.fieldRequired'
    }
    if (!field.url) {
      return 'messages.validation.invalidURL'
    }
  }

  @Watch('initial')
  valueChanged () {
    if (this.initial) {
      this.model = this.frozenValue()
    }
  }

  resetValidation () {
    this.$nextTick(() => {
      this.$v.$reset()
    })
  }

  async submit () {
    this.$v.validationGroup.$touch()
    return { valid: !this.$v.validationGroup.$error, record: this.model }
  }

  eventChanged (event) {
    this.model.event = event
  }

  created () {
    this.valueChanged()
    this.resetValidation()
  }

  frozenValue () {
    // Get a copy of props to model without reactivity watchers
    // Right now, this is probably the only working way to do it:
    // https://forum.vuejs.org/t/how-to-clone-property-value-as-simple-object/40032/3
    return JSON.parse(JSON.stringify(this.initial))
  }
}
</script>

<style lang="sass" scoped>

</style>
