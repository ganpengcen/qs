<template>
  <div>
    <Header title="风险管理" text="岗位管理"></Header>
    <div class="main">
      <el-row>
        <el-col :span="4">
          <el-button type="primary">新建</el-button>
        </el-col>
        <el-col :span="9">
          <span>关键字:</span>
          <el-input placeholder="请输入关键字"></el-input>
          <el-button type="primary">查询</el-button>
          <a href="#">导出为Excel</a>
        </el-col>
      </el-row>
      <el-table :data="tbd" border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column type="expand">
          <template slot-scope="props">
            
          </template>
        </el-table-column>
        <el-table-column label="岗位编号" prop="nmb"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="责任人" prop="respos"></el-table-column>
        <el-table-column label="责任人电话" prop="respostel"></el-table-column>
        <el-table-column label="操作">
          <el-button type="text">修改</el-button>
          <el-button type="text">删除</el-button>
          <el-button type="text">人员管理</el-button>
        </el-table-column>
      </el-table>
      <el-pagination :page-size="5" background layout="prev,pager,next" :total="tbd.length"></el-pagination>
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
      tbd:[
        {nmb:'1',name:'ajskad',respos:'asdasda',respostel:'56541113331'},
        {nmb:'1',name:'ajskad',respos:'asdasda',respostel:'56541113331'},
        {nmb:'1',name:'ajskad',respos:'asdasda',respostel:'56541113331'},
        {nmb:'1',name:'ajskad',respos:'asdasda',respostel:'56541113331'},
        {nmb:'1',name:'ajskad',respos:'asdasda',respostel:'56541113331'},
        {nmb:'1',name:'ajskad',respos:'asdasda',respostel:'56541113331'},
        {nmb:'1',name:'ajskad',respos:'asdasda',respostel:'56541113331'},
      ]
    };
  }
};
</script>
<style scoped>
.main {
  width: 96.1%;
  margin-left: 25px;
}
.el-col-4 .el-button {
  margin: 10px 0 10px 20px;
}
.el-col-9 .el-input {
  width: 35%;
}
.el-col-9 {
  float: right;
  margin: 0 0 10px 0;
}
.el-row{
  background: #fff;
  border-top: 2px solid #049eff;
  border-radius: 5px;
}
.el-col-9>a{
  font-size: 14px;
  display: inline-block;
  text-align: center;
  background-color: #409eff;
  color: #fff;
  margin:10px 0 0 0;
  line-height: 40px;
  width: 100px;
  text-decoration: none;
  border-radius: 3px;
}
.el-table{
  margin-top: 15px;
}
.el-pagination{
  float: right;
  position: fixed;
  bottom: 60px;
  right: 30px;
}
</style>
