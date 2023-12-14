<template>
  <div class="view-my-team">
    <h1>{{ team.name }}</h1>
    <p>Team Capacity: {{ team.capacity }}</p>
    <p>Current Members: {{ team.members.length }}</p>
    <p>Description: {{ team.description }}</p>
    <p>Team Leader: {{ team.leader }}</p>

    <ul>
      <li v-for="member in team.members" :key="member.username">
        {{ member.username }}
        <!-- If the current user is the leader, show the delete button next to members -->
        <button v-if="isLeader" class="remove-btn" @click="removeMember(member.username)">Remove</button>
      </li>
    </ul>

    <!-- If the current user is the leader, show the edit and delete team options -->
    <button v-if="isLeader" class="edit-btn" @click="editTeam">Edit Team</button>
    <button v-if="isLeader" class="delete-btn" @click="deleteTeam">Delete Team</button>

    <!-- Edit Team Form -->
    <div v-if="showEditForm" class="edit-team-form">
      <el-form ref="createTeamForm" class="el-form" :model="editTeamData" label-width="120px">
        <el-form-item label="Team Name:">
          <el-input v-model="editTeamData.name" class="el-name-input" />
        </el-form-item>

        <el-form-item label="Number of Members:" style="white-space: nowrap">
          <el-input-number v-model="editTeamData.capacity" class="el-input-number" :min="1" :max="4" />
        </el-form-item>

        <el-form-item label="Team Gender:">
          <el-select v-model="editTeamData.gender" class="el-select" placeholder="Select">
            <el-option label="Male Only" value="male" />
            <el-option label="Female Only" value="female" />
            <el-option label="Non-Binary" value="non-binary" />
          </el-select>
        </el-form-item>

        <el-form-item label="Description:">
          <el-input
            v-model="editTeamData.description"
            class="el-description-input"
            type="textarea"
            :rows="4"
            placeholder="A brief description of your team..."
          />
        </el-form-item>
        <button @click="confirmEdit">Confirm</button>
        <button @click="showEditForm = false">Cancel</button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewMyTeam',
  data() {
    return {
      team: {
        name: 'Alpha Team',
        capacity: 5,
        members: [
          { username: 'Alice' },
          { username: 'Bob' },
          { username: 'Charlie' }
        ],
        leader: 'Alice',
        description: 'A brief description of your team...'
      },
      currentUser: 'Alice', // This should be dynamically set to the logged-in user
      showEditForm: false, // Controls the visibility of the edit form
      editTeamData: { // Holds the data for editing the team details
        name: '',
        capacity: '',
        gender: '',
        description: ''
      }
    }
  },
  computed: {
    isLeader() {
      return this.team.leader === this.currentUser
    }
  },
  methods: {
    editTeam() {
      // Open the edit form and initialize the form with the current team data
      this.editTeamData.name = this.team.name
      this.editTeamData.capacity = this.team.capacity
      this.editTeamData.description = this.team.description
      this.showEditForm = true
    },
    deleteTeam() {
      // Logic to handle deleting the team
      // Make sure to confirm with the user before deletion
    },
    confirmEdit() {
      // Logic to confirm the edit and save the updated team details
      // Update the team object with the new details from the form
      this.team.name = this.editTeamData.name
      this.team.capacity = this.editTeamData.capacity
      this.team.description = this.editTeamData.description
      this.showEditForm = false
    },
    removeMember(username) {
      // Logic to remove a member from the team
      // Ensure that you can't remove the leader unless it's a team deletion
      if (username !== this.team.leader) {
        this.team.members = this.team.members.filter(member => member.username !== username)
      } else {
        alert("The leader can't be removed individually.")
      }
    }
  }
}
</script>

<style scoped>
.view-my-team {
  position: relative;
  width: 800px;
  margin: 80px auto auto;
  padding: 2rem;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.view-my-team h1,
.view-my-team p,
.view-my-team ul,
.view-my-team button,
.view-my-team .edit-team-form,
.view-my-team textarea {
  margin-bottom: 1rem;
}

.remove-btn {
  text-align: left;
  display: block;
  margin-left: 20px;
  margin-top: 10px;
}

.edit-btn ,
.delete-btn {
  margin-top: 30px;
}

button {
  font-size: 15px;
  padding: 0.5rem 0.7rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s ease;
  margin-inline: 10px;
}

.el-name-input {
  width: 40%;
  margin-left: 40px;
}

.el-input-number {
  width: 20%;
  margin-left: 40px;
}

.el-select {
  width: 23%;
  margin-left: 40px;
}

.el-description-input {
  width: 70%;
  margin-left: 40px;
}

</style>
