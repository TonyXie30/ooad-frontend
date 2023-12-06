<template>
  <div class="room-container">
    <el-card class="box-card">
      <div class="text item">
        Block: {{ room.block }}
      </div>
      <div class="text item">
        Room Number: {{ room.number }}
      </div>
      <div class="text item">
        Room ID: {{ room.id }}
      </div>
      <div class="text item">
        Room Type: {{ room.type }}
      </div>
      <el-button type="primary" @click="previewRoom">Preview Room</el-button>
      <el-button type="success" @click="bookmarkRoom">Bookmark Room</el-button>
    </el-card>

    <el-dialog
      title="Room Preview"
      :visible.sync="isPreviewVisible"
      width="30%"
      @close="closePreview"
    >
      <img src="https://sustech.online/assets/interior-KIYZNKgg.jpg" alt="Room Preview" class="room-preview-img">
    </el-dialog>

    <Comment />
  </div>
</template>

<script>
import Comment from './Comment.vue'
export default {
  components: {
    Comment
  },
  data() {
    return {
      room: {
        block: '',
        number: '',
        id: '123456',
        type: 'Double'
      },
      isPreviewVisible: false
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
  methods: {
    getParams() {
      const roomInfo = this.$route.params.roomInfo
      this.room.block = roomInfo.selectedBuilding
      this.room.number = roomInfo.selectedRoom
    },
    previewRoom() {
      this.isPreviewVisible = true
    },
    closePreview() {
      this.isPreviewVisible = false
    },
    bookmarkRoom() {
      // Logic to add the room to bookmarks
      alert('Room bookmarked!')
    }
  }
}
</script>

<style>
.room-container {
  max-width: 600px;
  margin: auto;
}

.box-card {
  width: 400px;
  height: auto;
  margin-bottom: 20px;
}

.text.item {
  margin-bottom: 10px;
}

.room-preview-img {
  max-width: 100%;
  max-height: 500px; /* You can adjust this value as needed */
  display: block; /* Removes any extra space below the image */
  margin: auto; /* Centers the image if it's not as wide as the dialog */
}
</style>

