<template>
  <div class="content">
    <Header title="风险管理" text="作业流程"></Header>
    
    <el-dialog width="40%" :visible.sync="dg1" title="新建作业">
      <div class="info">
        <el-form :inline="true" label-width="75px">
          <el-form-item label="作业编号">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="作业岗位">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="流程回退">
            <el-checkbox></el-checkbox>
          </el-form-item>
          <el-form-item label="作业描述">
            <el-input type="textarea" :rows="3"></el-input>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="日期">
            <el-date-picker></el-date-picker>
          </el-form-item>
          <el-form-item label="流程哇">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dg1 = false">取 消</el-button>
        <el-button type="primary" @click="dg1= false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog width="40%" :visible.sync="dg2" title="新建作业">
      <div class="info">
        <el-form :inline="true" label-width="75px">
          <el-form-item label="作业编号">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="作业岗位">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="流程回退">
            <el-checkbox></el-checkbox>
          </el-form-item>
          <el-form-item label="作业描述">
            <el-input type="textarea" :rows="3"></el-input>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="日期">
            <el-date-picker></el-date-picker>
          </el-form-item>
          <el-form-item label="流程哇">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dg2 = false">取 消</el-button>
        <el-button type="primary" @click="dg2= false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="main">
      <div class="top">
      <el-row>
        <el-col :span="4">
          <el-button type="primary" @click="dg1=true">新建</el-button>
        </el-col>
        <el-col :span="9">
          <span>关键字:</span>
          <el-input placeholder="请输入关键字"></el-input>
          <el-button type="primary">查询</el-button>
          <a href="#">导出为Excel</a>
        </el-col>
      </el-row>
    </div>
      <el-table
        height="calc(100% - 73px)"
        border
        :data="processTable"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        @row-click="inf"
      >
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
          <el-button type="text" @click="dg2=true">修改</el-button>
          <el-button type="text" @click="del()">删除</el-button>
          <el-button type="text" @click="dg3=true">流程</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="pge">
      <el-pagination :page-size="5" :total="processTable.length" layout="prev,pager,next"></el-pagination>
    </div>
    <el-dialog width="65%" title="流程节点" :visible.sync="dg3">
      <div class="info">
        <div class="ttl">
          <span>作业编号:{{info.numb}}</span>
          <span>作业名称:{{info.pname}}</span>
          <el-checkbox v-model="info.bck" disabled>流程回退</el-checkbox>
        </div>
        <el-form label-width="75px" :inline="true">
          <el-form-item label="节点顺序">
            <el-input v-model="nord"></el-input>
          </el-form-item>
          <el-form-item label="节点名称">
            <el-input v-model="nname"></el-input>
          </el-form-item>
          <el-form-item label="节点岗位">
            <el-input v-model="njb"></el-input>
          </el-form-item>
          <el-form-item label="节点描述">
            <el-input type="textarea" :rows="3" v-model="ndes"></el-input>
          </el-form-item>
          <el-button type="primary" @click="add()">增加</el-button>
        </el-form>
        <el-table :data="dgtb" border :cell-style="{'padding':'0'}">
          <el-table-column label="节点顺序" prop="nord"></el-table-column>
          <el-table-column label="节点名称" prop="nname"></el-table-column>
          <el-table-column label="节点岗位" prop="njb"></el-table-column>
          <el-table-column label="描述" prop="ndes"></el-table-column>
          <el-table-column label="操作">
            <el-button type="text" @click="del()">删除</el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
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
      nord: "",
      nname: "",
      njb: "",
      ndes: "",
      dg1: false,
      dg2: false,
      dg3: false,
      processTable: [
        { numb: "1", pname: "askld", bck: true, descr: "爱仕达撒所撒多" },
        { numb: "1", pname: "askld", bck: false, descr: "爱仕达撒所撒多" },
        { numb: "1", pname: "askld", bck: false, descr: "爱仕达撒所撒多" },
        { numb: "1", pname: "askld", bck: true, descr: "爱仕达撒所撒多" },
        { numb: "1", pname: "askld", bck: true, descr: "爱仕达撒所撒多" },
        { numb: "1", pname: "askld", bck: true, descr: "爱仕达撒所撒多" },
        { numb: "1", pname: "askld", bck: true, descr: "爱仕达撒所撒多" },
        { numb: "1", pname: "askld", bck: true, descr: "爱仕达撒所撒多" },
        { numb: "1", pname: "askld", bck: true, descr: "爱仕达撒所撒多" },
      ],
      info: {},
      dgtb: []
    };
  },
  methods: {
    del() {
      this.$confirm("将要执行删除操作,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dgtb.shift();
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
    inf(row) {
      console.log(row);
      this.info = row;
    },
    add() {
      let ls = {};
      ls.nord = this.nord;
      ls.nname = this.nname;
      ls.njb = this.njb;
      ls.ndes = this.ndes;
      this.dgtb.push(ls);
      console.log(this.dgtb);
    }
  }
};
</script>
<style scoped>
.info{
  background: #fff;
  padding: 15px;
}
.content {
  height: 100%;
  overflow: hidden;
}
.main {
  width: 96.8%;
  height: calc(100% - 140px);
  margin:10px 0 10px 25px;
  overflow: hidden;
}
.el-textarea {
  width: 460px;
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
.el-row {
  background: #fff;
  border-top: 2px solid #049eff;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 15px;
}
.el-col-9 > a {
  font-size: 14px;
  display: inline-block;
  text-align: center;
  background-color: #409eff;
  color: #fff;
  margin: 10px 0 0 0;
  line-height: 40px;
  width: 100px;
  text-decoration: none;
  border-radius: 3px;
}
.el-table {
  width: 100%;
}
.top {
  width: 100%
}
.el-dialog .el-form .el-button {
  margin-top: 35px;
}
.ttl {
  padding-left: 8px;
  margin-bottom: 15px;
}
.ttl > span {
  margin-right: 15px;
}
.pge {
  width: 96.8%;
  margin-left: 25px;
  height: 35px;
  text-align: right;
  background: #fff;
}
</style>
