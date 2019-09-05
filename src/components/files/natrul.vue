<template>
  <div class="wrapper">
    <Header title="档案管理" text="资质管理"></Header>
    <div class="table">
      <el-tabs :tab-position="left" style="overflow: hidden;" @tab-click="tabClik">
        <el-tab-pane v-for="item,index in DocLicenseItem" :label="item.Name" :name="item.ID" :key="item.ID">
          <Table :ID="item.ID" ref="tabs"></Table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Table from '../../components/files/table2.vue'
  import Header from '../../components/assembly/Header.vue'
  export default {
    components: {
      Table,
      Header
    },
    data () {
      return {
        DocLicenseItem:[],
        fileList:[],
        upFileList:[],
        newlist: false,
        deletlist:false,
        changedetail:false,
        left: 'left',
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
    },
    methods: {
      getDocLicenseItem(){
        this.$get(this.api.getDocLicenseItem).then(res=>{
          console.log('获取类型返回值:',res)
          if(res.data.State===200){
            this.DocLicenseItem=res.data.Data
          }else {
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },//获取资质类型合集
      tabClik(a){
          this.$refs.tabs[a.index].getDocCertificatePage()
      },//tab被选择
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      deletcontent(){
        this.deletlist = true
      },
      newcontent () {
         this.newlist =true
      },
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
      }
    },
    created(){
      this.getDocLicenseItem()
    },
  }
</script>

<style scoped>
  .wrapper{
    width: 100%;
    height:100%;
    overflow: hidden;
  }
  .wrapper .table {
    margin:0 0 0 25px;
    width: calc(100% - 50px);
    height: calc(100% - 55px)
  }
  .el-tabs{
    height:calc(100% - 50px)
  }
  .el-tabs__header{
    background: #fff
  }
</style>
