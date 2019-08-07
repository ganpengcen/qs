<template>
  <div class="wrapper">
    <Header title="档案管理" text="安全会议"></Header>
    <div class="table">
      <div class="table-top">
        <el-button type="primary" @click="dialogFormVisible = true">新建</el-button>
        <div style="float: right;margin-right: 20px">
          <el-form :inline="true">
            <el-form-item label="关键词:">
              <el-input style="width: 120px" v-model="index"></el-input>
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
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
    <div >
      <el-dialog title="新建风险点" :visible.sync="dialogFormVisible" width="680px">
        <div class="content">
          <el-form :inline="true" :model="formInline"   label-width="100px">
            <el-form-item label="名称：" :label-width="formLabelWidth" >
              <el-input v-model="form.name" autocomplete="off"  style="width:180px"></el-input>
            </el-form-item>
            <el-form-item label="危险因素：" :label-width="formLabelWidth"   >
              <el-select v-model="form.riskreason" placeholder="请选择活动区域"  style="width:180px">
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="会议日期：" >
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>

            </el-form-item>
            <el-form-item label="名称：" :label-width="formLabelWidth" >
              <el-input v-model="form.name" autocomplete="off"  style="width:180px"></el-input>
            </el-form-item>
            <el-form-item label="名称：" :label-width="formLabelWidth" >
              <el-input v-model="form.name" autocomplete="off"  style="width:180px"></el-input>
            </el-form-item>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-change="handleChange"
              :file-list="fileList">
              <span  >附件：</span>
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <div class="edit_container">
              <span >内容：</span>
              <quill-editor
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
              </quill-editor> </div>

            <el-form-item label="会议：" >
              <el-input v-model="form.name" autocomplete="off" style="width:210px"></el-input>
            </el-form-item>
            <el-form-item label="会议："  >
              <el-input v-model="form.name" autocomplete="off" style="width:210px"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" >取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../../components/assembly/Header.vue'
  export default {
    components: {
      Header
    },
    components:{
      Header,
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    data () {
      return {
        dialogFormVisible: false,
        form: {
          Consequence: "",
          EmergencyMeasure: "",
          Notes:"",
          ManagementMeasure: "",
          ChargePerson: "",
          risklevel: "",
          OrganzingFrame:" ",
          riskreason:"",
          name:'',
          delivery: false,
          type: [],
          resource: "",
          desc: ""
        },
        editorOption:{
          modules:{
            toolbar:[
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block']
            ]
          }
        },
        dialogFormVisible:false,
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
    height: calc(100% - 150px);
    margin: 15px 25px 11px;
    overflow: hidden;
  }
  .wrapper .table .table-top{
    height: 40px;
    background-color: white;
    border-radius: 5px;
    padding: 10px 0 10px 20px;
    margin: 0 2px 5px 2px;
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
    margin:10px;
    background-color:white;
  }
</style>
