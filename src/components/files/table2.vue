<template>
  <div class="wrapper">
    <div class="table">
      <div class="table-top">
        <el-button type="primary" @click="newlist=true">新建</el-button>
        <div style="height: 40px;float: right;margin-right: 20px">
          <el-form :inline="true">
            <el-form-item label="关键字:">
              <el-input placeholder="请输入关键字" v-model="key" style="width: 120px"></el-input>
            </el-form-item>
            <el-form-item><el-button type="primary" @click="getDocCertificatePage">查询</el-button></el-form-item>
          </el-form>
        </div>
      </div>
      <div class="table-main">
          <el-table :data="table" class="datalist" border  height="calc(100vh - 345px">
            <el-table-column  label="证件名称" prop="Name">
            </el-table-column>
            <el-table-column  label="有效期" prop="InvalidDate">
            </el-table-column>
            <el-table-column  label="颁发机构" prop="IssueOrg">
            </el-table-column>
            <el-table-column prop="Owner" label="持有人">
            </el-table-column>
            <el-table-column prop="ApproveDate" label="审核时间">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="操作">
              <div slot-scope="scope">
                <el-link :underline="false" type="primary">详情</el-link>
                <el-link :underline="false" type="primary" @click="changeW(scope.row.ID)">修改</el-link>
                <el-link :underline="false" type="primary" @click="deletcontent(scope.row.ID)">删除</el-link>
              </div>
            </el-table-column>
          </el-table>
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
      <el-dialog title="新建质资" :visible.sync="newlist" width="600px" style="height: 100%;overflow: auto">
        <div style="height: 350px;overflow-x: hidden;overflow-y: auto;background-color: white;padding: 10px">
          <el-form labelWidth="120px">
            <el-form-item label="质资">
              <el-input style="width: 200px" v-model="docCertificate.Name"></el-input>
            </el-form-item>
            <el-form-item label="持有人:">
              <el-input style="width: 200px" v-model="docCertificate.Owner"></el-input>
            </el-form-item>
            <el-form-item label="有效期">
              <el-date-picker style="width: 200px" v-model="docCertificate.InvalidDate"></el-date-picker>
            </el-form-item>
            <el-form-item label="审核日期">
              <el-date-picker style="width: 200px" v-model="docCertificate.ApproveDate"></el-date-picker>
            </el-form-item>
            <el-form-item label="颁发机构">
              <el-input style="width: 200px" v-model="docCertificate.IssueOrg" ></el-input>
            </el-form-item>
            <el-form-item label="点击上传">
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
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="newlist = false">取 消</el-button>
    <el-button type="primary" @click="addDocCertificate">确 定</el-button>
  </span>
</el-dialog>

      <el-dialog title="修改质资" :visible.sync="changedetail" width="600px" style="height: 100%;overflow: auto">
        <div style="height: 350px;overflow-x: hidden;overflow-y: auto;background-color: white">
          <el-form labelWidth="120px">
            <el-form-item label="质资">
              <el-input style="width: 200px" v-model="changeData.Name"></el-input>
            </el-form-item>
            <el-form-item label="持有人:">
              <el-input style="width: 200px" v-model="changeData.Owner"></el-input>
            </el-form-item>
            <el-form-item label="有效期">
              <el-date-picker style="width: 200px:" v-model="changeData.InvalidDate" @change="dateChange1"></el-date-picker>
            </el-form-item>
            <el-form-item label="审核日期">
              <el-date-picker style="width: 200px:" v-model="changeData.ApproveDate" @change="dateChange2"></el-date-picker>
            </el-form-item>
            <el-form-item label="颁发机构">
              <el-input style="width: 200px:" v-model="changeData.IssueOrg"></el-input>
            </el-form-item>
            <el-form-item label="点击上传">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="changedetail = false">取 消</el-button>
    <el-button type="primary" @click="DocCertificate">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      ID: ''
    },
    data () {
      return {
        fileList:[],
        upFileList:[],
        page:{
          size:3,
          index:1,
          total:0
        },
        key:'',
        docCertificateID:'',
        docCertificate:{
          "Name": '',
          "TypeID": '',
          "InvalidDate": '',
          "ApproveDate": '',
          "IssueOrg": '',
          "Owner": '',
        },
        table:[],
        header:{
          "Token":sessionStorage.Token,
          "AccountID":sessionStorage.AccountID,
        },
        newlist:false,
        changeData:{},
        changedetail:false,
      }
    },
    methods: {
      getDocCertificatePage(){
        console.log('click',this.ID)
        let param={
          "PageSize": this.page.size,
          "PageIndex": this.page.index-1,
          "KeyWord": "",
          "Query": {
            "TypeID": this.ID,
            "Name":this.key
          },
          "OrderString": "",
          "ToExcel": false
        }
        this.$post(this.api.getDocCertificatePage,param).then(res=>{
          console.log('分页返回值:',res)
          if(res.data.State===200){
            this.key=''
            this.table=res.data.Data.Data
            this.page.total = res.data.Data.Items
          }else {
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },  //分页获取资质
      dateChange1(value){
        console.log('日期改变',value)
        this.changeData.InvalidDate= this.dataChange(value)
        console.log(this.changeData.InvalidDate)
      },//日期改变
      dateChange2(value){
        console.log('日期改变',value)
        this.changeData.ApproveDate= this.dataChange(value)
        console.log(this.changeData.ApproveDate)
      },
      dataChange(data){
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
      handleSizeChange(val) {   //修改分页条数
        this.page.size = val
        this.getDocCertificatePage()
        console.log('分页数改变')
        console.log('分页数:',this.page.size)
      },  //分页数目改变
      handleCurrentChange(val) {   //当前展示页
        this.page.index = val
        this.getDocCertificatePage()
      },  //当前页改变
      addDocCertificate(){
        let param={
          "Name": this.docCertificate.Name,
          "TypeID":this.ID,
          "InvalidDate": this.dataChange(this.docCertificate.InvalidDate),
          "ApproveDate": this.dataChange(this.docCertificate.ApproveDate),
          "IssueOrg": this.docCertificate.IssueOrg,
          "Owner": this.docCertificate.Owner,
          "AttachFiles": this.upFileList
        }
        console.log('新建参数:',param)
        this.$post(this.api.addDocCertificate,param).then(res=>{
          if(res.data.State === 200){
            this.getDocCertificatePage()
            this.upFileList=[]
            this.fileList=[]
            this.docCertificate={}
            this.newlist=false
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
      },//新建资质
      changeW(ID){
        this.changedetail=true
        this.docCertificateID=ID
        this.getfiles(ID)
        this.getDocCertificateModel(ID)
      }, //修改窗口
      getDocCertificateModel(ID){
        this.$get(this.api.getDocCertificateModel+ID).then(res=>{
          console.log('m模型返回值:',res)
          if(res.data.State===200){
            this.changeData=res.data.Data
          } else{
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },//根据ID获取资质模型
      DocCertificate(){
        let param={
          "ID": this.docCertificateID,
          "Name": this.changeData.Name,
          "TypeID": this.changeData.TypeID,
          "InvalidDate": this.changeData.InvalidDate,
          "ApproveDate": this.changeData.ApproveDate,
          "IssueOrg": this.changeData.IssueOrg,
          "Owner": this.changeData.Owner,
          "AttachFiles": this.upFileList
        }
        console.log('修改参数:',param)
        this.$post(this.api.DocCertificate,param).then(res=>{
          if(res.data.State===200){
            this.getDocCertificatePage()
            this.changedetail=false
            this.$message({
              type:'success',
              message:'修改成功'
            })
          }else{
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },//修改资质模型

      //文件操作
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
      deletcontent (ID) {
        console.log('ID',ID)
        this.$confirm('确定删除这条记录吗?', '提示',{
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type:'warning'
        }).then(()=>{
          this.$get(this.api.delDocCertificate+ID).then(res=>{
            if(res.data.State===200)
            {
              this.getDocCertificatePage()
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            }else {
              this.$message({
                type:'error',
                message:res.data.Msg
              })
            }
          })
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'取消'
          })
        })
      },
    },
    created(){
    }
  }
</script>

<style scoped>
  .wrapper{
    width: 100%;
    height:100%;
    overflow: hidden;
  }
  .wrapper .table{
    height: calc(100vh - 225px);
    padding-left: 20px;
  }
  .wrapper .table  .table-top{
    height: 40px;
    line-height: 40px;
    padding: 10px 0px 10px 15px;
    background-color: white;
    margin: 0 0 15px 0;
    border-radius: 5px;
  }
  .wrapper .table .table-main{
    margin-top: 5px;
  }
  .wrapper  .table-foot{
    margin-top: 10px;
    background-color: white;
  }
  .wrapper  .table-foot .el-pagination{
    text-align: right !important;
  }
</style>
