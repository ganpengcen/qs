<template>
  <div class="wrapper">
    <Header title="档案管理" text="安全会议"></Header>
    <div class="table">
      <div class="table-top">
        <el-button type="primary" @click="dg1">新建</el-button>
        <div style="float: right;margin-right: 20px">
          <el-form :inline="true">
            <el-form-item label="关键词:">
              <el-input style="width: 120px" v-model="key"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getDocMeetingsQuery">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="table-main">
        <div class="detail">
          <el-table :data="Items" class="datalist" border  height="calc(100vh - 355px)">
            <el-table-column prop="Motif" label="会议主题">
            </el-table-column>
            <el-table-column prop="MeetingDate" label="会议时间">
            </el-table-column>
            <el-table-column prop="Site" label="地点">
            </el-table-column>
            <el-table-column prop="Employee" label="参会人员">
            </el-table-column>
            <el-table-column prop="MeetingMaster" label="主持">
            </el-table-column>
            <el-table-column label="操作">
              <div slot-scope="scope">
                <el-link :underline="false" type="primary">详情</el-link>
                <el-link :underline="false" type="primary" @click="changeW(scope.row.ID)">修改</el-link>
                <el-link :underline="false" type="primary" @click="delDocMeeting(scope.row.ID)">删除</el-link>
              </div>
            </el-table-column>
          </el-table>
        </div>
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
 <!--弹框-->
    <div >
      <el-dialog title="新建安全会议" :visible.sync="dialogFormVisible" width="680px">
        <div class="content">
          <el-form :inline="true" :model="formInline"   label-width="100px">
            <el-form-item label="会议主题：" >
            <el-input v-model="form.Motif" autocomplete="off"  style="width:180px"></el-input>
          </el-form-item>
            <el-form-item label="主持人：" >
              <el-input v-model="form.MeetingMaster" autocomplete="off"  style="width:180px"></el-input>
            </el-form-item>
            <el-form-item label="会议地点：" >
              <el-input v-model="form.Site" autocomplete="off"  style="width:180px"></el-input>
            </el-form-item>
            <el-form-item label="参会人员">
              <el-input v-model="form.Employee" placeholder="请输入参会人员" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="会议日期：" >
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.MeetingDate" style="width: 180px;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="内容:">
              <div style="vertical-align: top;line-height: 40px;width: 400px;">
                <editor v-model="form.Content"></editor>
                <el-input v-model="form.Content" style="width:180px" placeholder="请输入类容"></el-input>
              </div>
            </el-form-item>
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
          </el-form>

          <el-form labelWidth="75px" :inline="true">
            <el-form-item v-for="(item, index) in userDefine" :label="item.Caption" :key="item.ID">
              <el-input v-if="item.DataType ==='字符'" v-model="item.value" style="width: 220px"></el-input>
              <el-select v-model="item.arr" v-if="item.DataType === '词典'" :multiple="true" :collapse-tags="true">
                <el-option v-for="(a, b) in item.postArr" :key="a.ID" :value="a.ID" :label="a.Name"></el-option>
              </el-select>
              <el-checkbox v-model="item.checked" v-if="item.DataType === '是非'"></el-checkbox>
              <el-input v-if="item.DataType ==='整数'" v-model="item.value" style="width: 220px"></el-input>
              <el-input v-if="item.DataType ==='数字'" v-model="item.value" style="width: 220px"></el-input>
              <el-date-picker v-if="item.DatType==='日期'" v-model="item.value"></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" >取消</el-button>
          <el-button type="primary" @click="addDocMeeting">确定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改安全会议" :visible.sync="dg2" width="680px">
        <div class="content">
          <el-form :inline="true"   label-width="100px">
            <el-form-item label="会议主题：" >
              <el-input v-model="changeDetail.Motif" autocomplete="off"  style="width:180px"></el-input>
            </el-form-item>
            <el-form-item label="主持人：" >
              <el-input v-model="changeDetail.MeetingMaster" autocomplete="off"  style="width:180px"></el-input>
            </el-form-item>
            <el-form-item label="会议地点：" >
              <el-input v-model="changeDetail.Site" autocomplete="off"  style="width:180px"></el-input>
            </el-form-item>
            <el-form-item label="参会人员">
             <el-input style="width: 180px" v-model="changeDetail.Employee"></el-input>
            </el-form-item>
            <el-form-item label="会议日期：" >
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker type="date" placeholder="选择日期" v-model="changeDetail.MeetingDate" @change="dateChange" style="width: 180px;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="内容:">
              <div style="vertical-align: top;line-height: 40px;width: 400px;">
                <editor v-model="form.Content"></editor>
              </div>
            </el-form-item>
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
        <div slot="footer" class="dialog-footer">
          <el-button @click="dg2 = false" >取消</el-button>
          <el-button type="primary" @click="editDocMeeting">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../../components/assembly/Header.vue'
  import editor from '../../components/ediitor/quillEditor.vue'
  export default {
    components: {
      Header,
      editor
    },
    data () {
      return {
        totalPerson:'',
        fileList:[],
        upFileList:[],
        page:{
          index:1,
          size:3,
          total:0
        },
        form: {},
        personSelect:[],
        editorOption:{
          modules:{
            toolbar:[
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block']
            ]
          }
        },
        header:{
          "Token":sessionStorage.Token,
          "AccountID":sessionStorage.AccountID,
        },
        userDefine:[],
        key:'',
        dg2:false,
        dialogFormVisible: false,
        ID:'',
        changeDetail:{},



        ruleForm:{
          date1: "",
          date2: "",
        } ,
        formInline: {
          user: '',
          region: '',
        },
        Items: [
          {
            'Code': 123,
            'Name': 123,
            'StartTime': 123,
            'EndTime': 123,
            'Rate': 123,
            'Person': 123,
            'PrincipalEmployeeName': 123,
            'StateName': 123,
            'detail': [
              {
                'type': 1,
                'name': 12,
                'item': 123,
                'rank': 1234
              }
            ]
          },
          {
            'Code': 123,
            'Name': 123,
            'StartTime': 123,
            'EndTime': 123,
            'Rate': 123,
            'Person': 123,
            'PrincipalEmployeeName': 123,
            'StateName': 123,
            'detail': [
              {
                'type': 1,
                'name': 12,
                'item': 123,
                'rank': 1234
              }
            ]
          },
          {
            'Code': 123,
            'Name': 123,
            'StartTime': 123,
            'EndTime': 123,
            'Rate': 123,
            'Person': 123,
            'PrincipalEmployeeName': 123,
            'StateName': 123,
            'detail': [
              {
                'type': 1,
                'name': 12,
                'item': 123,
                'rank': 1234
              }
            ]
          },
          {
            'Code': 123,
            'Name': 123,
            'StartTime': 123,
            'EndTime': 123,
            'Rate': 123,
            'Person': 123,
            'PrincipalEmployeeName': 123,
            'StateName': 123,
            'detail': [
              {
                'type': 1,
                'name': 12,
                'item': 123,
                'rank': 1234
              }
            ]
          },
          {
            'Code': 123,
            'Name': 123,
            'StartTime': 123,
            'EndTime': 123,
            'Rate': 123,
            'Person': 123,
            'PrincipalEmployeeName': 123,
            'StateName': 123,
            'detail': [
              {
                'type': 1,
                'name': 12,
                'item': 123,
                'rank': 1234
              }
            ]
          },
          {
            'Code': 123,
            'Name': 123,
            'StartTime': 123,
            'EndTime': 123,
            'Rate': 123,
            'Person': 123,
            'PrincipalEmployeeName': 123,
            'StateName': 123,
            'detail': [
              {
                'type': 1,
                'name': 12,
                'item': 123,
                'rank': 1234
              }
            ]
          },
          {
            'Code': 123,
            'Name': 123,
            'StartTime': 123,
            'EndTime': 123,
            'Rate': 123,
            'Person': 123,
            'PrincipalEmployeeName': 123,
            'StateName': 123,
            'detail': [
              {
                'type': 1,
                'name': 12,
                'item': 123,
                'rank': 1234
              }
            ]
          },
          {
            'Code': 123,
            'Name': 123,
            'StartTime': 123,
            'EndTime': 123,
            'Rate': 123,
            'Person': 123,
            'PrincipalEmployeeName': 123,
            'StateName': 123,
            'detail': [
              {
                'type': 1,
                'name': 12,
                'item': 123,
                'rank': 1234
              }
            ]
          }
        ],
        stopcontent: false,
        index: 1  //当前页面编号
      }
    },
    methods: {
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
      dateChange(value){
        console.log('日期改变',value)
        console.log('模型',this.changeDetail.MeetingDate)
        console.log('格式化：',this.formDate(value))
        this.changeDetail.MeetingDate= this.formDate(value)
      },//日期改变
      dg1(){
        this.upFileList=[]
        this.fileList=[]
        this.dialogFormVisible = true
        this.getUserDefines()
      }, //新建窗口
      addDocMeeting(){
        let userData=[]
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
          "Motif": this.form.Motif,
          "Employee": this.form.Employee,
          "MeetingDate":  this.formDate(this.form.MeetingDate),
          "MeetingMaster":  this.form.MeetingMaster,
          "Site": this.form.Site,
          "Content":  this.form.Content,
          "AttachFiles": this.upFileList,
          "UserDefineds": userData
        }
        console.log('新建安全会议参数:',param)
        this.$post(this.api.addDocMeeting,param).then(res=>{
          console.log('新建返回参数:',res)
          if(res.data.State===200){
            this.dialogFormVisible=false
            this.getDocMeetingsQuery()
            this.$message({
              type:'success',
              message:'新建成功'
            })
          } else{
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },  //新建安全会议
      getpersonSelect(){
      }, //获取人员选择器
      getDocMeetingsQuery(){
        let param = {
          "PageSize": this.page.size,
          "PageIndex": this.page.index-1,
          "KeyWord": "",
          "Query": this.key,
          "OrderString": "",
          "ToExcel": false
        }
        console.log('分页参数:',param)
        this.$post(this.api.getDocMeetingsQuery,param).then(res=>{
          console.log('分页返回值:',res)
          if(res.data.State === 200){
            this.key=''
            this.Items = res.data.Data.Data
            this.page.total = res.data.Data.Items
          } else{
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },//分页获取安全会议
      getUserDefines () {
        this.$get(this.api.UserDefined.getUserDefinedItems + '6').then(res=>{
          if(res.data.State === 200){
            console.log('dg1',this.dg1)
            console.log('自定义项返回值:',res.data.Data)
            res.data.Data.forEach(item=>{
              this.$set(item, 'arr', [])
              this.$set(item, 'value', '')
              this.$set(item, 'checked', false)
              if(item.DataType === '词典'){
                this.$get(this.api.UserDefined.dict + item.DictID).then(res=>{
                  console.log('自定义项词典返回值:',res.data)
                  this.$set(item,'postArr',res.data.Data)
                  console.log('PostArr',item.postArr)
                })
              }
            })
            this.userDefine = res.data.Data
            console.log('用户自定义返回值:',this.userDefine)
          } else {
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      }, //获取用户自定义项
      changeW(ID){
        this.ID =ID
        this.dg2=true
        this.getfiles(ID)
        this.getUserDefinedList(ID)
        this.getDocMeetingModel(ID)
      },  //修改窗口
      getDocMeetingModel(ID){
        this.$get(this.api.getDocMeetingModel+ID).then(res=>{
          console.log('模型返回值:',res)
          if(res.data.State===200){
            this.changeDetail=res.data.Data
          }else{
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      }, //获取模型
      editDocMeeting(){
        let user = []
        this.userDefine.forEach(i=>{
          user.push({
            DefinedID:i.ID,
            DefinedValue:i.ItemValue
          })
        })
        let param={
          "ID": this.ID,
          "Motif":this.changeDetail.Motif,
          "Employee": this.changeDetail.Employee,
          "MeetingDate": this.changeDetail.MeetingDate,
          "MeetingMaster": this.changeDetail.MeetingMaster,
          "Site": this.changeDetail.Site,
          "Content": this.changeDetail.Content,
          "AttachFiles": this.upFileList,
          "UserDefineds": user
        }
        console.log('修改参数；',param)
        this.$post(this.api.editDocMeeting,param).then(res=>{
          if(res.data.State===200){
            this.dg2=false
            this.getDocMeetingsQuery()
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
      },//修改安全会议
      delDocMeeting(ID){
          this.$confirm('你将永久删除该条会议,是否确认?','提示',{
            confirmButtonText:'确认',
            cancelButtonText:'取消',
            type:'warning'
          }).then(()=>{
              this.$get(this.api.delDocMeeting+ID).then(res=>{
                if(res.data.State===200){
                  this.getDocMeetingsQuery()
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
          }).catch(()=>{
            this.$message( {
              type:'info',
              message:'已取消'
            })
          })
      },//删除安全会议

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
      handleSizeChange(val) {   //修改分页条数
        this.page.size = val
        console.log('分页数改变')
        this.getDocMeetingsQuery()
        console.log('分页数:',this.page.size)
      },  //分页数目改变
      handleCurrentChange(val) {   //当前展示页
        this.page.index = val
        this.getDocMeetingsQuery()
      },  //当前页改变
      getUserDefinedList(ID){
        let param={
          "DefinedType": 6,
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
    },
    created(){
      this.getDocMeetingsQuery()
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
    margin: 0 0 15px 25px;
    overflow: hidden;
    width: calc(100% - 50px)
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
  .content{
    overflow-y:scroll;
    height:350px;
    padding:20px;
    background-color:white;
  }
</style>
