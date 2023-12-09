<template>
  <div class="comments-section">
    <el-card v-for="comment in comments" :key="comment.id" class="comment-card">
      <div class="comment-content">
        <p>{{ comment.text }}</p>
        <small>{{ comment.dateTime }}</small> <!-- Display date and time -->
      </div>
    </el-card>
    <!-- Add Comment Form -->
    <el-input
      v-model="newComment"
      type="textarea"
      placeholder="Add a comment..."
      class="comment-input"
    />
    <div class="submit-button">
      <el-button type="primary" @click="submitComment">Submit Comment</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  data() {
    return {
      comments: [], // Placeholder for comments data
      newComment: '' // Model for the new comment input
    }
  },
  methods: {
    submitComment() {
      if (this.newComment.trim()) {
        const now = new Date()
        const dateTime = now.toLocaleString() // Get current date and time

        this.comments.push({
          id: this.comments.length + 1,
          text: this.newComment,
          dateTime: dateTime // Add date and time to the comment
        })
        this.newComment = '' // Reset the input after submission
      }
    }
  }
}
</script>

<style>
.comments-section {
  margin: auto;
}

.comment-content {
  font-size: 15px; /* Reduced from 20px to 16px */
}

.comment-card {
  width: 80%;
  margin: 10px;
  padding: 10px;
  background-color: cornsilk;
}

.comment-input {
  margin-top: 10px;
  margin-bottom: 10px;
}

.submit-button {
  text-align: center;
  display: block;
}
</style>
