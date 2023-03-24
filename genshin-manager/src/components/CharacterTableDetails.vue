<template>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        Details
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
        <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">N</th>
                <th scope="col">E</th>
                <th scope="col">Q</th>
                <!--<th scope="col">Mora</th>
                <th scope="col">Books</th>
                <th scope="col">Mat</th>
                <th scope="col">Boss</th>-->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(char, index) in chars" :key="index">
                <td><button @click="launchCharacterModal(index)">{{ char.name }}</button></td>
                <td>{{ char.talent1 }}</td>
                <td>{{ char.talent2 }}</td>
                <td>{{ char.talent3 }}</td>
                <!--<td>{{ formatNumberInK(char.costs.mora) }}</td>
                <td>
                  <li v-for="(item, index) in char.costs.book" :key="index">
                    {{ item.count }} {{ item.name }}
                  </li>
                </td>
                <td>
                  <li v-for="(item, index) in char.costs.mat" :key="index">
                    {{ item.count }} {{ item.name }}
                  </li>
                </td>
                <td>
                  <li v-for="(item, index) in char.costs.boss" :key="index">
                    {{ item.count }} {{ item.name }}
                  </li>
                </td>-->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <CharacterModal v-model:propShowCharPopUp="isShownCharacterModal" :propCharData="characterData"/>
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
  },
  data() {
    return {
      isShownCharacterModal: false,
      characterData: {}
    }
  },
  emits: ['update:propChars'],
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
    }
  },
  async created() {
    const response = await window.api.databaseGetAllCharacter()
    const data = JSON.parse(response)
    for (let char of data) {
      const talent_response = await (async (name) => {
          let response
          response = await window.api.findCharTalentByName(name)
          return JSON.parse(response)
        })(char.name);
      let talent_costs = talent_response.costs
      char.costs = Utils.calculateTalentCosts(char.talent1, char.talent2, char.talent3, structuredClone(talent_costs))
    }
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
}</style>