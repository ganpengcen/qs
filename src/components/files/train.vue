<template>
  <div class="wrapper">
    <Header title="档案管理" text="培训管理"></Header>
    <div class="table">
      <div class="table-top">
        <div class="search">
        <el-button type="primary" @click="newcontent=true">新建</el-button>
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
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
    <el-dialog title="新建培训管理" :visible.sync="newcontent" width="600px;" style="height:100%;width: 100%;overflow: auto">
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
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newcontent = false">取 消</el-button>
        <el-button type="primary" @click="newcontent = false">确 定</el-button>
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
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
  export default {
    components: {
      Header,
      editor
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
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
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    },
    data () {
      return {
        fileList: [],
        form:{
          key:''
        },
        newcontent:false,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        changedetail:false,
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
</style>
