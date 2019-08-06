<template>
  <el-container>
    <el-header :class="{ header_collapsing: this.$store.state.isCollapse == false, header_collapsed: this.$store.state.isCollapse == true }">
      <el-row>
        <el-col :span="5">
          <h2>安全风险平台</h2>
          <!-- <div class="btn-left">
            <img src="../../../static/img/logo.png"> 
          </div> -->
        </el-col>
        <el-col :span="1" class="photo-right">
          <img src="../../../static/img/qq.png" alt="">
        </el-col>
        <!-- <el-col :span="1" class="btn-right ">
          <img src="../../../static/img/twotone-notifications-24px@2x.png" alt="">
        </el-col> -->
      <el-col :span="1" class="btn-right">
          <img src="../../../static/img/baseline-apps-24px@2x.png" alt="" @click="handleClick">
      </el-col>
      </el-row>
    </el-header>
  </el-container>
</template>

<script>
    export default {
      name: "TopBar",
      methods: {
        // 改变菜单栏折叠的状态
        handleClick() {
          this.$store.commit("change")
        }
      }
    }
</script>

<style scoped>
  /* 菜单未折叠时顶部的样式 */
  .header_collapsing {
    background: #409eff;
    min-width: 1290px;
    min-height: 64px;
    border-bottom: 1px solid #e4eaec;
  }
  /* 菜单折叠后顶部的样式 */
  .header_collapsed {
    background: #409eff;
    min-width: 1255px;
    min-height: 64px;
    border-bottom: 1px solid #e4eaec;
    /* border: darkgray 1px solid; */
  }
  .nav-right {
    text-align: right;
  }
  .el-container {
    position: relative;
    z-index: 99;
    min-width: 1150px;
  }
  .btn-left {
    width: 10%;
    padding: 0 auto;
    margin-top: 10px;
  }
  .btn-left img{
    padding: 0 auto;
    height: 45px;
  }
  .btn-right{
    float: right;
    width: 40px;
    padding-top: 20px;
  }
  .btn-right img {
    width: 20px;
    height: 20px;
  }
  .photo-right{
    float: right;
    padding-top: 10px;
  }
  .photo-right img{
    width: 40px;
    height: 40px;
    border-radius : 50%;
  }
  h2{
    color: #fff;
    font-size: 28px;
    margin-top: 20px;
  }
</style>
