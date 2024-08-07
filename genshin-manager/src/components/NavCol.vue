<template>
    <nav
      id="sidebarMenu"
      class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div class="position-sticky pt-3 sidebar-sticky">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link" :class="{active: isShownTalent}" aria-current="page" href="#" @click="enableTalent()">
              <span class="align-text-bottom"></span>
              Talents
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{active: isShownArtifact}" href="#" @click="enableArtifact()">
              <span class="align-text-bottom"></span>
              Artifacts
            </a>
          </li>
        </ul>

      </div>
    </nav>
</template>

<script>

export default {
  name: 'NavCol',
  props: {
    propIsShownTalent: {
      required: true,
      type: Boolean
    },
    propIsShownArtifact: {
      required: true,
      type: Boolean
    },
  },
  data() {
    return {
    }
  },
  emits: ['update:propIsShownTalent','update:propIsShownArtifact'],
  computed: {
    isShownTalent: {
      get() {
        return this.propIsShownTalent
      },
      set(value) {
        this.$emit('update:propIsShownTalent', value)
      }
    },
    isShownArtifact: {
      get() {
        return this.propIsShownArtifact
      },
      set(value) {
        this.$emit('update:propIsShownArtifact', value)
      }
    },
  },
  methods: {
    enableTalent() {
      this.isShownTalent = true
      this.isShownArtifact = false
    },
    enableArtifact() {
      this.isShownTalent = false
      this.isShownArtifact = true
    }
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
