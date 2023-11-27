<template>
  <div :class="{ 'login-style': true}">
    <br><br>
    <label class="label" for="username">用户名: </label>
    <input type="text" :class="{'input-field':true}" v-model="loginForm.username" placeholder="请输入用户名"/>
    <br><br>
    <label class="label" for="password">密码: </label>
    <input type="password" :class="{'input-field':true}" v-model="loginForm.password" placeholder="请输入密码"/>
    <br><br>
    <button @click="register" :class="{'input-button':true}">注册</button>
    <button @click="login" :class="{'input-button':true}">登录</button>
  </div>
</template>

<script>

import router from "@/router";

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const loginData = {
        username: this.loginForm.username,
        password: this.loginForm.password,
      };
      console.log(this.username,this.password)
      this.$axios.post('/login', loginData)
      .then(response => {
        // 处理登录成功的响应
        console.log('Login successful:', response.data);
        // 可以跳转到其他页面或执行其他操作
        router.push("/home")
      })
      .catch(error => {
        // 处理登录失败的响应
        console.error('Login failed:', error);
      });
    },
    register(){
      console.log('To register view:');
      router.push("/register")
    }
  }
}
</script>
<style>
  .login-style{
    line-height: 40px;
    width: 400px;
    height: 400px;
    text-align: center;
    font-size: 20px;
    margin: 40px auto 0;
    border: 2px solid black;
    background-color: #dafdff;
    border-radius: 12px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    backdrop-filter: blur(16px) saturate(120%);
    -webkit-backdrop-filter: blur(16px) saturate(120%);
    background-color: rgba(255, 255, 255, 0.3);
  }
  .input-field {
    display: inline-block;
    width: 50%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s ease-in-out;
  }
  .input-field:focus {
    border-color: #007BFF;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  .label {
    display: inline-block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  .input-button{
    font-family: "JetBrains Mono ExtraBold",emoji;
    background-color: azure;
    border-radius: 8px;
    height: 40px;
    width: 50px;
  }
  .input-button:hover{
    background-color: #00FFFF;
  }
  .input-button:active{
    background-color: steelblue;
  }
</style>