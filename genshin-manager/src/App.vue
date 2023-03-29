<template>
  <HeaderBar :propItemImageDict="itemImageDict" :propChars="chars"/>
  <NavCol v-model:propIsShownTalent="isShownTalent" v-model:propIsShownArtifact="isShownArtifact"/>
  <div class="container-fluid" :class="{'myplaceholder': isReady}" >
    <div class="row">
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
        >
          <h1 class="h2">Loading...first setup may take longer</h1>
        </div>
        <div class="card" aria-hidden="true">
          <div class="card-body">
            <h5 class="card-title placeholder-glow">
              <span class="placeholder col-6"></span>
            </h5>
            <p class="card-text placeholder-glow">
              <span class="placeholder col-7"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-6"></span>
              <span class="placeholder col-8"></span>
            </p>
            <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
          </div>
        </div>
      </main>
    </div>
  </div>

  <div class="container-fluid" :class="{'hidden': !isReady}" v-if="isShownTalent">
    <div class="row">
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
        >
          <h1 class="h2">Talents Level</h1>
          <div class="btn-toolbar mb-2 mb-md-0">
            <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle" @click="isShownNewCharacterForm = true">
              Add New
            </button>
          </div>
        </div>
        <CharacterTable v-model:propChars="chars" v-model:propItemImageDict="itemImageDict"/>        
      </main>
    </div>
  </div>

  <div class="container-fluid" v-if="isShownArtifact">
    <div class="row">

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
        >
          <h1 class="h2">Artifacts</h1>
        </div>
        
        <ArtifactTableDetails v-model:propChars="chars" v-model:propItemImageDict="itemImageDict"/>   
      </main>
    </div>
  </div>
  <AddNewCharacter v-model:propIsShownNewCharacterForm="isShownNewCharacterForm"/>
</template>

<script>
import CharacterTable from './components/CharacterTable.vue'
import ArtifactTableDetails from './components/ArtifactTableDetails.vue'
import HeaderBar from './components/HeaderBar.vue'
import NavCol from './components/NavCol.vue'
import AddNewCharacter from './components/AddNewCharacter.vue'

export default {
  name: 'App',
  components: {
    CharacterTable,
    HeaderBar,
    NavCol,
    ArtifactTableDetails,
    AddNewCharacter
  },
  data() {
    return {
      itemImageDict: {
        // Placeholder structure
        'scroll': {
          sortorder: 1,
          images: 'https://link',
          rarity: 3,
          source: 'Dropped by ....'
        }
      },
      chars: {},
      isShownTalent: true,
      isShownArtifact: false,
      isShownNewCharacterForm: false,
      isReady: false
    }
  },
  watch: {
    itemImageDict() {
      this.isReady = true
    }
  }
}

</script>

<style>
.hidden{
  visibility: hidden!important;
}
.myplaceholder {
  display: none!important;
}
</style>
