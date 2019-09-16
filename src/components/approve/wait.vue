<template>
  <div class="mainWrapper">
     <Header title="审批管理" text="待审批"></Header>
    <div class="table">
      <div class="table-main">
        <div class="detail">
          <el-table :data="Items" class="datalist" border  height="calc(100vh - 355px)">
            <el-table-column prop="type" label="业务类型">
            </el-table-column>
            <el-table-column prop="type" label="业务单据号">
            </el-table-column>
            <el-table-column prop="type" label="业务日期">
            </el-table-column>
            <el-table-column prop="type" label="发起人">
            </el-table-column>
            <el-table-column prop="type" label="发起时间">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-popover trigger="click" placement="bottom" width="150">
                    <ul>
                      <li style="text-align: center;margin-bottom: 10px">
                        <el-button type="success" size="small" style="width: 80px" @click="checkW(scope.row.ID)">审核</el-button>
                      </li>
                      <li style="text-align: center;margin-bottom: 10px">
                        <el-button type="primary" size="small"  style="width: 80px">查看单据</el-button>
                      </li>
                      <li style="text-align: center;margin-bottom: 10px">
                        <el-button type="warning" size="small"  style="width: 80px">审核日志</el-button>
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
    </div>
    <div class="table-foot">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page.index"
        :page-size="page.size"
        :page-sizes="[3, 7, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total.sync="page.total">
      </el-pagination>
    </div>
    <el-dialog title="审批" :visible.sync="dg1">
      <div slot="footer">
        <span><el-button @click="dg1=false">取消</el-button></span>
        <span><el-button @click="submitW">确认</el-button></span>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../../components/assembly/Header.vue'
  export default {
    data(){
      return {
        Items:[],
        key:'',
        page:{
          size:3,
          index:1,
          total:0
        },
        dg1:false,
        ID:'',
      }
    },
    methods: {
      getPendingTasksPage(){
        let param = {
          "PageSize": this.page.size,
          "PageIndex": this.page.index-1,
          "KeyWord": "",
          "Query": this.key,
          "OrderString": "",
          "ToExcel": false
        }
      this.$post(this.api.getPendingTasksPage,param).then(res=>{
        console.log('分页返回值:',res)
          if(res.data.State===200){
            this.Items=res.data.Data.Data
            this.page.total=res.data.Data.total
          } else {
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
         })
      },  //分页获取
      checkW(ID){
        this.ID = ID
        this.dg1=true
      }, //审核窗口
      submitW(){
      }, //提交审核
      handleSizeChange(val) {   //修改分页条数
        this.page.size = val
        console.log('分页数改变')
        this.getDocMeetingsQuery()
        console.log('分页数:',this.page.size)
      },  //分页数目改变
      handleCurrentChange(val) {   //当前展示页
        this.page.index = val
        this.getDocMeetingsQuery()
      },  //当前页改变
    },
    created(){
      this.getPendingTasksPage()
    },
    components:{
      Header:Header
    }
  }
</script>

<style scoped>
.table{
  margin: 15px 25px 11px;
}
  .table-foot{
    height: 35px;
    margin: 15px 25px 11px;
    background-color: white;
    text-align: right;
  }
</style>
