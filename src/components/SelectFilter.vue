<template>
  <div>
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
import { mapGetters } from 'vuex'

export default {
  name: 'SelectFilter',
  created () {
    this.$store.dispatch('getHobbysList')
  },
  methods: {
    getHobbysListSelectFilter (e) {
      this.$store.commit('getHobbysListSelectFilter', e.target)
    }
  },
  computed: {
    ...mapGetters([
      'getHobbysListSelectFilterAlphabet'
    ])
  }
}
</script>
