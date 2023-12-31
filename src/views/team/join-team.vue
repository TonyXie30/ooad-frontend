<template>
  <div class="join-team-page">
    <input v-model="searchTerm" placeholder="Search teams by name">

    <ul class="team-list">
      <li v-for="(team, index) in filteredTeams" :key="index" class="team-item">
        <span>Team {{ team }}</span>
        <el-button class="join-button" @click="requestToTeamUp(team)">Join</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
import { getTeamList, requestTeamUp } from '@/api/team'
export default {
  data() {
    return {
      teamLeaders: [],
      searchTerm: ''
    }
  },
  computed: {
    filteredTeams() {
      return this.teamLeaders.filter(leader =>
        leader.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    },
    userName: function() {
      return sessionStorage.getItem('username')
    }
  },
  async created() {
    await this.getAllTeams()
  },
  methods: {
    async getAllTeams() {
      const response = await getTeamList(this.userName)
      for (const leader of response.data.content) {
        this.teamLeaders.push(leader.username)
      }
    },
    async requestToTeamUp(leaderName) {
      await requestTeamUp(leaderName, this.userName)
      this.$message({
        type: 'success',
        message: 'Your application has been sent!'
      })
    }
  }
}
</script>

<style scoped>
.join-team-page {
  height: 100vh;
  margin: 0 auto;
  padding: 20px;
  background-color: #CAFFFF;
  color: #833600;
}

.team-list {
  margin-left: 500px;
  list-style-type: none;
  padding: 0;
}

.team-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  width: 300px;
  font-size: 18px;
  margin-bottom: 10px; /* adds space between team items */
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0.9;
}

.team-item span {
  margin-right: 10px; /* adds space between text elements */
}

input {
  margin-bottom: 20px;
  margin-left: 500px;
  padding: 10px;
  width: 400px;
  border: 1px solid #ddd;
  border-radius: 4px;
  opacity: 0.8;
}

.join-button {
  font-size: 15px;
  background-color: #CAFFFF;
  color: #833600;
  border-color: #833600;
  margin: 0 1rem; /* Adds space between buttons */
  border-radius: 10px;
}

.join-button:hover {
  background-color: #833600;
  color: #CAFFFF;
}
</style>
