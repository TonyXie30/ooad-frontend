<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserDashboard from './admin'
import AdminDashboard from './faculty'

export default {
  name: 'Dashboard',
  components: { UserDashboard, AdminDashboard },
  data() {
    return {
      currentRole: 'UserDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('editor')) {
      this.currentRole = 'AdminDashboard'
    }
  }
}
</script>
