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
                    v-for="(i,e) in textflow"
                    :key="i.ID"
                    :class="active==e?'active':''"
                    @click="getI(i,e)"
                  >{{i.Name}}</li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="岗位管理">
              <div class="sech">
                <el-input></el-input>
                <el-button type="primary">搜索</el-button>
                <ul>
                  <li
                    v-for="(i,e) in postSelector"
                    :key="i.PostID"
                    :class="active1==e?'active':''"
                    @click="getIx(i,e)"
                  >{{i.PostName}}</li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="设备设施">
              <div class="sech">
                <el-input></el-input>
                <el-button type="primary">搜索</el-button>
                <ul>
                  <li
                    v-for="(i,e) in FacilitySelector"
                    :key="i.ID"
                    :class="active2==e?'active':''"
                    @click="getIy(i,e)"
                  >{{i.Name}}</li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="18">
          <div class="top">
            <div class="srh">
              <span>风控项类别</span>
                <el-cascader :options="SortTree"  v-model="StandardType" :props="prp" @change="change"></el-cascader>
              <span>风控项</span>
              <el-select v-model="Standard" multiple>
                <el-option v-for="i,b in Standardselector" :key="i.ID" :label="i.Name" :value="i.ID"></el-option>
              </el-select>
              <el-button type="primary" @click="addDangerRelation">增加</el-button>
            </div>
          </div>
          <div class="tb">
          <el-table height="calc(100vh - 350px)" :data="table" border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
            <el-table-column label="风控项编号" prop="Code"></el-table-column>
            <el-table-column label="名称" prop="Name"></el-table-column>
            <el-table-column label="类别" prop="DangerSortName"></el-table-column>
            <el-table-column label="操作">
              <div slot-scope="scope">
               <el-button type="text" @click="del(scope.row.ID)">删除</el-button>
              </div>
            </el-table-column>
          </el-table></div>
          <div class="pge">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="page.index"
              :page-size="page.size"
              :page-sizes="[3, 7, 30, 50]"
              layout="total, sizes, prev, pager, next, jumper"
              :total.sync="page.total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>
<script>
  const GUID ='00000000-0000-0000-0000-000000000000'
import Header from "../assembly/Header";
export default {
  components: {
    Header
  },
  data() {
    return {
      textflow:[],
      postSelector:[],
      FacilitySelector:[],
      SortTree:[],
      prp: { children: "Children", label: "SortName",checkStrictly: true,value:"ID"},
      Standard:[],
      StandardType:[],
      riskSelector:[],
      Standardselector:[],
      page:{
        index:1,
        size:3,
        total:0
      },
      parentID:'',
      table:[],


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
    getOpreationItems(){
      this.$get(this.api.TextFlow.getOpreationItems).then(res=>{
        console.log(';获取作业流程返回值：',res)
        if(res.data.State === 200){
          this.textflow = res.data.Data
        }
      })
    }, //获取作业流程
    getPostSelector(){
      this.$get(this.api.getPostSelector).then(res=>{
        console.log(';获取岗位返回值：',res)
        if(res.data.State === 200){
          this.postSelector = res.data.Data
        }
      })
    },//获取岗位
    getFacilitySelector(){
      this.$get(this.api.getFacilitySelector).then(res=>{
        console.log(';获取设备设施返回值：',res)
        if(res.data.State === 200){
          this.FacilitySelector = res.data.Data
        }
      })
    }, //获取设备设施
    getDangerSortTree(ID){
      this.$get(this.api.getDangerSortTree+ID).then(res=>{
        console.log('风险类bie树',res)
        if(res.data.State === 200){
          this.SortTree = res.data.Data
        } else {
          ths.$message({
            type:'error',
            message:res.data.Msg
          })
        }
      })
    },
    change(value) {
      let da = ''
      console.log('value',value)
      if(value) {
        if (value.length > 0) {
          da = value[value.length - 1]
          this.$get(this.api.getDangerListL + da).then(res => {
            if (res.data.State === 200) {
              console.log('节点改变:', res)
              this.Standardselector = res.data.Data
            }
          })
        } else {
          return false;
        }
      }
    }, //树节点改变
    addDangerRelation(){
      let param ={
        "SubjectID": this.parentID,
        "DangerIDs":this.Standard
      }
      console.log('新建参数:',param)
      this.$post(this.api.addDangerRelation,param).then(res=>{
        console.log('新建返回值',res)
        if(res.data.State === 200){
          this.StandardType = ''
          this.Standard = []
          this.getDangerRelationsPage(this.parentID)
          this.$message({
            type:'success',
            message:'添加成功'
          })
        }else{
          this.$message({
            type:'error',
            message:res.data.Msg
          })
        }
      })
    }, //新建
    getDangerRelationsPage(ID){
      let param = {
        "PageSize": this.page.size,
          "PageIndex": this.page.index-1,
          "KeyWord": "",
          "Query": ID,
          "OrderString": "",
          "ToExcel": false
      }
      console.log('分页参数:',param)
  this.$post(this.api.getDangerRelationsPage,param).then(res=>{
    console.log('分页返回值:',res)
    if(res.data.State === 200){
      this.page.total = res.data.Data.Items
      this.table = res.data.Data.Data
    }
  })
    },// 分页获取列表
    handleSizeChange(val) {   //修改分页条数
      this.page.size = val
      console.log('分页数改变')
      console.log('分页数:',this.page.size)
      this.getDangerRelationsPage(this.parentID)
    },  //分页数目改变
    handleCurrentChange(val) {   //当前展示页
      this.page.index = val
      this.getDangerRelationsPage(this.parentID)
    },  //当前页改变
    getI(i,e) {
      this.active = e;
      this.parentID=i.ID
      this.getDangerRelationsPage(i.ID)
    },
    getIx(i,e) {
      this.active1 = e;
      this.parentID = i.ID
      this.getDangerRelationsPage(i.ID)
    },
    getIy(i,e) {
      this.active2 = e;
      this.parentID = i.ID
      this.getDangerRelationsPage(i.ID)
    },
    del(ID) {
      this.$confirm("将要执行删除操作,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
        this.$get(this.api.delDangerRelation+ID).then(res=>{
          if(res.data.State === 200) {
            this.getDangerRelationsPage(this.parentID)
            this.$message({
              type: "success",
              message: "删除成功"
            })
          } else{
            this.$message({
              type:'error',
              messgae:res.data.Msg
            })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
  },
  created(){
    this.getOpreationItems()
    this.getPostSelector()
    this.getFacilitySelector()
    this.getDangerSortTree(GUID)
  }
};
</script>
<style scoped>
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
  width: calc(100% - 50px)
}
.el-col-5 {
  overflow: auto;
  height: calc(100vh - 270px);

}
.el-table{
  overflow: auto
}
.el-row{
  display: flex
}
.sech .el-input {
  width: 58%;
}
.sech li {
  list-style: none;
  cursor: pointer;
}
.el-col-18{
  margin-left: 20px;
  width: calc(80% - 31px);

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
  margin-top: 15px;
  margin-bottom: 5px
}
.el-tabs{
  box-shadow: none;
  border: none
}
.el-pagination{
  height: 25px;
  text-align: right
}
.pge {
  height: 31px;
  text-align: right;
  background: #fff;
}
</style>
