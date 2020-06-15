<template lang="pug">
div
  q-btn-dropdown.full-height.account-dropdown.z-top(
    unelevated
    no-wrap
    clickable
    size="sm"
    text-color="white"
    v-if="loggedIn")
    template(v-slot:label)
      .row.items-center.no-wrap.q-gutter-sm.q-py-xs
        q-avatar(size="md")
          img(src="https://cdn.quasar.dev/img/boy-avatar.png")
        .text-caption {{ auth.user_info.name }}
    q-list(bordered padding dark).account-dropdown__list.text-white.rounded-borders
      q-item(clickable)
        locale-switcher.full-width
      q-item(clickable v-close-popup @click="showRecordCreate")
        q-item-section
          q-item-label {{ $t('labels.createRecordBtn') }}
        q-item-section(side)
          q-avatar(square icon="add" text-color="white")
      q-separator(inset dark)
      q-item(clickable v-close-popup @click="logout")
        q-item-section
          q-item-label {{ $t('labels.logoutBtn') }}
        q-item-section(side)
          q-avatar(square icon="exit_to_app" text-color="white")
</template>

<script>
import { Component } from 'vue-property-decorator'
import RecordCreateDialog from 'components/records/RecordCreateDialog'
import LocaleSwitcher from 'components/i18n/LocaleSwitcher'
import { RecordCreateMixin } from 'src/mixins/RecordCreateMixin'
import { mixins } from 'vue-class-component'
import { LogoutMixin } from 'src/mixins/LogoutMixin'
import { AuthStateMixin } from 'src/mixins/AuthStateMixin'

export default @Component({
  name: 'AccountDropdown',
  components: {
    RecordCreateDialog,
    LocaleSwitcher
  },
  props: {
    query: Object
  }
})
class AccountDropdown extends mixins(
    RecordCreateMixin,
    LogoutMixin,
    AuthStateMixin) {
}
</script>

<style lang="sass" scoped>
.account-dropdown
  &__list
    background-color: $dark-accent
</style>
