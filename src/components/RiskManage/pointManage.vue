<template>
  <div class="wrapper">
    <Header title="风险管理" text="风险点检测"></Header>
    <div class="table">
      <div class="table-top">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-button @click="dialogFormVisible = true" type="primary">新建</el-button>
          <el-form-item class="UPload1">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
              <el-button size="normal" type="primary">上传</el-button>
            </el-upload>
          </el-form-item>
          <div style="float: right;margin-right: 20px">
            <el-form-item>
              <span>风险等级:</span>
              <el-select v-model="formInline.region" placeholder="风险等级" style="width:170px">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="查询:">
              <el-input v-model="formInline.user" placeholder="审批人">查询</el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium">批量打印</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium">导出excel</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="table-main">
        <div class="detail">
          <el-table :data="Items" class="datalist" border height="calc(100vh - 343px)">
            <el-table-column prop="Number" label="编号"></el-table-column>
            <el-table-column prop="Name" label="名称"></el-table-column>
            <el-table-column prop="level" label="风险等级"></el-table-column>
            <el-table-column prop="Remarks" label="备注"></el-table-column>
            <el-table-column prop="Operation" label="操作"></el-table-column>
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
    <div>
      <el-dialog title="新建风险点" :visible.sync="dialogFormVisible" width="680px" >
        <div class="content" style="padding: 15px">
          <el-form :inline="true" :model="formInline">
            <el-form-item label="名称：" style="margin:0px 20px 20px 30px">
              <el-input v-model="newDangerPoint.Name" autocomplete="off" style="width:180px"></el-input>
            </el-form-item>
            <el-form-item label="危险因素：" style="margin:0px 0px 20px 0px">
              <el-select v-model="newDangerPoint.WXYSDictIDs" placeholder="请选择活动区域" style="width:180px">
                <el-option
                  v-for="item in Items"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="组织构架：" style="margin:0px 20px 20px 0px" >
              <el-select v-model="newDangerPoint.OrgID" placeholder="请选择活动区域" style="width:180px">
                <el-option label="2-1-1" value="211"></el-option>
                <el-option label="2-1-2" value="222"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="责任人：" style="margin:0px 20px 20px 16px">
              <el-select v-model="newDangerPoint.Principal" placeholder="请选择活动区域" style="width:180px">
                <el-option label="2-2-1" value="221"></el-option>
                <el-option label="2-2-2" value="222"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="风险等级：" style="margin:0px 20px 20px 0px">
              <el-select v-model="newDangerPoint.DangerLevel" placeholder="请选择活动区域" style="width:180px">
                <el-option label="3-1-1" value="311"></el-option>
                <el-option label="3-1-2" value="312"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <span style="margin:0px 20px 20px 0px">使用单位：</span>
              <el-button type="text">设置</el-button>
            </el-form-item>
            <el-form-item label="管控措施：" style="margin:0px 30px 20px 0px">
              <el-input
                type="textarea"
                v-model="newDangerPoint.ControlMeasure"
                autocomplete="off"
                style="width:300px"
              ></el-input>
            </el-form-item>
            <el-form-item label="应急措施：" style="margin:0px 30px 20px 0px">
              <el-input
                type="textarea"
                v-model="newDangerPoint.EmergencyMeasure"
                autocomplete="off"
                style="width:300px"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注：" style="margin:0px 30px 20px 30px">
              <el-input type="textarea" v-model="newDangerPoint.Memo" autocomplete="off" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="后果：" style="margin:0px 30px 20px 30px">
              <el-input
                type="textarea"
                v-model="newDangerPoint.Consequence"
                autocomplete="off"
                style="width:300px"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="upp">
            <el-upload
              action="http://quickcq.com:8008/api/attachFile/uploadFile"
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog>
              <img width="100%" alt="第一个上传加号" />
            </el-dialog>
          </div>
          <div class="upp">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"   >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog>
              <img width="100%" alt="第二个上传加号" />
            </el-dialog>
          </div>
          <div class="uppp">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </div>
        <div slot="footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import api from "../../axios/api";
  import Header from "../../components/assembly/Header.vue";
  export default {
    components: {
      Header
    },
    data() {
      return {
        page:{
          index:1,
          size:3,
          total:0
        },

        fileList:[],
        upFileList:[],
        newDangerPoint: {
          "Name": '',
          "Memo": '',
          "DangerLevel": '',
          "WXYSDictIDs": [],
          "ControlMeasure": '',
          "EmergencyMeasure": '',
          "Principal": '',
          "FileNews": [],
          "OrgID": '',
          "WarningSign": '',
          "DangerPointImg": '',
          "Consequence": '',
          "Location": ''
        },
          form: {
            DangerSortID: "",
            Consequence: "",
            EmergencyMeasure: "",
            Notes: "",
            ManagementMeasure: "",
            ChargePerson: "",
            risklevel: "",
            OrganzingFrame: " ",
            riskreason: ""
          },
          editorOption: {
            modules: {
              toolbar: [
                ["bold", "italic", "underline", "strike"], // toggled buttons
                ["blockquote", "code-block"]
              ]
            }
          },
          formInline: {
            user: "",
            region: ""
          },
          currentPage4: 4,
          dialogFormVisible: false,
          Items: [
            {
              Number: 123,
              Name: 123,
              Operation: 123,
              Remarks: 123,
              Level: 123
            },
            {
              Number: 123,
              Name: 123,
              Operation: 123,
              Remarks: 123,
              Level: 123
            },
            {
              Number: 123,
              Name: 123,
              Operation: 123,
              Remarks: 123,
              Level: 123
            },
            {
              Number: 123,
              Name: 123,
              Operation: 123,
              Remarks: 123,
              Level: 123
            },
            {
              Number: 123,
              Name: 123,
              Operation: 123,
              Remarks: 123,
              Level: 123
            },
            {
              Number: 123,
              Name: 123,
              Operation: 123,
              Remarks: 123,
              Level: 123
            },
            {
              Number: 123,
              Name: 123,
              Operation: 123,
              Remarks: 123,
              Level: 123
            },
            {
              Number: 123,
              Name: 123,
              Operation: 123,
              Remarks: 123,
              Level: 123
            }
          ],
          stopcontent: false,
          index: 1 //当前页面编号

      }

    },
    methods: {
      addDangerPoint(){
        let parram = {
          "Name": this.newDangerPoint.Name,
          "Memo": this.newDangerPoint.Memo,
          "DangerLevel": this.newDangerPoint.DangerLevel,
          "WXYSDictIDs": this.newDangerPoint.WXYSDictIDs,
          "ControlMeasure": this.newDangerPoint.ControlMeasure,
          "EmergencyMeasure": this.newDangerPoint.EmergencyMeasure,
          "Principal": this.newDangerPoint.Principal,
          "FileNews": this.newDangerPoint.FileNews,
          "OrgID": this.newDangerPoint.OrgID,
          "WarningSign":this.newDangerPoint.WarningSign,
          "DangerPointImg": this.newDangerPoint.DangerPointImg,
          "Consequence": this.newDangerPoint.Consequence,
          "Location": this.newDangerPoint.Location,
        }
      },//新建风险点


      handleSizeChange(val) {   //修改分页条数
        this.page.size = val
        console.log('分页数改变')
        console.log('分页数:',this.page.size)
        this.getDangerRelationsPage(this.parentID)
      },  //分页数目改变
      handleCurrentChange(val) {   //当前展示页
        this.page.index = val
        this.getDangerRelationsPage(this.parentID)
      },  //当前页改变
    },
    mounted(){
    }
  };
</script>

<style scoped>
  .wrapper {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .wrapper .table {
    height: calc(100% - 150px);
    margin:10px 0 15px 25px;
    overflow: hidden;
    width: calc(100% - 50px)
  }
  .wrapper .table .table-top {
    height: 40px;
    background-color: white;
    border-radius: 5px;
    padding: 10px 0 10px 20px;
    margin: 0 2px 5px 2px;
    min-width: 1100px;
  }
  .wrapper .table-foot {
    margin: 15px 25px 11px;
    height: 35px;
    line-height: 35px;
    background-color: white;
  }
  .wrapper .table-foot .el-pagination {
    text-align: right !important;
  }
  .content {
    overflow-y: scroll;
    height: 350px;
    margin: 10px;
    background-color: white;
  }
  .upp {
    float: left;
    padding: 0 10px 0 80px;
  }
  .uppp {
    margin: 170px 0 0 0px;
  }
</style>
