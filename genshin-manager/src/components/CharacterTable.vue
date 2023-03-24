<template>
  <div class="accordion accordion-flush" id="accordionFlushExample">
    <CharacterTableSummary v-model:propItemImageDict="itemImageDict" :propChars="propChars"/>
    <CharacterTableDetails v-model:propChars="propChars"/>
  </div>
</template>

<script>

import CharacterTableSummary from './CharacterTableSummary.vue'
import CharacterTableDetails from './CharacterTableDetails.vue'

export default {
  name: 'CharacterTable',
  components: {
    CharacterTableSummary,
    CharacterTableDetails,
  },
  data() {
    return {
      propChars: [],
      itemImageDict: {
        'scroll': {
          images: 'https://link',
          rarity: 3,
          source: 'Dropped by ....'
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
