<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.ID" placeholder="用户ID" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <!-- <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select> -->
      <!-- <el-select v-model="listQuery.gender" placeholder="性别" clearable class="filter-item" style="width: 130px" @change="handleFilter">
        <el-option v-for="item in genderTypes" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select> -->
      <!-- <el-select v-model="listQuery.buildingName" placeholder="栋" clearable class="filter-item" style="width: 130px" :loading="loadingBuildings" @change="getFloors">
        <el-option v-for="item in buildings" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.floor" placeholder="楼层" clearable class="filter-item" style="width: 130px" :loading="loadingFloors">
        <el-option v-for="item in floors" :key="item" :label="item" :value="item" />
      </el-select> -->
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="showDialog">
        批量添加
      </el-button>
      <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button> -->
      <!-- <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox> -->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="用户名" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="Title" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
          <el-tag>{{ row.type | typeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="性别" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.gender ? row.gender.gender : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学级" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.degree ? row.degree.degree : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已选宿舍" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.bookedDormitory ? row.bookedDormitory.houseNum : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专业" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.subject ? row.subject.name : '-' }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column v-if="showReviewer" label="Reviewer" width="110px" align="center">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.reviewer }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="Imp" width="80px">
        <template slot-scope="{row}">
          <svg-icon v-for="n in + row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="Readings" align="center" width="95">
        <template slot-scope="{row}">
          <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{ row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="Remaining" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.bed-row.bookedNum }}
          </el-tag>
        </template>
      </el-table-column> -->
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <!-- <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
            bookmark
          </el-button>
          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            unmark
          </el-button> -->
          <el-button v-if="selected != true" size="mini" type="danger" @click="handleDelete(row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <!-- <el-form-item label="区域" prop="type">
          <el-select v-model="temp.location" class="filter-item" placeholder="Please select">
            <el-option v-for="item in genderTypes" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item> -->
        <el-form-item label="性别" prop="gender">
          <el-select v-model="temp.gender" class="filter-item" placeholder="Please select">
            <el-option v-for="item in genders" :key="item.gender.id" :label="item.gender.gender" :value="item.gender" />
          </el-select>
        </el-form-item>
        <el-form-item label="学级" prop="degree">
          <el-select v-model="temp.degree" class="filter-item" placeholder="Please select">
            <el-option v-for="item in degrees" :key="item.degree.id" :label="item.degree.degree" :value="item.degree" />
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="subject">
          <el-select v-model="temp.subject" class="filter-item" placeholder="Please select">
            <el-option v-for="item in subjectTypes" :key="item.id" :label="item.name" :value="item" />
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="Imp">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
        </el-form-item> -->
        <!-- <el-form-item label="Remark">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="Import Excel" :visible.sync="uploadDialogVisible">
      <upload-excel-component :on-success="handleUpload" :before-upload="beforeUpload" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDialogVisible = false">
          取消
        </el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchUserList, fetchPv, createDorm, updateUser, uploadUser } from '@/api/article'
import { findBuilding, findFloor, selectRoom, deleteUser } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import XLSX from 'xlsx'

const genderTypes = [
  {
    gender: 'male',
    display_name: '男'
  },
  {
    gender: 'female',
    display_name: '女'
  }
]

const gradeTypes = [
  {
    degree: 'postgraduate',
    display_name: '硕士研究生'
  },
  {
    degree: 'doctorate',
    display_name: '博士研究生'
  }
]

const subjectTypes = [
  {
    id: '070101',
    name: '数学与应用数学'
  },
  {
    id: '070201',
    name: '物理学'
  },
  {
    id: '070301',
    name: '化学'
  },
  {
    id: '070701',
    name: '海洋科学'
  },
  {
    id: '070801',
    name: '地球物理学'
  },
  {
    id: '071001',
    name: '生物科学'
  },
  {
    id: '071003',
    name: '生物信息学'
  },
  {
    id: '071201',
    name: '统计学'
  },
  {
    id: '080101',
    name: '理论与应用力学'
  },
  {
    id: '080201',
    name: '机械工程'
  },
  {
    id: '080401',
    name: '材料科学与工程'
  },
  {
    id: '080901',
    name: '计算机科学与技术'
  },
  {
    id: '080907T',
    name: '智能科学与技术'
  },
  {
    id: '080910T',
    name: '数据科学与大数据技术'
  },
  {
    id: '100103T',
    name: '生物医学科学'
  }
]

const degrees = [
  {
    degree: {
      id: 1,
      degree: 'postgraduate'
    }
  },
  {
    degree: {
      id: 2,
      degree: 'doctorate'
    }
  }
]

const genders = [
  {
    gender: {
      id: 1,
      gender: 'male'
    }
  },
  {
    gender: {
      id: 2,
      gender: 'female'
    }
  }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = genderTypes.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'DormSelect',
  components: { Pagination, UploadExcelComponent },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      allList: [],
      buildings: [],
      floors: [],
      total: 0,
      listLoading: true,
      loadingBuildings: true,
      loadingFloors: true,
      selected: false,
      listQuery: {
        // importance: undefined,
        page: 1,
        limit: 20,
        id: null,
        gender: null,
        sort: '+'
        // sort: '+id'
      },
      templistQuery: {
        // importance: undefined,
        page: 1,
        limit: 20,
        id: null,
        gender: null,
        sort: '+'
        // sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      genderTypes,
      gradeTypes,
      subjectTypes,
      genders,
      degrees,
      sortOptions: [{ label: '正序', key: '+' }, { label: '倒序', key: '-' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        gender: {
          gender: null,
          id: null
        },
        degree: {
          degree: null,
          id: null
        },
        subject: {
          id: null,
          name: null
        }
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      uploadDialogVisible: false,
      pvData: [],
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // houseNum: [{ required: true, message: '需要房间号', trigger: 'change' }],
        // floor: [{ required: true, type: 'number', message: '需要楼层', trigger: 'change' }],
        // buildingName: [{ required: true, message: '需要栋', trigger: 'change' }],
        // location: [{ required: true, message: '需要位置', trigger: 'change' }],
        // bed: [{ required: true, type: 'number', message: '需要床位数量', trigger: 'change' }]
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        // title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
    this.getBuildings()
    this.getFloors()
  },
  methods: {
    getList() {
      this.templistQuery = Object.assign({}, this.listQuery)
      this.templistQuery.page -= 1
      this.listLoading = true
      fetchUserList(this.templistQuery).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements
        setTimeout(() => {
          this.listLoading = false
        }, 0.3 * 1000)
      })
    },
    async handleLocationChange() {
      await this.getBuildings()
      await this.getFloors()
    },
    async getBuildings() {
      this.loadingBuildings = true
      findBuilding(this.listQuery).then(response => {
        // console.log("1")
        this.buildings = response.data
        this.loadingBuildings = false
        // setTimeout(() => {
        //   this.loadingBuildings = false
        // }, 1 * 1000)
      })
    },
    async getFloors() {
      this.loadingFloors = true
      findFloor(this.listQuery).then(response => {
        this.floors = response.data
        setTimeout(() => {
          this.loadingFloors = false
        }, 0.5 * 1000)
      })
    },
    handleFilter() {
      this.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      this.listQuery.sort = this.listQuery.sort === '+' ? '-' : '+'
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        gender: {
          gender: null,
          id: null
        },
        degree: {
          degree: null,
          id: null
        },
        subject: {
          id: null,
          name: null
        }
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createDorm(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.gender = this.temp.gender.gender
      this.temp.degree = this.temp.degree.degree
      // this.temp.subject.name = row.subject.name
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      console.log(this.temp)
      console.log(this.temp.subject.name)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          var tempData = Object.assign({}, this.temp)
          // tempData.degree = this.degrees.find(item => item.degree.degree === tempData.degree)?.degree
          // tempData.gender = this.genders.find(item => item.gender.gender === tempData.gender)?.gender
          console.log(tempData)
          updateUser(tempData).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    showDialog() {
      this.uploadDialogVisible = true
    },
    handleUpload(data) {
      // { results, header }
      // this.tableData = results
      // this.tableHeader = header
      // console.log(results)
      // console.log(header)
      // console.log(JSON.stringify(results))
      // const results2d = results.map(row => {
      //   return Object.values(row)
      // })
      // const workbook = XLSX.utils.book_new()
      // const worksheet = XLSX.utils.aoa_to_sheet(results2d)
      // // 设置Header
      // if (header && header.length > 0) {
      //   worksheet["!ref"] = XLSX.utils.encode_range({
      //     s: {c:0,r:0},
      //     e: {c:header.length-1, r:0}
      //   })
      // }
      // XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
      // const wbout = XLSX.write(workbook, {bookType:'xlsx', type:'binary'})
      // const blob = new Blob([wbout], { type: 'multipart/form-data' });
      uploadUser(data).then(() => {
        this.getList
        this.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 2000
        })
      })
      this.dialogFormVisible = false
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleChoose(row) {
      selectRoom(row).then(response => {
        this.$notify({
          title: 'Success',
          message: 'Choose Successfully',
          type: 'success',
          duration: 2000
        })

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
      // this.list.splice(index, 1)
    },

    handleDelete(row) {
      deleteUser(row.username).then(response => {
        this.listLoading = true
        this.getList()
        this.$notify({
          title: 'Success',
          message: 'delete Successfully',
          type: 'success',
          duration: 2000
        })

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
      // this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+` ? 'ascending' : 'descending'
    }
  }
}
</script>
