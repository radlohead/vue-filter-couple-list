<template>
  <section>
    <table class="match-list">
      <thead>
        <tr>
          <th>matched</th>
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
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MatchView',
  methods: {
    ...mapGetters([
      'getHobbysMatchList'
    ])
  }
}
</script>
