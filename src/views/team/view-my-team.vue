<template>
  <div class="view-my-team">
    <h1>Team {{ team.leader }}</h1>
    <p>Current Members: {{ team.members.length }}</p>

    <ul>
      <li v-for="member in team.members" :key="member.memberName">
        {{ member.memberName }}
        <button v-if="isLeader" class="remove-btn" @click="removeMember(member.memberName)">Remove</button>
      </li>
    </ul>

    <button class="leave-btn" @click="leaveTeam">Leave Team</button>
  </div>
</template>

<script>
import { leaveThisTeam, disbandThisTeam, kickThisMember } from '@/api/team'
export default {
  name: 'ViewMyTeam',
  data() {
    return {
      team: {
        members: [
          { memberName: 'Alice' },
          { memberName: 'Bob' },
          { memberName: 'Charlie' }
        ],
        leader: 'Super Admin'
      }
    }
  },
  computed: {
    isLeader() {
      return this.team.leader === this.userName
    },
    userName: function() {
      return this.$store.getters.name
    }
  },
  methods: {
    leaveTeam() {
      // need confirm
      if (!this.isLeader) {
        leaveThisTeam(this.userName)
      } else {
        disbandThisTeam(this.userName)
      }
    },
    async removeMember(removeMemberName) {
      if (removeMemberName !== this.team.leader) {
        await kickThisMember(this.userName, removeMemberName)
        this.team.members = this.team.members.filter(member => member.memberName !== removeMemberName)
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
