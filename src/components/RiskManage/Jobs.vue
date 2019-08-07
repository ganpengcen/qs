<template>
  <div class="content">
    <Header title="风险管理" text="岗位管理"></Header>
    
    <el-dialog width="40%" title="新建岗位" :visible.sync="dg1">
      <div class="info">
        <el-form :inline="true" label-width="75px">
          <el-form-item label="岗位编号">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="岗位名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="组织架构">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="责任人">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="主要任务">
            <el-input type="textarea" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="附件">
            <el-upload>
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="开发部">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dg1 = false">取 消</el-button>
        <el-button type="primary" @click="dg1= false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="main">
      <div class="top">
      <el-row class="mbd">
        <el-col :span="4">
          <el-button type="primary" @click="dg1=true">新建</el-button>
        </el-col>
        <el-col :span="9">
          <span>关键字:</span>
          <el-input placeholder="请输入关键字"></el-input>
          <el-button type="primary">查询</el-button>
          <a href="#">导出为Excel</a>
        </el-col>
      </el-row>
    </div>
      <el-table
        height="calc(100% - 75px)"
        :data="tbd"
        border
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        @row-click='gtif'
      >
        <el-table-column type="expand">
          <template slot-scope="props"></template>
        </el-table-column>
        <el-table-column label="岗位编号" prop="nmb"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="责任人" prop="respos"></el-table-column>
        <el-table-column label="责任人电话" prop="respostel"></el-table-column>
        <el-table-column label="操作">
          <el-button type="text" @click="dg2=true">修改</el-button>
          <el-button type="text" @click="del()">删除</el-button>
          <el-button type="text" @click="dg3=true">人员管理</el-button>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog width="40%" title="修改岗位" :visible.sync="dg2">
      <div class="info">
      <el-form :inline="true" label-width="75px">
        <el-form-item label="岗位编号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="岗位名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="组织架构">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="责任人">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="主要任务">
          <el-input type="textarea" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="附件">
          <el-upload>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="开发部">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dg2 = false">取 消</el-button>
        <el-button type="primary" @click="dg2= false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="人员管理" :visible.sync="dg3">
      <div class="info">
      <el-row>
        <el-col :span="8">
          <el-form label-width="100px" size="small">
            <el-form-item label="岗位编号">
              <el-input disabled v-model="info.nmb"></el-input>
            </el-form-item>
            <el-form-item label="岗位名称">
              <el-input disabled v-model="info.name"></el-input>
            </el-form-item>
            <el-form-item label="责任人">
              <el-input disabled v-model="info.respos"></el-input>
            </el-form-item>
            <el-form-item label="责任人电话">
              <el-input disabled v-model="info.respostel"></el-input>
            </el-form-item>
            <el-form-item label="开发部">
              <el-input disabled></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="1"><el-divider direction="vertical"></el-divider></el-col>
        <el-col :span="14">
          <el-form class="depar" :inline="true">
            <el-form-item>
              <el-cascader v-model="depart" :options="treedata"></el-cascader>
            </el-form-item>
            <el-form-item>
              <el-select v-model="sec">
                <el-option label="11" value="1"></el-option>
                <el-option label="22" value="2"></el-option>
              </el-select> 
            </el-form-item>
            <el-button type="primary">增加</el-button>
          </el-form>
          <el-table height="168px" :data="deptb" border size="mini">
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="部门" prop="dept"></el-table-column>
            <el-table-column label="操作">
              <el-button type="text" @click="del()">删除</el-button>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      </div>
    </el-dialog>
    <div class="pge">
      <el-pagination :page-size="5" background layout="prev,pager,next" :total="tbd.length"></el-pagination>
    </div>
  </div>
</template>
<script>
import Header from "../assembly/Header";
export default {
  components: {
    Header
  },
  data() {
    return {
      depart:'',
      sec:'',
      dg1: false,
      dg2: false,
      dg3: false,
      tbd: [
        {
          nmb: "1",
          name: "ajskad",
          respos: "asdasda",
          respostel: "56541113331"
        },
        {
          nmb: "1",
          name: "ajskad",
          respos: "asdasda",
          respostel: "56541113331"
        },
        {
          nmb: "1",
          name: "ajskad",
          respos: "asdasda",
          respostel: "56541113331"
        },
        {
          nmb: "1",
          name: "ajskad",
          respos: "asdasda",
          respostel: "56541113331"
        },
        {
          nmb: "1",
          name: "ajskad",
          respos: "asdasda",
          respostel: "56541113331"
        },
        {
          nmb: "1",
          name: "ajskad",
          respos: "asdasda",
          respostel: "56541113331"
        },
        {
          nmb: "1",
          name: "ajskad",
          respos: "asdasda",
          respostel: "56541113331"
        },
        {
          nmb: "1",
          name: "ajskad",
          respos: "asdasda",
          respostel: "56541113331"
        },
        {
          nmb: "1",
          name: "ajskad",
          respos: "asdasda",
          respostel: "56541113331"
        },
      ],
      info:{},
      treedata: [
        {
          label: "1",
          children: [
            {
              label: "1-1",
              children: [{ label: "1-1-1" }, { label: "1-1-2" }]
            },
            { label: "1-2", children: [{ label: "1-2-1" }] },
            { label: "1-3" },
            { label: "1-4" }
          ]
        }
      ],
      deptb:[
        {name:'asdas',dept:'1-1-2'},
        {name:'asdas',dept:'1-1-2'},
      ]
    };
  },
  methods:{
    del(){
      this.$confirm("将要执行删除操作,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    gtif(row){
      console.log(row)
      this.info=row
    }
  }
};
</script>
<style scoped>
.info{
  background: #fff;
  padding: 15px
}
.content {
  overflow: hidden;
  height: 100%;
}
.el-col-1 .el-divider{
  height: 237px;
}
.main {
  width: 96.8%;
  height: calc(100% - 130px);
  margin:10px 0 10px 25px;
  overflow: hidden;
}
.el-col-4 .el-button {
  margin: 10px 0 10px 20px;
}
.el-textarea{
  width: 460px
}
.el-col-9 .el-input {
  width: 35%;
}
.el-col-9 {
  float: right;
  margin: 0 0 10px 0;
}
.depar .el-form-item{
  width: 35%
}
.mbd {
  background: #fff;
  border-top: 2px solid #049eff;
  border-radius: 5px;
}
.el-col-9 > a {
  font-size: 14px;
  display: inline-block;
  text-align: center;
  background-color: #409eff;
  color: #fff;
  margin: 10px 0 0 0;
  line-height: 40px;
  width: 100px;
  text-decoration: none;
  border-radius: 3px;
}
.el-table {
  margin-top: 15px;
}
.top {
  width: 100%;
}
.pge {
  width: 96.8%;
  margin-left: 25px;
  height: 35px;
  text-align: right;
  background: #fff;
}
</style>
