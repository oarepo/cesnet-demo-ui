<template lang="pug">
.row.justify-end.menu-dropdown.no-wrap
  .col-auto.gt-md.z-top
    .row
      locale-switcher.col-auto
      account-dropdown.q-mx-sm.col-auto(
        :query="query"
        v-if="loggedIn"
        @create-record="createRecord"
        @change-record="recordsChanged")
      q-btn.q-mx-sm.col-auto(flat color="grey-4" @click="login(doSearch)" v-else)
        q-avatar
          q-icon(name="https")
        .text-caption.text-uppercase {{ $t('labels.loginBtn') }}
  q-expansion-item.col-12.lt-lg.menu-dropdown.z-top(
    header-class="menu-dropdown q-px-xl q-py-lg"
    unelevated
    no-wrap
    fab-mini
    dark
    expand-icon="menu"
    dropdown-icon=""
    clickable
    size="sm"
    text-color="white")
    q-list.full-width(flat dark)
      q-item.bg-grey-9(clickable)
        locale-switcher.full-width
      q-item.bg-grey-9(clickable v-close-popup @click="login()")
        q-item-section(side)
          q-avatar(square icon="https")
        q-item-section
          q-item-label {{ $t('labels.loginBtn') }}
</template>

<script>
import { Component } from 'vue-property-decorator'
import LocaleSwitcher from 'components/i18n/LocaleSwitcher'
import AccountDropdown from 'components/widgets/dropdowns/AccountDropdown'
import { AuthStateMixin } from 'src/mixins/AuthStateMixin'
import { mixins } from 'vue-class-component'
import { RecordCreateMixin } from 'src/mixins/RecordCreateMixin'
import { SearchMixin } from 'src/mixins/SearchMixin'

export default @Component({
  name: 'MenuDropdown',
  props: {
    query: Object
  },
  components: {
    AccountDropdown,
    LocaleSwitcher
  }
})
class MenuDropdown extends mixins(AuthStateMixin, SearchMixin, RecordCreateMixin) {
  expanded = false
}
</script>

<style lang="sass" scoped>
.menu-dropdown
  transition: width 0.5s
</style>
