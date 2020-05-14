<template lang="pug">
q-expansion-item.full-width.q-my-lg(
  group="records"
  expand-separator
  header-class="bg-grey-2 shadow-1"
  popup
  clickable
  ripple)
  template(v-slot:header)
    q-item-section(avatar top)
      q-icon(name="book" size="34px")
    q-item-section(top lines="1")
      q-item-label(overline lines="1").q-py-sm
        .row.items-center.justify-between
          .text-weight-bold.record__title {{ metadata.title[0].value }}
          q-badge(v-if="owned" color="accent").text-caption.text-lowercase {{ $t('labels.record.owner') }}
      q-item-label.text-grey-9.q-py-xs {{ metadata.creator }}
      q-item-label.q-body-2.q-py-sm.text-justify  {{ metadata.description[0].value }}
    q-item-section(side top)
  q-separator
  q-card
    q-card-section(horizontal)
      q-card-section.col-8.q-pt-xs
        .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.creator') }}
        .text-caption {{ metadata.creator }}
        .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.contributors') }}
        .text-caption {{ metadata.contributor }}
        .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.abstract') }}
        .text-caption {{ metadata.abstract[0].value }}
      q-separator(vertical)
      q-card-section.q-pt-xs.col-4
        .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.identifier') }}
        .text-caption {{ metadata.identifier }}
        .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.created') }}
        .text-caption {{ created | formatDate }}
        .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.updated') }}
        .text-caption {{ updated | formatDate }}
        .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.revision') }}
        .text-caption {{ revision }}
    q-separator
    q-card-section.q-pt-xs(horizontal)
      q-card-section.q-pt-xs(:class="[owned? 'col-8': '']")
        .text-overline.text-weight-bold.text-uppercase {{ $t('labels.record.links') }}
        .text-caption.text-weight-bold(v-for="(uri, name) in links" :key="name")
            q-badge(outline color="primary") {{ name }}:
            q-space
            a(:href="uri" target="_blank") {{ uri }}
      q-separator(v-if="owned" vertical)
      q-card-section(v-if="owned").q-pt-xs.col-4
        .col.justify-center
          q-btn.full-width.text-grey-8(
            @click="showRecordEditor"
            color="grey-2"
            icon="edit"
            size="md"
            unelevated)
            span.q-ml-md {{ $t('labels.updateRecordBtn') }}
</template>

<script>
import { Component, Emit, Vue } from 'vue-property-decorator'
import RecordEditDialog from 'components/records/RecordEditDialog'

export default @Component({
  name: 'Record',
  props: {
    id: String,
    metadata: Object,
    links: Object,
    created: String,
    updated: String,
    revision: Number
  }
})
class RecordList extends Vue {
  get owned () {
    if (this.auth$.loggedLocally) {
      return this.metadata.owners.includes(this.auth$.authInfo.user.id)
    }
    return false
  }

  @Emit('change-record')
  recordChanged () { }

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

  created () {
    // TODO: add handle link just for demo purposes
    this.links.handle = 'https://hdl.handle.net/20.500.12618/DEMO-RECORD-HANDLE-LEADING-NOWHERE'
  }
}
</script>

<style lang="sass" scoped>
.record__title
  font-size: 1.1rem
</style>
