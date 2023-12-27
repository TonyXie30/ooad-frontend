<template>
  <div class="view-my-team">
    <h1>Team {{ team.leader }}</h1>
    <p>Current Team Size: {{ team.members.length }}</p>

    <ul>
      <li v-for="member in team.members" :key="member.username">
        {{ member.username }}
        <button v-if="isLeader" class="remove-btn" @click="removeMember(member.username)">Remove</button>
      </li>
    </ul>

    <button class="leave-btn" @click="leaveTeam">Leave Team</button>
  </div>
</template>

<script>
import { leaveThisTeam, disbandThisTeam, kickThisMember, getTeamMember } from '@/api/team'
export default {
  name: 'ViewMyTeam',
  data() {
    return {
      team: {
        members: [],
        leader: ''
      }
    }
  },
  computed: {
    isLeader() {
      return this.team.leader === this.userName
    },
    userName: function() {
      return sessionStorage.getItem('username')
    }
  },
  async created() {
    await this.getTeamMemberList()
  },
  methods: {
    leaveTeam() {
      if (!this.isLeader) {
        this.$confirm('Confirm to leave the team?', 'Warning', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          leaveThisTeam(this.userName)
          this.$message({
            type: 'success',
            message: 'You leave the team successfully!'
          })
        })
      } else {
        this.$confirm('Confirm to disband the team?', 'Warning', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          disbandThisTeam(this.userName)
          this.$message({
            type: 'success',
            message: 'You disband the team successfully!'
          })
        })
      }
    },
    async removeMember(removeMemberName) {
      if (removeMemberName !== this.team.leader) {
        await kickThisMember(this.userName, removeMemberName)
        this.team.members = this.team.members.filter(member => member.memberName !== removeMemberName)
      } else {
        alert("The leader can't be removed individually.")
      }
    },
    async getTeamMemberList() {
      const response = await getTeamMember(this.userName)
      this.team.members = response.data.members
      this.team.leader = response.data.leader.username
    }
  }
}
</script>

<style scoped>
.view-my-team {
  position: relative;
  width: 500px;
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
.view-my-team,
.view-my-team textarea {
  margin-bottom: 1rem;
}

.remove-btn {
  text-align: left;
  display: block;
  margin-left: 20px;
  margin-top: 10px;
}

.leave-btn {
  margin-top: 40px;
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
</style>
