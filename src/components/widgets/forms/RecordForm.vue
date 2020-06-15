<template lang="pug">
  q-form.q-gutter-md
    q-separator(inset dark)
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
      .row.q-mb-sm.full-width.no-wrap(v-for="(v, index) in $v.model.description.$each.$iter")
        q-input.col-grow(
          ref="title"
          autofocus
          standout
          dark
          type="text"
          :label="$t('labels.record.description') + ' (' + $t('values.lang.' + v.lang.$model) + ')'"
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
          @click="model.description.pop()")
        q-btn.q-ml-sm.q-mb-md(v-if="index === (model.description.length - 1).toString()"
          flat
          icon="add"
          @click="model.description.push({ lang: 'cs', value: ''})")
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
      v-model="model.contributor")
</template>

<script>
import { Component, Watch } from 'vue-property-decorator'
import { required } from 'vuelidate/lib/validators'
import { Validations } from 'vuelidate-property-decorators'
import { FrozenValueMixin } from 'src/mixins/FrozenValueMixin'
import { mixins } from 'vue-class-component'
export default @Component({
  name: 'RecordForm',
  props: {
    value: Object
  }
})
class RecordForm extends mixins(FrozenValueMixin) {
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
      description: {
        $each: {
          lang: { required },
          value: { required }
        }
      },
      creator: { required }
    },
    validationGroup: ['model.title', 'model.abstract', 'model.creator', 'model.description']
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
    contributor: '',
    description: [
      {
        lang: 'cs',
        value: ''
      }
    ]
  }

  errorMessage (field) {
    if (!field.required) {
      return 'messages.validation.fieldRequired'
    }
  }

  @Watch('value')
  valueChanged () {
    if (this.value) {
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

  clear () {
    Object.assign(this.$data, this.$options.data.apply(this))
  }

  created () {
    this.valueChanged()
    this.resetValidation()
  }
}
</script>

<style lang="sass" scoped>
</style>
