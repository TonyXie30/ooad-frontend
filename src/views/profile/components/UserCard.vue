<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>About me</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>Hello</div>
          {{ user.name }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <br>
        <!--        <div class="user-name text-center">{{ user.name }}</div>-->
        <mallki class-name="mallki-text" :text="user.name" />
        <div v-if="this.user.user" class="user-role text-center text-muted">{{ user.subject }}</div>
      </div>
    </div>

    <div v-if="this.user.user" class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><span>Wake up Time</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ user.wakeupTime }}
          </div>
        </div>
      </div>

      <div v-if="this.user.user" class="user-education user-bio-section">
        <div class="user-bio-section-header"><span>Bed Time</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ user.bedTime }}
          </div>
        </div>
      </div>

      <div v-if="this.user.user" class="user-education user-bio-section">
        <div class="user-bio-section-header"><span>Selected Dorm </span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ user.dorm }}
          </div>
        </div>
      </div>
      <button v-if="this.user.visible" class="button" @click="cancel">
        deselect
      </button>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import { checkOutUser, gerProfile } from '@/api/article'
import Mallki from '@/components/TextHoverEffect/Mallki.vue'

export default {
  components: { Mallki, PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          role: '',
          subject: '',
          wakeupTime: '',
          bedTime: '',
          dorm: '',
          dormID: '',
          visible: false,
          user: true
        }
      }
    }
  },
  mounted() {
    this.initMethod()
  },
  methods: {
    cancel() {
      new Promise((resolve, reject) => {
        const data = {
          username: sessionStorage.getItem('username'),
          id: this.$props.user.dormID
        }
        checkOutUser(data).then(response => {
          this.$props.user.visible = false
          this.$props.user.dorm = 'null'
          location.reload()
          resolve()
          setTimeout(() => {
            this.listLoading = false
          }, 1000)
        })
      })
    },
    initMethod() {
      this.$props.user.user = true
      // console.log(localStorage.getItem('username'))
      if (sessionStorage.getItem('username') !== 'System') {
        new Promise((resolve, reject) => {
          gerProfile(sessionStorage.getItem('username')).then(response => {
            console.log(response.data)
            this.$props.user.name = sessionStorage.getItem('username')
            this.$props.user.subject = response.data.subject.name
            // console.log(this.$props.user.subject)
            if (response.data.photo != null) {
              this.$props.user.avatar = response.data.photo
            }
            this.$props.user.wakeupTime = response.data.uptime.timeSlot
            this.$props.user.bedTime = response.data.bedtime.timeSlot
            this.$props.user.dorm = 'null'
            this.$props.user.visible = false
            // console.log('?' + this.$props.user.dorm)
            if (response.data.bookedDormitory === null) {
              this.$props.user.dorm = 'null'
              this.$props.user.visible = false
              console.log(this.$props.user.dorm)
            } else {
              this.$props.user.dorm = response.data.bookedDormitory.location + ' ' +
                response.data.bookedDormitory.buildingName + '栋 ' + response.data.bookedDormitory.floor +
                '层 ' + response.data.bookedDormitory.houseNum + '室'
              this.$props.user.dormID = response.data.bookedDormitory.id
              this.$props.user.visible = true
              console.log(this.$props.user.dorm)
            }
            resolve()
            setTimeout(() => {
              this.listLoading = false
            }, 1000)
          })
        })
      } else {
        this.$props.user.name = 'System'
        this.$props.user.user = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
.mallki-text{
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.el-card{
  height: 560px;
  overflow: auto
}
.button{
  right: 70%;
  top: 86%;
  position: absolute;
}
</style>
