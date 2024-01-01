<template>
  <div class="common">
    <!-- 登录 -->
    <!--    <div v-if="!isLogin" class="login">-->
    <!--      <el-tabs v-model="activeName">-->
    <!--        <el-tab-pane label="欢迎登录" name="first">-->
    <!--          &lt;!&ndash; 用户名输入 &ndash;&gt;-->
    <!--          <el-input v-model="username" placeholder="请输入用户名">-->
    <!--            <el-button slot="append" @click="login">登录</el-button>-->
    <!--          </el-input>-->
    <!--          &lt;!&ndash; 头像选择 &ndash;&gt;-->
    <!--          <div class="avatar">-->
    <!--            <span v-for="(src,index) in avatarList" :key="index" @click="avatar(src)">-->
    <!--              <el-avatar :src="src" :class="{'choosed':src==choosed}" />-->
    <!--            </span>-->
    <!--          </div>-->
    <!--        </el-tab-pane>-->
    <!--      </el-tabs>-->
    <!--    </div>-->
    <!-- 聊天 -->
    <el-container>
      <el-aside width="350px">
        <my-aside />
      </el-aside>
      <el-container>
        <el-header>
          <span v-if="userInfo.name=='默认群聊'">{{ userInfo.name }}： {{ userList.length-1 }}</span>
          <span v-else>{{ userInfo.name }}</span>
        </el-header>
        <el-main>
          <my-main />
        </el-main>
        <el-footer>
          <my-footer />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import store from './store/index'
import myAside from './components/myAside.vue'
import myMain from './components/myMain.vue'
import myFooter from './components/myFooter.vue'
import { gerProfile } from '@/api/article'

export default {
  name: 'App',
  components: { myAside, myMain, myFooter },
  data() {
    return {
      activeName: 'first',
      username: '',
      avatar: ''
    }
  },
  computed: {
    isLogin() {
      return store.state.isLogin
    },
    userInfo() {
      // console.log(store.state.userInfo)
      return store.state.userInfo
    },
    userList() {
      return store.state.userList
    }
  },
  mounted() {
    console.log('0')
    this.loginChat()
  },

  methods: {
    loginChat() {
      console.log('1')
      this.username = sessionStorage.getItem('username')
      new Promise((resolve, reject) => {
        gerProfile(sessionStorage.getItem('username')).then(response => {
          if (response.data.photo != null) {
            this.avatar = response.data.photo
          } else {
            this.avatar = 'http://img.mp.itc.cn/upload/20170808/5861bc790e654d56bc9289c567b44875_th.jpg'
          }
          console.log(this.avatar)
          this.$socket.connect()
          this.$socket.emit('login', { name: this.username, img: this.avatar }, (result) => {
            if (result) {
              /* 登录成功的情况下，才修改vuex的数据 */
              this.$message.success('欢迎来到在线聊天室！')
              /* 告诉vuex修改个人信息 */
              store.commit('setMyInfo', {
                img: this.avatar,
                name: this.username
              })
              console.log(result)
              // console.log(store._mutations)
              // store.commit('SOCKET_login', result.userList)
              // console.log(store.state.myInfo)
            }
          })
          resolve()
          setTimeout(() => {
            this.listLoading = false
          }, 1000)
        })
      })
    }
  },

  sockets: {
    login(data) {
      console.log(data)
      store.commit('SOCKET_login', data)
    },
    updateChatMessageList(data) {
      console.log(data)
      store.commit('SOCKET_updateChatMessageList', data)
    }
  }
}
</script>
<style scoped>

.common {
  /* padding: 100px; */
  margin-top: 0;
  /* width: 800px; */ /* 800 是我为了演示3个用户同时在线，建议设为100%，项目的宽度直接受这个影响*/
  width:100%;
  height: 200px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  height: 620px;
}
.el-container{
  height: 620px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 280px;
}

</style>
