<template>
  <div class="content">
    <Header title="系统管理" text="自定义项管理"></Header>
    <div class="main">
      <el-row>
        <el-col :span="4">
          <div>
            <p>自定义类型:</p>
          </div>
          <div v-for="(i,e) in modifs" :key="e" v-model="val" @click="getrow(e)">
            <b @click="send(e)" v-model="i.Value">{{i.Caption}}</b>
            <el-button type="text" @click="dg1=true">+</el-button>
          </div>
          <el-dialog width="25%" title="新建自定义项" :visible.sync="dg1">
            <div class="info">
              <el-form label-width="100px">
                <el-form-item label="标题">
                  <el-input v-model="cus.Caption"></el-input>
                </el-form-item>
                <el-form-item label="数据类型">
                  <el-select v-model="cus.DataType">
                    <el-option v-for="(i,e) in sels" :key="e" :label="i.Caption" :value="i.Value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="词典" v-if="cus.DataType==5">
                  <el-select v-model="cus.DictID">
                    <el-option v-for="(i,e) in dict" :key="e" :label="i.DictName" :value="i.ID"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="显示顺序">
                  <el-input v-model="cus.VisibleIndex"></el-input>
                </el-form-item>
                <el-form-item>
                  <div class="chekbxs">
                    <el-checkbox v-model="cus.IsEmpty">是否为空</el-checkbox>
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dg1= false">取 消</el-button>
              <el-button type="primary" @click="crete(),cus={}">确 定</el-button>
            </span>
          </el-dialog>
        </el-col>
        <el-col :span="18">
          <el-table
            :data="shs"
            border
            :cell-style="{'text-align':'center'}"
            height="calc(100vh - 250px)"
            :header-cell-style="{'text-align':'center'}"
            @row-click="get"
          >
            <el-table-column prop="Caption" label="标题"></el-table-column>
            <el-table-column prop="DataType" label="数据类型"></el-table-column>
            <el-table-column prop="DictName" label="词典"></el-table-column>
            <el-table-column label="是否多选">
              <template slot-scope="scope">
                <el-checkbox disabled v-model="scope.row.IsMulti"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="是否为空">
              <template slot-scope="scope">
                <el-checkbox disabled v-model="scope.row.IsEmpty"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="VisibleIndex" label="显示顺序"></el-table-column>
            <el-table-column label="操作">
              <el-button type="text" @click="dg2=true">修改</el-button>
              <el-dialog width="30%" title="修改自定义项" :visible.sync="dg2">
                <div class="info">
                  <el-form label-width="100px">
                    <el-form-item label="标题">
                      <el-input v-model="cus1.Caption"></el-input>
                    </el-form-item>
                    <el-form-item label="数据类型">
                      <el-select v-model="cus1.DataType">
                        <el-option
                          v-for="(i,e) in sels"
                          :key="e"
                          :label="i.Caption"
                          :value="i.Value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="词典" v-if="cus1.DataType=='词典'||cus1.DataType==5">
                      <el-select v-model="cus1.DictID">
                        <el-option v-for="(i,e) in dict" :key="e" :label="i.DictName" :value="i.ID"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="显示顺序">
                      <el-input v-model="cus1.VisibleIndex"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <div class="chekbxs">
                        <el-checkbox v-model="cus1.IsEmpty">是否为空</el-checkbox>
                        <el-checkbox v-model="cus1.IsMulti">是否多选</el-checkbox>
                      </div>
                    </el-form-item>
                  </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dg2= false">取 消</el-button>
                  <el-button type="primary" @click="mdf()">确 定</el-button>
                </span>
              </el-dialog>
              <el-button type="text" @click="delcos()">删除</el-button>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div class="place"></div>
  </div>
</template>
<script>
import Header from "../assembly/Header";
import api from "../../axios/api";
export default {
  name: "app",
  inject: ["reload"],
  components: {
    Header
  },
  data() {
    return {
      dict: [],
      val: -1,
      modifs: [],
      shs: [],
      sels: [],
      cus: {},
      dg1: false,
      cus1: {},
      dg2: false
    };
  },
  created() {
    this.$get(api.getUserDefinedTypes).then(res => {
      console.log(res);
      if (res.data.State == 200) {
        this.modifs = res.data.Data;
      }
    });
    this.$get(api.getUserDefinedDataType).then(res => {
      console.log(res);
      if (res.data.State == 200) {
        this.sels = res.data.Data;
        console.log(this.sels);
      } else if (res.data.State == 1000) {
        this.$message.error(res.data.Msg);
      }
    });
    this.$get(api.Dict.getDictTypeItems).then(res => {
      console.log(res);
      if (res.data.State == 200) {
        this.dict = res.data.Data;
      }
    });
    this.$get(api.getUserDefinedItems + "1")
      .then(res => {
        console.log(res);
        if (res.data.State == 200) {
          this.shs = res.data.Data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    crete() {
      this.dg1 = false;
      if (this.cus.DataType != 5) {
        this.cus.DictID = "00000000-0000-0000-0000-000000000000";
      }
      this.cus.IsMulti = false;
      if (!this.cus.IsEmpty) {
        this.cus.IsEmpty = false;
      }
      console.log(this.cus);
      let sth = this.cus;
      this.$post(api.addUserDefined, sth)
        .then(res => {
          console.log(res);
          if (res.data.State == 200) {
            this.$message({
              type: "success",
              message: "创建成功"
            });
            this.reload();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    mdf() {
      this.dg2 = false;
      if (this.cus1.DataType != 5) {
        this.cus1.DictID = "00000000-0000-0000-0000-000000000000";
      }
      if (!this.cus1.IsEmpty) {
        this.cus1.IsEmpty = false;
      }
      if (!this.cus1.IsMulti) {
        this.cus1.IsMulti = false;
      }
      let mdfs = this.cus1;
      console.log(mdfs);
      this.$post(api.editUserDefined, mdfs)
        .then(res => {
          console.log(res);
          if (res.data.State == 200 && res.data.Data == true) {
            this.$message.success("修改成功");
            this.reload();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getrow(e) {
      console.log(this.modifs[e].Value);
      let dft = this.modifs[e].Value;
      this.cus.DefinedType = dft;
      console.log(this.cus.DefinedType);
    },
    send(e) {
      console.log(this.modifs[e].Value);
      let type = this.modifs[e].Value;
      console.log(api.getUserDefinedItems + type);
      this.$get(api.getUserDefinedItems + type)
        .then(res => {
          console.log(res);
          if (res.data.State == 200) {
            this.shs = res.data.Data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    get(row) {
      console.log(row);
      this.cus1 = row;
    },
    delcos() {
      this.$confirm("确定要删除该条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(this.cus1.ID);
          let url = api.delUserDefined + this.cus1.ID;
          this.$get(url)
            .then(res => {
              console.log(res)
              if (res.data.State == 200 && res.data.Data == true) {
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
.info {
  background: #fff;
  padding: 15px;
}
.main {
  margin-left: 25px;
  overflow: auto;
  height: calc(100% - 60px);
  width: calc(100% + 19px);
}
.chekbxs {
  width: 100%;
  text-align: left;
}
.content {
  overflow: hidden;
  height: 100%;
}
.el-row {
  overflow: hidden;
  height: calc(100% - 50px);
}
.el-select {
  width: 100%;
}
.el-table {
  overflow: auto;
}
.el-col {
  max-height: 687px;
}
.el-col-4 {
  background-color: #fff;
  text-align: center;
  overflow: auto;
  height: calc(100vh - 250px);
  width: 18.22%;
}
.el-col-4 p,
.el-col-5 b {
  font-size: 16px;
  font-weight: 500;
}
.el-col-4 b:hover {
  cursor: pointer;
}
.el-col-4 p {
  margin: 5px 0 0 5px;
  text-align: left;
}
.el-col-18 {
  margin-left: 25px;
  width: 75w%;
}
.place {
  height: 1px;
  display: block;
}
</style>
