<template>
  <div class="content">
    <Header title="系统管理" text="审批流程"></Header>
    <div class="dialog-wrapper" style="background-color: white;padding: 10px;display: flex;">
      <div class="dialog-left" style="line-height: 30px;flex: 0 1 200px;overflow: auto;height: calc(100vh - 255px);padding-left: 10px">
        <div class="left-top" style="display: flex;">
          <span style=" flex:1;width: 50%;text-align: center;border-radius: 3px"  :class="{'point':true}">流程</span>
        </div>
        <div>
          <p style="margin-top: 15px;font-size: 15px">节点名称</p>
          <el-input v-model="checkNodeName" size="small" @change="changeNodename"></el-input>
        </div>
        <div style="margin-top: 10px">
          <p>节点类型</p>
          <el-radio v-model="nodeType" label="single" @change="typeChange">普通</el-radio>
          <el-radio v-model="nodeType" label="mut" @change="typeChange">多人会审</el-radio>
          <p style="margin-top: 10px">选择审核人:</p>
          <p style="font-size: 12px;padding-left: 15px">(最多20人)</p>
          <p>{{nodeType}}</p>
          <p>{{nodeType!='mut'}}</p>
          <el-select @change="selectChange()" v-model="selectValue" v-if="nodeType=='single'">
            <el-option v-for="(item,index) in personDetail" :label="item.name" :value="item.name"  :key="item.index"></el-option>
          </el-select>
          <el-select :multiple="nodeType=='mut'" @change="mutSelectChange()" v-model="mutSelectValue" :collapse-tags="true" v-if="nodeType=='mut'">
            <el-option v-for="(item,index) in personDetail" :label="item.name" :value="item.name"  :key="item.index"></el-option>
          </el-select>
        </div>
      </div>
      <div class="dialog-right" style="flex: 1;overflow: auto;height: calc(100vh - 255px)" v-if="branch">
        <div v-for="(item,index1) in branch" :key="index1" style="margin-bottom: 10px">
          <div class="top" @click="fold(index1)" ref="topFolder">
            <span style="margin-right: 10px">业务类型:{{item.BusinessType}}</span>
            <span>流程名称:{{item.Name}}</span>
            <span style="float: right;margin-right: 10px">
                  <el-button size="small" @click.stop="save(index1)">保存</el-button>
                </span>
          </div>
          <div class="foldDiv" :class="{fold:!(foldDetail.indexOf(index1)===(-1))}">
            <div class="main" style="padding: 20px;" >
              <div >
                <draggable v-model="item.Node" >
                  <transition-group tag="div" class="drop-wrapper">
                    <div class="nodeWrapper" v-for="data,index2 in item.Node" :key="index2+0" ref="node">
                      <div @click="dianji(index1,index2)" style=" border-radius: 2px;
                       float: left; width: 160px;margin-top: 20px" :class="{active:indexone === index1 && indextwo === index2}">
                        <div class="node">
                          <p style="margin-bottom: 10px;font-size: 16px;line-height: 20px;margin-top: 10px">{{data.name}}</p>
                          <div style="padding-left: 10px;font-size: 15px;margin-top: 10px">
                            <span v-for="(name, index) in data.childs" :index="index" style="margin-right: 6px;">{{name.name}}</span>
                          </div>
                          <i class="el-icon-delete" style="position: absolute;top: 10px;right: 10px;" @click="delFlowPoint(index1,index2)"></i>
                        </div>
                      </div>
                      <div style="float: left;width: 90px;height: 62px;background-color: rgba(209, 209, 209,0.2);margin-top: 20px;padding-top: 30px">
                        <img src="../../../static/img/arrow.jpg" style="width: 90px;height: 30px;">
                      </div>
                    </div>
                  </transition-group>
                </draggable>
              </div>

              <div style="float: left;width: 160px;border: 1px solid rgba(209, 209, 209,0.2);margin-left: 5px;height: 90px;margin-top: 20px;
               font-size: 48px;text-align: center;line-height: 90px;" @click="addNodeDetail(index1)">+</div>
              <div style="clear: both;height: 0px;"></div>
            </div>
          </div>
        </div>

        <div class="add" style="margin: 20px 0 0 30px">
          <el-link type="primary" :underline="false" @click="dg1=true">+添加流程</el-link>
        </div>

      </div>
    </div>

    <el-dialog title="新建审批流程" :visible.sync="dg1" style="height: 100%;width: 100%;overflow: hidden">
      <div style="height: 200px;overflow-x: hidden;overflow-y: auto;background-color: white;padding-top: 20px">
        <el-form labelWidth="180px" v-model="newFlowMaster">
          <el-form-item label="业务类型">
            <el-select v-model="newFlowMaster.BusinessType">
              <el-option v-for="(item, index) in typeSelect" :label="item.Caption" :value="item.Value" :key="item.Value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="流程名称">
            <el-input style="width: 200px" v-model="newFlowMaster.Name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="dg1 = false">取消</el-button>
        <el-button @click="addFlowMaster" type="primary">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Header from "../assembly/Header";
  import draggable from 'vuedraggable'
  import ElRadio from "../../../node_modules/element-ui/packages/radio/src/radio.vue";
  import ElRadioGroup from "../../../node_modules/element-ui/packages/radio/src/radio-group.vue";
  export default {
    components: {
      ElRadioGroup,
      ElRadio,
      Header,
      draggable
    },
    data() {
      return {
        typeSelect:[],
        newFlowMaster:{},
        dg1:false,
        branch:[{Node:[{}]}],
        mutSelectValue:[],
        selectValue:'',
        nodeType:'single',
        checkNodeName: '',
        indexone:'0',
        indextwo:'0',
        foldIndex:'',


        foldDetail:[],
        personDetail:[
          {name: '一'},
          {name: 'er'},
          {name: 'san'},
          {name: 'si'},
          {name: 'wu'},
          {name: '6'}
        ],
        form: {
          name:'',
          type:''
        },
        typeDetail: [
          {name:'作业申请'},
          {name:'巡察任务'}
        ],
        type:'fromdata',
      }
    },
    methods: {
      setText(){
        let arr2=[]
        console.log('arr2',arr2[0])
        let obj={}
        let arr=[{}]
        console.log('obj',obj)
        console.log('arr',arr[0])
        this.$set(obj,'a',1)
        this.$set(arr[0],'a','1')
        console.log('obj',obj.a)
        console.log('arr',arr[0].a)
      },

      getBusinessType(){
        this.$get(this.api.getBusinessType).then(res=>{
          console.log('业务类型返回值:',res)
          if(res.data.State===200){
            this.typeSelect=res.data.Data
          }else{
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },//获取业务类型
      addFlowMaster(){
         let param = {
           "Name": this.newFlowMaster.Name,
           "BusinessType": this.newFlowMaster.BusinessType
         }
         console.log('新建流程参数:',param)
         this.$post(this.api.addFlowMaster,param).then(res=>{
           if(res.data.State===200){
             this.getFlowMastersPage()
             this.dg1=false
             this.$message({
               type:'success',
               message:'新建成功'
             })
           }else {
             this.$message({
               type:'error',
               message:res.data.Msg
             })
           }
         })
      },//新建审批流程
      getFlowMastersPage(){
        let parma={
          "PageSize": 100,
          "PageIndex": 0,
          "KeyWord": "",
          "Query": '',
          "OrderString": "",
          "ToExcel": false
        }
        this.$post(this.api.getFlowMastersPage).then(res=>{
          console.log('流程列表返回值:',res)
          if(res.data.State===200){
            res.data.Data.Data.forEach(i=>{
              this.$set(i,'Node',[])
            })
            this.branch=res.data.Data.Data
          }else {
            this.$message({
              type:'error',
              message:res.data.Msg
            })
          }
        })
      },//获取流程列表

      typeChange(){
        this.branch[this.indexone].Node[this.indextwo].type=this.nodeType
      },  //设置类型
      delFlowPoint(index1,index2) {
        this.$confirm('你将永久删除该节点是否确认?','提示',{
          confirmButtonText:'确认',
          cancelButtontText:'取消',
          type:'warning'
        }).then(()=>{
          this.$get(this.api.delFlowPoint,+ID).then(res=>{
            if(res.data.State===200){
              this.$message({
                type:'success',
                message:'删除修改'
              })
            }else {
              this.$message({
                type:'error',
                message:res.data.Msg
              })
            }
          })
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'取消'
          })
        })
      //  this.branch[index1].Node.splice(index2,1)
      },
      fold (index1) {
        if(this.foldDetail.indexOf(index1)!==(-1)){
          var index = this.foldDetail.indexOf(index1)
          console.log('index'+index)
          this.foldDetail.splice(index,1)
        } else {
          this.foldDetail.push(index1)
        }
        console.log(this.foldDetail)
      },
      save (index)  {
        alert('第'+ (index+1)+'排数据保存成功')
        console.log('branch',this.branch[index])
      },
      mutSelectChange(){
        console.log(this.indexone)
        console.log('mutselectValue',this.mutSelectValue)
        let len = this.mutSelectValue.length
        var temp = []
        if(len>0) {
          for (var i = 0; i < len; i++) {
            temp.push({
              name: this.mutSelectValue[i]
            })
          }
        }
          this.branch[this.indexone].Node[this.indextwo].childs = temp
      },
      selectChange(){
        console.log('selectChange',this.selectValue)
       this.branch[this.indexone].Node[this.indextwo].childs.push({
         name:this.selectValue
       })
      },
      dianji (index1,index2) {
        console.log('dianjile')
        console.log('branch',this.branch)
        let temp = ''
        let len = this.branch[index1].Node[index2].childs.length
        this.selectValue=this.branch[index1].Node[index2].childs.name
        this.indexone = index1
        this.indextwo = index2
        this.checkNodeName=this.branch[index1].Node[index2].name
      },
      addNodeDetail (index1) {
        this.branch[index1].Node.push( {
          name:'',
          type:'',
          childs:[{
            name:''
          }
          ]
        })
        console.log('添加节点:',this.branch)
      },
      changeNodename () {
//        console.log(this.branch)
//        console.log(this.indexone)
//        console.log(this.indextwo)
//        console.log(this.checkNodeName)
//        console.log(this.branch[this.indexone])
//        console.log(this.branch[this.indexone].Node[this.indextwo])
        this.branch[this.indexone].Node[this.indextwo].name=this.checkNodeName
      }
    },
    created(){
      this.getBusinessType()
      this.getFlowMastersPage()
    }
  };
</script>
<style scoped>
  .select,
  .lefttop,
  .topcontent {
    background: #fff;
  }
  .content {
    height:100%;
    width: 100%;
    overflow: hidden;
  }
  .dialog-wrapper {
    margin: 15px 25px 11px;
    border-radius: 2px;
  }
  .point {
    background-color: gainsboro;
  }
  .dialog-left{
    display: inline-block;
    width: 200px;
    height: 500px;
    border: 1px solid beige;
    margin-right: 10px;
  }
  .foldDiv{
    border: 2px solid #eee9e9;
  }
  .fold{
    display: none;
  }
  .node {
    border: 1px solid rgba(209, 209, 209,0.2);
    height: 90px;
    position: relative
  }
  .node i {
    display: none;
  }
  .node:hover i{
    display: block;
  }
  .top{
    background-color: #eee9e9;
    height: 35px;
    line-height: 35px;
    padding-left: 15px;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
  }
  .active{
    border: 1px solid grey;
  }
</style>
