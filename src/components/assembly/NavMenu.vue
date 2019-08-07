<template>
  <el-aside :class="{aside1: this.$store.state.isCollapse == false,aside2: this.$store.state.isCollapse == true }">
    <el-menu
      :default-active="activeIndex"
      text-color="#909191"
      active-text-color="#834295"
      class="el-menu-vertical-demo"
      :collapse="this.$store.state.isCollapse"
      :unique-opened="true"
      @select="handleSelect"
    >
      <el-submenu index="1">
        <template slot="title" class="el-icon1">
          <i class="el-icon-menu"></i>
          <span>Dashboard</span>
        </template>
        <el-menu-item index="/Page">监控台</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template class="el-icon1" slot="title">
          <i class="el-icon-menu"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/Operational">操作日志</el-menu-item>
        <el-menu-item index="/Approval">审批流程</el-menu-item>
        <el-menu-item index="/Operator">操作员</el-menu-item>
        <el-menu-item index="/Structure">组织架构</el-menu-item>
        <el-menu-item index="/Dictionary">词典管理</el-menu-item>
        <el-menu-item index="/Custom">自定义项管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-view"></i>
          <span>审批管理</span>
        </template>
        <el-menu-item index>待审批</el-menu-item>
        <el-menu-item index>我的申请</el-menu-item>
        <el-menu-item index>我的审批</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>风险管理</span>
        </template>
        <el-menu-item index="/Equipment">设备设施管理</el-menu-item>
        <el-menu-item index="/Jobs">岗位管理</el-menu-item>
        <el-menu-item index="/Process">作业流程</el-menu-item>
        <el-menu-item index="/ExStanderd">执行标准</el-menu-item>
        <el-menu-item index="/RciManage">风控项管理</el-menu-item>
        <el-menu-item index="/RcConfig">风控项配置</el-menu-item>
        <el-menu-item index>风险点管理</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-bell"></i><span>隐患排查</span></template>
        <el-menu-item index="/Reskmanagement">巡查任务管理</el-menu-item>
        <el-menu-item index="/testapply">作业申请</el-menu-item>
        <el-menu-item index="/patroltask">巡检任务</el-menu-item>
        <el-menu-item index="/tempTask">临时任务</el-menu-item>
        <el-menu-item index="/reskcontral">隐患控制</el-menu-item>
        <el-menu-item index="/video">视频监控</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title"><i class="el-icon-time"></i><span>档案管理</span></template>
        <el-menu-item index="/riskshow">风险公示</el-menu-item>
        <el-menu-item index="/natrue">资质管理</el-menu-item>
        <el-menu-item index="/train">培训管理</el-menu-item>
        <el-menu-item index="/safety">安全会议</el-menu-item>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title"><i class="el-icon-tickets"></i><span>报表管理</span></template>
        <el-menu-item index="">安全风险三清单</el-menu-item>
        <el-menu-item index="">分级管控表</el-menu-item>
        <el-menu-item index="">岗位报表</el-menu-item>
        <el-menu-item index="">作业申请报表</el-menu-item>
        <el-menu-item index="">风险分级控制报表</el-menu-item>
        <el-menu-item index="">隐患整改控制报表</el-menu-item>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title"><i class="el-icon-tickets"></i><span>职业健康</span></template>
        <el-menu-item index="/health">健康档案</el-menu-item>
        <el-menu-item index="/manage">体检管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "NavMenu",
  data() {
    return {
      name: "",
      path: "",
      flag: 0
    };
  },
  computed: {
    activeIndex() {
      return this.$route.path;
    }
  },
  mounted() {
    /*动态标签页切换功能开始
     * 实现多页面查看
     * 类似浏览器功能
     * */
    var menu = document.getElementsByClassName("el-menu")[0];
    console.log(menu);
    var _this = this;
    //监听菜单的点击事件
    menu.addEventListener("click", function(e) {
      var ev = e.target || e.srcElement;
      //如果不是li，即具体的菜单项（需要路由的）直接返回
      if (ev.tagName.toLowerCase() != "li") {
        return false;
      }
      //否则选中菜单，改变状态
      _this.$store.commit("changeCheckMenu", true);
      //获取菜单的名字
      _this.name = ev.innerHTML;
      // _this.type=;
      console.log(_this);
      var tags = _this.$store.state.tags;
      //设置标志位
      if (tags.length > 0) {
        for (var i = 0; i < tags.length; i++) {
          if (tags[i].name == _this.name) {
            _this.flag = 1;
            break;
          } else {
            _this.flag = 0;
          }
        }
      } else {
        _this.flag = 0;
      }

      //标志位 为零表示不在数组内，即需要加入数组中
      if (_this.flag == 0) {
        console.log("path", _this);
        _this.$store.commit("addTags", {
          name: _this.name,
          currentPath: _this.path,
          type: "",
          active: true
        });
      }
      //转到点中的路由地址
      _this.$router.push({ path: _this.path });
    });

    /*
     * 动态标签页切换功能结束
     * */
  },
  watch: {
    $route(to, from) {
      this.path = to.path;
      this.$store.commit("changeActive", to.path);
    }
  },
  methods: {
    handleClose(val) {
      //console.log(val)
    },
    handleSelect(key, path) {
      console.log("select:", key, path);
      this.path = key;
    }
  }
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 239px;
}
.el-menu {
  padding-top: 60px;
  min-height: 100%;
}
.aside1 {
position: absolute;
left: 0;
top: 0;
bottom: 0;
z-index: 2;
overflow-x: hidden;
overflow-y: auto;
width: 243px !important;
transition: all ease-in-out 300ms;
}
.aside2 {
position: absolute;
left: 0;
top: 0;
bottom: 0;
z-index: 2;
width: 64px !important;
overflow-x: hidden;
overflow-y: auto;
transition: all ease-in-out 300ms;
}

a {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #909191;
}
.el-aside ul {
  box-sizing: border-box;
}
.el-menu-item.is-active {
  color: #409eff !important;
}
.el-menu-item:hover {
  background-color: rgba(64, 158, 255, 0.2) !important;
}
.el-menu--horizontal > .el-menu-item:hover:hover {
  border-left: #834295 4px solid;
  background-color: rgba(131, 66, 149, 0.2) !important;
}
::-webkit-scrollbar-button {
}
::-webkit-scrollbar-corner {
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #409eff;
}
::-webkit-scrollbar-track {
}
::-webkit-scrollbar-track-piece {
}
::-webkit-scrollbar {
  width: 4px;
  background-color: #04ceff;
}
</style>
