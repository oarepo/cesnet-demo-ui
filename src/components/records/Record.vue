<template lang="pug">
.col
  .text-h4(v-if="detail") {{ $t('labels.recordDetail') }}
  q-expansion-item.full-width.q-my-lg(
    ref="recordExpansion"
    :class="shadowClass"
    @after-show="onShow"
    @hide="onHide"
    group="records"
    :default-opened="detail"
    :disable="detail"
    :header-class="headerClass"
    popup
    clickable
    ripple)
    template(v-slot:header)
      q-item-section(avatar top)
        q-icon(name="book" size="34px")
      record-header(:owned="owned" :metadata="metadata")
      q-item-section(side top)
    q-separator
    q-card
      q-card-section.q-pa-md.overflow-hidden(horizontal)
        q-btn.absolute-right.vertical-middle.q-mr-lg.q-mb-sm(
          style="z-index: 999"
          flat
          square
          @click="systemInfoVisible = !systemInfoVisible"
          color="secondary"
          :icon="systemInfoVisible ? 'keyboard_arrow_right' : 'keyboard_arrow_left'")
        record-basic-metadata.record__basic-metadata(
          :class="[ systemInfoVisible ? 'col-8' : 'col-12']"
          :creator="metadata.creator"
          :abstract="metadata.abstract"
          :contributors="metadata.contributor")
        q-separator(vertical inset v-show="systemInfoVisible")
        transition(
          leave
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutRight")
          record-system-metadata(
            v-show="systemInfoVisible"
            :identifier="metadata.identifier"
            :created="created"
            :updated="updated"
            :revision="revision")
      q-separator(inset)
      q-card-section.q-pt-xs(horizontal)
        q-fab.absolute-bottom-right.q-ma-lg(
          v-if="!detail || owned"
          v-model="actionFab"
          :label="$t('labels.actionsBtn')"
          vertical-actions-align="right"
          label-position="top"
          label-class="bg-grey-3 text-black"
          external-label
          color="primary"
          icon="keyboard_arrow_left"
          direction="left")
          q-fab-action(
            v-if="owned"
            external-label
            label-position="top"
            color="secondary"
            @click="showRecordEditor"
            icon="edit"
            :label="$t('labels.updateRecordBtn')")
          q-fab-action(
            external-label
            v-if="!detail"
            label-position="bottom"
            @click="showRecordDetail"
            color="black"
            icon="fullscreen"
            :label="$t('labels.recordDetailsBtn')")
        record-links(:links="links" :handle="handleLink")
</template>

<script>
import { Component, Emit, Vue } from 'vue-property-decorator'
import RecordEditDialog from 'components/records/RecordEditDialog'
import RecordBasicMetadata from 'components/records/RecordBasicMetadata'
import RecordSystemMetadata from 'components/records/RecordSystemMetadata'
import RecordHeader from 'components/records/RecordHeader'
import RecordLinks from 'components/records/RecordLinks'

export default @Component({
  name: 'Record',
  components: {
    RecordLinks,
    RecordHeader,
    RecordSystemMetadata,
    RecordBasicMetadata
  },
  props: {
    detail: Boolean,
    id: String,
    metadata: Object,
    links: Object,
    created: String | Date,
    updated: String | Date,
    revision: Number
  }
})
class RecordList extends Vue {
  actionFab = false
  systemInfoVisible = true
  headerClass = 'bg-grey-3'
  shadowClass = ''

  @Emit('expand')
  onShow () {
    this.shadowClass = 'shadow-5'
    this.headerClass = 'record__expanded text-white'
    return this.$refs.recordExpansion
  }

  onHide () {
    this.shadowClass = ''
    this.headerClass = 'bg-grey-3'
  }

  get owned () {
    if (this.auth$.loggedLocally) {
      return this.metadata.owners.includes(this.auth$.authInfo.user.id)
    }
    return false
  }

  @Emit('change-record')
  recordChanged () { }

  showRecordDetail () {
    this.$router.push({
      name: 'record',
      params: { collectionId: 'records', recordId: this.id }
    })
  }

  showRecordEditor () {
    this.$q.dialog({
      component: RecordEditDialog,
      maximized: true,
      parent: this,
      title: this.$t('labels.editRecord'),
      value: this.metadata,
      id: this.id
    }).onOk(data => {
      this.recordChanged()
    })
  }

  get handleLink () {
    return `https://hdl.handle.net/20.500.12618/9999-${this.id}`
  }
}
</script>

<style lang="sass">
.record
  &__basic-metadata
    transition: width 1s ease
  &__title
    font-size: 1.1rem
  &__expanded
    transition: background-color 1.5s ease
    color: white !important
    background-color: $dark-accent
.q-expansion-item--expanded
  padding: 0 !important
.q-expansion-item--popup > .q-expansion-item__container
  border: 0
</style>
