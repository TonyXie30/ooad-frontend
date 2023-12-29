<template>
  <div class="join-team-page">
    <input v-model="searchTerm" placeholder="Search teams by name">

    <ul class="team-list">
      <li v-for="(team, index) in filteredTeams" :key="index" class="team-item">
        <span>Team {{ team }}</span>
        <el-button type="primary" @click="requestToTeamUp(team)">Join</el-button>
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
    }
  }
}
</script>

<style scoped>
.join-team-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.team-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.team-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  width: 300px;
  margin-bottom: 10px; /* adds space between team items */
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.team-item span {
  margin-right: 10px; /* adds space between text elements */
}

input {
  margin-bottom: 20px; /* adds space below the search input */
  padding: 10px;
  width: 400px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
