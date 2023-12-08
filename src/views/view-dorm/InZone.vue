<template>
  <div class="dropdown-container">
    <div class="eq-dorm-image">
      <img :src="imgLink" alt="Zone Image">
    </div>

    <el-form label-position="top" class="form-flex-container">
      <el-form-item label="Block:" class="form-item-flex">
        <el-select v-model="selectedInfo.selectedBuilding" placeholder="Select a block" @change="updateFloors">
          <el-option v-for="building in buildings" :key="building" :label="building" :value="building" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="selectedInfo.selectedBuilding" label="Floor:" class="form-item-flex">
        <el-select v-model="selectedInfo.selectedFloor" placeholder="Select a floor" @change="updateRooms">
          <el-option v-for="floor in availableFloors" :key="floor" :label="floor" :value="floor" />
        </el-select>
      </el-form-item>

      <el-form-item label="Room:" class="form-item-flex">
        <el-select v-model="selectedInfo.selectedRoom" placeholder="Select a room">
          <el-option v-for="room in availableRooms" :key="room" :label="room" :value="room" />
        </el-select>
      </el-form-item>
    </el-form>

    <div class="enter-button">
      <router-link :to="{ name: 'RoomPage', params: { roomInfo: selectedInfo }}">
        <el-button>
          Enter
        </el-button>
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedInfo: {
        zoneId: null,
        selectedBuilding: null,
        selectedFloor: null,
        selectedRoom: null
      },
      imgLink: null,
      buildings: null,
      availableFloors: [],
      availableRooms: []
    }
  },
  created() {
    // watch 路由的参数，以便再次获取数据
    this.$watch(
      () => this.$route.params,
      () => {
        this.getParams()
      },
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      { immediate: true }
    )
  },
  mounted() {
    this.selectedInfo.selectedBuilding = this.buildings[0]
    this.updateFloors()
  },
  methods: {
    getParams() {
      const zoneId = this.$route.params.zoneId
      this.selectedInfo.zoneId = zoneId
      if (zoneId === 1) {
        this.buildings = [1, 2, 3]
        this.imgLink = 'https://mirrors.sustech.edu.cn/site/sustech-online/img/facility/buildings/zhiren-college.jpg'
      } else if (zoneId === 2) {
        this.buildings = [11, 14, 16]
        this.imgLink = 'https://mirrors.sustech.edu.cn/site/sustech-online/img/facility/buildings/p2-dormitory.jpg'
      } else if (zoneId === 3) {
        this.buildings = [6, 7, 8]
        this.imgLink = 'https://mirrors.sustech.edu.cn/site/sustech-online/img/facility/buildings/liyuan-gate.jpg'
      } else {
        this.buildings = [9, 10]
        this.imgLink = 'https://mirrors.sustech.edu.cn/site/sustech-online/img/facility/buildings/liyuan-huiyuann-xinyuan.jpg'
      }
    },
    updateFloors() {
      this.availableFloors = [6, 7, 8]
      this.selectedInfo.selectedFloor = null // Reset floor and room when building changes
      this.selectedInfo.selectedRoom = null
      this.availableRooms = null
    },
    updateRooms() {
      this.availableRooms = [`${this.selectedInfo.selectedFloor}01`, `${this.selectedInfo.selectedFloor}02`, `${this.selectedInfo.selectedFloor}03`]
    }
  }
}
</script>

<style>
.dropdown-container {
  max-width: 1000px; /* Adjusted for better spacing */
  margin: auto;
}

.eq-dorm-image {
  text-align: center;
  display: block;
}

.eq-dorm-image img {
  width: 100%; /* Corrected for appropriate sizing */
  height: auto;
}

.form-flex-container {
  display: flex;
  justify-content: space-between; /* This will space out the dropdowns evenly */
}

.form-item-flex {
  flex: 1; /* Each form item will take equal space */
  margin: 0 10px; /* Added some margin for spacing */
}

.enter-button {
  font-size: 5px;
  text-align: center;
  margin: 20px;
}
</style>
