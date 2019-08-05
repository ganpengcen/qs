<template>
  <div class="wrapper">
    <Header title="隐患排查" text="隐患管控"></Header>
    <div class="table">
      <div class="table-top">
        <div style="float: right;padding-right: 10px">
            <el-form :inline="true" labelWidth="80px" v-model="form" style="height: 40px">
              <el-form-item label="时间">
                <el-date-picker v-model="form.time" type="daterange"
                                style="width: 220px" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="隐患等级">
                <el-select v-model="form.rank"  style="width: 130px">
                  <el-option label="1" value="12"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="隐患等级">
               <el-input v-model="form.key" placeholder="请输入关键字" style="width: 130px"></el-input>
              </el-form-item>
              <el-form-item label="历史查询">
                <el-checkbox v-model="form.his"></el-checkbox>
              </el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form>
        </div>
      </div>
      <div class="table-main">
        <div class="detail">
          <el-table :data="Items" class="datalist" border height="calc(100vh - 355px)">
            <el-table-column  label="隐患编号" prop="Code">
            </el-table-column>
            <el-table-column prop="Code" label="巡检人员">
            </el-table-column>
            <el-table-column prop="StartTime" label="责任人">
            </el-table-column>
            <el-table-column prop="EndTime" label="责任部门">
            </el-table-column>
            <el-table-column prop="Person" label="发现时间">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="完成时间">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="隐患等级">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="风险等级">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="验收人">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="验收时间">
            </el-table-column>
            <el-table-column prop="StateName" label="状态">
            </el-table-column>
            <el-table-column label="操作" prop="StateName">
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
        form:{
          time:'',
          rank:'',
          key:'',
          his:''
        },
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
