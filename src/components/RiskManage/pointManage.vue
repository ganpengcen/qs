<template>
  <div class="back">

    <div class="head1">
      <Head1 title="风险管理" text="风险点管理"></Head1>
    </div>

    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline"  >

        <el-form-item class="New">
          <div class="left">
            <el-button @click="dialogFormVisible = true"  type="primary">新建</el-button>
            <el-dialog title="新建风险点" :visible.sync="dialogFormVisible" width="680px">
              <div class="NewConstruct">
                <el-form :inline="true" :model="formInline" >
                  <el-form-item label="名称：" :label-width="formLabelWidth" style="margin:0px 20px 20px 30px">
                    <el-input v-model="form.name" autocomplete="off"  style="width:180px"></el-input>
                  </el-form-item>
                  <el-form-item label="危险因素：" :label-width="formLabelWidth"   style="margin:0px 0px 20px 0px">
                    <el-select v-model="form.riskreason" placeholder="请选择活动区域"  style="width:180px">
                      <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>

                <el-form :model="form">
                  <el-form-item label="组织构架：" :label-width="formLabelWidth" style="margin:0px 20px 20px 0px">
                    <el-select v-model="form.OrganzingFrame" placeholder="请选择活动区域" style="width:180px">
                      <el-option label="2-1-1" value="211"></el-option>
                      <el-option label="2-1-2" value="222"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="责任人：" :label-width="formLabelWidth"  style="margin:0px 20px 20px 16px">
                    <el-select v-model="form.ChargePerson" placeholder="请选择活动区域" style="width:180px">
                      <el-option label="2-2-1" value="221"></el-option>
                      <el-option label="2-2-2" value="222"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :model="form">
                  <el-form-item label="风险等级：" :label-width="formLabelWidth" style="margin:0px 20px 20px 0px">
                    <el-select v-model="form.risklevel" placeholder="请选择活动区域" style="width:180px">
                      <el-option label="3-1-1" value="311"></el-option>
                      <el-option label="3-1-2" value="312"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item>
                    <span style="margin:0px 20px 20px 0px"> 使用单位：</span>
                    <el-button type="text" @click="open">设置</el-button>
                  </el-form-item>
                </el-form>

                <el-form :model="form">
                  <el-form-item label="管控措施：" :label-width="formLabelWidth" style="margin:0px 30px 20px 0px">
                    <el-input  type="textarea" v-model="form.ManagementMeasure" autocomplete="off"  style="width:300px"></el-input>
                  </el-form-item>
                </el-form>
                <el-form :model="form">
                  <el-form-item label="应急措施：" :label-width="formLabelWidth" style="margin:0px 30px 20px 0px">
                    <el-input  type="textarea" v-model="form.EmergencyMeasure" autocomplete="off"  style="width:300px"></el-input>
                  </el-form-item>
                </el-form>
                <el-form :model="form">
                  <el-form-item label="备注：" :label-width="formLabelWidth"  style="margin:0px 30px 20px 30px">
                    <el-input  type="textarea" v-model="form.Notes" autocomplete="off" style="width:300px"></el-input>
                  </el-form-item>
                </el-form>
                <el-form :model="form">
                  <el-form-item label="后果：" :label-width="formLabelWidth" style="margin:0px 30px 20px 30px">
                    <el-input  type="textarea" v-model="form.Consequence" autocomplete="off"   style="width:300px"></el-input>
                  </el-form-item>
                </el-form>
                <div class="upp">
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible" >
                    <img width="100%" :src="dialogImageUrl" alt="第一个上传加号">
                  </el-dialog>
                </div>
                <div class="upp">
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible" >
                    <img width="100%" :src="dialogImageUrl" alt="第二个上传加号">
                  </el-dialog>
                </div>
                <div class="uppp">
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-change="handleChange"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </div>
              </div>
              <div slot="footer" >
                <el-button @click="dialogFormVisible = false" >取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-form-item>
        <el-form-item  class="UPload1">

          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList">
            <el-button size="normal" type="primary">上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item style="margin: 0 0  0 28px" >
          <span>风险等级:</span>
          <el-select v-model="formInline.region" placeholder="风险等级"  style="width:170px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="查询:">
          <el-input v-model="formInline.user" placeholder="审批人">查询</el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="medium">批量打印</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="medium">导出excel</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div  class="FormLine">
      <el-table :data="tableData"  border style="width: 100%" class="FormLine1">
        <el-table-column prop="number" label="编号"  >
        </el-table-column>
        <el-table-column prop="name"  label="名称"  >
        </el-table-column>
        <el-table-column prop="risklevel" label="风险等级"  >
        </el-table-column>
        <el-table-column prop="remarks" label="备注"  >
        </el-table-column>
        <el-table-column prop="operation" label="操作" >
        </el-table-column>
      </el-table>
    </div>

    <div>
      <el-pagination
        :current-page.sync="pages"
        :page-sizes="[5,10,15,20]"
        :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
        background class="paging">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import Head1 from '../assembly/Header'
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: '',
        },
        pages:1,
        PageSize:1,
        form: {
          Consequence: "",
          EmergencyMeasure: "",
          Notes:"",
          fileList:'',
          ManagementMeasure: "",
          ChargePerson: "",
          risklevel: "",
          OrganzingFrame:" ",
          riskreason:"",
          name:'',
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: ""
        },
        options: [{
          value: '选项1',
          label: '健康状况异常'
        }, {
          value: '选项2',
          label: '从事禁忌作业'
        }, {
          value: '选项3',
          label: '心理异常'
        }, {
          value: '选项4',
          label: '辨识功能缺陷'
        }, {
          value: '选项5',
          label: '指挥错误'
        }],
        dialogFormVisible:false,
        tableData: [{
          number: '2016-05-02',
          name: '王小虎',
          risklevel: '上海 1518 弄',
          operation:'111',
          remarks:'123',
        }, {
          number: '2016-05-02',
          name: '王小虎',
          risklevel: '上海市普陀区金沙',
          operation:'111',
          remarks:'123',
        }, {
          number: '2016-05-02',
          name: '王小虎',
          risklevel: '上海江路 1518 弄',
          operation:'111',
          remarks:'123',
        },
          {
            number: '2016-05-02',
            name: '王小虎',
            risklevel: '上海江路 1518 弄',
            operation:'111',
            remarks:'123',
          },
          {
            number: '2016-05-02',
            name: '王小虎',
            risklevel: '上海江路 1518 弄',
            operation:'111',
            remarks:'123',
          },
          {
            number: '2016-05-02',
            name: '王小虎',
            risklevel: '上海市普 1518 弄',
            operation:'111',
            remarks:'123',
          }]
      }
    },

    methods: {
      open() {
        this.$alert('', '设置单位', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      onSubmit() {
        console.log('submit!');
      }
    },
    components:{
      Head1
    }
  }
</script>

<style scoped>

  .demo-form-inline{
    height: 70px;
    width: 95%;
    overflow: auto;
    position:absolute;
    background-color: #fff;
    border-radius:5px;
    margin: 10px 0 0 20px;
    padding: 20px 0 0 0;
    border-top: 2px solid #95c0f0;
    min-width: 1010px;

  }
  .FormLine{
    float: left;
    margin: 115px 0 0 20px;
    position: absolute;
    width: 95%;
  }
  .UPload1{
    margin:0 0px 0 0;
  }
  .New{
    margin: 0 10px 0 10px;

  }
  .paging{
    width: 500px;
    height: 50px;
    margin:  456px 0 0 290px;
    position: absolute;
  }
  .upp{
    float: left;
    padding: 0 10px 0 80px;
  }
  .uppp{
    margin:  170px 0 0 0px;
  }
  .NewConstruct{
    overflow-y:scroll;
    height:400px;
    margin:10px;
  }
</style>
