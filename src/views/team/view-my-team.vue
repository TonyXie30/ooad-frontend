<template>
  <div class="view-my-team">
    <h1>Team {{ team.leader }}</h1>
    <p>Current Team Size: {{ team.members.length }}</p>

    <ul>
      <li v-for="member in team.members" :key="member.username">
        <div class="row-element">
          {{ member.username }}
          <el-button v-if="isLeader" type="primary" class="remove-btn" @click="removeMember(member.username)">Remove</el-button>
        </div>
      </li>
    </ul>

    <el-button v-if="isLeader" type="primary" class="leave-btn" @click="disbandTeam">Disband Team</el-button>
    <el-button v-else class="leave-btn" type="primary" @click="leaveTeam">Leave Team</el-button>
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
      if (this.team.members.length === 1) {
        this.$alert('You are the only member of the team!', {
          confirmButtonText: 'Confirm'
        })
      } else {
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
      }
    },
    disbandTeam() {
      if (this.team.members.length === 1) {
        this.$alert('You are the only member of the team!', {
          confirmButtonText: 'Confirm'
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
      if (this.team.members.length === 1) {
        this.team.leader = this.userName
      } else {
        this.team.leader = response.data.leader.username
      }
    }
  }
}
</script>

<style scoped>
.view-my-team {
  position: relative;
  width: 600px;
  margin: 80px auto auto;
  padding: 3rem;
  background-color: #f7f7f7;
  opacity: 0.8;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.row-element {
  display: flex;
  font-size: 25px;
  .remove-btn {
    display: block;
    margin-left: 120px;
  }
}

.leave-btn {
  display: block;
  margin: 0 auto;
}
</style>
