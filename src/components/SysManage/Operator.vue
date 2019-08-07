<template>
  <div class="content">
    <Header title="系统管理" text="操作员"></Header>
    
    <el-dialog width="30%" :visible.sync="charVis" title="角色管理">
      <div class="info">
        <el-form :inline="true">
          <el-form-item label="新建角色:">
            <el-input style="width:100%"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">添加</el-button>
          </el-form-item>
        </el-form>
        <div class="char">
          <div class="title">角色</div>
          <div class="chert">
            <button :class="active==e?'active':''" @click="getI(e)" v-for="(i,e) in btns">{{i.name}}</button>
          </div>
        </div>
        <div class="selec">
          <div class="top">
            <h3>权限配置</h3>
            <el-button type="danger">删除</el-button>
          </div>
          <el-divider></el-divider>
          <el-collapse accordion>
            <el-collapse-item v-for="(i,e) in colldata" :title="i.title" :name="i.name" :key="e">
              <div v-for="(r,x) in i.its" class="tt" :key="x">
                <h5>{{r.tt}}</h5>
                <el-checkbox v-model="r.sl1" :label="r.tsl1"></el-checkbox>
                <el-checkbox v-model="r.sl2" :label="r.tsl2"></el-checkbox>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="charVis = false">取 消</el-button>
        <el-button type="primary" @click="charVis = false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="main">
      <div class="top">
      <div class="right">
        <span>关键字:</span>
        <el-input v-model="sech" size="small"></el-input>
        <el-button type="primary" size="small">查询</el-button>
        <el-button type="success" size="small" @click="charVis=true">角色管理</el-button>
      </div>
    </div>
      <el-table
        :data="tdata"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        height="calc(100% - 80px)"
      >
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
                <el-dropdown-item>
                  <el-button size="small" type="success" @click="modVis=true">修改</el-button>
                  <el-dialog width="20%" title="修改用户" :visible.sync="modVis" :append-to-body="true">
                    <div class="info">
                      <el-checkbox v-model="see">查看他人数据</el-checkbox>
                      <el-checkbox v-model="modif">修改他人数据</el-checkbox>
                    </div>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="modVis = false">取 消</el-button>
                      <el-button type="primary" @click="modVis = false">确 定</el-button>
                    </span>
                  </el-dialog>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button size="small" type="danger" @click="del()">删除</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button size="small" type="info" @click="reset()">重置</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button size="small" type="primary">角色</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        layout="sizes,prev,pager,next"
        :page-size="5"
        :total="tdata.length"
        :page-sizes="[5,10,15,20,100]"
      ></el-pagination>
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
      btns: [
        { name: "asdas3das" },
        { name: "asdas3das" },
        { name: "asdas3das" },
        { name: "asdas3das" },
        { name: "asdas3das" },
        { name: "asdas3das" }
      ],
      active: 0,
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
      modVis: false,
      see: true,
      modif: false,
      charVis: false,
      colldata: [
        {
          title: "风险管理",
          name: 1,
          its: [
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            }
          ]
        },
        {
          title: "风险管理",
          name: 2,
          its: [
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            }
          ]
        },
        {
          title: "风险管理",
          name: 3,
          its: [
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            }
          ]
        },
        {
          title: "风险管理",
          name: 4,
          its: [
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            }
          ]
        },
        {
          title: "风险管理",
          name: 5,
          its: [
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            }
          ]
        },
        {
          title: "风险管理",
          name: 6,
          its: [
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            }
          ]
        },
        {
          title: "风险管理",
          name: 7,
          its: [
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            }
          ]
        },
        {
          title: "风险管理",
          name: 8,
          its: [
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            },
            {
              tt: "风控项配置",
              sl1: true,
              sl2: false,
              tsl1: "查看",
              tsl2: "维护"
            }
          ]
        }
      ]
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
    reset() {
      this.$confirm("确定要重置密码吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "重置成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置"
          });
        });
    },
    getI(e) {
      this.active = e;
    }
  }
};
</script>
<style scoped>
.info {
  background: #fff;
  padding: 5px;
}
.el-dialog__wrapper {
  overflow: hidden;
  height: 100%;
}
.selec {
  width: 65%;
  float: right;
  height: 350px;
  overflow: auto;
}
.selec h3 {
  text-align: left;
  width: 74%;
  display: inline-block;
}
.selec .top {
  margin-left: 0;
}
.chert button {
  width: 100%;
  background: #fff;
  font-size: 15px;
  border: 1px solid #aaa;
  padding: 8px 5px;
}
.active {
  background: #999 !important;
  border: 1px solid #fff !important;
}
.char {
  height: 350px;
  width: 30%;
  border: 1px solid #666;
  display: inline-block;
}
.title {
  text-align: center;
  padding: 10px 15px;
  background: #409eff;
  border-bottom: 1px solid #fff;
}
.content {
  height: 100%;
  overflow: hidden;
}
.main {
  border-top: 2px solid #409eff;
  border-radius: 3px;
  width: calc(100% - 55px);
  margin-left: 25px;
  height: calc(100% - 125px);
  overflow: auto;
}
.el-input {
  width: 15%;
}
.el-checkbox {
  display: block;
}
.tt h5 {
  margin-bottom: 5px;
}
.right {
  background: #fff;
  padding: 15px 15px 15px 0;
  margin: 0 0 15px 0;
}
.top {
  width: 100%;
  text-align: right;
}
.el-divider {
  margin: 5px 0;
}
.el-pagination {
  text-align: right;
  background: #fff;
  width:96.1%;
  margin-left: 25px;
}
.tt .el-checkbox {
  margin-top: 0;
}
</style>