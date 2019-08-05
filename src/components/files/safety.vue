<template>
  <div class="wrapper">
    <Header title="档案管理" text="安全会议"></Header>
    <div class="table">
      <div class="table-top">
        <el-button type="primary">新建</el-button>
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
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-popover trigger="click" placement="bottom" class="minw">
                  <ul>
                    <li style="text-align: center;margin-bottom: 10px;width: 100px">
                      <el-button type="primary" size="small"  style="width:80px">任务详情</el-button>
                    </li>
                    <li style="text-align: center;margin-bottom: 10px;width: 100px">
                      <el-button type="warning" size="small"  style="width: 80px">分配人员</el-button>
                    </li>
                    <li style="text-align: center;margin-bottom: 10px;width: 100px">
                      <el-button type="danger" size="small"  style="width: 80px" @click="stopcontent=true">发起审核</el-button>
                    </li>
                    <li style="text-align: center;margin-bottom: 10px;width: 100px">
                      <el-button type="danger" size="small"  style="width: 80px" @click="stopcontent=true">审核</el-button>
                    </li>
                    <li style="text-align: center;margin-bottom: 10px;width: 100px">
                      <el-button type="info" size="small"  style="width: 80px" @click="deletecontent=true">删除</el-button>
                    </li>
                  </ul>
                  <div slot="reference">
                    <el-button type="primary" style="width: 100px;" size="small">操作</el-button>
                  </div>
                </el-popover>
              </template>
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
