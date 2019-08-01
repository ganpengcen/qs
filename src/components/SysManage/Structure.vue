<template>
  <div>
      <Header title="系统管理" text="组织架构"></Header>
    <div class="main">
      <el-row>
        <el-col :span="5">
          <div class="title">
            <span>组织架构</span>
            <el-button type="text">+</el-button>
          </div>
          <div>
          <el-tree :data="treedata" accordion :props="defaultProps" :expand-on-click-node='true'>
              <span class="custom-tree-node" slot-scope="{node,data}">
                <span>{{node.label}}</span>
                <span>
                    <el-button size='mini' type='text'>+</el-button>
                    <el-button size='mini' type='text'>-</el-button>
                    <el-button size='mini' type='text'>新建人员</el-button>
                </span>
              </span>
          </el-tree>
          </div>
        </el-col>
        <el-col :span="18">
            <div class="top">
                <span>关键字</span>
                <el-input placeholder="请输入关键字"  size="small"></el-input>
                <el-button type="primary" size="small">搜索</el-button>
            </div>
            <el-table :data="tdab" border :cell-style="{'text-align':'center'}" :header-cell-style="{'text-align':'center'}">
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="sex" label="性别"></el-table-column>
              <el-table-column prop="account" label="账号"></el-table-column>
              <el-table-column label="Leader">
                <template slot-scope="scope">
                  <el-checkbox disabled v-model="scope.row.leader"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column  label="接受平级">
               <template slot-scope="scope"> 
                  <el-checkbox disabled v-model="scope.row.level"></el-checkbox>
               </template>
                </el-table-column>
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
      treedata:[
            {label:'1',children:[
                {label:'1-1',children:[
                    {label:'1-1-1'},
                    {label:'1-1-2'}
                ]},
                {label:'1-2',children:[
                    {label:'1-2-1'},
                ]},
                {label:'1-3'},
                {label:'1-4'}
            ]}
        ],
        tdab:[
          {name:'asdasda',sex:'male',account:'asdasda1111',leader:true,level:true}
        ],
        defaultProps:{children:'children',label:'label'}
    };
  },
  methods:{
    
  }
};
</script>
<style scoped>
.main{
  margin-left: 25px;
}
.el-col-5 {
  height: 650px;
  /* margin-left: 25px; */
  font-size: 17px;
}
.title{
    padding-left: 20px;
}
.el-tree{
    margin-left: 5px;
}
.el-col-5,
.el-col-18 {
  background: #fff;
}
.el-col-18{
    margin-left: 25px;
}
.custom-tree-node{
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding-right: 8px;
}
.top .el-input{
    width: 45%
}
.top{
    margin: 15px 0;
    float: right;
}
</style>
