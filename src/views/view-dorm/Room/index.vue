<template>
  <div class="room-container">
    <el-card class="box-card">
      <div class="text item">
        Zone: {{ room.zone }}
      </div>
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
    <comment
      v-for="(comment, index) in comments"
      :key="index"
      :comment="comment"
      @delete-comment="handleDeleteComment"
    />
    <comment-box @submit-comment="handleNewComment" />
  </div>
</template>

<script>
import Comment from './Comment.vue'
import CommentBox from '@/views/view-dorm/Room/CommentBox.vue'
import { findDorm, addBookmark, addParentComment, deleteComment, getCommentTree } from '@/api/dormitory'
export default {
  name: 'RoomPage',
  components: {
    Comment,
    CommentBox
  },
  data() {
    return {
      room: {
        zone: '',
        block: '',
        number: '',
        id: '',
        type: ''
      },
      comments: [],
      isPreviewVisible: false
    }
  },
  computed: {
    roomFloor: function() {
      return Math.floor(this.room.number / 100)
    },
    userName: function() {
      return this.$store.getters.name
    }
  },
  async created() {
    await this.getParams()
    await this.getAllComments()
  },
  methods: {
    async getParams() {
      const roomInfo = this.$route.params.roomInfo
      this.room.zone = roomInfo.zoneName
      this.room.block = roomInfo.selectedBuilding
      this.room.number = roomInfo.selectedRoom

      const response = await findDorm(this.room.number, this.roomFloor, this.room.block, this.room.zone)
      this.room.id = response.data.content[0].id
      const bedNum = response.data.content[0].bed
      if (bedNum === 1) {
        this.room.type = 'Single'
      } else if (bedNum === 2) {
        this.room.type = 'Double'
      } else if (bedNum === 3) {
        this.room.type = 'Triple'
      } else {
        this.room.type = 'Quadruple'
      }
    },
    previewRoom() {
      this.isPreviewVisible = true
    },
    closePreview() {
      this.isPreviewVisible = false
    },
    bookmarkRoom() {
      addBookmark(this.room.id, this.userName)
        .then(response => {
          // Check if the response has a property code and it's equal to 0
          if (response.code === 0) {
            this.$notify({
              title: 'Success',
              message: 'Add to bookmark successfully',
              type: 'success',
              duration: 2000
            })
          }
        })
    },
    async handleNewComment(newCommentText) {
      if (!newCommentText.trim()) return
      const response = await addParentComment(this.userName, this.room.id, newCommentText)
      const newComment = {
        parent_id: response.data.parent_id,
        id: response.data.comment_id,
        dormitory_id: this.room.id,
        author: this.userName,
        content: newCommentText,
        create_time: response.data.create_time,
        replies: []
      }
      this.comments.push(newComment)
    },
    async handleDeleteComment(id) {
      await deleteComment(id)
      this.comments = this.comments.filter(comment => comment.id !== id)
    },
    async getAllComments() {
      const response = await getCommentTree(this.room.id)
      this.comments = response.data
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
  margin-top: 30px;
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

