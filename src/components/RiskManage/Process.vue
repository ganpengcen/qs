<template>
  <div class="content">
    <Header title="风险管理" text="作业流程"></Header>
    <div class="main">
      <div class="top">
      <el-row>
        <el-col :span="4">
          <el-button type="primary" @click="addTextFlow()">新建</el-button>
        </el-col>
        <el-col :span="9">
          <span>关键字:</span>
          <el-input placeholder="请输入关键字" v-model="key"></el-input>
          <el-button type="primary" @click="getTextFlow">查询</el-button>
          <a href="#">导出为Excel</a>
        </el-col>
      </el-row>
    </div>
      <el-table
        height="calc(100% - 73px)"
        border
        :data="processTable"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        @row-click="inf"
      >
        <el-table-column type="expand">
          <template slot-scope="prop"></template>
        </el-table-column>
        <el-table-column label="作业编号" prop="Code"></el-table-column>
        <el-table-column label="名称" prop="Name"></el-table-column>
        <el-table-column label="流程回退">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.IsBackReturn" disabled></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="作业描述" prop="Memo"></el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope">
            <el-button type="text" @click="changeFlow(scope.row.ID)">修改</el-button>
            <el-button type="text" @click="delOpreation(scope.row.ID)">删除</el-button>
            <el-button type="text" @click="dg3=true">流程</el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>

    <div class="pge">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page.index"
        :page-size="page.size"
        :page-sizes="[3, 7, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total.sync="page.total">
      </el-pagination>
    </div>

    <el-dialog width="40%" :visible.sync="dg1" title="新建作业" style="overflow: auto">
      <div class="info">
        <el-form :inline="true" label-width="75px">
          <el-form-item label="作业编号">
            <el-input v-model="tetxFlow.Code"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="tetxFlow.Name"></el-input>
          </el-form-item>
          <el-form-item label="作业岗位">
            <el-select v-model="tetxFlow.PostID">
              <el-option :label="item.PostName" :value="item.PostID" v-for="item,index in post" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="流程回退">
            <el-checkbox v-model="tetxFlow.IsBackReturn"></el-checkbox>
          </el-form-item>
          <el-form-item label="作业描述">
            <el-input type="textarea" :rows="3" v-model="tetxFlow.Memo"></el-input>
          </el-form-item>
        </el-form>
          <el-divider></el-divider>
        <div style="margin-top: 20px">
          <el-form labelWidth="75px" :inline="true">
            <el-form-item v-for="(item, index) in userDefine" :label="item.Caption" :key="index">
              <el-input v-if="item.DataType ==='字符'" v-model="item.value" style="width: 220px"></el-input>
              <el-select v-model="item.arr" v-if="item.DataType === '词典'" :multiple="true" :collapse-tags="true">
                <el-option v-for="(a, b) in item.Dictarr" :key="b" :value="a.ID" :label="a.Name"></el-option>
              </el-select>
              <el-checkbox v-model="item.checked" v-if="item.DataType === '是非'"></el-checkbox>
              <el-input v-if="item.DataType ==='整数'" v-model="item.value" style="width: 220px"></el-input>
              <el-input v-if="item.DataType ==='数字'" v-model="item.value" style="width: 220px"></el-input>
              <el-date-picker v-if="item.DatTYpe==='日期'" v-model="item.value"></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dg1 = false">取 消</el-button>
        <el-button type="primary" @click="submitTextFlow">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog width="40%" :visible.sync="dg2" title="修改作业" style="overflow: auto">
      <div class="info">
        <el-form :inline="true" label-width="75px">
          <el-form-item label="作业编号">
            <el-input v-model="tetxFlow.Code"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="tetxFlow.Name"></el-input>
          </el-form-item>
          <el-form-item label="作业岗位">
            <el-select v-model="tetxFlow.PostID">
              <el-option :label="item.PostName" :value="item.PostID" v-for="(item,index) in post" :key="item.ID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="流程回退">
            <el-checkbox v-model="tetxFlow.IsBackReturn"></el-checkbox>
          </el-form-item>
          <el-form-item label="作业描述">
            <el-input type="textarea" :rows="3" v-model="tetxFlow.Memo"></el-input>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div style="margin-top: 20px">
          <el-form labelWidth="75px" :inline="true">
            <el-form-item v-for="(item, index) in userDefine" :label="item.Caption" :key="index">
              <el-input v-if="item.DataType ==='字符'" v-model="item.value" style="width: 220px"></el-input>
              <el-select v-model="item.arr" v-if="item.DataType === '词典'" :multiple="true" :collapse-tags="true">
                <el-option v-for="(a, b) in item.Dictarr" :key="b" :value="a.ID" :label="a.Name"></el-option>
              </el-select>
              <el-checkbox v-model="item.checked" v-if="item.DataType === '是非'"></el-checkbox>
              <el-input v-if="item.DataType ==='整数'" v-model="item.value" style="width: 220px"></el-input>
              <el-input v-if="item.DataType ==='数字'" v-model="item.value" style="width: 220px"></el-input>
              <el-date-picker v-if="item.DatTYpe==='日期'" v-model="item.value"></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dg2 = false">取 消</el-button>
        <el-button type="primary" @click="submitChange">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog width="65%" title="流程节点" :visible.sync="dg3">
      <div class="info">
        <div class="ttl">
          <span>作业编号:{{info.numb}}</span>
          <span>作业名称:{{info.pname}}</span>
          <el-checkbox v-model="info.bck" disabled>流程回退</el-checkbox>
        </div>
        <el-form label-width="75px" :inline="true">
          <el-form-item label="节点顺序">
            <el-input v-model="nord"></el-input>
          </el-form-item>
          <el-form-item label="节点名称">
            <el-input v-model="nname"></el-input>
          </el-form-item>
          <el-form-item label="节点岗位">
            <el-input v-model="njb"></el-input>
          </el-form-item>
          <el-form-item label="节点描述">
            <el-input type="textarea" :rows="3" v-model="ndes"></el-input>
          </el-form-item>
          <el-button type="primary" @click="add()">增加</el-button>
        </el-form>
        <el-table :data="dgtb" border :cell-style="{'padding':'0'}">
          <el-table-column label="节点顺序" prop="nord"></el-table-column>
          <el-table-column label="节点名称" prop="nname"></el-table-column>
          <el-table-column label="节点岗位" prop="njb"></el-table-column>
          <el-table-column label="描述" prop="ndes"></el-table-column>
          <el-table-column label="操作">
            <el-button type="text" @click="del()">删除</el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  //获取岗位位写
import Header from "../assembly/Header";
export default {
  components: {
    Header
  },
  data() {
    return {
      post:[],
      userDefine:[],
      tetxFlow :{
        Code: "",
        Name: "",
        IsBackReturn: false,
        PostID: '',
        Memo: ""
      },
      fileList: [],
      upFileList: [],
      page:{
        index:1,
        size:3,
        total:0
      },
      key:'',
      ID: '',

      dg1: false,
      nord: "",
      nname: "",
      njb: "",
      ndes: "",
      dg2: false,
      dg3: false,
      processTable: [
        { numb: "1", pname: "askld", bck: true, descr: "爱仕达撒所撒多" },
        { numb: "1", pname: "askld", bck: false, descr: "爱仕达撒所撒多" },
        { numb: "1", pname: "askld", bck: false, descr: "爱仕达撒所撒多" },
        { numb: "1", pname: "askld", bck: true, descr: "爱仕达撒所撒多" },
        { numb: "1", pname: "askld", bck: true, descr: "爱仕达撒所撒多" },
        { numb: "1", pname: "askld", bck: true, descr: "爱仕达撒所撒多" },
        { numb: "1", pname: "askld", bck: true, descr: "爱仕达撒所撒多" },
        { numb: "1", pname: "askld", bck: true, descr: "爱仕达撒所撒多" },
        { numb: "1", pname: "askld", bck: true, descr: "爱仕达撒所撒多" },
      ],
      info: {},
      dgtb: []
    };
  },
  methods: {
    handleSizeChange(val) {   //修改分页条数
      this.page.size = val
      console.log('分页数改变')
      console.log('分页数:',this.page.size)
      this.getTextFlow(this.ID)
    },  //分页数目改变
    handleCurrentChange(val) {   //当前展示页
      this.page.index = val
      this.getTextFlow(this.ID)
    },  //当前页改变
    addTextFlow() {
      this.tetxFlow = []
      this.getUserDefines()
      this.getPostSelector()
    }, //新建作业流程窗口
    getPostSelector () {
      this.post = []
      this.$get(this.api.getPostSelector).then(res=>{
        console.log('岗位返回参数：',res.data)
        if(res.data.State === 200) {
          this.post = res.data.Data
        }
      })
    }, //获取岗位
    getUserDefines () {
      this.userDefine = []
      this.tetxFlow = {
        Code: "",
          Name: "",
          IsBackReturn: false,
          PostID: "",
          Memo: ""
      }
      this.$get(this.api.UserDefined.getUserDefinedItems + '4').then(res=>{
        if(res.data.State === 200){
          this.dg1 = true
          console.log('dg1',this.dg1)
          console.log('自定义项返回值:',res.data.Data)
          res.data.Data.forEach(item=>{
            this.$set(item, 'arr', [])
            this.$set(item, 'checked', false)
            if(item.DataType === '词典'){
              this.$get(this.api.UserDefined.dict + item.DictID).then(res=>{
                console.log('自定义项词典返回值:',res.data)
                item.Dictarr = res.data.Data
                console.log('Dictarr',item.Dictarr)
              })
            }
          })
         this.userDefine = res.data.Data
        }
      })
    },  //获取用户自定义项
    getUserDefinedList(ID){
      let params={
        "DefinedType":4,
        "BusinessID": ID
      }
      console.log('自定义参数:',params)
      this.$post(this.api.UserDefined.getUserDefinedList,params).then(res=>{
        console.log('自定义项详情:',res)
        if(res.data.State === 200){
          res.data.Data.forEach(item=>{
            if(item.DataType === '词典') {
              item.ItemValue = JSON.parse(item.ItemValue)
            }
          })
          this.userDefine =res.data.Data
          console.log('userDefine',this.userDefine)
        }else{
          this.$message({
            type:'error',
            message:res.data.Msg
          })
        }
      })
    },
    submitTextFlow () {
      let userData = []
      this.userDefine.forEach(item=>{
        if (item.DataType === '词典') {
          userData.push({
            "DefinedID": item.ID,
            "DefinedValue": item.arr
          })
        } else if(item.DataType === '是非') {
          userData.push({
            "DefinedID": item.ID,
            "DefinedValue": item.checked
          })
        } else {
          userData.push({
            "DefinedID": item.ID,
            "DefinedValue": item.value
          })
        }
      })
      let param = {
        "Code":this.tetxFlow.Code ,
        "Name": this.tetxFlow.Name,
        "IsBackReturn": this.tetxFlow.IsBackReturn,
        "PostID": "250db19e-76cd-4ff7-b527-0bd4806ef1d8",
        "Memo": this.tetxFlow.Memo,
        "UserDefineds": userData
      }
      console.log('新建作业流程上传参数:',param)
      this.$post(this.api.TextFlow.addOpreation, param).then(res=>{
        console.log('新建作业流程返回:',res.data)
        if(res.data.State == 200) {
          this.dg1 = false
          this.getTextFlow()
          this.$message({
            type:'success',
            message:'新建成功'
          })
        }else {
          this.$message({
            type:'error',
            message:res.data.Msg
          })
        }
      })
    }, //提交作业流程
    getTextFlow() {
      let param = {
        "PageSize": this.page.size,
        "PageIndex": this.page.index - 1,
        "KeyWord": "",
        "Query": {
          "Code": this.key,
          "Name": this.key
        },
        "OrderString": "",
        "ToExcel": false
      }
      this.$post(this.api.TextFlow.getOpreationsPage,param).then(res=>{
        console.log('分页返回值:',res)
        if(res.data.State === 200) {
          this.page.total = res.data.Data.Items
          this.processTable = res.data.Data.Data
        }else {
          this.$message({
            type:'error',
            messgae:res.data.Msg
          })
        }
      })
      this.key = ''
    }, //分页获取作业列表
    changeFlow(ID) {
      this.ID = ID
      this.dg2 = true
      this.post = []
      this.userDefine = []
      this.tetxFlow = []
      this.getUserDefinedList(ID)
      this.getOpreationModel(ID)
      this.getPostSelector()
    },  //修改流程
    getOpreationModel(ID) {
      this.$get(this.api.TextFlow.getOpreationModel+ID).then(res=>{
        console.log('作业模型返回值:',res)
        if(res.data.State === 200){
          this.tetxFlow = res.data.Data
        } else {
          this.$message({
            type:'error',
            message:res.data.Msg
          })
        }
      })
    },  //获取作业模型
    submitChange() {
      let user = []
      let param = {
        "ID": this.ID,
        "Code":this.tetxFlow.Code ,
        "Name":this.tetxFlow.Name,
        "IsBackReturn": this.tetxFlow.IsBackReturn,
        "PostID": this.tetxFlow.PostID,
        "Memo": this.tetxFlow.Memo,
        "UserDefineds": user
      }
    }, //提交修改
    delOpreation(ID) {
      this.$confirm("将要执行删除操作,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$get(this.api.TextFlow.delOpreation+ID).then(res=>{
            if(res.data.State === 200){
              this.getTextFlow()
              this.$message({
                type:'success',
                message:'删除成功'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },  //删除作业流程

    inf(row) {
      console.log(row);
      this.info = row;
    },
    add() {
      let ls = {};
      ls.nord = this.nord;
      ls.nname = this.nname;
      ls.njb = this.njb;
      ls.ndes = this.ndes;
      this.dgtb.push(ls);
      console.log(this.dgtb);
    }
  },
  created () {
    this.getTextFlow()
  }
};
</script>
<style scoped>
.info{
  background: #fff;
  padding: 15px;
}
.content {
  height: 100%;
  overflow: hidden;
}
.main {
  width: calc(100% - 50px);
  height: calc(100% - 153px);
  margin:10px 0 15px 25px;
  overflow: hidden;
}
.el-textarea {
  width: 460px;
}
.el-col-4 .el-button {
  margin: 10px 0 10px 20px;
}
.el-col-9 .el-input {
  width: 35%;
}
.el-col-9 {
  float: right;
  margin: 0 0 10px 0;
}
.el-row {
  background: #fff;
  border-top: 2px solid #049eff;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 15px;
}
.el-col-9 > a {
  font-size: 14px;
  display: inline-block;
  text-align: center;
  background-color: #409eff;
  color: #fff;
  margin: 10px 0 0 0;
  line-height: 40px;
  width: 100px;
  text-decoration: none;
  border-radius: 3px;
}
.el-table {
  width: 100%;
}
.top {
  width: 100%
}
.el-dialog .el-form .el-button {
  margin-top: 35px;
}
.ttl {
  padding-left: 8px;
  margin-bottom: 15px;
}
.ttl > span {
  margin-right: 15px;
}
.pge {
  width: calc(100% - 50px);
  margin-left: 25px;
  height: 35px;
  text-align: right;
  background: #fff;
}
</style>
