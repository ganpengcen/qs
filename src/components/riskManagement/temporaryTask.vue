<template>
  <div class="wrapper">
      <Header title="隐患排查" text="临时任务"></Header>
      <div class="table">
        <!--头部新建栏-->
        <div class="table-top">
          <el-button type="primary" @click="newtask=true">新建</el-button>
        </div>
        <!--表格具体类容-->
        <div class="table-main">
          <div class="detail">
            <el-table :data="Items" class="datalist" border height="calc(100vh - 355px)">
              <el-table-column  label="" type="expand">
                <template slot-scope="props">
                  <div v-for="(item, index) in props.row.detail" :key="index" style="text-align: left;font-size: 16px;line-height: 30px">
                    <span style="margin-right: 20px">主体类型: <span style="margin: 0 20px">{{item.type}}</span></span>
                    <span style="margin-right: 20px">主体名: <span style="margin: 0 20px">{{item.name}}</span></span>
                    <span style="margin-right: 20px">风控项: <span style="margin: 0 20px">{{item.item}}</span></span>
                    <span style="margin-right: 20px">风险等级: <span style="margin: 0 20px">{{item.rank}}</span></span>
                  </div>
                </template>
              </el-table-column>
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
              <el-table-column prop="PrincipalEmployeeName" label="发起人">
              </el-table-column>
              <el-table-column prop="PrincipalEmployeeName" label="任务结果">
              </el-table-column>
              <el-table-column prop="StateName" label="状态">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-popover trigger="click" placement="bottom" class="minw">
                    <ul>
                      <li style="text-align: center;margin-bottom: 10px;width: 100px">
                        <el-button type="primary" size="small"  style="width:80px" @click="showdetail=true">任务详情</el-button>
                      </li>
                      <li style="text-align: center;margin-bottom: 10px;width: 100px">
                        <el-button type="warning" size="small"  style="width: 80px" @click="allot.flag=true">分配人员</el-button>
                      </li>
                      <li style="text-align: center;margin-bottom: 10px;width: 100px">
                        <el-button type="danger" size="small"  style="width: 80px" @click="stopcontent=true">发起审核</el-button>
                      </li>
                      <li style="text-align: center;margin-bottom: 10px;width: 100px">
                        <el-button type="danger" size="small"  style="width: 80px" @click="stopcontent=true">审核</el-button>
                      </li>
                      <li style="text-align: center;margin-bottom: 10px;width: 100px">
                        <el-button type="info" size="small"  style="width: 80px" @click="deletecontent">删除</el-button>
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
        <!--底部分页栏-->
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
    <div class="dialog" style="width: 100%;overflow-y: auto;height: 100%">
      <el-dialog title="临时任务详情" :visible.sync="showdetail">
        <div style="padding: 10px;line-height: 30px;font-size: 16px; font-weight: bold;height: 330px;background-color: white;overflow-y: auto;overflow-x: hidden">
          <el-row>
            <el-col span=12>
              <span>风险点: {{textdetail.point}}</span>
            </el-col>
            <el-col :span="12">
              <span>名称: {{textdetail.name}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col span=12>
              <span>任务编号: {{textdetail.Code}}</span>
            </el-col>
            <el-col span=12>
              <span>创建时间: {{textdetail.createTime}}</span>
            </el-col>
          </el-row>
          <span>任务描述:</span>
          <div style="min-height:120px;border: 1px solid grey;border-radius: 5px;padding: 10px;margin: 0 40px">{{textdetail.des}}</div>
        </div>
      </el-dialog>
      <!--任务详情弹窗-->
      <el-dialog title="分配人员" :visible.sync="allot.flag" style="height: 100%;width: 100%;overflow: auto">
        <div style="height: 250px;overflow-x: hidden;overflow-y: auto;background-color: white;padding-top: 20px">
          <el-form labelWidth="120px">
            <el-form-item label="执行岗位">
              <el-select v-model="allot.job">
                <el-option label="教师" value="teacher"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作业责任人">
              <el-select v-model="allot.duty">
                <el-option label="教师" value="teacher"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer">
          <el-button  @click="allot.flag=false">取消</el-button>
          <el-button type="primary" @click="allot.flag=false">确认</el-button>
        </span>
      </el-dialog>
      <!--分配人员弹窗-->
      <el-dialog title="新建临时任务" :visible.sync="newtask" width="1500px" class="newtask" style="width: 100%;overflow: auto">
        <div style="height: 380px;overflow-y: auto;overflow-x: hidden;background-color: white">
          <div class="left">
            <div style="height: 125px;border-bottom: 1px solid silver">
              <el-form labelWidth="120px" inline v-model="form">
              <el-row>
                  <el-col :span=10>
                    <el-form-item label="任务名称">
                      <el-input v-model="form.name" style="width: 160px"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span=14>
                    <el-form-item label="风险点">
                      <el-select v-model="form.point">
                        <el-option label="point" value="point" style="width: 120px"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span=10>
                    <el-form-item label="审批流程">
                      <el-select v-model="form.progress" style="width: 160px">
                        <el-option value="123" label="123"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span=14>
                    <el-form-item label="时间范围">
                      <el-date-picker  v-model="form.timeRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 280px">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>
            </div>
            <div style="margin-top: 25px;height: 62px">
              <el-form v-model="form" labelWidth="120px">
                <el-form-item label="主体类型">
                  <el-select v-model="form.type" style="width: 160px">
                    <el-option label="type" value="type"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <el-table :data="tabledata" style="width:800px" height="200px" border>
                <el-table-column prop="type" label="主体类别"></el-table-column>
                <el-table-column prop="name" label="主体名字"></el-table-column>
                <el-table-column prop="item" label="风控项"></el-table-column>
                <el-table-column prop="opration" label="操作"></el-table-column>
              </el-table>
            </div>
          </div>
          <div class="right">
            <p style="margin: 10px;font-size: 17px">任务类容:</p>
            <el-input type="textarea" :rows="18" v-model="form.textarea"></el-input>
          </div>
        </div>
        <span slot="footer">
          <el-button type="primary" @click="newtask=false">确认</el-button>
        </span>
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
        ],
        newtask: false,
        showdetail: false,
        stopcontent: false,
        index: 1,  //当前页面编号
        textdetail: {
          point: '纷纷',
          name: 'name',
          Code: 'code',
          createTime: 'time',
          des: '描述'
        },
        allot: {
          flag: false,
          job:'',
          duty:''
        },
        form: {
          name: '',
          point:'',
          progress: '',
          timeRange: '',
          type: '',
          textarea: ''
        },
        tabledata:[
          {
            type:'1',
            name:'1',
            item:'1',
            opration:'1'
          }
        ]
      }
  },
  methods: {
    deletecontent () {
      this.$confirm('确定删除该消息', '提示', {
        comfirmButtonText: '确认',
        cancleButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }).catch({
        type: 'info',
        message: '取消'
      })
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
  .wrapper .table .table-main{
    overflow: hidden;
    margin-top: 5px;
  }
.wrapper .table-foot{
  margin: 15px 25px 11px;
  height: 35px;
  line-height: 35px;
  background-color: white;
}
.wrapper  .table-foot .el-pagination{
  text-align: right !important;
  height: 30px;
}
  .wrapper .dialog .newtask .left{
    display: inline-block;
    width: 830px;
    border-right: 1px solid rgb(221, 221, 221);
    vertical-align: top;
    margin-right: 10px;
  }
.wrapper .dialog .newtask .right{
  display: inline-block;
  width: 530px;
  height: 506px;
  padding-left: 20px;
}
</style>
