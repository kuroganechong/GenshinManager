<template>
    <Teleport to="body">
        <div v-if="showCharPopUp" class="card modal1" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{{ propCharData.name }}</h5>
            <p class="card-text">{{ propCharData.description }}</p>
            <button type="button" class="btn btn-secondary" @click="showCharPopUp = false">Close</button>
          </div>
        </div>
    </Teleport>
</template>

<script>
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
    }
  },
  computed: {
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
  },
}
</script>

<style scoped>
.modal1 {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>