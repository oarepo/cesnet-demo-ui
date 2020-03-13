<template lang="pug">
  q-page.full-height.text-white(padding)
    .row.justify-end
        .col-3.col-md-2
          locale-switcher.text-white
    collections
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import Collections from '../components/Collections'
import LocaleSwitcher from '../components/i18n/LocaleSwitcher'

export default @Component({
  name: 'LandingPage',
  components: {
    LocaleSwitcher,
    Collections
  }
})
class LandingPage extends Vue {
}
</script>
<style lang="sass">
</style>
