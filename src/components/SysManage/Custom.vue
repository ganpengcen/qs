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
            <el-button type="text" @click="dg1=true,cus={}">+</el-button>
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
              <el-button type="primary" @click="crete()">确 定</el-button>
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
              <el-dialog width="30%" title="修改自定义项" :visible.sync="dg2">
                <div class="info">
                  <el-form label-width="100px">
                    <el-form-item label="标题">
                      <el-input v-model="cus1.tle"></el-input>
                    </el-form-item>
                    <el-form-item label="数据类型">
                      <el-select v-model="cus1.datype">
                        <el-option v-for="(i,e) in sels" :key="e" :label="i.label" :value="i.value"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="显示顺序">
                      <el-input v-model="cus1.ord"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <div class="chekbxs">
                        <el-checkbox v-model="cus1.ull">是否为空</el-checkbox>
                      </div>
                    </el-form-item>
                  </el-form>
                </div>
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
import api from "../../axios/api"
export default {
    name: "app",
  inject: ["reload"],
  components: {
    Header
  },
  data() {
    return {
      val:-1,
      modifs: [],
      shs: [],
      sels: [],
      cus: {},
      dg1: false,
      cus1: {},
      dg2: false
    };
  },
  created(){
    this.$get(api.getUserDefinedTypes).then(res=>{
      console.log(res)
      if(res.data.State==200){
        this.modifs=res.data.Data
      }
    });
    this.$get(api.getUserDefinedDataType).then(res=>{
      console.log(res)
      if(res.data.State ==200){
        this.sels=res.data.Data
        console.log(this.sels)
      }
    })
  },    
  methods: {
    crete(){
      this.dg1=false
      console.log(this.cus)
      let sth=this.cus
      this.$post(api.addUserDefined,sth).then(res=>{
        console.log(res)
        if(res.data.State==200){
          this.$message({
            type: "success",
            message: "创建成功"
          });
          this.reload()
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    getrow(e){
      console.log(this.modifs[e].Value)
      this.cus.DefinedType=this.modifs[e].value
    },
    send(e) {
      console.log(this.modifs[e].Value)
      let type=this.modifs[e].Value
      console.log(api.getUserDefinedItems+type)
      this.$get(api.getUserDefinedItems+type).then(res=>{
        console.log(res)
        if(res.data.State==200){
          this.shs=res.data.Data
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    get(row) {
      console.log(row);
      this.cus1 = row;
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
  max-height: 500px;
}
.el-col-4 {
  background-color: #fff;
  text-align: center;
  overflow: auto;
  height: calc(100vh - 230px);
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
