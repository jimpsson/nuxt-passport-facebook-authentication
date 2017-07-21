<template>
  <div class="container">
    <h1>User</h1>
    <h4>{{ this.$store.state.authUser.name }}</h4>
    <h4>{{ this.$store.state.authUser.id }}</h4>
    <p><nuxt-link to="/">Home</nuxt-link></p>
  </div>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>

<style>
.container {
  padding: 100px;
}
.error {
  color: red;
}
</style>
