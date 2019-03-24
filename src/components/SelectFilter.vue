<template>
  <div class="hobbysFilter">
    <select
      name="hobbysListFilter"
      @change="handleChangeHobbysListFilter"
    >
      <option selected="selected">{{ HOBBYS_FILTER }}</option>
      <option
        v-for="item in getAlphabetList"
        :key="item.text"
      >{{ item.text }}</option>
    </select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { HOBBYS_FILTER } from '@/store/actions'

export default {
  name: 'SelectFilter',
  created () {
    this.$store.dispatch('getHobbysList')
  },
  data () {
    return {
      HOBBYS_FILTER
    }
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
