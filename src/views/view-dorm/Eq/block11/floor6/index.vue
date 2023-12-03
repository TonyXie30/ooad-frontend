<template>
  <div class="eq11-floor6-dorm-container">

    <el-row :gutter="20" style="margin-top:50px;">
      <el-col :span="6">
        <router-link to="/view-dorm/Eq11-601">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="text-align: center;display:block;">601</span>
            </div>
            <div class="component-item">
              <el-button v-waves type="primary">
                Enter
              </el-button>
            </div>
          </el-card>
        </router-link>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="text-align: center;display:block;">602</span>
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
            <span style="text-align: center;display:block;">603</span>
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
            <span style="text-align: center;display:block;">604</span>
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
import waves from '@/directive/waves'

export default {
  name: 'EQDorm',
  directives: {
    waves
  }
}
</script>

<style scoped>
.eq11-floor6-dorm-container {
  background-color: #f0f2f5;
  padding: 20px; /* Reduced padding to decrease blank space */
  min-height: calc(100vh - 84px);
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
}
</style>
