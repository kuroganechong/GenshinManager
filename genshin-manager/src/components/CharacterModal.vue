<template>
    <Teleport to="body">
        <div v-if="showCharPopUp" class="card modal1" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{{ char.name }}</h5>
            <input v-model="talent1">
            <p class="card-text">Normal {{ char.talent1 }}</p>
            <p class="card-text">E {{ char.talent2 }}</p>
            <p class="card-text">Q {{ char.talent3 }}</p>
            <li>Mora {{ formatNumberInK(char.costs.mora) }}</li>
            <li v-for="(item, index) in char.costs.book" :key="index">
              {{ item.count }} {{ item.name }}
            </li>
            <li v-for="(item, index) in char.costs.mat" :key="index">
              {{ item.count }} {{ item.name }}
            </li>
            <li v-for="(item, index) in char.costs.boss" :key="index">
              {{ item.count }} {{ item.name }}
            </li>

            <button type="button" class="btn btn-secondary" @click="onClose">Close</button>
          </div>
        </div>
    </Teleport>
</template>

<script>
const Utils = require('../utils.js')
// character image
// 5 inputs for artifacts
// 3 inputs for talents
// 1 input for notes
// List all materials: mora,books, mats, boss


export default {
  props: {
    propShowCharPopUp: {
      required: true,
      type: Boolean
    },
    propCharData: {
      required: true,
      type: Object
    }
  },
  emits: ['update:propShowCharPopUp'],
  data() {
    return {
      artflower: 0,
      artfeather: 0,
      artsands: 0,
      artcup: 0,
      arthat: 0,
    }
  },
  computed: {
    talent1: {
      get() {
        return this.char.talent1
      },
      set(value) {
        this.updateCharacter(1,value)
      }
    },
    char() {
      return this.propCharData
    },
    showCharPopUp: {
      get() {
        return this.propShowCharPopUp
      },
      set(value) {
        this.$emit('update:propShowCharPopUp', value)
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
    onClose() {
      this.showCharPopUp = false
    },
    async updateCharacter(talent,input){
      let value = parseInt(input)
      if(value >0 && value <=10) {
        let t = []
        switch(parseInt(talent)){
          case 1:
            t = [value,this.char.talent2,this.char.talent3]
            break;
          case 2:
            t = [this.char.talent1,value,this.char.talent3]
            break;
          case 3:
            t = [this.char.talent1,this.char.talent2,value]
            break;
          default:
            t = [this.char.talent1,this.char.talent2,this.char.talent3]
            console.log('Talent not changed')
            break;
        }

        const response = await window.api.databaseUpdateCharacter(new Utils.Character(
          this.char.name,
          t[0],
          t[1],
          t[2]
        ))
        if(response) {
          // initiate event to reload char table
          console.log('ok')
        }
      }
    }
  }
}
</script>

<style scoped>
.modal1 {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  margin-left: -150px;
}
</style>