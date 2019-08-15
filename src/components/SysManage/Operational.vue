<template>
  <div class="content">
    <Header title="系统管理" text="操作日志"></Header>

    <div class="main">
      <div class="top">
        <el-form>
          <p class="datepick">开始日期</p>
          <el-date-picker
            v-model="date1"
            size="medium"
            :picker-options="pickOptions0"
            placeholder="选择日期"
          ></el-date-picker>
          <p class="datepick">结束日期</p>
          <el-date-picker
            v-model="date2"
            size="medium"
            :picker-options="pickOptions1"
            placeholder="选择日期"
          ></el-date-picker>
          <div class="kwrd">
            <p class="impt">关键词</p>
            <el-input size="medium" placeholder="请输入关键词" v-model="kwd"></el-input>
            <el-dropdown trigger="click" split-button type="primary" size="medium" @click="selec()">
              查询
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-button class="speci" @click="delTime()" type="text" style="color:#999">删除指定时间</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button class="speci" @click="delId()" type="text" style="color:#999">删除指定用户</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-form>
      </div>
      <el-table
        @row-click="view"
        :data="tableData"
        height="calc(100% - 78px)"
        border
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
      >
        <el-table-column label="日期" prop="Sys_Log.LogTime"></el-table-column>
        <el-table-column label="操作人" prop="Sys_Log.LogUser"></el-table-column>
        <el-table-column label="操作结果" prop="Sys_Log.OperateResult"></el-table-column>
        <el-table-column label="日志内容" prop="Sys_Log.LogContent">
          <el-button type="text" @click="dialogVisible=true,lgc=''">查看</el-button>
          <el-dialog title="日志内容" width="30%" :visible.sync="dialogVisible">
            <div class="info">
              <p>{{lgc}}</p>
            </div>
          </el-dialog>
        </el-table-column>
        <el-table-column label="操作" prop="ID">
          <el-button type="text" @click="open()">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        @current-change="handleChange"
        layout="prev,pager,next"
        :page-count="pgecnt"
        :current-page="curpage"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import api from "../../axios/api";
import Header from "../assembly/Header";
export default {
  name: "app",
  inject: ["reload"],
  components: {
    Header
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      date1: "",
      date2: "",
      kwd: "",
      curpage: 1,
      viewlog: {},
      lgc: "",
      pgecnt: 0,
      pickOptions0: {
        disabledDate: time => {
          if (this.date2 != "") {
            return time.getTime() > Date.now() || time.getTime() > this.value2;
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickOptions1: {
        disabledDate: time => {
          return time.getTime() < this.date1;
        }
      }
    };
  },
  created() {
    let url = api.LogsPage;
    let ifo = {
      PageSize: 8,
      PageIndex: 0,
      KeyWord: "",
      Query: {
        logContent: ""
      },
      OrderString: "",
      ToExcel: true
    };
    this.$post(url, ifo)
      .then(res => {
        console.log(res.data);
        console.log(res.data.Data.Data);
        if (res.data.State == 200) {
          this.tableData = res.data.Data.Data;
          console.log(this.tableData);
          this.pgecnt = res.data.Data.Pages;
        } else if (res.data.State == 1000) {
          this.$message.error(res.data.Msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    selec() {
      console.log(this.kwd);
      let sth = {
        PageSize: 8,
        PageIndex: 0,
        KeyWord: "",
        Query: {
          logContent: this.kwd
        },
        OrderString: "",
        ToExcel: true
      };
      this.$post(api.LogsPage, sth)
        .then(res => {
          console.log(res);
          this.pgecnt = res.data.Data.Pages;
          this.tableData = res.data.Data.Data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleChange(val) {
      console.log(this.tableData);
      console.log(val);
      let url = api.LogsPage;
      let inf = {
        PageSize: 8,
        PageIndex: val - 1,
        KeyWord: "",
        Query: {
          logContent: ""
        },
        OrderString: "",
        ToExcel: true
      };
      this.$post(url, inf)
        .then(res => {
          console.log(res.data.Data);
          if (res.data.State == 200) {
            this.tableData = res.data.Data.Data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    delId() {
      console.log(this.kwd);
      let url = api.delLog + this.kwd;
      this.$get(url)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      let ifo = {
        PageSize: 8,
        PageIndex: 0,
        KeyWord: "",
        Query: {
          logContent: ""
        },
        OrderString: "",
        ToExcel: true
      };
      this.$post(url, ifo)
        .then(res => {
          console.log(res.data);
          console.log(res.data.Data.Data);
          if (res.data.State == 200) {
            this.tableData = res.data.Data.Data;
            console.log(this.tableData);
            this.pgecnt = res.data.Data.Pages;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    delTime() {
      let dtm1 = this.date1.format("yyyy-MM-dd hh:mm:ss");
      let dtm2 = this.date2.format("yyyy-MM-dd hh:mm:ss");
      console.log(dtm1, dtm2);
      let date = { SDate: dtm1, EDate: dtm2 };
      console.log(date);
      this.$post(api.delLogTime, date)
        .then(res => {
          console.log(res);
          if (res.data.Data != 0) {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.reload();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    view(row) {
      console.log(row);
      this.viewlog = row;
      this.lgc = row.Sys_Log.LogContent;
    },
    open() {
      this.$confirm("确定要删除该条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(this.viewlog.Sys_Log.ID);
          let url = api.delLogId + this.viewlog.Sys_Log.ID;
          this.$get(url)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.reload();
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
.speci:hover {
  color: #409eff !important;
}
.info {
  background: #fff;
  padding: 5px 10px;
}
.el-pagination {
  text-align: right;
  margin: 15px 25px 0 25px;
  background: #fff;
  width: calc(100% - 65px);
}
.content {
  height: 100%;
  overflow: hidden;
}
.main {
  margin: 15px 25px;
  width: calc(100% - 55px);
  overflow: hidden;
  height: calc(100% - 150px);
}
.el-dialog {
  text-align: left;
}
.top {
  width: calc(100% - 40px);
  margin: 0 0 15px 0;
  text-align: left;
  padding: 10px 20px;
  height: 40px;
  border-top: 2px solid #409eff;
  border-radius: 0.5rem 0.5rem 0 0;
  background: #fff;
}
.datepick {
  display: inline-block;
  padding: 0 10px 0 10px;
}
.kwrd {
  float: right;
}
.datepick,
.kwrd {
  font-size: 14px;
}
.impt,
.el-input {
  padding-right: 8px;
}
.impt,
.el-input {
  display: inline-block;
}
.el-input {
  width: 150px;
}
.el-dialog__wrapper {
  overflow: hidden;
  height: 100%;
}
.el-dialog__body {
  overflow: auto;
}
</style>
