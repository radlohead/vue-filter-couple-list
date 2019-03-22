<template>
  <div>
    <button v-on:click="getHobbysList">SelectFilter</button>
    <select
      name="getHobbysListSelectFilter"
      @change="getHobbysListSelectFilter"
    >
      <option disabled selected="selected">filter</option>
      <option
        v-for="item in getHobbysListSelectFilterAlphabet"
        :key="item.text"
      >{{ item.text }}</option>
    </select>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SelectFilter',
  methods: {
    getHobbysListSelectFilter (e) {
      this.$store.commit('getHobbysListSelectFilter', e.target)
    }
  },
  computed: {
    ...mapActions([
      'getHobbysList'
    ]),
    ...mapGetters([
      'getHobbysListSelectFilterAlphabet'
    ])
  }
}
</script>
