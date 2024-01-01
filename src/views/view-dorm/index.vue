<template>
  <div class="dorm-map">
    <img src="/map.jpg" alt="Dorm Map" class="map-image">
    <div
      v-for="zone in zones"
      :key="zone.id"
      class="zone-point"
      :style="{ top: zone.y, left: zone.x }"
      @mouseover="zone.hovering = true"
      @mouseleave="zone.hovering = false"
    >
      {{ zone.name }}
      <div v-if="zone.hovering" class="preview-page">
        <img :src="getImage(zone.name)" alt="" class="dorm-image">
        <router-link :to="{ name: 'ViewDormInZone', params: { zoneName: zone.name }}">
          <el-button>
            Enter
          </el-button>
        </router-link>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'MapView',
  data() {
    return {
      zones: [
        { id: 1, name: '湖畔', num: 51, x: '37%', y: '35%', hovering: false },
        { id: 2, name: '二期', num: 244, x: '43%', y: '27%', hovering: false },
        { id: 3, name: '荔园', num: 42, x: '44%', y: '19%', hovering: false },
        { id: 4, name: '欣园', num: 107, x: '52%', y: '14%', hovering: false }
      ]
    }
  },
  methods: {
    getImage(zoneName) {
      switch (zoneName) {
        case '湖畔':
          return '/hp-dorm.png'
        case '二期':
          return '/erqi-dorm.png'
        case '荔园':
          return '/liyuan-dorm.png'
        default:
          return '/dorm.png'
      }
    }
  }
}
</script>

<style scoped>
.dorm-map {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 100vh; /* Use the full height of the viewport */
  width: 100%; /* Ensure the .dorm-map is full width */
}
.map-image {
  width: 95%;
  height: auto;
}
.zone-point {
  position: absolute;
  width: 70px;
  height: auto;
  background-color: blueviolet;
  border-radius: 20%;
  color: white;
  text-align: center;
  line-height: 30px;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.preview-page {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: lightblue;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 250px;
  z-index: 2;
}

.dorm-image {
  width: 90%;
  padding: 5px;
  margin: auto;
}

.preview-page button {
  color: white;
  background-color: #3A71A8;
}
</style>
