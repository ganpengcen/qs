<template>
  <div class="content">
    <Header title="风险管理" text="风控项配置"></Header>
    <div class="main">
      <el-row>
        <el-col :span="5">
          <el-tabs type="border-card">
            <el-tab-pane label="作业流程">
              <div class="sech">
                <el-input></el-input>
                <el-button type="primary">搜索</el-button>
                <ul>
                  <li
                    v-for="(i,e) in list"
                    :key="e"
                    :class="active==e?'active':''"
                    @click="getI(e)"
                  >{{i.opt}}</li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="岗位管理">
              <div class="sech">
                <el-input></el-input>
                <el-button type="primary">搜索</el-button>
                <ul>
                  <li
                    v-for="(i,e) in list"
                    :key="e"
                    :class="active1==e?'active':''"
                    @click="getIx(e)"
                  >{{i.opt}}</li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="设备设施">
              <div class="sech">
                <el-input></el-input>
                <el-button type="primary">搜索</el-button>
                <ul>
                  <li
                    v-for="(i,e) in list"
                    :key="e"
                    :class="active2==e?'active':''"
                    @click="getIy(e)"
                  >{{i.opt}}</li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="18">
          <div class="top">
            <div class="srh">
              <span>风控项类别</span>
              <el-cascader v-model="chose" :options="options"></el-cascader>
              <span>风控项</span>
              <el-cascader></el-cascader>
              <el-button type="primary">增加</el-button>
            </div>
          </div>
          <div class="tb">
          <el-table height="calc(100vh - 325px)" :data="cfigdata" border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
            <el-table-column label="风控项编号" prop="fknum"></el-table-column>
            <el-table-column label="名称" prop="fkname"></el-table-column>
            <el-table-column label="类别" prop="fktype"></el-table-column>
            <el-table-column label="操作">
              <el-button type="text" @click="del()">删除</el-button>
            </el-table-column>
          </el-table></div>
          <div>
            <el-pagination :total="cfigdata.length" :page-size="5" layout="prev,pager,next"></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    
  </div>
</template>
<script>
import Header from "../assembly/Header";
export default {
  components: {
    Header
  },
  data() {
    return {
      list: [
        { opt: "1" },
        { opt: "2" },
        { opt: "3" },
        { opt: "4" },
        { opt: "5" },
        { opt: "6" },
        { opt: "7" }
      ],
      active: -1,
      active1: -1,
      active2: -1,
      chose: [],
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      cfigdata:[
        {fknum:'1',fkname:'askdjas',fktype:'asjhdas'},
        {fknum:'1',fkname:'askdjas',fktype:'asjhdas'},
        {fknum:'1',fkname:'askdjas',fktype:'asjhdas'},
        {fknum:'1',fkname:'askdjas',fktype:'asjhdas'},
        {fknum:'1',fkname:'askdjas',fktype:'asjhdas'},
        {fknum:'1',fkname:'askdjas',fktype:'asjhdas'},
        {fknum:'1',fkname:'askdjas',fktype:'asjhdas'},
        {fknum:'1',fkname:'askdjas',fktype:'asjhdas'},        
      ]
    };
  },
  methods: {
    getI(e) {
      this.active = e;
    },
    getIx(e) {
      this.active1 = e;
    },
    getIy(e) {
      this.active2 = e;
    },
    del() {
      this.$confirm("将要执行删除操作,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
  }
};
</script>
<style scoped>
.tb{
  overflow: auto;
  height: calc(100% - 100px)
}
.content{
  overflow: hidden;
  height: 100%;
}
.active {
  color: #409eff !important;
}
.main {
  margin-left: 25px;
  overflow: hidden;
  height: calc(100% - 85px);
}
.el-col-5 {
  overflow: auto;
  height: calc(100vh - 270px)
}
.el-table{
  overflow: auto
}
.el-row{
  display: flex
}
.sech .el-input {
  width: 69%;
}
.sech li {
  list-style: none;
  cursor: pointer;
}
.el-col-18{
  margin-left: 20px;
  width: 75.5%;
  
}
.sech ul {
  padding-left: 0;
}
.top {
  background: #fff;
  border-top: 2px solid #409eff;
  border-radius: 5px;
}
.top::after{
  content: '';
  display: block;
  clear: both;
}
.srh{
  margin: 15px 20px 15px 0;
  float: right
}
.el-table{
  margin-top: 10px;
}
.el-tabs{
  box-shadow: none;
  border: none
}
.el-pagination{
  height: 25px;
  text-align: right
}
</style>
