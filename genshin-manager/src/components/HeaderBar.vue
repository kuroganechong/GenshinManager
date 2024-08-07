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
          class="form-control w-100 rounded-0 border-0"
          :class="{'text-danger': error}"
          type="text"
          id="floatingInput"
          placeholder="Press Enter to search for character"
          v-model="searchstring"
          v-on:keyup.enter="onSearch"
        />
        <label for="floatingInput">Press Enter to search for character</label>
      </div>
      <CharacterModal v-model:propShowCharPopUp="isShownCharacterModal" :propCharData="characterData" :propItemImageDict="itemImageDict" @refresh-chars="(name) => handleRefreshChars(name)"/>
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
  props: {
    propItemImageDict: {
      required: true,
      type: Object
    },
    propChars: {
      required: true,
      type: Object
    },
  },
  emits: ['update:propChars','refreshItemImageDict'],
  data() {
    return {
      searchstring: "",
      characterData: {},
      isShownCharacterModal: false,
      error: false
    }
  },
  computed: {
    itemImageDict() {
      return this.propItemImageDict
    },
    chars: {
      get() {
        return this.propChars
      },
      set(value) {
        this.$emit('update:propChars', value)
      }
    },
  },
  methods: {
    onSearch: async function () {
      if(this.searchstring != "") {
        const genshinDBResponse = JSON.parse(await window.api.findCharTalentByName(this.searchstring))
        let name = genshinDBResponse?.name

        for (const key in this.chars) {
          if (Object.hasOwnProperty.call(this.chars, key)) {
            const element = this.chars[key];
            if (element.name == name) {
              this.characterData = element
              this.isShownCharacterModal = true
              this.searchstring = ""
              this.error = false
              break
            }
            else {
              this.error = true
            }
          }
        }
      }
    },
    async handleRefreshChars(name){
      const response = await window.api.databaseFindCharacter(name)
      const data = JSON.parse(response)
      let char = data[0]
      const talent_response = await (async (name) => {
          const response = await window.api.findCharTalentByName(name)
          return JSON.parse(response)
        })(char.name);
      let talent_costs = talent_response.costs
      char.costs = Utils.calculateTalentCosts(char.talent1, char.talent2, char.talent3, structuredClone(talent_costs))
        
      const charresponse = await window.api.findCharacterByName(char.name)
      if(charresponse){
        char.image = {
          avatar: JSON.parse(charresponse).images['hoyolab-avatar']?JSON.parse(charresponse).images['hoyolab-avatar']: JSON.parse(charresponse).images['cover1'],
          icon: JSON.parse(charresponse).images['icon']
        }
      } 
      else {
        const lumineresponse = await window.api.findCharacterByName('Lumine')
        char.image = {
          avatar: JSON.parse(lumineresponse).images['hoyolab-avatar'],
          icon: JSON.parse(lumineresponse).images['icon']
        }
      }

      for (const key in this.chars) {
        if (Object.hasOwnProperty.call(this.chars, key)) {
          const element = this.chars[key];
          if(element.name == name) {
            this.chars[key] = char
            this.characterData = char
            this.$emit('refreshItemImageDict')
          }
        }
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
