<template>
  <div class="comments-section">
    <el-card v-for="comment in comments" :key="comment.id" class="comment-card">
      <div class="comment-content">
        <p>{{ comment.text }}</p>
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
  data() {
    return {
      comments: [], // Placeholder for comments data
      newComment: '' // Model for the new comment input
    }
  },
  methods: {
    submitComment() {
      // Logic to submit the new comment
      // For example, push the new comment to the comments array
      if (this.newComment.trim()) {
        this.comments.push({
          id: this.comments.length + 1,
          text: this.newComment
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
  font-size: 20px;
}

.comment-card {
  margin-bottom: 10px;
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
