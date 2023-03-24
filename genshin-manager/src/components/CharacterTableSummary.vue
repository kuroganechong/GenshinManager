<template>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        Summary
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
        <div class="row">
          <div class="col-sm-3">
            <div class="card">
              <div class="card-header">
                Mora
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div >
                    <img :src="getImage('Mora')" class="iconimg"> {{ formatNumber(morasum) }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
            
          <div class="col-sm-3">
            <div class="card">
              <div class="card-header">
                Book
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-start" v-for="(item, index) in booksum" :key="index">
                  <div class="fw-bold" :class="getRarity(item.name)">
                    <img :src="getImage(item.name)" class="iconimg"> {{ item.name }}
                  </div>
                  {{ item.count }}
                </li>
              </ul>
            </div>
          </div>
            
          <div class="col-sm-3">
            <div class="card">
              <div class="card-header">
                Mats
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-start" v-for="(item, index) in matsum" :key="index">
                  <div class="fw-bold" :class="getRarity(item.name)">
                    <img :src="getImage(item.name)" class="iconimg"> {{ item.name }}
                  </div>
                  {{ item.count }}
                </li>
              </ul>
            </div>
          </div>

          <div class="col-sm-3">
            <div class="card">
              <div class="card-header">
                Boss
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-start" v-for="(item, index) in bosssum" :key="index">
                  <div class="fw-bold" :class="getRarity(item.name)">
                    <img :src="getImage(item.name)" class="iconimg"> {{ item.name }}
                  </div>
                  {{ item.count }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Utils = require('../utils.js')
export default {
  name: "CharacterTableSummary",
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
  emits: ['update:propItemImageDict'],
  data() {
    return {
    };
  },
  watch: {
    // Set propChars as watcher, when propChars change, fetch updated imagedicts from database and store in temp
    async propChars() {
      const response0 = await Utils.fetchItemDetails('Mora')
      const response1 = await Utils.fetchItemDetailsFromSum(this.booksum)
      const response2 = await Utils.fetchItemDetailsFromSum(this.matsum)
      const response3 = await Utils.fetchItemDetailsFromSum(this.bosssum)
      const response = Object.assign({}, response0, response1, response2, response3);
      this.itemImageDict = response
    }
  },
  computed: {
    itemImageDict: {
      get() {
        return this.propItemImageDict
      },
      set(value) {
        this.$emit('update:propItemImageDict', value)
      }
    },
    chars() {
      return this.propChars
    },
    morasum() {
      let sum = 0
        for (let i = 0 ; i < this.chars.length; i++) {
          sum += this.chars[i].costs.mora
        }
      return sum
    },
    booksum() {
      let result = []
      for (let i = 0 ; i < this.chars.length; i++) {
        let book = this.chars[i].costs.book
        for (let i = 0; i < book.length; i++) {
          let isCounted = false
          for (let j = 0; j < result.length; j++){
            if (result[j].name == book[i].name) {
              result[j].count += book[i].count
              isCounted = true
            }
          }
          if(!isCounted){
            result.push(structuredClone(book[i]))
          }
        }
      }
      return result
    },
    matsum() {
      let result = []
      for (let i = 0 ; i < this.chars.length; i++) {
        let mat = this.chars[i].costs.mat
        for (let i = 0; i < mat.length; i++) {
          let isCounted = false
          for (let j = 0; j < result.length; j++){
            if (result[j].name == mat[i].name) {
              result[j].count += mat[i].count
              isCounted = true
            }
          }
          if(!isCounted){
            result.push(structuredClone(mat[i]))
          }
        }
      }
      return result
    },
    bosssum() {
      let result = []
      for (let i = 0 ; i < this.chars.length; i++) {
        let boss = this.chars[i].costs.boss
        for (let i = 0; i < boss.length; i++) {
          let isCounted = false
          for (let j = 0; j < result.length; j++){
            if (result[j].name == boss[i].name) {
              result[j].count += boss[i].count
              isCounted = true
            }
          }
          if(!isCounted){
            result.push(structuredClone(boss[i]))
          }
        }
      }
      return result
    }
  },
  methods: {
    getImage(name) {
      return this.itemImageDict[name]?.images
    },
    formatNumber(number) {
      return new Intl.NumberFormat('ja-JP').format(number)
    },
    getRarity(name) {
      switch(parseInt(this.itemImageDict[name]?.rarity)) {
        case 1:
          return {common: true}
        case 2:
          return {uncommon: true}
        case 3:
          return {rare: true}
        case 4:
          return {unusual: true}
        case 5:
          return {legendary: true}
        default:
          return {}
      }
    }
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
.iconimg {
  height: 3em
}
.common {
  color: #72778B;
}
.uncommon {
 color: #2B9072
}
.rare {
 color: #5180CC
}
.unusual {
 color: #A256E1
}
.legendary {
 color: #bf6a32
}
</style>