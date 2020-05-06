<template>
  <div class="fixed-center text-center">
    <p>
      <q-icon name="exit_to_app" size="xl"></q-icon>
    </p>
    <p class="text-faded">
      You have been <strong>logged out</strong>..
    </p>
    <q-btn
      color="secondary"
      style="width:200px;"
      to="/"
      label="Go back"
    />
  </div>
</template>

<script>
export default {
  name: 'Logout'
}
</script>
