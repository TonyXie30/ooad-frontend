<template>
  <div :class="{ 'reg-style': true}">
    <br><br>
    <label class="label" for="reg-name">用户名: </label>
    <input type="text" :class="{'input-field':true}" placeholder="请输入用户名" v-model="regForm.username"/>
    <br><br>
    <label class="label" for="reg-password">密码: </label>
    <input type="password" :class="{'input-field':true}" placeholder="请输入密码" v-model="regForm.password"/>
    <br><br>
    <button @click="register" :class="{'input-button':true}">注册</button>
  </div>
</template>

<script>
export default {
  name: "register",
  data(){
    return{
      regForm: {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style scoped>
.reg-style{
  line-height: 40px;
  width: 400px;
  height: 400px;
  text-align: center;
  font-size: 20px;
  margin: 40px auto 0;
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