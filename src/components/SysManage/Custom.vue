<template>
  <div class="content">
    <Header title="系统管理" text="自定义项管理"></Header>
    <div class="main">
      <el-row>
        <el-col :span="4">
          <div>
            <p>自定义类型:</p>
          </div>
          <div v-for="(i,e) in modifs" :key="e">
            <b @click="send(e)">{{i.title}}</b>
            <el-button type="text" @click="dg1=true">+</el-button>
          </div>
          <el-dialog width="30%" title="新建自定义项" :visible.sync="dg1">
            <el-form>
              <el-form-item label='标题'>
                <el-input v-model="cus.title"></el-input>
              </el-form-item>
              <el-form-item label="数据类型" >
                <el-select v-model="cus.type">
                  <el-option v-for="(i,e) in sels" :key="e" :label="i.label" :value="i.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="显示顺序">
                <el-input v-model="cus.to"></el-input>
              </el-form-item>
              <el-checkbox v-model="cus.chek">是否为空</el-checkbox>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dg1= false">取 消</el-button>
              <el-button type="primary" @click="dg1= false">确 定</el-button>
            </span>
          </el-dialog>
        </el-col>
        <el-col :span="18">
          <el-table
            :data="shs"
            border
            :cell-style="{'text-align':'center'}"
            height="calc(100vh - 370px)"
            :header-cell-style="{'text-align':'center'}"
            @row-click="get"
          >
            <el-table-column prop="tle" label="标题"></el-table-column>
            <el-table-column prop="datype" label="数据类型"></el-table-column>
            <el-table-column prop="dir" label="词典"></el-table-column>
            <el-table-column label="是否多选">
              <template slot-scope="scope">
                <el-checkbox disabled v-model="scope.row.mut"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="是否为空">
              <template slot-scope="scope">
                <el-checkbox disabled v-model="scope.row.ull"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <el-button type="text" @click="dg2=true">修改</el-button>
              <el-dialog width="30%" title="新建自定义项" :visible.sync="dg2">
            <el-form>
              <el-form-item label='标题'>
                <el-input v-model="cus1.tle"></el-input>
              </el-form-item>
              <el-form-item label="数据类型" >
                <el-select v-model="cus1.datype">
                  <el-option v-for="(i,e) in sels" :key="e" :label="i.label" :value="i.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="显示顺序">
                <el-input v-model="cus1.ord"></el-input>
              </el-form-item>
              <el-checkbox v-model="cus1.ull">是否为空</el-checkbox>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dg2= false">取 消</el-button>
              <el-button type="primary" @click="dg2= false">确 定</el-button>
            </span>
          </el-dialog>
              <el-button type="text">删除</el-button>
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
export default {
  components: {
    Header
  },
  data() {
    return {
      modifs: [
        {
          title: "1",
          info: [
            {
              tle: "123",
              datype: "字符",
              dir: "",
              mut: true,
              ull: true,
              ord: "1"
            },
            {
              tle: "123",
              datype: "字符",
              dir: "",
              mut: true,
              ull: true,
              ord: "1"
            },
            {
              tle: "123",
              datype: "字符",
              dir: "",
              mut: true,
              ull: true,
              ord: "1"
            },
            {
              tle: "123",
              datype: "字符",
              dir: "",
              mut: true,
              ull: true,
              ord: "1"
            },
            {
              tle: "123",
              datype: "字符",
              dir: "",
              mut: true,
              ull: true,
              ord: "1"
            },
            {
              tle: "123",
              datype: "字符",
              dir: "",
              mut: true,
              ull: true,
              ord: "1"
            }
          ]
        },
        {
          title: "2",
          info: [
            {
              tle: "124",
              datype: "字符",
              dir: "",
              mut: true,
              ull: false,
              ord: "1"
            }
          ]
        },
        {
          title: "3",
          info: [
            {
              tle: "125",
              datype: "字符",
              dir: "",
              mut: false,
              ull: true,
              ord: "3"
            }
          ]
        },
        {
          title: "4",
          info: [
            {
              tle: "1256",
              datype: "字符",
              dir: "",
              mut: true,
              ull: true,
              ord: "7"
            }
          ]
        },
        {
          title: "5",
          info: [
            {
              tle: "129",
              datype: "字符",
              dir: "",
              mut: true,
              ull: true,
              ord: "5"
            }
          ]
        }
      ],
      shs: [],
      sels: [
        { value: '选项1', label: "字符" },
        { value: '选项2', label: "日期" },
        { value: '选项3', label: "数字" },
        { value: '选项4', label: "整数" },
        { value: '选项5', label: "词典" },
        { value: '选项6', label: "是非" }
      ],
      cus: {},
      dg1:false,
      cus1: {},
      dg2:false
    };
  },
  methods: {
    send(e) {
      this.shs = this.modifs[e].info;
    },
    get(row){
        console.log(row)
        this.cus1=row
    }
  }
};
</script>
<style scoped>
.main {
  margin-left: 25px;
  overflow: auto;
  height: calc(100% - 60px)
}
.content {
  overflow: hidden;
  height: 100%;
}
.el-row {
  overflow: hidden;
  height: calc(100% - 50px);
}
.el-form {
    text-align: right;
}
.el-input{
    width: 54%;
}
.el-table {
  overflow: auto;
}
.el-col {
  max-height: 500px;
}
.el-col-4 {
  background-color: #fff;
  text-align: center;
  overflow: auto;
  height: calc(100vh - 230px)
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
  width: 79.3%;
}
.place {
  height: 1px;
  display: block;
}
</style>
