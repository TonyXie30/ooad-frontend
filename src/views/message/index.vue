<template>
  <div class="mailbox">
    <div v-for="message in messages" :key="message.id" class="mail">
      <div class="mail-header">
        <h3>{{ message.sender.username }}</h3>
        <span>{{ messageDate(message.time) }}</span>
      </div>
      <div class="mail-content">
        <p>{{ message.content }}</p>
        <div v-if="looksLikeApplication(message.content)" class="mail-actions">
          <el-button type="success" @click="acceptApplication(getApplicantName(message.content))">Accept</el-button>
          <el-button type="danger">Reject</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMailBox } from '@/api/message'
import { teamUp } from '@/api/team'
export default {
  name: 'Mailbox',
  data() {
    return {
      // Sample messages data
      messages: [
        {
          id: 1,
          sender: 'Alice',
          content: 'This is a test message.',
          sentDate: '2023-12-28',
          type: 'other' // Other type of message
        },
        {
          id: 2,
          sender: 'Bob',
          content: 'Notification: There\'s a new application for your team. Here\'s his brief introduction: id: 4, name: zzm, gender: male, subject: Computer Science',
          sentDate: '2023-12-29',
          type: 'application' // Application type of message
        }
        // ... other messages
      ]
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
      console.log(name)
      await teamUp(this.userName, name)
      // Implement the logic to accept the application
    },
    messageDate(originalDate) {
      return new Date(originalDate).toLocaleString()
    },
    getApplicantName(message) {
      // Split the message by lines
      const lines = message.split('\n')
      // Initialize name variable
      let name = ''
      // Loop through each line to find the name
      lines.forEach((line) => {
        // Check if the line contains the name field
        if (line.trim().startsWith('name:')) {
          // Extract the name after the 'name:' part and trim any whitespace or commas
          name = line.split('name:')[1].trim().replace(',', '')
        }
      })
      return name
    },
    async getAllMessages() {
      const response = await getMailBox(this.userName)
      this.messages = response.data
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
