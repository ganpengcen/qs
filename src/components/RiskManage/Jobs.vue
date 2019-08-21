<template>
  <div class="content">
    <Header title="风险管理" text="岗位管理"></Header>

    <div class="main">
      <div class="top">
      <el-row class="mbd">
        <el-col :span="4">
          <el-button type="primary" @click="addPost">新建</el-button>
        </el-col>
        <el-col :span="9">
          <span>关键字:</span>
          <el-input placeholder="请输入关键字" v-model="key"></el-input>
          <el-button type="primary" @click="getEmployeesByPostID">查询</el-button>
          <a href="#">导出为Excel</a>
        </el-col>
      </el-row>
    </div>
      <el-table
        height="calc(100% - 75px)"
        :data="tabledata"
        border
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
      >
        <el-table-column type="expand">
          <template slot-scope="props"></template>
        </el-table-column>
        <el-table-column label="岗位编号" prop="Code"></el-table-column>
        <el-table-column label="名称" prop="Name"></el-table-column>
        <el-table-column label="责任人" prop="Principal"></el-table-column>
        <el-table-column label="责任人电话" prop="PrincipalTel"></el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope">
            <el-button type="text" @click="changePost(scope.row.ID)">修改</el-button>
            <el-button type="text"  @click="delPost(scope.row.ID)">删除</el-button>
            <el-button type="text" @click="management(scope.row.ID,scope.row.Name)">人员管理</el-button>
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

    <el-dialog width="40%" title="新建岗位" :visible.sync="dg1" style="overflow: auto">
      <div class="info">
        <el-form :inline="true" label-width="75px" v-model="job">
          <el-form-item label="岗位编号">
            <el-input v-model="job.Code"></el-input>
          </el-form-item>
          <el-form-item label="岗位名称">
            <el-input v-model="job.Name"></el-input>
          </el-form-item>
          <el-form-item label="组织架构">
            <el-cascader :props="prp" :options="options" style="width:205px" v-model="job.Org" clearable @change="handleChange"></el-cascader>
          </el-form-item>
          <!--<el-form-item label="责任人">-->
            <!--<el-select v-model="job.Principal">-->
              <!--<el-option v-for="(item, index) in selectOption" :label="item.Name" :value="item.ID" :key="item.ID"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item label="责任人">
            <el-select v-model="job.principal">
              <el-option v-for="item, index in job.selector" :label="item.Name" :value="item.ID" :key="item.ID"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="主要任务">
            <el-input type="textarea" :rows="3" v-model="job.MainTasks"></el-input>
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
        <el-button type="primary" @click="submitPost">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog width="40%" title="修改岗位" :visible.sync="dg2" style="overflow: auto">
      <div class="info">
        <el-form :inline="true" label-width="75px" v-model="job">
          <el-form-item label="岗位编号">
            <el-input v-model="job.Code"></el-input>
          </el-form-item>
          <el-form-item label="岗位名称">
            <el-input v-model="job.Name"></el-input>
          </el-form-item>

          <el-form-item label="组织架构">
            <el-cascader :props="prp" :options="options" style="width:205px" v-model="job.Org" clearable @change="handleChange"></el-cascader>
          </el-form-item>

          <el-form-item label="责任人">
          <el-select v-model="job.Principal">
            <el-option v-for="item, index in job.selector" :label="item.Name" :value="item.ID" :key="index"></el-option>
          </el-select>
        </el-form-item>

          <el-form-item label="主要任务">
            <el-input type="textarea" :rows="3" v-model="job.MainTasks"></el-input>
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
        <el-button type="primary" @click="submitChangePost">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="人员管理" :visible.sync="dg3">
      <div class="info">
        <el-row>
          <el-col :span="8">
            <el-form label-width="100px" size="small" v-model="job2">
              <el-form-item label="岗位编号">
                <el-input disabled v-model="job2.Code"></el-input>
              </el-form-item>
              <el-form-item label="岗位名称">
                <el-input disabled v-model="job2.Name"></el-input>
              </el-form-item>
              <el-form-item label="责任人">
               <el-input v-model="job2.Principal" disabled></el-input>
              </el-form-item>
              <el-form-item label="责任人电话">
                <el-input disabled v-model="personPrincipal"></el-input>
              </el-form-item>
            </el-form>
            <el-form labelWidth="100px" size="small">
              <el-form-item v-for="(item, index) in userDefine" :label="item.Caption" :key="index">
                <el-input v-if="item.DataType ==='字符'" v-model="item.ItemValue" disabled></el-input>

                <el-select v-model="item.ItemValue" v-if="item.DataType === '词典'" :multiple="true" :collapse-tags="true" disabled>
                  <el-option v-for="(a, b) in item.DictSelection" :key="b" :value="a.ID" :label="a.DictName"></el-option>
                </el-select>

                <el-checkbox v-model="item.ItemValue" v-if="item.DataType === '是非'" disabled></el-checkbox>
                <el-input v-if="item.DataType ==='整数'" v-model="item.ItemValue" disabled></el-input>
                <el-input v-if="item.DataType ==='数字'" v-model="item.ItemValue" disabled></el-input>
                <el-date-picker v-if="item.DatTYpe==='日期'" v-model="item.ItemValue" disabled></el-date-picker>
              </el-form-item>
            </el-form>

          </el-col>
          <el-col :span="1"><el-divider direction="vertical"></el-divider></el-col>
          <el-col :span="14">
            <div style="display: flex">
              <div style="flex: 1">
            <el-form class="depar" :inline="true" >
              <el-form-item label="组织架构">
                <el-cascader :props="prp" :options="options" style="width:140px" v-model="job.Org" clearable @change="handleChangePerson"></el-cascader>
              </el-form-item>
              <el-form-item label="责任人">
                <el-select v-model="Principal2" multiple :collapse-tags="true" style="width: 140px;margin-left: 15px">
                  <el-option v-for="(item, index) in job2.selector" :label="item.Name" :value="item.ID" :key="index" style="width: 160px"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            </div>
              <div style="width: 60px;">
                <el-button type="primary" @click="addPerson" style="margin-top: 38px">增加</el-button>
              </div>
            </div>
            <el-table height="168px" :data="persondata" border size="mini" style="overflow: auto">
              <el-table-column label="姓名" prop="CNName"></el-table-column>
              <el-table-column label="部门" prop="OrgName"></el-table-column>
              <el-table-column label="操作">
                <div  slot-scope="scope">
                  <el-button type="text" @click="delPerson(scope.row.ID)">删除</el-button>
                </div>
              </el-table-column>
            </el-table>
            <div>
              <el-pagination
                @size-change="handleSizeChangepersonPage"
                @current-change="handleCurrentChangepersonPage"
                :current-page.sync="personPage.index"
                :page-size="personPage.size"
                :page-sizes="[3, 7, 30, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total.sync="personPage.total">
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  // 文件上传
import Header from "../assembly/Header";
const GUID ='00000000-0000-0000-0000-000000000000'
let treeP = []
export default {
  components: {
    Header
  },
  data() {
    return {
      Principal2:[],
      personPrincipal:'',
      fileList:[],
      upFileList:[],
      job2:{
      Code: '',
        Name: '',
        principal: '',
        Org:'',
        MainTasks:'',
    },
      job:{
        Code: '',
        Name: '',
        principal: '',
        Org:'',
        MainTasks:'',
      },
      userDefine:[],
      header:{
        "Token":sessionStorage.Token,
        "AccountID":sessionStorage.AccountID,
      },
      dg1: false,
      dg2:false,
      dg3:false,
      options: [],
      treedata:[],
      prp:{
        checkStrictly: true,
        value: 'ID',
        label:'OrgName',
        children:'Children'
      },
      page:{
        index:1,
        size:3,
        total:0
      },
      personPage:{
        index:1,
        size:3,
        total:0
      },
      persondata:[],
      key:'',
      tabledata:[],
      ID:'',
      postID:'',
    };
  },
  methods:{
    addPost () {
      this.userDefine = []
      this.job = []
      this.fileList = []
      this.upFileList = []
      this.getUserDefines()
      this.dg1 = true
      this.getTree()
    },  //新建
    submitPost () {
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
        "Code": this.job.Code,
        "Name": this.job.Name,
        "Principal":this.job.principal ,
        "Org": this.job.Org[this.job.Org.length-1],
        "MainTasks":this.job.MainTasks,
       "UserDefineds":userData,
        "FileNews": this.upFileList
      }
      console.log('新建岗位参数:',param)
      this.$post(this.api.addPost, param).then(res=>{
        console.log('新建岗位返回值:',res)
        if(res.data.State === 200){
          this.dg1 = false
          this.getEmployeesByPostID()
          this.$message({
            type:'sucsess',
            message:'新建成功'
          })
        }else{
          this.$message({
            type:'error',
            message:res.data.Msg
          })
        }
      })
    },  //提交新建
    getUserDefines () {
      this.$get(this.api.UserDefined.getUserDefinedItems + '2').then(res=>{
        if(res.data.State === 200){
          console.log('dg1',this.dg1)
          console.log('自定义项返回值:',res.data.Data)
          res.data.Data.forEach(item=>{
            this.$set(item, 'arr', [])
            this.$set(item, 'checked', false)
            if(item.DataType === '词典'){
              this.$get(this.api.UserDefined.dict + item.DictID).then(res=>{
                console.log('自定义项词典返回值:',res.data)
                item.postArr = res.data.Data
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
    getTree() {
      this.options = []
    this.$get(this.api.Org.getTree + GUID).then(res=>{
    if(res.data.State === 200) {
      this.options = res.data.Data
      console.log('options',this.options)
    }else {
      this.$message({
        type:'error',
        message:res.data.Msg
      })
    }
  })
},//获取组织架构树
    handleChange(value) {
      let da = ''
     console.log('value',value)
      if(value) {
        if (value.length > 0) {
          da = value[value.length - 1]
          this.$get(this.api.Org.getEmployeeSelector + da).then(res => {
            if (res.data.State === 200) {
              console.log('节点改变:', res)
              this.$set(this.job, 'selector', res.data.Data)
//            this.selectOption = res.data.Data
            }
          })
        } else {
          return false;
        }
      }
    },//树节点改变
    handleChangePerson(value){
      console.log('数据二点')
      let da = ''
      console.log('value',value)
      if(value) {
        if (value.length > 0) {
          da = value[value.length - 1]
          this.$get(this.api.Org.getEmployeeSelector + da).then(res => {
            if (res.data.State === 200) {
              console.log('节点改变:', res)
              this.$set(this.job2, 'selector', res.data.Data)
//            this.selectOption = res.data.Data
            }
          })
        } else {
          return false;
        }
      }
    },//人员树节点改变
    getEmployeesByPostID() {
      let param = {
        "PageSize": this.page.size,
        "PageIndex": this.page.index - 1,
        "KeyWord": "",
        "Query": this.key,
        "OrderString": "",
        "ToExcel": false
      }
      this.$post(this.api.getPostsPage,param).then(res=>{
        console.log('分页返回值',res)
        if(res.data.State === 200){
          this.page.total = res.data.Data.Items
          this.tabledata = res.data.Data.Data
        } else{
          this.$message({
            type:'error',
            message:res.data.Msg
          })
        }
      })
    },//获取岗位分页列表
    handleSizeChange(val) {   //修改分页条数
      this.page.size = val
      console.log('分页数改变')
      console.log('分页数:',this.page.size)
      this.getEmployeesByPostID(this.ID)
    },  //分页数目改变
    handleCurrentChange(val) {   //当前展示页
      this.page.index = val
      this.getEmployeesByPostID(this.ID)
    },  //当前页改变
    handleSizeChangepersonPage(val) {   //修改分页条数
      this.personPage.size = val
      console.log('分页数改变')
      console.log('分页数:',this.page.size)
      this.getPersonPage(this.personID,this.postName)
    },  //分页数目改变
    handleCurrentChangepersonPage(val) {   //当前展示页
      this.personPage.index = val
      this.getPersonPage(this.personID)
    },  //当前页改变
    delPerson(ID){
      this.$confirm('将永久删除该消息是否确认','提示',{
        confirmButtonText:'确认',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        this.$get(this.api.delPostEmployee+ID).then((res)=>{
          if(res.data.State===200){
            this.getPersonPage(this.personID)
            this.$message({
              type:'suceess',
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
        this.$message({
          type:'info',
          message:'取消'
        })
      })
    }, //删除人员
    delPost(ID){
      this.$confirm('将永久删除该消息是否确认','提示',{
        confirmButtonText:'确认',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        this.$get(this.api.delPost+ID).then((res)=>{
          if(res.data.State===200){
            this.getEmployeesByPostID()
            this.$message({
              type:'suceess',
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
        this.$message({
          type:'info',
          message:'取消'
        })
      })
    },  //删除岗位
    changePost(ID) {
      this.ID = ID
      this.userDefine = []
      this.job = []
      this.fileList = []
      this.upFileList = []
      this.dg2 = true
      this.getTree()
      this.getfiles(ID)
     this.getPostModel(ID)
      this.getUserDefinedList(ID)
    },  //修改
    submitChangePost() {
      let user = []
        this.userDefine.forEach(i=>{
          user.push({
            DefinedID:i.ID,
            DefinedValue:i.ItemValue
          })
      })
      let param = {
        "ID":this.ID,
        "Code": this.job.Code,
        "Name": this.job.Name,
        "Principal":this.job.Principal ,
        "Org": this.job.Org[this.job.Org.length-1],
        "MainTasks":this.job.MainTasks,
        "UserDefineds":user,
        "FileNews": this.upFileList
      }
      console.log('岗位修改参数:',param)
      this.$post(this.api.editPost,param).then(res=>{
        if(res.data.State === 200) {
          this.getEmployeesByPostID()
          this.dg2 = false
        }
      })
    },  //提交修改
    getPostModel(ID) {
      console.log(ID)
      this.$get(this.api.getPostModel + ID).then(res=>{
        console.log('获取岗位模型：',res)
        if(res.data.State === 200) {
          this.job = res.data.Data
          let data = []
          let org = res.data.Data.Org
          console.log('org',res.data.Data.Org)
          this.$get(this.api.Org.getEmployeeSelector + org).then(res=>{
            if(res.data.State === 200){
              console.log('责任人反回值:',res)
              this.$set(this.job, 'selector',res.data.Data)
            }
          })
          this.$get(this.api.Org.getParentItems + org).then(res=>{
            if(res.data.State === 200){
              res.data.Data.forEach(item=>{
                data.push(item.ID)
              })
            }
            console.log('data',data)
          })
          data.push(res.data.Data.Org)
          this.job.Org = data
          console.log('data2',this.job.Org)
        }
      })
    },  //获取岗位模型
    getUserDefinedList(ID){
      let param={
        "DefinedType": 2,
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

    management (ID,name) {
      this.postID = ID
      this.Principal2 = []
      this.job = {}
      this.dg3 = true
      this.personPrincipal = name
      this.job2 = {}
      this.getTree()
      this.getUserDefinedList(ID)
      this.getPersonPage()
      this.$get(this.api.getPostModel + ID).then(res=>{
        console.log('获取岗位模型：',res)
        if(res.data.State === 200) {
          this.job2 = res.data.Data
          let data = []
          let p=[]
          let org = res.data.Data.Org
          this.$get(this.api.Org.getParentItems + org).then(res=>{
            if(res.data.State === 200){
              res.data.Data.forEach(item=>{
                data.push(item.ID)
              })
            }
            console.log('data',data)
          })
          data.push(res.data.Data.Org)
          this.job2.Org = data
          console.log('data2',this.job2.Org)
        }
      })
    }, //人员管理窗口

    addPerson() {
      let param = {
        "PostID": this.postID,
        "EmployeeID": this.Principal2
      }
     console.log('id集合',param)
        this.$post(this.api.addPostEmployee,param).then(res=>{
          if(res.data.State === 200) {
            this.getPersonPage()
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
    },  //新增人员
    getPersonPage() {
      let param ={
        "PageSize": this.personPage.size,
        "PageIndex": this.personPage.index - 1,
        "KeyWord": "",
        "Query": this.postID,
        "OrderString": "",
        "ToExcel": false
      }
      console.log('获取人员参数',param)
      this.$post(this.api.getEmployeesByPostID,param).then(res=>{
        console.log('获取人员返回值:',res)
        if(res.data.State === 200) {
          this.persondata = res.data.Data.Data
          this.personPage.total = res.data.Data.Items
        }else {
          this.$message({
            type:'error',
            message:res.data.Msg
          })
        }
      })

    }, //获取岗位人员
    // 文件上传
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
    getFileDetail () {}, //获取用户上传文件详情
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
  },
  created () {
    this.getEmployeesByPostID()
  }
};
</script>
<style scoped>
.info{
  background: #fff;
  padding: 15px
}
.content {
  overflow: hidden;
  height: 100%;
}
.el-col-1 .el-divider{
  height: 237px;
}
.main {
  width: calc(100% - 50px);
  height: calc(100% - 155px);
  margin:15px 0 15px 25px;
  overflow: hidden;
}
.el-col-4 .el-button {
  margin: 10px 0 10px 20px;
}
.el-textarea{
  width: 460px
}
.el-col-9 .el-input {
  width: 35%;
}
.el-col-9 {
  float: right;
  margin: 0 0 10px 0;
}
.depar .el-form-item{
  width: 35%;
}
.mbd {
  background: #fff;
  border-top: 2px solid #049eff;
  border-radius: 5px;
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
  margin-top: 15px;
}
.top {
  width: 100%;
}
.pge {
  width: calc(100% - 50px);
  margin-left: 25px;
  height: 31px;
  text-align: right;
  background: #fff;
}
</style>
