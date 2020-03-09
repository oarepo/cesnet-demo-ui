<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>
const title = 'CESNET Repository - DEMO'

export default {
  name: 'App',
  watch: {
    '$route' (to, from) {
      document.title = to.meta.title ? `${to.meta.title} | ${title}` : title
    }
  }
}
</script>
