<template>
  <div class="mailbox">
    <div v-for="message in messages" :key="message.id" class="mail">
      <div class="mail-header">
        <h3>{{ message.sender.username }}</h3>
        <span>{{ messageDate(message.time) }}</span>
      </div>
      <div class="mail-content">
        <p>{{ message.content }}</p>
        <div v-if="teamApplication(message.content)">
          <el-button type="success" @click="acceptTeamApplication(getTeamApplicantName(message.content), message.id)">Accept</el-button>
          <el-button type="danger" @click="deleteMessage(message.id)">Reject</el-button>
        </div>
        <div v-else-if="roomApplication(message.content)">
          <el-button type="success" @click="acceptExchangeApplication(getExchangeApplicantName(message.content), message.id)">Accept</el-button>
          <el-button type="danger" @click="rejectExchangeApplication(getExchangeApplicantName(message.content), message.id)">Reject</el-button>
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
import { exchangeAccept, exchangeReject } from '@/api/room-exchange'
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
    teamApplication(content) {
      return content.includes('id:') && content.includes('name:')
    },
    roomApplication(content) {
      return content.includes('location:') && content.includes('buildingName:')
    },
    async acceptTeamApplication(name, id) {
      await teamUp(this.userName, name)
      await this.deleteMessage(id)
      this.$message({
        type: 'success',
        message: 'Team up successfully!'
      })
    },
    async acceptExchangeApplication(name, id) {
      await exchangeAccept(this.userName, name)
      await this.deleteMessage(id)
      this.$message({
        type: 'success',
        message: 'Exchange the room successfully!'
      })
    },
    async rejectExchangeApplication(name, id) {
      await exchangeReject(this.userName, name)
      await this.deleteMessage(id)
    },
    messageDate(originalDate) {
      return new Date(originalDate).toLocaleString()
    },
    getTeamApplicantName(message) {
      const lines = message.split('\n')
      let name = ''
      lines.forEach((line) => {
        if (line.trim().startsWith('name:')) {
          name = line.split('name:')[1].trim().replace(',', '')
        }
      })
      return name
    },
    getExchangeApplicantName(message) {
      const lines = message.split('\n')
      let name = ''
      lines.forEach((line) => {
        if (line.trim().startsWith('Apply from:')) {
          name = line.split('Apply from:')[1].trim().replace(',', '')
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
