<template>
  <div>
    <Header title="风险管理" text="作业流程"></Header>
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
      <el-table border :data="processTable" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column type="expand">
          <template slot-scope="prop"></template>
        </el-table-column>
        <el-table-column label="作业编号" prop="numb"></el-table-column>
        <el-table-column label="名称" prop="pname"></el-table-column>
        <el-table-column label="流程回退">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.bck" disabled></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="作业描述" prop="descr"></el-table-column>
        <el-table-column label="操作">
          <el-button type="text">修改</el-button>
          <el-button type="text">删除</el-button>
          <el-button type="text">流程</el-button>
        </el-table-column>
      </el-table>
      <el-pagination :page-size="5" :total="processTable.length" layout="prev,pager,next"></el-pagination>
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
      processTable:[
        {numb:'1',pname:'askld',bck:true,descr:'爱仕达撒所撒多'},
        {numb:'1',pname:'askld',bck:false,descr:'爱仕达撒所撒多'},
        {numb:'1',pname:'askld',bck:false,descr:'爱仕达撒所撒多'},
        {numb:'1',pname:'askld',bck:true,descr:'爱仕达撒所撒多'},
        {numb:'1',pname:'askld',bck:true,descr:'爱仕达撒所撒多'},
        {numb:'1',pname:'askld',bck:true,descr:'爱仕达撒所撒多'},
      ]
    }
  }
}
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
  position: fixed;
  bottom: 60px;
  right: 30px;
}
</style>
