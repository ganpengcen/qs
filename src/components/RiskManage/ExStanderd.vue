<template>
  <div class="content">
    <Header title="风险管理" text="执行标准"></Header>
    <div class="top">
        <el-button type="primary">新建</el-button>
      </div>
    <div class="main">
      
      <el-table height="535" :data="standTable" border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center','padding':'0'}">
        <el-table-column label="编号" prop="snb"></el-table-column>
        <el-table-column label="名称" prop="sname"></el-table-column>
        <el-table-column label="风控项" prop="rci"></el-table-column>
        <el-table-column label="管控措施" prop="ctrs"></el-table-column>
        <el-table-column label="操作">
          <el-button type="text">修改</el-button>
          <el-button type="text">删除</el-button>
        </el-table-column>
      </el-table>
      
    </div>
    <div class="pge"><el-pagination :total="standTable.length" :page-size="5" layout="prev,pager,next"></el-pagination></div>
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
      standTable:[
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
      ]
    }
  }
}
</script>
<style scoped>
.content{
  height: 100%;
  overflow: hidden;
}
.main{
  overflow: auto;
  width: calc(100% - 50px);
  margin-left: 25px;
  height: calc(100% - 182px)
}
.top{
  margin-left: 25px;
  width: calc(100% - 50px);
  border-top:2px solid #409eff;
  border-radius: 5px; 
  background: #fff
}
.el-button{
  margin: 10px 0 10px 15px;
}
.el-table{
  margin-top: 15px;
}
.pge {
  width:96.8%;
  margin-left: 25px;
  height: 50px;
  text-align: right;
}
</style>
