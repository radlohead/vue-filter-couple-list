<template>
  <div>
    <select
      name="hobbysListFilter"
      @change="handleChangeHobbysListFilter"
    >
      <option disabled selected="selected">filter</option>
      <option
        v-for="item in getAlphabetList"
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
    handleChangeHobbysListFilter (e) {
      this.$store.commit('handleChangeHobbysListFilter', e.target)
    }
  },
  computed: {
    ...mapGetters([
      'getAlphabetList'
    ])
  }
}
</script>
