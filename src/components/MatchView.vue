<template>
  <section class="match-view">
    <SelectFilter />
    <table class="match-view__list">
      <thead>
        <tr>
          <th class="matched">matched</th>
          <th>left</th>
          <th>right</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in getHobbysMatchList()" :key="item.matched">
          <td>{{ item.matched }}</td>
          <td>{{ item.left }}</td>
          <td>{{ item.right }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style lang="sass">
  @import '../css/components/MatchView.scss';
  @import '../css/components/SelectFilter.scss';
</style>

<script>
import { mapGetters } from 'vuex'
import SelectFilter from './SelectFilter'

export default {
  name: 'MatchView',
  components: {
    SelectFilter
  },
  methods: {
    ...mapGetters([
      'getHobbysMatchList'
    ])
  }
}
</script>
