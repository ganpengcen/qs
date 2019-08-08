<template>
  <div class="content">
    <Header title="系统管理" text="审批流程"></Header>
    <div class="dialog-wrapper" style="background-color: white;padding: 10px;display: flex;">
      <div class="dialog-left" style="line-height: 30px;flex: 0 1 200px;overflow: auto;height: calc(100vh - 240px);padding-left: 10px">
        <div class="left-top" style="display: flex;">
          <span style=" flex:1;width: 50%;text-align: center;border-radius: 3px"  :class="{'point':true}">流程</span>
        </div>
        <div>
          <p style="margin-top: 15px;font-size: 15px">节点名称</p>
          <el-input v-model="checkNodeName" size="small" @change="changeNodename" value="12"></el-input>
        </div>
        <div style="margin-top: 10px">
          <p>节点类型</p>
          <el-radio v-model="nodeType" label="simple">单人审核</el-radio>
          <el-radio v-model="nodeType" label="mut">多人审核</el-radio>
          <p style="margin-top: 10px">选择审核人:</p>
          <p style="font-size: 12px;padding-left: 15px">(最多20人)</p>
          <el-select :multiple="nodeType=='mut'" @change="selectChange()" v-model="selectValue">
            <el-option v-for="(item,index) in personDetail" :label="item.name" :value="item.name"  :key="item.index"></el-option>
          </el-select>
        </div>
      </div>
      <div class="dialog-right" style="flex: 1;overflow: auto;height: calc(100vh - 240px)" v-if="branch">
        <div v-for="(item,index1) in branch" :key="index1" style="margin-bottom: 10px">
          <div class="top" @click="fold(index1)" ref="topFolder">
            <span style="margin-right: 10px">业务类型:{{item.type}}</span>
            <span>流程名称:{{item.name}}</span>
            <span style="float: right;margin-right: 10px">
                  <el-button size="small" @click="save(index1)">保存</el-button>
                </span>
          </div>
          <div class="foldDiv" :class="{fold:!(foldDetail.indexOf(index1)===(-1))}">
            <div class="main" style="padding: 20px;" >
              <div >
                <draggable v-model="item.Node" >
                  <transition-group tag="div" class="drop-wrapper">
                    <div class="nodeWrapper" v-for="(data,index2) in item.Node" :key="data.name" ref="node">
                      <div @click="dianji(index1,index2)" style=" border-radius: 2px;
                       float: left; width: 160px;margin-top: 20px" :class="{active:indexone === index1 && indextwo === index2}">
                        <div class="node">
                          <p style="margin-bottom: 10px;font-size: 16px;line-height: 20px;margin-top: 10px">{{data.name}}</p>
                          <div style="padding-left: 10px;font-size: 15px;margin-top: 10px">
                            <span v-for="(name, index) in data.family" :index="index" style="margin-right: 6px;">{{name.name}}</span>
                          </div>
                          <i class="el-icon-delete" style="position: absolute;top: 10px;right: 10px;" @click="deleteNode(index1,index2)"></i>
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
          <el-link type="primary" :underline="false" @click="addBranch=true">+添加流程</el-link>
        </div>

      </div>
    </div>

    <el-dialog title="新建审批流程" :visible.sync="addBranch" style="height: 100%;width: 100%;overflow: hidden">
      <div style="height: 200px;overflow-x: hidden;overflow-y: auto;background-color: white;padding-top: 20px">
        <el-form labelWidth="180px" v-model="form">
          <el-form-item label="业务类型">
            <el-select v-model="form.type">
              <el-option v-for="(item, index) in typeDetail" :label="item.name" :value="item.name" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="流程名称">
            <el-input style="width: 200px" v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="addBranch = false">取消</el-button>
        <el-button @click="dialogadd" type="primary">确认</el-button>
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
        foldDetail:[],
        nodeType:'mut',
        personDetail:[
          {name: '一'},
          {name: 'er'},
          {name: 'san'},
          {name: 'si'},
          {name: 'wu'},
          {name: '6'}
        ],
        addBranch:false,
        form: {
          name:'',
          type:''
        },
        typeDetail: [
          {name:'作业申请'},
          {name:'巡察任务'}
        ],
        branch:[
          {
            type:'业务类型',
            name:'流程名称',
            Node:[
              {
                name:'节点一',
                deleteShow:false,
                family:[{
                  name:'er'
                },
                  {
                    name:'san'
                  }
                ]
              },
              {
                name:'节点二',
                family:[
                  {
                    name:'er'
                  },
                  {
                    name:'san'
                  }
                ]
              }
            ]
          },
          {
            type:'业务类型',
            name:'流程名称',
            Node:[
              {
                name:'节点一',
                family:[{
                  name:'er'
                },
                  {
                    name:'san'
                  }
                ]
              },
              {
                name:'节点二',
                family:[{
                  name:'er'
                },
                  {
                    name:'er'
                  }
                ]
              }
            ]
          }
        ],
        type:'fromdata',
        checkNodeName: '',
        selectValue:'',
        indexone:'0',
        indextwo:'0',
        foldIndex:''
      }
    },
    methods: {
      deleteNode(index1,index2) {
        this.branch[index1].Node.splice(index2,1)
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
      save (index) {
        alert('第'+ (index+1)+'排数据保存成功')
      },
      selectChange(){
        console.log(this.indexone)
        let len = this.selectValue.length
        var temp = []
        for (var i = 0; i < len; i++) {
          temp.push({
            name: this.selectValue[i]
          })
        }
        this.branch[this.indexone].Node[this.indextwo].family = temp
      },
      dianji (index1,index2) {
        console.log('dianjile')
        let temp = []
        let len = this.branch[index1].Node[index2].family.length
        this.branch[index1].Node[index2].family.forEach((item)=>{
          temp.push(item.name)
        })
        this.selectValue = temp
        this.indexone = index1
        this.indextwo = index2
      },
      dialogadd () {
        this.branch.push(  {
          fold:false,
          type:this.form.type,
          name:this.form.name,
          Node:[{
            name:'',
            family:[{
              name:''
            },
              {
                name:''
              }
            ]
          }
          ]},)
        this.addBranch=false
      },
      addNodeDetail (index1) {
        this.branch[index1].Node.push( {
          name:'',
          family:[{
            name:''
          }
          ]
        })
      },
      changeNodename () {
        this.branch[this.indexone].Node[this.indextwo].name = this.checkNodeName
        console.log(this.checkNodeName)
      }
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
