<template>
  <div class="comment">
    <div class="comment-content">
      <h3>{{ comment.author }}</h3>
      <p>{{ comment.content }}</p>
      <span class="comment-date">{{ commentTime }}</span>
      <el-button v-if="isCurrentUser" type="danger" class="inline-button" @click="deleteComment">Delete</el-button>
      <el-button type="primary" class="inline-button" @click="showReplyInput = true">Reply</el-button>
      <el-button v-if="showReplyInput" type="warning" class="inline-button" @click="cancelReply">Cancel</el-button>
    </div>
    <div v-if="showReplyInput" class="reply-input">
      <textarea v-model="replyText" />
      <el-button type="success" @click="submitReply">Submit</el-button>
    </div>
    <div v-if="comment.replies && comment.replies.length" class="replies">
      <Comment
        v-for="(reply, index) in comment.replies"
        :key="index"
        :comment="reply"
        class="nested-comment"
      />
    </div>
  </div>
</template>

<script>
import { addChildComment, deleteComment } from '@/api/dormitory'
export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      showReplyInput: false,
      replyText: ''
    }
  },
  computed: {
    userName: function() {
      return sessionStorage.getItem('username')
    },
    isCurrentUser: function() {
      return this.comment.author === this.userName
    },
    commentTime: function() {
      return new Date(this.comment.create_time).toLocaleString()
    }
  },
  methods: {
    cancelReply() {
      this.showReplyInput = false
      this.replyText = ''
    },
    async submitReply() {
      if (!this.replyText.trim()) return
      const response = await addChildComment(this.userName, this.comment.dormitory_id, this.replyText, this.comment.id)
      const newReply = {
        parent_id: this.comment.id,
        id: response.data.comment_id,
        dormitory_id: this.comment.dormitory_id,
        author: this.userName,
        content: this.replyText,
        create_time: response.data.create_time,
        replies: []
      }
      this.comment.replies.push(newReply)
      this.cancelReply()
    },
    async deleteComment() {
      // Check if the comment is a top-level comment
      if (this.comment.parent_id === this.comment.id) {
        // Emit an event to the parent component to handle the deletion of the comment and its replies
        this.$emit('delete-comment', this.comment.id)
      } else {
        await deleteComment(this.comment.id)
        this.comment.replies = []
        this.$parent.comment.replies = this.$parent.comment.replies.filter(reply => reply.id !== this.comment.id)
      }
    }
  }
}
</script>

<style scoped>
.comment {
  width: 700px;
  margin-bottom: 16px;
  margin-left: 350px;
  padding: 3px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  background-color: #f9f9f9;
  opacity: 0.9;
}

.comment-content {
  margin-left: 10px;
  margin-bottom: 8px;
  height: 130px;
}

.comment-date {
  display: block;
  color: #777;
  margin-top: 4px;
  font-size: 0.8em;
}

.inline-button {
  margin-top: 10px;
}

.reply-input textarea {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 8px;
}

.replies .comment {
  width: 90%;
  margin-top: 30px;
  margin-left: 20px; /* Indentation for nested comments */
  border-color: #d9d9d9; /* Lighter border for nested comments */
  background-color: #ffffff; /* Different background for nested comments */
}

/* Styling for the input textarea */
.reply-input textarea {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 8px;
  resize: vertical; /* Allow vertical resizing */
}
</style>
