<template lang="pug">
div
  q-list(dark padding).q-mt-sm.text-white
    q-item-label.text-overline.text-uppercase(header) {{ $t('labels.actionsBtn') }}
    q-separator
    q-btn.q-mt-sm.full-width.text-left(
      flat
      v-if="!loggedIn"
      @click="login()"
      unelevated
      align="left"
      icon-right=""
      icon="https"
      no-caps)
      span.account-settings__button-label {{ $t('labels.loginBtn') }}
    q-btn.q-mt-sm.full-width.text-left(
      flat
      v-if="loggedIn"
      @click="showRecordCreate"
      unelevated
      align="left"
      icon-right=""
      icon="add"
      no-caps)
      span.account-settings__button-label {{ $t('labels.createRecordBtn') }}
    q-btn.q-mt-sm.full-width.text-left(
      flat
      v-if="loggedIn"
      @click="logout"
      unelevated
      align="left"
      icon-right=""
      icon="exit_to_app"
      no-caps)
      span.account-settings__button-label {{ $t('labels.logoutBtn') }}
  q-list(dark padding).q-mt-sm.text-white
    q-item-label.text-overline.text-uppercase(header) {{ $t('labels.preferences') }}
    q-separator
    q-item
      locale-switcher.full-width
</template>

<script>
import { Component } from 'vue-property-decorator'
import LocaleSwitcher from 'components/i18n/LocaleSwitcher'
import { RecordCreateMixin } from 'src/mixins/RecordCreateMixin'
import { mixins } from 'vue-class-component'
import { LogoutMixin } from 'src/mixins/LogoutMixin'
import { AuthStateMixin } from 'src/mixins/AuthStateMixin'

export default @Component({
  name: 'AccountSettings',
  components: {
    LocaleSwitcher
  },
  props: {
    query: Object
  }
})
class AccountSettings extends mixins(
    RecordCreateMixin,
    LogoutMixin,
    AuthStateMixin) {
}
</script>

<style lang="sass" scoped>
.account-settings
  &__button-label
    margin-left: 2rem
</style>
