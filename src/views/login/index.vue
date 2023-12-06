<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Dorm selection system @ SUSTech</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div style="position:relative">
        <div class="tips">
          <span>Username : admin</span>
          <span>Password : any</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">Username : editor</span>
          <span>Password : any</span>
        </div>
      </div>

      <el-button class="reg-button1" type="primary" @click="showDialog=true">
        Register
      </el-button>

    </el-form>

    <el-dialog :visible.sync="showDialog">

      <span class="svg-container">
        <svg-icon icon-class="user" />
      </span>
      <el-input
        ref="username"
        v-model="registerForm.username"
        placeholder="Username"
        name="username"
        type="text"
        tabindex="1"
        autocomplete="on"
      />
      <br>
      <span class="svg-container">
        <svg-icon icon-class="password" />
      </span>
      <el-input
        ref="password"
        v-model="registerForm.password"
        placeholder="Password"
        name="password"
        type="text"
        tabindex="1"
        autocomplete="on"
      />
      <br>
      <span class="svg-container">
        <svg-icon icon-class="education" />
      </span>
      <template>
        <el-select v-model="registerForm.subject" placeholder="专业">
          <el-option
            v-for="item in subjects"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
      <br>
      <template>
        <span class="svg-container">
          <svg-icon icon-class="dashboard" />
        </span>
        <el-time-picker
          v-model="registerForm.wakeupTime"
          :picker-options="{
            selectableRange: '06:00:00 - 11:59:59'
          }"
          prefix-icon="null"
          placeholder="起床时间"
        />
        <br>
        <span class="svg-container">
          <svg-icon icon-class="dashboard" />
        </span>
        <el-time-picker
          v-model="registerForm.bedTime"
          :picker-options="{
            selectableRange: '18:00:00 - 23:59:59'
          }"
          prefix-icon="null"
          placeholder="入睡时间"
        />
      </template>
      <el-button class="reg-button2" type="primary" @click.native.prevent="handleRegister">
        Register
      </el-button>
      <br><br><br>
    </el-dialog>

  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import request from '@/utils/request'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '用户名',
        password: '密码',
        subject: '专业',
        wakeupTime: '',
        bedTime: ''
      },
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      subjects: [{
        value: '数学系',
        label: '数学系'
      }, {
        value: '计算机系',
        label: '计算机系'
      }, {
        value: '物理系',
        label: '物理系'
      }, {
        value: '化学系',
        label: '化学系'
      }, {
        value: '金融系',
        label: '金融系'
      }],
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRegister() {
      console.log(this.registerForm)

      // this.$axios.post('/login', loginData)
      /*
      axios.post('/register', this.registerForm)
        .then(response => {
          // 处理登录成功的响应
          console.log('Register successful:', response.data);
          // 可以跳转到其他页面或执行其他操作
        })
        .catch(error => {
          // 处理登录失败的响应
          console.error('Register failed:', error);
        });
        */
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}

export function fetchList(query) {
  return request({
    url: '/api/register',
    method: 'post',
    params: query
  })
}

</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-dialog{
    background: $bg;
    width: 300px;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .reg-button1 {
    position: absolute;
    right: 7%;
    bottom: 16px;
    width: 200px;
  }

  .reg-button2 {
    position: absolute;
    right: 10%;
    bottom: 20px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}

</style>
