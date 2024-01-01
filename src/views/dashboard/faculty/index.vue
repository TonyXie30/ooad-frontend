<template>
  <div class="dashboard-editor-container">
    <panel-group />
  </div>
</template>

<script>
import PanelGroup from './components/FacultyPanelGroup.vue'

export default {
  name: 'AdminDashboard',
  components: {
    PanelGroup
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  background-image: url('/admin.png');
  background-size: cover; /* Cover the entire screen */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Prevent image repetition */
  min-height: 100vh; /* Minimum height to 100% of the viewport height */
  width: 100vw; /* Width to 100% of the viewport width */
}
</style>

