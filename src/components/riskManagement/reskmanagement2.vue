<template>
  <div class="wrapper">
    <Header title="隐患排查" text="巡查任务管理"></Header>
    <div class="table">
      <div class="table-top">
        <el-button type="primary" @click="newListState=true">新建</el-button>
        <div class="form" style="float: right;margin-right: 20px">
          <div>
          <el-form :inline="true" labelWidth="60px" style="height:40px">
            <el-form-item label="状态:">
              <el-select v-model="search.states" style="width: 120px">
                <el-option label="1" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="岗位:">
              <el-select v-model="search.states" style="width: 120px">
                <el-option label="1" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="风险点:">
              <el-select v-model="search.states" style="width: 120px">
                <el-option label="1" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item  label="关键词:">
              <el-input v-model="search.key" value="key" style="width: 120px" placeholder="请输入关键词"></el-input>
            </el-form-item>
             <el-form-item>
               <el-button type="primary">查询</el-button>
             </el-form-item>
          </el-form>
          </div>
        </div>
      </div>
      <el-table :data="Items" class="datalist" border height="calc(100vh - 355px)">
          <el-table-column  label="" type="expand">
            <template slot-scope="props">
              <div v-for="(item, index) in props.row.detail" :key="index" style="text-align: left;font-size: 16px;line-height: 30px">
                <span style="margin-right: 20px">主体类型:{{item.type}}</span>
                <span style="margin-right: 20px">主体名:{{item.name}}</span>
                <span style="margin-right: 20px">风控项:{{item.item}}</span>
                <span style="margin-right: 20px">风险等级:{{item.rank}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="Code" label="编号">
          </el-table-column>
          <el-table-column prop="Name" label="名称">
          </el-table-column>
          <el-table-column prop="StartTime" label="开始时间">
          </el-table-column>
          <el-table-column prop="EndTime" label="结束时间">
          </el-table-column>
          <el-table-column prop="StartTime" label="执行频率">
          </el-table-column>
          <el-table-column prop="StartTime" label="执行人">
          </el-table-column>
          <el-table-column prop="StartTime" label="执行岗位">
          </el-table-column>
          <el-table-column prop="StateName" label="状态">
          </el-table-column>
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
                    <el-button type="info" size="small"  style="width: 80px" @click="deletecontent()">删除</el-button>
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
    <el-dialog title="审核状态" :visible.sync="stopcontent" width="450px" style="height:100%;overflow: auto;">
      <div style="height: 300px;overflow-y: auto;overflow-x: hidden;background-color: white;padding-top: 30px;padding-left: 20px">
        <el-form>
          <el-form-item label="状态:">
            <el-select v-model="state">
              <el-option label="12"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="stopcontent = false">取 消</el-button>
    <el-button type="primary" @click="stopcontent = false">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog title="新建巡查任务" :visible.sync="newListState" width="900px"  style="height:100%;overflow: auto;">
      <div style="height: 400px;overflow-y: auto;overflow-x: hidden;background-color: white">
        <div class="newtest">
          <div class="left">
            <el-form v-model="form" label-width="120px">
              <el-form-item label="任务名称">
                <el-input style="height:40px;width: 180px" v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="风险点">
                <el-select v-model="form.point">
                  <el-option label="风险点" placeholder="请选择" value="123"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="执行岗位">
                <el-select v-model="form.job" >
                  <el-option label="教师" value="123" ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="审批流程">
                <el-select v-model="form.pro">
                  <el-option label="1"  value="123"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="right">
            <el-form v-model="form" labelWidth="120px">
              <el-form-item label="执行频率">
                <div style="width: 250px">
                  <el-col :span="6" style="margin-right: 20px">
                    <el-input v-model="form.rate"></el-input>
                  </el-col>
                  <el-col :span="15">
                    <el-select v-model="form.timeRange">
                      <el-option v-for="(item, index) in unit" :key="index" value="1"></el-option>
                    </el-select>
                  </el-col>
                </div>
              </el-form-item>
              <el-form-item label="时间范围">
                <el-time-picker  style="width: 240px" is-range v-model="form.timeRange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
                </el-time-picker>
              </el-form-item>
              <el-form-item label="作业责任人">
                <el-select v-model="form.dutyPerson" style="width: 240px">
                  <el-option label="123" value="321"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div>
          <el-form>
            <el-form-item label="任务描述" labelWidth="120px" style="width: 350px">
              <el-input type="textarea" :autosize="{ minRows: 3}" style="width: 350px" placeholder="请输入类容" v-model="form.des "></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="border-top: 1px solid rgb(221, 221, 221);height: 90px;padding: 20px 0px 5px;margin: 0 15px">
          <span style="margin-right: 5px">主体类型:</span>
          <el-select>
            <el-option value="12" label="12"></el-option>
          </el-select>
          <div style="margin-top: 10px">
            <el-table :data="Items" border>
              <el-table-column label="主体类别" prop="Code">
              </el-table-column>
              <el-table-column label="主体名字" prop="Code">
              </el-table-column>
              <el-table-column label="风控项" prop="Code">
              </el-table-column>
              <el-table-column label="操作" >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="newListState = false">取 消</el-button>
    <el-button type="primary" @click="newListState = false">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog title="修改巡查任务" :visible.sync="changedetail" width="900px"  style="height:100%;overflow: auto;">
      <div style="height: 400px;overflow-y: auto;overflow-x: hidden;background-color: white">
        <div class="newtest">
          <div class="left">
            <el-form v-model="form" label-width="120px">
              <el-form-item label="任务名称">
                <el-input style="height:40px;width: 180px" v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="风险点">
                <el-select v-model="form.point">
                  <el-option label="风险点" placeholder="请选择" value="123"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="执行岗位">
                <el-select v-model="form.job" >
                  <el-option label="教师" value="123" ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="审批流程">
                <el-select v-model="form.pro">
                  <el-option label="1"  value="123"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="right">
            <el-form v-model="form" labelWidth="120px">
              <el-form-item label="执行频率">
                <div style="width: 250px">
                  <el-col :span="6" style="margin-right: 20px">
                    <el-input v-model="form.rate"></el-input>
                  </el-col>
                  <el-col :span="15">
                    <el-select v-model="form.timeRange">
                      <el-option v-for="(item, index) in unit" :key="index" value="1"></el-option>
                    </el-select>
                  </el-col>
                </div>
              </el-form-item>
              <el-form-item label="时间范围">
                <el-time-picker  style="width: 240px" is-range v-model="form.timeRange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
                </el-time-picker>
              </el-form-item>
              <el-form-item label="作业责任人">
                <el-select v-model="form.dutyPerson" style="width: 240px">
                  <el-option label="123" value="321"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div>
          <el-form>
            <el-form-item label="任务描述" labelWidth="120px" style="width: 350px">
              <el-input type="textarea" :autosize="{ minRows: 3}" style="width: 350px" placeholder="请输入类容" v-model="form.des "></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="border-top: 1px solid rgb(221, 221, 221);height: 190px;padding: 20px 0px 5px;margin: 15px">
         <div style="margin-bottom: 10px">
          <span style="margin-right: 5px">主体类型:</span>
          <el-select>
            <el-option value="12" label="12"></el-option>
          </el-select>
         </div>
            <el-table :data="Items" border>
              <el-table-column label="主体类别" prop="Code">
              </el-table-column>
              <el-table-column label="主体名字" prop="Code">
              </el-table-column>
              <el-table-column label="风控项" prop="Code">
              </el-table-column>
              <el-table-column label="操作" >
                <el-link type="primary" :underline="false">删除</el-link>
              </el-table-column>
            </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="changedetail = false">取 消</el-button>
    <el-button type="primary" @click="changedetail = false">确 定</el-button>
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
      },
      deletecontent() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    data () {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        stopcontent:false,
        newListState:false,
        changedetail:false,
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
        unit: ['年', '月', '日', '时', '分钟'],
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
