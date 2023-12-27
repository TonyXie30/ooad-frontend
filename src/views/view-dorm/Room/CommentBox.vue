<template>
  <div class="new-comment">
    <h3>Add a Comment</h3>
    <textarea v-model="newCommentText" placeholder="Write your comment here..." />
    <el-button type="success" @click="submitNewComment">Submit</el-button>
  </div>
</template>

<script>
export default {
  name: 'CommentBox',
  data() {
    return {
      newCommentText: ''
    }
  },
  methods: {
    submitNewComment() {
      if (!this.newCommentText.trim()) {
        // Optionally handle empty input case
        return
      }
      // Emit an event with the new comment data
      this.$emit('submit-comment', this.newCommentText)
      // Reset the text area
      this.newCommentText = ''
    }
  }
}
</script>

<style scoped>
.new-comment {
  width: 800px;
  margin-left: 300px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
  border: 1px solid #eaeaea;
  opacity: 0.9;
}

.new-comment h3 {
  margin-bottom: 10px;
}

.new-comment textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  resize: vertical; /* Allow vertical resizing */
  box-sizing: border-box; /* Include padding and border in the width */
  min-height: 80px; /* Minimum height */
}

/* Clear float */
.new-comment::after {
  content: "";
  display: table;
  clear: both;
}
</style>
