<template>
  <div class="wrapper">
    <Header title="职业健康" text="体验管理"></Header>
    <div class="table">
      <div class="table-top">
        <el-button type="primary" @click="newW">新建</el-button>
        <div style="float: right;margin-right: 20px">
          <el-form :inline="true" labelWidth="120px" style="height: 40px">
            <el-form-item label="姓名">
              <el-select style="width: 200px" v-model="keyID" clearable>
                <el-option v-for="i,b in selector" :label="i.EmployeeName" :key="i.DocmentID" :value="i.DocmentID"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getHealRecordsPage">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="table-main">
          <el-table :data="Items" class="datalist" border height="calc(100vh - 355px)">
            <el-table-column  label="姓名" prop="Name">
            </el-table-column>
            <el-table-column prop="Gender" label="性别">
            </el-table-column>
            <el-table-column prop="Age" label="年龄">
            </el-table-column>
            <el-table-column prop="RecDate" label="体验时间">
            </el-table-column>
            <el-table-column prop="RecResult" label="体验结果">
            </el-table-column>
            <el-table-column label="操作">
              <div slot-scope="scope">
                <el-link type="primary" :underline="false" style="font-size: 12px">详情</el-link>
                <el-link type="primary" :underline="false" style="font-size: 12px" @click="changeW(scope.row.ID)">修改</el-link>
                <el-link type="primary" :underline="false" style="font-size: 12px" @click="deletedetail(scope.row.ID)">删除</el-link>
              </div>
            </el-table-column>
          </el-table>
      </div>
    </div>
    <div class="table-foot">
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

    <el-dialog title="新建体验报告" :visible.sync="dg1" width="600px" style="height: 100%;overflow: auto">
      <div style="height: 350px;overflow-x: hidden;overflow-y: auto;background-color: white;padding-top: 20px">
        <el-form labelWidth="100px">
          <el-form-item label="姓名:">
            <el-select style="width: 200px" v-model="HealRecords.DocmentID">
              <el-option v-for="i,b in selector" :label="i.EmployeeName" :key="i.DocmentID" :value="i.DocmentID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="体验日期:">
            <el-date-picker style="width: 200px" v-model="HealRecords.RecDate"></el-date-picker>
          </el-form-item>
          <el-form-item label="体验结果:">
            <el-input style="width: 200px" v-model="HealRecords.RecResult"></el-input>
          </el-form-item>
          <el-form-item label="附件">
            <el-upload
              class="upload-demo"
              action="http://quickcq.com:8008/api/attachFile/uploadFile"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="fileSuccess"
              multiple
              :limit="3"
              :headers="header"
              :file-list="fileList"
              :on-exceed="handleExceed"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-divider></el-divider>
          <el-form labelWidth="75px" :inline="true">
            <el-form-item v-for="(item, index) in userDefine" :label="item.Caption" :key="index">
              <el-input v-if="item.DataType ==='字符'" v-model="item.value" style="width: 220px"></el-input>
              <el-select v-model="item.arr" v-if="item.DataType === '词典'" :multiple="true" :collapse-tags="true">
                <el-option v-for="(a, b) in item.postArr" :key="b" :value="a.ID" :label="a.Name"></el-option>
              </el-select>
              <el-checkbox v-model="item.checked" v-if="item.DataType === '是非'"></el-checkbox>
              <el-input v-if="item.DataType ==='整数'" v-model="item.value" style="width: 220px"></el-input>
              <el-input v-if="item.DataType ==='数字'" v-model="item.value" style="width: 220px"></el-input>
              <el-date-picker v-if="item.DatTYpe==='日期'" v-model="item.value"></el-date-picker>
            </el-form-item>
          </el-form>
        </el-form>
      </div>
       <span slot="footer" class="dialog-footer">
        <el-button @click="dg1 = false">取 消</el-button>
        <el-button type="primary" @click="addHealRecords">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改体验报告" :visible.sync="dg2" width="600px" style="height: 100%;overflow: auto">
      <div style="height: 350px;overflow-x: hidden;overflow-y: auto;background-color: white;padding-top: 20px">
        <el-form labelWidth="100px">
          <el-form-item label="姓名:">
            <el-select style="width: 200px" v-model="changeDetail.DocmentID">
              <el-option v-for="i,b in selector" :label="i.EmployeeName" :key="i.DocmentID" :value="i.DocmentID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="体验日期:">
            <el-date-picker style="width: 200px" v-model="changeDetail.RecDate" @change="dateChange1"></el-date-picker>
          </el-form-item>
          <el-form-item label="体验结果:">
            <el-input style="width: 200px" v-model="changeDetail.RecResult"></el-input>
          </el-form-item>
          <el-form-item label="附件">
            <el-upload
              class="upload-demo"
              action="http://quickcq.com:8008/api/attachFile/uploadFile"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="fileSuccess"
              multiple
              :limit="3"
              :headers="header"
              :file-list="fileList"
              :on-exceed="handleExceed"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-divider></el-divider>
          <el-form labelWidth="75px" :inline="true">
            <el-form-item v-for="(item, index) in userDefine" :label="item.Caption" :key="index">
              <el-input v-if="item.DataType ==='字符'" v-model="item.ItemValue" style="width: 220px"></el-input>

              <el-select v-model="item.ItemValue" v-if="item.DataType === '词典'" :multiple="true" :collapse-tags="true">
                <el-option v-for="(a, b) in item.DictSelection" :key="b" :value="a.ID" :label="a.DictName"></el-option>
              </el-select>

              <el-checkbox v-model="item.ItemValue" v-if="item.DataType === '是非'"></el-checkbox>
              <el-input v-if="item.DataType ==='整数'" v-model="item.ItemValue" style="width: 220px"></el-input>
              <el-input v-if="item.DataType ==='数字'" v-model="item.ItemValue" style="width: 220px"></el-input>
              <el-date-picker v-if="item.DatTYpe==='日期'" v-model="item.ItemValue"></el-date-picker>
            </el-form-item>
          </el-form>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dg2 = false">取 消</el-button>
        <el-button type="primary" @click="editHealRecords">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../../components/assembly/Header.vue'
  export default {
    components: {
      Header
    },
    data () {
    return {
      fileList:[],
      upFileList:[],
      Items: [],
      dg1:false,
      dg2:false,
      page:{
      size:3,
      index:1,
      total: 0
    },
      changeDetail:{},
      selector:[],
      keyID:'',
      header:{
        "Token":sessionStorage.Token,
        "AccountID":sessionStorage.AccountID,
      },
      HealRecords:{},
      userDefine:[],
      ID:'',
      index:'',
    }
  },
    methods: {
      getHealRecordsPage(){
        let param={
          "PageSize": this.page.size,
          "PageIndex": this.page.index-1,
          "KeyWord": "",
          "Query": this.keyID,
          "OrderString": "",
          "ToExcel": false
        }
        this.$post(this.api.getHealRecordsPage,param).then(res=>{
          console.log('分页返回值：',res)
          if(res.data.State===200){
            this.Items= res.data.Data.Data
            this.page.total=res.data.Data.Items
          }else{
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },//分页获取体检记录
      deletedetail (ID) {
        this.$confirm( '提示','是否确认删除',{
          comfirmButtonText: '确认',
          cancelButtonText: '取消',
          type:'warning'
        }).then(()=>{
          this.$get(this.api.delHealRecords+ID).then(res=>{
            if(res.data.State===200){
              this.getHealRecordsPage()
              this.$message({
                type:'success',
                message:'删除成功'
              })
            }else{
              this.$message({
                type:'error',
                message:res.data.Msg
,              })
            }
          })
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'取消'
          })
        })
      }, //删除
      newW(){
        this.upFileList=[]
        this.fileList=[]
        this.HealRecords={}
        this.dg1=true
        this.getUserDefines()
      }, //新建窗口
      addHealRecords(){
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
        let param={
          "DocmentID": this.HealRecords.DocmentID,
          "RecDate": this.formDate(this.HealRecords.RecDate),
          "RecResult": this.HealRecords.RecResult,
          "AttachFiles": this.upFileList,
          "UserDefineds": userData
        }
        console.log('新建参数:',param)
        this.$post(this.api.addHealRecords,param).then(res=>{
          console.log('新建返回值:',res)
          if(res.data.State===200){
            this.dg1=false
            this.getHealRecordsPage()
            this.$message({
              type:'success',
              message:'新建成功'
            })
          }else {
            this.$message({
              type:'error',
              messge:res.data.Msg
            })
          }
        })
  },//新建
      getHealDocmentSelector(){
        this.$get(this.api.getHealDocmentSelector).then(res=>{
          console.log('人员返回值：',res)
          if(res.data.State===200){
            this.selector=res.data.Data
          }else {
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },//人员选择器
      changeW(ID){
        this.ID = ID
        this.getfiles(ID)
        this.getUserDefinedList(ID)
        this.dg2=true
        this.getHealRecordsModel(ID)
      },
      getHealRecordsModel(ID){
        this.$get(this.api.getHealRecordsModel+ID).then(res=>{
          console.log('模型返回值:',res)
          if(res.data.State===200){
            this.changeDetail=res.data.Data
          }else {
            this.$message({
              type:'success',
              message:res.data.Msg
            })
          }
        })
      }, //获取模型
      getUserDefines () {
        this.$get(this.api.UserDefined.getUserDefinedItems + '8').then(res=>{
          if(res.data.State === 200){
            console.log('dg1',this.dg1)
            console.log('自定义项返回值:',res.data.Data)
            res.data.Data.forEach(item=>{
              this.$set(item, 'arr', [])
              this.$set(item, 'checked', false)
              if(item.DataType === '词典'){
                this.$get(this.api.UserDefined.dict + item.DictID).then(res=>{
                  console.log('自定义项词典返回值:',res.data)
                  this.$set(item,'postArr',res.data.Data)
                  console.log('PstArr',item.postArr)
                })
              }
            })
            this.userDefine = res.data.Data
          } else {
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },  //获取用户自定义项
      getUserDefinedList(ID){
        let param={
          "DefinedType": 8,
          "BusinessID": ID
        }
        this.$post(this.api.UserDefined.getUserDefinedList,param).then(res=>{
          console.log('自定义项详情:',res)
          if(res.data.State === 200){
            res.data.Data.forEach(item=>{
              if(item.DataType === '词典') {
                item.ItemValue = JSON.parse(item.ItemValue)
              }
            })
            this.userDefine =res.data.Data
            console.log('userDefine',this.userDefine)
          }
        })
      }, //获取自定义详情
      editHealRecords(){
        let user = []
        this.userDefine.forEach(i=>{
          user.push({
            DefinedID:i.ID,
            DefinedValue:i.ItemValue
          })
        })
        let param = {
          "ID": this.ID,
          "DocmentID": this.changeDetail.DocmentID,
          "RecDate": this.changeDetail.RecDate,
          "RecResult": this.changeDetail.RecResult,
          "AttachFiles":this.upFileList,
          "UserDefineds":user
        }
        this.$post(this.api.editHealRecords,param).then(res=>{
          if(res.data.State===200){
            this.getHealRecordsPage()
            this.dg2=false
            this.$message({
              type:'success',
              message:'修改成功'
            })
          }else {
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },//修改模型

      handleSizeChange(val) {   //修改分页条数
        this.page.size = val
        console.log('分页数改变')
        console.log('分页数:',this.page.size)
      },  //分页数目改变
      handleCurrentChange(val) {   //当前展示页
        this.page.index = val
      },  //当前页改变
      formDate(data){
        if(data) {
          let year = data.getFullYear()
          let mouth = (data.getMonth() + 1) > 10 ? (data.getMonth() + 1) : '0' + (data.getMonth() + 1)
          let day = data.getDate() > 10 ? data.getDate() : '0' + data.getDate()
          let hour = data.getHours() > 10 ? data.getHours() : '0' + data.getHours()
          let seconds = data.getSeconds()
          let minute = data.getMinutes()
          let d = year + '-' + mouth + '-' + day + ' ' + hour + ':' + minute + ':' + seconds
          return d
        } else {
          return false
        }
      },  //格式hua日期
      dateChange1(value){
        console.log('日期改变',value)
        this.changeDetail.RecDate= this.formDate(value)
        console.log('日期',this.changeDetail.RecDate)
      },//日期改变
      getfiles(ID) {
        this.fileList = []
        this.upFileList = []
        this.$get(this.api.getfiles+ID).then(res=> {
          console.log('file',res)
          if(res.data.State === 200){
            console.log('获取文件成功')
            console.log(res)
            res.data.Data.forEach(item => {
              this.fileList.push({
                name:item.FileTitle,
                url:item.FileUrl,
                ID:item.ID
              })
              this.upFileList.push({
                "FileTitle":item.FileTitle,
                "FileUrl":item.FileUrl,
                "FileType":item.FileType,
              })
            })
            console.log('文件列表')
            console.log(this.upFileList)
            console.log(this.fileList)
          } else {
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
      }, //获取文件
      fileSuccess(res,file,filelist) {
        console.log('进入文件上传')
        console.log('res',res)
        console.log('fie',file)
        console.log('文件上传后文件列表',filelist)
        if(res.State===200){
          console.log('文件上传成功')
          this.upFileList.push({
            "FileTitle":file.name,
            "FileUrl":file.response.Data,
            "FileType":file.raw.type,
          })
          console.log('up',this.upFileList)
        } else {
          this.$message({
            type:'error',
            message:res.Msg
          })
        }
      },  //文件上传
      handleRemove(file, fileList) {
        console.log('file',file)
        console.log('fileilise',fileList)
        this.$get(this.api.delFile+file.ID).then(res=>{
          console.log('删除文件返回值:',res)
          if(res.data.state === 200){
            console.log('删除成功')
            let len = this.upFileList.length-1
            this.upFileList.splice(len,1)
            this.fileList = fileList
            console.log('un文件:')
            console.log(this.upFileList)
          } else {
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
      },
      beforeRemove(file,filelist){
        console.log(filelist)
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },

    },
    created(){
      this.getHealRecordsPage()
      this.getHealDocmentSelector()
    }
  }
</script>

<style scoped>
  .wrapper{
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .wrapper .table{
    height: calc(100% - 155px);
    margin: 0 0 15px 25px ;
    overflow: hidden;
    width:calc(100% - 50px)
  }
  .wrapper .table .table-top{
    height: 40px;
    background-color: white;
    border-radius: 5px;
    padding: 10px 0 10px 20px;
    margin: 0 0 15px 0;
    border-top: 2px solid #409eff
  }
  .wrapper  .table-foot{
    margin: 15px 25px 11px;
    height: 35px;
    line-height: 35px;
    background-color: white;
  }
  .wrapper  .table-foot .el-pagination{
    text-align: right !important;
  }
</style>
