<template>
  <div class="content">
    <Header title="风险管理" text="设备设施管理"></Header>
    <div class="main">
      <el-row>
        <el-col :span="4">
          <div class="ad">
            <el-button type="text" size="mini">+</el-button>
          </div>
          <el-tree :data="treedata" accordion :props="defaultProps" :expand-on-click-node="true">
            <span class="custom-tree-node" slot-scope="{node,data}">
              <span>{{node.label}}</span>
              <span>
                <el-button size="mini" type="text">+</el-button>
                <el-button size="mini" type="text">-</el-button>
                <el-button size="mini" type="text">新建设备</el-button>
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="19">
          <div class="top">
            <div>
              <el-input placeholder="请输入设备名称"></el-input>
              <el-button type="primary">查询</el-button>
              <el-button type="primary">导出Excel</el-button>
            </div>
          </div>
          <el-table :data="tdab" border height="500">
            <el-table-column type="expand">
              <template slot-scope="prop"></template>
            </el-table-column>
            <el-table-column v-for="(i,e) in tbla" :label="i.label" :key="e" :prop="i.pp"></el-table-column>
            <el-table-column label="操作">
              <el-button type="text">修改</el-button>
              <el-button type="text">删除</el-button>
            </el-table-column>
          </el-table>
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
      tbla: [
        { label: "设备编号", pp: "num" },
        { label: "名称", pp: "nm" },
        { label: "设备类别", pp: "dty" },
        { label: "使用单位", pp: "unit" }
      ],
      treedata: [
        {
          label: "1",
          children: [
            {
              label: "1-1",
              children: [{ label: "1-1-1" }, { label: "1-1-2" }]
            },
            { label: "1-2", children: [{ label: "1-2-1" }] },
            { label: "1-3" },
            { label: "1-4" }
          ]
        }
      ],
      tdab: [
        {num: "asdasda",nm: "male",dty: "asdasda1111",unit: "asdla"},
        {num: "asdasda",nm: "male",dty: "asdasda1111",unit: "asdla"},
        {num: "asdasda",nm: "male",dty: "asdasda1111",unit: "asdla"},
        {num: "asdasda",nm: "male",dty: "asdasda1111",unit: "asdla"},
        {num: "asdasda",nm: "male",dty: "asdasda1111",unit: "asdla"},
        {num: "asdasda",nm: "male",dty: "asdasda1111",unit: "asdla"},
        {num: "asdasda",nm: "male",dty: "asdasda1111",unit: "asdla"},
        {num: "asdasda",nm: "male",dty: "asdasda1111",unit: "asdla"},
        {num: "asdasda",nm: "male",dty: "asdasda1111",unit: "asdla"},
        {num: "asdasda",nm: "male",dty: "asdasda1111",unit: "asdla"},
        {num: "asdasda",nm: "male",dty: "asdasda1111",unit: "asdla"},
        {num: "asdasda",nm: "male",dty: "asdasda1111",unit: "asdla"},
      ],
      defaultProps: { children: "children", label: "label" }
    };
  }
};
</script>
<style scoped>
.whi {
  background-color: #fff;
  width: 100%;
}
.content {
  overflow: hidden;
  height: 100%;
}
.el-row {
  overflow: auto;
}
.main {
  margin-left: 25px;
  overflow: hidden;
}
.el-table{
  overflow: auto
}
.el-tree {
  height: 500px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding-right: 8px;
}
.top::after {
  content: "";
  display: block;
  clear: both;
}
.top {
  margin-bottom: 10px;
  background: #fff;
}
.ad {
  width: 100%;
}
.ad::after {
  content: "";
  display: block;
  clear: both;
}
.el-col-4 {
  background: #fff;
  border-top: 2px solid #049eff;
  border-radius: 3px;
  max-height: ;
}
.top > div {
  width: 50%;
  float: right;
  padding: 10px 0 15px 0;
}
.top > div > .el-input {
  width: 45%;
}
.el-col-19 {
  margin-left: 25px;
  border-top: 2px solid #049eff;
  border-radius: 5px;
}
.el-col-4 > .ad > .el-button {
  margin-right: 10px;
  padding-bottom: 0;
  float: right;
}
</style>
