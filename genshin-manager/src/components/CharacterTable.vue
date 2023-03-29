<template>
  <div class="accordion accordion-flush" id="characterTable">
    <div class="btn-group" role="group">
      <button class="accordion-button collapsed tabs" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        Summary&nbsp;
      </button>
      <button class="accordion-button collapsed tabs" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        Details&nbsp;
      </button>
    </div>
    <CharacterTableSummary v-model:propItemImageDict="itemImageDict" :propChars="chars"/>
    <CharacterTableDetails v-model:propChars="chars" :propItemImageDict="itemImageDict"/>
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
  props: {
    propItemImageDict: {
      required: true,
      type: Object
    },
    propChars: {
      required: true,
      type: Object
    }
  },
  emits: ['update:propItemImageDict','update:propChars'],
  data() {
    return {
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
