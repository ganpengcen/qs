<template>
  <div class="content">
    <Header title="系统管理" text="组织架构"></Header>
    <div class="main">
      <el-row>
        <el-col :span="5">
          <div class="title">
            <span>组织架构</span>
            <el-button type="text" @click="dialog1 = true">+</el-button>
            <el-dialog width="35%" :visible.sync="dialog1" title="新建组织架构">
              <div class="info">
                <el-form label-width="100px" v-model="newOrgnize">
                  <el-form-item label="上级:">
                    <el-input disabled v-model="newOrgnize.ParentID"></el-input>
                  </el-form-item>
                  <el-form-item label="名称:">
                    <el-input v-model="newOrgnize.OrgName"></el-input>
                  </el-form-item>
                  <el-form-item label="负责人:">
                    <el-input v-model="newOrgnize.Principal"></el-input>
                  </el-form-item>
                  <el-form-item label="电话:">
                    <el-input v-model="newOrgnize.PrincipalTel"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialog1 = false">取 消</el-button>
                <el-button type="primary" @click="submitOrgnize()">确 定</el-button>
              </span>
            </el-dialog>
          </div>
          <div>
            <el-tree
              @node-click="get"
              :data="treedata"
              accordion
              :props="defaultProps"
              :expand-on-click-node="true"
            >
              <span class="custom-tree-node" slot-scope="{node,data}">
                <span>{{node.label}}</span>
                <span>
                  <el-button size="mini" type="text" @click="dialog1 = true">+</el-button>
                  <el-button size="mini" type="text" @click="del()">-</el-button>
                  <el-button size="mini" type="text" @click="digl=true">新建人员</el-button>
                </span>
              </span>
            </el-tree>
            <el-dialog title="新建人员" width="60%" :visible.sync="digl">
              <div class="info">
                <el-form label-width="100px" :inline="true">
                  <el-form-item label="姓名:">
                    <el-input v-model="rowinf.name"></el-input>
                  </el-form-item>
                  <el-form-item label="工号:">
                    <el-input v-model="rowinf.gnum"></el-input>
                  </el-form-item>
                  <el-form-item label="组织架构:">
                    <el-cascader v-model="rowinf.stru" :options="treedata"></el-cascader>
                  </el-form-item>
                  <el-form-item label="性别:">
                    <el-input v-model="rowinf.sex"></el-input>
                  </el-form-item>
                  <el-form-item label="电话:">
                    <el-input v-model="rowinf.tel"></el-input>
                  </el-form-item>
                  <el-checkbox v-model="rowinf.leader">Leader</el-checkbox>
                  <el-checkbox v-model="rowinf.level">接受平级</el-checkbox>
                  <el-checkbox v-model="rowinf.user">新建用户</el-checkbox>
                  <el-divider></el-divider>
                  <el-form-item label="22:">
                    <el-input v-model="rowinf.nl"></el-input>
                  </el-form-item>
                  <el-form-item label="设备">
                    <el-input v-model="rowinf.device"></el-input>
                  </el-form-item>
                  <el-form-item label="日期">
                    <el-date-picker v-model="rowinf.date" type="date"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="词典">
                    <el-select v-model="rowinfo.cd">
                      <el-option v-for="(i,e) in picker" :key="e" :value="i.label" :label="i.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="digl= false">取 消</el-button>
                <el-button type="primary" @click="digl = false">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="tp">
            <div class="top">
              <span>关键字</span>
              <el-input placeholder="请输入关键字" size="small"></el-input>
              <el-button type="primary" size="small">搜索</el-button>
            </div>
          </div>
          <div class="tb">
            <el-table
              :data="tdab"
              border
              :cell-style="{'text-align':'center'}"
              :header-cell-style="{'text-align':'center'}"
              height="calc(100vh - 320px)"
              @row-click="getdata"
            >
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="sex" label="性别"></el-table-column>
              <el-table-column prop="account" label="账号"></el-table-column>
              <el-table-column label="Leader">
                <template slot-scope="scope">
                  <el-checkbox disabled v-model="scope.row.leader"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="接受平级">
                <template slot-scope="scope">
                  <el-checkbox disabled v-model="scope.row.level"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <el-button type="text" @click="dg1=true">修改</el-button>
                <el-dialog title="修改人员" width="60%" :visible.sync="dg1">
                  <div class="info">
                    <el-form label-width="100px" :inline="true">
                      <el-form-item label="姓名:">
                        <el-input v-model="rowinfo.name"></el-input>
                      </el-form-item>
                      <el-form-item label="工号:">
                        <el-input v-model="rowinfo.gnum"></el-input>
                      </el-form-item>
                      <el-form-item label="组织架构:">
                        <el-cascader v-model="rowinfo.stru" :options="treedata"></el-cascader>
                      </el-form-item>
                      <el-form-item label="性别:">
                        <el-input v-model="rowinfo.sex"></el-input>
                      </el-form-item>
                      <el-form-item label="电话:">
                        <el-input v-model="rowinfo.tel"></el-input>
                      </el-form-item>
                      <el-checkbox v-model="rowinfo.leader">Leader</el-checkbox>
                      <el-checkbox v-model="rowinfo.level">接受平级</el-checkbox>
                      <el-divider></el-divider>
                      <el-form-item label="22:">
                        <el-input v-model="rowinfo.nl"></el-input>
                      </el-form-item>
                      <el-form-item label="设备">
                        <el-input v-model="rowinfo.device"></el-input>
                      </el-form-item>
                      <el-form-item label="日期">
                        <el-date-picker v-model="rowinfo.date" type="date"></el-date-picker>
                      </el-form-item>
                      <el-form-item label="词典">
                        <el-select v-model="rowinf.cd">
                          <el-option
                            v-for="(i,e) in picker"
                            :key="e"
                            :value="i.label"
                            :label="i.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dg1= false">取 消</el-button>
                    <el-button type="primary" @click="dg1 = false">确 定</el-button>
                  </span>
                </el-dialog>
                <el-button type="text">删除</el-button>
              </el-table-column>
            </el-table>
          </div>
          <div class="pge">
            <el-pagination layout="prev,pager,next" :total="tdab.length" :page-size="7"></el-pagination>
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
      newOrgnize:{
        ParentID:'',
        OrgName:'',
        Principal:'',
        PrincipalTel:''
      },
      digl: false,
      picker: [
        { label: "选项1", value: "TesA" },
        { label: "选项2", value: "TesB" },
        { label: "选项3", value: "TesC" }
      ],
      rowinfo: {
        name: "asadas",
        gnum: "64565556566",
        leader: false,
        level: true,
        sex: "男",
        stru: "1-1-2",
        tel: "4564564464",
        date: "2019-7-11",
        cd: "TesA",
        device: 1
      },
      rowinf: {
        name: "asadas",
        gnum: "64565556566",
        leader: false,
        level: true,
        user: false,
        sex: "男",
        stru: "1-1-2",
        tel: "4564564464",
        date: "2019-7-11",
        cd: "TesA",
        device: 1
      },
      dg1: false,
      dialog1: false,
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
        {
          name: "asdasda",
          sex: "male",
          account: "asdasda1111",
          leader: true,
          level: true
        },
        {
          name: "asdasda",
          sex: "male",
          account: "asdasda1111",
          leader: true,
          level: true
        },
        {
          name: "asdasda",
          sex: "male",
          account: "asdasda1111",
          leader: true,
          level: true
        },
        {
          name: "asdasda",
          sex: "male",
          account: "asdasda1111",
          leader: true,
          level: true
        },
        {
          name: "asdasda",
          sex: "male",
          account: "asdasda1111",
          leader: true,
          level: true
        },
        {
          name: "asdasda",
          sex: "male",
          account: "asdasda1111",
          leader: true,
          level: true
        },
        {
          name: "asdasda",
          sex: "male",
          account: "asdasda1111",
          leader: true,
          level: true
        }
      ],
      defaultProps: { children: "children", label: "label" },
      las: "无上级"
    };
  },
  methods: {
    submitOrgnize () {
      this.$post(this.api.addOrg,
        this.newOrgnize
      ).then((data)=>{
        this.dialog1 = false
        console.log(data)
      })
      this.$get(this.api.getEmployeeModel+sessionStorage.AccountID).then(data=>{
        console.log(data)
      })
    },
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
    getdata(row) {
      console.log(row);
    }

  },
  created () {
  }
};
</script>
<style scoped>
.content {
  overflow: hidden;
  height: 100%;
}
.main {
  margin-left: 25px;
  overflow: auto;
  height: calc(100% - 85px);
}
.info{
  background: #fff;
  padding: 15px 0;
}
.el-col-5 {
  height: calc(100vh - 300px);
  font-size: 17px;
  overflow: auto;
}
.el-table .el-form,
.dlg .el-form {
  text-align: left;
}

.el-table .el-form .el-form-item,
.dlg .el-form .el-form-item {
  margin-left: 0;
}
.el-form--inline .el-form-item {
  vertical-align: baseline;
}
.title {
  padding-left: 20px;
}
.el-tree {
  margin-left: 5px;
}
.el-col-5,
.tp {
  background: #fff;
}
.tp {
  padding: 15px;
  width: calc(100% - 15px);
  text-align: right;
}
.el-col-18 {
  margin-left: 25px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding-right: 8px;
}
.el-form .el-input {
  width: 87%;
}
.title .el-form {
  text-align: center;
}
.title .el-form-item {
  margin: 10px 29px;
}
.top .el-input {
  width: 15%;
}
.top {
  text-align: right;
  width: 100%;
}
.tb {
  height: calc(100% - 15px);
  margin-top: 15px;
  overflow: hidden;
}
.el-table {
  overflow: auto;
}
.pge {
  text-align: right;
  height: 30px;
}
.el-dialog__wrapper {
  overflow: hidden;
  height: 100%;
}
</style>
