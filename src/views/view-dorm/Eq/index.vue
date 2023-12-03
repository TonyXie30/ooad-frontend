<template>
  <div class="eq-dorm-container">

    <div class="eq-dorm-image">
      <img src="https://newshub.sustech.edu.cn/uploads/images/2019/08/2019081315023315-600x400.jpg">
    </div>

    <el-row :gutter="20" style="margin-top:50px;">
      <el-col :span="6">
        <router-link to="/view-dorm/Eq11">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="text-align: center;display:block;">Block 11</span>
              <count-to :start-val="0" :end-val="10" :duration="2600" class="card-panel-num" />
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
            <span style="text-align: center;display:block;">Block 13</span>
            <count-to :start-val="0" :end-val="20" :duration="2600" class="card-panel-num" />
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
            <span style="text-align: center;display:block;">Block 15</span>
            <count-to :start-val="0" :end-val="50" :duration="2600" class="card-panel-num" />
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
            <span style="text-align: center;display:block;">Block 16</span>
            <count-to :start-val="0" :end-val="60" :duration="2600" class="card-panel-num" />
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
import CountTo from 'vue-count-to'

export default {
  name: 'EQDorm',
  components: {
    CountTo
  },
  directives: {
    waves
  }
}
</script>

<style scoped>
.eq-dorm-container {
  background-color: #f0f2f5;
  padding: 20px; /* Reduced padding to decrease blank space */
  min-height: calc(100vh - 84px);
  .eq-dorm-image {
    text-align: center;
    display: block;
    img {
      width: 50%; /* Increased width to make the image larger */
      height: auto; /* Auto height to maintain aspect ratio */
      transition: all 0.2s linear;
    }
  }
  .card-panel-num{
    text-align: center;display: block;
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
}
</style>
