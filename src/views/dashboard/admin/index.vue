<template>
  <div class="dashboard-editor-container">
    <video-background
      src="/bgvideo.mp4"
      style="max-height: 900px; height: 100vh;"
    >
      <panel-group />
    </video-background>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import VideoBackground from 'vue-responsive-video-background-player'

export default {
  name: 'UserDashboard',
  components: {
    PanelGroup,
    VideoBackground
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 3px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
