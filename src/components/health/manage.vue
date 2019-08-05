<template>
  <div class="wrapper">
    <Header title="职业健康" text="体验管理"></Header>
    <div class="table">
      <div class="table-top">
        <el-button type="primary" @click="newlist=true">新建</el-button>
        <div style="float: right;margin-right: 20px">
          <el-form :inline="true" labelWidth="120px" style="height: 40px">
            <el-form-item label="姓名">
              <el-select v-model="index">
                <el-option label="name" value="123"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="table-main">
          <el-table :data="Items" class="datalist" border height="calc(100vh - 355px)">
            <el-table-column  label="姓名" prop="Code">
            </el-table-column>
            <el-table-column prop="Code" label="性别">
            </el-table-column>
            <el-table-column prop="StartTime" label="年龄">
            </el-table-column>
            <el-table-column prop="EndTime" label="体验时间">
            </el-table-column>
            <el-table-column label="操作">
              <el-link type="primary" :underline="false" style="font-size: 12px">详情</el-link>
              <el-link type="primary" :underline="false" style="font-size: 12px" @click="changedetail=true">修改</el-link>
              <el-link type="primary" :underline="false" style="font-size: 12px" @click="deletedetail">删除</el-link>
            </el-table-column>
          </el-table>
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
    <el-dialog title="新建体验报告" :visible.sync="newlist" width="600px" style="height: 100%;overflow: auto">
      <div style="height: 350px;overflow-x: hidden;overflow-y: auto;background-color: white;padding-top: 20px">
        <el-form labelWidth="100px">
          <el-form-item label="姓名:">
            <el-select style="width: 200px" v-model="index">
              <el-option value="123" label="123"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="体验日期:">
            <el-date-picker style="width: 200px" v-model="index"></el-date-picker>
          </el-form-item>
          <el-form-item label="体验结果:">
            <el-input style="width: 200px" v-model="index"></el-input>
          </el-form-item>
          <el-form-item label="附件">
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
        <el-button @click="newlist = false">取 消</el-button>
        <el-button type="primary" @click="newlist = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改体验报告" :visible.sync="changedetail" width="600px" style="height: 100%;overflow: auto">
      <div style="height: 350px;overflow-x: hidden;overflow-y: auto;background-color: white;padding-top: 20px">
        <el-form labelWidth="100px">
          <el-form-item label="姓名:">
            <el-select style="width: 200px" v-model="index">
              <el-option value="123" label="123"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="体验日期:">
            <el-date-picker style="width: 200px" v-model="index"></el-date-picker>
          </el-form-item>
          <el-form-item label="体验结果:">
            <el-input style="width: 200px" v-model="index"></el-input>
          </el-form-item>
          <el-form-item label="附件">
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
        <el-button @click="newlist = false">取 消</el-button>
        <el-button type="primary" @click="newlist = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../../components/assembly/Header.vue'
  export default {
    components: {
      Header
    },
    methods: {
      deletedetail () {
        this.$confirm('是否确认删除', '提示',{
          comfirmButtonText: '确认',
          cancelButtonText: '取消',
          type:'warning'
        }).then(()=>{
          this.$message({
            type:'success',
            message:'删除'
          })
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'取消'
          })
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
        fileList:[],
        newlist:false,
        changedetail:false,
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
</style>
