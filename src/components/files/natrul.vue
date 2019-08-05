<template>
  <div class="wrapper">
    <Header title="档案管理" text="资质管理"></Header>
    <div class="table">
      <el-tabs :tab-position="left" style="min-height: 200px;overflow: hidden;">
        <el-tab-pane label="用户管理1">
          <Table :lable2="123" @newcontent="newcontent"></Table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="新建质资" :visible.sync="newlist" width="600px" style="height: 100%;overflow: auto">
    <div style="height: 350px;overflow-x: hidden;overflow-y: auto;background-color: white;padding: 10px">
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
    <el-button @click="newlist = false">取 消</el-button>
    <el-button type="primary" @click="newlist = false">确 定</el-button>
  </span>
  </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import Table from '../../components/files/table2.vue'
  import Header from '../../components/assembly/Header.vue'
  export default {
    components: {
      Table,
      Header
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      deletcontent(){
        this.deletlist = true
      },
      newcontent () {
         this.newlist =true
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
        fileList: '',
        newlist: false,
        deletlist:false,
        changedetail:false,
        left: 'left',
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
    },
    components: {
      Header,
      Table
    }
  }
</script>

<style scoped>
  .wrapper{
    width: 100%;
    height:100%;
    overflow: hidden;
  }
  .wrapper .table {
    padding-left: 20px;
    margin: 15px 25px 11px;
  }
</style>
