<template>
  <div class="content">
    <Header title="系统管理" text="组织架构"></Header>
    <div class="main">
      <el-row>
        <el-col :span="5">
          <div class="title">
            <span>组织架构</span>
            <el-button type="text" @click="dialog1 = true">+</el-button>
          </div>
          <div>
            <el-tree
              :data="treedata"
              accordion
              :props="dprops"
              :load="loadNode"
              @node-click="nodeClick"
              lazy
              :expand-on-click-node="true"
            >
              <span class="custom-tree-node" slot-scope="{node,data}">
                <span>{{data.OrgName}}</span>
                <span>
                  <el-button size="mini" type="text" @click="addDialog(data.ID)">+</el-button>
                  <el-button size="mini" type="text" @click="del(data.ID)">-</el-button>
                  <el-button size="mini" type="text" @click="addPersonDig(data.ID)">新建人员</el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </el-col>
        <el-col :span="18">

          <div class="tp">
            <div class="top">
              <span>关键字</span>
              <el-input placeholder="请输入关键字" size="small" v-model="key"></el-input>
              <el-button type="primary" size="small" @click="searchTab">搜索</el-button>
            </div>
          </div>

          <div class="tb">
            <el-table
              :data="tdab"
              border
              :cell-style="{'text-align':'center'}"
              :header-cell-style="{'text-align':'center'}">
              <el-table-column prop="CNName" label="姓名"></el-table-column>
              <el-table-column prop="Gender" label="性别"></el-table-column>
              <el-table-column prop="Login" label="账号"></el-table-column>
              <el-table-column label="Leader">
                <div slot-scope="scope">
                  <el-checkbox disabled  v-model="scope.row.IsLeader"></el-checkbox>
                </div>
              </el-table-column>

              <el-table-column label="接受平级">
                <div  slot-scope="scope">
                  <el-checkbox disabled v-model="scope.row.IsLevel"></el-checkbox>
                </div>
              </el-table-column>
              <el-table-column label="操作">
                <div slot-scope="scope">
                  <el-button type="text" @click="changeDig(scope.row.ID)">修改</el-button>
                  <el-button type="text" @click="delPerson(scope.row.ID)">删除</el-button>
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
        </el-col>
      </el-row>
    </div>

    <el-dialog width="35%" :visible.sync="dialog1" title="新建组织架构">
      <div class="info">
        <el-form label-width="100px" v-model="newOrgnize">
          <el-form-item label="上级:">
            <el-input disabled v-model="newOrgnize.ParentID"></el-input>
          </el-form-item>
          <el-form-item label="名称:">
            <el-input v-model="newOrgnize.OrgName"></el-input>
          </el-form-item>
          <el-form-item label="负责人:">
            <el-input v-model="newOrgnize.Principal"></el-input>
          </el-form-item>
          <el-form-item label="电话:">
            <el-input v-model="newOrgnize.PrincipalTel"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialog1 = false">取 消</el-button>
                <el-button type="primary" @click="submitOrgnize()">确 定</el-button>
              </span>
    </el-dialog>

    <el-dialog width="35%" :visible.sync="dialog2" title="新建子组织架构">
      <div class="info">
        <el-form label-width="100px" v-model="newOrgnize">
          <el-form-item label="上级:">
            <el-input disabled v-model="newOrgnize.ParentID"></el-input>
          </el-form-item>
          <el-form-item label="名称:">
            <el-input v-model="newOrgnize.OrgName"></el-input>
          </el-form-item>
          <el-form-item label="负责人:">
            <el-input v-model="newOrgnize.Principal"></el-input>
          </el-form-item>
          <el-form-item label="电话:">
            <el-input v-model="newOrgnize.PrincipalTel"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialog2 = false">取 消</el-button>
                <el-button type="primary" @click="addOrgChild()">确 定</el-button>
              </span>
    </el-dialog>

    <el-dialog title="新建人员" width="1000px" :visible.sync="dig3">
      <div class="info">
        <el-form label-width="80px" :inline="true" v-model="rowinf">
          <el-form-item label="姓名:">
            <el-input v-model="rowinf.CNName"></el-input>
          </el-form-item>
          <el-form-item label="工号:">
            <el-input v-model="rowinf.Jobno"></el-input>
          </el-form-item>
          <el-form-item label="性别:">
            <el-select v-model="rowinf.Gender">
              <el-option label="男" value="man"></el-option>
              <el-option label="女" value="feman"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话:">
            <el-input v-model="rowinf.Tel"></el-input>
          </el-form-item>
          <el-form-item label="Leader:">
            <el-checkbox v-model="rowinf.IsLeader"></el-checkbox>
          </el-form-item>
          <el-form-item label="接受平级:">
            <el-checkbox v-model="rowinf.IsLevel" @change = change></el-checkbox>
          </el-form-item>
          <el-form-item label="新建用户">
           <el-checkbox v-model="rowinf.IsCreate" @change="getRoleId"></el-checkbox>
            <el-select v-if="rowinf.IsCreate" v-model="rowinf.RoleIDs" multiple collapse-tags>
              <el-option v-for="c,d in Role" :key="d" :label="c.RoleName" :value="c.RoleID"></el-option>
            </el-select>
          </el-form-item>
          <el-divider></el-divider>
        </el-form>
        <el-form labelWidth="80px" inline>
          <el-form-item v-for="(item,index) in UserDefine" :label="item.Caption" :key="index">
            <el-input  v-if="item.DataType==='字符'" v-model="item.defineData" style="width: 220px"></el-input>
            <el-select v-if="item.DataType=='词典'" v-model="item.arr" multiple collapse-tags>
              <el-option v-for="a,b in item.dic" :label="a.DictName" :value="a.ID" :key="b"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
                <el-button @click="dig3= false">取 消</el-button>
                <el-button type="primary" @click="addPersonSub">确 定</el-button>
              </span>
    </el-dialog>

    <el-dialog title="修改人员" width="1000px" :visible.sync="dg1">
      <div class="info">
        <el-form label-width="80px" :inline="true" v-model="rowinfo">
          <el-form-item label="姓名:">
            <el-input v-model="rowinfo.CNName"></el-input>
          </el-form-item>
          <el-form-item label="工号:">
            <el-input v-model="rowinfo.Login" disabled></el-input>
          </el-form-item>
          <!--<el-form-item label="组织架构:">-->
            <!--<el-cascader v-model="rowinfo.stru" :options="treedata"></el-cascader>-->
          <!--</el-form-item>-->
          <el-form-item label="性别:">
            <el-select v-model="rowinfo.Gender">
              <el-option label="woman" value="woman"></el-option>
              <el-option label="man" value="man"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话:">
            <el-input v-model="rowinfo.Tel"></el-input>
          </el-form-item>
          <el-checkbox v-model="rowinfo.IsLeader">Leader</el-checkbox>
          <el-checkbox v-model="rowinfo.IsLevel">接受平级</el-checkbox>
          <el-divider></el-divider>
          <el-form labelWidth="80px" inline>
            <el-form-item v-for="(item,index) in UserDefine" :label="item.Caption" :key="index">
              <el-input  v-if="item.DataType==='字符'" v-model="item.ItemValue" style="width: 220px"></el-input>
              <el-select v-if="item.DataType=='词典'" v-model="item.ItemValue" multiple collapse-tags>
                <el-option v-for="(a,b) in item.DictSelection" :label="a.DictName" :value="a.ID" :key="b"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
                    <el-button @click="dg1= false">取 消</el-button>
                    <el-button type="primary" @click="updataChange">确 定</el-button>
                  </span>
    </el-dialog>
  </div>
</template>
<script>
import Header from "../assembly/Header";
export default {

  components: {
    Header
  },

  data() {
    return {
      key: '',
      Role:[],  //角色选项数据
      UserDefine:[],
      page:{
        index:1,
        size:3,
        total:0
      },
      dprops: {
        label: 'OrgName',
      },
      dg1: false,
      parentID:'',
      orgData: [],
      newOrgnize:{
        ParentID: '',
        OrgName:'',
        Principal:'',
        PrincipalTel:''
      },
      digl: false,
      picker: [
        { label: "选项1", value: "TesA" },
        { label: "选项2", value: "TesB" },
        { label: "选项3", value: "TesC" }
      ],
      rowinfo: {
        CNName: '',
        Gender: '',
        IsLeader: '',
        IsLevel: '',
        Jobno: '',
        HeadIMG: '',
        Tel: '',
        IsCreate: '',
        RoleIDs: []
      },
      rowinf: {},
      dig3: false,
      dialog1: false,
      dialog2: false,
      treedata: [],
      tdab: [],
      children: [],
      las: "无上级"
    };
  },
  methods: {
    change () {
      console.log('change:',this.rowinf)
    },
    delPerson (ID) {
      console.log(ID)
      this.$confirm('将永久删除该消息是否确认','提示',{
        confirmButtonText:'确认',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        this.$get(this.api.Org.deleteEmployee+ID).then((res)=>{
          if(res.data.State===200){
            this.getOrg('00000000-0000-0000-0000-000000000000')
            this.tdab = []
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
    changeDig(ID){
      this.ID =ID
      this.getUserdefinedDetail()
      this.$get(this.api.Org.getEmployeeModel+ID).then(res=>{
        if(res.data.State === 200) {
          console.log('roeinfo',res.data.Data)
          this.rowinfo = res.data.Data
        }else this.$message({
          type:'error',
          message:res.data.Msg
        })
      })
    },
    getUserdefinedDetail () {
      console.log('进入获取自定义项页面')
      let param = {
        "DefinedType": 3,
        "BusinessID": this.ID
      }
      console.log('自定义项参数',param)
      this.$post(this.api.getUserDefinedList, param).then(res=>{
        console.log('自定义详情返回值',res)
        if(res.data.State === 200){
          res.data.Data.forEach(item=>{
          if(item.DictSelection.length>0) {
            item.ItemValue = JSON.parse(item.ItemValue)
          }
          })
        }
        this.UserDefine = res.data.Data
        this.dg1 = true
      })
    },
    updataChange () {
      let de = []
      this.UserDefine.forEach(item=>{
          de.push({
            DefinedID: item.ID,
            DefinedValue: item.ItemValue
          })
      })
      let param ={
        "ID": this.ID,
        "CNName": this.rowinfo.CNName,
        "Gender": this.rowinfo.Gender,
        "IsLeader": this.rowinfo.IsLeader,
        "IsLevel": this.rowinfo.IsLevel,
        "Jobno": this.rowinfo.Login,
        "HeadIMG": "",
        "OrgId": this.rowinf.OrgID,
        "UserDefineds": de,
        "Tel": this.rowinf.Tel,
      }
      console.log('修改参数:',param)
      this.$post(this.api.Org.editEmployee, param).then(res=>{
        console.log('修改返回值',res)
        this.getOrg('00000000-0000-0000-0000-000000000000')
      })
    },
    searchTab (){
      this.getTableData(this.ID)
      this.key = ''
    },
    nodeClick(data,data1,data2){
      this.ID = data.ID
      this.getTableData(data.ID)
},//树节点被点击
    getRoleId(value) {
      if(value) {
        this.$get(this.api.getRoleSelector).then(res=>{
          console.log(res)
          if(res.data.State === 200){
            this.Role = res.data.Data
          }
        })
      }
    },  //获取角色信息列表
    del(ID) {
      console.log(ID)
      this.$confirm('此节点将永久删除，是否继续','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        this.$get(this.api.Org.deleteOrg+ID).then(res=>{
          if((res.data.State === 200)){
            this.getOrg('00000000-0000-0000-0000-000000000000x')
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
      }).catch(()=>{
        this.$message({
          type: 'info',
          message:'已取消'
        })
      })
    }, //删除节点
    handleSizeChange(val) {   //修改分页条数
      this.page.size = val
      console.log('分页数改变')
      console.log('分页数:',this.page.size)
      this.getTableData(this.ID)
    },  //分页数目改变
    handleCurrentChange(val) {   //当前展示页
      this.page.index = val
      this.getTableData(this.ID)
    },  //当前页改变
    loadNode(node, resolve) {
      console.log('进入加载')
      if(node.data.ID) {
        console.log('节点详情', node)
        this.parentID = node.data.ID
        this.$get(this.api.Org.getOrgChildren + node.data.ID).then(res => {
          if (res.data.State === 200) {
            resolve(res.data.Data);
            this.getTableData(node.data.ID)
          }
        })
      }
    },   //加载节点
    getTableData(ID) {
      console.log('进入加载')
      let param = {
        "PageSize": this.page.size,
        "PageIndex": this.page.index - 1,
        "KeyWord": "",
        "Query": {
          "OrgID": ID,
          "Name": this.key
        },
        "OrderString": "",
        "ToExcel": true
      }
      console.log('分页大小',this.page.size)
      this.$post(this.api.Org.getEmployeePage,param).then((res)=>{
        console.log('获取表格数据')
        if(res.data.State === 200){
          console.log(res)
          this.page.total = res.data.Data.Items
          this.tdab = res.data.Data.Data
          console.log('tab',this.tdab)
        } else {
          this.$message.error(res.data.Msg)
        }
      })
    },  //获取分页人员信
    addPersonDig (id){
      this.rowinf = {
        IsCreate:false,
        IsLevel:false,
        IsLeader:false
      }
      this.UserDefine = []
      this.ID = id
      console.log("dada",this.rowinf);
     this.getUserDefuine()

    },   //新建人员弹框
    getUserDefuine () {
      this.$get(this.api.UserDefined.getUserDefinedItems + '3').then(res=>{
        if(res.data.State === 200) {
          console.log('用户自定义详情',res.data)
          this.UserDefine = res.data.Data
          this.UserDefine.forEach(item=>{
            if(item.DataType == '词典'){
              console.log('词典')
              let param = {
                "PageSize": 5,
                "PageIndex": 0,
                "KeyWord": "",
                "Query":item.DictID ,
                "OrderString": item.DictID,
                "ToExcel": true
              }
              this.$post(this.api.Dict.getDictsPage,param).then(res=>{
                console.log('词典返回数据',res)
                if(res.data.State === 200) {
                   this.$set(item,'arr', [])
                    this.$set(item, 'dic',res.data.Data.Data)
                   console.log('词典详情',res.data.Data.Data)
                   console.log('自定义详情',this.UserDefine)
                } else {
                  this.$message({
                    type:'error',
                    message:res.data.Msg
                  })
                }
              })
            }
          })
          this.dig3 = true
        }
      })
    }, //获取用户自定义项
    addPersonSub() {
      let defie =[]
      this.UserDefine.forEach((data)=> {
        if (data.DataType == '词典') {
          console.log('词典')
          defie.push({
            "DefinedValue": data.arr,
            "DefinedID": data.ID
          })
        }else {
          defie.push({
            "DefinedValue":  data.defineData,
            "DefinedID": data.ID
          })
        }
      })
      let param = {
        "CNName": this.rowinf.CNName,
        "Gender":  this.rowinf.Gender,
        "IsLeader": this.rowinf.IsLeader,
        "IsLevel": this.rowinf.IsLevel,
        "Jobno":  this.rowinf.Jobno,
        "HeadIMG": '',
        "OrgId": this.ID,
        "UserDefineds": defie,
        "Tel": this.rowinf.Tel,
        "IsCreate": this.rowinf.IsCreate,
        "RoleIDs": ['8fe368b7-152d-4e61-b630-1c1bf3adb122']
      }
      console.log('新建人员参数',param)
      this.$post(this.api.Org.addEmployee, param).then(res => {
        console.log(res)
        this.getTableData(this.ID)
        if(res.data.State === 200){
          this.$message({
            type:'suceess',
            message:'新建成功'
          })
          this.rowinf={},
          this.dig3 = false,
          this.newOrgnize.OrgName = '',
          this.newOrgnize.Principal = '',
          this.newOrgnize.PrincipalTel = ''
        }else {
          this.$message.warning(res.data.Msg)
        }
      })
    },  //新建人员
    addDialog (id) {
      this.parentID = id,
      this.dialog2 = true
    },   //弹框
    submitOrgnize () {
      let param = {
        "ParentID": "00000000-0000-0000-0000-000000000000",
        "OrgName": this.newOrgnize.OrgName,
        "Principal": this.newOrgnize.Principal,
        "PrincipalTel":this.newOrgnize.PrincipalTel,
      }
      this.$post(this.api.Org.addOrg, param).then(res => {
        console.log(res)
        if(res.data.State === 200){
          this.dialog1 = false
          this.newOrgnize.OrgName = '',
          this.newOrgnize.Principal = '',
          this.newOrgnize.PrincipalTel = ''
          this.getOrg('00000000-0000-0000-0000-000000000000 ')
        }
      })
    }, //新建组织架构
    getOrg (ID){
      this.$get(this.api.Org.getOrgChildren + ID).then(res=>{
        if(res.data.State === 200){
          console.log(res)
          console.log('成功获取组织架构节点')
          this.treedata = res.data.Data
          console.log(this.treedata)
        } else {
          this.$message.error(res.data.Msg)
        }
      })
    },//获取组织架构子集
    addOrgChild(id) {
      let param = {
        "ParentID": this.parentID,
        "OrgName": this.newOrgnize.OrgName,
        "Principal": this.newOrgnize.Principal,
        "PrincipalTel":this.newOrgnize.PrincipalTel,
      }
      this.$post(this.api.Org.addOrg, param).then(res => {
        console.log(res)
        if(res.data.State === 200){
          console.log('子节点添加成功')
          this.dialog2 = false
          this.newOrgnize.OrgName = '',
          this.newOrgnize.Principal = '',
          this.newOrgnize.PrincipalTel = ''
          this.getOrg('00000000-0000-0000-0000-000000000000')
        }
      })
    },  //添加子节点
  },
  mounted () {
    this.getOrg('00000000-0000-0000-0000-000000000000')
  }
};
</script>
<style scoped>
.content {
  overflow: hidden;
  height: 100%;
}
.main {
  margin:0 0 15px 25px;
  overflow: auto;
  height: calc(100% - 85px);
}
.info{
  background: #fff;
  padding: 15px 0;
}
.el-col-5 {
  height: calc(100vh - 230px);
  font-size: 17px;
  overflow: auto;
}
.el-table .el-form,
.dlg .el-form {
  text-align: left;
}

.el-table .el-form .el-form-item,
.dlg .el-form .el-form-item {
  margin-left: 0;
}
.el-form--inline .el-form-item {
  vertical-align: baseline;
}
.title {
  padding-left: 20px;
}
.el-tree {
  margin-left: 5px;
}
.el-col-5,
.tp {
  background: #fff;
}
.tp {
  padding: 15px;
  text-align: right;
}
.el-col-18 {
  margin-left: 25px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding-right: 8px;
}
.el-form .el-input {
  width: 87%;
}
.title .el-form {
  text-align: center;
}
.title .el-form-item {
  margin: 10px 29px;
}
.top .el-input {
  width: 15%;
}
.top {
  text-align: right;
  width: 100%;
}
.tb {
  height: calc(100% - 155px);
  margin: 15px 0;
  overflow: hidden;
}
.el-table {
  overflow: auto;
}
.pge {
  text-align: right;
  height: 30px;
  margin-top:11px;
  background: #fff;
}
.el-dialog{
  min-width: 1000px;
}
.el-dialog__wrapper {
  overflow: hidden;
  height: 100%;
}
</style>
