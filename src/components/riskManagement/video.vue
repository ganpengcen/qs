<template>
  <div class="wrapper">
    <Header title="隐患排查" text="视频监控"></Header>
    <div class="table">
      <div class="table-top">
        <el-button type="primary" @click="newcam=true">新建</el-button>
        <div style="float: right;margin-right: 30px;height: 40px;">
          <span style="font-size: 14px;margin-right: 5px">关键字:</span>
          <el-input type="primary" style="width: 120px;margin-right: 10px" placeholder="请输入关键字"></el-input>
          <el-button type="primary">查询</el-button>
        </div>
      </div>
      <div class="table-main">
          <el-table :data="Items"  border height="calc(100vh - 355px)">
            <el-table-column prop="PrincipalEmployeeName" label="编号">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="摄像头所在地">
            </el-table-column>
            <el-table-column prop="StateName" label="摄像头URL">
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
    <!--弹出框-->
    <el-dialog title="新建摄像头" :visible.sync="newcam" width="920px" style="width: 100%;overflow: auto;height: 100%">
      <div style="height: 350px;overflow-y: auto;overflow-x:hidden;background-color: white">
        <div>
          <el-form :inline="true" labelWidth="120px">
            <el-form-item label="编号:">
              <el-input v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item label="摄像头所在地:">
              <el-input v-model="form.location"></el-input>
            </el-form-item>
            <el-form-item label="摄像头URL:" >
              <el-input style="width: 640px" v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item>
              <div style="width: 744px;height: 42px;margin-left: 120px">
                <el-form-item label="主体类型">
                <el-select style="width: 150px;margin-right: 10px" v-model="form.type">
                  <el-option label="12" value="1223"></el-option>
                </el-select>
                <el-button type="primary">新建</el-button>
              </el-form-item>
              </div>
            </el-form-item>
          </el-form>
          <el-table :data="Items" class="datalist" border height="400px" width="100%">
            <el-table-column prop="Code" label="类别">
            </el-table-column>
            <el-table-column prop="Code" label="名称"></el-table-column>
            <el-table-column label="操作" >
              <template slot-scope="scope">
                <el-popover trigger="click" placement="bottom" width="150">
                  <ul>
                    <li style="text-align: center;margin-bottom: 10px">
                      <el-button type="success" size="small" style="width: 80px" @click="changedetail = true">修改</el-button>
                    </li>
                    <li style="text-align: center;margin-bottom: 10px">
                      <el-button type="primary" size="small"  style="width: 80px">发起审批</el-button>
                    </li>
                    <li style="text-align: center;margin-bottom: 10px">
                      <el-button type="warning" size="small"  style="width: 80px">审核</el-button>
                    </li>
                    <li style="text-align: center;margin-bottom: 10px">
                      <el-button type="danger" size="small"  style="width: 80px" @click="stopcontent=true">停止类容</el-button>
                    </li>
                    <li style="text-align: center;margin-bottom: 10px">
                      <el-button type="info" size="small"  style="width: 80px" @click="deletecontent=true">删除</el-button>
                    </li>
                  </ul>
                  <div slot="reference" class="name-wrapper">
                    <el-button type="primary">操作</el-button>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="foot">
        <el-button @click="newcam=false">取消</el-button>
        <el-button @click="newcam=false" type="primary">确认</el-button>
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
        form:{
          code: '',
          location: '',
          url: '',
          type: ''
        },
        newcam: false,
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
