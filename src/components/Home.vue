<template>
  <div class="home">
    <SelectFilter />
    <MatchView />
  </div>
</template>

<script>
import { SelectFilter, MatchView } from './index'

export default {
  name: 'Home',
  components: {
    SelectFilter,
    MatchView
  }
}
</script>
