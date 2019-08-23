<template>
  <div class="content">
    <Header title="风险管理" text="设备设施管理"></Header>
    <div class="main">
      <el-row>
        <el-col :span="4">
          <div class="ad">
            <el-button type="text" size="mini" @click="dg1=true">+</el-button>
          </div>
            <el-tree
              :data="SortTree"
              accordion
              :props="defaultProps"
              :load="loadNode"
              @node-click="nodeClick"
              lazy
              :expand-on-click-node="true"
            >
            <span class="custom-tree-node" slot-scope="{node,data}">
              <span>{{data.SortName}}</span>
              <span>
                <el-button size="mini" type="text" @click="addFacilitySortChild(data.ID)">+</el-button>
                <el-button size="mini" type="text" @click="delFacilitySort(data.ID)">-</el-button>
                <el-button size="mini" type="text" @click="dgtwo(data.ID)">新建设备设施</el-button>
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="19">
          <div class="top">
            <div>
              <el-input placeholder="请输入设备名称" v-model="key"></el-input>
              <el-button type="primary" @click="getFacilitiesPage(FacID)">查询</el-button>
              <el-button type="primary">导出Excel</el-button>
            </div>
          </div>
          <el-table :data="tableDetail" border height="calc(100vh - 350px)">
            <el-table-column type="expand">
              <template slot-scope="prop"></template>
            </el-table-column>
            <el-table-column label="设备编号" prop="Code"></el-table-column>
            <el-table-column label="名称" prop="Name"></el-table-column>
            <el-table-column label="设备类别" prop="SortName"></el-table-column>
            <el-table-column label="使用单位" prop="OrgName"></el-table-column>
            <el-table-column label="操作">
              <div slot-scope="scope">
                <el-button type="text" @click="changeFacility(scope.row)">修改</el-button>
                <el-button type="text" @click="delFacility(scope.row.ID)">删除</el-button>
              </div>
            </el-table-column>
          </el-table>
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
        </el-col>
      </el-row>

    </div>


    <el-dialog width="25%" :visible.sync="dg1" :append-to-body="true" title="新建设备类别">
      <div class="info">
        <el-form label-width="75px">
          <el-form-item label="上级:">
            <el-input disabled v-model="Facility.ParentID"></el-input>
          </el-form-item>
          <el-form-item label="名称:">
            <el-input v-model="Facility.SortName"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dg1 = false">取 消</el-button>
                <el-button type="primary" @click="addFacilitySort(GUID)">确 定</el-button>
              </span>
    </el-dialog>
    <el-dialog width="25%" :visible.sync="dg4" :append-to-body="true" title="新建设备类别">
      <div class="info">
        <el-form label-width="75px">
          <el-form-item label="上级:">
            <el-input disabled v-model="ID"></el-input>
          </el-form-item>
          <el-form-item label="名称:">
            <el-input v-model="Facility.SortName"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dg4 = false">取 消</el-button>
                <el-button type="primary" @click="submitChild">确 定</el-button>
              </span>
    </el-dialog>

    <el-dialog width="48%" title="新建设备设施" :visible.sync="dg2" style="overflow: auto">
      <div class="info">
        <el-form label-width="75px" v-model="newFacility">
          <el-form-item label="设备编号">
            <el-input v-model="newFacility.Code" style="width: 205px"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="newFacility.Name" style="width: 205px"></el-input>
          </el-form-item>
          <el-form-item label="组织架构">
            <el-cascader :props="prp" :options="options" style="width:205px" v-model="newFacility.Org" clearable @change="handleChange"></el-cascader>
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
              <el-select v-model="item.arr" v-if="item.DataType === '词典'" :multiple="item.IsMulti" :collapse-tags="true">
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
                <el-button @click="dg2 = false">取 消</el-button>
                <el-button type="primary" @click="addFacility">确 定</el-button>
              </span>
    </el-dialog>

    <el-dialog width="48%" title="修改设备" :visible.sync="dg3" style="overflow: auto">
      <div class="info">
        <el-form label-width="75px" v-model="newFacility">
          <el-form-item label="设备编号">
            <el-input v-model="newFacility.Code" style="width: 205px"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="newFacility.Name" style="width: 205px"></el-input>
          </el-form-item>
          <el-form-item label="组织架构">
            <el-cascader :props="prp" :options="options" style="width:205px" v-model="newFacility.Org" clearable @change="handleChange"></el-cascader>
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
              <el-select v-model="item.ItemValue" v-if="item.DataType === '词典'" :multiple="item.IsMulti" :collapse-tags="true">
                <el-option v-for="(a, b) in item.DictSelection" :key="a.ID" :value="a.ID" :label="a.DictName"></el-option>
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
                <el-button @click="dg3 = false">取 消</el-button>
                <el-button type="primary" @click="submitChange">确 定</el-button>
              </span>
    </el-dialog>

  </div>
</template>
<script>
  const GUID ='00000000-0000-0000-0000-000000000000'
import Header from "../assembly/Header";
export default {
  components: {
    Header
  },
  data() {
    return {
      Facility:{
        ParentID:'',
        Level:'',
        SortName:'',
      },
      newFacility:{
        "Code": "",
        "Name": "",
        "SortID": "",
        "Principal": "",
        "PrincipalTel": "",
        "Location": "",
        "UserDefineds": [],
        "OrgID": "",
        "FileNews": []
      },
      options: [],
      SortTree:[],
      defaultProps: {children: "Children",label:"SortName"},
      FacID:'',
      page:{
        index:1,
        size:3,
        total:0
      },
      ID:'',
      key:'',
      tableDetail:[],
      prp:{
        checkStrictly: true,
        value: 'ID',
        label:'OrgName',
        children:'Children'
      },
      dg2:false,
      dg3:false,
      dg1:false,
      dg4:false,
      header:{
        "Token":sessionStorage.Token,
        "AccountID":sessionStorage.AccountID,
      },
      fileList:[],
      upFileList:[],
      userDefine:[],
      detail:{},
    };
  },
  methods:{
    handleChange(value) {
      let da = ''
      console.log('value',value)
      if(value) {
        if (value.length > 0) {
          da = value[value.length - 1]
        }
      }
    }, //树节点改变
    addFacilitySort(ID){
      this.Facility = []
      let param ={
        "ParentID":ID,
        "Level": this.Facility.Level,
        "SortName": this.Facility.SortName
      }
      this.$post(this.api.addFacilitySort,param).then(res=>{
        console.log('新建设备返回值:',res)
        if(res.data.State === 200){
          this.dg1 = false
          this.getSortTree(GUID)
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
    }, //新建设备类别
    addFacilitySortChild(ID){
      this.Facility = {
        ParentID:'',
        Level:'',
        SortName:'',
      },
      this.ID = ID
      this.dg4 = true
    }, //新建设备子集
    submitChild(){
      let param ={
        "ParentID":this.ID,
        "Level": this.Facility.Level,
        "SortName": this.Facility.SortName
      }
      this.$post(this.api.addFacilitySort,param).then(res=>{
        console.log('新建设备返回值:',res)
        if(res.data.State === 200){
          this.dg1 = false
          this.getSortTree(GUID)
          this.$message({
            type:'success',
            message:'新建成功'
          })
          this.dg4 = false
        }else{
          this.$message({
            type:'erroe',
            message:res.data.Msg
          })
        }
      })
    },//提交新建
    getSortTree(ID){
      this.newFacility = {}
      this.$get(this.api.getSortTree + ID).then(res=>{
        console.log('设备树返回值:',res)
        if(res.data.State === 200) {
          this.SortTree = res.data.Data
        }else {
          this.$message({
            type:'error',
            message:res.data.Msg
          })
        }
      })
    },//获取设备类别树
    delFacilitySort(ID){
      console.log(ID)
      this.$confirm('你将删除该选项是否继续','提示',{
        confirmButtonText:'确认',
        cancelButtonText:'取消'
      }).then(res=>{
        this.$get(this.api.delFacilitySort+ID).then(res=>{
          console.log('删除设备返回值',res)
          if(res.data.State === 200){
            this.getSortTree(GUID)
            this.$message({
              type:'success',
              message:'删除成功'
            })
          }else {
            this.$message({
              type:'error',
              messsge:res.data.Msg
            })
          }
        })
      }).catch(() =>{
        this.$message({
          type:'info',
          message:'取消'
        })
      })
    },//删除设备
    loadNode(node,resolve){
      this.FacID = node.data.ID
      if(node.data.ID) {
        this.parentID = node.data.ID
        this.$get(this.api.getSortTree + node.data.ID).then(res => {
          console.log(res)
          if (res.data.State === 200) {
            console.log('节点加载成功')
            resolve(res.data.Data);
            this.getFacilitiesPage(node.data.ID)
          }
        })
      }
    },
    nodeClick(node){
      console.log('节点ID',node.ID)
      this.FacID = node.ID
      this.getFacilitiesPage(node.ID)
    },
    dgtwo(ID) {
      this.userDefine = [],
        this.fileList = []
      this.upFileList = []
       this.newFacility={
        "Code": "",
         "Name": "",
         "SortID": "",
         "Principal": "",
         "PrincipalTel": "",
         "Location": "",
         "UserDefineds": [],
         "OrgID": "",
         "FileNews": []
      },
      this.ID = ID
      this.dg2 = true
      this.getUserDefines()
      this.getTree()
    }, //新建设备设施
    addFacility(){
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
      let param ={
        "Code": this.newFacility.Code,
        "Name": this.newFacility.Name,
        "SortID": this.ID,
        "Principal": "",
        "PrincipalTel": "",
        "Location": "",
        "UserDefineds": userData,
        "OrgID":  this.newFacility.Org[this.newFacility.Org.length-1],
        "FileNews": this.upFileList
      }
      console.log('新建1设备设施参数,',param)
      this.$post(this.api.addFacility,param).then(res=>{
        console.log('新建设备返回值',res)
        if(res.data.State === 200){
          this.dg2 = false
          this. getFacilitiesPage(this.ID)
          this.$message({
            type:'success',
            message:'新建成功'
          })
        } else {
          this.$messgae({
            type:'error',
            message:res.data.Msg
          })
        }
      })
    },//添加设备设施
    getTree() {
      this.options = []
      this.$get(this.api.Org.getTree + GUID).then(res=>{
        console.log('组织架构返回值,',res)
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
    getUserDefines () {
      this.$get(this.api.UserDefined.getUserDefinedItems + '1').then(res=>{
        console.log('自定义项返回值:',res)
        if(res.data.State === 200){
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
          console.log('自定义项，',this.userDefine)
        } else {
          this.$message({
            type:'error',
            message:res.data.Msg
          })
        }
      })
    },// 获取用户自定义项
    getFacilitiesPage(ID){
    let   Id = ''
      if(ID){
        Id = ID
      } else {
        this.$message({
          type:'info',
          message:'请选择设备类别'
        })
       return false
      }
      let param = {
        "PageSize": this.page.size,
        "PageIndex": this.page.index-1,
        "KeyWord": this.key,
        "Query": Id,
        "OrderString": '',
        "ToExcel": false
      }
      console.log('分页参数',param)
      this.$post(this.api.getFacilitiesPage,param).then(res=>{
        console.log('分页列表返回值:',res)
        if(res.data.State === 200){
          this.key = ''
          this.page.total =res.data.Data.Items
          this.tableDetail = res.data.Data.Data
        } else {
          this.$message({
            type:'error',
            message:res.data.Msg
          })
        }
      })
    },//获取分页
    handleSizeChange(val) {   //修改分页条数
      this.page.size = val
      console.log('分页数改变')
      console.log('分页数:',this.page.size)
      this.getFacilitiesPage(this.FacID)
    },  //分页数目改变
    handleCurrentChange(val) {   //当前展示页
      this.page.index = val
      this.getFacilitiesPage(this.FacID)
    },  //当前页改变
    delFacility(ID){
      console.log(ID)
      this.$confirm('你将永久删除该条数据，是否继续','提示',{
        confirmButtonText:'确认',
        cancelButtonText:'取消',
      }).then(()=>{
        this.$get(this.api.delFacility+ID).then(res=>{
          console.log('删除返回值:',res)
          if(res.data.State === 200){
            this.getFacilitiesPage(this.FacID)
            this.$message({
              type:'success',
              message:'删除成功'
            })
          } else {
            this.$message({
              type:'error',
              messgae:res.data.Msg
            })
          }
        })
      }).catch(()=>{
        this.$message({
          type:'info',
          message:'取消'
        })
      })
    },//删除设备设施
    changeFacility(value){
    this.detail= value
      this.userDefine = []
      this.dg3 = true
      this.getfiles(value.ID)
      this.getUserDefinedList(value.ID)
      this.getFacilityModel(value.ID)
      this.getTree()
    },  //修改设备设施

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
    },  //获取列表文件详情
    getUserDefinedList(ID){
      let param={
        "DefinedType": 1,
        "BusinessID": ID
      }
      this.$post(this.api.UserDefined.getUserDefinedList,param).then(res=>{
        console.log('自定义项详情:',res)
        if(res.data.State === 200){
//          res.data.Data.forEach(item=>{
//            if(item.DataType === '词典') {
//              item.ItemValue = JSON.parse(item.ItemValue)
//            }
//          })
          this.userDefine =res.data.Data
          console.log('userDefine',this.userDefine)
        }
      })
    }, //获取自定义详情
    getFacilityModel(ID){
      this.$get(this.api.getFacilityModel+ID).then(res=>{
        console.log('获取模型返回值,',res)
        if(res.data.State === 200){
          this.newFacility = res.data.Data
          let org = res.data.Data.OrgID
          console.log(org)
          let d=[]
          this.$get(this.api.Org.getParentItems + org).then(res=>{
            if(res.data.State === 200){
              console.log('父级返回值:',res)
              res.data.Data.forEach(item=>{
                d.push(item.ID)
              })
            }
            d.push(org)
            this.$set(this.newFacility,'Org',d)
          })
        }
      })
    },//获取设备类别树
    submitChange(){
      let user = []
      this.userDefine.forEach(i=>{
        user.push({
          DefinedID:i.ID,
          DefinedValue:i.ItemValue
        })
      })
      let param ={
        "ID": this.detail.ID,
        "Code": this.newFacility.Code,
        "Name": this.newFacility.Code,
        "SortID": this.FacID,
        "Principal": "",
        "PrincipalTel": "",
        "Location": "",
        "UserDefineds":user,
        "OrgID": this.newFacility.Org[this.newFacility.Org.length-1],
        "FileNews":this.upFileList,
      }
      console.log('修改设备设施参数:',param)
      this.$post(this.api.editFacility,param).then(res=>{
        console.log('修改设备设施返回值:',res)
        if(res.data.State === 200){
          this.dg3 = false
          this.$message({
            type:'success',
            message:'修改成功'
          })
        }else {
          ths.$message({
            type:'error',
            message:res.data.Msg
          })
        }
      })
    },
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
    },  //获取文件
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
        if(res.data.State === 200){
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
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file,filelist){
      console.log(filelist)
    },


    del1(){
      this.$confirm("将要执行删除操作,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    del2(){
      this.$confirm("将要执行删除操作,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getSortTree(GUID)
  },
  mounted(){
    console.log('post',this.$post)
  }
};
</script>
<style scoped>
.info{
  background: #fff;
  padding: 15px
}
.whi {
  background-color: #fff;
  width: 100%;
}
.content {
  overflow: hidden;
  height: 100%;
}
.el-row {
  overflow: hidden;
}
.main {
  margin-left: 25px;
  overflow: hidden;
  height: calc(100% - 98px);
}
.el-table{
  overflow: auto
}
.el-tree {
  height: 500px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding-right: 8px;
}
.top::after {
  content: "";
  display: block;
  clear: both;
}
.top {
  margin-bottom: 15px;
  background: #fff;
}
.ad {
  width: 100%;
}
.ad::after {
  content: "";
  display: block;
  clear: both;
}
.el-col-4 {
  background: #fff;
  border-top: 2px solid #049eff;
  border-radius: 3px;
  overflow: auto;
  height: calc(100vh - 225px);
}
.top > div {
  width: 50%;
  float: right;
  padding: 10px 0 15px 0;
}
.top > div > .el-input {
  width: 45%;
}
.el-col-19 {
  margin-left: 25px;
  border-top: 2px solid #049eff;
  border-radius: 5px;
}
.el-col-4 > .ad > .el-button {
  margin-right: 10px;
  padding-bottom: 0;
  float: right;
}
.pge {
  height: 31px;
  margin: 0 5px;
  text-align: right;
  background: #fff;
}
</style>
