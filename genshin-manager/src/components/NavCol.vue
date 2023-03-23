<template>
    <nav
      id="sidebarMenu"
      class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div class="position-sticky pt-3 sidebar-sticky">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              <span class="align-text-bottom"></span>
              Talents
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span class="align-text-bottom"></span>
              Artifacts
            </a>
          </li>
        </ul>

        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase"
        >
          <span>Others</span>
          <a class="link-secondary" href="#" aria-label="Add a new report">
            <span
              data-feather="plus-circle"
              class="align-text-bottom"
            ></span>
          </a>
        </h6>
      </div>
    </nav>
</template>

<script>

export default {
  name: 'NavCol',
  data() {
    return {
    }
  },
  computed: {}}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
