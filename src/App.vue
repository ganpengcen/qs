<template>
  <div id="app">
    <router-view v-if="flag" />
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      flag: true
    };
  },
  methods: {
    reload() {
      this.flag = false;
      this.$nextTick(() => {
        this.flag = true;
      });
    }
  }
};
Date.prototype.format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 0;
  padding: 0 0;
}
.el-popover {
  min-width: 100px !important;
}
html,
body {
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

.el-tabs--left .el-tabs__item.is-left {
  width: 200px !important;
}
.el-dialog__wrapper {
  overflow-y: hidden;
  height: 100%;
}
.el-dialog {
  overflow-y: hidden;
}
</style>
