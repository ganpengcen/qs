<template>
  <div class="content">
    <Header title="风险管理" text="执行标准"></Header>
    
      <el-dialog width="30%" :visible.sync="dg1" title="新建执行标准">
        <div class="info">
        <el-form label-width="100px">
          <el-form-item label="编号">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="风控项">
            <el-cascader :options="treedata" v-model="td"></el-cascader>
          </el-form-item>
          <el-form-item label="工程措施">
            <el-input type="textarea" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="管理措施">
            <el-input type="textarea" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="个体措施">
            <el-input type="textarea" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="事故措施">
            <el-input type="textarea" :rows="3"></el-input>
          </el-form-item>
        </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
                      <el-button @click="dg1= false">取 消</el-button>
                      <el-button type="primary" @click="dg1 = false">确 定</el-button>
                    </span>
      </el-dialog>
    <div class="main">
      <div class="top">
        <el-button type="primary" @click="dg1=true">新建</el-button>
      </div>
      <el-table height="calc(100% - 75px)" :data="standTable" border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center','padding':'0'}">
        <el-table-column label="编号" prop="snb"></el-table-column>
        <el-table-column label="名称" prop="sname"></el-table-column>
        <el-table-column label="风控项" prop="rci"></el-table-column>
        <el-table-column label="管控措施" prop="ctrs"></el-table-column>
        <el-table-column label="操作">
          <el-button type="text" @click="dg2=true">修改</el-button>
          <el-button type="text" @click="del()">删除</el-button>
        </el-table-column>
      </el-table>
      
    </div>
    <el-dialog width="30%" :visible.sync="dg2" title="新建执行标准">
      <div class="info">
        <el-form label-width="100px">
          <el-form-item label="编号">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="风控项">
            <el-cascader :options="treedata" v-model="td"></el-cascader>
          </el-form-item>
          <el-form-item label="工程措施">
            <el-input type="textarea" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="管理措施">
            <el-input type="textarea" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="个体措施">
            <el-input type="textarea" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="事故措施">
            <el-input type="textarea" :rows="3"></el-input>
          </el-form-item>
        </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
                      <el-button @click="dg2= false">取 消</el-button>
                      <el-button type="primary" @click="dg2 = false">确 定</el-button>
                    </span>
      </el-dialog>
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
      td:'',
      dg1:false,
      dg2:false,
      standTable:[
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
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
    }
  },
  methods:{
    del(){
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
}
</script>
<style scoped>
.info{
  height: 400px;
  overflow: auto;
  background: #fff;
  padding: 15px;
}
.content{
  height: 100%;
  overflow: hidden;
}
.main{
  overflow: hidden;
  width: calc(100% - 50px);
  margin:0 0 10px 25px;
  height: calc(100% - 133px)
}
.top{
  margin-bottom: 15px;
  border-top:2px solid #409eff;
  border-radius: 5px; 
  background: #fff
}
.el-button{
  margin: 10px 0 10px 15px;
}
.pge {
  width:96.8%;
  margin-left: 25px;
  height: 32px;
  text-align: right;
  background: #fff
}
</style>
