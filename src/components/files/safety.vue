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
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="table-main">
        <div class="detail">
          <el-table :data="Items" class="datalist" border  height="calc(100vh - 355px)">
            <el-table-column prop="Person" label="会议主体">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="会议时间">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="地点">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="参会人员">
            </el-table-column>
            <el-table-column prop="StateName" label="主持">
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
              <el-select v-model="form.Employee" placeholder="选择参会人员"  style="width:180px">
                <el-option  v-for="item in personSelect" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
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

        dialogFormVisible: false,
        ruleForm:{
          date1: "",
          date2: "",
        } ,
        formInline: {
          user: '',
          region: '',
        },
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
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
      dg1(){
        this.dialogFormVisible = true
        this.getUserDefines()
      },
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
        let user= []
          this.userDefine.forEach((item)=>{
          user.push({

          })
          })
        let param = {
          "Motif": this.form.Motif,
          "Employee": this.form.Employee,
          "MeetingDate":  this.form.MeetingDate,
          "MeetingMaster":  this.form.MeetingMaster,
          "Site": this.form.Site,
          "Content":  this.form.Content,
          "AttachFiles": this.upFileList,
          "UserDefineds": userData
        }
        console.log('新建安全会议参数:',param)
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
        console.log('分页数:',this.page.size)
      },  //分页数目改变
      handleCurrentChange(val) {   //当前展示页
        this.page.index = val
      },  //当前页改变
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
