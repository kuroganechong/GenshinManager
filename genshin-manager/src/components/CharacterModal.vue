<template>
  <Teleport to="body">
    <div v-if="showCharPopUp" class="modal-backdrop" @click="onClose"></div>
  </Teleport>
  <Teleport to="body">
    <div v-if="showCharPopUp" class="card modal1">
      <div class="card-body">
        <div class="modal-header">
          <h5 class="card-title">{{ char.name }}</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="onClose"></button>
        </div>
        <div class="row">
          <div class="col-4">
            <img :src="char.image.avatar" @error="imageUrlAlt($event, char.image.icon)" class="charImg">
            <input class="form-control" list="artifact1Options" id="exampleDataList" placeholder="Set 1" v-model="set1">
            <datalist id="artifact1Options">
              <option v-for="(item, index) in artifacts" :key="index" :value="item"></option>
            </datalist>

            <input class="form-control" list="artifact2Options" id="exampleDataList" placeholder="Set 2" v-model="set2">
            <datalist id="artifact2Options">
              <option v-for="(item, index) in artifacts" :key="index" :value="item"></option>
            </datalist>
          </div>
          <div class="col-8">
            <div class="card">
              <div class="row card-body">
                <h5 class="card-title">Talent</h5>
                <div class="numberinputlabel">
                  <div class=" text-center">Normal</div>
                  <div class="btn-group-vertical" role="group" aria-label="Talent 1">
                    <button type="button" class="btn numberbtn" @click="talent1 += 1">
                      ⌃
                    </button>
                    <input v-model="talent1" class="numberinput text-center">
                    <button type="button" class="btn numberbtn" @click="talent1 -= 1">
                      ⌄
                    </button>
                  </div>
                </div>

                <div class="numberinputlabel">
                  <div class=" text-center">E</div>
                  <div class="btn-group-vertical" role="group" aria-label="Talent 2">
                    <button type="button" class="btn numberbtn" @click="talent2 += 1">
                      ⌃
                    </button>
                    <input v-model="talent2" class="numberinput text-center">
                    <button type="button" class="btn numberbtn" @click="talent2 -= 1">
                      ⌄
                    </button>
                  </div>
                </div>

                <div class="numberinputlabel">
                  <div class=" text-center">Q</div>
                  <div class="btn-group-vertical" role="group" aria-label="Talent 3">
                    <button type="button" class="btn numberbtn" @click="talent3 += 1">
                      ⌃
                    </button>
                    <input v-model="talent3" class="numberinput text-center">
                    <button type="button" class="btn numberbtn" @click="talent3 -= 1">
                      ⌄
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="card artifactcard">
              <div class="row card-body">
                <h5 class="card-title">Artifacts</h5>
                <div class="numberinputlabel">
                  <div class=" text-center">Flower</div>
                  <div class="btn-group-vertical" role="group" aria-label="Artifact 1">
                    <button type="button" class="btn numberbtn" @click="a1 += 1">
                      ⌃
                    </button>
                    <input v-model="a1" class="numberinput text-center">
                    <button type="button" class="btn numberbtn" @click="a1 -= 1">
                      ⌄
                    </button>
                  </div>
                </div>

                <div class="numberinputlabel">
                  <div class=" text-center">Feather</div>
                  <div class="btn-group-vertical" role="group" aria-label="Artifact 2">
                    <button type="button" class="btn numberbtn" @click="a2 += 1">
                      ⌃
                    </button>
                    <input v-model="a2" class="numberinput text-center">
                    <button type="button" class="btn numberbtn" @click="a2 -= 1">
                      ⌄
                    </button>
                  </div>
                </div>

                <div class="numberinputlabel">
                  <div class=" text-center">Sands</div>
                  <div class="btn-group-vertical" role="group" aria-label="Artifact 3">
                    <button type="button" class="btn numberbtn" @click="a3 += 1">
                      ⌃
                    </button>
                    <input v-model="a3" class="numberinput text-center">
                    <button type="button" class="btn numberbtn" @click="a3 -= 1">
                      ⌄
                    </button>
                  </div>
                </div>

                <div class="numberinputlabel">
                  <div class=" text-center">Goblet</div>
                  <div class="btn-group-vertical" role="group" aria-label="Artifact 4">
                    <button type="button" class="btn numberbtn" @click="a4 += 1">
                      ⌃
                    </button>
                    <input v-model="a4" class="numberinput text-center">
                    <button type="button" class="btn numberbtn" @click="a4 -= 1">
                      ⌄
                    </button>
                  </div>
                </div>

                <div class="numberinputlabel">
                  <div class=" text-center">Circlet</div>
                  <div class="btn-group-vertical" role="group" aria-label="Artifact 5">
                    <button type="button" class="btn numberbtn" @click="a5 += 1">
                      ⌃
                    </button>
                    <input v-model="a5" class="numberinput text-center">
                    <button type="button" class="btn numberbtn" @click="a5 -= 1">
                      ⌄
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="row charImg">
          <div class="col-3 modalcard">
            <div class="card">
              <div class="card-body">
                <img :src="propItemImageDict['Mora']?.images" class="card-img-top">
                  {{ formatNumberInK(char.costs.mora) }}
                  <span class="fw-bold" :class="getRarity('Mora')">
                  Mora
                  </span>
              </div>
            </div>
          </div>

          <div class="col-3 modalcard" v-for="(item, index) in char.costs.book" :key="index">
            <div class="card">
              <div class="card-body">
                <img :src="propItemImageDict[item.name]?.images" class="card-img-top">
                  {{ item.count }}
                  <span class="fw-bold" :class="getRarity(item.name)">
                    {{ item.name }}
                  </span>
              </div>
            </div>
          </div>

          <div class="col-3 modalcard" v-for="(item, index) in char.costs.mat" :key="index">
            <div class="card">
              <div class="card-body">
                <img :src="propItemImageDict[item.name]?.images" class="card-img-top">
                  {{ item.count }}
                  <span class="fw-bold" :class="getRarity(item.name)">
                    {{ item.name }}
                  </span>
              </div>
            </div>
          </div>

          <div class="col-3 modalcard" v-for="(item, index) in char.costs.boss" :key="index">
            <div class="card">
              <div class="card-body">
                <img :src="propItemImageDict[item.name]?.images" class="card-img-top">
                  {{ item.count }}
                  <span class="fw-bold" :class="getRarity(item.name)">
                    {{ item.name }}
                  </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer text-center">
        <button class="btn btn-secondary" v-if="!confirm" @click="confirm = true">Delete</button>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button class="btn btn-danger" v-if="confirm" @click="deleteChar(char.name)">Confirm delete?</button>
          <button class="btn btn-secondary" v-if="confirm" @click="confirm = false">Cancel</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
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
    },
    propItemImageDict: {
      required: true,
      type: Object
    },
  },
  emits: ['update:propShowCharPopUp','refreshChars'],
  data() {
    return {
      artflower: 0,
      artfeather: 0,
      artsands: 0,
      artcup: 0,
      arthat: 0,
      confirm: false,
      artifacts: [],
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
    talent2: {
      get() {
        return this.char.talent2
      },
      set(value) {
        this.updateCharacter(2,value)
      }
    },
    talent3: {
      get() {
        return this.char.talent3
      },
      set(value) {
        this.updateCharacter(3,value)
      }
    },
    a1: {
      get() {
        return this.char.a1
      },
      set(value) {
        this.updateCharacter(4,value)
      }
    },
    a2: {
      get() {
        return this.char.a2
      },
      set(value) {
        this.updateCharacter(5,value)
      }
    },
    a3: {
      get() {
        return this.char.a3
      },
      set(value) {
        this.updateCharacter(6,value)
      }
    },
    a4: {
      get() {
        return this.char.a4
      },
      set(value) {
        this.updateCharacter(7,value)
      }
    },
    a5: {
      get() {
        return this.char.a5
      },
      set(value) {
        this.updateCharacter(8,value)
      }
    }, 
    set1: {
      get() {
        return this.char.set1
      },
      set(value) {
        this.updateCharacter(9,value)
      }
    },
    set2: {
      get() {
        return this.char.set2
      },
      set(value) {
        this.updateCharacter(10,value)
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
    getImage(name) {
      return this.propItemImageDict[name]?.images
    },
    getRarity(name) {
      switch(parseInt(this.propItemImageDict[name]?.rarity)) {
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
    onClose() {
      this.showCharPopUp = false
      this.confirm = false
    },
    imageUrlAlt(event, alturl) {
      event.target.src = alturl
    },
    async updateCharacter(talent,input){
      let isUpdated = false
      let ch = this.char
      let value = parseInt(input)
      if(!isNaN(value)) {
        switch(parseInt(talent)){
          case 1:
            if(value >0 && value <=10) {
              ch.talent1 = value
              isUpdated = true
            }
            break;
          case 2:
            if(value >0 && value <=10) {
              ch.talent2 = value
              isUpdated = true
            }
            break;
          case 3:
            if(value >0 && value <=10) {
              ch.talent3 = value
              isUpdated = true
            }
            break;
          case 4:
            ch.a1 = value
            isUpdated = true
            break;
          case 5:
            ch.a2 = value
            isUpdated = true
            break;
          case 6:
            ch.a3 = value
            isUpdated = true
            break;
          case 7:
            ch.a4 = value
            isUpdated = true
            break;
          case 8:
            ch.a5 = value
            isUpdated = true
            break;
          default:
            console.log('Talent not changed')
            break;
        }
      }
      else {
        switch(parseInt(talent)){
          case 9:
            // Check is valid artifact name
            for (const key in this.artifacts) {
              if (Object.hasOwnProperty.call(this.artifacts, key)) {
                const element = this.artifacts[key];
                if(element == input) {
                  ch.set1 = input
                  isUpdated = true
                }
              }
            }
            break;
          case 10:
            // Check is valid artifact name
            for (const key in this.artifacts) {
              if (Object.hasOwnProperty.call(this.artifacts, key)) {
                const element = this.artifacts[key];
                if(element == input) {
                  ch.set2 = input
                  isUpdated = true
                }
              }
            }
            break;
          default:
            console.log('Talent not changed')
            break;
        }
      }
      
      if(isUpdated) {
        const response = await window.api.databaseUpdateCharacter(structuredClone(ch))
        if(response) {
          // initiate event to reload char table
          console.log('Updated '+ this.char.name +' talent '+talent +' to '+ input)
          this.$emit('refreshChars', this.char.name)
        }
      }
    },
    async deleteChar(name) {
      await window.api.databaseDeleteCharacter(name)
      location.reload()
    }
  },
  async created() {
    const response = await window.api.getAllArtifacts()
    this.artifacts = JSON.parse(response)
  }
}
</script>

<style scoped>
.modal1 {
  position: fixed;
  z-index: 999;
  top: 10%;
  left: 50%;
  margin-left: -150px;
  overflow: auto;
  width: 50em;
  max-height: 90%;
}

.modal-backdrop {
  position: absolute;
  top: 0;
  right: -100px;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: 0.4;
  z-index: 998;
  overflow:visible;
  height : 400%;
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
.iconimg {
  height: 3em
}
.numberinput {
  width: 4em
}
.numberinputlabel {
  width: 5.5em
}
.numberbtn {
  padding: 0;
}
.charImg{
  width: 100%;
  margin: 10px;
}
.modalcard{
  padding: 3px;
}
.artifactcard{
  margin-top: 5px;
}
</style>