<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <router-link to="/view-dorm/zones">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-building">
            <i class="el-icon-office-building" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              View Dorm
            </div>
          </div>
        </div>
      </router-link>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Messages
          </div>
          <count-to :start-val="0" :end-val="30" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <router-link to="/dormSelect/index">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-form">
            <svg-icon icon-class="form" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              Dorm Selection
            </div>
          </div>
        </div>
      </router-link>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <router-link to="/team/team-page">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-team">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              Team
            </div>
          </div>
        </div>
      </router-link>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 200px;

  .card-panel-col {
    margin-bottom: 32px;
    margin-left: 70px;
    margin-right: 80px;
  }

  .card-panel {
    height: 90px;
    width: auto;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    opacity: 0.85;

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-building {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-form {
        background: #f4516c;
      }

      .icon-team {
        background: #34bfa3
      }
    }

    .icon-building {
      font-size: 43px;
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-form {
      color: #f4516c;
    }

    .icon-team {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 40px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px 26px 26px 0;

      .card-panel-text {
        line-height: 18px;
        color: #222222;
        font-size: 18px;
        margin-bottom: 10px;
      }

      .card-panel-num {
        font-size: 18px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
