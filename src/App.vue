<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {

  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin:0 0;
    padding: 0 0;
  }
  .el-popover{
    min-width: 100px !important;
  }
  html,body{
    height: 100%;
    background-color: #f4f4f4;
    margin: 0 0;
    padding: 0 0;
    /* overflow:scroll auto; */
  }
  .el-dialog__body {
    background-color: #f4f4f4;
    padding: 10px;
  }
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 46px;
    font-size: 13px;
    text-align: center;
    font-weight: 700;
  }
  .el-table__body tr,
  .el-table__body td {
    height: 60px;
    font-size: 11px;
    text-align: center;
  }

  .el-tabs--left .el-tabs__item.is-left{
    width: 200px !important;
  }
  .el-dialog__wrapper{
  overflow-y: hidden;
  height: 100%
}
.el-dialog{
  overflow-y: hidden
}
</style>
