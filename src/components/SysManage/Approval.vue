<template>
  <div>
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
            </el-dialog>
          </div>
          <div class="select">
            <el-select v-model="sel" placeholder="请选择">
              <el-option v-for="i in options" :key="i.value" :label="i.label" :value="i.value"></el-option>
            </el-select>
            <el-button type="primary" size="small">查询</el-button>
          </div>
          <el-table
            :data="tableData"
            ref="multipleTable"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            @row-click="SelectClick"
            highlight-current-row
            @current-change="handleChange"
          >
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column label="操作">
              <el-button type="text">修改</el-button>
              <el-button type="text">删除</el-button>
            </el-table-column>
          </el-table>
          <div>
            <el-pagination background :total="tableData.length" layout="prev,pager,next"></el-pagination>
          </div>
        </el-col>
        <el-col :span="17">
          <div class="topcontent">
            <el-button type="primary" size="medium">新建节点</el-button>
          </div>
          <el-table
            :data="data"
            border
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            
          >
            <el-table-column label="业务类型" prop="type"></el-table-column>
            <el-table-column label="审批节点" prop="node"></el-table-column>
            <el-table-column label="节点顺序" prop="order"></el-table-column>
            <el-table-column label="节点类型" prop="nodetype"></el-table-column>
            <el-table-column label="创建时间" prop="cdate"></el-table-column>
            <el-table-column label="操作">
              <el-button type="text">修改</el-button>
              <el-button type="text">删除</el-button>
              <el-button type="text">审批人</el-button>
            </el-table-column>
          </el-table>
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
        { type: "临时任务", node: "1", order: "1", nodetype: "1", cdate: "1" },
        { type: "临时任务", node: "1", order: "1", nodetype: "1", cdate: "1" },
        { type: "临时任务", node: "1", order: "1", nodetype: "1", cdate: "1" }
      ],
      dialog1: false,
      flowname: "",
      currentRow:null
    };
  },
  methods: {
    SelectClick(row) {
      console.log(row)
      this.$refs.multipleTable.setCurrentRow(row);
    },
    handleChange(val){
      console.log(val)
      this.currentRow=val
    }
  }
};
</script>
<style scoped>
.el-pagination {
  text-align: center;
  margin-top: 15px;
}
.select .el-select {
  width: 60%;
  margin-left: 20px;
}
.main {
  margin-left: 25px;
}
.el-dialog .el-input {
  width: 70%;
}
.lefttop {
  text-align: left;
  padding: 0 10px;
}
.el-row {
  width: 100%;
  margin: 0 auto;
  /* padding: 20px 20px 0 20px; */
  background-color: #f4f4f4;
}
.el-col {
  background-color: #fff;
}
.el-col:nth-child(2) {
  margin-left: 25px;
}
.topcontent {
  text-align: right;
  padding: 10px 30px;
}
.el-col-18 {
  border-top: 2px solid #409eff;
  border-radius: 8px 8px 0 0;
}
.el-col-18 .el-table {
  margin: 20px 0;
}
.current-row>td {
        background: #f57878 !important;
    }
</style>
