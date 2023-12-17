<template>
  <div class="join-team-page">
    <input v-model="searchTerm" placeholder="Search teams by name">

    <ul class="team-list">
      <li v-for="team in filteredTeams" :key="team.id" class="team-item">
        <span>{{ team.leader }}</span>
        <span>{{ team.currentMembers }}</span>
        <el-button @click="joinTeam(team.id)">Join</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teams: [
        { id: 1, leader: 'Alice', currentMembers: 3 },
        { id: 2, leader: 'Bob', currentMembers: 4 },
        { id: 3, leader: 'Charlie', currentMembers: 2 },
        { id: 4, leader: 'Diana', currentMembers: 5 },
        { id: 5, leader: 'Ethan', currentMembers: 1 }
      ],
      searchTerm: ''
    }
  },
  computed: {
    filteredTeams() {
      return this.teams.filter(team =>
        team.leader.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    }
  },
  methods: {
    joinTeam(teamId) {
      // Add your join team logic here
      console.log(`Request to join team with ID: ${teamId}`)
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
  margin-bottom: 10px; /* adds space between team items */
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.team-item span {
  margin-right: 10px; /* adds space between text elements */
}

el-button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

input {
  margin-bottom: 20px; /* adds space below the search input */
  padding: 10px;
  width: calc(100% - 22px); /* adjusts width to account for padding */
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
