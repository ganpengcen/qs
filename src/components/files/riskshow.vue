<template>
  <div class="wrapper">
    <Header title="档案管理" text="风险公示"></Header>
    <div class="table">
        <el-tabs :tab-position="left" style="overflow: hidden;" @tab-click="tabClik">
          <el-tab-pane :label="item.Name" v-for="(item, index) in title" :key="index">
            <Table :lable="item.Name" ref="tabs" :ID="item.ID"></Table>
          </el-tab-pane>
        </el-tabs>
    </div>
    <el-dialog title="提示" :visible.sync="deletlist" width="450px">
      <div style="display: table">
        <i class="el-icon-warning" style="color: yellow;font-size: 25px;display: table-cell;width: 30px"></i>
        <span style="display: table-cell;vertical-align: middle">确定要删除记录?</span>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="deletlist = false">取 消</el-button>
    <el-button type="primary" @click="deletlist = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import Table from '../../components/files/table.vue'
  import Header from '../../components/assembly/Header.vue'
  export default {
    data () {
      return {
        deletlist:false,
        left: 'left',
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        stopcontent: false,
        index: 1,  //当前页面编号,
        title:['1','2','3']
      }
    },
    components: {
      Table,
      Header
    },
    methods: {
      getDocRegimeItem(){
        this.$get(this.api.getDocRegimeItem).then(res=>{
          console.log('类型返回值：',res)
          if(res.data.State===200){
            this.title=res.data.Data
          }else {
            this.$confirm({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },//获取安全公示类型合集
      tabClik(a){
        console.log('click',a.index)
        this.$refs.tabs[a.index].getDocInstitutionPage()
      },//tab被选择

    },
    created(){
      this.getDocRegimeItem()
    }
  }
</script>

<style scoped>
  .wrapper{
    width: 100%;
    height:100%;
    overflow: hidden;
  }
  .el-tabs{
    height:calc(100% - 50px)
  }
 .el-tabs__header{
    background: #fff
  }
</style>
