<template>
    <header
      class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
    >
      <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#"
        >Genshin Manager</a
      >
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
      <input
        class="form-control form-control-dark w-100 rounded-0 border-0"
        type="text"
        placeholder="Search for Character"
        aria-label="Press Enter to search"
        v-model="searchstring"
        v-on:keyup.enter="onSearch"
      />
      <CharacterModal v-model:propShowCharPopUp="propShowCharPopUp" :propCharData="propCharData"/>
    </header>
</template>

<script>
import CharacterModal from './CharacterModal.vue'

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
        const response = await window.api.findCharacterByName(this.searchstring)
        try {
          const data = JSON.parse(response)
          this.propCharData = data
          this.propShowCharPopUp = true
        } catch (error) {
          console.log(error)
        }
        this.searchstring = ""
      }
    }
  },}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
