<template>
  <div class="accordion-item">
    <div id="flush-collapseOne" class="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#characterTable">
      <div class="accordion-body">
        <div class="row">
          <div class="col-sm-3">
            <div class="card">
              <div class="card-header fw-bold">
                Mora
                <div class="fw-normal">
                  For 180 resin per day, and 20 resin net you 60,000, it will take you {{ (morasum/540000).toFixed(1) }} days
                </div>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div>
                    <img :src="getImage('Mora')" class="iconimg"> {{ formatNumber(morasum) }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
            
          <div class="col-sm-3">
            <div class="card">
              <div class="card-header fw-bold">
                Book
                <div class="fw-normal">
                  For 180 resin per day, and 20 resin net you 10 greens, it will take you {{ booksumcalc.toFixed(1) }} days
                </div>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-start" :class="{'bg-success-subtle': mats[item.name] >= item.count}" v-for="(item, index) in booksum" :key="index">
                  <div class="fw-bold summaryitem" :class="getRarity(item.name)">
                    <span class="fw-normal summaryitemtooltip text-bg-secondary card">
                      <li>{{ domainEntranceDict[item.name]?.region }}: {{ domainEntranceDict[item.name]?.domainentrance }}</li>
                      <span >{{ getSource(item.name)?.daysofweek[0] }}</span>
                      <p class="fw-bold">
                        Characters: <span class="fw-normal" v-for="(i, d) in item.charName" :key="d">{{ i + " "}} </span>
                      </p>
                    </span>
                    <img :src="getImage(item.name)" class="iconimg"> {{ item.name }}
                  </div>
                  <div class="">
                    <input type="number" class="mat-amount text-center" v-model="mats[item.name]" @input="updateAmount(item.name, mats[item.name])"> / {{ item.count }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
            
          <div class="col-sm-3">
            <div class="card">
              <div class="card-header fw-bold">
                Mats
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-start" :class="{'bg-success-subtle': mats[item.name] >= item.count}" v-for="(item, index) in matsum" :key="index">
                  <div class="fw-bold summaryitem" :class="getRarity(item.name)">
                    <span class="fw-normal summaryitemtooltip text-bg-secondary card">
                      <li v-for="(item, index) in getSource(item.name)" :key="index">{{ item }}</li>
                      <p class="fw-bold">
                        Characters: <span class="fw-normal" v-for="(i, d) in item.charName" :key="d">{{ i + " "}} </span>
                      </p>
                    </span>
                    <img :src="getImage(item.name)" class="iconimg"> {{ item.name }}
                  </div>
                  <div class="">
                    <input type="number" class="mat-amount text-center" v-model="mats[item.name]" @input="updateAmount(item.name, mats[item.name])"> / {{ item.count }}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-sm-3">
            <div class="card">
              <div class="card-header fw-bold">
                Boss
                <div class="fw-normal">
                  For 6 drops per week, it will take you {{ bosssumcalc.toFixed(1) }} weeks
                </div>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-start" :class="{'bg-success-subtle': mats[item.name] >= item.count}" v-for="(item, index) in bosssum" :key="index">
                  <div class="fw-bold summaryitem" :class="getRarity(item.name)">
                    <span class="fw-normal summaryitemtooltip text-bg-secondary card">
                      <p v-for="(item, index) in getSource(item.name)" :key="index">{{ item }}</p>
                      <p class="fw-bold">
                        Characters: <span class="fw-normal" v-for="(i, d) in item.charName" :key="d">{{ i + " "}} </span>
                      </p>
                    </span>
                    <img :src="getImage(item.name)" class="iconimg"> {{ item.name }}
                  </div>
                  <div class="">
                    <input type="number" class="mat-amount text-center" v-model="mats[item.name]" @input="updateAmount(item.name, mats[item.name])"> / {{ item.count }}
                  </div>
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
      mats: {},
      domainEntranceDict: {},
    };
  },
  watch: {
    // Set propChars as watcher, when propChars change, fetch updated imagedicts from database and store in temp
    async propChars() {
      /*const response0 = await Utils.fetchItemDetails('Mora')
      const response1 = await Utils.fetchItemDetailsFromSum(this.booksum)
      const response2 = await Utils.fetchItemDetailsFromSum(this.matsum)
      const response3 = await Utils.fetchItemDetailsFromSum(this.bosssum)
      const response = Object.assign({}, response0, response1, response2, response3);
      */
      const response = await Utils.fetchAllItemDetails()
      this.itemImageDict = response
      console.log("updated itemlist")
    },
    async itemImageDict() {
      let temp = {}
      for (const key in this.itemImageDict) {
        if (Object.hasOwnProperty.call(this.itemImageDict, key)) {
          const element = this.itemImageDict[key];
          if(element.source.dropdomain){
            const response = await window.api.findDomainEntrance(element.source.dropdomain)
            if(response) {
              let result = JSON.parse(response)
              temp[key] = {
                region: result.region,
                domainentrance: result.domainentrance
              }
            }
          }
        }
      }
      this.domainEntranceDict = temp
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
        let charName = this.chars[i].name
        for (let i = 0; i < book.length; i++) {
          let isCounted = false
          for (let j = 0; j < result.length; j++){
            if (result[j].name == book[i].name) {
              result[j].count += book[i].count
              result[j].charName.push(structuredClone(charName))
              isCounted = true
            }
          }
          if(!isCounted){
            result.push(structuredClone({
              name: book[i].name,
              count: book[i].count,
              charName: [charName]
            }))
          }
        }
      }
      
      result.sort(
        (a,b) => {
          let sourceA = this.getSortOrder(a.name)
          let sourceB = this.getSortOrder(b.name)
          if (sourceA > sourceB) {
            return 1
          }
          if (sourceA < sourceB) {
            return -1
          }
          return 0
        }
      )
      return result
    },
    matsum() {
      let result = []
      for (let i = 0 ; i < this.chars.length; i++) {
        let mat = this.chars[i].costs.mat
        let charName = this.chars[i].name
        for (let i = 0; i < mat.length; i++) {
          let isCounted = false
          for (let j = 0; j < result.length; j++){
            if (result[j].name == mat[i].name) {
              result[j].count += mat[i].count
              result[j].charName.push(structuredClone(charName))
              isCounted = true
            }
          }
          if(!isCounted){
            result.push(structuredClone({
              name: mat[i].name,
              count: mat[i].count,
              charName: [charName]
            }))
          }
        }
      }
      
      result.sort(
        (a,b) => {
          let sourceA = this.getSortOrder(a.name)
          let sourceB = this.getSortOrder(b.name)
          if (sourceA > sourceB) {
            return 1
          }
          if (sourceA < sourceB) {
            return -1
          }
          return 0
        }
      )
      return result
    },
    bosssum() {
      let result = []
      for (let i = 0 ; i < this.chars.length; i++) {
        let boss = this.chars[i].costs.boss
        let charName = this.chars[i].name
        for (let i = 0; i < boss.length; i++) {
          let isCounted = false
          for (let j = 0; j < result.length; j++){
            if (result[j].name == boss[i].name) {
              result[j].count += boss[i].count
              result[j].charName.push(structuredClone(charName))
              isCounted = true
            }
          }
          if(!isCounted){
            result.push(structuredClone({
              name: boss[i].name,
              count: boss[i].count,
              charName: [charName]
            }))
          }
        }
      }
      
      result.sort(
        (a,b) => {
          let sourceA = this.getSortOrder(a.name)
          let sourceB = this.getSortOrder(b.name)
          if (sourceA > sourceB) {
            return 1
          }
          if (sourceA < sourceB) {
            return -1
          }
          return 0
        }
      )
      return result
    },
    bosssumcalc() {
      let result = 0
      for (const key in this.bosssum) {
        if (Object.hasOwnProperty.call(this.bosssum, key)) {
          const element = this.bosssum[key];
          result += parseInt(element.count)
          result -= Math.max(Math.min(this.mats[element.name],parseInt(element.count)),0)
        }
      }
      return result / 6
    },
    booksumcalc() {
      let result = 0
      for (const key in this.booksum) {
        if (Object.hasOwnProperty.call(this.booksum, key)) {
          const element = this.booksum[key];
          const rarity = this.itemImageDict[element.name].rarity
          switch(parseInt(rarity)){
            case 4:
              result += parseInt(element.count)*9
              result -= Math.max(Math.min(this.mats[element.name],parseInt(element.count)),0)*9
              break;
            case 3:
              result += parseInt(element.count)*3
              result -= Math.max(Math.min(this.mats[element.name],parseInt(element.count)),0)*3
              break;
            case 2:
              result += parseInt(element.count)
              result -= Math.max(Math.min(this.mats[element.name],parseInt(element.count)),0)
              break;
            default:
              break;
          }
        }
      }
      return result / 90
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
    },
    getSource(name) {
      return this.itemImageDict[name]?.source
    },
    getSortOrder(name) {
      return this.itemImageDict[name]?.sortorder
    },
    async updateAmount(name, value) {
      if(!isNaN(value) && value != "" && value >= 0) {
        let num = parseInt(value)
        const response = await window.api.databaseUpdateMat(name, num)
        if(response) {
          // initiate event to reload char table
          console.log('Updated '+ name +' amount '+num)
        }
      }
    }
  },
  async created() {
    const response = await window.api.databaseGetAllMat()
    const data = JSON.parse(response)
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        this.mats[element.name] = element.value
      }
    }
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

.summaryitem:hover .summaryitemtooltip {
    display: block;
}

.summaryitemtooltip {
    display: none;
    margin-left: 32px;
    padding: 10px;
    position: absolute;
    z-index: 1000;
    list-style-type: none;
}
.mat-amount{
  max-width: 3em;
  border: none;
}
</style>