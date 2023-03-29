<template>
  <Teleport to="body">
    <div v-if="showAddPopUp" class="modal-backdrop" @click="onClose"></div>
  </Teleport>
  <Teleport to="body">
    <div v-if="showAddPopUp" class="card modal1">
      <div class="card-header">
          <button type="button" class="btn-close" aria-label="Close" @click="onClose"></button>
        </div>
        
        <div class="card-body">
          <label for="exampleDataList" class="form-label">Character Name</label>
          <input class="form-control text-center" list="characterOptions" id="addNewCharInput" placeholder="Type to search..." v-model="search">
          <datalist id="characterOptions">
            <option v-for="(item, index) in names" :value="item" :key="index"></option>
          </datalist>
        </div>

        <div class="card-footer text-center">
          <button class="btn btn-primary" @click="addChar()">Submit</button>
        </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: 'AddNewCharacter',
  components: {
  },
  props: {
    propIsShownNewCharacterForm: {
      required: true,
      type: Object
    }
  },
  emits: ['update:propItemImageDict','update:propChars'],
  data() {
    return {
      names: [],
      search: ""
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
    chars: {
      get() {
        return this.propChars
      },
      set(value) {
        this.$emit('update:propChars', value)
      }
    },
    showAddPopUp: {
      get() {
        return this.propIsShownNewCharacterForm
      },
      set(value) {
        this.$emit('update:propIsShownNewCharacterForm', value)
      }
    }
  },
  methods: {
    onClose() {
      this.showAddPopUp = false
    },
    async addChar() {
      // Get accurate name
      const response = await window.api.findCharTalentByName(this.search)
      if(response){
        const data = JSON.parse(response)

        let newChar = {
          name: data.name,
          talent1: 1,
          talent2: 1,
          talent3: 1,
          a1: 1,
          a2: 1,
          a3: 1,
          a4: 1,
          a5: 1,
          mainsands: 1,
          maincirclet: 1,
          maingoblet: 1,
          set1: "Adventurer",
          set2: ""
        }
        
        const putresponse = await window.api.databasePutNewCharacter(newChar)
        if(putresponse) location.reload()
      }
    }
  },
  async created() {
    const response = await window.api.getAllCharacterNames()
    const data = JSON.parse(response)
    this.names = data
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.modal1 {
  position: fixed;
  z-index: 999;
  top: 10%;
  left: 50%;
  margin-left: -150px;
  overflow: auto;
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
  margin-top: 5px
}
</style>
