<template>
  <div>
    <Header title="风险管理" text="风控项管理"></Header>
    <div class="main">
      <div class="top">
        <p>类别</p>
      </div>
      <el-row>
        <el-col :span="4">
          <div class="ad">
            <el-button type="text" size="mini">+</el-button>
          </div>
          <el-tree :data="tRdata" accordion :props="defaultProps" :expand-on-click-node="true">
            <span class="custom-tree-node" slot-scope="{node,data}">
              <span>{{node.label}}</span>
              <span>
                <el-button size="mini" type="text">+</el-button>
                <el-button size="mini" type="text">-</el-button>
                <el-button size="mini" type="text"><i class="el-icon-edit"></i></el-button>
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="19">
          <el-table ></el-table>
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
  data(){
    return {
      tRdata:[
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
      defaultProps: { children: "children", label: "label" }
      
    }
  }
}
</script>
<style scoped>
.main{
  margin-left: 25px;
  width: 96.1%;
}
.el-col-4{
  background: #fff;
  border-top:2px solid #409eff ;
  border-radius: 3px;
}
.el-row{
  margin-top:10px;
  }
.top{
  width: 100%;
  border-top: 2px solid #409eff;
  border-radius: 5px;
  background: #fff
}
.top p{
  font-size: 20px;
  margin: 15px 0 0 20px;
  padding-bottom: 15px;
}
.custom-tree-node{
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding-right: 8px;
}
.ad{
  width: 100%
}
.ad::after{
  content: '';
  display: block;
  clear: both;
}
.el-col-4>.ad>.el-button{
  margin-right: 10px;
  padding-bottom: 0;
  float: right
}
</style>
