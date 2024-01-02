<template>
  <el-card style="margin-bottom:20px; margin-right: 20px">
    <div slot="header" class="clearfix">
      <span>Bookmarks</span>
    </div>

    <el-container>

      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="location" label="location" width="80" />
          <el-table-column prop="buildingName" label="buildingName" width="120" />
          <el-table-column prop="floor" label="floor" width="80" />
          <el-table-column prop="houseNum" label="houseNum" width="100" />
          <el-table-column prop="gender" label="gender" width="100" />
          <el-table-column prop="degree" label="degree" width="140" />
          <el-table-column prop="bed" label="bed" width="80" />

        </el-table>
      </el-main>
    </el-container>

  </el-card>
</template>

<script>

import { getBookmark } from '@/api/article'

export default {
  data() {
    return {

      tableData: [

      ]

    }
  },
  mounted() {
    this.initMethod()
  },
  methods: {
    initMethod() {
      console.log(localStorage.getItem('username'))
      new Promise((resolve, reject) => {
        getBookmark(sessionStorage.getItem('username')).then(response => {
          console.log(response.data)
          if (response.data.length >= 1) {
            for (let i = 0; i < response.data.length; i++) {
              const item = {
                location: 'null',
                buildingName: 'null',
                floor: 'null',
                houseNum: 'null',
                gender: 'null',
                degree: 'null',
                bed: 'null'
              }
              item.location = response.data[i].location
              item.buildingName = response.data[i].buildingName
              item.floor = response.data[i].floor
              item.houseNum = response.data[i].houseNum
              item.gender = response.data[i].gender.gender
              item.degree = response.data[i].degree.degree
              item.bed = response.data[i].bed
              // console.log('???')
              // console.log(item)
              this.$data.tableData.push(item)
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
.el-card{
  height: 255px;
  overflow: auto;
  width:840px
}

</style>
