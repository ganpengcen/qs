<template>
  <div class="wrapper">
    <Header title="隐患排查" text="作业申请"></Header>
    <div class="table">
      <div class="table-top">
        <el-button type="primary" @click="newtext=true">新建</el-button>
      </div>
      <div class="table-main">
          <el-table :data="Items" class="datalist" border height="calc(100vh - 355px)">
            <el-table-column  label="作业编号" prop="Code">
            </el-table-column>
            <el-table-column prop="Code" label="作业名称">
            </el-table-column>
            <el-table-column prop="StartTime" label="开始时间">
            </el-table-column>
            <el-table-column prop="EndTime" label="结束时间">
            </el-table-column>
            <el-table-column prop="Person" label="作业发起人">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="发起时间">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="作业责任人">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="作业流程">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="作业时长">
            </el-table-column>
            <el-table-column prop="PrincipalEmployeeName" label="作业申请描述">
              <el-link type="primary" style="font-size: 13px" @click="check=true" :underline="false">查看</el-link>
            </el-table-column>
            <el-table-column prop="StateName" label="状态">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-popover trigger="click" placement="bottom" class="minw">
                  <ul>
                    <li style="text-align: center;margin-bottom: 10px;width: 100px">
                      <el-button type="primary" size="small"  style="width:80px" @click="textdetail=true">作业详情</el-button>
                    </li>
                    <li style="text-align: center;margin-bottom: 10px;width: 100px">
                      <el-button type="warning" size="small"  style="width: 80px">发起审批</el-button>
                    </li>
                    <li style="text-align: center;margin-bottom: 10px;width: 100px">
                      <el-button type="danger" size="small"  style="width: 80px">审核</el-button>
                    </li>
                    <li style="text-align: center;margin-bottom: 10px;width: 100px">
                      <el-button type="danger" size="small"  style="width: 80px" @click="changedetail=true">修改</el-button>
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
    <div class="table-footer">
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
    <el-dialog title="新建作业申请" :visible.sync="newtext" width="710px" style="width: 100%;overflow: auto;height: 100%">
      <div style="height: 350px;overflow-x: hidden;overflow-y: auto;background-color: white">
        <el-form :inline="true" labelWidth="120px">
          <el-form-item label="作业名称">
            <el-input style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="审批流程">
            <el-select  style="width: 180px">
              <el-option></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作业流程">
            <el-select  style="width: 180px">
              <el-option label="123" value="123"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作业时长">
            <el-input style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
           <el-time-select style="width: 180px"></el-time-select>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-time-select style="width: 180px"></el-time-select>
          </el-form-item>
          <el-form-item label="组织架构">
            <el-select style="width: 180px">
              <el-option label="123" value="123"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作业责任人">
            <el-select style="width: 180px">
              <el-option label="123" value="123"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作业申请描述">
            <el-input type="textarea" :rows="5"  style="width: 440px"></el-input>
          </el-form-item>
        </el-form>
      </div>
       <span slot="footer">
        <el-button @click="newtext=false">取消</el-button>
        <el-button type="primary" @click="newtext=false">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog title="作业详情" :visible.sync="textdetail" width="800px" class="textdetail" style="height:100%;overflow: auto;">
      <div class="detail-topp" style="height: 350px;overflow-y: auto;overflow-x: hidden;background-color: white;padding-left: 10px">
        <div class="text-content">
          <span>任务编号:{{detail.BillCode}}</span>
          <span>作业名称:{{detail.BillName}}</span>
          <span>作业发起人:{{detail.CreateMan}}</span>
          <span>作业责任人:{{detail.PrincipalEmployeeName}}</span>
          <span>开始时间:{{detail.StartTime}}</span>
          <span>结束时间:{{detail.EndTime}}</span>
          <span>作业时长:{{detail.BillLong}}</span>
          <span>作业状态:{{detail.status}}</span>
          <span>作业内容描述:{{detail.Description}}</span>
        </div>
        <div class="pic">
          <div class="main-middle">
            <div style="width: 610px;position: relative;">
              <el-steps direction="vertical" :active ="activen" finish-status="success" space="90px" style="width: 600px;" id="cir-2px">
                <el-step  :title="item.PointName" v-for="(item, index) in detail.BillFlows" :key="index">
                  <div slot="description">岗位:{{item.PostName}}
                    <div>
                      <span style="display:inline-block;width: 52px;font-size: 11px;font-weight: 600">执行人</span>
                      <span style="font-size: 11px;font-weight: 600">执行结果</span>
                    </div>
                    <div v-for="(dd, num) in item.detials" :key="num">
                      <span style="display:inline-block;width: 52px">{{dd.FlowEmployeeName}}</span>
                      <span>{{dd.FlowMemo}}</span>
                      <div/>
                    </div>
                    <div class="gbutton" style="position: absolute;bottom: 0px;right: 20px;">
                      <el-button type="primary" size="small">完成</el-button>
                      <el-button type="primary" size="small">作业终止</el-button>
                      <el-button type="primary" size="small">作业回退</el-button>
                      <div style="display: inline-block">
                        <div style="height: 101px;width: 11px;border-right: 2px solid red" class="cir-2px"></div>
                        <div style="height: 25px;width: 25px;background-color: red;border-radius: 50%;position: absolute;bottom: 0"></div>
                      </div>
                    </div>
                  </div>
                </el-step>
              </el-steps>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="textdetail = false">取 消</el-button>
          <el-button type="primary" @click="textdetail = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改作业申请" :visible.sync="changedetail" width="710px" style="width: 100%;overflow: auto;height: 100%">
      <div style="height: 350px;overflow-x: hidden;overflow-y: auto;background-color: white">
        <el-form :inline="true" labelWidth="120px">
          <el-form-item label="作业名称">
            <el-input style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="审批流程">
            <el-select  style="width: 180px">
              <el-option></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作业流程">
            <el-select  style="width: 180px">
              <el-option label="123" value="123"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作业时长">
            <el-input style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-time-select style="width: 180px"></el-time-select>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-time-select style="width: 180px"></el-time-select>
          </el-form-item>
          <el-form-item label="组织架构">
            <el-select style="width: 180px">
              <el-option label="123" value="123"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作业责任人">
            <el-select style="width: 180px">
              <el-option label="123" value="123"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作业申请描述">
            <el-input type="textarea" :rows="5"  style="width: 440px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="changedetail=false">取消</el-button>
        <el-button type="primary" @click="changedetail=false">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog title=" " :visible.sync="check" width="700px" style="width: 100%;height: 100%;overflow: auto">
      <div style="height: 350px;overflow-x: hidden;overflow-y: auto;background-color: white;padding: 10px">
        <p style="font-size: 20px">作业描述:</p>
      </div>
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
      },
      deletecontent () {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancleButtonText: '取消',
          type:'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message:'删除成功'
          })
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '取消'
          })
        })
      },
    },
    data () {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        check:false,
        newtext:false,
        changedetail:false,
        stopcontent:false,
        activen:2,
        textdetail:false,
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
        detail:{
          'BillCode': 'BillCode',
          'BillName': 'BillName',
          'CreateMan': 'CreateMan',
          'PrincipalEmployeeName': 'PrincipalEeName',
          'StartTime': 'StartTime',
          'EndTime': 'EndTime',
          'BillLong': 'BillLong',
          'status': 'status[detail.State]',
          'Description': 'Description',
          'BillFlows': [
            {
              'PostName': 'PostName',
              'detials': [
                {
                  'FlowEmployeeName': 'FlowEmployeeName',
                  'FlowMemo': 'FlowMemo'
                }
              ]
            },
            {
              'PostName': 'PostName',
              'detials': [
                {
                  'FlowEmployeeName': 'FlowEmployeeName',
                  'FlowMemo': 'FlowMemo'
                }
              ]
            },
            {
              'PostName': 'PostName',
              'detials': [
                {
                  'FlowEmployeeName': 'FlowEmployeeName',
                  'FlowMemo': 'FlowMemo'
                }
              ]
            }
          ]
        },
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
  .wrapper .table-footer{
    margin: 15px 25px 11px;
    height: 35px;
    line-height: 35px;
    background-color: white;
  }
  .wrapper  .table-footer .el-pagination{
    text-align: right !important;
  }
  .wrapper .textdetail .detail-topp .text-content{
    border-bottom: 1px solid #ddd;
  }
  .wrapper .textdetail .detail-topp .text-content span{
    margin-right: 40px;
    height: 39px;
    white-space:nowrap;
    line-height: 39px;
  }
  .wrapper .textdetail .detail-topp .pic {
    padding: 10px 0 0 60px;
  }
  #cir-2px > :first-child .gbutton .cir-2px{
    border: none !important;
  }
</style>
