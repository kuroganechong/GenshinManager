<template>
  <div class="row d-flex">
    <div class="col-sm-1 card-col" v-for="(char, index) in chars" :key="index">
      <div class="card card-custom">
        <img :src="char.image.avatar" class="card-img-top clickable" @error="imageUrlAlt($event, char.image.icon)" @click="launchCharacterModal(index)">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div class="p-2 fw-bold">{{ char.name }}</div>
            <div class="p-2">{{ char.set1 }}</div>
          </div>
        </div>
        
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn noclick">{{ char.a1 }}</button>
          <button type="button" class="btn noclick">{{ char.a2 }}</button>
          <button type="button" class="btn noclick">{{ char.a3 }}</button>
          <button type="button" class="btn noclick">{{ char.a4 }}</button>
          <button type="button" class="btn noclick">{{ char.a5 }}</button>
        </div>
      </div>
    </div>
  </div>
  <CharacterModal v-model:propShowCharPopUp="isShownCharacterModal" :propCharData="characterData" :propItemImageDict="propItemImageDict" @refresh-chars="(name) => handleRefreshChars(name)"/>
</template>

<script>

const Utils = require('../utils.js')
import CharacterModal from './CharacterModal.vue'

export default {
  name: "CharacterTableDetails",
  components: {
    CharacterModal,
  },
  props: {
    propChars: {
      required: true,
      type: Object
    },
    propItemImageDict: {
      required: true,
      type: Object
    },
  },
  data() {
    return {
      isShownCharacterModal: false,
      characterData: {}
    }
  },
  emits: ['update:propChars','refreshItemImageDict'],
  computed: {
    chars: {
      get() {
        return this.propChars
      },
      set(value) {
        this.$emit('update:propChars', value)
      }
    }
  },
  methods: {
    formatNumberInK(number) {
      let newNumber = new Intl.NumberFormat('ja-JP').format(number/1000)
      if(number > 1000)
      newNumber = newNumber + 'k'
      return newNumber
    },
    launchCharacterModal: function (index) {
      this.isShownCharacterModal = true
      this.characterData = this.chars[index]
    },
    imageUrlAlt(event, alturl) {
      event.target.src = alturl
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
          avatar: JSON.parse(charresponse).images['hoyolab-avatar']?JSON.parse(charresponse).images['hoyolab-avatar']: JSON.parse(charresponse).images['icon'],
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
  async created() {
    const response = await window.api.databaseGetAllCharacter()
    let data = JSON.parse(response)
    for (let char of data) {
      const talent_response = await (async (name) => {
          const response = await window.api.findCharTalentByName(name)
          return JSON.parse(response)
        })(char.name);
      let talent_costs = talent_response.costs
      char.costs = Utils.calculateTalentCosts(char.talent1, char.talent2, char.talent3, structuredClone(talent_costs))
        
      const charresponse = await window.api.findCharacterByName(char.name)
      if(charresponse){
        char.image = {
          avatar: JSON.parse(charresponse).images['hoyolab-avatar']?JSON.parse(charresponse).images['hoyolab-avatar']: JSON.parse(charresponse).images['icon'],
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
    }
    
    data.sort(
      (a,b) => {
        let nameA = a.name
        let nameB = b.name
        if (nameA > nameB) {
          return 1
        }
        if (nameA < nameB) {
          return -1
        }
        return 0
      }
    )

    this.chars = data;
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
.card-col {
  width: 15%;
  padding-bottom: 1rem;
}
.card-custom {
  min-height: 20rem;
}
.card-body {
  padding-bottom: 0;
}
.noclick {
  cursor: default;
}
.clickable {
  cursor: pointer;
}
</style>