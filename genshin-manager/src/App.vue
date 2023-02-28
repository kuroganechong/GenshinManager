<template>
  <div>
    <input v-model="text">
    <button @click="findCharacterByName">Search</button>
    <p>{{ received_name }}</p>
  </div>
  <CharacterTable/>
</template>

<script>
import CharacterTable from './components/CharacterTable.vue'

export default {
  name: 'App',
  components: {
    CharacterTable
  },
  data (){
    return {
      text: "",
      result: ""
    }
  },
  computed: {
    received_name(){
      return this.result
    }
  },
  methods: {
    async findCharacterByName() {
      let name, response
      name = this.text
      response = await window.api.findCharacterByName(name)
      try {
        this.result = JSON.parse(response)
      } catch (error) {
        this.result = "Can't find character"
      }
      return 1
    }
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
