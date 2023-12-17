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
import { findBuilding, findFloor, findRoom } from '@/api/dormitory'
export default {
  name: 'ViewDormInZone',
  data() {
    return {
      selectedInfo: {
        zoneName: null,
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
  async created() {
    await this.getParams()
  },
  methods: {
    async getParams() {
      this.selectedInfo.zoneName = this.$route.params.zoneName
      const response = await findBuilding(this.selectedInfo.zoneName)
      this.buildings = response.data.map(Number)
      this.selectedInfo.selectedBuilding = this.buildings[0]
      await this.updateFloors()
      if (this.selectedInfo.zoneName === '湖畔') {
        this.imgLink = 'https://mirrors.sustech.edu.cn/site/sustech-online/img/facility/buildings/zhiren-college.jpg'
      } else if (this.selectedInfo.zoneName === '二期') {
        this.imgLink = 'https://mirrors.sustech.edu.cn/site/sustech-online/img/facility/buildings/p2-dormitory.jpg'
      } else if (this.selectedInfo.zoneName === '荔园') {
        this.imgLink = 'https://mirrors.sustech.edu.cn/site/sustech-online/img/facility/buildings/liyuan-gate.jpg'
      } else {
        this.imgLink = 'https://mirrors.sustech.edu.cn/site/sustech-online/img/facility/buildings/liyuan-huiyuann-xinyuan.jpg'
      }
    },
    async updateFloors() {
      const response = await findFloor(this.selectedInfo.zoneName, this.selectedInfo.selectedBuilding)
      this.availableFloors = response.data.map(Number)
      this.selectedInfo.selectedFloor = null // Reset floor and room when building changes
      this.selectedInfo.selectedRoom = null
      this.availableRooms = null
    },
    async updateRooms() {
      const response = await findRoom(this.selectedInfo.selectedFloor, this.selectedInfo.selectedBuilding, this.selectedInfo.zoneName)
      const rooms = []
      for (let i = 0; i < response.data.content.length; i++) {
        rooms.push(response.data.content[i].houseNum)
      }
      this.availableRooms = rooms
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
