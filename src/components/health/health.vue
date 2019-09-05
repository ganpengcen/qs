<template>
  <div class="wrapper">
    <Header title="职业健康" text="健康档案"></Header>
    <div class="table">
      <div class="table-top">
        <el-button type="primary" @click="addW">新建</el-button>
        <div style="height: 40px;float: right">
          <el-form :inline="true">
            <el-form-item item="组织架构:">
              <el-form-item label="组织架构">
                <el-cascader :props="prp" :options="outterOptions" style="width:205px" v-model="health.org" clearable @change="outterChange"></el-cascader>
              </el-form-item>
            </el-form-item>
            <el-form-item label="关键字:">
              <el-input placeholder="请输入关键字" v-model="key" style="width: 120px"></el-input>
            </el-form-item>
            <el-form-item><el-button type="primary" @click="search">查询</el-button></el-form-item>
          </el-form>
        </div>
      </div>
      <div class="table-main">
        <div class="detail">
          <el-table :data="Items" class="datalist" border  height="calc(100vh - 355px)">
            <el-table-column  label="姓名" prop="CNName">
            </el-table-column>
            <el-table-column prop="Gender" label="性别">
            </el-table-column>
            <el-table-column prop="Age" label="年龄">
            </el-table-column>
            <el-table-column prop="Nation" label="名族">
            </el-table-column>
            <el-table-column prop="IllnessRec" label="遗传史">
            </el-table-column>
            <el-table-column prop="HeredityRec" label="病史">
            </el-table-column>
            <el-table-column prop="OpreatRec" label="手术史">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="操作">
              <div slot-scope="scope">
                <el-link :underline="false" type="primary">详情</el-link>
                <el-link :underline="false" type="primary" @click="changeW(scope.row.ID)">修改</el-link>
                <el-link :underline="false" type="primary" @click="deletecontent(scope.row.ID)">删除</el-link>
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
    <el-dialog title="新建健康档案" :visible.sync="dg1" width="1100px" style="height: 100%;overflow: auto">
      <div style="background-color: white;overflow-y: auto;overflow-x: hidden;height: 350px">
        <el-form v-model="newHealth" labelWidth="100px" :inline="true">

          <el-form-item label="组织架构">
            <el-cascader :props="prp" :options="innerOptions" style="width:205px" v-model="newHealth.org" clearable @change="handleChange"></el-cascader>
          </el-form-item>
          <el-form-item label="姓名">
            <el-select v-model="newHealth.EmployeeID">
              <el-option v-for="item, index in newHealth.selector" :label="item.Name" :value="item.ID" :key="index"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="出生年月">
          <el-date-picker style="width: 180px" v-model="newHealth.BirthDay"></el-date-picker>
        </el-form-item>
          <el-form-item label="遗传史">
            <el-input  style="width: 220px" v-model="newHealth.Nation"></el-input>
          </el-form-item>
          <el-form-item label="遗传史">
            <el-input type="textarea" :rows="4" style="width: 910px" v-model="newHealth.HeredityRec"></el-input>
          </el-form-item>
          <el-form-item label="疾病史">
            <el-input type="textarea" :rows="4" style="width: 910px" v-model="newHealth.IllnessRec"></el-input>
          </el-form-item>
          <el-form-item label="手术史">
            <el-input type="textarea" :rows="4" style="width: 910px" v-model="newHealth.OpreatRec"></el-input>
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
      <span slot="footer">
        <el-button @click="dg1 = false">取 消</el-button>
        <el-button type="primary" @click="addHealDocment">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改健康档案" :visible.sync="dg2" width="1100px" style="height: 100%;overflow: auto">
      <div style="background-color: white;overflow-y: auto;overflow-x: hidden;height: 350px">
        <el-form v-model="changeDetail" labelWidth="100px" :inline="true">
          <el-form-item label="组织架构">
              <el-cascader :props="prp" :options="innerOptions" style="width:205px" v-model="changeDetail.Org" clearable @change="handleChange"></el-cascader>
          </el-form-item>
          <el-form-item label="姓名">
            <el-select v-model="changeDetail.EmployeeID" style="width: 180px">
              <el-option v-for="item, index in changeDetail.selector" :label="item.Name" :value="item.ID" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生年月">
            <el-date-picker style="width: 180px" v-model="changeDetail.BirthDay" @change="dateChange"></el-date-picker>
          </el-form-item>
          <el-form-item label="民族">
            <el-input style="width: 220px" v-model="changeDetail.Nation"></el-input>
          </el-form-item>

          <el-form-item label="遗传史">
            <el-input type="textarea" :rows="4" style="width: 910px" v-model="changeDetail.HeredityRec"></el-input>
          </el-form-item>
          <el-form-item label="疾病史">
            <el-input type="textarea" :rows="4" style="width: 910px" v-model="changeDetail.IllnessRec"></el-input>
          </el-form-item>
          <el-form-item label="手术史">
            <el-input type="textarea" :rows="4" style="width: 910px" v-model="changeDetail.OpreatRec"></el-input>
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
      <span slot="footer">
        <el-button @click="dg2 = false">取 消</el-button>
        <el-button type="primary" @click="editHealDocment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  const GUID ='00000000-0000-0000-0000-000000000000'
  import Header from '../../components/assembly/Header.vue'
  export default {
    components: {
      Header
    },
    data () {
      return {
        prp:{
          checkStrictly: true,
          value: 'ID',
          label:'OrgName',
          children:'Children'
        },
        health:{
          org: '',
        },
        newHealth:{
        },
        outterOptions:[],
        innerOptions:[],
        option:[],
        page:{
          size:3,
          index:1,
          total:0
        },
        header:{
          "Token":sessionStorage.Token,
          "AccountID":sessionStorage.AccountID,
        },
        fileList:[],
        upFileList:[],
        userDefine:[],
        key:'',
        dg1:false,
        dg2:false,
        ID:'',
        changeDetail:{},

        form: {
          key: ''
        },
        value: '属性',
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
          }
        ],
        stopcontent: false,
        index: 1  //当前页面编号
      }
    },
    methods: {
      getOutterTree() {
        this.$get(this.api.Org.getTree + GUID).then(res=>{
          if(res.data.State === 200) {
            this.outterOptions = res.data.Data
            console.log('options',this.outterOptions)
          }else {
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },//获取组织架构树
      getInnerTree() {
        this.innerOptions = []
        this.$get(this.api.Org.getTree + GUID).then(res=>{
          if(res.data.State === 200) {
            this.innerOptions = res.data.Data
            console.log('options',this.options)
          }else {
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },//获取组织架构树
      outterChange(value){
        let da = ''
        console.log('value',value)
        if(value) {
          if (value.length > 0) {
            da = value[value.length - 1]
            this.getHealDocmentsPage(da)
          } else {
            return false;
          }
        }
      }, //树节点改变
      handleChange(value) {
        let da = ''
        console.log('value',value)
        if(value) {
          if (value.length > 0) {
            da = value[value.length - 1]
            this.$get(this.api.Org.getEmployeeSelector + da).then(res => {
              if (res.data.State === 200) {
                console.log('节点改变:', res)
                this.$set(this.newHealth, 'selector', res.data.Data)
//            this.selectOption = res.data.Data
              }
            })
          } else {
            return false;
          }
        }
      },//树节点改变
      handleChange2(value) {
        let da = ''
        console.log('value',value)
        if(value) {
          if (value.length > 0) {
            da = value[value.length - 1]
            this.$get(this.api.Org.getEmployeeSelector + da).then(res => {
              if (res.data.State === 200) {
                console.log('节点改变:', res)
                this.$set(this.changeDetail, 'selector', res.data.Data)
                this.dg2=true
//            this.selectOption = res.data.Data
              }
            })
          } else {
            return false;
          }
        }
      },
      getHealDocmentsPage(ID){
        let id=''
        if(ID){
          id=ID
        }else{
          id=''
        }
        let param = {
          "PageSize": this.page.size,
          "PageIndex": this.page.index-1,
          "KeyWord": "",
          "Query": {
            "OrgID": id,
            "Keyword": this.key
          },
          "OrderString": "",
          "ToExcel": false
        }
        console.log('分页查询参数:',param)
        this.$post(this.api.getHealDocmentsPage,param).then(res=>{
          console.log('分页返回值:',res)
          if(res.data.State===200){
            this.Items=res.data.Data.Data
            this.page.total=res.data.Data.Items
          }else{
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },//分页获取人员列表
      search(){
        if(this.health.org){
          if(this.health.org.length>0) {
            this.getHealDocmentsPage(this.health.org[this.health.org.length - 1])
          }
          else {
            this.getHealDocmentsPage()
          }
        }else{
            this.getHealDocmentsPage()
        }
      },  //查询
      addW(){
        this.dg1=true
        this.newHealth={}
        this.fileList=[]
        this.upFileList=[]
        this.getInnerTree()
        this.getUserDefines()
      },//新建窗口
      addHealDocment(){
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
        "EmployeeID": this.newHealth.EmployeeID,
        "BirthDay": this.formatDate(this.newHealth.BirthDay),
        "Nation": this.newHealth.Nation,
        "IllnessRec": this.newHealth.IllnessRec,
        "HeredityRec": this.newHealth.HeredityRec,
        "OpreatRec": this.newHealth.OpreatRec,
        "AttachFiles": this.upFileList,
        "UserDefineds":userData
      }
      console.log('新建参数:',param)
        this.$post(this.api.addHealDocment,param).then(res=>{
          if(res.data.State===200){
            this.dg1=false
            this.search()
            this.$message({
              type:'success',
              message:'新建成功'
            })
          } else {
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },//新建
      deletecontent(ID) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$get(this.api.delHealDocment+ID).then(res=>{
            if(res.data.State===200){
              this.search()
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else{
              this.$message({
                type:'error',
                message:res.data.Msg
              })
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },//删除
      changeW(ID){
        this.ID = ID
        this.getInnerTree()
        this.getUserDefinedList(ID)
        this.getfiles(ID)
        this.getHealDocmentModel(ID)
      }, //修改窗口
      getHealDocmentModel(ID){
        this.$get(this.api.getHealDocmentModel+ID).then(res=>{
          console.log('模型返回值:',res)
        if(res.data.State===200){
          this.changeDetail = res.data.Data
          let data = []
          let org = res.data.Data.OrgID
          console.log('org',res.data.Data.OrgID)
          this.$get(this.api.Org.getParentItems + org).then(res=>{
            if(res.data.State === 200){
              res.data.Data.forEach(item=>{
                data.push(item.ID)
              })
            }
            console.log('data',data)
          })
          data.push(res.data.Data.OrgID)
          this.changeDetail.Org = data
          this.handleChange2(data)
          console.log('data2',this.changeDetail.Org)
        }else{
          this.$message({
            type:'error',
            message:res.data.Msg
          })
        }
        })
      },//获取模型
      editHealDocment(){
        let user = []
        this.userDefine.forEach(i=>{
          user.push({
            DefinedID:i.ID,
            DefinedValue:i.ItemValue
          })
        })
        let param={
          "ID": this.ID,
          "EmployeeID": this.changeDetail.EmployeeID,
          "BirthDay": this.changeDetail.BirthDay,
          "Nation": this.changeDetail.Nation,
          "IllnessRec": this.changeDetail.IllnessRec,
          "HeredityRec":this.changeDetail.HeredityRec,
          "OpreatRec":this.changeDetail.OpreatRec,
          "AttachFiles": this.upFileList,
          "UserDefineds": user
        }
        console.log('修改参数:',param)
        this.$post(this.api.editHealDocment,param).then(res=>{
          if(res.data.State===200){
            this.search()
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
      },//修改健康档案


      dateChange(value){
        console.log('日期改变',value)
        this.changeDetail.BirthDay= this.formatDate(value)
        console.log(this.changeDetail.BirthDay)
      },
      formatDate(data){
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
        console.log('分页数改变')
        console.log('分页数:',this.page.size)
        this.search()
      },  //分页数目改变
      handleCurrentChange(val) {   //当前展示页
        this.page.index = val
        this.search()
      },  //当前页改变

      getUserDefines () {
        this.$get(this.api.UserDefined.getUserDefinedItems + '7').then(res=>{
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
          "DefinedType": 7,
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
      },  //获取文件

    },
    created(){
      this.getOutterTree()
      this.getHealDocmentsPage()
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
</style>
