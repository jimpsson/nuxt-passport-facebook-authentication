<template>
  <div class="container">
    <h1>Please login to see the secret content</h1>
    <div v-if="!$store.state.authUser">
      <p>Logged out</p>
    </div>
    <div v-else>
      <p>Logged in</p>
    </div>
    <p>
      <nuxt-link to="/user">User</nuxt-link>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formError: null,
        formUsername: '',
        formPassword: ''
      }
    }
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
