<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>Recommend roommate</span>
    </div>

    <!--    <br><br><br>-->
    <!--    <div class="username">{{ user[0].username }}</div>-->
    <!--    <br>-->

    <!--    <div >{{ "subject: "+user[0].subject+'; wake up time: '+user[0].wakeupTime+'; bed time: '+user[0].bedTime }}</div>-->
    <!--    <br><br>-->
    <!--    <div class="username">{{ user[1].username }}</div>-->
    <!--    <br>-->
    <!--    <div >{{ user[1].subject+','+user[1].wakeupTime+','+user[1].bedTime }}</div>-->
    <!--    <br><br>-->
    <!--    <div class="username">{{ user[2].username }}</div>-->
    <!--    <br>-->
    <!--    <div >{{ user[2].subject+','+user[2].wakeupTime+','+user[2].bedTime }}</div>-->
    <!--    <br><br>-->
    <el-container>
      <el-header>
        <span class="title">Recommend roommates based on their major and schedule</span>
        <el-button type="primary" class="button" @click.native.prevent="update">
          Update
        </el-button>
      </el-header>

      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="username" label="username" width="180" />
          <el-table-column prop="subject" label="subject" width="180" />
          <el-table-column prop="wakeupTime" label="wakeupTime" width="200" />
          <el-table-column prop="bedTime" label="bedTime" width="200" />
        </el-table>
      </el-main>
    </el-container>

  </el-card>
</template>

<script>

import { recommend } from '@/api/article'

export default {
  data() {
    return {

      tableData: [
        {
          username: 'none',
          subject: 'null',
          wakeupTime: 'null',
          bedTime: 'null'
        },
        {
          username: 'none',
          subject: 'null',
          wakeupTime: 'null',
          bedTime: 'null'
        },
        {
          username: 'none',
          subject: 'null',
          wakeupTime: 'null',
          bedTime: 'null'
        },
        {
          username: 'none',
          subject: 'null',
          wakeupTime: 'null',
          bedTime: 'null'
        },
        {
          username: 'none',
          subject: 'null',
          wakeupTime: 'null',
          bedTime: 'null'
        },
        {
          username: 'none',
          subject: 'null',
          wakeupTime: 'null',
          bedTime: 'null'
        }
      ]

    }
  },
  methods: {
    update() {
      new Promise((resolve, reject) => {
        recommend(localStorage.getItem('username')).then(response => {
          console.log(response.data)
          for (let i = 0; i < 6; i++) {
            if (i < response.data.length) {
              this.$data.tableData[i].username = response.data[i].username
              this.$data.tableData[i].subject = response.data[i].subject
              this.$data.tableData[i].bedTime = response.data[i].bedTime
              this.$data.tableData[i].wakeupTime = response.data[i].upTime
            } else {
              this.$data.tableData[i].username = 'none'
              this.$data.tableData[i].subject = 'null'
              this.$data.tableData[i].bedTime = 'null'
              this.$data.tableData[i].wakeupTime = 'null'
            }
          }

          resolve()
          setTimeout(() => {
            this.listLoading = false
          }, 1000)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.username{
  font-weight: bold;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}
.button{
  top: 17%;
  right: 5%;
  position: absolute;
}
.title{
  font-weight: bold;
  font-size: 20px;
}

.el-aside {
  color: #333;
}

</style>
