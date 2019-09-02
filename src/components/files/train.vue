<template>
  <div class="wrapper">
    <Header title="档案管理" text="培训管理"></Header>
    <div class="table">
      <div class="table-top">
        <div class="search">
        <el-button type="primary" @click="addTrain">新建</el-button>
        <div style="height: 40px;float: right;margin-right: 20px">
          <el-form :inline="true">
            <el-form-item label="关键字:">
              <el-input placeholder="请输入关键字" v-model="form.key" style="width: 120px"></el-input>
            </el-form-item>
            <el-form-item><el-button type="primary">查询</el-button></el-form-item>
          </el-form>
        </div>
        </div>
      </div>
      <div class="table-main">
        <div class="detail">
          <el-table :data="Items" class="datalist" border  height="calc(100vh - 355px)">
            <el-table-column  label="培训标题" prop="Code">
            </el-table-column>
            <el-table-column prop="Code" label="培训日期">
            </el-table-column>
            <el-table-column prop="StartTime" label="培训时长">
            </el-table-column>
            <el-table-column prop="Person" label="培训人">
            </el-table-column>
            <el-table-column label="操作">
              <el-link type="primary" :underline="false">详情</el-link>
              <el-link type="primary" :underline="false" @click="changedetail=true">修改</el-link>
              <el-link type="primary" @click="deletecontent()" :underline="false">删除</el-link>
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

    <el-dialog title="新建培训管理" :visible.sync="newcontent" width="600px;" style="height:100%;width: 100%;overflow: auto">
      <div style="height: 350px;overflow-y: auto;overflow-x: hidden;background-color: white;margin-top: 20px;padding: 10px">
        <el-form labelWidth="150px">
          <el-form-item label="培训主题:">
            <el-input style="width: 220px;" v-model="training.Motif"></el-input>
          </el-form-item>
          <el-form-item label="培训时长:">
            <el-input style="width: 220px;" v-model="training.TrainLong"></el-input>
          </el-form-item>
          <el-form-item label="培训日期:">
           <el-date-picker v-model="training.TrainDate"></el-date-picker>
          </el-form-item>
          <el-form-item label="培训人:">
            <el-input style="width: 220px;" v-model="training.Trainer"></el-input>
          </el-form-item>
        </el-form>
        <p style="margin-left:80px">参培人员:</p>
        <div style="margin: 10px 0px 10px 20px">
        <el-row>
          <el-form class="depar" :inline="true" >
            <el-form-item label="组织架构">
              <el-cascader :props="prp" ref="cascader" :options="options" style="width:140px" v-model="nTrain.Org" clearable @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item label="责任人">
              <el-select v-model="Principal" style="width: 140px;margin-left: 15px">
                <el-option v-for="(item, index) in nTrain.selector" :label="item.Name" :value="item.ID" :key="item.ID" style="width: 160px"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="addPerson">增加</el-button>
        </el-row>
        </div>
          <el-table border height="200px" :data="Items"  style="margin-left: 20px;width: 600px;margin-bottom: 20px">
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="org" label="部门"></el-table-column>
            <el-table-column label="操作">
              <div slot-scope="scope">
                <el-link>删除</el-link>
              </div>
            </el-table-column>
          </el-table>
        <el-form labelWidth="150px">
          <el-form-item label="内容:">
            <div style="vertical-align: top;line-height: 40px;width: 400px;">
              <editor v-model="training.Content"></editor>
            </div>
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
        <el-button @click="newcontent = false">取 消</el-button>
        <el-button type="primary" @click="addDocTraining">确 定</el-button>
     </span>
    </el-dialog>

    <el-dialog title="修改培训管理" :visible.sync="changedetail" width="600px;" style="height:100%;width: 100%;overflow: auto">
      <div style="height: 350px;overflow-y: auto;overflow-x: hidden;background-color: white;margin-top: 20px;padding: 10px">
        <el-form labelWidth="150px">
          <el-form-item label="培训主题:">
            <el-input style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="培训时长:">
            <el-input style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="培训日期:">
            <el-date-picker></el-date-picker>
          </el-form-item>
          <el-form-item label="培训人:">
            <el-input style="width: 220px;"></el-input>
          </el-form-item>
        </el-form>
        <p style="margin-left:80px">参培人员:</p>
        <div style="margin: 10px 0px 10px 20px">
          <el-row>
            <el-select placeholder="请选择组织架构">
              <el-option label="1323" value="133"></el-option>
            </el-select>
            <el-select>
              <el-option label="12" value="123"></el-option>
            </el-select>
            <el-button type="primary">增加</el-button>
          </el-row>
        </div>
        <el-table border height="200px" :data="Items"  style="margin-left: 20px;width: 600px;margin-bottom: 20px">
          <el-table-column prop="Code" label="姓名"></el-table-column>
          <el-table-column prop="Code" label="部门"></el-table-column>
          <el-table-column prop="Code"></el-table-column>
        </el-table>
        <el-form labelWidth="150px">
          <el-form-item label="内容:">
            <div style="vertical-align: top;line-height: 40px;width: 400px;">
              <editor></editor>
            </div>
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
        <el-button @click="changedetail = false">取 消</el-button>
        <el-button type="primary" @click="changedetail = false">确 定</el-button>
     </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../../components/assembly/Header.vue'
  import editor from '../../components/ediitor/quillEditor.vue'
  const GUID ='00000000-0000-0000-0000-000000000000'
  export default {
    components: {
      Header,
      editor
    },
    data () {
      return {
        header:{
          "Token":sessionStorage.Token,
          "AccountID":sessionStorage.AccountID,
        },
        fileList:[],
        upFileList:[],
        page:{
          index:1,
          size:3,
          total:0
        },
        training:{
          "Motif": "",
          "TrainDate": "",
          "TrainLong": '',
          "Trainer": "",
          "Content": "",
          "EmployeeIDs": []
        },
        prp:{
          checkStrictly: true,
          value: 'ID',
          label:'OrgName',
          children:'Children'
        },
        options: [],
        nTrain:{
          selector:[],
          Org:[]
        },
        Principal:'',
        personTable:[],
        personPage:{
          size:'3',
          index:1,
          total:0
        },
        Items:[],
        OrgName:'',

        form:{
          key:''
        },
        newcontent:false,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        changedetail:false,
        stopcontent: false,
        index: 1  //当前页面编号
      }
    },
    methods: {
      addTrain(){
      this.newcontent = true
        this.getTree(GUID)
      },
      addDocTraining(){
        let param = {
          "Motif": this.training.Motif,
          "TrainDate": this.training.TrainDate,
          "TrainLong": this.training.TrainLong,
          "Trainer": this.training.Trainer,
          "Content": this.training.Content,
          "AttachFiles":this.upFileList,
          "EmployeeIDs": this.Principal,
        }
        console.log('新建安全会议参数:',param)
      },//新建培训管理
      getTrainingEmpsPage(){
        this.$post(this.api.getTrainingEmpsPage,param).then(res=>{
          if(res.data.State=== 200){
            this.personTable = res.data.Data.Data
            this.personPage.total = res.data.Data.Items
          }else{
           this.$message({
             type:'error',
             message:res.data.Msg
           })
          }
        })
      },// 根据培训ID分页获取培训人员列表
      addPerson(){
        console.log('org',this.nTrain.Org)
        console.log('责任人',this.Principal)
        var flag = false
        console.log('itrdm',this.Items)
     for(var i =0;i < this.Items.length;i++){
        if(this.Items[i].ID===this.Principal){
          flag=true
          this.$message({
            type:'warning',
            message:'该人员已添加'
          })
        }
     }
     if(!flag){
       let name=''
       this.nTrain.selector.forEach(item=>{
         if(item.ID === this.Principal)
           name=item.Name
       })
       var org=''
       this.Items.push({
        name:name,
        ID:this.Principal,
         org:this.OrgName
       })
     }
     },
//      getCheckedNodes(n){
//        console.log('node:',n)
//      },

//文件操作
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
      //分页查询
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
      getTree() {
        this.options = []
        this.$get(this.api.Org.getTree + GUID).then(res=>{
          console.log('组织架构树:',res)
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
        console.log('org；',this.nTrain.Org)
        if(value) {
          if (value.length > 0) {
            var OrgN=this.$refs.cascader.getCheckedNodes()
            this.OrgName =OrgN[0].data.OrgName
             da = value[value.length - 1]
            this.$get(this.api.Org.getEmployeeSelector + da).then(res => {
              if (res.data.State === 200) {
                console.log('节点改变:', res)
                this.$set(this.nTrain, 'selector', res.data.Data)
//            this.sel  thiectOption = res.data.Data
              }
            })
          } else {
            return false;
          }
        }
      },//树节点改变

      deletecontent () {
        this.$confirm('确认删除这条记录吗？','提示',{
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=> {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }).catch(()=> {
          this.$message({
            type: 'info',
            message:'取消'
          })
        })
      },
    },
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
