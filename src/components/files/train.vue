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
              <el-input placeholder="请输入关键字" v-model="key" style="width: 120px"></el-input>
            </el-form-item>
            <el-form-item><el-button type="primary" @click="getTrainingEmpsPage">查询</el-button></el-form-item>
          </el-form>
        </div>
        </div>
      </div>
      <div class="table-main">
        <div class="detail">
          <el-table :data="traingTable" class="datalist" border  height="calc(100vh - 355px)">
            <el-table-column  label="培训标题" prop="Motif">
            </el-table-column>
            <el-table-column prop="TrainDate" label="培训日记">
            </el-table-column>
            <el-table-column prop="TrainLong" label="培训时长">
            </el-table-column>
            <el-table-column prop="Trainer" label="培训人">
            </el-table-column>
            <el-table-column label="操作">
              <div slot-scope="scope">
                <el-link type="primary" :underline="false">详情</el-link>
                <el-link type="primary" :underline="false" @click="changeW(scope.row.ID)">修改</el-link>
                <el-link type="primary" @click="delTraining(scope.row.ID)" :underline="false">删除</el-link>
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

    <el-dialog title="新建培训管理" :visible.sync="newcontent" width="600px;" style="height:100%;width: 100%;overflow: auto">
      <div style="height: 350px;overflow-y: auto;overflow-x: hidden;background-color: white;margin-top: 20px;padding: 10px">
        <el-form labelWidth="150px">
          <el-form-item label="培训主题:">
            <el-input style="width: 220px;" v-model="training.Motif"></el-input>
          </el-form-item>
          <el-form-item label="培训时长:">
            <el-input style="width: 220px;" v-model="TrainLong" placeholder="请填入小时数" ></el-input>
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
              <editor v-model="Content" :options="editorOption"></editor>
            </div>
          </el-form-item>
          <el-input v-model="Content"></el-input>
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
            <el-input style="width: 220px;" v-model="changeData.Motif"></el-input>
          </el-form-item>
          <el-form-item label="培训时长:">
            <el-input style="width: 220px;" v-model="changeData.TrainLong"></el-input>
          </el-form-item>
          <el-form-item label="培训日期:">
            <el-date-picker v-model="changeData.TrainDate" @change="dateChange"></el-date-picker>
          </el-form-item>
          <el-form-item label="培训人:">
            <el-input style="width: 220px;" v-model="changeData.Trainer"></el-input>
          </el-form-item>
        </el-form>
        <p style="margin-left:80px">参培人员:</p>
        <div style="margin: 10px 0px 10px 20px">
          <el-row>
            <el-form>
              <el-form-item label="组织架构">
                <el-cascader :props="prp" ref="cascader" :options="options" style="width:140px" v-model="nTrain.Org" clearable @change="handleChange"></el-cascader>
              </el-form-item>
              <el-form-item label="责任人">
                <el-select v-model="Principal" style="width: 140px;margin-left: 15px">
                  <el-option v-for="(item, index) in nTrain.selector" :label="item.Name" :value="item.ID" :key="item.ID" style="width: 160px"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-button type="primary" @click="addPerson2">增加</el-button>
          </el-row>
        </div>
        <el-table border height="200px" :data="personTable"  style="margin-left: 20px;width: 600px;margin-bottom: 20px">
          <el-table-column prop="Name" label="姓名"></el-table-column>
          <el-table-column prop="Department" label="部门"></el-table-column>
          <el-table-column label="操作">
            <div slot-scope="scope">
              <el-link @click="delPer(scope.row)" type="primary" :underline="false">删除</el-link>
            </div>
          </el-table-column>
        </el-table>
        <el-form labelWidth="150px">
          <el-form-item label="内容:">
            <div style="vertical-align: top;line-height: 40px;width: 400px;">
              <editor v-model="changeData.Content"></editor>
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
        <el-button type="primary" @click="editTraining">确 定</el-button>
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
        TrainLong:'',
        editorOption:{
          placeholder:'请输入内容'
        },
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
          "TrainLong":'',
          "Trainer": "",
          "Content": "",
          "EmployeeIDs": []
        },
        key:'',
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
        Content:'123',
        Principal:'',
        personTable:[],
        traingTable:[],
        personPage:{
          size:'3',
          index:1,
          total:0
        },
        Items:[],
        OrgName:'',
        changeData:[],
        ID:'',
        newcontent:false,
        changedetail:false,
      }
    },
    watch:{
      TrainLong(val){
        if(parseInt(this.TrainLong)) {
          this.TrainLong = parseInt(this.TrainLong)
        }else {
          this.TrainLong=''
        }
      }
    },
    methods: {
      dateChange(value){
        console.log('日期改变',value)
        this.changeData.TrainDate= this.dataChange(value)
        console.log(this.changeData.TrainDate)
      },
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
      },  //格式换日期
      timeChange(e){
        console.log('e的类型:',e>0)
        console.log('e的类型:',typeof e)
        if(!(e>0)){
          this.training.TrainLong = ''
          this.$message({
            type:'info',
            message:'请输入有效数字'
          })
        }
      },//输入时长
      addTrain(){
        this.fileList = []
        this.Items=[]
        this.TrainLong=''
        this.upFileList = []
      this.newcontent = true
        this.training = {
          "Motif": "",
          "TrainDate": "",
          "TrainLong":'',
          "Trainer": "",
          "Content": "",
          "EmployeeIDs": []
        }
        this.getTree(GUID)
      }, //新建窗口
      addDocTraining(){
        let pri = []
        this.Items.forEach(i=>{
          pri.push(i.ID)
        })
        let param = {
          "Motif": this.training.Motif,
          "TrainDate": this.formDate(this.training.TrainDate),
          "TrainLong": this.TrainLong,
          "Trainer": this.training.Trainer,
          "Content": this.Content,
          "AttachFiles":this.upFileList,
          "EmployeeIDs": pri
        }
        console.log('新建安全会议参数:',param)
        this.$post(this.api.addDocTraining,param).then(res=>{
          if(res.data.State === 200){
            this.newcontent = false
            this.getTrainingEmpsPage()
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
      },//新建培训管理
      getTrainingEmpsPage(){
        let param ={
          "PageSize": this.page.size,
          "PageIndex": this.page.index-1,
          "KeyWord": "",
          "Query":this.key,
          "OrderString": "",
          "ToExcel": false
        }
        this.$post(this.api.getTrainingsPage,param).then(res=>{
          console.log('分页返回值：',res)
          if(res.data.State=== 200){
            this.traingTable = res.data.Data.Data
            this.page.total = res.data.Data.Items
          }else{
           this.$message({
             type:'error',
             message:res.data.Msg
           })
          }
        })
      },// 分页获取会议
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
       this.Items.push({
        name:name,
        ID:this.Principal,
         org:this.OrgName
       })
     }
     },  //增加参会人员
      addPerson2(){
        console.log('责任人',this.Principal)
        var flag = false
        console.log('personTable',this.personTable)
        for(var i =0;i < this.personTable.length;i++){
          if(this.personTable[i].EmployeeID===this.Principal){
            console.log(i)
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
          this.personTable.push({
            Name:name,
            EmployeeID:this.Principal,
            Department:this.OrgName
          })
        }
      },
      getTrainingEmpsItem(ID){
        this.$post(this.api.getTrainingEmpsItem+ID).then(res=>{
          console.log('参培人员返回值：',res)
          if(res.data.State===200){
            this.personTable = res.data.Data
          } else{
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },//根据会议ID获取培训人员集合

      getTree() {
        this.options = []
        this.Principal =''
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
      changeW(ID){
        this.ID = ID
        this.changedetail = true
        this.getfiles(ID)
        this.getTree()
        this.getTrainingEmpsItem(ID)
        this.changeTraning(ID)
      }, //修改窗口
      delPer(row){
        let ID=row.ID
        for(var i =0;i<this.personTable.length;i++){
          if(this.personTable[i].ID===ID){
            this.personTable.splice(i,1)
            console.log('删除后的参会人员:',this.personTable)
          }
        }
      },//删除参会人员
      changeTraning(ID){
        this.$get(this.api.getTrainingModel+ID).then(res=>{
          console.log('修改会议模型返回值:',res)
          if(res.data.State===200){
            this.changeData = res.data.Data
          }
        })
      }, //获取培训管理模型
      editTraining(){
        let ep=[]
        this.personTable.forEach(i=>{
          ep.push(i.EmployeeID)
        })
        let param = {
          "ID": this.ID,
          "Motif": this.changeData.Motif,
          "TrainDate": this.changeData.TrainDate,
          "TrainLong":this.changeData.TrainLong,
          "Trainer": this.changeData.Trainer,
          "Content": this.changeData.Content,
          "AttachFiles": this.upFileList,
          "EmployeeIDs":ep,
        }
        console.log('修改参数:',param)
        this.$post(this.api.editTraining,param).then(res=> {
          console.log('修改返回值:', res)
          if (res.data.State === 200) {
            this.changedetail=false
            this.getTrainingEmpsPage()
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          }else {
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      }, //提交修改
      delTraining(ID){
        this.$confirm('提示','你将永久删除该数据，是否确认？',{
          confirmButtonText:'确认',
          cancelButtonText:'取消',
          type:'warning'
        }).then(q=>{
          this.$get(this.api.delTraining+ID).then(res=>{
            if(res.data.State===200){
              this.getTrainingEmpsPage()
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
          this.$message({
            type:'info',
            message:'已取消'
          })
        })
      }, //删除会议



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
      },
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
        this.getTrainingEmpsPage()
      },  //分页数目改变
      handleCurrentChange(val) {   //当前展示页
        this.page.index = val
        this.getTrainingEmpsPage()
      },  //当前页改变

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
    created(){
      this.getTrainingEmpsPage()
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
