<template>
  <div class="wrapper">
    <Header title="隐患排查" text="巡检任务"></Header>
    <div class="table">
      <div class="table-top">
        <div class="form" style="float: right;">
          <div>
            <el-form :inline="true" labelWidth="80px" style="height: 40px">
              <el-form-item label="状态:">
                <el-select v-model="search.states" style="width: 150px">
                  <el-option label="1" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="执行岗位:">
                <el-select v-model="search.states" style="width: 150px">
                  <el-option label="1" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  label="关键词:">
                <el-input v-model="search.key" value="key" style="width: 150px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="table-main">
          <el-table :data="Items"  border  height="calc(100vh - 355px)" width="100%">
            <el-table-column  label="任务号" prop="Code">
            </el-table-column>
            <el-table-column prop="Code" label="任务名称">
            </el-table-column>
            <el-table-column prop="StartTime" label="开始时间">
            </el-table-column>
            <el-table-column prop="EndTime" label="结束时间">
            </el-table-column>
            <el-table-column prop="Person" label="执行岗位">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="执行人">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="任务结果">
            </el-table-column>
            <el-table-column prop="StateName" label="状态">
            </el-table-column>
            <el-table-column label="操作">
              <el-link :underline="false" type="primary" @click="textdetail=true">任务详情</el-link>
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
    <el-dialog title="任务详情" :visible.sync="textdetail" width="1150px" style="width: 100%;overflow: auto;height: 100%">
      <div style="height: 330px;overflow-y: hidden;overflow-x: hidden;background-color: white;padding: 10px">
        <p style="margin-bottom: 5px;font-size: 20px">危险源：{{Items.Code}}<p/>
        <el-table :data="Items" border height="340px">
          <el-table-column prop="StateName" label="名称">
          </el-table-column>
          <el-table-column prop="StateName" label="状态">
          </el-table-column>
          <el-table-column prop="StateName" label="状态">
          </el-table-column>
          <el-table-column prop="StateName" label="风险等级">
          </el-table-column>
          <el-table-column prop="StateName" label="危险因素">
          </el-table-column>
          <el-table-column prop="StateName" label="事故类型">
          </el-table-column>
          <el-table-column prop="StateName" label="后果">
          </el-table-column>
          <el-table-column prop="StateName" label="隐患管控">
          </el-table-column>
          <el-table-column prop="StateName" label="操作">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="textdetail=false">确认</el-button>
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    data () {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        textdetail:false,
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
        state:'',
        search: {
          states:'',
          job:'',
          point:'',
          key:''
        },
        form: {
          name: '',
          rate: '',
          date: '',
          point: '',
          timeRange: '',
          job: '',
          dutyPerson: '',
          progress: '',
          des: '',
          mainType: ''
        },
        index: 1  //当前页面编号
      }
    }
  }
</script>

<style scoped>
  .wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .wrapper .table{
    height: calc(100% - 150px);
    margin: 15px 25px 11px;
    overflow: hidden
  }
  .wrapper .table .table-top{
    height: 40px;
    background-color: white;
    border-radius: 5px;
    padding: 10px 0 10px 20px;
    margin: 0 2px 5px 2px;
  }
  .wrapper .table-foot{
    margin: 15px 25px 11px;
    height: 35px;
    line-height: 35px;
    background-color: white;
  }
  .wrapper .table-foot .el-pagination{
    text-align: right !important;
  }
  .wrapper .newtest{
    padding: 24px 31px 24px 0;
    width: 900px;
    display: flex;
    margin-bottom: -20px;
  }
  .wrapper .newtest .el-form-item__label{
    text-align: right;
  }
  .wrapper .newtest .left{
    flex: 0 1 360px;
    margin-right: 20px;
  }
  .wrapper .newtest .left .el-form-item{
    width: 300px;
  }
  .wrapper .newtest .right{
    flex: 1;
  }
  .wrapper .newtest .right  .el-form-item{
    width: 350px;
  }
</style>
