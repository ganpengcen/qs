<template>
  <div>
    <Header title="系统管理" text="操作员"></Header>
    <div class="main">
      <div class="right">
        <span>关键字:</span>
        <el-input v-model="sech" size="small"></el-input>
        <el-button type="primary" size="small">查询</el-button>
        <el-button type="success" size="small">角色管理</el-button>
      </div>
      <el-table :data="tdata" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column type="index" width="50" label="#" prop="num"></el-table-column>
        <el-table-column prop="uname" label="用户名" sortable></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="tel" label="电话"></el-table-column>
        <el-table-column prop="creator" label="创建人"></el-table-column>
        <el-table-column prop="creatime" label="创建时间" sortable></el-table-column>
        <el-table-column prop="stat" label="状态"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-dropdown trigger="click" placement="bottom-start">
              <el-button type="primary" size="small">
                操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(i,e) in opraion" :key="e">
                  <el-button size="small" :type="i.type">{{i.option}}</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div>
      <el-pagination
        layout="sizes,prev,pager,next"
        :page-size="5"
        :total="tdata.length"
        :page-sizes="[5,10,15,20,100]"
      ></el-pagination>
      </div>
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
      sech: "",
      tdata: [
        {
          num: 1,
          uname: "abc",
          name: "rrr",
          tel: "1567811",
          creator: "arc",
          creatime: "2019-7-31",
          stat: "正常"
        },
        {
          num: 1,
          uname: "abc",
          name: "rrr",
          tel: "1567811",
          creator: "arc",
          creatime: "2019-7-31",
          stat: "正常"
        },
        {
          num: 1,
          uname: "abc",
          name: "rrr",
          tel: "1567811",
          creator: "arc",
          creatime: "2019-7-31",
          stat: "正常"
        },
        {
          num: 1,
          uname: "abc",
          name: "rrr",
          tel: "1567811",
          creator: "arc",
          creatime: "2019-7-31",
          stat: "正常"
        },
        {
          num: 1,
          uname: "abc",
          name: "rrr",
          tel: "1567811",
          creator: "arc",
          creatime: "2019-7-31",
          stat: "正常"
        }
      ],
      opraion: [
        { option: "修改", type: "success" },
        { option: "删除", type: "danger" },
        { option: "重置", type: "info" },
        { option: "角色", type: "primary" }
      ]
    };
  }
};
</script>
<style scoped>
.main {
  border-top: 2px solid #409eff;
  border-radius: 3px;
  background: #fff;
  width: 96.2%;
  margin-left: 25px;
}
.el-input {
  width: 35%;
}
.right {
  float: right;
  margin: 15px 15px 15px 0;
}
.el-pagination{
    margin-top: 10px;
    text-align: center
}
</style>