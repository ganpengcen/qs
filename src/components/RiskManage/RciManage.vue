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
              <el-button type="text" size="mini" @click="dg1=true">+</el-button>
            </div>
            <el-dialog width="25%" :visible.sync="dg1" :append-to-body="true" title="新建组织架构">
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
            <el-tree
              @node-click="get"
              :data="tRdata"
              accordion
              :props="defaultProps"
              :expand-on-click-node="true"
            >
              <span class="custom-tree-node" slot-scope="{node,data}">
                <span>{{node.label}}</span>
                <span>
                  <el-button size="mini" type="text" @click="dg1=true">+</el-button>
                  <el-button size="mini" type="text" @click="del()">-</el-button>
                  <el-button size="mini" type="text" @click="dg2=true">
                    <i class="el-icon-edit"></i>
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </el-col>
        <el-dialog title="新建风控项" width="65%" :visible.sync="dg2">
          <div class="info">
            <el-form :inline="true">
              <el-form-item label="编号">
                <el-input v-model="num"></el-input>
              </el-form-item>
              <el-form-item label="名称">
                <el-input v-model="nme"></el-input>
              </el-form-item>
              <el-form-item label="风险等级">
                <el-select v-model="rskd">
                  <el-option label="一般风险" value="一般风险"></el-option>
                  <el-option label="重大风险" value="重大风险"></el-option>
                  <el-option label="中等风险" value="中等风险"></el-option>
                  <el-option label="较大风险" value="较大风险"></el-option>
                </el-select>
              </el-form-item>
              <el-button @click="set" type="primary">增加</el-button>
            </el-form>
            <el-table border :data="newif">
              <el-table-column label="编号" prop="num"></el-table-column>
              <el-table-column label="名称" prop="nme"></el-table-column>
              <el-table-column label="风险等级" prop="rskd"></el-table-column>
              <el-table-column label="操作">
                <el-button type="text" @click="del()">删除</el-button>
              </el-table-column>
            </el-table>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dg2 = false">取 消</el-button>
            <el-button type="primary" @click="dg2 = false">确 定</el-button>
          </span>
        </el-dialog>
        <el-col :span="19">
          <el-table
            :data="rTable"
            border
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            height="calc(100vh - 300px)"
            @row-click="inf"
          >
            <el-table-column label="编号" prop="rtnum"></el-table-column>
            <el-table-column label="名称" prop="rname"></el-table-column>
            <el-table-column label="类别" prop="rtype"></el-table-column>
            <el-table-column label="操作">
              <el-button type="text" @click="dg3=true">修改</el-button>
              <el-button type="text" @click="del()">删除</el-button>
              <el-button type="text" @click="dg4=true">执行标准</el-button>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-dialog title="修改风控项" width="20%" :visible.sync="dg3">
        <div class="info">
          <el-form label-width="100px">
            <el-form-item label="编号">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="名称">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="类别">
              <el-cascader :options="tRdata" v-model="rsty"></el-cascader>
            </el-form-item>
            <el-form-item label="风险等级">
              <el-select v-model="rskr">
                <el-option label="一般风险" value="一般风险"></el-option>
                <el-option label="重大风险" value="重大风险"></el-option>
                <el-option label="中等风险" value="中等风险"></el-option>
                <el-option label="较大风险" value="较大风险"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dg3 = false">取 消</el-button>
          <el-button type="primary" @click="dg3 = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="安全标准" :visible.sync="dg4">
        <div class="info">
          <div class="title">
            <span>风控项编号:{{info.rtnum}}</span>
            <span>风控项名称:{{info.rname}}</span>
            <span>风控项类别:{{info.rtype}}</span>
          </div>
          <el-form :inline="true">
            <el-form-item label="执行标准">
              <el-select v-model="sele">
                <el-option label="11" value="11"></el-option>
                <el-option label="11" value="11"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary">增加</el-button>
          </el-form>
          <el-table border :data="standtable">
            <el-table-column label="编号" prop="rtnum"></el-table-column>
            <el-table-column label="名称" prop="rname"></el-table-column>
            <el-table-column label="类别" prop="rtype"></el-table-column>
            <el-table-column label="管控措施" prop="mesure"></el-table-column>
            <el-table-column label="操作">
              <el-button type="text" @click="del()">删除</el-button>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dg4 = false">取 消</el-button>
          <el-button type="primary" @click="dg4 = false">确 定</el-button>
        </span>
      </el-dialog>
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
      sele: "",
      num: "",
      nme: "",
      rskd: "",
      las: "无上级",
      dg1: false,
      dg3: false,
      dg2: false,
      dg4: false,
      rskr: "",
      rsty: "",
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
        { rtnum: "1", rname: "asklada", rtype: "askjaas" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas" }
      ],
      info: {},
      newif: [],
      standtable: [
        { rtnum: "1", rname: "asklada", rtype: "askjaas", mesure: "1as4das" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas", mesure: "1as4das" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas", mesure: "1as4das" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas", mesure: "1as4das" }
      ]
    };
  },
  methods: {
    get(data) {
      console.log(data.label);
      this.las = data.label;
    },
    del() {
      this.$confirm("将要执行删除操作,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.newif.shift();
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
    set() {
      let newi = {};
      newi.num = this.num;
      newi.nme = this.nme;
      newi.rskd = this.rskd;
      console.log(newi);
      this.newif.push(newi);
      console.log(this.newif);
    }
  }
};
</script>
<style scoped>
.info{
  background: #fff;
  padding: 15px;
}
.title {
  margin-bottom: 20px;
}
.content {
  height: 100%;
  overflow: hidden;
}
.main {
  margin-left: 25px;
  width: 96.1%;
  overflow: hidden;
  height: calc(100% - 85px);
}
.el-col-4 {
  height: calc(100vh - 270px);
  overflow: auto;
  border-top: 2px solid #409eff;
  border-radius: 3px;
}
.el-col-4 > div {
  background: #fff;
}
.el-row {
  margin-top: 10px;
  display: flex;
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
.el-col-4 > div > .ad > .el-button {
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
