<template>
  <div class="content">
    <Header title="系统管理" text="词典管理"></Header>
    <div class="adbt">
      <el-button type="text" @click="dg1=true">词典类型+</el-button>
    </div>
    <div class="main">
      <div class="tbs">
        <el-tabs tab-position="left" closable @tab-click="getDictsPage" v-model="parentID" @tab-remove="removeTab">
          <el-tab-pane v-for="(i,e) in select" :key="e" :label="i.DictName" :name="i.ID">

            <div style="height: 40px;background-color: white;margin-bottom: 10px;border-radius: 3px;padding: 10px 0px">
              <el-button type="primary" @click="addPage=true" size="small" style="float: right;margin-right: 20px">新增项</el-button>
            </div>

            <el-table :data="tableDetail" height="calc(100vh - 420px)" border>
              <el-table-column prop="DictName" label="名称"></el-table-column>
              <el-table-column prop="Memo" label="备注"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-link type="primary" @click="dg2show(scope.row.ID)" :underline="false">修改</el-link>
                  <el-link type="primary" @click="deleteTable(scope.row.ID)" :underline="false">删除</el-link>
                </template>
              </el-table-column>
            </el-table>

            <div class="table-footer">
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

          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="place"></div>

    <el-dialog width="30%" title="修改词典项" :visible.sync="dg2" :append-to-body="true">
      <div class="info">
        <el-form v-model="newpage">
          <el-form-item label="名称">
            <el-input v-model="newpage.DictName"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="newpage.Memo" type="textarea" :rows="3"></el-input>
          </el-form-item>
        </el-form>
      </div>
              <span slot="footer" class="dialog-footer">
                    <el-button @click="dg2= false" :underline="false">取 消</el-button>
                    <el-button type="primary" @click="changeTable" :underline="false">确 定</el-button>
                  </span>
    </el-dialog>
    <el-dialog title="新建类型" :visible.sync="dg1">
      <el-form>
        <el-form-item label="名称">
          <el-input v-model="tyname"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dg1= false">取 消</el-button>
          <el-button type="primary" @click="newDic">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog :visible.sync="addPage" title="新建项">
      <div style="background-color: white;padding: 20px;height: 350px">
        <el-form labelWidth="120px">
          <el-form-item label="名称:" v-model="newpage">
            <el-input style="width: 180px" v-model="newpage.DictName"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" :rows="3" style="width: 280px" v-model="newpage.Memo"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="addPage=false">取消</el-button>
        <el-button @click="addNewPage" type="primary">确认</el-button>
       </span>
    </el-dialog>

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
      presentID:'',
      newpage:{
        DictName:'',
        Memo:''
      },
      parentID:'',
      addPage:false,
      dg1: false,
      dg2: false,
      tyname: "",
      txra:'',
      select: [
        {
          DictName: "",
          ID:'',
          IsSYS:''
        },
      ],
      tableDetail:[],
      page:{
        index:1,
        size:3,
        total:0
      },
      index: ''
    };
  },
  methods: {
    dg2show (ID) {
      this.presentID = ID
      this.dg2 = true
    },
    changeTable () {
     let  param = {
        "ID": this.presentID,
        "ParentID": this.parentID,
        "DictName": this.newpage.DictName,
        "Memo": this.newpage.Memo,
        "MinValue": 5.1,
        "MaxValue": 6.1
      }
      this.$post(this.api.Dict.editDict,param).then(res => {
        if(res.data.State === 200) {
          this.getDictsPage()
          this.dg2 = false
        }
      })
    }, //修改词典项
    deleteTable (ID) {
      this.$confirm('将永久删除该词点，是否继续?','提示',{
        comfirmButtonText: '确认',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        this.$get(this.api.Dict.delDict + ID).then(res =>{
          if(res.data.State === 200) {
            this.getDictsPage()
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.data.Msg)
          }
        })
      }).catch(()=>{
        this.$message.info('已取消')
      })
    },  //删除词典项
    removeTabApi () {
      this.$get(this.api.Dict.delDictType + this.parentID).then((res)=>{
        console.log(res)
        if (res.data.State === 200) {
          this.getDict()
          this.$message.success('删除成功')
        } else {
          this.$message.error(res.data.Msg)
        }
      })
    },
    removeTab () {
      this.$confirm('将永久删除该词点，是否继续?','提示',{
        comfirmButtonText: '确认',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        this.removeTabApi()
      }).catch(()=>{
        this.$message.info('已取消')
      })
    },  //删除词典类型
    newDic(){
      var param = {
        DictName:this.tyname
      }
      this.$post(this.api.Dict.addDictType,param).then((data)=> {
        if(data.data.State === 200) {
          if (data.data.Msg === '') {
            this.select.push({
              title: this.tyname,
              table: []
            })
            this.dg1 = false
            console.log(data)
            this.tyname = ''
          } else if (data.data.Msg.indexOf('已存在') !== (-1)) {
            this.$notify({
              title: '标题名称',
              message: '该类型已存在,请从新输入'
            })
            this.tyname = ''
          }
        } else this.message('失败')
    })
    },  //新建词典类型
    getDictsPage () {
      let param ={
        "PageSize": this.page.size,
        "PageIndex":this.page.index - 1,
        "KeyWord": "",
        "Query": this.parentID,
        "OrderString": "",
        "ToExcel": true
      }
      console.log(param)
      this.$post(this.api.Dict.getDictsPage,param).then((res)=>{
        console.log('获取表格信息')
        this.tableDetail = res.data.Data.Data
        this.page.total = res.data.Data.Items
        console.log('tableDetail',res)
      })
    },  //根据id获取表格信息
    addNewPage () {
      console.log('父节点id:',this.parentID)
      let param =
      {
        "ParentID": this.parentID,
        "DictName": this.newpage.DictName,
        "Memo": this.newpage.Memo,
        "MinValue": 4.1,
        "MaxValue": 5.1
      }
      this.$post(this.api.Dict.addDict,param).then(data=>{
       if(data.data.State === 200) {
         console.log('保存成功：',data)
         this.tableDetail.push({
           DictName:this.newpage.DictName,
            Memo:this.newpage.Memo,
         })
           this.newpage.DictName = '',
           this.newpage.Memo = '',
           this.addPage = false
       }
       else if(data.data.State===1000){
         this.$message({
           message:data.data.Msg,
           type:'error'
         })
       };
      })
    },  //添加表格信息
    handleSizeChange(val) {   //修改分页条数
      this.page.size = val
      console.log('分页数:',this.page.size)
      this.getDictsPage()
    },  //分页数目改变
    handleCurrentChange(val) {   //当前展示页
      this.page.index = val
      this.getDictsPage()
    },  //当前页改变
    getDict () {
      this.$get(this.api.Dict.getDictTypeItems).then((res)=>{
        if(res.data.State === 200) {
          this.select = res.data.Data
          try {
            this.parentID = res.data.Data[0].ID
            this.getDictsPage()
          }catch (err){
            console.log(err)
          }
        } else {
          this.$message('失败')
        }
      })
    }
  },
  created () {
    this.getDict()
  }  //获取词典类型

};
</script>
<style scoped>
.info{
  background: #fff;
  padding: 15px
}
.el-tabs {
  width: 96%;
  margin: 15px 0 0 25px;
  height: calc(100vh - 300px)
}
.el-input,.el-textarea{
  width: 70%
}
.main {
  overflow: auto;
  margin-left: 25px;
  height: calc(100% - 125px);
}
.content {
  overflow: hidden;
  height: 100%;
}
.place {
  height: 1px;
  display: block;
}
  .table-footer .el-pagination{
  text-align: right !important;
}
 .table-footer{
   margin-top: 15px;
  height: 35px;
  line-height: 35px;
  background-color: white;
}
</style>
