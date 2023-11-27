<template>
  <div class="view-dorm-container">
    <el-row :gutter="20" style="margin-top:50px;">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="text-align: center;display:block;">二期</span>
            <count-to :start-val="0" :end-val="244" :duration="2600" class="card-panel-num" />
          </div>
          <div class="component-item">
            <el-button v-waves type="primary">
              Enter
            </el-button>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="text-align: center;display:block;">湖畔</span>
            <count-to :start-val="0" :end-val="51" :duration="2600" class="card-panel-num" />
          </div>
          <div class="component-item">
            <el-button v-waves type="primary">
              Enter
            </el-button>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="text-align: center;display:block;">荔园</span>
            <count-to :start-val="0" :end-val="42" :duration="2600" class="card-panel-num" />
          </div>
          <div class="component-item">
            <el-button v-waves type="primary">
              Enter
            </el-button>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="text-align: center;display:block;">欣园</span>
            <count-to :start-val="0" :end-val="107" :duration="2600" class="card-panel-num" />
          </div>
          <div class="component-item">
            <el-button v-waves type="primary">
              Enter
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import waves from '@/directive/waves/index.js'
import CountTo from 'vue-count-to' // 水波纹指令

export default {
  name: 'ViewDorm',
  components: {
    CountTo
  },
  directives: {
    waves
  }
}
</script>

<style scoped>
.view-dorm-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.card-panel-num{
  text-align: center;display:block;
}
.box-card{
  height: 200px;
  cursor: pointer;
  font-size: 30px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
  border-color: rgba(0, 0, 0, .05);
}
.component-item{
  min-height: 100px;
  text-align: center;display:block;
}
</style>
