<template>
  <div class="wrapper">
    <div class="table">
      <div class="table-top">
        <el-button type="primary" @click="newcontent">新建</el-button>
        <div style="height: 40px;float: right;margin-right: 20px">
          <el-form :inline="true">
            <el-form-item label="关键字:">
              <el-input placeholder="请输入关键字" v-model="form.key" style="width: 120px"></el-input>
            </el-form-item>
            <el-form-item><el-button type="primary">查询</el-button></el-form-item>
          </el-form>
        </div>
      </div>
      <div class="table-main">
          <el-table :data="Items" class="datalist" border  height="calc(100vh - 380px">
            <el-table-column  label="名称" prop="Code">
            </el-table-column>
            <el-table-column prop="Code" label="字号">
            </el-table-column>
            <el-table-column prop="StartTime" label="发布时间">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="操作">
              <el-link :underline="false" type="primary">详情</el-link>
              <el-link :underline="false" type="primary" @click="changedetail=true">修改</el-link>
              <el-link :underline="false" type="primary" @click="deletcontent">删除</el-link>
            </el-table-column>
          </el-table>
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
      <el-dialog title="修改质资" :visible.sync="changedetail" width="600px" style="height: 100%;overflow: auto">
        <div style="height: 350px;overflow-x: hidden;overflow-y: auto;background-color: white">
          <el-form labelWidth="120px">
            <el-form-item label="质资">
              <el-input style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="持有人:">
              <el-input style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="有效期">
              <el-date-picker style="width: 200px:"></el-date-picker>
            </el-form-item>
            <el-form-item label="审核日期">
              <el-date-picker style="width: 200px:"></el-date-picker>
            </el-form-item>
            <el-form-item label="颁发机构">
              <el-input style="width: 200px:"></el-input>
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
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      lable2: ''
    },
    data () {
      return {
        form:{
          key:''
        },
        changedetail:false,
        newlist:false,
        key:'',
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
            'Code': 8,
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
        ]
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      deletcontent () {
        this.$confirm('确定删除这条记录吗?', '提示',{
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type:'warning'
        }).then(()=>{
          this.$message({
            type:'success',
            message:'删除成功'
          })
        }).catch(()=>{
          this.$message({
            type:'info',
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
      },
      newcontent() {
        this.$emit('newcontent',true)
      }
    }
  }
</script>

<style scoped>
  .wrapper{
    width: 100%;
    height:100%;
    overflow: hidden;
  }
  .wrapper .table{
    height: calc(100vh - 270px);
    padding-left: 20px;
    padding-top: 20px;
    margin-top: 10px;
  }
  .wrapper .table  .table-top{
    height: 40px;
    line-height: 40px;
    padding: 10px 0px 10px 15px;
    background-color: white;
    border-radius: 5px;
  }
  .wrapper .table .table-main{
    margin-top: 5px;
  }
  .wrapper  .table-foot{
    margin-top: 10px;
    background-color: white;
  }
  .wrapper  .table-foot .el-pagination{
    text-align: right !important;
  }
</style>
