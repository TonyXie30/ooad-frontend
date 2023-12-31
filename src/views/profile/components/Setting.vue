<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>Set Avatar</span>
    </div>
    <el-row>
      <el-col :span="4" :xs="24">
        <div style="height: 50px; width: 50px">
          <el-image src="http://img.mp.itc.cn/upload/20170808/5861bc790e654d56bc9289c567b44875_th.jpg" @click="clickDefault1" />
        </div>
      </el-col>
      <el-col :span="4" :xs="24">
        <div style="height: 50px; width: 50px">
          <el-image src="http://5b0988e595225.cdn.sohucs.com/images/20180312/366885f17a20469587cac376c0102527.jpeg" @click="clickDefault2" />
        </div>
      </el-col>
      <el-col :span="4" :xs="24">
        <div style="height: 50px; width: 50px">
          <el-image src="http://img.zcool.cn/community/010e9557f74cbba84a0d304faa657c.jpg" @click="clickDefault3" />
        </div>
      </el-col>
      <el-col :span="4" :xs="24">
        <div style="height: 50px; width: 50px">
          <el-image src="http://5b0988e595225.cdn.sohucs.com/images/20180526/60a21af360d2457c950295839bea8feb.jpeg" @click="clickDefault4" />
        </div>
      </el-col>
      <el-col :span="4" :xs="24">
        <div style="height: 50px; width: 50px">
          <el-image src="https://pic.qqtn.com/up/2019-1/2019010208201525732.jpg" @click="clickDefault5" />
        </div>
      </el-col>
      <el-col :span="4" :xs="24">
        <div style="height: 50px; width: 50px">
          <el-image src="http://img.zcool.cn/community/01a7f7590cd5a3a8012145509a8335.jpg@2o.jpg" @click="clickDefault6" />
        </div>
      </el-col>
    </el-row>
    <br>
    <el-input v-model="urlString" placeholder="点击选择上方图片，或者在这里输入图片url" />
    <br>
    <br>
    <el-button @click="updateUser"> Set Avatar</el-button>

  </el-card>
</template>

<script>

import { updateUser } from '@/api/article'

export default {
  data() {
    return {
      urlString: null
    }
  },
  methods: {
    updateUser() {
      console.log(localStorage.getItem('username'))
      const data = {
        username: sessionStorage.getItem('username'),
        photo: this.urlString
      }
      new Promise((resolve, reject) => {
        updateUser(data).then(response => {
          console.log(response.data)
          resolve()
          setTimeout(() => {
            this.listLoading = false
          }, 1000)
        })
      })
      location.reload()
    },
    clickDefault1() {
      this.urlString = 'http://img.mp.itc.cn/upload/20170808/5861bc790e654d56bc9289c567b44875_th.jpg'
    },
    clickDefault2() {
      this.urlString = 'http://5b0988e595225.cdn.sohucs.com/images/20180312/366885f17a20469587cac376c0102527.jpeg'
    },
    clickDefault3() {
      this.urlString = 'http://img.zcool.cn/community/010e9557f74cbba84a0d304faa657c.jpg'
    },
    clickDefault4() {
      this.urlString = 'http://5b0988e595225.cdn.sohucs.com/images/20180526/60a21af360d2457c950295839bea8feb.jpeg'
    },
    clickDefault5() {
      this.urlString = 'https://pic.qqtn.com/up/2019-1/2019010208201525732.jpg'
    },
    clickDefault6() {
      this.urlString = 'http://img.zcool.cn/community/01a7f7590cd5a3a8012145509a8335.jpg@2o.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button{
  position: relative;
  left: 35%;

}

</style>
