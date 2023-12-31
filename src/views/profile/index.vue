<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="8" :xs="24">
          <user-card :user="user" />
        </el-col>
        <el-col :span="16" :xs="24">
          <recommend :user="user" />
        </el-col>
      </el-row>
      <el-row :gutter="20">

        <el-col :span="16" :xs="24">
          <Bookmark :user="user" />
        </el-col>
        <el-col :span="8" :xs="24">
          <Setting :user="user" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Recommend from '@/views/profile/components/Recommend.vue'
import Bookmark from '@/views/profile/components/Bookmark.vue'
import Setting from '@/views/profile/components/Setting.vue'
// import Activity from './components/Activity'
// import Timeline from './components/Timeline'
// import Account from './components/Account'

export default {
  name: 'Profile',
  components: { Recommend, UserCard, Bookmark, Setting },
  data() {
    return {
      user: {},
      activeTab: 'activity'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: 'admin', // need to change later
        role: this.roles.join(' | '),
        email: 'admin@test.com',
        avatar: this.avatar,
        subject: '计算机系',
        wakeupTime: '08:00:00',
        bedTime: '23:00:00'
      }
    }
  }
}
</script>
