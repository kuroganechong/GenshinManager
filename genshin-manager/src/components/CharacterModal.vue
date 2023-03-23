<template>
    <button @click="openmodal">{{ open }}</button>

    <Teleport to="body">
        <div v-if="!open" class="modal" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
            <button @click="open = false">{{ open }}</button>
        </div>
    </Teleport>
</template>

<script>
export default {
  data() {
    return {
      open: false
    }
  },
  methods: {
    openmodal: function (){
        window.api.showModal("myModal")
        this.open = true
    }
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