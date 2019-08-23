<template>
  <div class="content">
    <Header title="风险管理" text="风控项管理"></Header>
    <div class="main">
      <div class="top">
        <p>类别</p>
      </div>
      <el-row>
        <el-col :span="4">
          <div>
            <div class="ad">
              <el-button type="text" size="mini" @click="dgone">+</el-button>
            </div>
            <el-tree
              @node-click="getDangerList"
              :data="SortTree"
              accordion
              :props="defaultProps"
            >
              <span class="custom-tree-node" slot-scope="{node,data}">
                <span>{{data.SortName}}</span>
                <span>
                  <el-button size="mini" type="text" @click="addChildTo(data)">+</el-button>
                  <el-button size="mini" type="text" @click="deleteSort(data.ID)">-</el-button>
                  <el-button size="mini" type="text" @click="addDangerDg(data.ID)">
                  <i class="el-icon-edit"></i>
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </el-col>
        <el-col :span="19">
          <el-table
            :data="tableDetail"
            border
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            height="calc(100vh - 300px)"
            @row-click="inf"
          >
            <el-table-column label="编号" prop="Code"></el-table-column>
            <el-table-column label="名称" prop="Name"></el-table-column>
            <el-table-column label="类别" prop="DangerSortName"></el-table-column>
            <el-table-column label="操作">
              <div slot-scope="scope">
                <el-button type="text" @click="changeItem(scope.row)">修改</el-button>
                <el-button type="text" @click="del(scope.row.ID)">删除</el-button>
                <el-button type="text" @click="stander(scope.row)">执行标准</el-button>
              </div>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <el-dialog width="25%" :visible.sync="dg1" :append-to-body="true" title="新建风控项类别">
        <div class="info">
          <el-form label-width="50px">
            <el-form-item label="上级:">
              <el-input disabled v-model="no"></el-input>
            </el-form-item>
            <el-form-item label="名称:">
              <el-input v-model="DangerSort.SortName"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
                <el-button @click="dg1 = false">取 消</el-button>
                <el-button type="primary" @click="addDangerSort">确 定</el-button>
              </span>
      </el-dialog>
      <el-dialog width="25%" :visible.sync="dgChild" :append-to-body="true" title="新建风控项类别">
        <div class="info">
          <el-form label-width="50px">
            <el-form-item label="上级:">
              <el-input disabled v-model="this.Parent.SortName"></el-input>
            </el-form-item>
            <el-form-item label="名称:">
              <el-input v-model="DangerSort.SortName"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
                <el-button @click="dgChild = false">取 消</el-button>
                <el-button type="primary" @click="addDangerSort2">确 定</el-button>
              </span>
      </el-dialog>

      <el-dialog title="新建风控项" width="65%" :visible.sync="dg2">
        <div class="info">
          <el-form :inline="true" v-model="item">
            <el-form-item label="编号">
              <el-input v-model="item.Code"></el-input>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="item.Name"></el-input>
            </el-form-item>
            <el-form-item label="风险等级">
              <el-select v-model="item.DangerLevel">
                <el-option v-for="i,d in DangerLevelSelector" :label="i.Name" :key="i.ID" :value="i.ID"></el-option>
              </el-select>
            </el-form-item>
            <el-button @click="addItem" type="primary">增加</el-button>
          </el-form>
          <el-table border :data="itemtable">
            <el-table-column label="编号" prop="Code"></el-table-column>
            <el-table-column label="名称" prop="Name"></el-table-column>
            <el-table-column label="风险等级" prop="DangerLevel"></el-table-column>
            <el-table-column label="操作">
              <div slot-scope="scope">
                <el-button type="text" @click="del()">删除</el-button>
              </div>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dg2 = false">取 消</el-button>
            <el-button type="primary" @click="submitDanger">确 定</el-button>
          </span>
      </el-dialog>

      <el-dialog title="修改风控项" width="20%" :visible.sync="dg3">
        <div class="info">
          <el-form label-width="100px" v-model="cd">
            <el-form-item label="编号">
              <el-input v-model="cd.Code"></el-input>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="cd.Name"></el-input>
            </el-form-item>
            <el-form-item label="类别">
              <el-cascader :options="SortTree" v-model="cd.DangerSortID" :props="prp" clearable @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item label="风险等级">
              <el-select v-model="cd.DangerLevel">
                <el-option v-for="i,b in DangerLevelSelector" :label="i.Name" :key="i.ID" :value="i.ID"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dg3 = false">取 消</el-button>
          <el-button type="primary" @click="submitChange">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="安全标准" :visible.sync="dg4">
        <div class="info">
          <div class="title">
            <span>风控项编号:{{standerDetail.Code}}</span>
            <span>风控项名称:{{standerDetail.Name}}</span>
            <span>风控项类别:{{standerDetail.DangerSortName}}</span>
          </div>
          <el-form :inline="true">
            <el-form-item label="执行标准">
              <el-select v-model="standtable.select">
                <el-option v-for="i,b in standerSelector" :label="i.Name" :value="i.ID" :key="i.ID"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" @click="addStander">增加</el-button>
          </el-form>
          <el-table border :data="standtable">
            <el-table-column label="编号" prop="rtnum"></el-table-column>
            <el-table-column label="名称" prop="rname"></el-table-column>
            <el-table-column label="类别" prop="rtype"></el-table-column>
            <el-table-column label="管控措施" prop="mesure"></el-table-column>
            <el-table-column label="操作">
              <el-button type="text" @click="del()">删除</el-button>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dg4 = false">取 消</el-button>
          <el-button type="primary" @click="dg4 = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  const GUID ='00000000-0000-0000-0000-000000000000'
import Header from "../assembly/Header";
export default {
  components: {
    Header
  },
  data() {
    return {
      no:'无上级',
      Parent:'',
      ParentID:'',
      DangerSort:{
        ParentID:'',
        Level:'',
        SortName:''
      },
      Danger:{
        DangerSortID:'',
        Dangers:''
    },
      DangerID:'',
      prp: { children: "Children", label: "SortName",checkStrictly: true,value:"ID"},
      defaultProps: { children: "Children", label: "SortName"},
      SortTree:[],
      dgChild:false,
      dg1: false,
      dg3: false,
      dg2: false,
      dg4: false,
      tableDetail:[],
      item:{
      "Code": "",
      "Name": "",
      "DangerLevel": ""
    },
      items:[],
      DangerLevelSelector:[],
      itemtable:[],
      changeDetail:{},
      cd:{},
      pID:{},
      standerDetail:{},

      sele: "",
      num: "",
      nme: "",
      rskd: "",
      las: "无上级",
      rskr: "",
      tRdata: [
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
      rTable: [
        { rtnum: "1", rname: "asklada", rtype: "askjaas" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas" }
      ],
      info: {},
      newif: [],
      standtable: [
        { rtnum: "1", rname: "asklada", rtype: "askjaas", mesure: "1as4das" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas", mesure: "1as4das" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas", mesure: "1as4das" },
        { rtnum: "1", rname: "asklada", rtype: "askjaas", mesure: "1as4das" }
      ]
    };
  },
  methods: {
    handleChange(data){
      console.log('data',data)
    },
    addDangerSort(){
      let param = {
        "ParentID": '',
        "Level": '',
        "SortName":this.DangerSort.SortName,
      }
      this.$post(this.api.addDangerSort, param).then(res=>{
        if(res.data.State === 200){
          this.dg1 =false
          this.DangerSort={
            ParentID:'',
              Level:'',
              SortName:''
          }
          this.getDangerSortTree(GUID)
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
    },  //新建风控项类别
    addDangerSort2(){
      let param = {
        "ParentID": this.Parent.ID,
        "Level": '',
        "SortName":this.DangerSort.SortName,
      }
      this.$post(this.api.addDangerSort, param).then(res=>{
        if(res.data.State === 200){
          this.dgChild =false
          this.DangerSort={
            ParentID:'',
            Level:'',
            SortName:''
          }
          this.getDangerSortTree(GUID)
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
    },
    dgone() {
      this.dg1 = true
    }, //风控项类别窗口
    getDangerSortTree(ID){
      this.$get(this.api.getDangerSortTree+ID).then(res=>{
        console.log('风险类bie树',res)
        if(res.data.State === 200){
          this.SortTree = res.data.Data
        } else {
          ths.$message({
            type:'error',
            message:res.data.Msg
          })
        }
      })
    },//获取风控项类别树
    addChildTo(ID){
      console.log('ID',ID)
      this.dgChild = true
      this.Parent = ID
    },//新建风险类别子节点
    getDangerList(data){
      this.parentID = data.ID
      this.pID = data
      console.log('分页参数:',data.ID)
      this.$get(this.api.getDangerListL+data.ID).then(res=>{
        console.log('table返回值',res)
        if(res.data.State === 200){
          this.tableDetail = res.data.Data
        }else {
          this.$message({
            type:'error',
            message:res.data.Msg
          })
        }
      })
    },//分页获取风控项
    deleteSort(ID){
      this.$confirm('你将删除该类被是否继续？','提示',{
        cancelButtonText:'取消',
        confirmButtonText:'确认',
        type:'wraning'
      }).then(()=>{
        this.$get(this.api.delDangerSort+ID).then(res=>{
          if(res.data.State === 200){
            this.getDangerSortTree(GUID)
            this.$message({
              type:'success',
              message:'删除成功'
            })
          }else {
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      })
    },//删除风控项类别
    addDangerDg(ID) {
      this.itemtable= []
      this.items = []
      this.DangerID = ID
      this.dg2 = true
      this.getDangerLevelSelector()

    },  //新建风控项
    addItem() {
      if (this.item.Code && this.item.Name && this.item.DangerLevel) {
      this.items.push(this.item)
      this.itemtable.push(this.item)
      this.item = {
        "Code": "",
        "Name": "",
        "DangerLevel": ""
      }
    } else {
      this.$message({
        type:'error',
        message:'所有字段不能为空'
      })
      }
      },
    //添加风控项
    submitDanger(){
      let param = {
        "DangerSortID": this.parentID,
        "Dangers": this.items
      }
      console.log('新建风控项参数:',param)
      this.$post(this.api.addDanger,param).then(res=>{
        console.log('新建风控项返回值:',res)
          if(res.data.State === 200){
          param.ID = this.parentID
          this.getDangerList(param)
          this.dg2 = false
          this.$message({
            type:'success',
            message:'新建成功'
          })
          }else{
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
      })
    }, // 提交风控项
    getDangerLevelSelector(){
      this.$get(this.api.getDangerLevelSelector).then(res=>{
        console.log('获取风险点选择器返回值:',res)
        if(res.data.State === 200){
          this.DangerLevelSelector = res.data.Data
        } else {
          this.$message({
            type:'error',
            message:res.data.Msg
          })
        }
      })
    },//获取风险等级
    changeItem(data){
      this.dg3 = true
      this.cd =[]
      this.getDangerSortTree(GUID)
      this.getDangerLevelSelector()
      this.getDangerModel(data.ID)
      this.changeDetail = data
    },//修改风控项
    submitChange() {
      let param = {
        "ID":this.cd.ID,
        "DangerSortID":this.cd.DangerSortID[this.cd.DangerSortID.length-1],
        "Code": this.cd.Code,
        "Name": this.cd.Name,
        "DangerLevel": this.cd.DangerLevel
      }
      console.log('修改参数：',param)
      this.$post(this.api.editDanger,param).then(res=>{
        if(res.data.State === 200){
          this.dg3 = false
          this.$get(this.api.getDangerListL+this.cd.DangerSortID).then(res=>{
            console.log('table返回值',res)
            if(res.data.State === 200){
              this.tableDetail = res.data.Data
            }else {
              this.$message({
                type:'error',
                message:res.data.Msg
              })
            }
          })
          this.$message({
            type:'success',
            message:'修改成功'
          })
        }
      })
    },  //提交修改
    getParentsItems(ID){
      console.log('ID:',ID)
      this.$get(this.api.getParentsItems+ID).then(res=>{
        console.log('获取风控项父级ID返回值:',res)
        if(res.data.State === 200){
          let d= []
          res.data.Data.forEach(i=>{
            d.push(i.ID)
          })
          d.push(ID)
          this.cd.DangerSortID = []
          this.cd.DangerSortID = d

          console.log('风控项父级集合',d)
        }
      })
    },//获取风控项父级信息
    getDangerModel(ID){
    this.$get(this.api.getDangerModel+ID).then(res=>{
      console.log('获取风控项模型:',res)
      if(res.data.State === 200){
        this.getParentsItems(res.data.Data.DangerSortID)
        this.cd = res.data.Data
      }else{
        this.$message({
          type:'error',
          messgae:res.data.Msg
        })
      }
    })
    },//获取风控项模型
    del(ID){
        this.$get(this.api.delDanger+ID).then(res=>{
          if(res.data.State == 200){
            this.getDangerList(this.pID)
            this.$message({
              type:'success',
              message:'删除成功'
            })
          }else{
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
    },//删除风控项
    stander(data){
      this.standerDetail = data
      this.getSafetyStandardSelector(this.parentID)
      this.dg4 = true
    }, //安全标准窗口
    getSafetyStandardSelector(ID){
      this.$get(this.api.getSafetyStandardSelector+ID).then(res=>{
        console.log('获取安全标准选择器返回值:',res)
        if(res.data.State === 200){
          this.standerSelector = res.data.Data
        }
      })
    }, //获取安全标准选择器
    addStander(){

    },//添加执行标准

    inf(row) {
      console.log(row);
      this.info = row;
    },
    set() {
      let newi = {};
      newi.num = this.num;
      newi.nme = this.nme;
      newi.rskd = this.rskd;
      console.log(newi);
      this.newif.push(newi);
      console.log(this.newif);
    }
  },
  created(){
    this.getDangerSortTree(GUID)
  }
};
</script>
<style scoped>
.info{
  background: #fff;
  padding: 15px;
}
.title {
  margin-bottom: 20px;
}
.content {
  height: 100%;
  overflow: hidden;
}
.main {
  margin-left: 25px;
  width: 96.1%;
  overflow: hidden;
  height: calc(100% - 85px);
}
.el-col-4 {
  height: calc(100vh - 270px);
  overflow: auto;
  border-top: 2px solid #409eff;
  border-radius: 3px;
}
.el-col-4 > div {
  background: #fff;
}
.el-row {
  margin-top: 10px;
  display: flex;
}
.top {
  width: 100%;
  border-top: 2px solid #409eff;
  border-radius: 5px;
  background: #fff;
  margin: 0 0 15px 0
}
.top p {
  font-size: 20px;
  margin: 15px 0 0 20px;
  padding-bottom: 15px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding-right: 8px;
}
.ad {
  width: 100%;
}
.ad::after {
  content: "";
  display: block;
  clear: both;
}
.el-col-4 > div > .ad > .el-button {
  margin-right: 10px;
  padding-bottom: 0;
  float: right;
}
.el-col-19 {
  margin-left: 15px;
  width: 82%;
}
.el-table {
  width: 100%;
}
</style>
