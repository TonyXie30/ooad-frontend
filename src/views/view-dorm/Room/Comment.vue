<template>
  <div class="comments-section">
    <el-card v-for="comment in comments" :key="comment.id" class="comment-card">
      <div class="comment-content">
        <p><strong>{{ comment.author }}</strong>: {{ comment.text }}</p>
        <small>{{ comment.dateTime }}</small>
        <el-button type="text" class="reply-button" @click="showReplyInput(comment.id)">Reply</el-button>
        <!-- Nested Comments -->
        <div v-if="comment.replies.length" class="nested-comments">
          <el-card v-for="reply in comment.replies" :key="reply.id" class="comment-card reply">
            <div class="comment-content">
              <p><strong>{{ reply.author }}</strong>: {{ reply.text }}</p>
              <small>{{ reply.dateTime }}</small>
            </div>
          </el-card>
        </div>
        <!-- Conditional Reply Form -->
        <div v-if="comment.showReplyForm">
          <el-input
            v-model="replyTexts[comment.id]"
            type="textarea"
            placeholder="Reply to this comment..."
            class="reply-input"
          />
          <div class="reply-submit-button">
            <el-button type="primary" @click="submitReply(comment.id)">Submit</el-button>
          </div>
        </div>
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
      <el-button type="primary" @click="submitComment">Submit</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  data() {
    return {
      comments: [],
      newComment: '',
      replyTexts: {}
    }
  },
  methods: {
    submitComment() {
      if (this.newComment.trim()) {
        const now = new Date()
        const dateTime = now.toLocaleString()

        this.comments.push({
          id: this.comments.length + 1,
          author: 'YourName', // Replace with dynamic author name
          text: this.newComment,
          dateTime: dateTime,
          replies: [],
          showReplyForm: false // New field to control visibility of reply form
        })
        this.newComment = ''
      }
    },
    submitReply(commentId) {
      const replyText = this.replyTexts[commentId]
      if (replyText && replyText.trim()) {
        const now = new Date()
        const dateTime = now.toLocaleString()

        const reply = {
          id: new Date().getTime(),
          author: 'YourName',
          text: replyText,
          dateTime: dateTime
        }

        const commentIndex = this.comments.findIndex(c => c.id === commentId)
        if (commentIndex !== -1) {
          this.comments[commentIndex].replies.push(reply)
          this.comments[commentIndex].showReplyForm = false // Hide the reply form after submission
        }

        this.replyTexts[commentId] = ''
      }
    },
    showReplyInput(commentId) {
      const commentIndex = this.comments.findIndex(c => c.id === commentId)
      if (commentIndex !== -1) {
        this.comments[commentIndex].showReplyForm = true // Show the reply form for this comment
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

.reply-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.reply-input {
  margin-top: 20px;
}

.comment-card {
  position: relative;
  width: 80%;
  margin: 10px;
  padding: 10px;
  background-color: cornsilk;
}

.comment-input {
  margin-top: 10px;
  margin-bottom: 10px;
}

.reply-submit-button {
  margin-top: 20px;
}

.submit-button {
  text-align: center;
  display: block;
}
</style>
