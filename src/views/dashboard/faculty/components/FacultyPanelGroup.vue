<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <router-link to="/faculty-dorm/index">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-building">
            <i class="el-icon-office-building" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              Dorm Manage
            </div>
          </div>
        </div>
      </router-link>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <router-link to="/faculty-user/index">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-team">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              Student Manage
            </div>
          </div>
        </div>
      </router-link>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <router-link to="/faculty-time_range/index">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-form">
            <svg-icon icon-class="form" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              Selection Time
            </div>
          </div>
        </div>
      </router-link>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <router-link to="/data-export/index">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-form">
            <svg-icon icon-class="link" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              Data Export
            </div>
          </div>
        </div>
      </router-link>
    </el-col>
  </el-row>
</template>

<script>

export default {
}
</script>

<style lang="scss" scoped>
.panel-group {

  .card-panel-col {
    padding: 10px;
    margin-bottom: 32px;
    margin-left: 70px;
    margin-right: 80px;
  }

  .card-panel {
    margin-top: 100px;
    height: 100px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-radius: 20px;
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
      font-size: 45px;
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
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px 26px 26px 0;

      .card-panel-text {
        line-height: 18px;
        color: #0000FF;
        font-size: 18px;
      }

      .card-panel-num {
        font-size: 20px;
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
