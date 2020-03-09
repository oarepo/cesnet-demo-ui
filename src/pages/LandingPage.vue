<template lang="pug">
  q-page.full-height.text-white(padding)
    .col-12.items-center.q-gutter-xl
      .row.justify-end
        .col-3
          locale-switcher.text-white
      .row.justify-center.items-center.full-width.text-center.landing-page
        q-img.logo-datacare.q-mx-xl(src="statics/logos/datacare_White.svg")
      .row.justify-center.items-center.text-center.full-width
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

.logo-datacare
  max-width: 300px
</style>
