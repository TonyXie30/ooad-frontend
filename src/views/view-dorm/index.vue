<template>
  <div class="dorm-map">
    <img src="https://www.sustech.edu.cn/uploads/images/2022/09/27102859_86185.jpg" alt="Dorm Map" class="map-image">
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
        <div class="info">
          <div>{{ zone.description }}</div>
          <div>
            Room numbers:
            <count-to :start-val="0" :end-val="zone.num" :duration="1000" class="card-panel-num" />
          </div>
        </div>
        <router-link :to="{ name: 'ViewDormInZone', params: { zoneName: zone.name }}">
          <el-button @click="enterZone(zone.id)">
            Enter
          </el-button>
        </router-link>
      </div>

    </div>

  </div>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  name: 'MapView',
  components: {
    CountTo
  },
  data() {
    return {
      zones: [
        { id: 1, name: '湖畔', description: 'Room type: Double', num: 51, x: '37%', y: '35%', hovering: false },
        { id: 2, name: '二期', description: 'Room type: Quadruple', num: 244, x: '43%', y: '27%', hovering: false },
        { id: 3, name: '荔园', description: 'Room type: Triple', num: 42, x: '44%', y: '19%', hovering: false },
        { id: 4, name: '欣园', description: 'Room type: Single', num: 107, x: '52%', y: '14%', hovering: false }
      ]
    }
  },
  methods: {
    enterZone(zoneId) {
      // Implement the logic to navigate to the specific zone page
      console.log('Entering zone:', zoneId)
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
  width: 100%;
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
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 250px;
  z-index: 2;
}

.info {
  margin: 0;
  color: black; /* Explicit text color */
  background-color: lightblue; /* High contrast background */
  font-size: 16px; /* Ensure readable font size */
}

.preview-page button {
  color: white;
  background-color: #3A71A8;
  margin-top: 10px;
}
</style>
