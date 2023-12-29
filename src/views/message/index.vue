<template>
  <div class="mailbox">
    <div v-for="message in messages" :key="message.id" class="mail">
      <div class="mail-header">
        <h3>{{ message.sender.username }}</h3>
        <span>{{ messageDate(message.time) }}</span>
      </div>
      <div class="mail-content">
        <p>{{ message.content }}</p>
        <div v-if="looksLikeApplication(message.content)">
          <el-button type="success" @click="acceptApplication(getApplicantName(message.content))">Accept</el-button>
          <el-button type="danger" @click="deleteMessage(message.id)">Reject</el-button>
        </div>
        <div v-else>
          <el-button type="danger" @click="deleteMessage(message.id)">Delete</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMailBox, deleteNotification } from '@/api/message'
import { teamUp } from '@/api/team'
export default {
  name: 'Mailbox',
  data() {
    return {
      messages: []
    }
  },
  computed: {
    userName: function() {
      return sessionStorage.getItem('username')
    }
  },
  async created() {
    await this.getAllMessages()
  },
  methods: {
    looksLikeApplication(content) {
      return content.includes('id:') && content.includes('name:')
    },
    async acceptApplication(name) {
      await teamUp(this.userName, name)
      // Success notification
    },
    messageDate(originalDate) {
      return new Date(originalDate).toLocaleString()
    },
    getApplicantName(message) {
      const lines = message.split('\n')
      let name = ''
      lines.forEach((line) => {
        if (line.trim().startsWith('name:')) {
          name = line.split('name:')[1].trim().replace(',', '')
        }
      })
      return name
    },
    async getAllMessages() {
      const response = await getMailBox(this.userName)
      this.messages = response.data
    },
    async deleteMessage(id) {
      await deleteNotification(id)
      this.messages = this.messages.filter(message => message.id !== id)
    }
  }
}
</script>

<style>
.mailbox {
  max-width: 600px;
  margin: auto;
  font-family: Arial, sans-serif;
}

.mail {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.mail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.mail-content {
  margin-bottom: 8px;
}
</style>
