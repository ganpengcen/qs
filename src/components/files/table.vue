<template>
<div class="wrapper">
  <div class="table">
      <div class="table-top">
        <span>{{lable}}</span>
        <div style="height: 40px;float: right;margin-right: 20px">
          <el-form :inline="true">
            <el-form-item label="关键字:">
              <el-input placeholder="请输入关键字" v-model="form.key" style="width: 120px"></el-input>
            </el-form-item>
            <el-form-item><el-button type="primary">查询</el-button></el-form-item>
            <el-form-item><el-button type="primary" @click="newlist=true">新建</el-button></el-form-item>
          </el-form>
        </div>
      </div>
      <div class="table-main">
          <el-table :data="Items" class="datalist" border  height="calc(100vh - 380px)">
            <el-table-column  label="名称" prop="Code">
            </el-table-column>
            <el-table-column prop="Code" label="字号">
            </el-table-column>
            <el-table-column prop="StartTime" label="发布时间">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="操作">
              <el-link :underline="false" type="primary" style="font-size: 12px" @click="listdetail=true">详情</el-link>
              <el-link :underline="false" type="primary" style="font-size: 12px" @click="changedetail=true">修改</el-link>
              <el-link :underline="false" type="primary" @click="deletcontent" style="font-size: 12px">删除</el-link>
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
  </div>
  <el-dialog title="新建" :visible.sync="newlist"width="607px" style="width: 100%;height: 100%;overflow: auto">
    <div style="height: 350px;background-color: white;overflow-y: auto;overflow-x: hidden;padding-top: 20px">
      <el-form labelWidth="80px">
        <el-form-item label="名称:">
          <el-input style="width: 220px"></el-input>
        </el-form-item>
        <el-form-item label="字号:">
          <el-input style="width: 220px"></el-input>
        </el-form-item>
        <el-form-item label="发布日期:">
          <el-date-picker></el-date-picker>
        </el-form-item>
        <el-form-item label="内容:">
          <div style="vertical-align: top;line-height: 40px;width: 400px;">
            <editor></editor>
          </div>
        </el-form-item>
        <p style="width: 100%;height: 1px;background-color: gainsboro;margin-bottom: 10px"></p>
        <el-form-item label="S:">
          <el-input style="width: 220px"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button @click="newlist=false">取消</el-button>
      <el-button type="primary" @click="newlist=false">确认</el-button>
    </span>
  </el-dialog>
  <el-dialog title="详情" :visible.sync="listdetail"width="607px" style="width: 100%;height: 100%;overflow: auto">
    <div style="height: 350px;background-color: white;overflow-y: auto;overflow-x: hidden;padding-top: 20px">
      <el-form labelWidth="80px">
        <el-form-item label="名称:">
          <el-input disabled style="width: 220px;" value="Items"></el-input>
        </el-form-item>
        <el-form-item label="字号:">
          <el-input style="width: 220px" disabled></el-input>
        </el-form-item>
        <el-form-item label="发布日期:">
          <el-date-picker disabled></el-date-picker>
        </el-form-item>
        <el-form-item label="内容:">
          <div style="vertical-align: top;line-height: 40px;width: 400px;" disabled>
            <editor></editor>
          </div>
        </el-form-item>
        <p style="width: 100%;height: 1px;background-color: gainsboro;margin-bottom: 10px"></p>
        <el-form-item label="S:">
          <el-input style="width: 220px" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
  <el-dialog title="修改" :visible.sync="changedetail"width="607px" style="width: 100%;height: 100%;overflow: auto">
    <div style="height: 350px;background-color: white;overflow-y: auto;overflow-x: hidden;padding-top: 20px">
      <el-form labelWidth="80px">
        <el-form-item label="名称:">
          <el-input style="width: 220px"></el-input>
        </el-form-item>
        <el-form-item label="字号:">
          <el-input style="width: 220px"></el-input>
        </el-form-item>
        <el-form-item label="发布日期:">
          <el-date-picker></el-date-picker>
        </el-form-item>
        <el-form-item label="内容:">
          <div style="vertical-align: top;line-height: 40px;width: 400px;">
            <editor></editor>
          </div>
        </el-form-item>
        <p style="width: 100%;height: 1px;background-color: gainsboro;margin-bottom: 10px"></p>
        <el-form-item label="S:">
          <el-input style="width: 220px"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button @click="changedetail=false">取消</el-button>
      <el-button type="primary" @click="changedetail=false">确认</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
  import editor from '../../components/ediitor/quillEditor.vue'
export default {
  props: {
    lable: ''
  },
  components: {
    editor
  },
  data () {
    return {
      form:{
        key:''
      },
      newlist:false,
      listdetail:false,
      changedetail:false,
      key:'',
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      Items: [
        {
          'Code': 1,
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
          'Code': 2,
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
          'Code': 3,
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
          'Code': 4,
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
          'Code': 5,
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
          'Code': 6,
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
          'Code': 7,
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    deletcontent () {
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
