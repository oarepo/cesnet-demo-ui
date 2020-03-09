
<template lang="pug">
  q-select(
    menu-anchor="bottom left"
    label-color="grey-4"
    bg-color="info"
    color="grey-4"
    standout
    dark
    v-model="lang"
    :options="langOptions"
    :label="$t('labels.localeSwitcher')"
    dense
    emit-value
    map-options
    options-dense
  )
    template(v-slot="prepend")
      q-icon(name="flag")
</template>

<script>
export default {
  data () {
    return {
      lang: this.$i18n.locale,
      langOptions: [
        { value: 'en-us', label: this.$t('values.lang.enUS') },
        { value: 'cs-cz', label: this.$t('values.lang.csCZ') }
      ]
    }
  },
  watch: {
    lang (lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>
