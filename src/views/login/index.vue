<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Dorm Selection System @ SUSTech</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="realUser.username"
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
            v-model="realUser.password"
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
      <div class="captcha-container">
        <img :src="captchaImageUrl" alt="">
      </div>
      <el-form-item prop="captcha">
        <el-input
          v-model="captchaInput"
          placeholder="Enter the code shown above"
          name="captcha"
        />
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
      <div style="position:relative">
        <div class="tips">
          <span>Faculty no need to register</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">Faculty username : System</span>
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
        placeholder="用户名"
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
        placeholder="密码"
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
        <el-select v-model="registerForm.wakeupTime" placeholder="起床时间">
          <el-option
            v-for="item in timeRanges"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <br>
        <span class="svg-container">
          <svg-icon icon-class="dashboard" />
        </span>
        <el-select v-model="registerForm.bedTime" placeholder="入睡时间">
          <el-option
            v-for="item in timeRanges"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <br>
        <span class="svg-container">
          <svg-icon icon-class="dashboard" />
        </span>
        <el-select v-model="registerForm.gender" placeholder="性别">
          <el-option
            v-for="item in genders"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <br>
        <span class="svg-container">
          <svg-icon icon-class="dashboard" />
        </span>
        <el-select v-model="registerForm.degree" placeholder="学位">
          <el-option
            v-for="item in degrees"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
      <el-button class="reg-button2" type="primary" @click.native.prevent="handleRegister" @click="showDialog=false">
        Register
      </el-button>
      <br><br><br>
    </el-dialog>

  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { Login, Register } from '@/api/article'
import { getVerification } from '@/api/login'
const CryptoJS = require('crypto-js')
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
        username: '',
        password: '',
        subject: '',
        wakeupTime: '',
        bedTime: '',
        gender: '',
        degree: ''
      },
      loginForm: {
        username: 'editor',
        password: '111111'
      },
      realUser: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      subjects: [
        {
          value: '070101',
          label: '数学与应用数学'
        },
        {
          value: '070201',
          label: '物理学'
        },
        {
          value: '070301',
          label: '化学'
        },
        {
          value: '070701',
          label: '海洋科学'
        },
        {
          value: '070801',
          label: '地球物理学'
        },
        {
          value: '071001',
          label: '生物科学'
        },
        {
          value: '071003',
          label: '生物信息学'
        },
        {
          value: '071201',
          label: '统计学'
        },
        {
          value: '080101',
          label: '理论与应用力学'
        },
        {
          value: '080201',
          label: '机械工程'
        },
        {
          value: '080401',
          label: '材料科学与工程'
        },
        {
          value: '080901',
          label: '计算机科学与技术'
        },
        {
          value: '080907T',
          label: '智能科学与技术'
        },
        {
          value: '080910T',
          label: '数据科学与大数据技术'
        },
        {
          value: '100103T',
          label: '生物医学科学'
        }
      ],
      timeRanges: [{
        value: '00:00',
        label: '00:00-00:30'
      }, {
        value: '00:30',
        label: '00:30-01:00'
      }, {
        value: '01:00',
        label: '01:00-01:30'
      }, {
        value: '01:30',
        label: '01:30-02:00'
      }, {
        value: '02:00',
        label: '02:00-02:30'
      }, {
        value: '02:30',
        label: '02:30-03:00'
      }, {
        value: '03:00',
        label: '03:00-03:30'
      }, {
        value: '03:30',
        label: '03:30-04:00'
      }, {
        value: '04:00',
        label: '04:00-04:30'
      }, {
        value: '04:30',
        label: '04:30-05:00'
      }, {
        value: '05:00',
        label: '05:00-05:30'
      }, {
        value: '05:30',
        label: '05:30-06:00'
      }, {
        value: '06:00',
        label: '06:00-06:30'
      }, {
        value: '06:30',
        label: '06:30-07:00'
      }, {
        value: '07:00',
        label: '07:00-07:30'
      }, {
        value: '07:30',
        label: '07:30-08:00'
      }, {
        value: '08:00',
        label: '08:00-08:30'
      }, {
        value: '08:30',
        label: '08:30-09:00'
      }, {
        value: '09:00',
        label: '09:00-09:30'
      }, {
        value: '09:30',
        label: '09:30-10:00'
      }, {
        value: '10:00',
        label: '10:00-10:30'
      }, {
        value: '10:30',
        label: '10:30-11:00'
      }, {
        value: '11:00',
        label: '11:00-11:30'
      }, {
        value: '11:30',
        label: '11:30-12:00'
      }, {
        value: '12:00',
        label: '12:00-12:30'
      }, {
        value: '12:30',
        label: '12:30-13:00'
      }, {
        value: '13:00',
        label: '13:00-13:30'
      }, {
        value: '13:30',
        label: '13:30-14:00'
      }, {
        value: '14:00',
        label: '14:00-14:30'
      }, {
        value: '14:30',
        label: '14:30-15:00'
      }, {
        value: '15:00',
        label: '15:00-15:30'
      }, {
        value: '15:30',
        label: '15:30-16:00'
      }, {
        value: '16:00',
        label: '16:00-16:30'
      }, {
        value: '16:30',
        label: '16:30-17:00'
      }, {
        value: '17:00',
        label: '17:00-17:30'
      }, {
        value: '17:30',
        label: '17:30-18:00'
      }, {
        value: '18:00',
        label: '18:00-18:30'
      }, {
        value: '18:30',
        label: '18:30-19:00'
      }, {
        value: '19:00',
        label: '19:00-19:30'
      }, {
        value: '19:30',
        label: '19:30-20:00'
      }, {
        value: '20:00',
        label: '20:00-20:30'
      }, {
        value: '20:30',
        label: '20:30-21:00'
      }, {
        value: '21:00',
        label: '21:00-21:30'
      }, {
        value: '21:30',
        label: '21:30-22:00'
      }, {
        value: '22:00',
        label: '22:00-22:30'
      }, {
        value: '22:30',
        label: '22:30-23:00'
      }, {
        value: '23:00',
        label: '23:00-23:30'
      }, {
        value: '23:30',
        label: '23:30-24:00'
      }],
      genders: [{
        value: 'male',
        label: '男'
      }, {
        value: 'female',
        label: '女'
      }],
      degrees: [{
        value: 'postgraduate',
        label: '本科'
      }, {
        value: 'doctorate',
        label: '研究生'
      }],
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      captchaImageUrl: 'url-to-captcha-image',
      captchaCode: '',
      captchaInput: ''
    }
  },
  async created() {
    await this.getVerificationCode()
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
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
      if (this.captchaInput === this.captchaCode) {
        new Promise((resolve, reject) => {
          const loginData = {
            username: this.realUser.username,
            password: CryptoJS.MD5(this.realUser.password).toString()
          }
          Login(loginData).then(response => {
            this.allList = response.data
            this.total = this.allList.length
            resolve()
            setTimeout(() => {
              this.listLoading = false
            }, 1000)
            this.$notify({
              title: 'Success',
              message: 'Login Successfully',
              type: 'success',
              duration: 2000
            })
            if (response.data.admin === true) {
              this.loginForm.username = 'admin'
            } else {
              this.loginForm.username = 'editor'
            }
            // const actionTypes = Object.keys(store._actions).map(action => action);
            this.$store.dispatch('realUsername/setRealUser', this.realUser.username)
            sessionStorage.setItem('username', this.realUser.username)
            this.$refs.loginForm.validate(valid => {
              if (valid) {
                this.loading = true
                this.$store.dispatch('user/login', this.loginForm)
                  .then(() => {
                    this.$router.push({ path: '/dashboard' })
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
          })
        })
      } else {
        this.$message({
          type: 'error',
          message: 'Wrong verification code!'
        })
      }
    },
    handleRegister() {
      const regData = {
        username: this.registerForm.username,
        password: CryptoJS.MD5(this.registerForm.password).toString(),
        gender: {
          gender: this.registerForm.gender
        },
        degree: {
          degree: this.registerForm.degree
        },
        subject: {
          id: this.registerForm.subject
        },
        bedtime: {
          id: 1,
          timeSlot: this.registerForm.bedTime
        },
        uptime: {
          id: 1,
          timeSlot: this.registerForm.wakeupTime
        }
      }
      new Promise((resolve, reject) => {
        Register(regData).then(response => {
          this.allList = response.data
          this.total = this.allList.length
          resolve()
          setTimeout(() => {
            this.listLoading = false
          }, 1000)
          this.$notify({
            title: 'Success',
            message: 'Register Successfully',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    async getVerificationCode() {
      const response = await getVerification()
      this.captchaImageUrl = response.data.verifyCodeImgUrl
      this.captchaCode = response.data.verifyCode
    }
  }
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
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
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

  .captcha-container {
    margin-left: 130px;
    margin-bottom: 10px;
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
      margin: 0 auto 40px auto;
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
}

</style>
