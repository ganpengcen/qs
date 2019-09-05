<template>
<div class="wrapper">
  <div class="table">
      <div class="table-top">
        <span>{{lable}}</span>
        <div style="height: 40px;float: right;margin-right: 20px">
          <el-form :inline="true">
            <el-form-item label="关键字:">
              <el-input placeholder="请输入关键字" v-model="key" style="width: 120px"></el-input>
            </el-form-item>
            <el-form-item><el-button type="primary" @click="getDocInstitutionPage">查询</el-button></el-form-item>
            <el-form-item><el-button type="primary" @click="newW">新建</el-button></el-form-item>
          </el-form>
        </div>
      </div>
      <div class="table-main">
          <el-table :data="Items" class="datalist" border  height="calc(100vh - 355px)">
            <el-table-column  label="名称" prop="Name">
            </el-table-column>
            <el-table-column prop="BigCode" label="字号">
            </el-table-column>
            <el-table-column prop="IssueDate" label="发布时间">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="操作">
              <div slot-scope="scope">
                <el-link :underline="false" type="primary" style="font-size: 12px" @click="listdetail=true">详情</el-link>
                <el-link :underline="false" type="primary" style="font-size: 12px" @click="changeW(scope.row.ID)">修改</el-link>
                <el-link :underline="false" type="primary" @click="deletcontent(scope.row.ID)" style="font-size: 12px">删除</el-link>
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
  </div>

  <el-dialog title="新建" :visible.sync="dg1"width="607px" style="width: 100%;height: 100%;overflow: auto">
    <div style="height: 350px;background-color: white;overflow-y: auto;overflow-x: hidden;padding-top: 20px">
      <el-form labelWidth="80px">
        <el-form-item label="名称:">
          <el-input style="width: 220px" v-model="DocInstitution.Name"></el-input>
        </el-form-item>
        <el-form-item label="字号:">
          <el-input style="width: 220px" v-model="DocInstitution.BigCode"></el-input>
        </el-form-item>
        <el-form-item label="发布日期:">
          <el-date-picker v-model="DocInstitution.IssueDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="内容:">
          <div style="vertical-align: top;line-height: 40px;width: 400px;">
            <editor v-model="DocInstitution.Content"></editor>
          </div>
          <el-input  v-model="DocInstitution.Content"></el-input>
        </el-form-item>
      </el-form>
      <p style="width: 100%;height: 1px;background-color: gainsboro;margin-bottom: 10px"></p>
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
    </div>
    <span slot="footer">
      <el-button @click="dg1=false">取消</el-button>
      <el-button type="primary" @click="addDocInstitution">确认</el-button>
    </span>
  </el-dialog>

  <el-dialog title="详情" :visible.sync="listdetail"width="607px" style="width: 100%;height: 100%;overflow: auto">
    <div style="height: 350px;background-color: white;overflow-y: auto;overflow-x: hidden;padding-top: 20px">
      <el-form labelWidth="80px">
        <el-form-item label="名称:">
          <el-input disabled style="width: 220px;" value="Items"></el-input>
        </el-form-item>
        <el-form-item label="字号:">
          <el-input style="width: 220px" disabled></el-input>
        </el-form-item>
        <el-form-item label="发布日期:">
          <el-date-picker disabled></el-date-picker>
        </el-form-item>
        <el-form-item label="内容:">
          <div style="vertical-align: top;line-height: 40px;width: 400px;" disabled>
            <editor></editor>
          </div>
        </el-form-item>
        <p style="width: 100%;height: 1px;background-color: gainsboro;margin-bottom: 10px"></p>
        <el-form-item label="S:">
          <el-input style="width: 220px" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>

  </el-dialog>
  <el-dialog title="修改" :visible.sync="dg2"width="607px" style="width: 100%;height: 100%;overflow: auto">
    <div style="height: 350px;background-color: white;overflow-y: auto;overflow-x: hidden;padding-top: 20px">
      <el-form labelWidth="80px">
        <el-form-item label="名称:">
          <el-input style="width: 220px" v-model="changeDetail.Name"></el-input>
        </el-form-item>
        <el-form-item label="字号:">
          <el-input style="width: 220px" v-model="changeDetail.BigCode"></el-input>
        </el-form-item>
        <el-form-item label="发布日期:">
          <el-date-picker v-model="changeDetail.IssueDate" @change="dateChange"></el-date-picker>
        </el-form-item>
        <el-form-item label="内容:">
          <div style="vertical-align: top;line-height: 40px;width: 400px;">
            <editor v-model="changeDetail.Content"></editor>
          </div>
        </el-form-item>
        <p style="width: 100%;height: 1px;background-color: gainsboro;margin-bottom: 10px"></p>
      </el-form>
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
    </div>
    <span slot="footer">
      <el-button @click="dg2=false">取消</el-button>
      <el-button type="primary" @click="editDocInstitution">确认</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
  import editor from '../../components/ediitor/quillEditor.vue'
export default {
  props: {
    lable: '',
    ID:''
  },
  components: {
    editor
  },
  data () {
    return {
      Items: [],
      key:'',
      dg1:false,
      dg2:false,
      page:{
        index:1,
        size:3,
        total:0
      },
      DocInstitution:{},
      userDefine:[],
      fileList:[],
      upFileList:[],
      ID2:'',
      changeDetail:{},


      listdetail:false,
    }
  },
  methods: {
    getDocInstitutionPage(){
      let param={
        "PageSize": this.page.size,
        "PageIndex":  this.page.index-1,
        "KeyWord": "",
        "Query": {
          "TypeID": this.ID,
          "Name": this.key
        },
        "OrderString": "",
        "ToExcel": false
      }
      this.$post(this.api.getDocInstitutionPage,param).then(res=>{
        console.log('分页返回值：',res)
        if(res.data.State===200){
          this.Items=res.data.Data.Data
          this.page.total=res.data.Data.Items
        }
      })
    },//分页获取列表
    newW(){
      this.fileList=[]
      this.upFileList=[]
      this.dg1=true
      this.getUserDefines()
    }, //新建窗口
    addDocInstitution(){
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
      let param= {
        "Name": this.DocInstitution.Name,
        "TypeID": this.ID,
        "BigCode": this.DocInstitution.BigCode,
        "IssueDate": this.formDate(this.DocInstitution.IssueDate),
        "Content": this.DocInstitution.Content,
        "UserDefineds": userData
      }
      console.log('自定义参数',param)
      this.$post(this.api.addDocInstitution,param).then(res=>{
        console.log('新建返回值:',res)
        if(res.data.State===200){
          this.dg1=false
          this.getDocInstitutionPage()
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
    },//新建安全制度
    getDocInstitutionModel(ID){
      this.$get(this.api.getDocInstitutionModel+ID).then(res=>{
        console.log('模型返回值：',res)
        if(res.data.State===200){
          this.changeDetail = res.data.Data
        }else {
          this.$message({
            type:'error',
            message:res.data.Msg
          })
        }
      })
    },//获取安全制度模型
    changeW(ID){
      this.ID2 = ID
     this.dg2=true
      this.getUserDefinedList(ID)
     this.getDocInstitutionModel(ID)
  }, //修改窗口
    editDocInstitution(){
      let user = []
      this.userDefine.forEach(i=>{
        user.push({
          DefinedID:i.ID,
          DefinedValue:i.ItemValue
        })
      })
      let param={
        "ID":this.ID2,
        "Name": this.changeDetail.Name,
        "TypeID": this.ID,
        "BigCode": this.changeDetail.BigCode,
        "IssueDate": this.changeDetail.IssueDate,
        "Content": this.changeDetail.Content,
        "UserDefineds":user
      }
      console.log('修改参数:',param)
      this.$post(this.api.editDocInstitution,param).then(res=>{
        console.log('修改返回值:',res)
        if(res.data.State===200){
          this.getDocInstitutionPage()
          this.dg2=false
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
    },//修改
    deletcontent (ID) {
      this.$confirm('确认删除这条记录吗？','提示',{
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=> {
        this.$get(this.api.delDocInstitution+ID).then(res=>{
          if(res.data.State===200){
            this.getDocInstitutionPage()
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
    .catch(()=> {
        this.$message({
          type: 'info',
          message:'取消'
        })
      })
    },//删除

    getUserDefines () {
      this.$get(this.api.UserDefined.getUserDefinedItems + '5').then(res=>{
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
        "DefinedType": 5,
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
   dateChange(value){
    console.log('日期改变',value)
     this.changeDetail.IssueDate=this.formDate(value)
  },
   formDate(data){
    if(data) {
      let year = data.getFullYear()
      let mouth = (data.getMonth() + 1) > 10 ? (data.getMonth() + 1) : '0' + (data.getMonth() + 1)
      let day = data.getDate() > 10 ? data.getDate() : '0' + data.getDate()
      let hour = data.getHours() > 10 ? data.getHours() : '0' + data.getHours()
      let seconds = data.getSeconds()>10?data.getSeconds():'0'+data.getSeconds()
      let minute = data.getMinutes()>10?data.getMinutes():'0'+data.getMinutes()
      let d = year + '-' + mouth + '-' + day + ' ' + hour + ':' + minute + ':' + seconds
      return d
    } else {
      return false
    }
  },  //格式hua日期
    handleSizeChange(val) {   //修改分页条数
      this.page.size = val
      this.getDocInstitutionPage()
      console.log('分页数改变')
      console.log('分页数:',this.page.size)
    },  //分页数目改变
    handleCurrentChange(val) {   //当前展示页
      this.page.index = val
      this.getDocCertificatePage()
    },  //当前页改变
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
    margin-bottom: 15px
  }
  .wrapper  .table-foot{
    margin-top: 10px;
    background-color: white;
  }
  .wrapper  .table-foot .el-pagination{
    text-align: right !important;
  }
</style>
