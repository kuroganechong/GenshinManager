<template>
  <CharacterTable/>
</template>

<script>
import CharacterTable from './components/CharacterTable.vue'

export default {
  name: 'App',
  components: {
    CharacterTable
  }
}

/*
Logic:

Read all entries in database: names, talent 1,2,3 levels
For each character, read required boss drop, material, talent book type, talent book region

*/





</script>

<style>
#app {
}
</style>
