np<template>
  <div class="wrapper">
    <Header title="隐患排查" text="视频监控"></Header>
    <div class="table">
      <div class="table-top">
        <el-button type="primary" @click="newW">新建</el-button>
        <div style="float: right;margin-right: 30px;height: 40px;">
          <span style="font-size: 14px;margin-right: 5px">关键字:</span>
          <el-input type="primary" style="width: 120px;margin-right: 10px" placeholder="请输入关键字"></el-input>
          <el-button type="primary">查询</el-button>
        </div>
      </div>
      <div class="table-main">
          <el-table :data="Items"  border height="calc(100vh - 355px)">
            <el-table-column prop="Code" label="编号">
            </el-table-column>
            <el-table-column prop="Site" label="摄像头所在地">
            </el-table-column>
            <el-table-column prop="Url" label="摄像头URL">
            </el-table-column>
            <el-table-column label="操作">
              <div slot-scope="scope">
                <el-link type="primary" :underline="false">详情</el-link>
                <el-link type="primary" :underline="false" @click="changeW(scope.row.ID)">修改</el-link>
                <el-link type="primary" :underline="false" @click="delVideo(scope.row.ID)">删除</el-link>
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
    <!--弹出框-->
    <el-dialog title="新建摄像头" :visible.sync="dg1" width="920px" style="width: 100%;overflow: auto;height: 100%">
      <div style="height: 350px;overflow-y: auto;overflow-x:hidden;background-color: white;padding: 15px">
        <div style="height: 220px">
          <el-form :inline="true" labelWidth="120px">
            <el-form-item label="编号:">
              <el-input v-model="nVideo.Code"></el-input>
            </el-form-item>
            <el-form-item label="摄像头所在地:">
              <el-input v-model="nVideo.Site"></el-input>
            </el-form-item>
            <el-form-item label="摄像头URL:" >
              <el-input style="width: 640px" v-model="nVideo.Url"></el-input>
            </el-form-item>
            <el-form-item>
              <div style="width: 744px;height: 42px;margin-left: 120px">
                <el-form :inline="true" labelWidth="80px">
                    <el-form-item label="主体类型">
                    <el-select style="width: 150px;margin-right: 10px" v-model="nVideo.Subjects">
                      <el-option v-for="i,b in typeSelect" :value="i.Value" :label="i.Caption" :key="b"></el-option>
                    </el-select>
                    </el-form-item>
                  <el-form-item label="主体" v-if="nVideo.Subjects===1">
                    <el-cascader :props="prp" ref="cascader" :options="options" style="width:140px" v-model="nVideo.Org" clearable @change="handleChange"></el-cascader>
                  </el-form-item>
                  <el-form-item label="" v-if="nVideo.Subjects===1">
                    <el-select v-model="nVideo.fac" style="width: 140px;margin-left: 15px">
                      <el-option v-for="(item, index) in nVideo.selector" :label="item.Name" :value="item.ID" :key="item.ID" style="width: 160px"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="主体" v-if="nVideo.Subjects===2">
                    <el-select v-model="nVideo.post" style="width: 140px;margin-left: 15px">
                      <el-option v-for="(item, index) in postSelect" :label="item.PostName" :value="item.PostID" :key="item.PostID" style="width: 160px"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="主体" v-if="nVideo.Subjects===3">
                    <el-select v-model="nVideo.textFlow" style="width: 140px;margin-left: 15px">
                      <el-option v-for="(item, index) in textSelect" :label="item.Name" :value="item.ID" :key="item.ID" style="width: 160px"></el-option>
                    </el-select>
                  </el-form-item>
                    <el-form-item label=" ">
                      <div style="width: 640px;text-align: right;margin-top: 10px">
                        <el-button type="primary" @click="addType">添加</el-button>
                      </div>
                    </el-form-item>
                </el-form>
              </div>
            </el-form-item>
          </el-form>
        </div>
          <el-table :data="addItems" class="datalist" border width="100%">
            <el-table-column prop="type" label="类别">
            </el-table-column>
            <el-table-column prop="Name" label="名称"></el-table-column>
            <el-table-column label="操作">
              <div slot-scope="scope">
                <el-link type="primary" :underline="false" @click="deladdItems1(scope.row.ID)">删除</el-link>
              </div>
            </el-table-column>
          </el-table>
      </div>
      <span slot="footer">
        <el-button @click="dg1=false">取消</el-button>
        <el-button @click="addvideo" type="primary">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改摄像头" :visible.sync="dg2" width="920px" style="width: 100%;overflow: auto;height: 100%">
      <div style="height: 350px;overflow-y: auto;overflow-x:hidden;background-color: white;padding: 15px">
        <div style="height: 220px">
          <el-form :inline="true" labelWidth="120px">
            <el-form-item label="编号:">
              <el-input v-model="changeDetail.Code"></el-input>
            </el-form-item>
            <el-form-item label="摄像头所在地:">
              <el-input v-model="changeDetail.Site"></el-input>
            </el-form-item>
            <el-form-item label="摄像头URL:" >
              <el-input style="width: 640px" v-model="changeDetail.Url"></el-input>
            </el-form-item>
            <el-form-item>
              <div style="width: 744px;height: 42px;margin-left: 120px">
                <el-form :inline="true" labelWidth="80px">
                    <el-form-item label="主体类型">
                    <el-select style="width: 150px;margin-right: 10px" v-model="nVideo.Subjects">
                      <el-option v-for="i,b in typeSelect" :value="i.Value" :label="i.Caption" :key="b"></el-option>
                    </el-select>
                    </el-form-item>
                  <el-form-item label="主体" v-if="nVideo.Subjects===1">
                    <el-cascader :props="prp" ref="cascader" :options="options" style="width:140px" v-model="nVideo.Org" clearable @change="handleChange"></el-cascader>
                  </el-form-item>
                  <el-form-item label="" v-if="nVideo.Subjects===1">
                    <el-select v-model="nVideo.fac" style="width: 140px;margin-left: 15px">
                      <el-option v-for="(item, index) in nVideo.selector" :label="item.Name" :value="item.ID" :key="item.ID" style="width: 160px"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="主体" v-if="nVideo.Subjects===2">
                    <el-select v-model="nVideo.post" style="width: 140px;margin-left: 15px">
                      <el-option v-for="(item, index) in postSelect" :label="item.PostName" :value="item.PostID" :key="item.PostID" style="width: 160px"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="主体" v-if="nVideo.Subjects===3">
                    <el-select v-model="nVideo.textFlow" style="width: 140px;margin-left: 15px">
                      <el-option v-for="(item, index) in textSelect" :label="item.Name" :value="item.ID" :key="item.ID" style="width: 160px"></el-option>
                    </el-select>
                  </el-form-item>
                    <el-form-item label=" ">
                      <div style="width: 640px;text-align: right;margin-top: 10px">
                        <el-button type="primary" @click="addType2">添加</el-button>
                      </div>
                    </el-form-item>
                </el-form>
              </div>
            </el-form-item>
          </el-form>
        </div>
          <el-table :data="addItems" class="datalist" border width="100%">
            <el-table-column prop="SubjectType" label="类别">
            </el-table-column>
            <el-table-column prop="SubjectName" label="名称"></el-table-column>
            <el-table-column label="操作">
              <div slot-scope="scope">
                <el-link type="primary" :underline="false" @click="deladdItems(scope.row.SubjectID)">删除</el-link>
              </div>
            </el-table-column>
          </el-table>
      </div>
      <span slot="footer">
        <el-button @click="dg2=false">取消</el-button>
        <el-button type="primary" @click="editVideo">确认</el-button>
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
        Items: [],
        addItems:[],
        page:{
          index:1,
          size:3,
          total:0
        },
        key:'',
        typeSelect:[],
        postSelect:[],
        textSelect:[],
        nVideo:{
          Org:''
        },
        prp:{
          checkStrictly: true,
          value: 'ID',
          label:'SortName',
          children:'Children'
        },
        options: [],
        Principal:'',
        ID:'',
        dg1:false,
        dg2:false,
        changeDetail:{},


        form:{
          code: '',
          location: '',
          url: '',
          type: ''
        },
        newcam: false,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        stopcontent: false,
        index: 1  //当前页面编号
      }
    },
    methods: {
      newW(){
        this. addItems=[]
        this.nVideo={}
        this.options=[]
        this.Principal=''
        this.dg1=true
        this.getTree()
        this.getPostSelector()
        this.getOpreationItems()
      },//新建窗口
      addvideo(){
        let sub=[]
        this.addItems.forEach(i=>{
          sub.push({
            SubjectID:i.ID,
            SubjectType:i.ty
          })
        })
        let param = {
          "Code": this.nVideo.Code,
          "Site": this.nVideo.Site,
          "Url": this.nVideo.Url,
          "Subjects": sub
        }
        console.log('新建参数;',param)
      this.$post(this.api.addvideo,param).then(res=>{
        console.log('新进返回值',res)
        if(res.data.State===200){
          this.getVideosPage()
          this.dg1=false
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
      },//新建摄像头
      getVideosPage(){
        let param={
          "PageSize": this.page.size,
          "PageIndex": this.page.index-1,
          "KeyWord": "",
          "Query": this.key,
          "OrderString":"",
          "ToExcel": false
        }
          this.$post(this.api.getVideosPage,param).then(res=>{
            console.log('分页返回值',res)
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
      },//分页获取
      deladdItems1(ID){
        let flag=''
        let len =  this.addItems.length
        for(let i=0;i<len;i++){
          if(this.addItems.ID===ID){
            flag=i
          }
        }
        this.addItems.splice(flag,1)
      }, //删除添加项
      deladdItems(ID){
        let flag=''
        let len =  this.addItems.length
        for(let i=0;i<len;i++){
          if(this.addItems.SubjectID===ID){
             flag=i
          }
        }
        this.addItems.splice(flag,1)
      },
      changeW(ID){
        this.addItems=[]
        console.log("id",ID)
        this.ID=ID
        this.dg2=true
        this.getTree()
        this.getPostSelector()
        this.getOpreationItems()
        this.getVideoModel(ID)
      },
      getVideoModel(ID){
        this.$get(this.api.getVideoModel+ID).then(res=>{
          console.log('获取模型返回值:',res)
          if(res.data.State==200){
            res.data.Data.Subjects.forEach(i=>{
              if(i.SubjectType==='岗位'){
                i.ty=2
              }else if(i.SubjectType==='设备设施'){
                i.ty=1
            }
              else if(i.SubjectType==='作业'){
                i.ty=3
              }
            })
            this.addItems=res.data.Data.Subjects
            this.changeDetail=res.data.Data
          }
        })
      },//获取模型
      editVideo(ID){
        let sub=[]
        this.addItems.forEach(i=>{
          sub.push({
            SubjectID:i.SubjectID,
            SubjectType:i.ty
          })
        })
        let param = {
          "ID":this.ID,
          "Code": this.changeDetail.Code,
          "Site": this.changeDetail.Site,
          "Url": this.changeDetail.Url,
          "Subjects": sub
        }
        console.log('修改参数',param)
        this.$post(this.api.editVideo,param).then(res=>{
          if(res.data.State===200){
            this.dg2=false
            this.getVideosPage()
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
      delVideo(ID){
        this.$confirm('你将删除该数据是否确认?','提示',{
          confirmButtonText:'确认',
          cancelButtonText:'取消',
          type:"warning"
        }).then((re)=>{
           this.$get(this.api.delVideo+ID).then(res=>{
          if(res.data.State===200){
            this.getVideosPage()
            this.$message({
              type:'success',
              message:'删除成功'
            })
          } else {
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
        }).catch(res=>{
          this.$message({
            type:'info',
            message:'已取消'
          })
        })

      },//删除
      getSubjectType(){
        this.$get(this.api.getSubjectType).then(res=>{
          console.log('获取主提类型返回值:',res)
          if(res.data.State===200){
            this.typeSelect = res.data.Data
          }else{
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },//获取主体类型
      addType(){
          if(this.nVideo.Subjects===1){
            for(var i=0;i<this.addItems.length;i++){
              if(this.nVideo.fac===this.addItems[i].ID){
                this.$message({
                  type:'warning',
                  message:'该数据已添加'
                })
                return false
              }
            }
          let name=''
          this.nVideo.selector.forEach(i=>{
            if(i.ID===this.nVideo.fac){
              name=i.Name
            }
          })
            this.addItems.push({
              ty:1,
              type:this.typeSelect[this.nVideo.Subjects-1].Caption,
              ID:this.nVideo.fac,
              Name:name
            })
          } else if(this.nVideo.Subjects===2){
            for(var i=0;i<this.addItems.length;i++){
              if(this.nVideo.post===this.addItems[i].ID){
                this.$message({
                  type:'warning',
                  message:'该数据已添加'
                })
                return false
              }
            }
            this.postSelect.forEach(i=>{
              if(i.PostID===this.nVideo.post){
                name=i.PostName
              }
            })
            this.addItems.push({
              ty:2,
              type:this.typeSelect[this.nVideo.Subjects-1].Caption,
              ID:this.nVideo.post,
              Name:name
            })
          } else if(this.nVideo.Subjects===3){
            for(var i=0;i<this.addItems.length;i++){
              if(this.nVideo.textFlow===this.addItems[i].ID){
                this.$message({
                  type:'warning',
                  message:'该数据已添加'
                })
                return false
              }
            }
            this.textSelect.forEach(i=>{
              if(i.ID===this.nVideo.textFlow){
                name=i.Name
              }
            })
            this.addItems.push({
              ty:3,
              type:this.typeSelect[this.nVideo.Subjects-1].Caption,
              ID:this.nVideo.textFlow,
              Name:name
            })
          }
          console.log('添加数据:',this.addItems)
      }, //添加
      addType2(){
        console.log('addItems',this.addItems)
        if(this.nVideo.Subjects===1){
          for(var i=0;i<this.addItems.length;i++){
            if(this.nVideo.fac===this.addItems[i].SubjectID){
              this.$message({
                type:'warning',
                message:'该数据已添加'
              })
              return false
            }
          }
          let name=''
          this.nVideo.selector.forEach(i=>{
            if(i.ID===this.nVideo.fac){
              name=i.Name
            }
          })
          this.addItems.push({
            ty:1,
            SubjectType:this.typeSelect[this.nVideo.Subjects-1].Caption,
            SubjectID:this.nVideo.fac,
            SubjectName:name
          })
        } else if(this.nVideo.Subjects===2){
          console.log(this.nVideo.post)
          for(var i=0;i<this.addItems.length;i++){
            if(this.nVideo.post===this.addItems[i].SubjectID){
              this.$message({
                type:'warning',
                message:'该数据已添加'
              })
              return false
            }
          }
          this.postSelect.forEach(i=>{
            if(i.PostID===this.nVideo.post){
              name=i.PostName
            }
          })
          this.addItems.push({
            ty:2,
            SubjectType:this.typeSelect[this.nVideo.Subjects-1].Caption,
            SubjectID:this.nVideo.post,
            SubjectName:name
          })
        } else if(this.nVideo.Subjects===3){
          for(var i=0;i<this.addItems.length;i++){
            if(this.nVideo.textFlow===this.addItems[i].SubjectID){
              this.$message({
                type:'warning',
                message:'该数据已添加'
              })
              return false
            }
          }
          this.textSelect.forEach(i=>{
            if(i.ID===this.nVideo.textFlow){
              name=i.Name
            }
          })
          this.addItems.push({
            ty:3,
            SubjectType:this.typeSelect[this.nVideo.Subjects-1].Caption,
            SubjectID:this.nVideo.textFlow,
            SubjectName:name
          })
        }
        console.log('添加数据:',this.addItems)
      }, //添加
      handleSizeChange(val) {   //修改分页条数
        this.page.size = val
        console.log('分页数改变')
        console.log('分页数:',this.page.size)
      },  //分页数目改变
      handleCurrentChange(val) {   //当前展示页
        this.page.index = val
      },  //当前页改变
      getTree() {
        this.options = []
        this.Principal =''
        this.$get(this.api.getSortTree + GUID).then(res=>{
          console.log('设备设施树:',res)
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
      },//获取设备设施树
      getPostSelector(){
        this.$get(this.api.getPostSelector).then(res=>{
          console.log('岗位返回值:',res)
          if(res.data.State===200){
            this.postSelect = res.data.Data
          }else{
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },//获取岗位集合
      getOpreationItems(){
        this.$get(this.api.TextFlow.getOpreationItems).then(res=>{
          console.log('作业流程返回值|:',res)
          if(res.data.State===200){
            this.textSelect=res.data.Data
          }else{
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },//获取作业流程选择器
      handleChange(value) {
        let da = ''
        console.log('value',value)
        if(value) {
          if (value.length > 0) {
            da = value[value.length - 1]
            console.log('da',da)
            this.$get(this.api.getFacilitiesBySortId + da).then(res => {
              if (res.data.State === 200) {
                console.log('节点改变:', res)
                this.$set(this.nVideo, 'selector', res.data.Data)
//            this.sel  thiectOption = res.data.Data
              }
            })
          } else {
            return false;
          }
        }
      },//树节点改变
    },
    created(){
      this.getSubjectType()
      this.getVideosPage()
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
    width: calc(100% - 50px);
  }
  .wrapper .table .table-top{
    height: 40px;
    background-color: white;
    border-radius: 5px;
    padding: 10px 0 10px 20px;
    margin: 0 0 15px 0;
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
