<template>
  <div class="content">
    <Header title="风险管理" text="风控项管理"></Header>
    <div class="main">
      <div class="top">
        <p>类别</p>
      </div>
      <el-row>
        <el-col :span="4">
          <div>
            <div class="ad">
              <el-button type="text" size="mini">+</el-button>
            </div>
            <el-tree :data="tRdata" accordion :props="defaultProps" :expand-on-click-node="true">
              <span class="custom-tree-node" slot-scope="{node,data}">
                <span>{{node.label}}</span>
                <span>
                  <el-button size="mini" type="text">+</el-button>
                  <el-button size="mini" type="text">-</el-button>
                  <el-button size="mini" type="text">
                    <i class="el-icon-edit"></i>
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </el-col>
        <el-col :span="19">
          <el-table
            :data="rTable"
            border
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            height="570"
          >
            <el-table-column label="编号" prop="rtnum"></el-table-column>
            <el-table-column label="名称" prop="rname"></el-table-column>
            <el-table-column label="类别" prop="rtype"></el-table-column>
            <el-table-column label="操作">
              <el-button type="text">修改</el-button>
              <el-button type="text">删除</el-button>
              <el-button type="text">执行标准</el-button>
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
      tRdata: [
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
      defaultProps: { children: "children", label: "label" },
      rTable: [
        { rtnum: "1", rname: "asklada", rtype: "askjaas" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas" }
      ]
    };
  }
};
</script>
<style scoped>
.content{
  height: 100%;
  overflow: hidden;
}
.main {
  margin-left: 25px;
  width: 96.1%;
  overflow: auto
}
.el-col-4 {
  border-top: 2px solid #409eff;
  border-radius: 3px;
  height: 700px;
}
.el-col-4 > div {
  background: #fff;
}
.el-row {
  margin-top: 10px;
  display: flex
}
.top {
  width: 100%;
  border-top: 2px solid #409eff;
  border-radius: 5px;
  background: #fff;
}
.top p {
  font-size: 20px;
  margin: 15px 0 0 20px;
  padding-bottom: 15px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding-right: 8px;
}
.ad {
  width: 100%;
}
.ad::after {
  content: "";
  display: block;
  clear: both;
}
.el-col-4>div>.ad>.el-button {
  margin-right: 10px;
  padding-bottom: 0;
  float: right;
}
.el-col-19 {
  margin-left: 15px;
  width: 82%;
}
.el-table {
  width: 100%;
}
</style>
