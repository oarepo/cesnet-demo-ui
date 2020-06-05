
<template lang="pug">
  q-select(
    menu-anchor="bottom left"
    filled
    dark
    :popup-content-style="{ backgroundColor: '#640034' }"
    color="white"
    icon="flag"
    v-model="lang"
    :options="langOptions"
    :label="$t('labels.localeSwitcher')"
    dense
    emit-value
    map-options
    options-dense
  )
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
