<template>
  <div class="content">
    <Header title="风险管理" text="执行标准"></Header>
    <div class="main">
      <div class="top">
        <el-button type="primary" @click="adddg">新建</el-button>
      </div>
      <el-table height="calc(100% - 75px)" :data="tableDetail" border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center','padding':'0'}">
        <el-table-column label="编号" prop="Code"></el-table-column>
        <el-table-column label="名称" prop="Name"></el-table-column>
        <el-table-column label="风控项类别" prop="DangerSort">
        </el-table-column>
        <el-table-column label="管控措施" prop="Controls"></el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope">
            <el-button type="text" @click="changeDg(scope.row.ID)">修改</el-button>
            <el-button type="text" @click="del(scope.row.ID)">删除</el-button>
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

    <el-dialog width="30%" :visible.sync="dg1" title="新建执行标准">
      <div class="info">
        <el-form label-width="100px" v-model="Standard">
          <el-form-item label="编号">
            <el-input v-model="Standard.Code"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="Standard.Name"></el-input>
          </el-form-item>
          <el-form-item label="风控项">
            <el-cascader :options="SortTree"  v-model="Standard.DangerSortID" :props="prp"></el-cascader>
          </el-form-item>
          <el-form-item label="工程措施">
            <el-input type="textarea" :rows="3" v-model="Standard.Engineering"></el-input>
          </el-form-item>
          <el-form-item label="管理措施">
            <el-input type="textarea" :rows="3" v-model="Standard.Controls"></el-input>
          </el-form-item>
          <el-form-item label="个体措施">
            <el-input type="textarea" :rows="3" v-model="Standard.Individual"></el-input>
          </el-form-item>
          <el-form-item label="事故措施">
            <el-input type="textarea" :rows="3" v-model="Standard.Accident"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
                      <el-button @click="dg1= false">取 消</el-button>
                      <el-button type="primary" @click="addSafetyStandard">确 定</el-button>
                    </span>
    </el-dialog>

    <el-dialog width="30%" :visible.sync="dg2" title="修改执行标准">
      <div class="info">
        <el-form label-width="100px" v-model="modelDetail">
          <el-form-item label="编号">
            <el-input v-model="modelDetail.Code"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="modelDetail.Name"></el-input>
          </el-form-item>
          <el-form-item label="风控项">
            <el-cascader :options="SortTree"  v-model="modelDetail.DangerSortID" :props="prp"></el-cascader>
          </el-form-item>
          <el-form-item label="工程措施">
            <el-input type="textarea" :rows="3" v-model="modelDetail.Engineering"></el-input>
          </el-form-item>
          <el-form-item label="管理措施">
            <el-input type="textarea" :rows="3" v-model="modelDetail.Controls"></el-input>
          </el-form-item>
          <el-form-item label="个体措施">
            <el-input type="textarea" :rows="3" v-model="modelDetail.Individual"></el-input>
          </el-form-item>
          <el-form-item label="事故措施">
            <el-input type="textarea" :rows="3" v-model="modelDetail.Accident"></el-input>
          </el-form-item>
        </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
                      <el-button @click="dg2= false">取 消</el-button>
                      <el-button type="primary" @click="submitChange">确 定</el-button>
                    </span>
      </el-dialog>
  </div>
</template>
<script>
  const GUID ='00000000-0000-0000-0000-000000000000'
import Header from "../assembly/Header";
export default {
  components: {
    Header
  },
  data(){
    return {
      parentID:'',
      page:{
        index:1,
        size:3,
        total:0
      },
      Standard:{
        "Code": "",
        "Name": "",
        "DangerSortID": "",
        "Controls": "",
        "Engineering": "",
        "Accident": "",
        "Individual": ""
      },
      SortTree:[],
      cd:[],
      prp: { children: "Children", label: "SortName",checkStrictly: true,value:"ID"},
      modelDetail:'',
      tableDetail:[],
      standerSelector:[],
      dg1:false,
      dg2:false,

      td:'',
      standTable:[
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
        {snb:'1',sname:'askjad',rci:'asda',ctrs:'fasas'},
      ],
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
    }
  },
  methods:{
    handleChange(value){
      console.log('树节点改变',value)
    },//树节点改变
    handleSizeChange(val) {   //修改分页条数
      this.page.size = val
      console.log('分页数改变')
      console.log('分页数:',this.page.size)
      this.getSafetyStandardsPage()
    },  //分页数目改变
    handleCurrentChange(val) {   //当前展示页
      this.page.index = val
      this.getSafetyStandardsPage()
    },  //当前页改变
    adddg(){
      this.dg1 = true
      this.Standard={
        "Code": "",
          "Name": "",
          "DangerSortID": "",
          "Controls": "",
          "Engineering": "",
          "Accident": "",
          "Individual": ""
      },
      this.getDangerSortTree(GUID)
    },//新建窗口
    addSafetyStandard(){
      let param = {
        "Code": this.Standard.Code,
        "Name": this.Standard.Name,
        "DangerSortID": this.Standard.DangerSortID[this.Standard.DangerSortID.length-1],
        "Controls": this.Standard.Controls,
        "Engineering": this.Standard.Engineering,
        "Accident": this.Standard.Accident,
        "Individual": this.Standard.Individual,
      }
      console.log('新建执行标准参数:',param)
      this.$post(this.api.addSafetyStandard,param).then(res=>{
        if(res.data.State === 200){
          this.dg1 = false
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
    },//新建安全安标准
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
    },//获取风控项树
    getSafetyStandardsPage(){
      let param = {
        "PageSize": this.page.size,
        "PageIndex": this.page.index,
        "KeyWord": "",
        "Query": "",
        "OrderString": "",
        "ToExcel": true
      }
      this.$post(this.api.getSafetyStandardsPage).then(res=>{
        console.log('分页返回值:',res)
        if(res.data.State === 200){
          this.tableDetail = res.data.Data.Data
          this.page.total = res.data.Data.Items
        }
      })
    },//分页获取安全标准列表
    changeDg(ID){
      this.dg2 = true
      this.parentID = ID
      this.getDangerSortTree(GUID)
      this.getSafetyStandardModel(ID)
    },//修改执行标准s
    submitChange(){
      let param = {
        "ID": this.parentID,
        "Code": this.modelDetail.Code,
        "Name": this.modelDetail.Name,
        "DangerSortID": this.modelDetail.DangerSortID,
        "Controls": this.modelDetail.Controls,
        "Engineering": this.modelDetail.Engineering,
        "Accident": this.modelDetail.Accident,
        "Individual": this.modelDetail.Individual,
      }
      console.log('修改参数',param)
      this.$post(this.api.editSafetyStandard,param).then(res=>{
        if(res.data.State === 200){
          this.$message({
            type:'success',
            message:'修改成功'
          })
          this.dg2 = false
          this.getSafetyStandardsPage()
        }else {
          this.$message(
            {
              type:'error',
              message:res.data.Msg
            }
          )
        }
      })
    },  //提交修改
    getSafetyStandardModel(ID){
      this.$get(this.api.getSafetyStandardModel+ID).then(res=>{
        console.log('获取安全标准模型',res)
        if(res.data.State === 200){
          this.modelDetail = res.data.Data
        } else {
          this.$message({
            type:'error'
          })
        }
      })
    },//获取安全标准模型

    del(ID){
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
    }
  },
  created(){
    this.getSafetyStandardsPage()
  }
}
</script>
<style scoped>
.info{
  height: 400px;
  overflow: auto;
  background: #fff;
  padding: 15px;
}
.content{
  height: 100%;
  overflow: hidden;
}
.main{
  overflow: hidden;
  width: calc(100% - 50px);
  margin:0 0 7px 25px;
  height: calc(100% - 148px)
}
.top{
  margin-bottom: 15px;
  border-top:2px solid #409eff;
  border-radius: 5px;
  background: #fff
}
.el-button{
  margin: 10px 0 10px 15px;
}
.el-table{
  margin-bottom: 15px;
}
.pge {
  width:calc(100% - 50px);
  margin:15px 0 0 25px;
  height: 32px;
  text-align: right;
  background: #fff
}
</style>
