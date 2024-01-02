<template>
  <div class="view-my-team">
    <div class="upper-part">
      <div class="left-container">
        <h1 class="title">Team: {{ team.leader }}</h1>
        <p class="size">Current Team Size: {{ team.members.length }}</p>
      </div>
      <div class="right-container">
        <div v-for="member in team.members" :key="member.username" class="member-row">
          <span>{{ member.username }}</span>
          <el-button v-if="isLeader && member.username !== team.leader" type="danger" class="remove-btn" @click="removeMember(member.username)">Remove</el-button>
        </div>
      </div>
    </div>
    <div class="bottom-part">
      <el-button v-if="isLeader" class="leave-btn" type="danger" @click="disbandTeam">Disband Team</el-button>
      <el-button v-else class="leave-btn" type="danger" @click="leaveTeam">Leave Team</el-button>
    </div>
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
        this.$message({
          type: 'error',
          message: 'You are the only one member of the team!'
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
      this.$confirm('Confirm to remove this member?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async() => {
        await kickThisMember(this.userName, removeMemberName)
        this.team.members = this.team.members.filter(member => member.username !== removeMemberName)
        this.$message({
          type: 'success',
          message: 'You removed this member successfully!'
        })
      })
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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #CAFFFF;
  color: #833600;
  padding: 20px; /* Padding for overall alignment */
  overflow: auto;
}

.upper-part {
  display: flex;
  justify-content: space-between; /* This will space out the left and right containers */
  margin-top: 50px;
  margin-bottom: 20px; /* Space between upper and bottom parts */
}

.left-container {
  width: 50%; /* Adjust as necessary for your layout */
  margin-left: 100px;
}

.title {
  font-size: 50px;
}

.size {
  margin-top: 100px;
  font-size: 30px;
  font-weight: bold;
}

.right-container {
  width: 50%; /* Adjust as necessary for your layout */
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  margin-right: 250px;
  align-items: flex-end; /* This aligns the children to the right */
  font-size: 20px;
}

.member-row {
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bottom-part {
  margin-top: 400px;
  margin-left: 610px;
}

.remove-btn {
  border-radius: 10px;
}

.leave-btn {
  font-size: 20px;
  align-self: center; /* Centers the button in the bottom part */
  border-radius: 10px;
}

/* ... other styles ... */
</style>

