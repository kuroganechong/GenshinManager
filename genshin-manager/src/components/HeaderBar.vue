<template>
    <header
      class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
    >
      <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">
        Genshin Manager
      </a>
      <button
        class="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="form-floating w-100 rounded-0 border-0">
        <input
          class="form-control form-control-dark w-100 rounded-0 border-0"
          type="text"
          id="floatingInput"
          placeholder="Press Enter to search for character"
          v-model="searchstring"
          v-on:keyup.enter="onSearch"
        />
        <label for="floatingInput">Press Enter to search for character</label>
      </div>
      <CharacterModal v-model:propShowCharPopUp="propShowCharPopUp" :propCharData="propCharData"/>
    </header>
</template>

<script>
import CharacterModal from './CharacterModal.vue'
const Utils = require('../utils.js')

export default {
  name: 'HeaderBar',
  components: {
    CharacterModal,
  },
  data() {
    return {
      searchstring: "",
      propCharData: {},
      propShowCharPopUp: false
    }
  },
  computed: {},
  methods: {
    onSearch: async function () {
      if(this.searchstring != "") {
        const genshinDBResponse = JSON.parse(await window.api.findCharTalentByName(this.searchstring))
        console.log(genshinDBResponse)
        const DBResponse = JSON.parse(await window.api.databaseFindCharacter(genshinDBResponse.name))
        console.log(DBResponse)
        
        let talent_costs = genshinDBResponse.costs
        let char = DBResponse[0]
        char.costs = Utils.calculateTalentCosts(char.talent1, char.talent2, char.talent3, structuredClone(talent_costs))

        this.propCharData = char
        this.propShowCharPopUp = true
        this.searchstring = ""
      }
    }
  },}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
