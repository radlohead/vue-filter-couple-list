<template>
  <div>
    <button v-on:click="getHobbysList">SelectFilter</button>
  </div>
</template>

<script>
export default {
  name: 'SelectFilter',
  methods: {
    getHobbysList (e) {
      this.$store.dispatch('getHobbysList', e)
    }
  }
}
</script>
