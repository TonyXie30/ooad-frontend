<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header">
        <a class="link-type link-title" target="_blank">
          Room Exchange
        </a>
      </div>
      <div>
        Room Id:
        <el-input
          v-model="roomData.id"
          placeholder="Room Id"
          type="text"
          class="input_form"
        />
      </div>
      <br><br>
      <div>
        Room Location:
        <el-input
          v-model="roomData.location"
          placeholder="Room Location"
          type="text"
          class="input_form"
        />
      </div>
      <br><br>
      <div>
        Room Building:
        <el-input
          v-model="roomData.building"
          placeholder="Room Building"
          type="text"
          class="input_form"
        />
      </div>
      <br><br>
      <div>
        Room Floor:
        <el-input
          v-model="roomData.floor"
          placeholder="Room Floor"
          type="text"
          class="input_form"
        />
      </div>
      <br><br>
      <div>
        Room Owner:
        <el-input
          v-model="roomData.owner"
          placeholder="Room Owner"
          type="text"
          class="input_form"
        />
      </div>
      <br><br>
      <el-button type="primary" class="button_form" @click.native.prevent="queryAvailability">
        Query availability
      </el-button>
      <el-button type="primary" class="button_form" @click.native.prevent="submitRequest">
        Submit Request
      </el-button>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'Theme',
  data() {
    return {
      roomData: {
        id: null,
        location: null,
        building: null,
        floor: null,
        owner: null
      }
    }
  },
  methods: {
    queryAvailability() {
      // this.$notify({
      //   title: 'Success',
      //   message: 'Object available',
      //   type: 'success',
      //   duration: 2000
      // })
      this.$notify({
        title: 'Waiting',
        message: 'Waiting for the response',
        type: 'info',
        duration: 2000
      })
    },
    submitRequest() {
      this.$notify({
        title: 'Success',
        message: 'Request submitted',
        type: 'success',
        duration: 2000
      })
    }
  }
}
</script>

<style scoped>

.box-card {
  width: 100%;
  max-width: 100%;
  height: 800px;
  margin: 20px auto;
}
.input_form {
  width: 30%;
  left: 13%;
  position: absolute;
}
.button_form{
  width: 15%;
}

</style>
