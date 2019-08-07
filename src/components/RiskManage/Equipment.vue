<template>
  <div class="content">
    <Header title="风险管理" text="设备设施管理"></Header>
    <div class="main">
      <el-row>
        <el-col :span="4">
          <div class="ad">
            <el-button type="text" size="mini" @click="dg1=true">+</el-button>
            <el-dialog width="35%" :visible.sync="dg1" :append-to-body="true" title="新建组织架构">
              <div class="info">
              <el-form label-width="50px">
                <el-form-item label="上级:">
                  <el-input disabled v-model="las"></el-input>
                </el-form-item>
                <el-form-item label="名称:">
                  <el-input></el-input>
                </el-form-item>
              </el-form>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dg1 = false">取 消</el-button>
                <el-button type="primary" @click="dg1 = false">确 定</el-button>
              </span>
            </el-dialog>
            
          </div>
          
          <el-tree @node-click="get" :data="treedata" accordion :props="defaultProps" :expand-on-click-node="true">
            <span class="custom-tree-node" slot-scope="{node,data}">
              <span>{{node.label}}</span>
              <span>
                <el-button size="mini" type="text" @click="dg1=true">+</el-button>
                <el-button size="mini" type="text" @click="del1()">-</el-button>
                <el-button size="mini" type="text" @click="dg2=true">新建设备</el-button>
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-dialog width="48%" title="新建设备" :visible.sync="dg2">
          <div class="info">
          <el-form :inline="true">
            <el-form-item label="设备编号">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="名称">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="组织架构">
              <el-cascader :options="treedata" v-model="selec"></el-cascader>
            </el-form-item>
            <el-form-item label="附件">
              <el-upload ><el-button size="small" type="primary">点击上传</el-button></el-upload>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="aaa">
              <el-input></el-input>
            </el-form-item>
          </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
                <el-button @click="dg2 = false">取 消</el-button>
                <el-button type="primary" @click="dg2= false">确 定</el-button>
              </span>
        </el-dialog>
        <el-dialog width="48%" title="修改设备" :visible.sync="dg3">
          <div class="info">
          <el-form :inline="true">
            <el-form-item label="设备编号">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="名称">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="组织架构">
              <el-cascader :options="treedata" v-model="selec"></el-cascader>
            </el-form-item>
            <el-form-item label="附件">
              <el-upload ><el-button size="small" type="primary">点击上传</el-button></el-upload>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="aaa">
              <el-input></el-input>
            </el-form-item>
          </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
                <el-button @click="dg3 = false">取 消</el-button>
                <el-button type="primary" @click="dg3= false">确 定</el-button>
              </span>
        </el-dialog>
        <el-col :span="19">
          <div class="top">
            <div>
              <el-input placeholder="请输入设备名称"></el-input>
              <el-button type="primary">查询</el-button>
              <el-button type="primary">导出Excel</el-button>
            </div>
          </div>
          <el-table :data="tdab" border height="calc(100vh - 300px)">
            <el-table-column type="expand">
              <template slot-scope="prop"></template>
            </el-table-column>
            <el-table-column v-for="(i,e) in tbla" :label="i.label" :key="e" :prop="i.pp"></el-table-column>
            <el-table-column label="操作">
              <el-button type="text" @click="dg3=true">修改</el-button>
              <el-button type="text" @click="del2()">删除</el-button>
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
      selec:'',
      dg2:false,
      dg3:false,
      dg1:false,
      las:'无上级',
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
  },
  methods:{
     get(data) {
      console.log(data.label);
      this.las = data.label;
    },
    del1(){
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
    del2(){
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
    }
  }
};
</script>
<style scoped>
.info{
  background: #fff;
  padding: 15px
}
.whi {
  background-color: #fff;
  width: 100%;
}
.content {
  overflow: hidden;
  height: 100%;
}
.el-row {
  overflow: hidden;
}
.main {
  margin-left: 25px;
  overflow: hidden;
  height: calc(100% - 85px);
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
  overflow: auto;
  height: calc(100vh - 210px);
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
