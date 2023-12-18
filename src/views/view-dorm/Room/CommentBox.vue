<template>
  <div class="new-comment">
    <h3>Add a Comment</h3>
    <textarea v-model="newCommentText" placeholder="Write your comment here..." />
    <button @click="submitNewComment">Submit</button>
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
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 8px;
  background-color: #f9f9f9;
  border: 1px solid #eaeaea;
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

.new-comment button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  float: right; /* Align the button to the right */
  box-shadow: 0 2px 4px rgba(0,0,0,0.2); /* Add a subtle shadow to the button */
}

.new-comment button:hover {
  background-color: #45a045; /* Slightly darker green on hover */
}

/* Clear float */
.new-comment::after {
  content: "";
  display: table;
  clear: both;
}
</style>
