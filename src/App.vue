<template>
  <div id="app">
    <Home/>
  </div>
</template>

<style lang="sass">
  @import './css/App.scss';
</style>

<script>
import Home from './components/Home'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>
