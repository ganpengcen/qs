<template>
  <div class="content">
    <Header title="系统管理" text="审批流程"></Header>
    <div class="main">
      <el-row>
        <el-col :span="6">
          <div class="lefttop">
            <span>审批流程</span>&nbsp;
            <el-button type="text" @click="dialog1=true">新建</el-button>
            <el-dialog title="新建审批流程" :append-to-body="true" :visible.sync="dialog1" width="35%">
              <el-form>
                <el-form-item label="业务类型:">
                  <el-select v-model="sel1" placeholder="请选择">
                    <el-option
                      v-for="i in options"
                      :key="i.value"
                      :label="i.label"
                      :value="i.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="流程名称:">
                  <el-input v-model="flowname"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialog1 = false">取消</el-button>
                <el-button type="primary">确定</el-button>
              </span>
            </el-dialog>
          </div>
          <div class="select">
            <el-select v-model="sel" placeholder="请选择">
              <el-option v-for="i in options" :key="i.value" :label="i.label" :value="i.value"></el-option>
            </el-select>
            <el-button type="primary" size="small">查询</el-button>
          </div>
          <div class="lefttb">
            <el-table
              :data="tableData"
              ref="multipleTable"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
              @row-click="SelectClick"
              highlight-current-row
              @current-change="handleChange"
              max-height="500"
            >
              <el-table-column prop="name" label="名称"></el-table-column>
              <el-table-column prop="type" label="类型"></el-table-column>
              <el-table-column label="操作">
                <el-button type="text" @click="digVisib=true">修改</el-button>
                <el-dialog title="修改审批流程" :visible.sync="digVisib" :append-to-body="true">
                  <el-form>
                    <el-form-item label="业务类型:">
                      <el-select v-model="tp.type" :placeholder="tp.type"></el-select>
                    </el-form-item>
                    <el-form-item label="流程名称:">
                      <el-input v-model="tp.name"></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="digVisib = false">取消</el-button>
                    <el-button type="primary">确定</el-button>
                  </span>
                </el-dialog>
                <el-button type="text" @click="open()">删除</el-button>
              </el-table-column>
            </el-table>
          </div>
          <div class="pge">
            <el-pagination background :total="tableData.length" layout="prev,pager,next"></el-pagination>
          </div>
        </el-col>
        <el-col :span="17">
          <div class="topcontent">
            <el-button type="primary" size="medium" @click="ndg=true">新建节点</el-button>
          </div>
          <el-dialog title="新建节点" :visible.sync="ndg">
            <el-form :model="form">
              <el-form-item label="流程名称"></el-form-item>
              <el-row>
                <el-col :span="22">
                  <el-form-item label="节点名称">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="节点顺序">
                    <el-input v-model="form.order"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="14">
                  <el-form-item label="节点类型">
                    <el-select v-model="form.vl">
                      <el-option label="普通" value="1"></el-option>
                      <el-option label="多人会审" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dg1= false">取 消</el-button>
              <el-button type="primary" @click="dg1 = false">确 定</el-button>
            </span>
          </el-dialog>
          <div class="tab">
            <el-table
              :data="data"
              border
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
              @row-click="gtDe"
              max-height="500"
            >
              <el-table-column label="业务类型" prop="type"></el-table-column>
              <el-table-column label="审批节点" prop="node"></el-table-column>
              <el-table-column label="节点顺序" prop="order"></el-table-column>
              <el-table-column label="节点类型" prop="nodetype"></el-table-column>
              <el-table-column label="创建时间" prop="cdate"></el-table-column>
              <el-table-column label="操作">
                <el-button type="text" @click="dgVisib=true" size="small">修改</el-button>
                <el-dialog
                  width="40%"
                  title="修改流程节点"
                  :visible.sync="dgVisib"
                  :append-to-body="true"
                >
                  <el-form>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="节点名称：">
                          <el-input class="nd" v-model="tp1.node"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="10">
                        <el-form-item label="节点顺序：">
                          <el-input class="od" v-model="tp1.order"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="14">
                        <el-form-item label="节点类型：">
                          <el-input class="nt" v-model="tp1.nodetype"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dgVisib = false">取消</el-button>
                    <el-button type="primary">确定</el-button>
                  </span>
                </el-dialog>
                <el-button type="text" @click="open1()" size="small">删除</el-button>
                <el-button type="text" size="small" @click="outerVis=true">审批人</el-button>
                <el-dialog width="65%" title="审批人" :visible.sync="outerVis">
                  <el-form>
                    <div class="info">
                      <el-form :inline="true">
                        <el-form-item label="业务类型：">{{tp1.type}}</el-form-item>
                        <el-form-item label="审批节点：">{{tp1.node}}</el-form-item>
                        <el-form-item label="节点顺序：">{{tp1.order}}</el-form-item>
                        <el-form-item label="节点类型：">{{tp1.nodetype}}</el-form-item>
                      </el-form>
                    </div>
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="节点顺序">
                          <el-input style="width:55%"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="审批人">
                          <el-select style="width:70%" v-model="slct">
                            <el-option
                              v-for="(i,e) in slctData"
                              :key="e"
                              :label="i.label"
                              :value="i.value"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-button type="primary">增加</el-button>
                      </el-col>
                    </el-row>
                    <el-table
                      border
                      row-click="gtfr"
                      :data="aprover"
                      :header-cell-style="{'text-align':'center'}"
                      :cell-style="{'text-align':'center'}"
                    >
                      <el-table-column prop="node" label="审批节点"></el-table-column>
                      <el-table-column prop="apro" label="审批人"></el-table-column>
                      <el-table-column prop="name" label="姓名"></el-table-column>
                      <el-table-column prop="order" label="审批顺序"></el-table-column>
                      <el-table-column label="操作">
                        <el-button type="text" @click="innerVis=true">修改</el-button>
                        <el-dialog title="修改审批人" :visible.sync="innerVis" :append-to-body="true">
                          <el-form :inline="true">
                            <el-form-item label="审批人">
                              <el-input v-model="tp1.name"></el-input>
                            </el-form-item>
                            <el-form-item label="审批顺序">
                              <el-input v-model="tp1.order"></el-input>
                            </el-form-item>
                          </el-form>
                        </el-dialog>
                        <el-button type="text" @click="open3()">删除</el-button>
                      </el-table-column>
                    </el-table>
                  </el-form>
                </el-dialog>
              </el-table-column>
            </el-table>
          </div>
          <div>
            <el-pagination :total="data.length" layout="prev,pager,next"></el-pagination>
          </div>
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
      sel: "",
      sel1: "",
      options: [
        { value: "选项1", label: "作业申请" },
        { value: "选项2", label: "巡检任务" },
        { value: "选项3", label: "任务单据" },
        { value: "选项4", label: "隐患管控" },
        { value: "选项5", label: "临时任务" }
      ],
      tableData: [
        { name: "111", type: "作业申请" },
        { name: "111", type: "巡检任务" },
        { name: "111", type: "任务单据" },
        { name: "111", type: "隐患控制" },
        { name: "111", type: "作业申请" },
        { name: "111", type: "临时任务" },
        { name: "111", type: "任务单据" },
        { name: "111", type: "巡检任务" }
      ],
      data: [
        {
          type: "临时任务",
          node: "1",
          order: "1",
          nodetype: "普通",
          cdate: "1",
          apro: "as65as1",
          name: "asa52525"
        },
        {
          type: "临时任务",
          node: "1",
          order: "1",
          nodetype: "普通",
          cdate: "1",
          apro: "as65as1",
          name: "asa52525"
        },
        {
          type: "临时任务",
          node: "1",
          order: "1",
          nodetype: "普通",
          cdate: "1",
          apro: "as65as1",
          name: "asa52525"
        }
      ],
      dialog1: false,
      flowname: "",
      currentRow: null,
      dgVisib: false,
      digVisib: false,
      tp: {},
      tp1: {},
      outerVis: false,
      innerVis: false,
      form: { order: "", name: "", vl: "" },
      aprover: [{ node: "1", apro: "asdasda", name: "asdjhaa", order: "2" }],
      slct: "",
      ndg: false,
      slctData: [
        { value: "选项1", label: "1" },
        { value: "选项2", label: "2" },
        { value: "选项3", label: "3" },
        { value: "选项4", label: "4" },
        { value: "选项5", label: "5" },
        { value: "选项6", label: "6" },
        { value: "选项7", label: "7" },
        { value: "选项8", label: "8" },
        { value: "选项9", label: "9" }
      ]
    };
  },
  methods: {
    open() {
      this.$confirm("确定要删除该条记录吗？", "提示", {
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
    open1() {
      this.$confirm("确定要删除该条记录吗？", "提示", {
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
    open3() {
      this.$confirm("确定要删除该条记录吗？", "提示", {
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
    gtDe(row) {
      console.log(row);
      this.tp1 = row;
    },
    SelectClick(row) {
      console.log(row);
      this.$refs.multipleTable.setCurrentRow(row);
      this.tp = row;
    },
    handleChange(val) {
      this.currentRow = val;
    }
  }
};
</script>
<style scoped>
.select,
.lefttop,
.topcontent {
  background: #fff;
}
.content {
  height: 100%;
  overflow: hidden;
}
.tab,
.lefttb {
  overflow: auto;
}
.lefttb {
  height: calc(100% - 200px);
}
.el-pagination {
  text-align: center;
  margin-top: 15px;
}
.select .el-select {
  width: 60%;
  margin-left: 20px;
}
.el-dialog__wrapper {
  overflow: hidden;
  height: 100%;
}
.el-dialog__body {
  overflow: auto;
  height: calc(100% - 25px);
}
.main {
  margin-left: 25px;
  overflow: hidden;
  height: 100%;
}
.el-dialog .el-input {
  width: 70%;
}
.lefttop {
  text-align: left;
  padding: 0 10px;
}
.main > .el-row {
  width: 100%;
  margin: 0 auto;
  /* padding: 20px 20px 0 20px; */
  background-color: #f4f4f4;
}
.main > .el-row > .el-col {
}
.main > .el-row > .el-col:nth-child(2) {
  margin-left: 25px;
}
.topcontent {
  margin-bottom: 15px;
  text-align: right;
  padding: 10px 30px;
}
.main > .el-row > .el-col-18 {
  border-top: 2px solid #409eff;
  border-radius: 8px 8px 0 0;
}
.main > .el-row > .el-col-18 .el-table {
  margin: 20px 0;
}
.el-col .el-form-item .od {
  width: 50%;
}
.el-col .el-form-item .nt {
  width: 69%;
}
.el-col .el-form-item .nd {
  width: 82%;
}
.el-dialog-body el-form {
  margin: 0 auto;
}
.info .el-form-item {
  margin-right: 10px;
}
.info {
  text-align: left;
}
.pge {
  height: 50px;
  margin-top: 10px;
}
</style>
